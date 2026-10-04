# Guía de marca inicial

Personalidad: profesional, confiable, humana, clara y orientada al progreso. La voz debe ser directa, cálida y específica; evitar promesas absolutas, jerga innecesaria y datos no confirmados.

Dirección aprobada para esta iteración: gris carbón `#252B2F`, ámbar `#E89C19`, blanco y crema `#F7F5F1`. La composición puede incorporar curvas, topografía y conexiones inspiradas en Puerto Rico sin recurrir a fotografías ejecutivas genéricas. Tipografía web: pila sans-serif nativa del sistema, sin descargas externas.

El header y el footer utilizan recortes no destructivos del archivo de logo aprobado: símbolo y denominación se presentan juntos en una composición horizontal para garantizar legibilidad. El archivo original permanece intacto y debe sustituirse desde Sanity cuando se reciban artes vectoriales oficiales.

Usar espacios amplios, jerarquía fuerte, bordes discretos y movimiento mínimo. Contraste AA, foco visible y tamaño base mínimo de 16 px son obligatorios.

## Dirección editorial

La capa `src/app/editorial.css` mantiene carbón, ámbar, blanco y crema. Titulares grandes con un acento serif nativo en el hero, servicios abiertos con separadores y composición asimétrica en Noticias y el perfil. Las imágenes editoriales se muestran completas: no se recorta el arte de respaldo para simular un retrato. No se añaden imágenes genéricas, tipografías externas ni texto corporativo nuevo.

En listados editoriales, una publicación `featured` dentro de los resultados ocupa el primer lugar; si no existe, se usa la primera publicación. En móvil se conserva ese orden en una sola columna. Los textos del Hub y el perfil siguen consultando Sanity y respetando la aprobación editorial. El ámbar oscuro de lectura es `#875000` para conservar contraste sobre fondos claros. Las transiciones respetan `prefers-reduced-motion`.
