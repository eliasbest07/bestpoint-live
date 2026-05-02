import Pusher from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

let clientSingleton: PusherClient | null = null;
export function getPusherClient() {
  if (typeof window === "undefined") return null;
  if (!clientSingleton) {
    clientSingleton = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
  }
  return clientSingleton;
}

export const CHANNELS = {
  feed: "feed",
  post: (id: string) => `post-${id}`,
};
