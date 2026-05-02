"use client";
import * as Lucide from "lucide-react";
import { TOOLS, type ToolId } from "@/lib/tools";
import { useEffect, useState } from "react";

const DEFAULT_MRU: ToolId[] = ["t_note", "t_task", "t_idea", "t_post"];

export function useMRU() {
  const [mru, setMru] = useState<ToolId[]>(DEFAULT_MRU);
  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem("bp_mru") || "null");
      if (Array.isArray(local) && local.length) setMru(local.slice(0, 8));
    } catch {}
    fetch("/api/tools/mru").then((r) => r.json()).then((server) => {
      if (Array.isArray(server) && server.length) setMru(server.slice(0, 8));
    }).catch(() => {});
  }, []);
  function bump(id: ToolId) {
    setMru((p) => {
      const next = [id, ...p.filter((x) => x !== id)].slice(0, 8) as ToolId[];
      try { localStorage.setItem("bp_mru", JSON.stringify(next)); } catch {}
      return next;
    });
    fetch("/api/tools/mru", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ toolId: id }) }).catch(() => {});
  }
  return { mru, bump };
}

export function BottomBar({ tab, setTab, onTool, onPlus }: { tab: string; setTab: (t: string) => void; onTool: (id: ToolId) => void; onPlus: () => void }) {
  const { mru, bump } = useMRU();
  const shortcuts = mru.slice(0, 4).map((id) => TOOLS.find((t) => t.id === id)!).filter(Boolean);
  function handle(id: ToolId) { bump(id); onTool(id); }
  return (
    <div className="fixed bottom-3 left-0 right-0 px-3 z-40 pointer-events-none">
      <div className="max-w-md mx-auto bp-card overflow-hidden pointer-events-auto">
        <div className="flex items-center gap-1.5 p-2 pb-1.5 border-b border-dashed border-bp-ink/15">
          <div className="text-[9px] uppercase tracking-[1px] font-bold text-bp-inkSoft [writing-mode:vertical-rl] rotate-180 px-0.5">LIVE</div>
          <div className="flex gap-1.5 flex-1">
            {shortcuts.map((tool) => {
              const I = (Lucide as any)[tool.icon] as any;
              return (
                <button key={tool.id} onClick={() => handle(tool.id as ToolId)}
                  className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-2xl border-[1.5px] border-bp-ink active:translate-y-px"
                  style={{ background: tool.color }}>
                  <I size={18} strokeWidth={2} className="text-bp-ink" />
                  <span className="font-display font-bold text-[9px] truncate max-w-full px-1">{tool.label.replace(/^(Crear|Agendar|Editar|Eliminar|Reportar|Nueva|Buscar en) /, "")}</span>
                </button>
              );
            })}
            <button onClick={onPlus} className="w-12 flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-2xl border-[1.5px] border-bp-ink bg-bp-ink">
              <Lucide.Plus size={20} className="text-bp-bg" />
              <span className="font-display font-bold text-[9px] text-bp-bg">más</span>
            </button>
          </div>
        </div>
        <div className="flex gap-1 p-2 pt-1.5">
          {[
            { id: "feed", label: "Feed", Icon: Lucide.Home },
            { id: "club", label: "Club", Icon: Lucide.Star },
            { id: "profile", label: "Perfil", Icon: Lucide.User },
          ].map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 p-2 rounded-2xl font-display font-bold text-xs ${tab === id ? "bg-bp-ink text-bp-bg" : "text-bp-ink"}`}>
              <Icon size={18} /> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
