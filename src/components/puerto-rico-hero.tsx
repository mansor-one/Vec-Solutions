export function PuertoRicoHero() {
  return (
    <div
      className="island-art"
      aria-label="Representación gráfica de Puerto Rico conectando estrategia, comunidades y resultados"
      role="img"
    >
      <svg viewBox="0 0 720 430" aria-hidden="true">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodOpacity=".24" />
          </filter>
        </defs>
        <path
          className="island-shadow"
          d="M66 198c45-41 117-57 182-63 103-10 207-2 307 21 43 10 90 27 105 60 13 28-3 57-35 72-43 20-99 12-146 14-75 3-147 24-222 23-63-1-131-14-177-47-31-23-43-54-14-80Z"
        />
        <path
          className="island"
          filter="url(#shadow)"
          d="M57 173c51-36 126-51 197-54 108-5 214 7 316 35 43 12 85 29 98 58 12 27-8 53-42 65-49 18-106 3-158 5-76 3-148 24-226 20-66-3-136-20-176-56-24-22-34-50-9-73Z"
        />
        <g className="topography">
          <path d="M91 195c99-45 223-39 330-22 73 12 151 28 211 68" />
          <path d="M77 221c114-29 221-18 325-4 75 10 145 17 213 46" />
          <path d="M112 253c72-20 160-16 242-7 76 8 145 11 211 30" />
        </g>
        <g className="connections">
          <path d="M142 220 256 169l101 80 123-74 99 69" />
          <circle cx="142" cy="220" r="8" />
          <circle cx="256" cy="169" r="8" />
          <circle cx="357" cy="249" r="8" />
          <circle cx="480" cy="175" r="8" />
          <circle cx="579" cy="244" r="8" />
        </g>
        <g className="island-label">
          <circle cx="357" cy="249" r="30" />
          <path d="m343 249 9 9 19-23" />
        </g>
      </svg>
      <div className="art-caption">
        <span />
        <p>
          <strong>Conectamos visión y acción</strong> para fortalecer
          organizaciones que sirven a Puerto Rico.
        </p>
      </div>
    </div>
  );
}
