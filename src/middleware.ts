import { NextRequest, NextResponse } from "next/server";
import { computeCityByIp } from "./app/(root)/data/city";
import { $api } from "./shared/api/lib/axios";
import { LocationStateType } from "./shared/hooks/use-location";

const protectedPaths = ["/auth"];
const privatePaths = ["/chat"];

const alternativeLocation = {
  city: "Санкт-Петербург",
  latitude: 59.9386,
  longitude: 30.3141,
};

async function determineLocation(request: NextRequest) {
  const locationCookie = request.cookies.get("location")?.value;

  if (locationCookie) {
    try {
      const location = JSON.parse(locationCookie) as LocationStateType;
      if (location?.city) {
        return { location, shouldSetCookie: false };
      }
    } catch (e) {
      console.warn("Invalid location cookie format");
    }
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim();
  let locationData: LocationStateType;

  if (ip) {
    try {
      const locationResponse = await computeCityByIp(ip);
      locationData = locationResponse ? locationResponse : alternativeLocation;
    } catch {
      locationData = alternativeLocation;
    }
  } else {
    locationData = alternativeLocation;
  }

  return { location: locationData, shouldSetCookie: true };
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isPrivate = privatePaths.some((path) => pathname.startsWith(path));

  if (isProtected || isPrivate) {
    if (isProtected && token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (isPrivate && !token) {
      return NextResponse.redirect(
        new URL(`/auth/login?redirect=${pathname.slice(1)}`, request.url)
      );
    }

    return NextResponse.next();
  }

  const { location, shouldSetCookie } = await determineLocation(request);
  const response = NextResponse.next();

  if (shouldSetCookie) {
    response.cookies.set("location", JSON.stringify(location), {
      path: "/",
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  const theme = request.cookies.get("theme")?.value;
  if (!theme) {
    const prefersDark =
      request.headers.get("sec-ch-prefers-color-scheme") === "dark";
    response.cookies.set("theme", prefersDark ? "dark" : "light");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
