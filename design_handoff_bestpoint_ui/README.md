# Handoff: Bestpoint UI — flujo inicial

## Overview
Prototipo del flujo inicial de **Bestpoint** — una "comunidad / club" mobile-first donde los usuarios crean posts, agendan reuniones, comparten ideas y reportan avances. El paquete contiene el prototipo HTML completo del onboarding + feed + barra de herramientas dinámica + buscador flotante + panel de rendimiento.

## About the Design Files
**Los archivos de este bundle son referencias de diseño creadas en HTML** — prototipos que muestran look & feel y comportamiento intencional, no código de producción para copiar directo. La tarea es **recrear estos diseños en tu codebase real** (Next.js 15 + Tailwind + shadcn/ui ya scaffoldeado en `nextapp/`) siguiendo los patrones existentes (Server Components, Auth.js, Prisma, Pusher, etc.).

El prototipo está hecho con React + Babel inline + estilos inline JS — la migración a Tailwind + componentes Server/Client es responsabilidad del developer.

## Fidelity
**Hi-fi.** Colores, tipografía, spacing, sombras y micro-interacciones son finales. Recrear pixel-perfect.

## Pantallas / Vistas

### 1. Onboarding — "Polaroids apiladas"
- **Propósito**: presentar la comunidad con 4 cards tipo polaroid (~4 mensajes clave). Tap = se "despega" la card de arriba con animación de rotación + escala.
- **Layout**: viewport 390×800, stack centrado vertical. Card activa al frente, las otras detrás con offset Y/rotación.
- **Card**: 240×360, fondo `#FFFCF5`, border `2px solid #1A1918`, radius `20px`, shadow `4px 4px 0 #1A1918`. Sticker pin amarillo girado `-8°` arriba a la derecha. Imagen placeholder hatched (`hsl(<hue> 75% 80%)` con líneas diagonales).
- **Cards** (definidas en `components/data.jsx → ONBOARDING_CARDS`): "Tu club te espera", "Crea posts cuando quieras", "Junta gente real", "Ganá apareciendo".
- **Botón final**: "Entrar al club →" centrado, fondo ink, texto bg.

### 2. Feed (pantalla principal)
- **Header**: día de la semana en uppercase tracking 1px (11px) + **hora gigante** (`Space Grotesk` 800, 56px, letter-spacing -2.5px). Avatar 44px a la derecha (clickable → toggle panel rendimiento). Debajo: chips de Lv., racha 🔥, coins 🪙.
- **Destacados** (HIGHLIGHTS row): 5 círculos 56px en scroll horizontal (Hoy "ahora" / Reunión 19:00 / Retos 20:30 / Voces 21:00 / Libros mañana). Bordes ink, fondo `hsl(hue 75% 80%)`, shadow `2px 2px 0 ink`. Hora en mono 9px debajo del label. Estados:
  - `live: true` → badge LIVE coral pulsante (`bp-pulse 1.4s infinite`)
  - próximas 2hs → badge PRONTO amarillo, shadow coral
  - pasadas → opacity 0.45
- **"Del club · hoy"**: scroll horizontal de mini-posts.
- **"El feed"**: lista vertical con `PostCard` (texto / imagen / video / encuesta).

### 3. Bottom Bar dinámica
- **Posición**: fixed bottom, max-w-md, mx-auto, padding 12px lados.
- **Card** estilo bp-card. Dos secciones separadas por dashed border:
  1. **Shortcuts MRU**: 4 botones que se reordenan por Most Recently Used (persistir en localStorage `bp_mru` + DB `ToolUsage`). Cada botón: icono Lucide + label corto, fondo del color del tool, border ink, shadow `2px 2px 0 ink`. Etiqueta vertical "LIVE" a la izquierda (uppercase, 9px, `writing-mode: vertical-rl rotate(180deg)`).
  2. Botón **+** (más): cuadrado ink, abre `FloatingSearch`.
- Debajo: tabs Feed / Club / Perfil. Tab activo: fondo ink, texto bg.

### 4. Floating Search ("+")
- Overlay full screen, fondo `rgba(26,25,24,0.55)` con backdrop-blur 4px.
- Card centrada arriba con sombra coral. Input grande, lista de resultados en grid 2 col (cada item: ícono coloreado 36×36 + label).
- Tools (en `nextapp/src/lib/tools.ts`): nota, tarea, idea, post, agenda, reunión, encuesta, comentar, buscar, editar, eliminar, reportar avance.
- Al seleccionar: bumpea MRU + ejecuta acción + cierra overlay + toast superior.

### 5. Panel flotante de Rendimiento
- Aparece como pestaña coral en el borde derecho (collapsed: 8×12 padding, fondo coral, texto blanco). Tap del avatar (o pestaña) → expande a card 240px.
- Card expandida: ring grande 110px con porcentaje al centro (`{perf}%` 36px bold + "esta semana" 9px uppercase). Barras de últimos 7 días (L M X J V S D) — la última en coral, resto ink. Hint con `Te faltan X% para Lv.N+1`.

## Interacciones & Comportamiento
- **Onboarding tap card** → animación slide+rotate 0.5s `cubic-bezier(.3,1.2,.4,1)`, próxima card al frente.
- **Avatar header** click → toggle Performance Float (state compartido con bottom-bar wrapper).
- **Shortcut tap** → bump MRU (front of array, dedupe, slice 4) → persistir local + POST `/api/tools/mru` → toast "✓ <tool> abierto".
- **Realtime**: feed suscrito a canal Pusher `feed`, evento `post:new` → prepend al state.
- **Like**: optimistic update + POST `/api/posts/:id/like`.
- **Highlights**: calcular diff de hora cada minuto (`setInterval`) para refrescar estados live/soon/past.

## State Management
- `tab` (feed | club | profile)
- `searchOpen` (boolean)
- `perfOpen` (boolean)
- `mru: ToolId[]` — local + sync DB
- `posts: Post[]` — initial server-fetched, mutado por Pusher
- `toast` (string, auto-clear 1.8s)

## Design Tokens

### Colores
```
bp.bg       #FFF6E9   fondo principal
bp.bgAlt    #FFEFD8   fondo alternativo (chips, inputs)
bp.card     #FFFCF5   tarjetas
bp.ink      #1A1918   texto/border principal
bp.inkMid   #4A4743   texto secundario
bp.inkSoft  #8A857D   texto terciario
bp.coral    #FF5B3A   primario (CTAs, live)
bp.green    #2FD576   éxito, tasks
bp.violet   #6B5BFF   accent (ideas, search)
bp.yellow   #FFC83A   secondary (level, sticker)
bp.sky      #9FD9F7   info (agenda)
bp.pink     #FFB5C2   accent (encuesta)
```

### Tipografía
- Display: `Space Grotesk` (400/500/600/700/800)
- UI: `Inter` (400/500/600/700)
- Mono ocasional (horas en highlights, tickers): `ui-monospace`

### Spacing / Radius / Shadows
- Radius cards: 22px / pills: 999px / inputs: 16px
- Shadow firma: `3px 3px 0 #1A1918` (cards), `2px 2px 0 #1A1918` (sm), `4px 4px 0 #1A1918` (lg), `3px 3px 0 #FF5B3A` (coral primary)
- Border firma: `2px solid #1A1918` (siempre crisp, nunca smooth)

### Animaciones
- `bpPulse`: 1.4s infinite — scale 1 → 1.15 → 1 (LIVE badge)
- `bpSlideUp`: 0.3s cubic-bezier(.3,1.2,.4,1) — translateY(20px) → none (modales, paneles)

## Assets
- **Iconos**: `lucide-react` (StickyNote, CheckSquare, Lightbulb, Image, CalendarDays, Users, BarChart3, MessageCircle, Search, Pencil, Trash2, TrendingUp, Plus, Home, Star, User, Heart, Play, Flame).
- **Avatares**: placeholder de iniciales sobre fondo `hsl(hue 75% 75%)` o `<img>` si `user.image` existe.
- **Imágenes posts**: por ahora placeholder hatched. Cuando UploadThing esté listo, usar `mediaUrl`.

## Archivos en este bundle

```
prototype/
├── index.html                          # Punto de entrada — monta móvil + web side-by-side
└── components/
    ├── theme.jsx                       # Tokens (THEME), Avatar, Sticker
    ├── icons.jsx                       # Iconos SVG inline
    ├── data.jsx                        # USER, POSTS, TOOLS, HIGHLIGHTS, ONBOARDING_CARDS
    ├── phone.jsx                       # Frame del teléfono custom
    ├── onboarding.jsx                  # Polaroids apiladas
    ├── user-header.jsx                 # Hora gigante + chips + PerformanceFloat
    ├── post-card.jsx                   # Highlights row + PostCard (4 tipos)
    ├── bottom-bar.jsx                  # MRU + tabs
    ├── floating-search.jsx             # Overlay buscador
    ├── screens.jsx                     # FeedScreen, ClubScreen, ProfileScreen
    ├── app.jsx                         # BestpointApp wrapper
    └── variants.jsx                    # Variantes alternativas (referencia)
```

## Cómo abrir el prototipo
Abrí `prototype/index.html` en cualquier navegador (no necesita build). Tiene móvil y web side-by-side con tabs para ver variantes alternativas.

## Mapeo a tu codebase Next.js (`nextapp/`)
Ya tenés scaffold parcial en `nextapp/src/components/`. Migración sugerida:

| Prototipo | Destino Next.js |
|---|---|
| `theme.jsx` | `tailwind.config.js` (ya hecho) + `globals.css` |
| `icons.jsx` | reemplazar por `lucide-react` (ya instalado) |
| `data.jsx → USER` | `prisma.user.findUnique` server-side |
| `data.jsx → POSTS` | `prisma.post.findMany` server-side |
| `data.jsx → TOOLS` | `src/lib/tools.ts` (ya hecho) |
| `onboarding.jsx` | `src/components/onboarding.tsx` (client) — guardar progreso en `localStorage` o columna `User.onboardedAt` |
| `user-header.jsx` | `src/components/user-header.tsx` (client) — recibe `user` por props |
| `post-card.jsx → Highlights` | `src/components/highlights.tsx` (client, refresh cada minuto) |
| `post-card.jsx → PostCard` | `src/components/post-card.tsx` (client, optimistic likes) |
| `bottom-bar.jsx` | `src/components/bottom-bar.tsx` (ya hecho — chequear MRU sync) |
| `floating-search.jsx` | `src/components/floating-search.tsx` (ya hecho) |
| `screens.jsx` | `src/app/app/page.tsx` (server) + `src/components/app-shell.tsx` (client wrapper) |

## Notas para el developer
- **Mantener bordes sólidos negros y shadow firmas**: parte del DNA visual. Nada de soft shadows ni gradientes.
- **No inventar contenido nuevo**. Copy del prototipo es final salvo que pidan cambio.
- **Mobile-first**: max-width 448px (md de Tailwind) en el shell.
- **Accesibilidad**: hit targets mínimo 44px, labels en botones icon-only.
- **Hot ones**: el MRU se sincroniza cliente ↔ servidor — al login, fetch `/api/tools/mru` y mergear con el local; al cambiar, optimistic update local + POST.
