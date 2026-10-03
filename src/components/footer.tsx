import Link from "next/link";
import { contact, nav } from "@/content/site";
import { Logo } from "./logo";

export function Footer({ newsLabel = "Noticias" }: { newsLabel?: string }) {
  return (
    <footer className="footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="shell footer-grid">
        <div>
          <Logo />
          <p className="footer-intro">
            Estrategia con propósito. Soluciones para avanzar.
          </p>
          <p className="footer-place">Desde Cayey, para todo Puerto Rico.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {item.href === "/noticias" ? newsLabel : item.label}
                </Link>
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
        <span>Consultoría · Desarrollo económico · Puerto Rico</span>
      </div>
    </footer>
  );
}
