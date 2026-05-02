import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";

export default async function AppPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  const userId = (session.user as any).id;
  const [user, posts] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.post.findMany({
      take: 20, orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, name: true, image: true } },
        _count: { select: { comments: true, likes: true } },
        poll: { include: { options: { include: { _count: { select: { votes: true } } } } } },
      },
    }),
  ]);
  return <AppShell user={user} posts={posts} />;
}
