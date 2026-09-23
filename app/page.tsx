"use client";

import { FormEvent, useState } from "react";

const PHONE = "089 69 34 1822";
const EMAIL = "rayyangeotech@gmail.com";

const clientLogos = [
  "/clients/govt-of-jharkhand.jpg",
  "/clients/jh-police.jpg",
  "/clients/vedanta.jpg",
  "/clients/ntpc.jpg",
  "/clients/rattan-india.jpg",
  "/clients/lnt.jpg",
  "/clients/mecon.jpg",
  "/clients/pica-sona.jpg",
  "/clients/esaf.jpg",
  "/clients/cr.jpg",
  "/clients/kalap-taru.png",
  "/clients/jmc.jpg",
  "/clients/gkc.jpg",
  "/clients/ey.jpg",
  "/clients/almondz.jpg",
  "/clients/aqua-pumps.jpg",
  "/clients/dopo.jpg",
  "/clients/balmukund.jpg",
  "/clients/cyberswift.jpg",
  "/clients/ecr.jpg",
  "/clients/gsi.jpg",
  "/clients/maheswari.jpg",
  "/clients/mongia.jpg",
  "/clients/niranjan-rai.jpg",
  "/clients/rdcs.jpg",
  "/clients/rks.jpg",
  "/clients/saluja.jpg",
  "/clients/sima-labs.jpg",
  "/clients/tecorfin.jpg",
  "/clients/tufcon-xt.jpg",
];

const services = [
  {
    number: "01",
    title: "Topographical Survey",
    text: "Detailed ground surveys for terrain, features, levels and engineering requirements.",
  },
  {
    number: "02",
    title: "DGPS Survey",
    text: "High-precision positioning and ground control surveys using DGPS technology.",
  },
  {
    number: "03",
    title: "Mining Survey",
    text: "Surveying solutions for mining and geology projects and related documentation.",
  },
  {
    number: "04",
    title: "Road & Alignment",
    text: "Alignment and survey support for roads, bridges, canals and linear infrastructure.",
  },
  {
    number: "05",
    title: "Cadastral Survey",
    text: "Land boundary and cadastral survey services for land-related requirements.",
  },
  {
    number: "06",
    title: "Setting Out",
    text: "Accurate setting-out and layout work for construction and engineering projects.",
  },
  {
    number: "07",
    title: "GIS & Mapping",
    text: "GIS-based mapping, geo-referencing, documentation and spatial data solutions.",
  },
  {
    number: "08",
    title: "Drone / UAV Survey",
    text: "Drone-based aerial surveying and mapping for efficient geospatial data collection.",
  },
];

const heroFeatures = [
  {
    number: "01",
    title: "Surveying",
    text: "Accurate field data",
  },
  {
    number: "02",
    title: "Drone Mapping",
    text: "Aerial geospatial data",
  },
  {
    number: "03",
    title: "GIS Solutions",
    text: "Mapping & documentation",
  },
  {
    number: "04",
    title: "Mines & Geology",
    text: "Mining survey support",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* =========================================================
          TOP UTILITY BAR
      ========================================================= */}
      <div className="hidden bg-[#123b2a] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs lg:px-8">

          <div className="flex items-center gap-6">
            <span>Giridih, Jharkhand</span>
            <span>{PHONE}</span>
            <span>{EMAIL}</span>
          </div>

          <span className="text-green-100">
            Surveying | GIS | Mining | Geospatial Solutions
          </span>

        </div>
      </div>

      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">

          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 text-left"
          >
            <img
              src="/rgt-logo.png"
              alt="Rayyan Geo Tech logo"
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />

            <div>
              <div className="text-base font-extrabold tracking-wide text-[#123b2a] sm:text-lg">
                RAYYAN GEO TECH
              </div>

              <div className="text-[9px] font-semibold tracking-[0.18em] text-slate-500 sm:text-xs">
                SURVEYING SOLUTION
              </div>

              <div className="text-[10px] text-slate-500 sm:text-xs">
                Giridih, Jharkhand
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">

            {[
              ["Home", "home"],
              ["About", "about"],
              ["Services", "services"],
              ["LiDAR", "lidar"],
              ["Projects", "projects"],
              ["Technology", "technology"],
              ["Clients", "clients"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="nav-link"
              >
                {label}
              </button>
            ))}

          </nav>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="hidden rounded-full bg-[#16834b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#116a3d] lg:block"
          >
            Request a Survey
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xl leading-none lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "☰"}
          </button>

        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg lg:hidden">

            <nav className="mx-auto flex max-w-7xl flex-col gap-1">

              {[
                ["Home", "home"],
                ["About", "about"],
                ["Services", "services"],
                ["LiDAR", "lidar"],
                ["Projects", "projects"],
                ["Technology", "technology"],
                ["Clients", "clients"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="rounded-lg px-3 py-3 text-left font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
                >
                  {label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="mt-2 rounded-xl bg-[#16834b] px-4 py-3 font-bold text-white"
              >
                Request a Survey
              </button>

            </nav>

          </div>
        )}

      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        id="home"
        className="relative min-h-[650px] overflow-hidden bg-[#071a12] text-white sm:min-h-[700px]"
      >

        <div className="absolute inset-0">

          <img
            src="/rgt-field-work/pihra-lithium-01.jpg"
            alt="Rayyan Geo Tech surveying field work"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#06140d]/95 via-[#092319]/78 to-[#092319]/45" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#06140d]/95 via-transparent to-transparent" />

        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">

          <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">

            <div className="max-w-3xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-300/40 bg-green-950/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-green-200 shadow-lg backdrop-blur-md sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Empanelled With Mines &amp; Geology
              </div>

              <h1 className="text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Precision for a{" "}
                <span className="text-[#50df83]">
                  Better Tomorrow
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                Professional surveying, GIS, mining and geospatial solutions
                powered by accurate field data, modern technology and
                dependable project support.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="rounded-full bg-[#19a957] px-7 py-4 text-center text-sm font-bold text-white shadow-lg shadow-green-950/30 transition hover:-translate-y-0.5 hover:bg-[#148c47] sm:text-base"
                >
                  Get a Quote
                </button>

                <button
                  type="button"
                  onClick={() => scrollTo("services")}
                  className="rounded-full border border-white/30 bg-white/10 px-7 py-4 text-center text-sm font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20 sm:text-base"
                >
                  Our Services
                </button>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">

              {heroFeatures.map((item) => (
                <div
                  key={item.number}
                  className="group rounded-2xl border border-white/15 bg-black/20 p-5 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-green-300/40 hover:bg-black/30 sm:p-6"
                >

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-bold text-green-300">
                      {item.number}
                    </span>

                    <span className="h-2 w-2 rounded-full bg-green-400 opacity-70 transition group-hover:opacity-100" />

                  </div>

                  <h3 className="mt-5 text-base font-bold sm:text-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-300 sm:text-sm">
                    {item.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 sm:mt-20 md:grid-cols-4">

            <div>
              <div className="text-2xl font-black sm:text-3xl">
                14+
              </div>
              <div className="mt-1 text-xs text-slate-300 sm:text-sm">
                Years Experience
              </div>
            </div>

            <div>
              <div className="text-2xl font-black sm:text-3xl">
                2000+ km
              </div>
              <div className="mt-1 text-xs text-slate-300 sm:text-sm">
                Linear Projects
              </div>
            </div>

            <div>
              <div className="text-2xl font-black sm:text-3xl">
                30,000+
              </div>
              <div className="mt-1 text-xs text-slate-300 sm:text-sm">
                Acres Surveyed
              </div>
            </div>

            <div>
              <div className="text-2xl font-black sm:text-3xl">
                Pan India
              </div>
              <div className="mt-1 text-xs text-slate-300 sm:text-sm">
                Project Capability
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          ABOUT
      ========================================================= */}
      <section
        id="about"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20 lg:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

            <div className="overflow-hidden rounded-3xl shadow-xl">

              <img
                src="/rgt-field-work/pihra-lithium-01.jpg"
                alt="RGT surveying field work"
                className="h-[420px] w-full object-cover sm:h-[500px]"
              />

            </div>

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
                About RGT
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                A Forward Thinking Surveying Company
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                Rayyan Geo Tech (RGT) is a surveying and geospatial solutions
                company based in Giridih, Jharkhand. The company provides
                surveying, GIS, mining and infrastructure-related services
                using modern surveying equipment and software.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                RGT works across surveying requirements including
                topographical surveys, DGPS surveys, road and alignment
                surveys, cadastral work, setting out, GIS documentation,
                drone/UAV surveys and mining-related surveying.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#123b2a] p-6 text-white">

                  <div className="text-lg font-bold">
                    Our Mission
                  </div>

                  <p className="mt-3 text-sm leading-6 text-green-50">
                    Deliver accurate and dependable surveying solutions with
                    careful planning, attention to detail and appropriate
                    technology.
                  </p>

                </div>

                <div className="rounded-2xl border border-green-100 bg-green-50 p-6">

                  <div className="text-lg font-bold text-[#123b2a]">
                    Our Vision
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Support engineering and infrastructure projects with
                    reliable field information and modern geospatial
                    solutions.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section
        id="services"
        className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Comprehensive Surveying Solutions
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              From field data collection to GIS documentation, RGT provides
              surveying solutions for infrastructure, mining, land and
              engineering requirements.
            </p>

          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl sm:p-7"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-lg font-black text-green-700">
                  {service.number}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {service.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          LIDAR
      ========================================================= */}
      <section
        id="lidar"
        className="scroll-mt-24 bg-slate-50 py-14 sm:py-16"
      >

        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              Advanced Capability
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Advanced LiDAR Surveying
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Modern LiDAR-based solutions for detailed spatial data
              collection across different surveying environments.
            </p>

          </div>

          <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

            <img
              src="/lidar-solutions.png"
              alt="LiDAR Survey Solutions showing backpack, drone and car mounted systems"
              className="block h-auto w-full object-contain"
            />

          </div>

        </div>

      </section>

      {/* =========================================================
          PROJECTS
      ========================================================= */}
      <section
        id="projects"
        className="scroll-mt-24 bg-white py-16 sm:py-20"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              Our Field Work
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Real Projects. Real Surveying Work.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              A glimpse of surveying and geospatial field work carried out by
              Rayyan Geo Tech.
            </p>

          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">

            {/* PIHRA */}
            <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

              <div className="grid grid-cols-2 gap-1 bg-slate-100">

                <div className="h-56 overflow-hidden sm:h-64">
                  <img
                    src="/rgt-field-work/pihra-lithium-01.jpg"
                    alt="Pihra Lithium Site surveying work"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="h-56 overflow-hidden sm:h-64">
                  <img
                    src="/rgt-field-work/pihra-lithium-02.jpg"
                    alt="Pihra Lithium Site field work"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

              </div>

              <div className="h-64 overflow-hidden sm:h-72">

                <img
                  src="/rgt-field-work/pihra-lithium-03.jpg"
                  alt="Pihra Lithium Site survey field work"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />

              </div>

              <div className="p-6 sm:p-7">

                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                  Mining &amp; Geospatial Survey
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Pihra Lithium Site — Giridih
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Field-work imagery from surveying activities at the Pihra
                  Lithium Site in Giridih, Jharkhand.
                </p>

              </div>

            </article>

            {/* AMBADIH */}
            <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

              <div className="grid grid-cols-2 gap-1 bg-slate-100">

                <div className="h-56 overflow-hidden sm:h-64">
                  <img
                    src="/rgt-field-work/ambadih-copper-01.jpg"
                    alt="Ambadih Copper surveying work"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="h-56 overflow-hidden sm:h-64">
                  <img
                    src="/rgt-field-work/ambadih-copper-02.jpg"
                    alt="Ambadih Copper field surveying work"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

              </div>

              <div className="flex h-64 items-center justify-center bg-[#123b2a] p-8 sm:h-72">

                <div className="text-center text-white">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-green-300/30 bg-green-400/10 text-2xl">
                    ◈
                  </div>

                  <div className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-green-300">
                    Field Survey
                  </div>

                  <div className="mt-2 text-2xl font-black">
                    Ambadih Copper
                  </div>

                </div>

              </div>

              <div className="p-6 sm:p-7">

                <p className="text-xs font-bold uppercase tracking-wider text-green-700">
                  Mining &amp; Geospatial Survey
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Ambadih Copper
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  Real field-work imagery from surveying activities at the
                  Ambadih Copper project.
                </p>

              </div>

            </article>

          </div>

        </div>

      </section>

      {/* =========================================================
          TECHNOLOGY
      ========================================================= */}
      <section
        id="technology"
        className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              Our Technology
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Modern Tools. Accurate Results.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              RGT combines modern surveying equipment, UAV technology,
              LiDAR, GIS and CAD workflows for dependable geospatial results.
            </p>

          </div>

          <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

            <img
              src="/technology-section.png"
              alt="RGT surveying technology including Total Station, GNSS, UAV, LiDAR, Auto Level, GPS, GIS and CAD"
              className="block h-auto w-full object-contain"
            />

          </div>

        </div>

      </section>

      {/* =========================================================
          CLIENTS
      ========================================================= */}
      <section
        id="clients"
        className="scroll-mt-24 bg-white py-14 sm:py-16"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">
              Client Relationships
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Trusted Project Relationships
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Client and project relationships represented on the RGT website.
            </p>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

            {clientLogos.map((logo, index) => (
              <div
                key={logo}
                className="flex h-28 items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <img
                  src={logo}
                  alt={`RGT client ${index + 1}`}
                  className="max-h-20 max-w-full object-contain"
                />

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =========================================================
          CONTACT
      ========================================================= */}
      <section
        id="contact"
        className="scroll-mt-24 bg-[#123b2a] py-16 text-white sm:py-20 lg:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">

            {/* CONTACT DETAILS */}
            <div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-300">
                Contact RGT
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Let&apos;s Discuss Your Surveying Requirement
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-green-50">
                Contact Rayyan Geo Tech for surveying, GIS, mining and
                geospatial project requirements.
              </p>

              <div className="mt-8 space-y-5">

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-green-300">
                    Office
                  </div>

                  <div className="mt-2 leading-7 text-white">
                    Opposite Mohanpur Church
                    <br />
                    Near Nehru Yuva Kendra
                    <br />
                    Giridih, Jharkhand
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-green-300">
                    Phone
                  </div>

                  <a
                    href={`tel:${PHONE.replace(/\s/g, "")}`}
                    className="mt-2 block text-lg font-bold hover:text-green-300"
                  >
                    {PHONE}
                  </a>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-green-300">
                    Email
                  </div>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-2 block break-words font-semibold hover:text-green-300"
                  >
                    {EMAIL}
                  </a>
                </div>

              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <a
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  className="rounded-2xl bg-[#16834b] px-6 py-4 text-center font-bold text-white transition hover:bg-[#116a3d]"
                >
                  Call RGT
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-center font-bold text-white transition hover:bg-white/10"
                >
                  Email RGT
                </a>

              </div>

            </div>

            {/* ENQUIRY FORM */}
            <div className="rounded-3xl bg-white p-7 text-slate-900 shadow-2xl sm:p-9">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-700">
                Project Enquiry
              </p>

              <h3 className="mt-2 text-2xl font-black">
                Request a Survey
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Share your basic project details with RGT.
              </p>

              {submitted ? (

                <div className="mt-7 rounded-2xl border border-green-200 bg-green-50 p-6">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-xl font-bold text-white">
                    ✓
                  </div>

                  <h4 className="mt-4 text-xl font-bold text-[#123b2a]">
                    Enquiry Submitted
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Your enquiry has been captured on the page.
                    Connect this form to an email or form service before
                    using it for live customer enquiries.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 rounded-xl border border-green-200 px-5 py-3 text-sm font-bold text-green-700 transition hover:bg-white"
                  >
                    Submit Another Enquiry
                  </button>

                </div>

              ) : (

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5"
                >

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    />

                  </div>

                  <div>

                    <label
                      htmlFor="service"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Survey Requirement
                    </label>

                    <select
                      id="service"
                      name="service"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    >

                      <option value="" disabled>
                        Select a service
                      </option>

                      <option value="Topographical Survey">
                        Topographical Survey
                      </option>

                      <option value="DGPS Survey">
                        DGPS Survey
                      </option>

                      <option value="Mining Survey">
                        Mining Survey
                      </option>

                      <option value="Road & Alignment">
                        Road &amp; Alignment
                      </option>

                      <option value="Cadastral Survey">
                        Cadastral Survey
                      </option>

                      <option value="Setting Out">
                        Setting Out
                      </option>

                      <option value="GIS & Mapping">
                        GIS &amp; Mapping
                      </option>

                      <option value="Drone / UAV Survey">
                        Drone / UAV Survey
                      </option>

                      <option value="LiDAR Survey">
                        LiDAR Survey
                      </option>

                      <option value="Other">
                        Other Requirement
                      </option>

                    </select>

                  </div>

                  <div>

                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      Project Details
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us briefly about your project..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    />

                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#16834b] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:bg-[#116a3d] hover:shadow-xl"
                  >
                    Send Enquiry
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-500">
                    Enquiry form preview — connect it to your email/form
                    service before launch.
                  </p>

                </form>

              )}

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="bg-[#081a12] py-10 text-white">

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <img
                src="/rgt-logo.png"
                alt="Rayyan Geo Tech"
                className="h-14 w-14 object-contain"
              />

              <div>

                <div className="font-extrabold tracking-wide">
                  RAYYAN GEO TECH
                </div>

                <div className="text-sm text-green-200">
                  SURVEYING SOLUTION
                </div>

                <div className="mt-1 text-xs text-slate-400">
                  Giridih, Jharkhand
                </div>

              </div>

            </div>

            <div className="text-sm text-slate-300">

              <div>{PHONE}</div>

              <div className="mt-1 break-words">
                {EMAIL}
              </div>

            </div>

          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Rayyan Geo Tech. All rights reserved.
          </div>

        </div>

      </footer>

      {/* =========================================================
          GLOBAL STYLES
      ========================================================= */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        .nav-link {
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: #16834b;
        }
      `}</style>

    </main>
  );
}