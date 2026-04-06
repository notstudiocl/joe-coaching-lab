# CLAUDE.md — Joe Coaching Lab
## Descripción general del proyecto

Estás construyendo la landing page oficial de **Joe Coaching Lab**, una empresa de coaching nutricional y fitness 100% online. El objetivo de la página es captar leads de personas interesadas en mejorar su composición corporal (ganar músculo y mejorar su alimentación), transmitiéndoles confianza y motivación para que dejen sus datos de contacto.

---

## Stack tecnológico

- **Framework:** Next.js (App Router)
- **Estilos:** Tailwind CSS
- **Idioma del sitio:** Español únicamente
- **Animaciones:** Framer Motion (fade-in, slide-up suaves al hacer scroll)
- **Formulario de contacto:** React Hook Form (sin backend de pago, solo envío por formulario o mailto)
- **Tipografía sugerida:** Inter o Plus Jakarta Sans (Google Fonts)
- **No usar:** librerías de UI pesadas como MUI o Chakra. Solo Tailwind puro.

---

## Identidad de marca

| Elemento       | Valor                                      |
|----------------|--------------------------------------------|
| Nombre         | Joe Coaching Lab                  |
| Color primario | Cyan fuerte / Azul eléctrico (`#00B4D8` o `#0077B6`) |
| Color secundario | Blanco puro (`#FFFFFF`)                  |
| Color de fondo | Gris muy oscuro o negro (`#0A0A0A` o `#111827`) |
| Acento         | Cyan claro para hover y destacados (`#90E0EF`) |
| Tipografía     | Limpia, moderna, sans-serif                |
| Tono visual    | Profesional, oscuro con detalles cyan que transmiten energía y confianza |

> No hay logo definido aún. Usar el nombre "Joe Coaching Lab" en texto con tipografía bold como logotipo provisional.

---

## Público objetivo

- Hombres y mujeres de **20 a 35 años**
- Buscan **ganar músculo y mejorar su alimentación**
- Viven online, son activos en redes sociales
- Motivados pero necesitan estructura y guía profesional
- Toman decisiones rápidas si ven resultados reales y una propuesta clara

---

## Tono de comunicación

**Mezcla: profesional con calor humano.**

- Hablar de **tú** al usuario, nunca de "usted"
- Usar frases directas orientadas a resultados: "Transforma tu cuerpo", "Empieza hoy"
- Evitar tecnicismos innecesarios, pero mantener credibilidad
- Inspirar acción sin ser agresivo ni usar lenguaje de venta barato
- Los textos deben sentirse como si un coach de confianza te hablara directamente

---

## Estructura de la landing page

La landing es **una sola página (single page)** con scroll continuo. Las secciones en orden son:

### 1. Hero
- Headline impactante orientado a la transformación
- Subheadline con la propuesta de valor clara
- CTA principal (botón que lleva al formulario de contacto)
- Imagen o fondo visual de alto impacto (atleta, composición oscura con cyan)

### 2. El Plan que Accionaremos
- Sección que explica el método o proceso de Joe Plan paso a paso
- Usar 3 o 4 pasos numerados con íconos simples
- Transmitir claridad y profesionalismo: el usuario debe entender exactamente qué esperar

### 3. Caso de Éxito
- Historia de transformación real (o placeholder bien redactado)
- Incluir: nombre, objetivo, resultado y cita testimonial
- Puede incluir una foto (usar placeholder si no hay imagen)
- Diseño tipo tarjeta con acento cyan

### 4. Contacto
- Formulario simple: Nombre, Email, WhatsApp/Teléfono, Mensaje (opcional)
- Botón de envío con color primario cyan
- Texto motivador encima del formulario

---

## Regla crítica de UX: Botón/formulario siempre visible

> **Esta es una regla de diseño no negociable.**

El botón de contacto o un acceso directo al formulario debe estar **presente y visible en todo momento** mientras el usuario hace scroll, de forma **minimalista pero clara**:

- Implementar un **botón flotante fijo** (bottom-right) con el texto "Contáctame" o "Empieza ya" que al hacer clic lleva al formulario o abre un modal ligero
- El botón debe tener el color primario cyan, con sombra suave y leve animación de pulso para llamar la atención sin molestar
- En mobile, el botón flotante debe ser accesible con el pulgar (esquina inferior derecha)
- No ocultar ni quitar este botón en ninguna sección de la página

---

## Animaciones

- Usar **Framer Motion** con variantes de `fadeInUp` al entrar en viewport
- Las animaciones deben ser **suaves y rápidas** (duración 0.4s - 0.6s, easing ease-out)
- No usar animaciones en loop salvo el pulso sutil del botón flotante
- El hero puede tener un fade-in inicial al cargar la página

---

## Estructura de carpetas esperada

```
joe-plan-coaching/
├── app/
│   ├── layout.tsx         # Fuentes, metadata global
│   ├── page.tsx           # Página principal (landing)
│   └── globals.css        # Variables CSS y estilos base Tailwind
├── components/
│   ├── Navbar.tsx         # Navegación sticky simple
│   ├── Hero.tsx
│   ├── Plan.tsx           # Sección "El Plan"
│   ├── CasoExito.tsx      # Testimonio / caso de éxito
│   ├── Contacto.tsx       # Formulario de contacto
│   ├── Footer.tsx
│   └── FloatingCTA.tsx    # Botón flotante siempre visible
├── public/
│   └── images/            # Imágenes del proyecto
├── tailwind.config.ts
├── next.config.ts
└── CLAUDE.md
```

---

## Convenciones de código

- Todos los componentes en **TypeScript** (`.tsx`)
- Usar **componentes funcionales** con arrow functions
- Props tipadas con `interface` o `type`
- Clases de Tailwind directamente en JSX, sin CSS separado salvo `globals.css`
- Nombres de componentes en **PascalCase**
- Nombres de archivos en **PascalCase** para componentes, **camelCase** para utilidades
- Sin comentarios innecesarios; el código debe ser auto-descriptivo

---

## SEO y metadata

- Configurar `metadata` en `layout.tsx` con:
  - `title`: "Joe Coaching Lab | Coaching Nutricional y Fitness Online"
  - `description`: orientada a ganar músculo y mejorar alimentación, con CTA
  - `og:image`: placeholder por ahora
- Usar etiquetas semánticas correctas: `<section>`, `<h1>`, `<h2>`, `<article>`
- Solo un `<h1>` por página (en el Hero)

---

## Lo que Claude NO debe hacer

- No usar librerías de componentes UI (MUI, Chakra, shadcn) salvo que se indique
- No crear rutas adicionales sin que se soliciten
- No inventar colores fuera de la paleta definida
- No agregar secciones que no estén en la estructura aprobada sin preguntar
- No eliminar el botón flotante de contacto bajo ninguna circunstancia
- No usar inglés en textos visibles del sitio
- No hacer el diseño "genérico de agencia"; debe verse como una marca personal fuerte

---

## Lo que Claude SÍ debe priorizar

- **Mobile-first:** diseñar primero para móvil, luego adaptar a desktop
- **Velocidad de carga:** imágenes optimizadas con `next/image`, lazy loading
- **Accesibilidad básica:** contraste adecuado, `alt` en imágenes, labels en formulario
- **Consistencia visual:** mantener siempre la paleta cyan/oscuro en todos los componentes
- **CTA siempre presente:** el formulario o botón flotante debe ser visible en toda la página

---

## Referencia visual (solo inspiración)

La competencia au-coaching.com fue tomada como referencia de estilo visual moderno para coaching online. **No se debe copiar su estructura ni contenido.** Solo tomar como inspiración el nivel de calidad visual, uso del espacio y presentación de servicios.

---

## Comandos útiles para desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Lint
npm run lint
```
