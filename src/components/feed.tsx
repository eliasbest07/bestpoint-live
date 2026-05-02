"use client";
import { useEffect, useState } from "react";
import * as Lucide from "lucide-react";
import { Avatar, Tag } from "@/components/ui/primitives";
import { getPusherClient, CHANNELS } from "@/lib/pusher";
import { relTime } from "@/lib/utils";

type Post = any;

export function Feed({ initial }: { initial: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initial);
  useEffect(() => {
    const p = getPusherClient(); if (!p) return;
    const ch = p.subscribe(CHANNELS.feed);
    ch.bind("post:new", (post: Post) => setPosts((cur) => [post, ...cur]));
    return () => { p.unsubscribe(CHANNELS.feed); };
  }, []);

  async function like(id: string) {
    await fetch(`/api/posts/${id}/like`, { method: "POST" });
    setPosts((cur) => cur.map((p) => p.id === id ? { ...p, _count: { ...p._count, likes: (p._count?.likes || 0) + 1 } } : p));
  }

  return (
    <div className="space-y-3.5 px-4 pb-44">
      {posts.map((p) => (
        <article key={p.id} className="bp-card overflow-hidden">
          <div className="flex items-center gap-2.5 p-3 pb-2">
            <Avatar name={p.author?.name || "U"} src={p.author?.image} size={34} hue={(p.hue + 120) % 360} />
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-sm truncate">{p.author?.name || "Anon"}</div>
              <div className="text-[11px] text-bp-inkSoft">{relTime(p.createdAt)}</div>
            </div>
            {p.tag && <Tag color={p.tagColor || "#FFC83A"}>{p.tag}</Tag>}
          </div>
          {p.type !== "TEXT" && p.type !== "POLL" && (
            <div className="px-3">
              <div className="relative h-44 rounded-2xl overflow-hidden border-2 border-bp-ink bg-cover bg-center"
                style={{ background: p.mediaUrl ? `url(${p.mediaUrl}) center/cover` : `hsl(${p.hue} 75% 82%)` }}>
                {p.type === "VIDEO" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-bp-ink border-[2.5px] border-bp-bg flex items-center justify-center">
                      <Lucide.Play size={22} fill="#FFF6E9" className="text-bp-bg ml-1" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {p.type === "POLL" && p.poll?.options && (
            <div className="px-3 space-y-1.5">
              {p.poll.options.map((o: any, i: number) => {
                const total = p.poll.options.reduce((s: number, x: any) => s + (x._count?.votes || 0), 0) || 1;
                const pct = Math.round(((o._count?.votes || 0) / total) * 100);
                return (
                  <div key={o.id} className="relative h-9 rounded-xl bg-bp-bgAlt border-[1.5px] border-bp-ink overflow-hidden">
                    <div className="absolute inset-y-0 left-0 opacity-40" style={{ width: `${pct}%`, background: ["#FF5B3A", "#6B5BFF", "#2FD576"][i % 3] }} />
                    <div className="absolute inset-0 flex items-center justify-between px-3 text-sm font-semibold">
                      <span>{o.label}</span><span className="font-display font-extrabold">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="p-3">
            <h3 className="font-display font-bold text-base leading-snug mb-1 text-balance">{p.title}</h3>
            {p.body && <p className="text-sm text-bp-inkMid leading-snug">{p.body}</p>}
          </div>
          <div className="flex items-center gap-2 px-3 pb-3">
            <button className="bp-btn bg-bp-bgAlt text-xs px-3 py-1.5">
              <Lucide.MessageCircle size={14} /> {p._count?.comments ?? 0}
            </button>
            <button onClick={() => like(p.id)} className="bp-btn text-xs px-3 py-1.5 bg-transparent">
              <Lucide.Heart size={14} /> {p._count?.likes ?? 0}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
