"use client";

import { useState } from "react";
import Link from "next/link";
import { nav } from "@/content/site";
import { Logo } from "./logo";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-lines" aria-hidden="true" />
          <span className="menu-label">Menú</span>
        </button>
        <nav
          id="primary-navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Navegación principal"
        >
          <ul className="nav-list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="button button-small header-cta" href="/contacto">
          Hablemos <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
