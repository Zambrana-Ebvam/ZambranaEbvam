---
name: ZambranaEbvam
description: Portafolio Cinematic Neo-Cyber, dirección A aprobada.
colors:
  background: "#07060b"
  surface: "#18131f"
  text: "#f3f0f7"
  muted: "#b5b1be"
  accent: "#9458f5"
  accent-light: "#c6a2ff"
  border: "#34303d"
  border-strong: "#67616f"
  magenta: "#e044a8"
typography:
  display:
    fontFamily: "Syncopate, Space, sans-serif"
    fontSize: "19vw"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Space, sans-serif"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  button: "6px"
  hero-button: "2px"
  artwork: "0px"
  skill-item: "8px"
  about-card: "14px"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.background}"
    rounded: "{rounded.button}"
    padding: "14px 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.accent-light}"
  hero-button-primary:
    backgroundColor: "{colors.text}"
    textColor: "#100c17"
    rounded: "{rounded.hero-button}"
---

## Overview
Dirección A aprobada: monolito cinematográfico original, titular monumental y composición editorial asimétrica. Negro, violeta y magenta contenido. Los tokens (colores, `--gutter`, `--page-width`, `--border-strong`) viven en un único `:root` en `src/index.css`. Orden de estilos: `index.css` → `App.css` → `Cinematic.css` → `Monolith.css` (esta última es la capa final de overrides). No declarar tokens fuera de `index.css`.

## Colors
Texto claro y secundarios muted; violeta para estados activos y foco, magenta para gestos puntuales. Los tonos translúcidos, portadas por proyecto y radios rectos de Monolith son decisiones intencionales de esta dirección.

### Familias tonales intencionales (no son deriva)
Valores literales fuera de la paleta base, por diseño: cada portada de proyecto (`.cover-0`…`.cover-7`) tiene su propio fondo y color de texto; las luces ambientales y partículas usan violetas/magentas translúcidos; el panel del rol y los botones del hero usan violetas con alfa. El detector los marca como avisos (advisory); no hace falta convertirlos a tokens salvo que se reutilicen en más de un componente. Excepción tipográfica: la portada Prediletta usa Georgia cursiva a propósito.

## Typography
Syncopate Bold local para titulares y portadas; Space Grotesk local (alias Space) para cuerpo y controles. Predominan mayúsculas anchas en títulos, con párrafos de lectura normal. El hero usa escala tipográfica propia; en móvil baja a 18.5vw para el nombre y 8.5vw para el apellido.

## Layout
Superficies al 100%, sin scroll anidado. Gutter `clamp(24px, 4vw, 80px)`, 20px en móvil. Lectura hasta 65ch. Proyectos usa una retícula editorial asimétrica de 12 columnas; bajo 600px se apila. Menú móvil bajo 700px.

## Elevation & Depth
El ápice del monolito pasa por delante del nombre mediante un recorte de la misma imagen; apellido, rol y controles permanecen encima. Ambas capas comparten encuadre y movimiento. Panel del rol translúcido, sin sombras añadidas a portadas.

## Shapes
Portadas e identidad de esquinas rectas; botones del hero casi rectos. Evitar círculos o figuras decorativas repetidas. Las portadas son tipográficas y dicen captura pendiente.

## Components
Hero `monolith-hero`, nombre/apellido en HTML, pieza visual original y controles reales. La franja `intro-strip` inmediatamente posterior conserva presentación y redes. Imagen local `/media/monolith-1800.jpg` con variante `/media/monolith-900.jpg`; es arte conceptual, no captura de proyecto. Ambiente CSS con pausa manual, pausa fuera de pantalla/pestaña oculta y respeto de `prefers-reduced-motion`. Foco visible de 2px con separación de 6px.

## Do's and Don'ts
- Do conservar datos reales, ES/EN y enlaces existentes.
- Do mantener contraste, foco visible y movimiento reducido.
- Ambiente luminoso permitido y puede ser protagonista (luces, destellos, polvo), siempre con botón de pausa, pausa fuera de pantalla y `prefers-reduced-motion`. Sigue sin haber neón saturado de bordes, lluvia de código ni permisos de dispositivo para decoración.
- Don't presentar arte conceptual o portadas provisionales como capturas auténticas.
