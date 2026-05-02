# Bestpoint — Next.js 15 + Auth.js + Prisma + Pusher

Prototipo funcional del club Bestpoint. Stack: Next.js 15 (App Router), TypeScript, Tailwind, Prisma + Postgres, Auth.js v5 (Google + Resend magic link), Pusher (realtime), UploadThing (uploads).

## 1. Setup local

```bash
cd nextapp
npm install
cp .env.example .env    # completá las variables
npm run db:push         # crea las tablas en tu Postgres
npm run db:seed         # datos demo
npm run dev
```

Abrí http://localhost:3000

## 2. Variables que tenés que configurar

- `DATABASE_URL` — Postgres. Podés usar [Neon](https://neon.tech) o [Supabase](https://supabase.com) gratis.
- `AUTH_SECRET` — `openssl rand -base64 32`
- **Google OAuth:** creá credenciales en https://console.cloud.google.com → `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` (redirect: `http://localhost:3000/api/auth/callback/google`)
- **Resend (magic link):** clave en https://resend.com → `AUTH_RESEND_KEY`, y `EMAIL_FROM`
- **Pusher:** app en https://pusher.com → `PUSHER_*` + `NEXT_PUBLIC_PUSHER_*`
- **UploadThing:** app en https://uploadthing.com → `UPLOADTHING_TOKEN`

## 3. Push a GitHub

```bash
cd nextapp
git init
git add .
git commit -m "feat: bestpoint MVP fase 1"
git branch -M main
git remote add origin https://github.com/eliasbest07/bestpoint-live.git
git push -u origin main
```

## 4. Deploy a Vercel

1. `vercel link` o conectá el repo desde el dashboard
2. Pegá todas las env vars del `.env`
3. Cambiá `AUTH_URL` al dominio de Vercel y actualizá la redirect URI de Google
4. En Build Command dejá `npm run build` (ya incluye `prisma generate`)

## 5. Estado actual — Fase 1

✅ Scaffold completo · Schema DB · Auth · Feed con posts + likes + comentarios · Realtime de nuevos posts · Bottom bar MRU sincronizada a DB · Búsqueda flotante · Onboarding · Seed

⏳ Próximas fases: reuniones, agendas, encuestas con votación, coins ledger UI, uploads UI, reportar avance, Club / Perfil completos.
