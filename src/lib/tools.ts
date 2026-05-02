export const TOOLS = [
  { id: "t_note", label: "Crear nota", icon: "StickyNote", color: "#FFC83A" },
  { id: "t_task", label: "Crear tarea", icon: "CheckSquare", color: "#2FD576" },
  { id: "t_idea", label: "Crear idea", icon: "Lightbulb", color: "#6B5BFF" },
  { id: "t_post", label: "Crear post", icon: "Image", color: "#FF5B3A" },
  { id: "t_agenda", label: "Nueva agenda", icon: "CalendarDays", color: "#9FD9F7" },
  { id: "t_meeting", label: "Agendar reunión", icon: "Users", color: "#FFB5C2" },
  { id: "t_poll", label: "Crear encuesta", icon: "BarChart3", color: "#FF5B3A" },
  { id: "t_comment", label: "Comentar post", icon: "MessageCircle", color: "#FFC83A" },
  { id: "t_search", label: "Buscar en posts", icon: "Search", color: "#6B5BFF" },
  { id: "t_edit", label: "Editar tarea", icon: "Pencil", color: "#2FD576" },
  { id: "t_delete", label: "Eliminar nota", icon: "Trash2", color: "#FF5B3A" },
  { id: "t_progress", label: "Reportar avance", icon: "TrendingUp", color: "#6B5BFF" },
] as const;

export type ToolId = (typeof TOOLS)[number]["id"];
