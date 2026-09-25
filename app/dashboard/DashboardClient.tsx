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
          {/* LEFT - LOGO */}
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

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label="Logout"
              className="flex items-center gap-2 rounded-xl border border-[#dce4de] bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#f4f7f4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <LogOut size={18} />
              )}

              <span className="hidden sm:inline">
                {loggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>

            {/* HAMBURGER / MENU */}
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

      {/* DASHBOARD */}
      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8">
          <div class