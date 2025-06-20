import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/auth"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
