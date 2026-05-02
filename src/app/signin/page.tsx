"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bp-card p-7 w-full max-w-sm">
        <div className="font-display font-extrabold text-2xl mb-1">Entrar</div>
        <div className="text-sm text-bp-inkMid mb-5">Te mandamos un link mágico por email.</div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await signIn("resend", { email, callbackUrl: "/app" });
            setLoading(false);
          }}
          className="space-y-3"
        >
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com" className="bp-input"
          />
          <button disabled={loading} className="bp-btn-primary w-full h-12">
            {loading ? "Enviando..." : "Mandar link"}
          </button>
        </form>
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-bp-ink/20" />
          <span className="text-xs text-bp-inkSoft">o</span>
          <div className="flex-1 h-px bg-bp-ink/20" />
        </div>
        <button onClick={() => signIn("google", { callbackUrl: "/app" })} className="bp-btn w-full h-12">
          Continuar con Google
        </button>
      </div>
    </main>
  );
}
