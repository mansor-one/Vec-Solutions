import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="VEC Solutions LLC — Inicio">
      <span className="logo-mark" aria-hidden="true">
        V
      </span>
      <span>
        <strong>VEC</strong>
        <small>Solutions LLC</small>
      </span>
    </Link>
  );
}
