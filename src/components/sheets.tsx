"use client";
import { useState } from "react";
import * as Lucide from "lucide-react";

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-[95] bg-bp-ink/55 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-bpSlideUp">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bp-card p-5 shadow-bp-coral max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-extrabold text-xl tracking-tight">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-bp-ink text-bp-bg font-bold">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function MeetingSheet({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated?: () => void }) {
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!title || !when) return;
    setBusy(true);
    await fetch("/api/meetings", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, startsAt: new Date(when).toISOString(), location, description: desc }),
    });
    setBusy(false); onClose(); onCreated?.();
    setTitle(""); setWhen(""); setLocation(""); setDesc("");
  }

  return (
    <Sheet open={open} onClose={onClose} title="Agendar reunión">
      <div className="space-y-3">
        <input className="bp-input" placeholder="Título de la reunión" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="bp-input" type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} />
        <input className="bp-input" placeholder="Lugar o link (opcional)" value={location} onChange={(e) => setLocation(e.target.value)} />
        <textarea className="bp-input min-h-20 resize-y" placeholder="Descripción (opcional)" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button disabled={busy || !title || !when} onClick={submit} className="bp-btn-primary w-full h-12 disabled:opacity-50">
          <Lucide.CalendarPlus size={16} /> {busy ? "Creando..." : "Crear reunión"}
        </button>
        <div className="text-[11px] text-bp-inkSoft text-center">+15 coins por crear</div>
      </div>
    </Sheet>
  );
}

export function AgendaSheet({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated?: () => void }) {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<string[]>([""]);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!title) return;
    setBusy(true);
    await fetch("/api/agendas", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, items: items.filter(Boolean) }),
    });
    setBusy(false); onClose(); onCreated?.();
    setTitle(""); setItems([""]);
  }

  return (
    <Sheet open={open} onClose={onClose} title="Nueva agenda">
      <div className="space-y-3">
        <input className="bp-input" placeholder="Nombre de la agenda" value={title} onChange={(e) => setTitle(e.target.value)} />
        <div>
          <div className="text-xs font-display font-bold mb-2 text-bp-inkMid uppercase tracking-wider">Tareas</div>
          <div className="space-y-2">
            {items.map((it, i) => (
              <div key={i} className="flex gap-2">
                <input className="bp-input flex-1" placeholder={`Tarea ${i + 1}`} value={it}
                  onChange={(e) => setItems((arr) => arr.map((x, j) => (j === i ? e.target.value : x)))} />
                {items.length > 1 && (
                  <button onClick={() => setItems((arr) => arr.filter((_, j) => j !== i))} className="w-10 rounded-xl border-[1.5px] border-bp-ink bg-bp-bgAlt">
                    <Lucide.X size={14} className="mx-auto" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setItems((arr) => [...arr, ""])} className="mt-2 text-xs font-display font-bold text-bp-coral">
            + añadir tarea
          </button>
        </div>
        <button disabled={busy || !title} onClick={submit} className="bp-btn-primary w-full h-12 disabled:opacity-50">
          <Lucide.ListPlus size={16} /> {busy ? "Creando..." : "Crear agenda"}
        </button>
      </div>
    </Sheet>
  );
}

export function NoteSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [body, setBody] = useState("");
  return (
    <Sheet open={open} onClose={onClose} title="Crear nota">
      <textarea className="bp-input min-h-40 resize-y" placeholder="Escribí tu nota..." value={body} onChange={(e) => setBody(e.target.value)} />
      <button onClick={onClose} className="bp-btn-primary w-full h-12 mt-3" disabled={!body}>
        <Lucide.Save size={16} /> Guardar
      </button>
      <div className="text-[11px] text-bp-inkSoft text-center mt-2">Se guarda local · sync DB en Fase 3</div>
    </Sheet>
  );
}
