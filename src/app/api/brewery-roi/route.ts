import { Resend } from "resend";

const inbox = "sixrowbrewing@gmail.com";
const invalid = () => Response.json({ error: "Check your email, callback number and calculator inputs." }, { status: 400 });
const unavailable = () => Response.json({ error: "Email is temporarily unavailable. Please try again." }, { status: 503 });
const format = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) return invalid();
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return invalid();
  const data = await request.json().catch(() => null);
  if (!data || typeof data !== "object") return invalid();
  const { email, phone, callback, sales, investment, fixed, price, cost, requestId } = data;
  if (typeof email !== "string" || email.length > 254 || !/^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/.test(email)
    || typeof callback !== "boolean" || (callback && (typeof phone !== "string" || !/^\+?[\d ()-]{7,24}$/.test(phone) || !/^\d{7,15}$/.test(phone.replace(/\D/g, ""))))
    || typeof requestId !== "string" || !/^[a-f0-9-]{36}$/i.test(requestId)
    || ![sales, investment, fixed, price, cost].every(v => Number.isFinite(v) && v >= 0 && v <= Number.MAX_SAFE_INTEGER)
    || !Number.isInteger(sales) || sales > 75000 || investment <= 0) return invalid();
  const key = process.env.RESEND_API_KEY, from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) return unavailable();
  const contribution = price - cost;
  const overhead = fixed * 100000, capital = investment * 10000000;
  const surplus = Math.round((sales * contribution - overhead) * 100) / 100;
  const breakEven = contribution > 0 ? format(Math.ceil(overhead / contribution)) + " L/month"
    : overhead > 0 ? "No break-even volume" : contribution === 0 ? "All volumes" : "Zero sales only";
  const summary = [
    "Monthly sales: " + format(sales) + " L",
    "Initial investment: ₹" + format(investment) + " crore",
    "Fixed costs: ₹" + format(fixed) + " lakh/month",
    "Net selling price: ₹" + format(price) + "/L",
    "Variable cost: ₹" + format(cost) + "/L",
    "Contribution: ₹" + format(contribution) + "/L",
    "Operating break-even: " + breakEven,
    "Monthly operating " + (surplus < 0 ? "loss" : "surplus") + ": ₹" + format(Math.abs(surplus)),
    "Simple annual operating return: " + format(1200 * surplus / capital) + "%",
    "Simple payback: " + (surplus > 0 ? format(Math.ceil(capital / surplus)) + " months" : "No payback at this volume"),
    "", "Assumes steady sales. Excludes financing, tax and future capital spending."
  ].join("\n");
  try {
    const { data: sent, error } = await new Resend(key).batch.send([
      { from, to: [inbox], replyTo: email, subject: callback ? "Brewery ROI lead — callback requested" : "Brewery ROI lead — email summary",
        text: ["Reader: " + email, callback ? "Callback requested: " + phone : "Email summary only", "", summary].join("\n") },
      { from, to: [email], replyTo: inbox, subject: "Your brewery ROI summary from Six Row Brewing",
        text: ["Here is the brewery scenario you requested.", "", summary, "", "Six Row Brewing"].join("\n") }
    ], { idempotencyKey: "brewery-roi/" + requestId });
    if (error || sent?.data?.length !== 2) return unavailable();
    return Response.json({ ok: true });
  } catch {
    return unavailable();
  }
}
