/** Log only provider diagnostics; never serialize the error or request. */
export function logResendError(
  error: unknown,
  sensitiveValues: readonly string[],
) {
  const details =
    typeof error === "object" && error !== null
      ? (error as { name?: unknown; message?: unknown; statusCode?: unknown })
      : {};
  function redact(value: unknown, fallback: string, limit: number) {
    if (typeof value !== "string") return fallback;
    let safe = value;
    for (const sensitive of sensitiveValues.filter(Boolean)) {
      // Providers can echo literal, JSON-escaped or URL-encoded input.
      const variants = new Set([
        sensitive,
        JSON.stringify(sensitive).slice(1, -1),
      ]);
      try {
        variants.add(encodeURIComponent(sensitive));
      } catch {
        // Malformed Unicode must not break the generic error response.
      }
      for (const variant of variants) {
        safe = safe.split(variant).join("[REDACTED]");
      }
    }
    return safe
      .replace(/[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+/gi, "[REDACTED]")
      .replace(/\bBearer\s+\S+/gi, "Bearer [REDACTED]")
      .replace(/\bre_[A-Za-z0-9_-]+\b/g, "[REDACTED]")
      .replace(
        /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,
        "[REDACTED]",
      )
      .replace(/[\r\n\t]/g, " ")
      .slice(0, limit);
  }
  console.error("[contacto] Resend error", {
    name: redact(details.name, "unknown_error", 120),
    message: redact(
      details.message,
      "Error de envío sin detalle disponible.",
      1000,
    ),
    ...(typeof details.statusCode === "number" &&
    Number.isInteger(details.statusCode) &&
    details.statusCode >= 100 &&
    details.statusCode <= 599
      ? { statusCode: details.statusCode }
      : {}),
  });
}
