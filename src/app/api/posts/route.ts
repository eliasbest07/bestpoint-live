import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { pusherServer, CHANNELS } from "@/lib/pusher";

export async function GET() {
  const posts = await prisma.post.findMany({
    take: 40,
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { id: true, name: true, image: true } },
      _count: { select: { comments: true, likes: true } },
      poll: { include: { options: { include: { _count: { select: { votes: true } } } } } },
    },
  });
  return NextResponse.json(posts);
}

const CreatePost = z.object({
  type: z.enum(["TEXT", "IMAGE", "VIDEO", "POLL", "EVENT"]).default("TEXT"),
  title: z.string().min(1).max(200),
  body: z.string().max(4000).optional(),
  mediaUrl: z.string().url().optional(),
  tag: z.string().optional(),
  tagColor: z.string().optional(),
  hue: z.number().int().min(0).max(360).default(25),
  clubId: z.string().optional(),
  pollOptions: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  const data = CreatePost.parse(body);

  const post = await prisma.post.create({
    data: {
      authorId: (session.user as any).id,
      type: data.type,
      title: data.title,
      body: data.body,
      mediaUrl: data.mediaUrl,
      tag: data.tag,
      tagColor: data.tagColor,
      hue: data.hue,
      clubId: data.clubId,
      ...(data.type === "POLL" && data.pollOptions?.length
        ? { poll: { create: { options: { create: data.pollOptions.map((label) => ({ label })) } } } }
        : {}),
    },
    include: { author: { select: { id: true, name: true, image: true } }, poll: { include: { options: true } } },
  });

  await prisma.coinTx.create({ data: { userId: post.authorId, delta: 10, reason: "post_created" } });
  await prisma.user.update({ where: { id: post.authorId }, data: { coins: { increment: 10 } } });

  await pusherServer.trigger(CHANNELS.feed, "post:new", post);
  return NextResponse.json(post);
}
