"use client";
import { useEffect, useRef, useState } from "react";
import * as Lucide from "lucide-react";
import { TOOLS, type ToolId } from "@/lib/tools";

export function FloatingSearch({ open, onClose, onSelect }: { open: boolean; onClose: () => void; onSelect: (id: ToolId) => void }) {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { setQ(""); setTimeout(() => ref.current?.focus(), 80); } }, [open]);
  if (!open) return null;
  const filtered = q.trim()
    ? TOOLS.filter((t) => t.label.toLowerCase().includes(q.toLowerCase()))
    : [...TOOLS];
  return (
    <div onClick={onClose} className="fixed inset-0 z-[90] bg-bp-ink/55 backdrop-blur-sm p-4 pt-20 flex flex-col animate-bpSlideUp">
      <div onClick={(e) => e.stopPropagation()} className="max-w-md w-full mx-auto bp-card p-3.5 flex-1 min-h-0 flex flex-col shadow-bp-coral">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-bp-bgAlt border-[1.5px] border-bp-ink mb-3">
          <Lucide.Search size={18} />
          <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Escribe para buscar..."
            className="flex-1 bg-transparent outline-none font-display font-semibold text-base" />
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-bp-ink text-bp-bg font-display font-bold">×</button>
        </div>
        <div className="text-[10px] uppercase tracking-[1px] font-bold text-bp-inkSoft px-1 pb-2">
          {q ? `${filtered.length} resultados` : "Acciones"}
        </div>
        <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 overflow-y-auto">
          {filtered.map((t) => {
            const I = (Lucide as any)[t.icon];
            return (
              <button key={t.id} onClick={() => onSelect(t.id as ToolId)} className="flex items-center gap-2.5 p-3 rounded-2xl bg-bp-card border-[1.5px] border-bp-ink shadow-bp-sm active:translate-x-px active:translate-y-px text-left">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center border-[1.5px] border-bp-ink flex-shrink-0" style={{ background: t.color }}>
                  <I size={18} />
                </span>
                <span className="font-display font-bold text-sm leading-tight">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
