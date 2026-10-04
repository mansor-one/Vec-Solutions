import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { logResendError } from "@/lib/resend-error";

export async function POST(request: Request) {
  const form = await request.formData();
  const raw = Object.fromEntries(form.entries());
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success)
    return Response.json(
      { ok: false, message: "Revise los campos requeridos." },
      { status: 400 },
    );
  if (parsed.data.website) return Response.json({ ok: true });
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL;
  if (!apiKey || !recipient) {
    console.info(
      "Formulario validado; envío desactivado hasta configurar Resend.",
    );
    return Response.json(
      { ok: false, message: "El servicio de correo aún no está configurado." },
      { status: 503 },
    );
  }
  const { name, organization, email, phone, service, message } = parsed.data;
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: "VEC Solutions <onboarding@resend.dev>",
      to: recipient,
      replyTo: email,
      subject: `Consulta web de ${name}`,
      text: [
        `Nombre: ${name}`,
        `Organización: ${organization || "—"}`,
        `Correo: ${email}`,
        `Teléfono: ${phone || "—"}`,
        `Servicio: ${service || "—"}`,
        "",
        message,
      ].join("\n"),
    });
    if (result.error) throw result.error;
    return Response.json({ ok: true });
  } catch (error) {
    logResendError(error, [
      apiKey,
      recipient,
      name,
      organization,
      email,
      phone,
      service,
      message,
    ]);
    return Response.json(
      { ok: false, message: "No fue posible enviar el mensaje." },
      { status: 502 },
    );
  }
}
