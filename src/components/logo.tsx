import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="VEC Solutions LLC — Inicio">
      <span className="logo-symbol" aria-hidden="true">
        <Image
          src="/brand/vec-solutions-logo.jpeg"
          alt=""
          width={1600}
          height={1143}
          priority
        />
      </span>
      <span className="logo-wordmark" aria-hidden="true">
        <Image
          src="/brand/vec-solutions-logo.jpeg"
          alt=""
          width={1600}
          height={1143}
          priority
        />
      </span>
      <span className="sr-only">VEC Solutions LLC Consulting Services</span>
    </Link>
  );
}
