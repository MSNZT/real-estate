import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);

  if (request.nextUrl.pathname.startsWith("/auth")) {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (refreshToken) {
      return NextResponse.redirect("http://localhost:3000");
    }
  }

  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  url.searchParams.set("viewport", viewport);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
