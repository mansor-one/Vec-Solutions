"use client";
import { useState } from "react";
import Link from "next/link";
import { services } from "@/content/site";

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const response = await fetch("/api/contacto", {
      method: "POST",
      body: new FormData(form),
    });
    if (response.ok) {
      form.reset();
      setStatus("success");
    } else setStatus("error");
  }
  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="name">Nombre *</label>
        <input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="organization">Organización</label>
        <input
          id="organization"
          name="organization"
          autoComplete="organization"
        />
      </div>
      <div className="field">
        <label htmlFor="email">Correo electrónico *</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="phone">Teléfono</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="field field-full">
        <label htmlFor="service">Servicio de interés</label>
        <select id="service" name="service" defaultValue="">
          <option value="">Seleccione una opción</option>
          {services.map((item) => (
            <option key={item.slug} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field field-full">
        <label htmlFor="message">Mensaje *</label>
        <textarea id="message" name="message" required minLength={10} />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="checkbox field-full">
        <input type="checkbox" name="consent" value="true" required />
        <span>
          He leído la{" "}
          <Link href="/politica-de-privacidad">política de privacidad</Link> y
          autorizo el uso de mis datos para responder a esta solicitud. *
        </span>
      </label>
      <div className="field-full">
        <button
          className="button"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Enviando…" : "Enviar mensaje"}
        </button>
      </div>
      <div
        aria-live="polite"
        className={
          status === "success" || status === "error" ? "form-status" : ""
        }
      >
        {status === "success" &&
          "Gracias. Recibimos su mensaje y le responderemos pronto."}
        {status === "error" &&
          "No pudimos enviar el mensaje. Revise los campos o escríbanos directamente por correo."}
      </div>
    </form>
  );
}
