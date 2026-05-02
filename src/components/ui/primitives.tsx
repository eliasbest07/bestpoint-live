// ui kit — small helpers styled to match Bestpoint
import { cn } from "@/lib/utils";

export function Avatar({ name = "BP", size = 40, hue = 20, border = true, src }: {
  name?: string; size?: number; hue?: number; border?: boolean; src?: string | null;
}) {
  return (
    <div
      className={cn("inline-flex items-center justify-center font-display font-bold text-bp-ink flex-shrink-0 rounded-full overflow-hidden bg-cover bg-center", border && "border-2 border-bp-ink")}
      style={{ width: size, height: size, background: src ? undefined : `hsl(${hue} 75% 75%)`, backgroundImage: src ? `url(${src})` : undefined, fontSize: size * 0.38 }}
    >
      {!src && name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function Sticker({ children, color = "#FFC83A", rotate = -3, className = "" }: any) {
  return (
    <span className={cn("bp-sticker", className)} style={{ background: color, transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}

export function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full border-[1.5px] border-bp-ink font-display font-bold text-[10px]" style={{ background: color || "#FFC83A" }}>
      {children}
    </span>
  );
}
