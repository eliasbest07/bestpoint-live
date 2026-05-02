import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { pusherServer, CHANNELS } from "@/lib/pusher";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clubId = searchParams.get("clubId") || undefined;
  const upcoming = searchParams.get("upcoming") === "1";
  const meetings = await prisma.meeting.findMany({
    where: { ...(clubId ? { clubId } : {}), ...(upcoming ? { startsAt: { gte: new Date() } } : {}) },
    orderBy: { startsAt: "asc" },
    take: 20,
    include: {
      creator: { select: { id: true, name: true, image: true } },
      attendees: { include: { user: { select: { id: true, name: true, image: true } } } },
      _count: { select: { attendees: true } },
    },
  });
  return NextResponse.json(meetings);
}

const Create = z.object({
  clubId: z.string().optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  startsAt: z.string(), // ISO
  durationMin: z.number().int().min(5).max(600).default(60),
  location: z.string().optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const data = Create.parse(await req.json());
  const m = await prisma.meeting.create({
    data: {
      creatorId: (session.user as any).id,
      clubId: data.clubId,
      title: data.title,
      description: data.description,
      startsAt: new Date(data.startsAt),
      durationMin: data.durationMin,
      location: data.location,
      attendees: { create: { userId: (session.user as any).id, status: "GOING" } },
    },
    include: { creator: { select: { id: true, name: true, image: true } }, attendees: true },
  });
  await prisma.coinTx.create({ data: { userId: m.creatorId, delta: 15, reason: "meeting_created" } });
  await prisma.user.update({ where: { id: m.creatorId }, data: { coins: { increment: 15 } } });
  if (data.clubId) await pusherServer.trigger(CHANNELS.club(data.clubId), "meeting:new", m);
  return NextResponse.json(m);
}
