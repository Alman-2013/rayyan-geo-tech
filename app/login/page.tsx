"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#f4f7f4] px-5 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
          <div className="hidden bg-[#123e2c] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <img
                  src="/rgt-logo.png"
                  alt="Rayyan Geo Tech"
                  className="h-16 w-auto object-contain"
                />

                <div>
                  <div className="text-xl font-bold tracking-wide">
                    RAYYAN GEO TECH
                  </div>

                  <div className="text-xs tracking-[0.25em] text-white/70">
                    SURVEYING SOLUTION
                  </div>
                </div>
              </div>

              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                Customer Portal
              </span>

              <h1 className="mt-8 text-5xl font-bold leading-tight">
                Welcome back to RGT.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-white/75">
                Sign in to access your RGT customer account and manage your
                survey enquiries.
              </p>
            </div>

            <div className="space-y-4 text-sm text-white/75">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} />
                View your customer information
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} />
                Track your enquiries
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} />
                Access your RGT dashboard
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">
              <Link
                href="/"
                className="text-sm font-semibold text-black hover:underline"
              >
                ← Back to RGT website
              </Link>

              <h2 className="mt-10 text-3xl font-bold text-[#17231d]">
                Sign in
              </h2>

              <p className="mt-2 text-sm text-[#66716a]">
                Login to your RGT customer account.
              </p>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17231d]">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b857e]"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#dce4de] bg-white py-3.5 pl-11 pr-4 text-black outline-none transition placeholder:text-gray-400 focus:border-[#123e2c] focus:ring-2 focus:ring-[#123e2c]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17231d]">
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b857e]"
                    />

                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      placeholder="Your password"
                      className="w-full rounded-xl border border-[#dce4de] bg-white py-3.5 pl-11 pr-4 text-black outline-none transition placeholder:text-gray-400 focus:border-[#123e2c] focus:ring-2 focus:ring-[#123e2c]/10"
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123e2c] px-5 py-3.5 font-semibold text-white transition hover:bg-[#0d3022] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-[#66716a]">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-black hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}