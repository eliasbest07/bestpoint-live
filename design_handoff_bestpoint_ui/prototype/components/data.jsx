// Mock data for Bestpoint

const USER = {
  name: 'María C.',
  level: 4,
  levelName: 'Creadora',
  performance: 10, // percent
  coins: 2480,
  streak: 7,
  hue: 340,
};

const POSTS = [
  {
    id: 'p1',
    author: { name: 'Lucas R.', hue: 210 },
    type: 'image',
    time: 'hace 5 min',
    hue: 25,
    title: 'Arrancamos el jueves de taller',
    text: 'Primer encuentro del club de escritura creativa. Vengan con un cuaderno y ganas de compartir.',
    label: 'foto del taller',
    comments: 12, likes: 34,
    tag: 'Taller',
    tagColor: '#FFC83A',
  },
  {
    id: 'p2',
    author: { name: 'Sofía M.', hue: 140 },
    type: 'video',
    time: 'hace 1 h',
    hue: 180,
    title: 'Demo rápida del nuevo agenda',
    text: 'Les dejo un video corto explicando cómo organizar reuniones entre miembros.',
    label: 'video 1:24',
    comments: 8, likes: 51,
    tag: 'Tutorial',
    tagColor: '#9FD9F7',
  },
  {
    id: 'p3',
    author: { name: 'Diego T.', hue: 280 },
    type: 'poll',
    time: 'hace 3 h',
    hue: 320,
    title: '¿Qué tema para la próxima reunión?',
    text: 'Voten por favor, cerramos mañana.',
    poll: [
      { label: 'Finanzas personales', pct: 42 },
      { label: 'Creatividad en equipo', pct: 31 },
      { label: 'Hábitos de lectura', pct: 27 },
    ],
    comments: 19, likes: 22,
    tag: 'Encuesta',
    tagColor: '#FFB5C2',
  },
  {
    id: 'p4',
    author: { name: 'Ana P.', hue: 50 },
    type: 'text',
    time: 'hace 4 h',
    hue: 90,
    title: 'Tip del día',
    text: 'Agenden bloques de 25 minutos y descansen 5. Después de 4 bloques, pausa larga. Funciona.',
    comments: 4, likes: 28,
    tag: 'Idea',
    tagColor: '#2FD576',
  },
];

// Horizontal "historias / destacados" del club
// time es la hora programada / de la actividad
const HIGHLIGHTS = [
  { id: 'h1', label: 'Hoy',     time: 'ahora',  hue: 25,  live: true },
  { id: 'h2', label: 'Reunión', time: '19:00',  hue: 210 },
  { id: 'h3', label: 'Retos',   time: '20:30',  hue: 140 },
  { id: 'h4', label: 'Voces',   time: '21:00',  hue: 320 },
  { id: 'h5', label: 'Libros',  time: 'mañana', hue: 50  },
];

// Herramientas/acciones — se usan en el buscador flotante
// icon key matches Icon.<Key>
const TOOLS = [
  { id: 't_note',      label: 'Crear nota',         icon: 'Note',     color: '#FFC83A' },
  { id: 't_task',      label: 'Crear tarea',        icon: 'Task',     color: '#2FD576' },
  { id: 't_idea',      label: 'Crear idea',         icon: 'Idea',     color: '#6B5BFF' },
  { id: 't_post',      label: 'Crear post',         icon: 'Post',     color: '#FF5B3A' },
  { id: 't_agenda',    label: 'Nueva agenda',       icon: 'Agenda',   color: '#9FD9F7' },
  { id: 't_meeting',   label: 'Agendar reunión',    icon: 'Meeting',  color: '#FFB5C2' },
  { id: 't_poll',      label: 'Crear encuesta',     icon: 'Poll',     color: '#FF5B3A' },
  { id: 't_comment',   label: 'Comentar post',      icon: 'Comment',  color: '#FFC83A' },
  { id: 't_search',    label: 'Buscar en posts',    icon: 'Search',   color: '#6B5BFF' },
  { id: 't_edit',      label: 'Editar tarea',       icon: 'Edit',     color: '#2FD576' },
  { id: 't_delete',    label: 'Eliminar nota',      icon: 'Delete',   color: '#FF5B3A' },
  { id: 't_progress',  label: 'Reportar avance',    icon: 'Progress', color: '#6B5BFF' },
];

window.USER = USER;
window.POSTS = POSTS;
window.HIGHLIGHTS = HIGHLIGHTS;
window.TOOLS = TOOLS;
