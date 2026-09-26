"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Compass,
  Crosshair,
  Database,
  Drone,
  FileCheck2,
  Globe2,
  Layers3,
  LogOut,
  Mail,
  Map,
  MapPin,
  Menu,
  Mountain,
  Phone,
  Ruler,
  Satellite,
  ScanLine,
  ShieldCheck,
  Target,
  Users,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const services = [
  [
    "Topographical Survey",
    "Detailed terrain and feature surveys for planning, engineering and development.",
    Mountain,
  ],
  [
    "DGPS Surveys",
    "High-precision positioning, control points, traversing and ground-control surveys.",
    Satellite,
  ],
  [
    "Drone / UAV Survey",
    "Efficient aerial data capture and mapping for large, complex and difficult sites.",
    Drone,
  ],
  [
    "Mines Survey",
    "Survey support for mining and geology projects, including RGT's empanelled mines expertise.",
    Mountain,
  ],
  [
    "Road & Alignment",
    "Road, bridge, canal, pipeline, highway and corridor alignment surveys.",
    Map,
  ],
  [
    "Land / Cadastral",
    "Land boundary, parcel, acquisition and cadastral survey requirements.",
    Ruler,
  ],
  [
    "LiDAR Survey",
    "Advanced 3D reality capture using backpack, drone and vehicle-mounted LiDAR workflows.",
    ScanLine,
  ],
  [
    "GIS & Documentation",
    "GIS-based documentation, geo-referencing, digitisation, mapping and spatial data.",
    Layers3,
  ],
];

const technology = [
  ["UAV / Drone", Drone],
  ["DGPS / GNSS", Satellite],
  ["Total Station", Crosshair],
  ["Auto Level", Ruler],
  ["GIS & Mapping", Map],
  ["LiDAR", ScanLine],
  ["CAD / Drafting", Compass],
  ["Field Data", Database],
];

const clients = [
  ["Govt. of Jharkhand", "/clients/govt-of-jharkhand.jpg"],
  ["Jharkhand Police", "/clients/jh-police.jpg"],
  ["Vedanta", "/clients/vedanta.jpg"],
  ["NTPC", "/clients/ntpc.jpg"],
  ["Rattan India", "/clients/rattan-india.jpg"],
  ["L&T", "/clients/lnt.jpg"],
  ["MECON", "/clients/mecon.jpg"],
  ["Pica Sona", "/clients/pica-sona.jpg"],
  ["ESAF", "/clients/esaf.jpg"],
  ["JMC", "/clients/jmc.jpg"],
  ["GKC", "/clients/gkc.jpg"],
  ["EY", "/clients/ey.jpg"],
  ["Almondz", "/clients/almondz.jpg"],
  ["CyberSWIFT", "/clients/cyberswift.jpg"],
  ["GSI", "/clients/gsi.jpg"],
  ["Maheshwari", "/clients/maheswari.jpg"],
  ["Mongia", "/clients/mongia.jpg"],
  ["RKS", "/clients/rks.jpg"],
  ["Saluja", "/clients/saluja.jpg"],
  ["SIMA Labs", "/clients/sima-labs.jpg"],
];

const projects = [
  {
    title: "Pihra Lithium Site",
    metric: "GIRIDIH · FIELD WORK",
    text: "RGT field surveying work supporting lithium-site activities in Jharkhand.",
    image: "/rgt-field-work/pihra-lithium-01.jpg",
  },
  {
    title: "Ambadih Copper Work",
    metric: "JHARKHAND · FIELD WORK",
    text: "Survey field operations associated with Ambadih copper project work.",
    image: "/rgt-field-work/ambadih-copper-01.jpg",
  },
  {
    title: "Giridih–Jamua–Sarwan Road",
    metric: "45.15 KM · ROAD SURVEY",
    text: "DGPS GCP, traversing, OGL, topographical survey and centre-line stakeout work.",
    image: "/rgt-field-work/pihra-lithium-02.jpg",
  },
  {
    title: "Plastic Park, Devipur",
    metric: "159.47 ACRES · TOPO",
    text: "Topographical survey for the proposed Plastic Park at Devipur, Deoghar.",
    image: "/rgt-field-work/ambadih-copper-02.jpg",
  },
  {
    title: "Parashnath Helipad & Reception",
    metric: "MSL 1312 M · TOPO",
    text: "Survey work for the proposed helipad and reception facilities at Parashnath.",
    image: "/rgt-field-work/pihra-lithium-03.jpg",
  },
  {
    title: "Forest Clearance Documentation",
    metric: "DGPS · GIS · KML",
    text: "DGPS, ArcGIS shapefile, geo-referenced topo information, village maps and KML documentation.",
    image: "/rgt-field-work/ambadih-copper-01.jpg",
  },
];

const faqs = [
  [
    "What types of surveys does RGT provide?",
    "RGT provides topographical, DGPS, drone/UAV, mines, road and alignment, cadastral/land boundary, LiDAR, GIS and related surveying solutions.",
  ],
  [
    "Where does RGT provide services?",
    "RGT is headquartered in Giridih, Jharkhand and states that it has capability to execute medium and large projects across India, with expanding international work.",
  ],
  [
    "Does RGT work on mining projects?",
    "Yes. RGT's published company information includes mines survey work and empanelment with the Jharkhand Mines & Geology Department.",
  ],
  [
    "Can RGT handle large linear projects?",
    "RGT's published project information documents more than 2,000 km of linear projects and over 30,000 acres of non-linear projects.",
  ],
];

export default function Home() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
    location: "",
    details: "",
  });

  const [sending, setSending] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth
      .getUser()
      .then(({ data }) => setIsLoggedIn(!!data.user));
  }, []);

  async function handleLogout() {
    setLoggingOut(true);

    const supabase = createClient();

    await supabase.auth.signOut();

    window.location.href = "/login";
  }

  async function handleEnquiry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSending(true);
    setFormMessage("");

    try {
      const response = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to submit enquiry.");
      }

      setFormMessage("Thank you. Your enquiry has been submitted to RGT.");

      setForm({
        name: "",
        phone: "",
        email: "",
        requirement: "",
        location: "",
        details: "",
      });
    } catch (error) {
      setFormMessage(
        error instanceof Error ? error.message : "Unable to submit enquiry."
      );
    } finally {
      setSending(false);
    }
  }

  const goTo = (href: string) => {
    setMenuOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const navigation = [
    "about",
    "services",
    "technology",
    "projects",
    "clients",
    "credentials",
    "faq",
    "contact",
  ];

  return (
    <main className="min-h-screen bg-white text-[#14221a]">
      <div className="bg-[#063b27] px-5 py-2 text-xs text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2">
          <span>Giridih, Jharkhand · Since 2012</span>
          <span>Surveying · GIS · Mining · Geospatial Solutions</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[70px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <a href="#home" className="flex shrink-0 items-center gap-3">
            <img
              src="/rgt-logo.png"
              alt="Rayyan Geo Tech logo"
              className="h-12 w-12 object-contain"
            />

            <div className="leading-tight">
              <div className="text-lg font-black tracking-tight">
                RAYYAN GEO TECH
              </div>
              <div className="text-[10px] font-bold tracking-[0.18em] text-[#0b7043]">
                SURVEYING SOLUTION
              </div>
              <div className="text-[9px] font-semibold text-slate-500">
                GIRIDIH, JHARKHAND
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-sm font-semibold xl:flex">
            {navigation.map((id) => (
              <button
                key={id}
                onClick={() => goTo(`#${id}`)}
                className="capitalize transition hover:text-[#087c49]"
              >
                {id}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {isLoggedIn && (
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 rounded-xl border border-[#123e2c]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#123e2c] transition hover:bg-[#123e2c]/5"
              >
                <Target className="h-4 w-4" />
                Dashboard
              </button>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 rounded-xl bg-[#123e2c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0d3022] disabled:opacity-60"
              >
                <LogOut className="h-4 w-4" />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            )}

            <button
              onClick={() => goTo("#contact")}
              className="flex items-center gap-2 rounded-xl bg-[#079b55] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#057d45]"
            >
              Request a Survey
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {isLoggedIn && (
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 rounded-xl border border-[#123e2c]/20 bg-white px-3 py-2 text-sm font-semibold text-[#123e2c]"
              >
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 rounded-xl bg-[#123e2c] px-3 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {loggingOut ? "Logging out..." : "Logout"}
                </span>
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-slate-200 bg-white p-2"
              aria-label="Open menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white p-4 shadow-lg lg:hidden">
            {navigation.map((id) => (
              <button
                key={id}
                onClick={() => goTo(`#${id}`)}
                className="block w-full rounded-lg px-4 py-3 text-left font-semibold capitalize hover:bg-slate-50"
              >
                {id}
              </button>
            ))}

            {isLoggedIn && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/dashboard");
                }}
                className="mt-2 flex w-full items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 font-semibold text-[#123e2c]"
              >
                <Target size={17} />
                Customer Dashboard
              </button>
            )}
          </div>
        )}
      </header>

      <section id="home" className="relative overflow-hidden bg-[#073d29]">
        <img
          src="/rgt-field-work/pihra-lithium-01.jpg"
          alt="RGT field surveying work"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#032719] via-[#073d29]/90 to-[#073d29]/35" />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="max-w-3xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.15em] text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Empanelled with Mines & Geology
            </div>

            <h1 className="text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">
              Survey data you can{" "}
              <span className="text-[#45e982]">build on.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Professional surveying, GIS, drone, LiDAR and geospatial
              solutions for land, infrastructure, mining and engineering
              projects.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => goTo("#contact")}
                className="rounded-xl bg-[#08a957] px-6 py-4 font-bold text-white shadow-xl transition hover:bg-[#07944c]"
              >
                Request a Survey
                <ArrowRight className="ml-2 inline" size={17} />
              </button>

              <button
                onClick={() => goTo("#projects")}
                className="rounded-xl border border-white/30 bg-white/5 px-6 py-4 font-bold text-white transition hover:bg-white/10"
              >
                View Our Work
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300" />
                Since 2012
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300" />
                DGCA-approved drone capability
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300" />
                Pan-India capability
              </span>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
              <img
                src="/rgt-field-work/ambadih-copper-01.jpg"
                alt="RGT survey team field work"
                className="h-72 w-full rounded-[1.5rem] object-cover sm:h-80 sm:w-[420px]"
              />

              <div className="grid grid-cols-2 gap-3 p-2 pt-4">
                <div className="rounded-2xl bg-black/20 p-4 text-white">
                  <Mountain className="text-emerald-300" size={23} />
                  <div className="mt-3 text-sm font-bold">Mining & Geology</div>
                </div>

                <div className="rounded-2xl bg-black/20 p-4 text-white">
                  <ScanLine className="text-emerald-300" size={23} />
                  <div className="mt-3 text-sm font-bold">LiDAR & 3D Data</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-[#042d1e]/90">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
            {[
              ["14+", "Years Experience"],
              ["2,000+ km", "Linear Projects"],
              ["30,000+", "Acres Surveyed"],
              ["Pan India", "Project Capability"],
            ].map(([n, t]) => (
              <div key={t} className="px-5 py-7 text-center text-white">
                <div className="text-2xl font-black sm:text-3xl">{n}</div>
                <div className="mt-1 text-xs text-white/55">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#063b27] shadow-2xl">
            <img
              src="/rgt-field-work/pihra-lithium-02.jpg"
              alt="RGT field surveying"
              className="h-full min-h-[430px] w-full object-cover opacity-80"
            />

            <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/15 bg-black/30 p-5 text-white backdrop-blur">
                <ShieldCheck className="text-emerald-300" />
                <div className="mt-3 font-black">Precision</div>
                <div className="mt-1 text-xs text-white/60">
                  Planned and documented field work
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-black/30 p-5 text-white backdrop-blur">
                <Globe2 className="text-emerald-300" />
                <div className="mt-3 font-black">Geospatial</div>
                <div className="mt-1 text-xs text-white/60">
                  Survey, GIS and mapping workflows
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="text-sm font-black uppercase tracking-[.2em] text-[#07844a]">
              Why RGT
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Field experience backed by modern survey technology.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              Rayyan Geo Tech was founded in 2012 and is headquartered in
              Giridih, Jharkhand. RGT's published company information covers
              land and topographical surveys, DGPS and drone surveys, CAD
              drafting, quantity survey, GIS documentation and a wide range of
              infrastructure and mining-related survey work.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Mines & Geology empanelment",
                "DGCA-approved drone capability",
                "Experienced survey professionals",
                "Medium and large project capability",
                "GIS and CAD documentation",
                "Road, land and infrastructure expertise",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[#079b55]" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 bg-[#f3f7f4] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[.2em] text-[#07844a]">
              Our Services
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              From field capture to usable spatial data.
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-500">
              A complete surveying and geospatial service mix for land, mining,
              infrastructure and engineering requirements.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(([title, text, Icon]) => {
              const C = Icon as any;

              return (
                <article
                  key={title as string}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#087c49]">
                    <C size={24} />
                  </div>

                  <h3 className="mt-6 text-lg font-black">{title as string}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {text as string}
                  </p>

                  <button
                    onClick={() => goTo("#contact")}
                    className="mt-5 text-sm font-bold text-[#07844a]"
                  >
                    Discuss this service
                    <ArrowRight className="ml-1 inline" size={14} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="technology" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-sm font-black uppercase tracking-[.2em] text-[#07844a]">
                Technology
              </div>

              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                Tools that turn field measurements into project-ready
                information.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-500">
                RGT's technology story combines conventional survey instruments
                with GNSS, UAV, LiDAR, GIS and digital documentation workflows.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {technology.map(([name, Icon]) => {
                  const C = Icon as any;

                  return (
                    <div
                      key={name as string}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <C size={20} className="text-[#07844a]" />
                      <span className="text-sm font-bold">{name as string}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f3f7f4] shadow-xl">
              <img
                src="/technology-section.png"
                alt="RGT surveying technology"
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
            <img
              src="/lidar-solutions.png"
              alt="RGT LiDAR solutions"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 bg-[#f3f7f4] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-sm font-black uppercase tracking-[.2em] text-[#07844a]">
                Featured Projects
              </div>

              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                Real work. Real locations.
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
                Selected examples from RGT's field work and published project
                portfolio.
              </p>
            </div>

            <div className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07844a] shadow-sm">
              2,000+ km linear · 30,000+ acres non-linear
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-[#063b27]/90 px-3 py-1.5 text-[10px] font-black tracking-widest text-white">
                    {project.metric}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black">{project.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {project.text}
                  </p>

                  <button
                    onClick={() => goTo("#contact")}
                    className="mt-5 text-sm font-bold text-[#07844a]"
                  >
                    Discuss a similar project
                    <ArrowRight className="ml-1 inline" size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center">
            <div className="text-sm font-black uppercase tracking-[.2em] text-[#07844a]">
              Trusted Relationships
            </div>

            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              Clients and project relationships.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500">
              Selected client and achievement logos published by RGT.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {clients.map(([name, src]) => (
              <div
                key={name}
                className="flex h-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <img
                  src={src}
                  alt={name}
                  loading="lazy"
                  className="max-h-20 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="credentials" className="scroll-mt-24 bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
            <div>
              <div className="text-sm font-black uppercase tracking-[.2em] text-[#07844a]">
                Credentials & Empanelments
              </div>

              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Built on documented capability and field experience.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-500">
                RGT combines its surveying experience, professional team,
                project record and published credentials to support land,
                infrastructure, mining and geospatial requirements.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [
                  ShieldCheck,
                  "Mines & Geology",
                  "Empanelled for mines survey work with the Jharkhand Mines & Geology Department.",
                ],
                [
                  Satellite,
                  "DGCA-approved Drone",
                  "Drone capability for aerial data capture and survey workflows.",
                ],
                [
                  Users,
                  "Experienced Team",
                  "Survey engineers, surveyors, drafting and field-support professionals.",
                ],
                [
                  Globe2,
                  "Pan-India Capability",
                  "RGT states capability for medium and large projects across India.",
                ],
              ].map(([Icon, title, text]) => {
                const C = Icon as any;

                return (
                  <div
                    key={title as string}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#07844a]">
                      <C size={22} />
                    </div>

                    <h3 className="mt-5 text-lg font-black text-slate-900">
                      {title as string}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {text as string}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#063b27] py-20 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-4">
            {[
              [FileCheck2, "Plan", "Understand the requirement and project scope."],
              [Compass, "Survey", "Execute field measurements with appropriate instruments."],
              [Database, "Process", "Convert field data into structured survey and GIS outputs."],
              [Target, "Deliver", "Provide clear, usable project documentation and results."],
            ].map(([Icon, title, text], i) => {
              const C = Icon as any;

              return (
                <div
                  key={title as string}
                  className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  {i < 3 && (
                    <div className="absolute right-[-20px] top-12 hidden h-px w-10 bg-white/15 md:block" />
                  )}

                  <C className="text-emerald-300" />

                  <div className="mt-5 text-lg font-black">{title as string}</div>

                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {text as string}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center">
            <div className="text-sm font-black uppercase tracking-[.2em] text-[#07844a]">
              FAQ
            </div>

            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              Questions clients often ask.
            </h2>
          </div>

          <div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6 shadow-sm">
            {faqs.map(([question, answer], index) => (
              <div key={question}>
                <button
                  onClick={() =>
                    setFaqOpen(faqOpen === index ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-5 py-6 text-left font-bold text-slate-900"
                >
                  <span>{question}</span>
                  <ChevronDown
                    className={`shrink-0 transition ${
                      faqOpen === index
                        ? "rotate-180 text-[#07844a]"
                        : ""
                    }`}
                  />
                </button>

                {faqOpen === index && (
                  <p className="-mt-2 max-w-3xl pb-6 text-sm leading-7 text-slate-500">
                    {answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a4a31] py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[.2em] text-emerald-300">
              Start with RGT
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Have a survey requirement?
            </h2>

            <p className="mt-4 text-base leading-7 text-white/65 sm:text-lg">
              Share your project scope and location. Our team can review the
              requirement and discuss the appropriate survey approach.
            </p>
          </div>

          <button
            onClick={() => goTo("#contact")}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-[#0a4a31] transition hover:bg-emerald-50"
          >
            Request a Survey
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#f3f7f4] py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <div className="text-sm font-black uppercase tracking-[.2em] text-[#07844a]">
              Start a Project
            </div>

            <h2 className="mt-3 text-5xl font-black tracking-tight">
              Tell us what you need surveyed.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500">
              Share your project requirement and RGT can review the scope,
              location and survey needs.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-700">
              <div className="flex gap-3">
                <MapPin className="shrink-0 text-[#07844a]" />
                <span>
                  Opposite Mohanpur Church, Near Nehru Yuva Kendra, Giridih,
                  Jharkhand
                </span>
              </div>

              <div className="flex gap-3">
                <Mail className="shrink-0 text-[#07844a]" />
                <span>rayyangeotech@gmail.com</span>
              </div>

              <div className="flex gap-3">
                <Phone className="shrink-0 text-[#07844a]" />
                <span>06532-25023 · 089 69 34 1822 · 084 09 17 2466</span>
              </div>
            </div>

            {/* GOOGLE MAP */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=Rayyan%20Geo%20Tech%2C%20Giridih%2C%20Jharkhand&output=embed"
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rayyan Geo Tech Location"
              />
            </div>
          </div>

          <form
            onSubmit={handleEnquiry}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                placeholder="Full Name *"
                className="rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-black placeholder:text-slate-500 outline-none focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
              />

              <input
                required
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone Number *"
                className="rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-black placeholder:text-slate-500 outline-none focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
              />
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <input
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                type="email"
                placeholder="Email Address"
                className="rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-black placeholder:text-slate-500 outline-none focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
              />

              <input
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                placeholder="Project Location"
                className="rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-black placeholder:text-slate-500 outline-none focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
              />
            </div>

            <select
              required
              value={form.requirement}
              onChange={(e) =>
                setForm({
                  ...form,
                  requirement: e.target.value,
                })
              }
              className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-black outline-none focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
            >
              <option value="" className="text-slate-500">
                Select Survey Requirement *
              </option>

              {services.map(([name]) => (
                <option
                  key={name as string}
                  value={name as string}
                  className="text-black"
                >
                  {name as string}
                </option>
              ))}
            </select>

            <textarea
              required
              value={form.details}
              onChange={(e) =>
                setForm({
                  ...form,
                  details: e.target.value,
                })
              }
              rows={5}
              placeholder="Project details, approximate area/length, timeline, or other useful information *"
              className="mt-5 w-full resize-none rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-black placeholder:text-slate-500 outline-none focus:border-[#123e2c] focus:ring-4 focus:ring-[#123e2c]/10"
            />

            {formMessage && (
              <div
                className={`mt-4 rounded-xl px-4 py-3 text-sm ${
                  formMessage.includes("Thank")
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {formMessage}
              </div>
            )}

            <button
              disabled={sending}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#123e2c] px-6 py-4 font-bold text-white transition hover:bg-[#0d3022] disabled:opacity-60"
            >
              {sending ? "Submitting..." : "Submit Survey Enquiry"}
              <ArrowRight size={17} />
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Already a customer?{" "}
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="font-semibold text-[#07844a] hover:underline"
              >
                Open Customer Dashboard
              </button>
            </p>
          </form>
        </div>
      </section>

      <footer className="bg-[#04251a] px-5 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <img
              src="/rgt-logo.png"
              alt="RGT"
              className="h-12 w-12 object-contain"
            />

            <div>
              <div className="font-black tracking-wide">RAYYAN GEO TECH</div>
              <div className="text-[10px] text-white/40">
                SURVEYING SOLUTION · GIRIDIH, JHARKHAND
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 text-right">
            <div className="text-xs text-white/40">
              © {new Date().getFullYear()} Rayyan Geo Tech. All Rights Reserved.
            </div>

            <div className="text-xs text-white/40">
              Made by{" "}
              <span className="font-semibold text-white/70">
                Alman Web Studio
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
