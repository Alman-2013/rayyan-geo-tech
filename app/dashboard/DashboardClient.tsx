"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  LogOut,
  MapPin,
  Menu,
  Plus,
  RefreshCw,
  Send,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  requirement: string;
  location: string | null;
  details: string;
  status: string;
  created_at: string;
};

type DashboardClientProps = {
  user: {
    id: string;
    email: string;
    full_name: string;
  };
};

export default function DashboardClient({
  user,
}: DashboardClientProps) {
  const router = useRouter();

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: user.full_name || "",
    phone: "",
    email: user.email || "",
    requirement: "",
    location: "",
    details: "",
  });

  async function loadEnquiries() {
    setError("");

    const supabase = createClient();

    const { data, error } = await supabase
      .from("enquiries")
      .select(
        "id,name,phone,email,requirement,location,details,status,created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    setEnquiries((data as Enquiry[]) || []);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    window.location.href = "/login";
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);
    setError("");
    setSuccess("");

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.requirement.trim() ||
      !form.details.trim()
    ) {
      setError(
        "Please fill in your name, phone, requirement and project details."
      );
      setSubmitting(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.from("enquiries").insert({
      user_id: user.id,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      requirement: form.requirement.trim(),
      location: form.location.trim() || null,
      details: form.details.trim(),
      status: "Pending",
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    setForm({
      name: user.full_name || "",
      phone: "",
      email: user.email || "",
      requirement: "",
      location: "",
      details: "",
    });

    setSuccess(
      "Your survey enquiry has been submitted successfully."
    );

    setShowForm(false);
    setSubmitting(false);

    await loadEnquiries();
  }

  const totalEnquiries = enquiries.length;

  const pendingEnquiries = enquiries.filter(
    (item) =>
      item.status.toLowerCase() === "pending" ||
      item.status.toLowerCase() === "in progress"
  ).length;

  const completedEnquiries = enquiries.filter(
    (item) => item.status.toLowerCase() === "completed"
  ).length;

  function getStatusStyle(status: string) {
    const normalized = status.toLowerCase();

    if (normalized === "completed") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (normalized === "in progress") {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }

    if (normalized === "cancelled") {
      return "bg-red-50 text-red-700 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <main className="min-h-screen bg-[#f4f7f4]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              <img
                src="/rgt-logo.png"
                alt="RGT"
                className="h-10 w-10 object-contain"
              />
            </div>

            <div>
              <p className="font-bold tracking-wide text-[#123e2c]">
                RAYYAN GEO TECH
              </p>
              <p className="text-xs text-slate-500">
                Customer Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 md:block">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* WELCOME */}
        <section className="rounded-3xl bg-[#123e2c] p-7 text-white shadow-lg sm:p-9">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-emerald-300">
                Customer Dashboard
              </p>

              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                Welcome, {user.full_name || "Customer"} 👋
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
                Manage your RGT survey enquiries and keep track of your
                project requests from one place.
              </p>
            </div>

            <button
              onClick={() => {
                setShowForm(true);
                setSuccess("");
                setError("");
              }}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#123e2c] shadow-lg transition hover:bg-emerald-50"
            >
              <Plus className="h-5 w-5" />
              New Survey Enquiry
            </button>
          </div>
        </section>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            {success}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* STATS */}
        <section className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Enquiries
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalEnquiries}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <FileText className="h-6 w-6 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Enquiries
                </p>
                <p className="mt-2 text-3xl font-bold text-amber-600">
                  {pendingEnquiries}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
                <Clock3 className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completed
                </p>
                <p className="mt-2 text-3xl font-bold text-emerald-600">
                  {completedEnquiries}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </section>

        {/* ENQUIRIES */}
        <section className="mt-8">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Enquiries
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View and track your survey requests.
              </p>
            </div>

            <button
              onClick={() => {
                setRefreshing(true);
                loadEnquiries();
              }}
              disabled={refreshing}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <RefreshCw className="mx-auto h-7 w-7 animate-spin text-[#123e2c]" />
              <p className="mt-4 text-sm text-slate-500">
                Loading your enquiries...
              </p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#123e2c]/10">
                <FileText className="h-7 w-7 text-[#123e2c]" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No enquiries yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Submit your first survey requirement and the RGT team
                will receive it.
              </p>

              <button
                onClick={() => {
                  setShowForm(true);
                  setSuccess("");
                  setError("");
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#123e2c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d3022]"
              >
                <Plus className="h-4 w-4" />
                Create Enquiry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {enquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900">
                          {enquiry.requirement}
                        </h3>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            enquiry.status
                          )}`}
                        >
                          {enquiry.status}
                        </span>
                      </div>

                      {enquiry.location && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="h-4 w-4" />
                          {enquiry.location}
                        </div>
                      )}

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                        {enquiry.details}
                      </p>

                      <p className="mt-4 text-xs text-slate-400">
                        Submitted {formatDate(enquiry.created_at)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {enquiry.status.toLowerCase() === "completed" ? (
                        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                          <CheckCircle2 className="h-5 w-5" />
                          Completed
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm font-semibold text-amber-600">
                          <Clock3 className="h-5 w-5" />
                          In review
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* WEBSITE BUTTON */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold text-slate-900">
                Explore RGT
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Visit the main RGT website to learn about our services
                and projects.
              </p>
            </div>

            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#123e2c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d3022]"
            >
              Open RGT Website
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>

      {/* NEW ENQUIRY MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 sm:px-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  New Survey Enquiry
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Tell RGT about your project requirement.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name *
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
                    placeholder="Your name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="enquiry-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="enquiry-email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
                  placeholder="you@example.com"
                />
              </div>

              {/* Requirement */}
              <div>
                <label
                  htmlFor="requirement"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Survey Requirement *
                </label>

                <select
                  id="requirement"
                  value={form.requirement}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      requirement: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
                >
                  <option value="">Select a service</option>
                  <option value="Topographical Survey">
                    Topographical Survey
                  </option>
                  <option value="DGPS Survey">
                    DGPS Survey
                  </option>
                  <option value="Drone Survey">
                    Drone Survey
                  </option>
                  <option value="Mines Survey">
                    Mines Survey
                  </option>
                  <option value="Land Boundary Survey">
                    Land Boundary Survey
                  </option>
                  <option value="Road / Highway Survey">
                    Road / Highway Survey
                  </option>
                  <option value="Bridge / Canal Survey">
                    Bridge / Canal Survey
                  </option>
                  <option value="LiDAR Survey">
                    LiDAR Survey
                  </option>
                  <option value="GIS Work">
                    GIS Work
                  </option>
                  <option value="CAD / Drafting">
                    CAD / Drafting
                  </option>
                  <option value="Quantity Survey">
                    Quantity Survey
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Project Location
                </label>

                <input
                  id="location"
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
                  placeholder="District, State"
                />
              </div>

              {/* Details */}
              <div>
                <label
                  htmlFor="details"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Project Details *
                </label>

                <textarea
                  id="details"
                  value={form.details}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      details: e.target.value,
                    })
                  }
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
                  placeholder="Describe your project, approximate area/length, required survey, timeline, or any other useful information..."
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#123e2c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d3022] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}