import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isAuth = !!session;
  const isAuthPage = nextUrl.pathname.startsWith("/signin");
  const isPublic = nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/api/auth");
  if (isAuthPage && isAuth) return NextResponse.redirect(new URL("/app", nextUrl));
  if (!isAuth && !isPublic && !isAuthPage) return NextResponse.redirect(new URL("/signin", nextUrl));
});

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.).*)"] };
