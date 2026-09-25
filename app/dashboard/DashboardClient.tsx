"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  User,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type DashboardUser = {
  email: string;
  full_name: string;
};

export default function DashboardClient({
  user,
}: {
  user: DashboardUser;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f4f7f4]">
      {/* HEADER */}
      <header className="border-b border-[#dce4de] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          {/* RGT LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/rgt-logo.png"
              alt="Rayyan Geo Tech"
              className="h-12 w-auto object-contain"
            />

            <div>
              <h1 className="text-lg font-bold text-[#123e2c]">
                RAYYAN GEO TECH
              </h1>

              <p className="text-[10px] font-medium tracking-[0.2em] text-[#66716a]">
                CUSTOMER PORTAL
              </p>
            </div>
          </div>

          {/* LOGOUT + MENU */}
          <div className="flex items-center gap-2">
            {/* LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label="Logout"
              className="flex items-center gap-2 rounded-xl border border-[#dce4de] bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#f4f7f4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <LogOut size={18} />
              )}

              <span className="hidden sm:inline">
                {loggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>

            {/* MENU BUTTON */}
            <button
              type="button"
              aria-label="Open menu"
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#dce4de] bg-white text-[#123e2c] transition hover:bg-[#f4f7f4]"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        {/* PAGE TITLE */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#123e2c]/10 px-4 py-2 text-sm font-semibold text-[#123e2c]">
            <LayoutDashboard size={16} />
            Customer Dashboard
          </div>

          <h2 className="text-4xl font-bold text-[#17231d]">
            Welcome, {user.full_name}
          </h2>

          <p className="mt-2 text-[#66716a]">
            Manage your RGT customer account from here.
          </p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* PROFILE CARD */}
          <div className="rounded-2xl border border-[#dce4de] bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#123e2c]/10 text-[#123e2c]">
              <User size={22} />
            </div>

            <h3 className="text-xl font-bold text-[#17231d]">
              My Profile
            </h3>

            <div className="mt-5 space-y-4">
              {/* NAME */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#7b857e]">
                  Name
                </p>

                <p className="mt-1 font-medium text-black">
                  {user.full_name}
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#7b857e]">
                  Email
                </p>

                <div className="mt-1 flex items-center gap-2 font-medium text-black">
                  <Mail size={16} />
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          {/* ENQUIRIES CARD */}
          <div className="rounded-2xl border border-[#dce4de] bg-white p-6 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#123e2c]/10 text-[#123e2c]">
              <LayoutDashboard size={22} />
            </div>

            <h3 className="text-xl font-bold text-[#17231d]">
              My Enquiries
            </h3>

            <p className="mt-3 leading-7 text-[#66716a]">
              Your RGT survey enquiries will appear here.
            </p>
          </div>
        </div>

        {/* BACK TO WEBSITE */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 rounded-xl border border-[#dce4de] bg-white px-5 py-3 font-semibold text-black transition hover:bg-[#eef3ef]"
          >
            <ArrowLeft size={18} />
            Back to Website
          </button>
        </div>
      </section>
    </main>
  );
}