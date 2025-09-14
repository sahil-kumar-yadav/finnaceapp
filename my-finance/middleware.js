// middleware.js
import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = req.nextUrl;

  // Protect dashboard routes
  if (url.pathname.startsWith("/dashboard")) {
    if (!session) {
      url.pathname = "/(auth)/login";
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users away from auth pages
  if (
    url.pathname.startsWith("/(auth)/login") ||
    url.pathname.startsWith("/(auth)/signup")
  ) {
    if (session) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return res;
}
