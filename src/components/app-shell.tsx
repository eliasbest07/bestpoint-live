"use client";
import { useState } from "react";
import { BottomBar } from "@/components/bottom-bar";
import { FloatingSearch } from "@/components/floating-search";
import { Feed } from "@/components/feed";
import { ClubScreen } from "@/components/club-screen";
import { MeetingSheet, AgendaSheet, NoteSheet } from "@/components/sheets";
import { Avatar, Sticker } from "@/components/ui/primitives";
import * as Lucide from "lucide-react";
import type { ToolId } from "@/lib/tools";

export function AppShell({ user, posts }: { user: any; posts: any[] }) {
  const [tab, setTab] = useState("feed");
  const [searchOpen, setSearchOpen] = useState(false);
  const [perfOpen, setPerfOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [sheet, setSheet] = useState<null | "meeting" | "agenda" | "note">(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleTool(id: ToolId) {
    setSearchOpen(false);
    if (id === "t_meeting") return setSheet("meeting");
    if (id === "t_agenda") return setSheet("agenda");
    if (id === "t_note") return setSheet("note");
    if (id === "t_post") { setToast("Crear post · próximamente"); setTimeout(() => setToast(""), 1800); return; }
    setToast(`✓ ${id.replace("t_", "")} abierto`);
    setTimeout(() => setToast(""), 1800);
  }

  const now = new Date();
  const hour = now.toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
  const day = now.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "short" });

  return (
    <main className="max-w-md mx-auto min-h-screen relative">
      {tab === "feed" && (
        <>
          <header className="px-4 pt-5 pb-3">
            <div className="flex items-end justify-between mb-3">
              <div>
                <div className="text-[11px] uppercase tracking-[1px] font-semibold text-bp-inkSoft">{day}</div>
                <div className="font-display font-extrabold text-6xl leading-none tracking-[-0.05em]">{hour}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <button onClick={() => setPerfOpen((o) => !o)} className="rounded-full">
                  <Avatar name={user?.name || "BP"} src={user?.image} size={44} hue={340} />
                </button>
                <div className="font-display font-bold text-xs">{user?.name?.split(" ")[0] || "Tú"}</div>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <Sticker color="#FFC83A" rotate={-2}>Lv.{user?.level ?? 1} · {user?.levelName ?? "Novato"}</Sticker>
              <span className="bp-sticker bg-bp-card" style={{ transform: "none" }}><Lucide.Flame size={13} /> {user?.streak ?? 0} días</span>
              <span className="bp-sticker bg-bp-card pl-1" style={{ transform: "none" }}>
                <span className="w-4 h-4 rounded-full bg-bp-yellow border border-bp-ink inline-block" /> {user?.coins ?? 0}
              </span>
            </div>
          </header>

          {perfOpen && (
            <div className="absolute top-32 right-3 z-50 w-60 bp-card p-3.5 shadow-bp-coral animate-bpSlideUp">
              <div className="flex items-center justify-between mb-2">
                <div className="font-display font-extrabold text-sm">Rendimiento</div>
                <button onClick={() => setPerfOpen(false)} className="w-6 h-6 rounded-full bg-bp-ink text-bp-bg text-sm font-bold">×</button>
              </div>
              <div className="relative w-28 h-28 mx-auto mb-3">
                <svg width="112" height="112" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="56" cy="56" r="44" fill="none" stroke="rgba(26,25,24,0.08)" strokeWidth="10" />
                  <circle cx="56" cy="56" r="44" fill="none" stroke="#FF5B3A" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 44} strokeDashoffset={2 * Math.PI * 44 * (1 - (user?.performance ?? 0) / 100)} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-display font-extrabold text-4xl leading-none">{user?.performance ?? 0}<span className="text-base">%</span></div>
                  <div className="text-[9px] uppercase tracking-[1px] text-bp-inkSoft font-semibold">esta semana</div>
                </div>
              </div>
              <div className="flex gap-1 items-end h-8 mb-2.5">
                {[12, 8, 15, 5, 18, 10, 14].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div style={{ height: v, background: i === 6 ? "#FF5B3A" : "#1A1918" }} className="w-full rounded-sm" />
                    <div className="font-mono text-[8px] text-bp-inkSoft">{"LMXJVSD"[i]}</div>
                  </div>
                ))}
              </div>
              <div className="p-2 rounded-xl bg-bp-bgAlt border border-dashed border-bp-ink text-xs leading-tight">
                <b className="font-display">Te faltan {Math.max(0, 25 - (user?.performance ?? 0))}% para Lv.{(user?.level ?? 1) + 1}</b>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between px-4 pb-2.5 pt-1">
            <div className="font-display font-extrabold text-xl tracking-tight">El feed</div>
            <span className="bp-sticker bg-bp-green" style={{ transform: "none" }}>{posts.length} posts</span>
          </div>
          <Feed initial={posts} />
        </>
      )}

      {tab === "club" && (
        <ClubScreen
          key={refreshKey}
          onCreateMeeting={() => setSheet("meeting")}
          onCreateAgenda={() => setSheet("agenda")}
        />
      )}

      {tab === "profile" && (
        <div className="p-6 pb-44">
          <Avatar name={user?.name || "Tú"} src={user?.image} size={80} hue={340} />
          <h2 className="font-display font-extrabold text-3xl mt-3 tracking-tight">{user?.name || "Tú"}</h2>
          <p className="text-bp-inkMid text-sm">Lv.{user?.level ?? 1} · {user?.levelName ?? "Novato"}</p>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bp-card-sm p-3 text-center"><div className="font-display font-extrabold text-2xl">{user?.performance ?? 0}%</div><div className="text-[10px] text-bp-inkSoft uppercase tracking-wider">Rendimiento</div></div>
            <div className="bp-card-sm p-3 text-center" style={{ background: "#FFC83A" }}><div className="font-display font-extrabold text-2xl">{user?.coins ?? 0}</div><div className="text-[10px] uppercase tracking-wider">Coins</div></div>
            <div className="bp-card-sm p-3 text-center" style={{ background: "#2FD576" }}><div className="font-display font-extrabold text-2xl">{user?.streak ?? 0}d</div><div className="text-[10px] uppercase tracking-wider">Racha</div></div>
          </div>
        </div>
      )}

      {toast && <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 rounded-full bg-bp-ink text-bp-bg border-2 border-bp-bg shadow-bp-coral font-display font-bold text-sm">{toast}</div>}

      <BottomBar tab={tab} setTab={setTab} onTool={handleTool} onPlus={() => setSearchOpen(true)} />
      <FloatingSearch open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={handleTool} />

      <MeetingSheet open={sheet === "meeting"} onClose={() => setSheet(null)} onCreated={() => { setToast("✓ Reunión creada"); setTimeout(() => setToast(""), 1800); setRefreshKey((k) => k + 1); }} />
      <AgendaSheet open={sheet === "agenda"} onClose={() => setSheet(null)} onCreated={() => { setToast("✓ Agenda creada"); setTimeout(() => setToast(""), 1800); setRefreshKey((k) => k + 1); }} />
      <NoteSheet open={sheet === "note"} onClose={() => setSheet(null)} />
    </main>
  );
}
