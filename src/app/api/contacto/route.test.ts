import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));
import { POST } from "./route";

function request() {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    name: "Nombre privado",
    email: "visitor@example.com",
    message: "Mensaje privado del formulario",
    consent: "true",
    website: "",
  }))
    form.set(key, value);
  return { formData: async () => form } as Request;
}
beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-key-private");
  vi.stubEnv("CONTACT_EMAIL", "recipient@example.com");
  send.mockReset();
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});
describe("contact endpoint provider failures", () => {
  it("keeps the public response generic and safely logs a Resend rejection", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockResolvedValue({
      error: {
        name: "validation_error",
        message: "Only send testing emails to recipient@example.com",
        statusCode: 403,
      },
    });
    const response = await POST(request());
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      ok: false,
      message: "No fue posible enviar el mensaje.",
    });
    expect(log).toHaveBeenCalledWith("[contacto] Resend error", {
      name: "validation_error",
      message: "Only send testing emails to [REDACTED]",
      statusCode: 403,
    });
    const output = JSON.stringify(log.mock.calls);
    for (const secret of [
      "test-key-private",
      "recipient@example.com",
      "visitor@example.com",
      "Mensaje privado",
      "Nombre privado",
    ])
      expect(output).not.toContain(secret);
    expect(send.mock.calls[0][0]).toMatchObject({
      from: "VEC Solutions <onboarding@resend.dev>",
      to: "recipient@example.com",
    });
  });
  it("also handles thrown errors without exposing them publicly", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockRejectedValue(
      new Error("Connection failed with test-key-private"),
    );
    const response = await POST(request());
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      ok: false,
      message: "No fue posible enviar el mensaje.",
    });
    expect(JSON.stringify(log.mock.calls)).not.toContain("test-key-private");
  });
  it("preserves successful sends without error logging", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    send.mockResolvedValue({ data: { id: "test" }, error: null });
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(log).not.toHaveBeenCalled();
  });
});
