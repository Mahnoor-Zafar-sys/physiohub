import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import SEOHead from "../components/SEOHead";
import { api } from "../services/api";
import { FiAward, FiShield, FiStar } from "react-icons/fi";
import { LuZap, LuHandshake } from "react-icons/lu";

// ─── IMAGE BANK ───────────────────────────────────────────────────────────────
const IMAGES = {
  panel1:    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
  panel2:    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  panel3:    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  jci:       "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=90",
  award:     "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=900&q=90",
  iso:       "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=90",
};

const SectionHeading = ({ title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
    {subtitle && <span className="text-blue-600 text-xs font-black tracking-widest uppercase mb-1 block">{subtitle}</span>}
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">{title}</h2>
    <div className="w-10 h-1 bg-blue-600 rounded-full mx-auto mt-2.5" />
  </div>
);

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (!isInView) return;
    const end = parseInt(target, 10);
    if (isNaN(end)) return;
    
    let start = 0;
    const duration = 1800; // 1.8 seconds smooth count up
    const steps = 45;
    const increment = end / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const [ceoActiveTab, setCeoActiveTab] = useState("vision");
  const [settings, setSettings] = useState(() => {
    const local = localStorage.getItem("pc_settings");
    return local ? JSON.parse(local) : {};
  });

  useEffect(() => {
    api.getSettings().then(res => {
      if (res) setSettings(res);
    });
  }, []);

  const coreValues = [
    { 
      name: "Compassion", 
      desc: "Every interaction is guided by genuine empathy. We listen, care, and treat each patient like family.", 
      icon: LuHandshake,
      cardStyle: "bg-gradient-to-br from-rose-50 via-pink-50/80 to-rose-100/90 border border-rose-200/90 shadow-sm hover:shadow-xl hover:border-rose-400 hover:scale-[1.02]",
      iconStyle: "bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20",
      titleStyle: "text-rose-950 font-black"
    },
    { 
      name: "Innovation", 
      desc: "Investing in advanced medical technology and evidence-based rehabilitation protocols.", 
      icon: LuZap,
      cardStyle: "bg-gradient-to-br from-sky-50 via-blue-50/80 to-cyan-100/90 border border-blue-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 hover:scale-[1.02]",
      iconStyle: "bg-gradient-to-tr from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/20",
      titleStyle: "text-blue-950 font-black"
    },
    { 
      name: "Trust", 
      desc: "Transparent communication, ethical practice, and reliable clinical outcomes.", 
      icon: FiShield,
      cardStyle: "bg-gradient-to-br from-violet-50 via-purple-50/80 to-purple-100/90 border border-purple-200/90 shadow-sm hover:shadow-xl hover:border-purple-400 hover:scale-[1.02]",
      iconStyle: "bg-gradient-to-tr from-violet-500 to-purple-500 text-white shadow-md shadow-purple-500/20",
      titleStyle: "text-purple-950 font-black"
    },
    { 
      name: "Excellence", 
      desc: "International treatment standards reviewed quarterly by experienced specialists.", 
      icon: FiAward,
      cardStyle: "bg-gradient-to-br from-emerald-50 via-teal-50/80 to-teal-100/90 border border-teal-200/90 shadow-sm hover:shadow-xl hover:border-teal-400 hover:scale-[1.02]",
      iconStyle: "bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-md shadow-teal-500/20",
      titleStyle: "text-teal-950 font-black"
    },
  ];

  const certifications = [
    { img: IMAGES.jci, title: "JCI International Standard", desc: "Clinical procedures aligned with global Joint Commission International benchmarks.", badge: "Certified 2023", icon: <FiShield size={15} className="text-blue-500" /> },
    { img: IMAGES.award, title: "Best Patient Care Award", desc: "Honoured by National Healthcare Excellence Council for clinical quality.", badge: "2021-2023", icon: <FiAward size={15} className="text-blue-500" /> },
    { img: IMAGES.iso, title: "ISO 27001 Compliant", desc: "Patient medical data protected under certified information security standards.", badge: "ISO 27001:2022", icon: <FiStar size={15} className="text-blue-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-800 antialiased font-sans pb-16">
      <SEOHead 
        title="About Vital Physio Hub | Leading Physical Therapy & Rehabilitation Center"
        description="Learn about Vital Physio Hub's physical therapy facilities, JCI-aligned protocols, and top rehabilitation specialists."
        keywords="about physiohub, rehabilitation center, physical therapy clinic"
        canonicalUrl="https://physiohub.com/about"
      />
      <Navbar />

      {/* ══ HERO SECTION ══════════════════════════════════════════════════════ */}
      <section className="pt-24 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto select-none">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }} 
            className="lg:col-span-6 text-left space-y-3 sm:space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
              About <span className="text-blue-600">Vital Physio Hub</span>
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl font-normal pt-2 border-t border-slate-200/70">
              {settings.about_description || "Building a legacy of professional physical therapy & rehabilitation through evidence-based practice, modern facilities, and a patient-first culture."}
            </p>
          </motion.div>

          <div className="lg:col-span-6 grid grid-cols-3 gap-2 sm:gap-3 h-[180px] sm:h-[260px] lg:h-[320px] w-full items-stretch relative">
            {[
              { src: IMAGES.panel1, label: "Advanced Lab" },
              { src: IMAGES.panel2, label: "Expert Specialists" },
              { src: IMAGES.panel3, label: "Premium Lounge" },
            ].map(({ src, label }, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: i * 0.1 }} 
                className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/80 shadow-sm"
              >
                <img src={src} alt={label} className="w-full h-full object-cover" />
                <div className="absolute bottom-2 inset-x-1 text-center">
                  <span className="inline-block bg-white/95 backdrop-blur-sm text-slate-900 text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase">{label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* ══ CEO PROFILE SECTION ══════════════════════════════════════════════ */}
<section className="py-10 sm:py-16 bg-white border-y border-slate-200/60 px-4 sm:px-6 lg:px-12 select-none">
  <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-6 sm:gap-10 items-center">
    <div className="lg:col-span-5 flex justify-center">
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[4/4.2] sm:aspect-[4/5] bg-slate-100 max-w-[260px] xs:max-w-[300px] sm:max-w-none w-full">
        <img
          src="/dr-ghulam-jellani.jpg"
          alt="Dr. Ghulam Jellani"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h4 className="text-white text-sm sm:text-base font-extrabold">
              Dr. Ghulam Jellani, PT
            </h4>
            <p className="text-blue-300 text-[10px] font-semibold uppercase mt-0.5">
              Founder & CEO
            </p>
          </div>
          <span className="px-2.5 py-1 bg-blue-600 text-white text-[9px] font-black uppercase rounded-lg">
            Leadership
          </span>
        </div>
      </div>
    </div>

    <div className="lg:col-span-7 text-left space-y-4">
      <div>
        <span className="text-blue-600 text-xs font-black uppercase tracking-widest block mb-1">
          Founder Message
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
          Dr. Ghulam Jellani, PT
        </h2>

        <p className="text-slate-500 text-xs font-bold uppercase mt-0.5">
          Founder & Chief Executive Officer, VPH
        </p>
      </div>

      <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto scrollbar-none w-full pb-1">
        {[
          { id: "vision", label: "CEO Vision" },
          { id: "background", label: "Credentials" },
          { id: "journey", label: "Journey" },
          { id: "expertise", label: "Expertise" }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setCeoActiveTab(tab.id)}
            className={`pb-1.5 text-[10px] sm:text-xs font-extrabold uppercase transition-all bg-transparent border-none cursor-pointer whitespace-nowrap ${
              ceoActiveTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[160px] flex flex-col justify-center">

        {ceoActiveTab === "vision" && (
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 italic">
              "{settings.about_ceo_vision || "My dream is to create a platform that inspires trust, promotes evidence-based physiotherapy, and positively impacts lives globally."}"
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              At Vital Physio Hub, our vision is to establish a trusted healthcare platform that transforms how people access physical rehabilitation services and evidence-based health education.
            </p>
          </div>
        )}

        {ceoActiveTab === "background" && (
          <div className="space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Education & Training
            </h4>

            {[
              {
                title: "Physical Therapist (PT)",
                inst: "Iqra University, Islamabad"
              },
              {
                title: "Clinical Hospital-based Rotations",
                inst: "Academic Placements"
              }
            ].map((edu, i) => (
              <div
                key={i}
                className="flex gap-2 items-center text-xs font-semibold text-slate-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                {edu.title} —{" "}
                <span className="text-slate-400">{edu.inst}</span>
              </div>
            ))}
          </div>
        )}

        {ceoActiveTab === "journey" && (
          <div className="space-y-2 text-xs text-slate-600">
            <p>
              <strong className="text-slate-800">
                Founder & CEO:
              </strong>{" "}
              Vital Physio Hub — Global digital & clinical rehab platform.
            </p>

            <p>
              <strong className="text-slate-800">
                Clinical Physiotherapist:
              </strong>{" "}
              Specialized in manual therapy & musculoskeletal recovery.
            </p>
          </div>
        )}

        {ceoActiveTab === "expertise" && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              {
                t: "Musculoskeletal Rehab",
                v: "Expert"
              },
              {
                t: "Orthopedic Care",
                v: "Specialist"
              },
              {
                t: "Neurological Recovery",
                v: "PT Focus"
              },
              {
                t: "Manual Therapy",
                v: "Practitioner"
              }
            ].map((exp, i) => (
              <div
                key={i}
                className="p-2 bg-slate-50 border border-slate-200/60 rounded-lg"
              >
                <div className="font-bold text-slate-800">
                  {exp.t}
                </div>

                <div className="text-[10px] text-blue-600 font-bold">
                  {exp.v}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  </div>
</section>

      {/* ══ CORE VALUES (Colorful Cards) ════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-16 bg-white border-y border-slate-200/60 px-4 sm:px-6 lg:px-12 select-none">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Core Values" subtitle="What Guides Us" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div 
                  key={val.name} 
                  className={`p-6 rounded-2xl border text-left space-y-3 transition-all duration-300 transform hover:-translate-y-1 shadow-sm ${val.cardStyle}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${val.iconStyle}`}>
                    <Icon size={22} />
                  </div>
                  <h4 className={`text-lg font-extrabold ${val.titleStyle}`}>{val.name}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-12 select-none">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Verified Standards" subtitle="Credentials & Trust" />
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-200/70 bg-white text-left shadow-sm">
                <div className="h-36 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase">
                    {item.icon} {item.badge}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CLOSING PROFESSIONAL BAR (Hyphen Removed & Animated Counter) ════════════════════════════ */}
      <section className="bg-[#0f172a] py-8 sm:py-10 px-4 sm:px-6 lg:px-12 select-none mt-0">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
          <p className="text-white text-sm sm:text-base font-semibold text-center sm:text-left leading-snug max-w-xl">
            Trusted by thousands of patients delivering premier physiotherapy with compassion, precision, and purpose.
          </p>
          <div className="flex items-center gap-6 sm:gap-10 shrink-0">
            {[
              { target: "50", suffix: "K+", label: "Patients" }, 
              { target: "98", suffix: "%", label: "Satisfaction" }, 
              { target: "13", suffix: "+", label: "Years" }
            ].map(({ target, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="text-white font-black text-xl sm:text-2xl leading-none">
                  <AnimatedCounter target={target} suffix={suffix} />
                </div>
                <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
