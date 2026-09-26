"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  Compass,
  Database,
  DraftingCompass,
  Globe2,
  Layers3,
  Mail,
  Map,
  MapPin,
  Menu,
  Mountain,
  Phone,
  Radar,
  Ruler,
  Send,
  ShieldCheck,
  Smartphone,
  Users,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const PHONE = "089 69 34 1822";
const EMAIL = "rgtdronesurvey@gmail.com";

const mainNavigation = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["LiDAR", "#lidar"],
  ["Projects", "#projects"],
  ["Technology", "#technology"],
  ["Team", "#team"],
  ["Clients", "#clients"],
];

const moreNavigation = [
  ["Why RGT", "#why-rgt"],
  ["Our Process", "#process"],
  ["Industries We Serve", "#industries"],
  ["Equipment & Capabilities", "#equipment"],
  ["Project Statistics", "#statistics"],
  ["Certifications & Empanelments", "#certifications"],
  ["FAQ", "#faq"],
  ["Contact / Google Maps", "#contact"],
];

type Project = {
  category: string;
  title: string;
  scope: string;
  client: string;
  owner: string;
  location: string;
  image?: string;
};

const projects: Project[] = [
  {
    category: "Water Resources",
    title:
      "DPR for Torlow & Putungra Reservoir Irrigation Scheme",
    scope:
      "X-sectional survey of existing canals (52 Kms), grid survey of command area (5700 Hectare), and as-built survey of existing structures.",
    client:
      "Lahmeyer International India (Pvt.) Ltd. Gurgaon & Hydel Construction, Kangra, H.P.",
    owner:
      "Waterways Division, Chaibasa under WRD Department of Government of Jharkhand",
    location: "Manjhari Block, Chaibasa, Jharkhand",
  },
  {
    category: "Roads & Highways",
    title:
      "Giridih–Jamua–Sarwan Road",
    scope:
      "45.15 Km road project including DGPS Ground Control Points, traversing, OGL, topographical survey and centre-line stakeout.",
    client:
      "GKCPL, Hyderabad; Consultant – Euroestudios S.L. in JV with Rodic Consultants Pvt. Ltd.",
    owner:
      "State Highway Authority of Jharkhand (SHAJ), project sponsored by Asian Development Bank (ADB)",
    location: "Saran–Jamua–Giridih, Jharkhand",
  },
  {
    category: "Forest & GIS",
    title:
      "Forest Boundary Identification & Demarcation",
    scope:
      "Identification and demarcation of forest boundaries using DGPS / ETS survey under various forest divisions.",
    client: "Cyber Swift, Kolkata",
    owner:
      "Department of Forest, Environment & Climate Change, Government of Jharkhand",
    location: "Gomia, Bokaro Forest Division",
  },
  {
    category: "Water Resources",
    title:
      "Fulwara & Kawaldag Reservoir Irrigation Scheme",
    scope:
      "Cross-sectional survey of existing canals covering 22 Kms and as-built survey of existing structures.",
    client:
      "Lahmeyer International India (Pvt.) Ltd. Gurgaon & Hydel Construction, Kangra, H.P.",
    owner:
      "Waterways Division, Garhwa under WRD Department of Government of Jharkhand",
    location: "Garhwa, Jharkhand",
  },
  {
    category: "Government",
    title:
      "Plastic Park, Devipur",
    scope:
      "Topographical survey of the proposed Plastic Park covering an area of 159.47 acres.",
    client:
      "Ernst & Young LLP and The Creator Consultant, Ranchi",
    owner:
      "Jharkhand Industrial and Infrastructure Development Corporation (JIIDCO)",
    location: "Devipur, Deoghar, Jharkhand",
  },
  {
    category: "Government",
    title:
      "Vinoba Bhave University",
    scope:
      "Topographical survey including as-built survey of existing structures of the university.",
    client: "The Creator Consultant, Ranchi",
    owner:
      "Vinoba Bhave University, Hazaribagh",
    location: "Hazaribagh, Jharkhand",
  },
  {
    category: "Government",
    title:
      "Indian Statistical Institute",
    scope:
      "Topographical survey covering approximately 60 acres including Rose Villa, Upper Farm House and Lower Farm House.",
    client:
      "Indian Statistical Institute, Giridih",
    owner:
      "Indian Statistical Institute, Government of India",
    location: "Giridih, Jharkhand",
  },
  {
    category: "Infrastructure",
    title:
      "Parashnath Helipad & Reception Building",
    scope:
      "Topographical survey of Parashnath Mountain for construction of a helipad and reception building at MSL 1312 m.",
    client: "The Creator Consultant, Ranchi",
    owner:
      "Building Construction Division, Giridih, Jharkhand",
    location: "Giridih, Jharkhand",
  },
  {
    category: "Roads & Highways",
    title:
      "Chotaki Kharagdiha–Mirzaganj & Link Roads",
    scope:
      "Survey, preparation of LS, CS and quantity calculation for road widening and strengthening.",
    client: "JNP Infra Pvt. Ltd., Raniganj",
    owner:
      "Road Construction Department, Government of Jharkhand",
    location: "Giridih, Jharkhand",
  },
  {
    category: "Roads & Highways",
    title:
      "Kowar–Koderma Road",
    scope:
      "Survey, preparation of LS, CS and quantity calculation for widening and strengthening from KM 0+000 to 37+200.",
    client: "RKS, Ranchi",
    owner: "PWD, Giridih",
    location: "Giridih, Jharkhand",
  },
  {
    category: "Infrastructure",
    title:
      "Oil Pipeline Across Kiul River",
    scope:
      "Alignment survey for the proposed oil pipeline across the Kiul River.",
    client: "Nandani Impex Pvt. Ltd.",
    owner: "Indian Oil Company (IOC)",
    location: "Lakhisarai, Bihar",
  },
  {
    category: "Infrastructure",
    title:
      "Proposed Bridge Across Barakar River",
    scope:
      "Alignment survey and LS/CS on upstream and downstream sections up to 1 km.",
    client: "Ranchi Design, Ranchi",
    owner:
      "Special Division, Government of Jharkhand",
    location: "Dhanbad, Jharkhand",
  },
  {
    category: "Roads & Highways",
    title:
      "NH-114A to Parashnath Hill Foot",
    scope:
      "Survey, preparation of LS, CS and quantity calculation for 4.1 Km road widening and strengthening.",
    client:
      "Panchan Kumar Mishra Contractor, Deoghar",
    owner: "PWD, Giridih",
    location: "Madhuban, Jharkhand",
  },
  {
    category: "Roads & Highways",
    title:
      "Giridih–Jamua Road",
    scope:
      "Survey, preparation of LS and CS with quantity calculation according to design for 27.25 Km.",
    client: "PWD, Giridih",
    owner: "PWD, Giridih",
    location: "Jamua, Jharkhand",
  },
  {
    category: "Government",
    title:
      "Giridih Collectorate",
    scope:
      "Topographical survey including as-built survey of existing structures for a beautification work proposal.",
    client:
      "Building Construction Division, Giridih, Jharkhand",
    owner: "Government of Jharkhand",
    location: "Giridih, Jharkhand",
  },
  {
    category: "Water Resources",
    title:
      "Existing Canal Survey – Odisha",
    scope:
      "Topographical and alignment survey of an existing canal for further study.",
    client: "VD Surveyors",
    owner:
      "Irrigation Department, Pradip, Odisha",
    location: "Pradip, Odisha",
  },
  {
    category: "Infrastructure",
    title:
      "District Level Football Stadium, Pakur",
    scope:
      "Topographical / contour survey and stakeout / layout of the proposed football stadium.",
    client: "The Creator Consultant, Ranchi",
    owner: "Government of Jharkhand",
    location: "Pakur, Jharkhand",
  },
  {
    category: "Infrastructure",
    title:
      "Over Bridge – ECL Command Area",
    scope:
      "As-built survey and verification of road over bridge under the ECL Command Area.",
    client:
      "ABC Construction Contractor / RITES Consultant",
    owner: "ECL Command",
    location: "Rajmahal, Jharkhand",
  },
  {
    category: "Forest & GIS",
    title:
      "Forest Clearance – Bus Stand & Parking, Madhuban",
    scope:
      "DGPS survey, geo-referenced digital shapefile in ArcGIS, topo-sheet georeferencing, village-map digitization and KML polygon creation.",
    client:
      "Rural Work Department (RWD)",
    owner: "Tourism Department, Jharkhand",
    location: "Madhuban, Jharkhand",
  },
  {
    category: "Forest & GIS",
    title:
      "Forest Clearance – Helipad & Reception Building",
    scope:
      "DGPS survey, geo-referenced digital shapefile in ArcGIS, topo-sheet georeferencing, village-map digitization and KML polygon creation.",
    client:
      "Building Construction Division, Giridih, Jharkhand",
    owner: "Civil Aviation Department, Ranchi",
    location: "Madhuban, Jharkhand",
  },
  {
    category: "Roads & Highways",
    title:
      "PMGSY Roads DPR",
    scope:
      "Survey, preparation of LS, CS and quantity calculation for different road stretches covering 25.35 Km.",
    client:
      "Excellent Grapher Surveying Company, Agra",
    owner: "Rural Work Department (RWD)",
    location: "Chakai, Jamui, Bihar",
  },
  {
    category: "Infrastructure",
    title:
      "Jheel Restaurant – Tillaya Dam",
    scope:
      "Topographical survey including as-built survey of existing structures for development of a 15-acre site.",
    client: "The Creator Consultant, Ranchi",
    owner: "Jharkhand Tourism Department",
    location: "Tillaya Dam, Jharkhand",
  },
  {
    category: "Water Resources",
    title:
      "Konar Canal Survey",
    scope:
      "Topographical and alignment survey of existing and under-construction canal for earthwork quantity estimation.",
    client: "Contractor",
    owner: "Irrigation Department, Konar Canal Project",
    location: "Dumri, Jharkhand",
  },
];

const projectCategories = [
  "All",
  "Roads & Highways",
  "Water Resources",
  "Mining",
  "Government",
  "Forest & GIS",
  "Infrastructure",
];

const clientLogos = [
  { name: "Government of Jharkhand", src: "/clients/govt-of-jharkhand.jpg" },
  { name: "Jharkhand Police", src: "/clients/jh-police.jpg" },
  { name: "Vedanta", src: "/clients/vedanta.jpg" },
  { name: "NTPC", src: "/clients/ntpc.jpg" },
  { name: "Rattan India", src: "/clients/rattan-india.jpg" },
  { name: "L&T", src: "/clients/lnt.jpg" },
  { name: "MECON", src: "/clients/mecon.jpg" },
  { name: "PICA SONA", src: "/clients/pica-sona.jpg" },
  { name: "ESAF", src: "/clients/esaf.jpg" },
  { name: "CR", src: "/clients/cr.jpg" },
  { name: "Kalpataru", src: "/clients/kalap-taru.png" },
  { name: "JMC", src: "/clients/jmc.jpg" },
  { name: "GKC", src: "/clients/gkc.jpg" },
  { name: "Ernst & Young", src: "/clients/ey.jpg" },
  { name: "Almondz", src: "/clients/almondz.jpg" },
  { name: "Aqua Pumps", src: "/clients/aqua-pumps.jpg" },
  { name: "DOPO", src: "/clients/dopo.jpg" },
  { name: "Balmukund", src: "/clients/balmukund.jpg" },
  { name: "CyberSWIFT", src: "/clients/cyberswift.jpg" },
  { name: "ECR", src: "/clients/ecr.jpg" },
  { name: "GSI", src: "/clients/gsi.jpg" },
  { name: "Maheshwari", src: "/clients/maheswari.jpg" },
  { name: "Mongia", src: "/clients/mongia.jpg" },
  { name: "Niranjan Rai", src: "/clients/niranjan-rai.jpg" },
  { name: "RDCS", src: "/clients/rdcs.jpg" },
  { name: "RKS", src: "/clients/rks.jpg" },
  { name: "Saluja", src: "/clients/saluja.jpg" },
  { name: "SIMA Labs", src: "/clients/sima-labs.jpg" },
  { name: "Tecorfin", src: "/clients/tecorfin.jpg" },
  { name: "TUFCON-XT", src: "/clients/tufcon-xt.jpg" },
];

const services = [
  {
    icon: Mountain,
    title: "Mining Survey",
    text: "Surveying solutions for mining, quarry and mineral project requirements.",
  },
  {
    icon: Map,
    title: "Topographical Survey",
    text: "Accurate terrain, contour and ground-feature data for project planning.",
  },
  {
    icon: Radar,
    title: "DGPS Survey",
    text: "High-precision positioning and control-point surveying for demanding projects.",
  },
  {
    icon: Compass,
    title: "Drone / UAV Survey",
    text: "Modern aerial mapping and photogrammetry for large and complex sites.",
  },
  {
    icon: Ruler,
    title: "Road & Alignment",
    text: "Road, bridge, canal, pipeline and alignment survey solutions.",
  },
  {
    icon: Layers3,
    title: "GIS Solutions",
    text: "GIS-based documentation, mapping, georeferencing and spatial data.",
  },
  {
    icon: DraftingCompass,
    title: "CAD & Drafting",
    text: "Professional CAD drawings, plans, profiles and engineering documentation.",
  },
  {
    icon: Database,
    title: "Land & Cadastral",
    text: "Land boundary, cadastral, acquisition and documentation surveys.",
  },
];

const technology = [
  "UAV / Drone",
  "DGPS",
  "Total Station",
  "Auto Level",
  "LiDAR",
  "GIS",
  "CAD",
  "Photogrammetry",
];

const team = [
  {
    name: "M. Manzar Alam",
    role: "Promoter / Surveyor",
    experience: "16 Years",
  },
  {
    name: "M. Khurshid",
    role: "Civil Engineer",
    experience: "10 Years",
  },
  {
    name: "J. K. Dey",
    role: "Survey Engineer (DGMS)",
    experience: "25 Years",
  },
  {
    name: "Sikander Khokhar",
    role: "Chief Surveyor",
    experience: "12 Years",
  },
  {
    name: "R. Chaurasia",
    role: "Marketing",
    experience: "12 Years",
  },
];

const staff = [
  ["Senior Surveyors", "3"],
  ["Surveyors", "5"],
  ["Assistant Surveyors", "4"],
  ["Drafting Engineer", "1"],
  ["Draftsman (CAD)", "4"],
];

const whyChooseRGT = [
  {
    icon: Clock3,
    title: "14+ Years Experience",
    text: "Established surveying experience since 2012.",
  },
  {
    icon: ShieldCheck,
    title: "Mines & Geology",
    text: "Empanelled for mining and geology-related survey work.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    text: "Surveyors, engineers, drafting professionals and field staff.",
  },
  {
    icon: Radar,
    title: "Modern Technology",
    text: "DGPS, Total Station, UAV, LiDAR, GIS and digital workflows.",
  },
  {
    icon: Globe2,
    title: "Pan-India Capability",
    text: "Project capability across locations beyond Jharkhand.",
  },
  {
    icon: CheckCircle2,
    title: "Project-Ready Deliverables",
    text: "Accurate field information prepared for engineering and planning.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Requirement",
    text: "Understand the project, location, scope and expected deliverables.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Site Planning",
    text: "Plan the survey methodology, resources, equipment and field requirements.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Field Survey",
    text: "Collect accurate project data using appropriate survey technology.",
    icon: Ruler,
  },
  {
    number: "04",
    title: "Data Processing",
    text: "Process information through surveying, CAD, GIS and digital workflows.",
    icon: Database,
  },
  {
    number: "05",
    title: "Final Deliverables",
    text: "Prepare project-ready maps, drawings, data and documentation.",
    icon: CheckCircle2,
  },
];

const industries = [
  {
    icon: Mountain,
    title: "Mining & Minerals",
    text: "Surveying support for mining, quarry and mineral-related projects.",
  },
  {
    icon: Map,
    title: "Roads & Highways",
    text: "Alignment, topographical and construction survey requirements.",
  },
  {
    icon: Globe2,
    title: "Infrastructure",
    text: "Geospatial data for infrastructure and engineering development.",
  },
  {
    icon: Database,
    title: "Water Resources",
    text: "Canal, reservoir, irrigation and related survey work.",
  },
  {
    icon: ShieldCheck,
    title: "Forest & Environment",
    text: "Surveying and documentation for forest clearance requirements.",
  },
  {
    icon: Smartphone,
    title: "Land Development",
    text: "Land, cadastral, boundary and development surveys.",
  },
  {
    icon: Radar,
    title: "Power Projects",
    text: "Surveying support for power and utility project requirements.",
  },
  {
    icon: DraftingCompass,
    title: "Engineering Projects",
    text: "Survey data and CAD/GIS deliverables for engineering teams.",
  },
];

const equipment = [
  "Total Station",
  "DGPS",
  "Auto Level",
  "GPS",
  "UAV / Drone",
  "LiDAR",
  "High-End Survey Computers",
  "Scanners & Plotters",
  "Agisoft Metashape",
  "BricsCAD",
  "Global Mapper",
  "SurveyCAD",
];

const faqs = [
  {
    question: "What types of surveys does RGT provide?",
    answer:
      "RGT provides surveying services including topographical surveys, DGPS surveys, mining surveys, road and alignment surveys, cadastral and land surveys, drone/UAV surveys, GIS work, LiDAR-related work and CAD documentation.",
  },
  {
    question: "Does RGT undertake mining survey work?",
    answer:
      "Yes. RGT provides survey solutions for mining and geology-related project requirements and is listed as empanelled with Mines & Geology.",
  },
  {
    question: "Does RGT provide drone surveying?",
    answer:
      "Yes. Drone/UAV surveying and aerial mapping are among the technologies and services used by RGT.",
  },
  {
    question: "Where does RGT operate?",
    answer:
      "RGT is headquartered in Giridih, Jharkhand and has project capability beyond Jharkhand, including Pan-India project work.",
  },
  {
    question: "How can I request a survey quotation?",
    answer:
      "You can use the enquiry form on this website or contact RGT directly by phone or email with your project location, survey requirement and project details.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [projectFilter, setProjectFilter] = useState("All");
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();

        if (mounted) {
          setIsLoggedIn(Boolean(data.user));
        }
      } catch {
        if (mounted) {
          setIsLoggedIn(false);
        }
      }
    }

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/login";
    } catch {
      setLoggingOut(false);
    }
  }

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
    location: "",
    details: "",
  });

  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateForm = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to send enquiry."
        );
      }

      setSubmitted(true);

      setForm({
        name: "",
        phone: "",
        email: "",
        requirement: "",
        location: "",
        details: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  const filteredProjects =
    projectFilter === "All"
      ? projects
      : projects.filter(
          (project) => project.category === projectFilter
        );

  function closeMore() {
    setMoreOpen(false);
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] text-[#17231d]">

      {/* TOP BAR */}
      <div className="hidden bg-[#103c2b] lg:block">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-2.5 text-[12px] text-white">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin size={13} />
              Giridih, Jharkhand
            </span>

            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="flex items-center gap-2 transition hover:text-[#b5e76d]"
            >
              <Phone size={13} />
              {PHONE}
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 transition hover:text-[#b5e76d]"
            >
              <Mail size={13} />
              {EMAIL}
            </a>
          </div>

          <div className="font-semibold uppercase tracking-[0.18em] text-white/65">
            Surveying · GIS · Mining · Geospatial Solutions
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#e8ece7] bg-white/95 shadow-[0_4px_25px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-[88px] max-w-[1500px] items-center justify-between gap-5 px-5 lg:px-8">

          <a
            href="#home"
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full bg-white">
              <img
                src="/rgt-logo.png"
                alt="Rayyan Geo Tech"
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="hidden sm:block">
              <div className="text-[18px] font-black leading-tight tracking-tight text-[#123e2c]">
                RAYYAN GEO
                <br />
                TECH
              </div>

              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-[#66726b]">
                Surveying Solution
              </div>

              <div className="mt-0.5 text-[10px] text-[#89918c]">
                Giridih, Jharkhand
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 xl:flex">
            {mainNavigation.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="group relative rounded-full px-3 py-2.5 text-[13px] font-bold text-[#536058] transition hover:bg-[#f5f8f4] hover:text-[#1d704c]"
              >
                {label}

                <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#1d704c] transition-all duration-200 group-hover:w-5" />
              </a>
            ))}

            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((value) => !value)}
                className={`flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[13px] font-bold transition ${
                  moreOpen
                    ? "bg-[#eef5ef] text-[#1d704c]"
                    : "text-[#536058] hover:bg-[#f5f8f4] hover:text-[#1d704c]"
                }`}
              >
                More

                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreOpen && (
                <div className="absolute right-0 top-[calc(100%+14px)] z-50 w-[310px] overflow-hidden rounded-2xl border border-[#e2e8e1] bg-white p-2 shadow-[0_20px_60px_rgba(18,62,44,0.16)]">

                  <div className="px-4 pb-2 pt-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8a958d]">
                      Explore RGT
                    </div>
                  </div>

                  {moreNavigation.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={closeMore}
                      className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-[#425048] transition hover:bg-[#f0f6f0] hover:text-[#1d704c]"
                    >
                      <span>{label}</span>

                      <ChevronRight
                        size={16}
                        className="text-[#9aa49d] transition group-hover:translate-x-1 group-hover:text-[#1d704c]"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden items-center gap-2 xl:flex">
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex shrink-0 items-center gap-2 rounded-full border border-[#d8e1da] bg-white px-5 py-3.5 text-sm font-black text-black transition hover:border-[#1d704c] hover:bg-[#f1f6f1] hover:text-[#1d704c] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            )}

            <a
              href="#contact"
              className="flex shrink-0 items-center gap-2 rounded-full bg-[#1d704c] px-5 py-3.5 text-sm font-black text-white shadow-[0_8px_25px_rgba(29,112,76,0.18)] transition hover:-translate-y-0.5 hover:bg-[#155a3c]"
            >
              Request a Survey
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                aria-label="Logout"
                className="flex h-12 items-center justify-center rounded-xl border border-[#dfe5df] bg-white px-3.5 text-[#173a29] shadow-sm transition hover:bg-[#f1f6f1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="text-sm font-black">
                  {loggingOut ? "..." : "Logout"}
                </span>
              </button>
            )}

            <button
              onClick={() => setMenuOpen((value) => !value)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#dfe5df] bg-[#f7f9f6] text-[#173a29]"
              aria-label="Open menu"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[#e8ece7] bg-white px-5 py-5 shadow-xl xl:hidden">
            <div className="mx-auto max-w-2xl">

              <div className="grid gap-1 sm:grid-cols-2">
                {mainNavigation.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3.5 font-bold text-[#46534b] hover:bg-[#f1f6f1]"
                  >
                    {label}
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setMoreOpen((value) => !value)}
                className="mt-1 flex w-full items-center justify-between rounded-xl px-4 py-3.5 font-bold text-[#46534b] hover:bg-[#f1f6f1]"
              >
                <span>More</span>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreOpen && (
                <div className="ml-3 border-l-2 border-[#dce8dd] pl-3">
                  {moreNavigation.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => {
                        setMenuOpen(false);
                        setMoreOpen(false);
                      }}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-[#66726b] hover:bg-[#f1f6f1] hover:text-[#1d704c]"
                    >
                      {label}
                      <ChevronRight size={15} />
                    </a>
                  ))}
                </div>
              )}

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  disabled={loggingOut}
                  className="mt-4 flex w-full items-center justify-center rounded-xl border border-[#d8e1da] bg-white px-5 py-4 font-black text-black transition hover:bg-[#f1f6f1] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 flex items-center justify-center rounded-xl border border-[#d8e1da] bg-white px-5 py-4 font-black text-black transition hover:bg-[#f1f6f1]"
                >
                  Customer Login
                </Link>
              )}

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#1d704c] px-5 py-4 font-black text-white"
              >
                Request a Survey
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/rgt-field-work/pihra-lithium-01.jpg"
            alt="RGT field surveying"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#071a12]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061a11]/95 via-[#092217]/75 to-[#092217]/30" />
        </div>

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8">

          <div className="max-w-3xl text-white">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <ShieldCheck
                size={17}
                className="text-[#b5e76d]"
              />
              Empanelled With Mines &amp; Geology
            </div>

            <h1 className="text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
              Precision for a{" "}
              <span className="text-[#b5e76d]">
                Better Tomorrow
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
              Professional surveying, GIS, drone mapping and geospatial
              solutions for mining, infrastructure, land and engineering
              projects.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b5e76d] px-7 py-4 font-black text-[#173923] transition hover:-translate-y-1"
              >
                Get a Quote
                <ArrowRight size={18} />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Our Services
                <ChevronRight size={18} />
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["14+", "Years Experience"],
                ["2000+", "KM Linear Projects"],
                ["30,000+", "Acres Surveyed"],
                ["Pan India", "Project Capability"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                >
                  <div className="text-2xl font-black">
                    {value}
                  </div>

                  <div className="mt-1 text-xs text-white/60">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:ml-auto lg:max-w-[460px]">
            {[
              {
                icon: Ruler,
                title: "Precision Surveying",
                text: "Accurate field data for engineering and infrastructure.",
              },
              {
                icon: Smartphone,
                title: "Drone Mapping",
                text: "Modern aerial data collection and photogrammetry.",
              },
              {
                icon: Globe2,
                title: "GIS Solutions",
                text: "Spatial data, mapping and geospatial documentation.",
              },
              {
                icon: Mountain,
                title: "Mines & Geology",
                text: "Survey solutions for mining and mineral projects.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/15 bg-white/10 p-6 text-white backdrop-blur-xl"
                >
                  <Icon
                    className="mb-5 text-[#b5e76d]"
                    size={30}
                  />

                  <h3 className="font-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          <div className="overflow-hidden rounded-[2rem] bg-[#dfe8df] shadow-2xl">
            <img
              src="/rgt-field-work/pihra-lithium-02.jpg"
              alt="RGT surveying project"
              className="h-[520px] w-full object-cover"
            />
          </div>

          <div>
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              About RGT
            </div>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#173a29] sm:text-5xl">
              A Forward Thinking Surveying Company
            </h2>

            <p className="mt-6 leading-8 text-[#657169]">
              Rayyan Geo Tech (RGT) is a surveying and geospatial solutions
              company based in Giridih, Jharkhand. Founded in 2012, RGT
              provides surveying services for mining, infrastructure, land
              development, roads, water resources and other engineering
              projects.
            </p>

            <p className="mt-4 leading-8 text-[#657169]">
              Our work combines experienced field teams with modern
              surveying technology to produce accurate, practical and
              project-ready information.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Experienced survey professionals",
                "Modern surveying equipment",
                "Mining & infrastructure capability",
                "GIS and digital documentation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5"
                >
                  <CircleCheck
                    className="shrink-0 text-[#2c7b52]"
                    size={21}
                  />

                  <span className="text-sm font-bold text-[#35423a]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY RGT */}
      <section
        id="why-rgt"
        className="bg-[#eef2ed] px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">

            <div>
              <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
                Why Choose RGT
              </div>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
                Experience You Can Build On
              </h2>

              <p className="mt-5 max-w-xl leading-8 text-[#69736c]">
                RGT combines experienced surveying professionals, modern
                equipment and practical field knowledge to support demanding
                mining, infrastructure, land and engineering projects.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {whyChooseRGT.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dfeede] text-[#26724e] transition group-hover:bg-[#123e2c] group-hover:text-[#b5e76d]">
                      <Icon size={22} />
                    </div>

                    <h3 className="mt-5 font-black text-[#173a29]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#69736c]">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="bg-white px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              Our Process
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
              From Requirement to Reliable Results
            </h2>

            <p className="mt-5 leading-8 text-[#69736c]">
              A structured workflow helps us understand the requirement,
              plan the field work, collect accurate information and prepare
              useful project deliverables.
            </p>
          </div>

          <div className="relative mt-16">
            <div className="absolute left-[10%] right-[10%] top-10 hidden h-px bg-[#cdd9cf] lg:block" />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative text-center"
                  >
                    <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-white bg-[#123e2c] text-[#b5e76d] shadow-lg">
                      <Icon size={27} />
                    </div>

                    <div className="mt-5 text-xs font-black tracking-[0.2em] text-[#26724e]">
                      STEP {step.number}
                    </div>

                    <h3 className="mt-2 text-xl font-black text-[#173a29]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#69736c]">
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section
        id="industries"
        className="bg-[#eef2ed] px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              Industries We Serve
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
              Surveying Across Project Environments
            </h2>

            <p className="mt-5 leading-8 text-[#69736c]">
              RGT provides surveying and geospatial support across mining,
              infrastructure, land, water resources and engineering projects.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfeede] text-[#26724e]">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-6 text-lg font-black text-[#173a29]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#6b756e]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="bg-[#f7f9f6] px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              What We Do
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
              Comprehensive Surveying Solutions
            </h2>

            <p className="mt-5 leading-7 text-[#6a746d]">
              From field data collection to GIS documentation, RGT supports
              the complete surveying requirements of modern projects.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group rounded-3xl border border-black/5 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:bg-[#123e2c] hover:text-white hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfeede] text-[#26724e] transition group-hover:bg-[#b5e76d]">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-xl font-black">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#6b756e] transition group-hover:text-white/65">
                    {service.text}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#26724e] transition group-hover:text-[#b5e76d]">
                    Explore Service
                    <ArrowRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIDAR */}
      <section
        id="lidar"
        className="px-5 py-24 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#123e2c] lg:grid-cols-2">

          <div className="relative min-h-[380px]">
            <img
              src="/lidar-solutions.png"
              alt="LiDAR surveying"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-9 text-white sm:p-12">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#b5e76d]">
              Advanced Technology
            </div>

            <h2 className="mt-4 text-4xl font-black tracking-tight">
              Advanced LiDAR Surveying
            </h2>

            <p className="mt-5 leading-8 text-white/70">
              Capture detailed spatial information for complex terrain,
              infrastructure, vegetation and large project environments with
              modern LiDAR-based workflows.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Dense point-cloud data",
                "Large-area mapping",
                "Terrain modelling",
                "Infrastructure documentation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <CheckCircle2
                    className="text-[#b5e76d]"
                    size={18}
                  />

                  <span className="text-sm font-semibold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="bg-[#eef2ed] px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
                Project Portfolio
              </div>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
                Key Projects Executed
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-[#69736c]">
                Selected projects from RGT&apos;s documented project portfolio,
                covering roads, water resources, government work, forest/GIS
                and infrastructure.
              </p>
            </div>

            <div className="rounded-2xl bg-white px-5 py-4 text-center shadow-sm">
              <div className="text-3xl font-black text-[#1d704c]">
                {projects.length}+
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-[#7a847d]">
                Key Projects
              </div>
            </div>
          </div>

          {/* FILTERS */}
          <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
            {projectCategories.map((category) => {
              const active = projectFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setProjectFilter(category)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${
                    active
                      ? "bg-[#123e2c] text-[#b5e76d] shadow-lg"
                      : "bg-white text-[#5e6a62] ring-1 ring-black/5 hover:bg-[#f5f8f4] hover:text-[#1d704c]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* PROJECT GRID */}
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {filteredProjects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className="group flex flex-col overflow-hidden rounded-[1.7rem] bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="relative h-52 overflow-hidden bg-[#123e2c]">

                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#123e2c] via-[#1d704c] to-[#092519]" />

                      <div className="relative text-center text-white">
                        <Map
                          size={42}
                          className="mx-auto text-[#b5e76d]"
                        />

                        <div className="mt-3 text-xs font-black uppercase tracking-[0.2em] text-white/50">
                          RGT Project
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#1d704c] shadow">
                    {project.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">

                  <h3 className="text-xl font-black leading-tight text-[#173a29]">
                    {project.title}
                  </h3>

                  <div className="mt-3 flex items-start gap-2 text-xs font-semibold text-[#778078]">
                    <MapPin
                      size={14}
                      className="mt-0.5 shrink-0 text-[#26724e]"
                    />

                    {project.location}
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#68736b]">
                    {project.scope}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="mt-6 flex items-center gap-2 text-sm font-black text-[#26724e] transition hover:gap-3"
                  >
                    View Project
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}

          </div>

          {filteredProjects.length === 0 && (
            <div className="mt-10 rounded-3xl bg-white p-12 text-center">
              <p className="font-bold text-[#68736b]">
                No projects found in this category.
              </p>
            </div>
          )}

          <div className="mt-10 text-center text-sm text-[#778078]">
            Showing {filteredProjects.length} of {projects.length} documented
            key projects.
          </div>
        </div>
      </section>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06140e]/75 px-5 py-8 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#173a29] shadow-lg ring-1 ring-black/5 transition hover:bg-[#f0f5ef]"
              aria-label="Close project"
            >
              <X size={20} />
            </button>

            <div className="bg-[#123e2c] p-8 text-white sm:p-10">

              <div className="text-xs font-black uppercase tracking-[0.2em] text-[#b5e76d]">
                {selectedProject.category}
              </div>

              <h3 className="mt-3 pr-10 text-3xl font-black leading-tight sm:text-4xl">
                {selectedProject.title}
              </h3>

              <div className="mt-5 flex items-center gap-2 text-sm text-white/65">
                <MapPin size={16} />
                {selectedProject.location}
              </div>
            </div>

            <div className="grid gap-7 p-8 sm:p-10">

              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-[#26724e]">
                  Scope of Work
                </div>

                <p className="mt-3 leading-8 text-[#5f6b63]">
                  {selectedProject.scope}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="rounded-2xl bg-[#f4f7f3] p-5">
                  <div className="text-xs font-black uppercase tracking-wider text-[#8a948d]">
                    Client
                  </div>

                  <p className="mt-2 text-sm font-bold leading-6 text-[#304239]">
                    {selectedProject.client}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f4f7f3] p-5">
                  <div className="text-xs font-black uppercase tracking-wider text-[#8a948d]">
                    Owner
                  </div>

                  <p className="mt-2 text-sm font-bold leading-6 text-[#304239]">
                    {selectedProject.owner}
                  </p>
                </div>

              </div>

              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#1d704c] px-6 py-4 font-black text-white transition hover:bg-[#155a3c]"
              >
                Discuss a Similar Project
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* EQUIPMENT */}
      <section
        id="equipment"
        className="bg-[#123e2c] px-5 py-24 text-white lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#b5e76d]">
              Equipment &amp; Capabilities
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Technology We Work With
            </h2>

            <p className="mt-5 leading-8 text-white/65">
              RGT combines field surveying equipment with modern processing
              and mapping software to support different project requirements.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {equipment.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 font-bold text-white/85 transition hover:bg-white/10 hover:text-[#b5e76d]"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-[#b5e76d]"
                  />

                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section
        id="technology"
        className="px-5 py-24 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          <div>
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              Technology
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
              Modern Tools. Accurate Results.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-[#68736b]">
              RGT combines modern surveying equipment and digital workflows
              to collect, process and present reliable project information.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {technology.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/5 bg-white p-5 text-center font-black text-[#234a36] shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] bg-[#e6ece5]">
            <img
              src="/technology-section.png"
              alt="RGT surveying technology"
              className="h-[470px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section
        id="statistics"
        className="bg-[#eef2ed] px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              RGT By The Numbers
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
              Experience That Goes Beyond Numbers
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["14+", "Years Experience"],
              ["2,000+", "KM Linear Projects"],
              ["30,000+", "Acres Surveyed"],
              ["30+", "Client Relationships"],
              ["Pan India", "Project Capability"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl bg-white p-7 text-center shadow-sm ring-1 ring-black/5"
              >
                <div className="text-4xl font-black text-[#1d704c]">
                  {value}
                </div>

                <div className="mt-2 text-sm font-bold text-[#66726b]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section
        id="certifications"
        className="px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              Credentials
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
              Certifications &amp; Empanelments
            </h2>

            <p className="mt-5 leading-8 text-[#69736c]">
              Professional credentials and project-related recognition that
              support RGT&apos;s surveying capabilities.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">

            <div className="rounded-[2rem] border border-black/5 bg-[#f7f9f6] p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfeede] text-[#26724e]">
                <ShieldCheck size={27} />
              </div>

              <h3 className="mt-6 text-2xl font-black text-[#173a29]">
                Mines &amp; Geology Empanelment
              </h3>

              <p className="mt-3 leading-7 text-[#68736b]">
                RGT identifies itself as empanelled with Mines &amp; Geology
                for mining and geology-related survey work.
              </p>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-[#f7f9f6] p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfeede] text-[#26724e]">
                <Radar size={27} />
              </div>

              <h3 className="mt-6 text-2xl font-black text-[#173a29]">
                Drone / UAV Capability
              </h3>

              <p className="mt-3 leading-7 text-[#68736b]">
                RGT provides drone/UAV-based surveying and aerial mapping
                capability as part of its geospatial services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section
        id="team"
        className="bg-white px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              Our Team
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
              Experienced People. Practical Expertise.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl border border-black/5 bg-[#f7f9f6] p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dfeede] text-[#26724e]">
                  <Users size={25} />
                </div>

                <h3 className="mt-5 font-black text-[#173a29]">
                  {member.name}
                </h3>

                <p className="mt-2 text-sm font-semibold text-[#26724e]">
                  {member.role}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#778078]">
                  <Clock3 size={14} />
                  {member.experience}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {staff.map(([role, count]) => (
              <div
                key={role}
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-[#f7f9f6] px-5 py-4"
              >
                <span className="text-sm font-semibold text-[#526058]">
                  {role}
                </span>

                <span className="text-xl font-black text-[#26724e]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section
        id="clients"
        className="px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              Client Relationships
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
              Trusted Project Relationships
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {clientLogos.map((client) => (
              <div
                key={client.name}
                className="flex h-28 items-center justify-center rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={client.src}
                  alt={client.name}
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="bg-[#eef2ed] px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-4xl">

          <div className="text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
              FAQ
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-[#173a29] sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = faqOpen === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-black/5 bg-white"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setFaqOpen(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  >
                    <span className="font-black text-[#173a29]">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-[#26724e] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-black/5 px-6 pb-6 pt-4 text-sm leading-7 text-[#69736c]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="bg-[#103c2b] px-5 py-24 text-white lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">

          <div>
            <div className="text-sm font-black uppercase tracking-[0.2em] text-[#b5e76d]">
              Contact RGT
            </div>

            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Tell us what you need to survey.
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-white/65">
              Send your project requirements and our team can review the
              enquiry and contact you.
            </p>

            <div className="mt-9 space-y-4">

              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b5e76d] text-[#173923]">
                  <Phone size={20} />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-white/40">
                    Call
                  </div>

                  <div className="mt-1 font-bold">
                    {PHONE}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b5e76d] text-[#173923]">
                  <Mail size={20} />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-white/40">
                    Email
                  </div>

                  <div className="mt-1 font-bold">
                    {EMAIL}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b5e76d] text-[#173923]">
                  <MapPin size={20} />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-white/40">
                    Office
                  </div>

                  <div className="mt-1 font-bold">
                    Opposite Mohanpur Church,
                    <br />
                    Near Nehru Yuva Kendra,
                    <br />
                    Giridih, Jharkhand
                  </div>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-white p-2 shadow-2xl">
                <div className="relative overflow-hidden rounded-2xl">

                  <iframe
                    title="RGT Office Location on Google Maps"
                    src="https://www.google.com/maps?q=Opposite+Mohanpur+Church,+Near+Nehru+Yuva+Kendra,+Giridih,+Jharkhand&output=embed"
                    className="h-[300px] w-full border-0 sm:h-[340px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Opposite+Mohanpur+Church,+Near+Nehru+Yuva+Kendra,+Giridih,+Jharkhand"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-black text-[#173a29] shadow-lg"
                  >
                    <MapPin
                      size={16}
                      className="text-[#d92d2d]"
                    />

                    Open in Maps

                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white p-6 text-[#17231d] shadow-2xl sm:p-9"
          >
            <div className="mb-8">
              <div className="text-sm font-black uppercase tracking-[0.2em] text-[#26724e]">
                Enquiry Form
              </div>

              <h3 className="mt-2 text-3xl font-black text-[#173a29]">
                Request a Survey
              </h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Name *
                </label>

                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    updateForm("name", e.target.value)
                  }
                  placeholder="Your name"
                  className="w-full rounded-xl border border-black/10 bg-[#f8faf7] px-4 py-3.5 outline-none focus:border-[#26724e]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Phone *
                </label>

                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    updateForm("phone", e.target.value)
                  }
                  placeholder="Your phone number"
                  className="w-full rounded-xl border border-black/10 bg-[#f8faf7] px-4 py-3.5 outline-none focus:border-[#26724e]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateForm("email", e.target.value)
                  }
                  placeholder="Your email"
                  className="w-full rounded-xl border border-black/10 bg-[#f8faf7] px-4 py-3.5 outline-none focus:border-[#26724e]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Survey Requirement *
                </label>

                <select
                  required
                  value={form.requirement}
                  onChange={(e) =>
                    updateForm(
                      "requirement",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-black/10 bg-[#f8faf7] px-4 py-3.5 outline-none focus:border-[#26724e]"
                >
                  <option value="">Select service</option>
                  <option value="Mining Survey">Mining Survey</option>
                  <option value="Topographical Survey">
                    Topographical Survey
                  </option>
                  <option value="DGPS Survey">DGPS Survey</option>
                  <option value="Drone / UAV Survey">
                    Drone / UAV Survey
                  </option>
                  <option value="LiDAR Survey">LiDAR Survey</option>
                  <option value="Road / Alignment Survey">
                    Road / Alignment Survey
                  </option>
                  <option value="GIS Solutions">
                    GIS Solutions
                  </option>
                  <option value="Land / Cadastral Survey">
                    Land / Cadastral Survey
                  </option>
                  <option value="CAD / Drafting">
                    CAD / Drafting
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold">
                Project Location
              </label>

              <input
                value={form.location}
                onChange={(e) =>
                  updateForm("location", e.target.value)
                }
                placeholder="City / District / State"
                className="w-full rounded-xl border border-black/10 bg-[#f8faf7] px-4 py-3.5 outline-none focus:border-[#26724e]"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-bold">
                Project Details *
              </label>

              <textarea
                required
                value={form.details}
                onChange={(e) =>
                  updateForm("details", e.target.value)
                }
                placeholder="Tell us about the project, area, required survey, timeline, etc."
                rows={6}
                className="w-full resize-none rounded-xl border border-black/10 bg-[#f8faf7] px-4 py-3.5 outline-none focus:border-[#26724e]"
              />
            </div>

            {submitted && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
                Your enquiry has been sent successfully.
              </div>
            )}

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d704c] px-6 py-4 font-black text-white transition hover:bg-[#155a3c] disabled:opacity-60"
            >
              {sending ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending Enquiry...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Enquiry
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#082419] px-5 py-12 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">

          <div>
            <div className="flex items-center gap-3">
              <img
                src="/rgt-logo.png"
                alt="RGT"
                className="h-14 w-14 object-contain"
              />

              <div>
                <div className="font-black">
                  RAYYAN GEO TECH
                </div>

                <div className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Surveying Solution
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/50">
              Professional surveying, GIS, drone and geospatial solutions
              from Giridih, Jharkhand.
            </p>
          </div>

          <div>
            <div className="font-black">
              Contact
            </div>

            <div className="mt-5 space-y-3 text-sm text-white/55">
              <div className="flex gap-3">
                <MapPin size={17} />
                Giridih, Jharkhand
              </div>

              <div className="flex gap-3">
                <Phone size={17} />
                {PHONE}
              </div>

              <div className="flex gap-3">
                <Mail size={17} />
                {EMAIL}
              </div>
            </div>
          </div>

          <div>
            <div className="font-black">
              Explore
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/55">
              {mainNavigation.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="transition hover:text-[#b5e76d]"
                >
                  {label}
                </a>
              ))}

              {moreNavigation.slice(0, 7).map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="transition hover:text-[#b5e76d]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/35 sm:flex-row">
          <div>
            © {new Date().getFullYear()} Rayyan Geo Tech. All rights reserved.
          </div>

          <div>
            Surveying · GIS · Mining · Geospatial Solutions
          </div>
        </div>
      </footer>
    </main>
  );
}