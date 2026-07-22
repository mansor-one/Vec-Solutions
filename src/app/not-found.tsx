import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="shell narrow">
        <p className="eyebrow">Error 404</p>
        <h1>Esta página no está aquí.</h1>
        <p className="lead">
          La dirección pudo cambiar o el contenido ya no está disponible.
        </p>
        <Link className="button" href="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
