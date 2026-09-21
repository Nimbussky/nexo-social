import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/feed", "/explore", "/search", "/profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth = protectedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (!needsAuth) return NextResponse.next();

  const session = req.cookies.get("nexo_session")?.value;
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/feed/:path*", "/explore/:path*", "/search/:path*", "/profile/:path*"],
};
