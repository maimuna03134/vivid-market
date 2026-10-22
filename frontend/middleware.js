// Role-based route protection
// Reads the JWT (issued by the Express backend) from the httpOnly cookie
// and checks the user's role before allowing access to seller/admin routes.
//
// 1. No token -> redirect to /login
// 2. Token valid but wrong role -> redirect to /not-authorized
// 3. (auth) and (customer) routes are public / skip this check

import { NextResponse } from "next/server";

export function middleware(request) {
  // TODO: verify JWT + role here
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/seller/:path*",
    "/admin/:path*"
  ]
};
