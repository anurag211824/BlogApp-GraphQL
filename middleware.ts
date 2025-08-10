import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/myblogs", "/createBlog"];
const authRoutes = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If user is not authenticated and tries to access protected routes, redirect to sign-in
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If user is authenticated and tries to access auth routes, redirect to home
  if (authRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Optionally, specify which routes to run middleware on
export const config = {
  matcher: ["/myblogs", "/createBlog", "/sign-in", "/sign-up"],
};