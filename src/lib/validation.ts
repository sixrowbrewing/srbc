/**
 * Contact form validation shared by the client form and the /api/contact route,
 * so both sides enforce identical rules.
 */

export const MAX_NAME = 120;
export const MAX_EMAIL = 254;
export const MAX_PHONE = 32;
export const MAX_MESSAGE = 5000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{6,}$/;

export interface ContactFields {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactField = keyof ContactFields;

export type ContactErrors = Partial<Record<ContactField, string>>;

/** Validates one trimmed field value. Returns an error message, or null if valid. */
export function validateField(field: ContactField, value: string): string | null {
  switch (field) {
    case "name":
      if (value.length === 0) return "Please enter your name.";
      if (value.length > MAX_NAME)
        return `Name must be ${MAX_NAME} characters or fewer.`;
      return null;

    case "email":
      if (value.length === 0) return "Please enter your email address.";
      if (value.length > MAX_EMAIL || !EMAIL_RE.test(value))
        return "Please enter a valid email address.";
      return null;

    case "phone":
      if (value.length === 0) return null; // optional
      if (value.length > MAX_PHONE || !PHONE_RE.test(value))
        return "Please enter a valid contact number.";
      return null;

    case "message":
      if (value.length === 0) return "Please enter a message.";
      if (value.length > MAX_MESSAGE)
        return `Message must be ${MAX_MESSAGE} characters or fewer.`;
      return null;
  }
}

/** Validates every field. Returns a map of field → error, empty when all valid. */
export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of Object.keys(fields) as ContactField[]) {
    const error = validateField(field, fields[field].trim());
    if (error) errors[field] = error;
  }
  return errors;
}
