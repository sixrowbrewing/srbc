"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InfoPopover } from "@/components/ui/info-popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  validateContact,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactFields,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

const initial: ContactFields = {
  name: "",
  email: "",
  phone: "",
  location: "",
  message: "",
};

/**
 * Marks a required field. Hidden from assistive tech — the input's own
 * `required` attribute already conveys this, so reading it out would duplicate.
 */
function RequiredMark() {
  return (
    <span aria-hidden className="text-destructive">
      *
    </span>
  );
}

/**
 * A field's label row. Fixed height so every input in a grid row lines up,
 * whether or not the label carries a hint button.
 */
function FieldLabel({
  htmlFor,
  required,
  hint,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-5 items-center gap-1.5">
      <Label htmlFor={htmlFor}>
        {children} {required && <RequiredMark />}
      </Label>
      {hint}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFields>(initial);
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (field: ContactField) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      // A new edit starts a new inquiry — clear the previous send's outcome.
      setStatus((prev) =>
        prev === "success" || prev === "error" ? "idle" : prev,
      );
      setError(null);
      // Clear an existing error as soon as the value becomes valid; don't raise a
      // new one mid-typing.
      setFieldErrors((prev) => {
        if (!prev[field] || validateField(field, e.target.value.trim()))
          return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const handleBlur =
    (field: ContactField) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const message = validateField(field, e.target.value.trim());
      setFieldErrors((prev) => {
        const next = { ...prev };
        if (message) next[field] = message;
        else delete next[field];
        return next;
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const errors = validateContact(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("idle");
      return;
    }
    setFieldErrors({});

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          location: form.location.trim(),
          message: form.message.trim(),
        }),
      });

      const data: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setForm(initial);
      toast.success("Thanks! We’ll be in touch soon.");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-card p-8 shadow-sm md:p-10"
      aria-labelledby="contact-form-title"
    >
      <h2
        id="contact-form-title"
        className="font-heading text-2xl font-semibold text-foreground"
      >
        Send us a message
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Tell us about your brewing goals — we typically reply within one
        business day.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="name" required>
            Full name
          </FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="John Smith"
            value={form.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            required
          />
          <FieldError id="name-error" message={fieldErrors.name} />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@brewery.com"
            value={form.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            required
          />
          <FieldError id="email-error" message={fieldErrors.email} />
        </div>
        <div className="space-y-2">
          <FieldLabel
            htmlFor="location"
            required
            hint={
              <InfoPopover id="location-hint" label="What should I enter here?">
                Where do you plan to set up your brewery or plant? A city, state
                or country is enough.
              </InfoPopover>
            }
          >
            Location
          </FieldLabel>
          <Input
            id="location"
            name="location"
            autoComplete="address-level2"
            placeholder="e.g. Pune, Maharashtra"
            value={form.location}
            onChange={handleChange("location")}
            onBlur={handleBlur("location")}
            aria-invalid={Boolean(fieldErrors.location)}
            aria-describedby={
              fieldErrors.location ? "location-error" : undefined
            }
            required
          />
          <FieldError id="location-error" message={fieldErrors.location} />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="phone">Contact number</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 123 456 7890"
            value={form.phone}
            onChange={handleChange("phone")}
            onBlur={handleBlur("phone")}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          />
          <FieldError id="phone-error" message={fieldErrors.phone} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <FieldLabel htmlFor="message" required>
            Message
          </FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your project..."
            value={form.message}
            onChange={handleChange("message")}
            onBlur={handleBlur("message")}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            required
          />
          <FieldError id="message-error" message={fieldErrors.message} />
        </div>

        {error && (
          <p
            role="alert"
            className="text-sm font-medium text-destructive sm:col-span-2"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full sm:col-span-2"
          disabled={status === "submitting"}
          aria-disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Submitting…
            </>
          ) : (
            "Submit inquiry"
          )}
        </Button>
      </div>
    </form>
  );
}
