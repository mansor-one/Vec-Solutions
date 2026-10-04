export const contact = {
  phone: "787-512-2613",
  phoneHref: "+17875122613",
  email: "consultingservicessf@gmail.com",
  address: ["Urb. Sierra Real", "Cayey, Puerto Rico 00736"],
  hours: "Lunes a viernes · 8:00 a. m. a 5:00 p. m.",
} as const;

export type Service = {
  name: string;
  slug: string;
  summary: string;
  description: string;
  problem: string;
  deliverables: string[];
  benefits: string[];
  process: string[];
};

export const services: Service[] = [
  {
    name: "Desarrollo organizacional",
    slug: "desarrollo-organizacional",
    summary:
      "Fortalecemos estructuras, procesos y capacidades para que su organización avance con claridad.",
    description:
      "Acompañamiento para evaluar la operación, alinear equipos y establecer una estructura sostenible alrededor de los objetivos de la organización.",
    problem:
      "Procesos fragmentados, responsabilidades poco claras o crecimiento que exige una estructura más sólida.",
    deliverables: [
      "Diagnóstico organizacional",
      "Recomendaciones de estructura",
      "Hoja de ruta de implementación",
    ],
    benefits: [
      "Mayor claridad operativa",
      "Decisiones mejor informadas",
      "Capacidad interna fortalecida",
    ],
    process: [
      "Escuchar y diagnosticar",
      "Diseñar soluciones",
      "Acompañar la implementación",
      "Evaluar avances",
    ],
  },
  {
    name: "Planificación operacional sostenible",
    slug: "planificacion-operacional-sostenible",
    summary:
      "Convertimos prioridades estratégicas en planes operacionales realistas, medibles y sostenibles.",
    description:
      "Diseñamos planes que conectan recursos, responsables, calendarios e indicadores para facilitar una ejecución consistente.",
    problem:
      "Planes ambiciosos sin una ruta operativa clara, métricas o responsables definidos.",
    deliverables: [
      "Plan operacional",
      "Matriz de responsabilidades",
      "Indicadores de seguimiento",
    ],
    benefits: [
      "Mejor coordinación",
      "Uso responsable de recursos",
      "Seguimiento continuo",
    ],
    process: [
      "Definir prioridades",
      "Mapear recursos",
      "Diseñar el plan",
      "Establecer seguimiento",
    ],
  },
  {
    name: "Análisis empresarial",
    slug: "analisis-empresarial",
    summary:
      "Analizamos información clave para identificar oportunidades, riesgos y decisiones prioritarias.",
    description:
      "Evaluación estructurada de la realidad empresarial y operacional para producir hallazgos útiles y próximos pasos concretos.",
    problem:
      "Decisiones importantes tomadas con información dispersa o sin una lectura integral de la operación.",
    deliverables: [
      "Análisis situacional",
      "Hallazgos y oportunidades",
      "Recomendaciones priorizadas",
    ],
    benefits: [
      "Perspectiva objetiva",
      "Riesgos visibles",
      "Prioridades accionables",
    ],
    process: [
      "Recopilar información",
      "Analizar",
      "Validar hallazgos",
      "Presentar recomendaciones",
    ],
  },
  {
    name: "Iniciativas y planes estratégicos",
    slug: "planes-estrategicos",
    summary:
      "Diseñamos iniciativas y planes que conectan visión, impacto esperado y ejecución.",
    description:
      "Facilitamos procesos de planificación estratégica y el diseño de iniciativas alineadas con necesidades reales y resultados verificables.",
    problem:
      "Una visión valiosa que aún no se traduce en prioridades, iniciativas y medidas de éxito.",
    deliverables: [
      "Marco estratégico",
      "Portafolio de iniciativas",
      "Plan de acción e indicadores",
    ],
    benefits: [
      "Dirección compartida",
      "Enfoque institucional",
      "Resultados medibles",
    ],
    process: [
      "Explorar contexto",
      "Alinear prioridades",
      "Diseñar iniciativas",
      "Planificar la ejecución",
    ],
  },
  {
    name: "Propuestas estatales y federales",
    slug: "propuestas-estatales-federales",
    summary:
      "Apoyamos la redacción analítica de propuestas claras, coherentes y alineadas con sus requisitos.",
    description:
      "Asistencia técnica para organizar la necesidad, el enfoque, los resultados y la evidencia requerida por oportunidades estatales o federales.",
    problem:
      "Convocatorias complejas que requieren integrar narrativa, evidencia, resultados y cumplimiento.",
    deliverables: [
      "Matriz de requisitos",
      "Narrativa analítica",
      "Revisión de coherencia",
    ],
    benefits: [
      "Respuesta mejor organizada",
      "Argumento consistente",
      "Menor riesgo de omisiones",
    ],
    process: [
      "Revisar convocatoria",
      "Diseñar respuesta",
      "Redactar",
      "Verificar requisitos",
    ],
  },
  {
    name: "Auditoría y monitoría de propuestas",
    slug: "auditoria-monitoria-propuestas",
    summary:
      "Damos seguimiento a propuestas aprobadas para apoyar su cumplimiento y operacionalización.",
    description:
      "Revisamos compromisos, documentación, indicadores y operación para detectar brechas y sostener una ejecución responsable.",
    problem:
      "Proyectos financiados que necesitan controles, seguimiento y evidencia consistente de su ejecución.",
    deliverables: [
      "Matriz de cumplimiento",
      "Informe de hallazgos",
      "Plan de acciones correctivas",
    ],
    benefits: [
      "Mayor control",
      "Evidencia organizada",
      "Riesgos atendidos a tiempo",
    ],
    process: [
      "Revisar compromisos",
      "Evaluar evidencia",
      "Documentar hallazgos",
      "Dar seguimiento",
    ],
  },
  {
    name: "Campañas de recaudación de fondos",
    slug: "recaudacion-de-fondos",
    summary:
      "Desarrollamos campañas con propósito, audiencias claras y una ejecución organizada.",
    description:
      "Diseño e implementación de campañas de recaudación alineadas con la misión, la capacidad y las relaciones de la organización.",
    problem:
      "Necesidad de diversificar ingresos sin una estrategia, narrativa o calendario de campaña.",
    deliverables: [
      "Concepto de campaña",
      "Plan de audiencias y mensajes",
      "Calendario de implementación",
    ],
    benefits: [
      "Esfuerzo coordinado",
      "Mensaje coherente",
      "Base para relaciones sostenibles",
    ],
    process: [
      "Definir meta",
      "Segmentar audiencias",
      "Diseñar campaña",
      "Medir resultados",
    ],
  },
  {
    name: "Proyectos sostenibles",
    slug: "proyectos-sostenibles",
    summary:
      "Evaluamos y diseñamos proyectos con viabilidad, impacto y continuidad en mente.",
    description:
      "Acompañamiento desde la evaluación inicial hasta el diseño de un proyecto que equilibre necesidad, recursos, operación e impacto.",
    problem:
      "Ideas de alto valor que requieren validar su viabilidad y construir un modelo sostenible.",
    deliverables: [
      "Evaluación de viabilidad",
      "Modelo de proyecto",
      "Plan de sostenibilidad",
    ],
    benefits: [
      "Supuestos validados",
      "Recursos mejor enfocados",
      "Continuidad planificada",
    ],
    process: [
      "Evaluar necesidad",
      "Validar viabilidad",
      "Diseñar el modelo",
      "Planificar sostenibilidad",
    ],
  },
];

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
] as const;
