import { afterEach, describe, expect, it, vi } from "vitest";
import { logResendError } from "./resend-error";

afterEach(() => vi.restoreAllMocks());
describe("safe Resend diagnostics", () => {
  it("logs only the provider name, message and HTTP status", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    logResendError(
      {
        name: "validation_error",
        message: "Domain is not verified",
        statusCode: 403,
        headers: { authorization: "private" },
      },
      [],
    );
    expect(log).toHaveBeenCalledWith("[contacto] Resend error", {
      name: "validation_error",
      message: "Domain is not verified",
      statusCode: 403,
    });
  });
  it("redacts emails, credentials and echoed form values before logging", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const body = 'Contenido privado con "comillas"';
    logResendError(
      {
        name: "validation_error",
        message: `Only send to owner@example.com; reply visitor@example.com; re_test_secret; Bearer private-token; ${body}; ${JSON.stringify(body).slice(1, -1)}; ${encodeURIComponent(body)}`,
      },
      [body, "\ud800"],
    );
    const output = JSON.stringify(log.mock.calls);
    for (const value of [
      "owner@example.com",
      "visitor@example.com",
      "re_test_secret",
      "private-token",
      "Contenido",
      "headers",
    ])
      expect(output).not.toContain(value);
    expect(output).toContain("[REDACTED]");
    expect(log.mock.calls[0][1]).not.toHaveProperty("statusCode");
  });
  it("handles exceptions and limits multiline diagnostics", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    logResendError(new Error("Network\nerror " + "x".repeat(2000)), []);
    const details = log.mock.calls[0][1] as { name: string; message: string };
    expect(details.name).toBe("Error");
    expect(details.message).not.toContain("\n");
    expect(details.message.length).toBe(1000);
  });
});
