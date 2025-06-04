// src/middleware.ts

import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { persistor } from "./app/reduxUtils/store";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (request.nextUrl.pathname === "/signin") {
    return NextResponse.redirect(new URL("/ident/signin", request.url));
  }

  if (request.nextUrl.pathname === "/ident") {
    return NextResponse.redirect(new URL("/ident/signin", request.url));
  }

  if (user) {
    // Redirect users to their respective dashboards based on role
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/ident")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    // If no user is logged in, redirect to home page for protected routes
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

// Optionally, specify which routes the middleware should run on
export const config = {
  matcher: ["/", "/ident", "/ident/:path*", "/dashboard", "/signin", "/signup"],
};
