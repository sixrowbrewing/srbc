import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "SRBC Website <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, message } = payload as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { ok: false, error: "All fields are required." },
      { status: 400 },
    );
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (
    trimmedName.length === 0 ||
    trimmedName.length > MAX_NAME ||
    trimmedEmail.length === 0 ||
    trimmedEmail.length > MAX_EMAIL ||
    trimmedMessage.length === 0 ||
    trimmedMessage.length > MAX_MESSAGE
  ) {
    return NextResponse.json(
      { ok: false, error: "Please check the form values and try again." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(trimmedEmail)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(trimmedName);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeMessageHtml = escapeHtml(trimmedMessage).replace(/\n/g, "<br>");

  const subject = `New inquiry — ${trimmedName}`;
  const textBody = [
    "New inquiry from the SRBC website",
    "",
    `Name:    ${trimmedName}`,
    `Email:   ${trimmedEmail}`,
    "",
    "Message:",
    trimmedMessage,
  ].join("\n");

  const htmlBody = `
    <div style="font-family:Inter,Arial,sans-serif;color:#1a1d1c;line-height:1.6">
      <h2 style="margin:0 0 16px;font-family:Georgia,serif;color:#1F3A2E">
        New inquiry from the SRBC website
      </h2>
      <table style="border-collapse:collapse;margin-bottom:16px">
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6b7280">Name</td>
          <td style="padding:4px 0"><strong>${safeName}</strong></td>
        </tr>
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6b7280">Email</td>
          <td style="padding:4px 0">
            <a href="mailto:${safeEmail}" style="color:#1F3A2E">${safeEmail}</a>
          </td>
        </tr>
      </table>
      <div style="border-top:1px solid #e3e5e1;padding-top:16px">
        <p style="margin:0 0 8px;color:#6b7280;font-size:13px">Message</p>
        <div>${safeMessageHtml}</div>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: trimmedEmail,
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend send failed", error);
      return NextResponse.json(
        { ok: false, error: "Could not deliver your message right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend threw", err);
    return NextResponse.json(
      { ok: false, error: "Could not deliver your message right now." },
      { status: 502 },
    );
  }
}
