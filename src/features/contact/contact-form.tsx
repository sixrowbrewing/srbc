"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initial: FormState = { name: "", email: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
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
        Tell us about your brewing goals — we typically reply within one business day.
      </p>

      <div className="mt-8 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="John Smith"
            value={form.name}
            onChange={handleChange("name")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@brewery.com"
            value={form.email}
            onChange={handleChange("email")}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your project..."
            value={form.message}
            onChange={handleChange("message")}
            required
          />
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
