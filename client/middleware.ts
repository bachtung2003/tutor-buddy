import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode correctly

export function middleware(req: NextRequest) {
  const { cookies } = req;
  const accessToken = cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  // Redirect logged-in users away from /login
  if (pathname === "/login") {
    try {
      if (accessToken)
        return NextResponse.redirect(new URL("/dashboard", req.url));
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect unauthenticated users from dashboard routes
  if (!accessToken && pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based route protection
  if (accessToken) {
    try {
      const decodedToken: any = jwtDecode(accessToken);

      if (
        pathname.startsWith("/dashboard/teacher") &&
        decodedToken?.role !== "teacher"
      ) {
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
      }

      if (
        pathname.startsWith("/dashboard/student") &&
        decodedToken?.role !== "student"
      ) {
        return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/teacher/:path*",
    "/dashboard/student/:path*",
    "/login",
    // Exclude UploadThing endpoints
    "/api/uploadthing/:path*",
  ],
};
