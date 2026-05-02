import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { pusherServer, CHANNELS } from "@/lib/pusher";
import { z } from "zod";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const comments = await prisma.comment.findMany({
    where: { postId: id },
    orderBy: { createdAt: "asc" },
    include: { author: { select: { id: true, name: true, image: true } } },
  });
  return NextResponse.json(comments);
}

const Body = z.object({ body: z.string().min(1).max(1000) });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const data = Body.parse(await req.json());
  const c = await prisma.comment.create({
    data: { postId: id, authorId: (session.user as any).id, body: data.body },
    include: { author: { select: { id: true, name: true, image: true } } },
  });
  await pusherServer.trigger(CHANNELS.post(id), "comment:new", c);
  return NextResponse.json(c);
}
