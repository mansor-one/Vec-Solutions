import Link from "next/link";
import { nav } from "@/content/site";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav aria-label="Navegación principal">
          <ul className="nav-list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="button button-small header-cta" href="/contacto">
          Conversemos
        </Link>
      </div>
    </header>
  );
}
