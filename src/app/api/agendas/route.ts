import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clubId = searchParams.get("clubId") || undefined;
  const agendas = await prisma.agenda.findMany({
    where: clubId ? { clubId } : {},
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      owner: { select: { id: true, name: true, image: true } },
      items: { orderBy: { order: "asc" } },
      _count: { select: { items: true } },
    },
  });
  const withProgress = agendas.map((a) => {
    const total = a.items.length || 1;
    const done = a.items.filter((i) => i.done).length;
    return { ...a, progress: Math.round((done / total) * 100) };
  });
  return NextResponse.json(withProgress);
}

const Create = z.object({
  clubId: z.string().optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  items: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const data = Create.parse(await req.json());
  const ownerId = (session.user as any).id;
  const a = await prisma.agenda.create({
    data: {
      ownerId, clubId: data.clubId,
      title: data.title, description: data.description,
      items: data.items?.length ? { create: data.items.map((title, order) => ({ title, order })) } : undefined,
    },
    include: { items: true, owner: { select: { id: true, name: true, image: true } } },
  });
  return NextResponse.json(a);
}
