"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const initial: ContactFields = { name: "", email: "", phone: "", message: "" };

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

      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">
            Full name <RequiredMark />
          </Label>
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
          <Label htmlFor="email">
            Email <RequiredMark />
          </Label>
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
          <Label htmlFor="phone">Contact number</Label>
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
        <div className="space-y-2">
          <Label htmlFor="message">
            Message <RequiredMark />
          </Label>
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
          <p role="alert" className="text-sm font-medium text-destructive">
            {error}
          </p>
        )}
        {status === "success" && (
          <p role="status" className="text-sm font-medium text-success">
            Thanks! We&rsquo;ll be in touch soon.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
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
