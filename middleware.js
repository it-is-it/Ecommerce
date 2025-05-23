import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*"],
};

export default withAuth(
  function middleware(req) {
    if (req.method === "OPTIONS") {
      return NextResponse.next();
    }

    const url = req.nextUrl.pathname;
    const userRole = req.nextauth?.token?.user?.role;

    if (
      (url.startsWith("/dashboard/admin") || url.startsWith("/api/admin")) &&
      userRole !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
