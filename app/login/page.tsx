"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f4f7f4] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_rgba(18,62,44,0.14)]">
          <div className="grid lg:grid-cols-2">
            {/* LEFT — RGT BRAND PANEL */}
            <section className="relative overflow-hidden bg-[#123e2c] px-8 py-10 text-white sm:px-12 sm:py-12 lg:px-14 lg:py-14">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

              <div className="relative z-10 flex h-full flex-col">
                {/* Logo */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
                    <img
                      src="/rgt-logo.png"
                      alt="Rayyan Geo Tech"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div>
                    <p className="text-lg font-bold tracking-wide">
                      RAYYAN GEO TECH
                    </p>
                    <p className="text-xs tracking-[0.2em] text-white/70">
                      SURVEYING SOLUTION
                    </p>
                  </div>
                </div>

                {/* Main content */}
                <div className="mt-16 max-w-lg">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
                    Customer Portal
                  </p>

                  <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                    Welcome back
                    <br />
                    to RGT.
                  </h1>

                  <p className="mt-6 max-w-md text-base leading-7 text-white/70">
                    Access your RGT customer account to manage your enquiries,
                    survey requirements and project communication.
                  </p>
                </div>

                {/* Benefits */}
                <div className="mt-12 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                    <span className="text-sm text-white/80">
                      Professional surveying solutions
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                    <span className="text-sm text-white/80">
                      Manage your survey enquiries
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                    <span className="text-sm text-white/80">
                      Direct communication with RGT
                    </span>
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-auto pt-16">
                  <p className="text-xs text-white/40">
                    Rayyan Geo Tech · Giridih, Jharkhand
                  </p>
                </div>
              </div>
            </section>

            {/* RIGHT — LOGIN FORM */}
            <section className="px-8 py-10 sm:px-12 sm:py-12 lg:px-14 lg:py-14">
              <div className="mx-auto max-w-md">
                {/* Back */}
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-slate-500 transition hover:text-[#123e2c]"
                >
                  ← Back to RGT website
                </Link>

                {/* Heading */}
                <div className="mt-14">
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    Sign in
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Login to your RGT customer account.
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="mt-8 space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                        className="w-full rounded-xl border border-[#dce4de] bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                        required
                        autoComplete="current-password"
                        className="w-full rounded-xl border border-[#dce4de] bg-white py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
                      />
                    </div>
                  </div>

                  {/* Sign In */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#123e2c] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#123e2c]/15 transition hover:bg-[#0d3022] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Signing in..." : "Sign In"}

                    {!loading && (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </form>

                {/* Signup */}
                <p className="mt-8 text-center text-sm text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-semibold text-[#123e2c] hover:underline"
                  >
                    Create account
                  </Link>
                </p>

                {/* Security note */}
                <div className="mt-10 border-t border-slate-100 pt-6 text-center">
                  <p className="text-xs leading-5 text-slate-400">
                    Your account is protected by secure authentication.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}