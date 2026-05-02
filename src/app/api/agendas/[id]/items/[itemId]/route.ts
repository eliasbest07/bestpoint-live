import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({ done: z.boolean().optional(), title: z.string().min(1).max(200).optional() });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string; itemId: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { itemId } = await params;
  const data = Body.parse(await req.json());
  const item = await prisma.agendaItem.update({ where: { id: itemId }, data });
  if (data.done === true) {
    await prisma.coinTx.create({ data: { userId: (session.user as any).id, delta: 5, reason: "agenda_item_done" } });
    await prisma.user.update({ where: { id: (session.user as any).id }, data: { coins: { increment: 5 } } });
  }
  return NextResponse.json(item);
}
