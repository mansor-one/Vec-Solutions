# VEC Solutions LLC

Primera versión del sitio oficial de VEC Solutions LLC para `vec-solutions.net`.

## Desarrollo

Requiere Node.js 22 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Sin variables de Sanity, el sitio usa contenido fallback local y `/studio` muestra instrucciones de conexión. Para calidad: `npm run check` y `npm run build`.

## Entorno

Todas las variables están documentadas en `.env.example`. Los tokens y claves sólo se configuran en el entorno local o Vercel; nunca se versionan. `RESEND_API_KEY` y `CONTACT_EMAIL` activan el formulario. Antes de producción, verifique un dominio remitente en Resend y sustituya `onboarding@resend.dev` en el Route Handler.

## Despliegue

Importe este repositorio en Vercel, configure las variables y use `main` como rama de producción. Configure CORS en Sanity para los dominios de producción, preview y desarrollo.
