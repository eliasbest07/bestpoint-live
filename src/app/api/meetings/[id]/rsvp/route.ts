import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({ status: z.enum(["GOING", "MAYBE", "DECLINED"]) });

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const { status } = Body.parse(await req.json());
  const userId = (session.user as any).id;
  const rsvp = await prisma.meetingAttendee.upsert({
    where: { meetingId_userId: { meetingId: id, userId } },
    update: { status },
    create: { meetingId: id, userId, status },
  });
  return NextResponse.json(rsvp);
}
