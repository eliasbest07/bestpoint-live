"use client";
import { useEffect, useState } from "react";
import * as Lucide from "lucide-react";
import { Avatar } from "@/components/ui/primitives";

function fmt(d: string | Date) {
  const dt = new Date(d);
  return dt.toLocaleDateString("es", { weekday: "short", day: "numeric", month: "short" }) + " · " +
    dt.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
}

export function ClubScreen({ onCreateMeeting, onCreateAgenda }: { onCreateMeeting: () => void; onCreateAgenda: () => void }) {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [agendas, setAgendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const [m, a] = await Promise.all([
      fetch("/api/meetings?upcoming=1").then((r) => r.json()),
      fetch("/api/agendas").then((r) => r.json()),
    ]);
    setMeetings(Array.isArray(m) ? m : []);
    setAgendas(Array.isArray(a) ? a : []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function rsvp(id: string, status: "GOING" | "MAYBE" | "DECLINED") {
    await fetch(`/api/meetings/${id}/rsvp`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }

  async function toggleItem(agendaId: string, itemId: string, done: boolean) {
    await fetch(`/api/agendas/${agendaId}/items/${itemId}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ done }) });
    setAgendas((cur) => cur.map((a) => a.id !== agendaId ? a : ({
      ...a,
      items: a.items.map((i: any) => i.id === itemId ? { ...i, done } : i),
      progress: Math.round((a.items.filter((i: any) => (i.id === itemId ? done : i.done)).length / a.items.length) * 100),
    })));
  }

  const next = meetings[0];

  return (
    <div className="px-4 pt-5 pb-44">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="font-display font-extrabold text-3xl tracking-tight">Tu club</h2>
          <p className="text-xs text-bp-inkMid">{meetings.length} reuniones · {agendas.length} agendas activas</p>
        </div>
        <button onClick={onCreateMeeting} className="bp-btn bg-bp-coral text-bp-bg text-xs px-3 py-2">
          <Lucide.Plus size={14} /> Reunión
        </button>
      </div>

      {loading && <div className="text-center text-bp-inkSoft py-8 text-sm">Cargando...</div>}

      {next && (
        <div className="relative overflow-hidden rounded-3xl border-2 border-bp-ink shadow-bp p-4 mb-4 text-white" style={{ background: "#6B5BFF" }}>
          <Lucide.Users size={140} className="absolute -top-6 -right-6 opacity-20" />
          <div className="text-[10px] uppercase tracking-[1px] font-bold opacity-90 mb-1">próxima reunión</div>
          <div className="font-display font-extrabold text-xl mb-1 tracking-tight text-balance">{next.title}</div>
          <div className="text-sm opacity-95 mb-3">{fmt(next.startsAt)}{next.location ? ` · ${next.location}` : ""}</div>
          <div className="flex items-center gap-1 mb-3">
            {next.attendees?.slice(0, 5).map((a: any, i: number) => (
              <div key={a.userId} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 5 - i }}>
                <Avatar name={a.user?.name || "U"} src={a.user?.image} size={26} hue={(i * 60) % 360} />
              </div>
            ))}
            <span className="ml-2 font-display font-bold text-xs">{next._count?.attendees ?? 0} van</span>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => rsvp(next.id, "GOING")} className="flex-1 py-2 rounded-xl bg-white/20 border border-white/40 font-display font-bold text-xs">Voy</button>
            <button onClick={() => rsvp(next.id, "MAYBE")} className="flex-1 py-2 rounded-xl bg-white/10 border border-white/30 font-display font-bold text-xs">Tal vez</button>
            <button onClick={() => rsvp(next.id, "DECLINED")} className="flex-1 py-2 rounded-xl bg-white/5 border border-white/20 font-display font-bold text-xs">No</button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-2.5">
        <h3 className="font-display font-extrabold text-base">Agendas activas</h3>
        <button onClick={onCreateAgenda} className="text-xs font-display font-bold text-bp-coral">+ nueva</button>
      </div>

      {agendas.length === 0 && !loading && (
        <div className="text-center text-bp-inkSoft py-6 text-sm border-2 border-dashed border-bp-ink/20 rounded-2xl">
          Todavía no hay agendas.
        </div>
      )}

      <div className="space-y-2">
        {agendas.map((a) => (
          <div key={a.id} className="bp-card-sm p-3">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl border-[1.5px] border-bp-ink flex items-center justify-center" style={{ background: ["#FFC83A", "#9FD9F7", "#FFB5C2", "#2FD576"][Math.abs(a.id.charCodeAt(0)) % 4] }}>
                <Lucide.CalendarDays size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-sm truncate">{a.title}</div>
                <div className="text-[10px] text-bp-inkSoft">por {a.owner?.name || "—"}</div>
              </div>
              <div className="font-display font-extrabold text-sm">{a.progress}%</div>
            </div>
            <div className="h-1.5 rounded-full bg-bp-bgAlt border border-bp-ink overflow-hidden mb-2">
              <div className="h-full bg-bp-coral transition-all" style={{ width: `${a.progress}%` }} />
            </div>
            {a.items?.length > 0 && (
              <div className="space-y-1 mt-2">
                {a.items.slice(0, 4).map((it: any) => (
                  <button key={it.id} onClick={() => toggleItem(a.id, it.id, !it.done)}
                    className="flex items-center gap-2 w-full text-left py-1 group">
                    <span className={`w-4 h-4 rounded border-[1.5px] border-bp-ink flex items-center justify-center flex-shrink-0 ${it.done ? "bg-bp-green" : "bg-bp-card"}`}>
                      {it.done && <Lucide.Check size={11} strokeWidth={3} />}
                    </span>
                    <span className={`text-xs ${it.done ? "line-through text-bp-inkSoft" : ""}`}>{it.title}</span>
                  </button>
                ))}
                {a.items.length > 4 && <div className="text-[10px] text-bp-inkSoft pl-6">+{a.items.length - 4} más</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
