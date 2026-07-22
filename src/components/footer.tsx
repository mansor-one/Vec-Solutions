import Link from "next/link";
import { contact, nav } from "@/content/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Logo />
          <p className="footer-intro">
            Consultoría para convertir necesidades complejas en rutas claras,
            sostenibles y medibles.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/politica-de-privacidad">Privacidad</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Contacto</h2>
          <address>
            {contact.address.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
            <br />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </address>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} VEC Solutions LLC</span>
        <span>Puerto Rico</span>
      </div>
    </footer>
  );
}
