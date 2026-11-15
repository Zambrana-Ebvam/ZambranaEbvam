# ZambranaEbvam — portafolio personal
Stack: React 19, Vite 7, react-router-dom 7, react-icons. CSS plano (sin Tailwind). ES/EN vía `src/context/LanguageContext.jsx`.
Comandos: `npm run dev` · `npm run lint` · `npm run build`.

## Estilo (Cinematic Neo-Cyber / Monolith) — NO cambiar la dirección
- Fuente de verdad visual: DESIGN.md y PRODUCT.md. Tokens en un único `:root`.
- Paleta: fondo #07060b, texto #f3f0f7, acento violeta #9458f5/#c6a2ff, magenta #e044a8 solo puntual. Sin neón abundante.
- Tipografía: Syncopate Bold (titulares, mayúsculas) + Space Grotesk (cuerpo). Texto mínimo 12px.
- Formas rectas (radios 0–6px). Portadas de proyecto tipográficas, no capturas falsas.
- No inventar datos, métricas ni clientes. Conservar enlaces reales y ambos idiomas.

## Movimiento
- Solo transform/opacity; ease-out `cubic-bezier(.23,1,.32,1)`; UI ≤300ms.
- Hover bajo `(hover:hover) and (pointer:fine)`; respetar `prefers-reduced-motion` (opacidad sí, movimiento no).
- Nada de animación en acciones de teclado/alta frecuencia. Ambiente con pausa manual.

## Responsive y flujo
- Breakpoints únicos: 600 / 900 / 1280. Probar 390, 768, 1366, 1920.
- Rama `redesign/neo-cyber-2026`; no tocar `main`; no publicar sin pedirlo. Cambios por fases, verificando antes de seguir.
