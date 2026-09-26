import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();

  const userId = data?.claims?.sub ?? null;
  const pathname = request.nextUrl.pathname;

  let destination: string | null = null;

  // Visitor opening the main website without login
  if (!userId && pathname === "/") {
    destination = "/login";
  }

  // Logged-in user trying to open login/signup
  else if (
    userId &&
    (pathname === "/login" || pathname === "/signup")
  ) {
    destination = "/dashboard";
  }

  // User trying to access dashboard without login
  else if (!userId && pathname.startsWith("/dashboard")) {
    destination = "/login";
  }

  if (destination) {
    const redirectResponse = NextResponse.redirect(
      new URL(destination, request.url)
    );

    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    return redirectResponse;
  }

  return supabaseResponse;
}