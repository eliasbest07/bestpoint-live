import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({ toolId: z.string() });

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json([], { status: 200 });
  const userId = (session.user as any).id;
  const rows = await prisma.toolUsage.findMany({
    where: { userId }, orderBy: { usedAt: "desc" }, take: 8, distinct: ["toolId"],
  });
  return NextResponse.json(rows.map((r) => r.toolId));
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { toolId } = Body.parse(await req.json());
  await prisma.toolUsage.create({ data: { userId: (session.user as any).id, toolId } });
  return NextResponse.json({ ok: true });
}
