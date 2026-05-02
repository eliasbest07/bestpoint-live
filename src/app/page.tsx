import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <div className="inline-flex items-center gap-2 font-display font-extrabold text-3xl mb-4">
          <span className="w-3 h-3 rounded-full bg-bp-coral border-2 border-bp-ink" />
          bestpoint
        </div>
        <h1 className="font-display font-extrabold text-5xl tracking-tight mb-4 text-balance">
          Un club. No un feed.
        </h1>
        <p className="text-bp-inkMid mb-8">
          Crear posts, agendar reuniones, compartir ideas. Acá no se gana con likes — se gana apareciendo.
        </p>
        <Link href="/signin" className="bp-btn-primary shadow-[3px_3px_0_#FF5B3A]">
          Entrar al club →
        </Link>
      </div>
    </main>
  );
}
