import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";
describe("contactSchema", () => {
  it("acepta una consulta válida", () => {
    expect(
      contactSchema.safeParse({
        name: "Ana Pérez",
        email: "ana@example.com",
        message: "Necesito apoyo con un plan estratégico.",
        consent: "true",
        website: "",
      }).success,
    ).toBe(true);
  });
  it("rechaza honeypot y consentimiento ausente", () => {
    expect(
      contactSchema.safeParse({
        name: "Bot",
        email: "bot@example.com",
        message: "Mensaje suficientemente largo",
        website: "spam.example",
      }).success,
    ).toBe(false);
  });
});
