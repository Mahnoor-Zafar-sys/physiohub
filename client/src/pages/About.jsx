import { motion, AnimatePresence, useInView as useMotionInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FiArrowRight, FiCheckCircle, FiChevronRight,
  FiMapPin, FiPhone, FiAward, FiShield, FiStar
} from "react-icons/fi";
import { FaAmbulance } from "react-icons/fa";

// ─── IMAGE BANK ───────────────────────────────────────────────────────────────
const IMAGES = {
  panel1:    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
  panel2:    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
  panel3:    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
  icu:       "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
  surgery:   "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=80",
  lab:       "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1400&q=80",
  pharmacy:  "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1400&q=80",
  lounge:    "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80",
  parking:   "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1400&q=80",
  mission:   "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
  vision:    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
  compassion:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
  innovation:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80",
  trust:     "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
  excellence:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80",
  ctaBg:     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=80",
  jci:       "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=90",
  award:     "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=900&q=90",
  iso:       "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=90",
};

// ─── STORY SLIDES DATA ────────────────────────────────────────────────────────
const storySlides = [
  {
    year: "2011",
    head: "Founded on conviction",
    body: "Established in 2011 by a small team of three specialists, our clinic was born from a single belief — that every patient in this city deserves world-class medical care delivered with genuine compassion.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
  },
  {
    year: "2018",
    head: "Grown without compromise",
    body: "From one operating theater, we expanded to six comprehensive departments — never once compromising on clinical excellence. Every investment was measured against patient outcomes.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    year: "Today",
    head: "Serving 50,000+ lives annually",
    body: "Today we serve over 50,000 patients every year. Our commitment to that founding promise has never wavered — only deepened, as our team, technology, and healing hands grow.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
  },
];

// ─── COUNTER HOOK ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const end = parseInt(target);
    if (isNaN(end)) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const slideLeft  = { hidden: { opacity: 0, x: -70 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } } };
const slideRight = { hidden: { opacity: 0, x:  70 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } } };
const fadeUp     = { hidden: { opacity: 0, y: 40  }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.13, ease: [0.25, 0.1, 0.25, 1] } }) };

// ─── SECTION HEADING ─────────────────────────────────────────────────────────
const SectionLabel = ({ label, heading }) => (
  <motion.div
    variants={fadeUp} initial="hidden" whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className="mb-16"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-6 h-px bg-blue-400" />
      <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase">{label}</span>
    </div>
    {heading && (
      <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
        {heading}
      </h2>
    )}
  </motion.div>
);

// ─── ALTERNATING ROW ─────────────────────────────────────────────────────────
const AlternatingRow = ({ img, imgAlt, children, reverse = false }) => {
  const ref = useRef(null);
  const inView = useMotionInView(ref, { once: true, amount: 0.2 });
  return (
    <div ref={ref} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
      <motion.div
        initial="hidden" animate={inView ? "visible" : "hidden"}
        variants={reverse ? slideRight : slideLeft}
        className={`overflow-hidden rounded-2xl shadow-lg ${reverse ? "[direction:ltr]" : ""}`}
      >
        <img src={img} alt={imgAlt} className="w-full h-72 lg:h-[360px] object-cover hover:scale-105 transition-transform duration-700" />
      </motion.div>
      <motion.div
        initial="hidden" animate={inView ? "visible" : "hidden"}
        variants={reverse ? slideLeft : slideRight}
        className={`space-y-5 ${reverse ? "[direction:ltr]" : ""}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ─── STAT ITEM ───────────────────────────────────────────────────────────────
const StatItem = ({ value, suffix, label, start }) => {
  const count = useCountUp(value, 2200, start);
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center space-y-2">
      <div className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
        {start ? count.toLocaleString() : "0"}{suffix}
      </div>
      <div className="w-6 h-0.5 bg-blue-400 mx-auto" />
      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{label}</div>
    </motion.div>
  );
};

// ─── MARQUEE COMPONENT ────────────────────────────────────────────────────────
const Marquee = ({ items, speed = 35 }) => {
  const track = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-5 w-max"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {track.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap"
            style={{
              background: i % 3 === 0
                ? "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)"
                : i % 3 === 1
                ? "rgba(59,130,246,0.08)"
                : "rgba(15,23,42,0.05)",
              color: i % 3 === 0 ? "#fff" : i % 3 === 1 ? "#1d4ed8" : "#475569",
              border: i % 3 === 0 ? "none" : `1px solid ${i % 3 === 1 ? "rgba(59,130,246,0.25)" : "rgba(15,23,42,0.1)"}`,
              letterSpacing: "0.04em",
              boxShadow: i % 3 === 0 ? "0 4px 14px rgba(59,130,246,0.35)" : "none",
            }}
          >
            {i % 3 === 0 && <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block flex-shrink-0" />}
            {i % 3 === 1 && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block flex-shrink-0" />}
            {i % 3 === 2 && (
              <span style={{
                display: "inline-block", width: "14px", height: "14px",
                background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M8 1l1.8 5.6H15l-4.6 3.4 1.7 5.5L8 12.1 3.9 15.5l1.7-5.5L1 6.6h5.2z' fill='%2394a3b8'/%3E%3C/svg%3E\") center/contain no-repeat",
                flexShrink: 0,
              }} />
            )}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── PARALLAX IMAGE ───────────────────────────────────────────────────────────
const ParallaxImage = ({ src, alt, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y }} className="w-full h-full object-cover scale-110" />
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function About() {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const statsInView = useMotionInView(statsRef, { once: true, amount: 0.3 });

  // activeIndex — Our Story slider
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % storySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const facilities = [
    { name: "Intensive Care Suite", short: "ICU", desc: "24/7 continuous monitoring with dedicated specialist teams. Every critical patient receives immediate, personalized attention in our fully equipped critical care environment.", features: ["24/7 Specialist Coverage", "Real-Time Monitoring", "Ventilator Support"], img: IMAGES.icu },
    { name: "Operation Theater",    short: "OT",  desc: "State-of-the-art sterile surgical suites designed to international safety standards. Laminar airflow systems and advanced intra-operative imaging ensure precision.", features: ["Laminar Airflow", "Advanced Intra-Op Imaging", "Sterile Architecture"], img: IMAGES.surgery },
    { name: "Diagnostic Laboratory",short: "LAB", desc: "Fully automated diagnostic lab delivering precise results with rapid turnaround. ISO-certified processes covering the complete diagnostic spectrum with same-day reporting.", features: ["Automated Analysis", "Same-Day Results", "ISO QA Certified"], img: IMAGES.lab },
    { name: "In-House Pharmacy",    short: "RX",  desc: "Round-the-clock pharmacy stocked with an extensive range of branded and generic medications. Accurate dispensing, cold-chain storage, and thorough patient counseling at every visit.", features: ["Open 24/7", "Prescription Verification", "Cold Chain Storage"], img: IMAGES.pharmacy },
    { name: "Patient Lounge",       short: "VIP", desc: "Thoughtfully designed comfort spaces with premium seating, ambient lighting, free Wi-Fi, and a dedicated concierge — creating a calm, reassuring atmosphere for patients and families.", features: ["Wi-Fi Enabled", "Dedicated Concierge", "Family Seating"], img: IMAGES.lounge },
    { name: "Secure Parking",       short: "PKG", desc: "Covered multi-level parking with dedicated zones for patients, visitors, and emergency vehicles. CCTV-monitored and fully accessible — free of charge for all patients.", features: ["CCTV Monitored 24/7", "Accessible Bays", "Emergency Priority Lane"], img: IMAGES.parking },
  ];

  const coreValues = [
    { name: "Compassion", desc: "Every patient interaction is guided by genuine empathy. We listen, we care, and we treat each person as family — trained not just in medicine, but in humanity.", img: IMAGES.compassion },
    { name: "Innovation", desc: "Continuously investing in the latest medical technologies, digital platforms, and clinical protocols — from AI diagnostics to robotic-assisted procedures.", img: IMAGES.innovation },
    { name: "Trust",      desc: "Transparent communication, ethical practices, and consistent outcomes have made us the most referred clinic in the region. We simply deliver, reliably, every time.", img: IMAGES.trust },
    { name: "Excellence", desc: "From clinical outcomes to patient experience, every aspect of our practice is held to the highest possible standard. Protocols reviewed quarterly by internationally trained specialists.", img: IMAGES.excellence },
  ];

  const stats = [
    { value: "50000", suffix: "+", label: "Patients Served" },
    { value: "98",    suffix: "%", label: "Satisfaction Rate" },
    { value: "25",    suffix: "+", label: "Specialists" },
    { value: "13",    suffix: "+", label: "Years of Excellence" },
  ];

  const certifications = [
    {
      img: IMAGES.jci,
      category: "Accreditation",
      title: "JCI International Standard",
      desc: "Clinical procedures and patient safety protocols fully aligned with Joint Commission International benchmarks — the gold standard of global healthcare accreditation.",
      badge: "Certified 2023",
      icon: <FiShield size={18} className="text-blue-500" />,
    },
    {
      img: IMAGES.award,
      category: "National Recognition",
      title: "Best Patient Care Award",
      desc: "Honoured by the National Healthcare Excellence Council for outstanding patient satisfaction scores and clinical quality indicators over three consecutive years.",
      badge: "2021 · 2022 · 2023",
      icon: <FiAward size={18} className="text-blue-500" />,
    },
    {
      img: IMAGES.iso,
      category: "Data Security",
      title: "ISO 27001 Compliant",
      desc: "Patient data protected under internationally certified information security management systems. Every record is encrypted, backed up, and accessible only by authorised personnel.",
      badge: "ISO 27001:2022",
      icon: <FiStar size={18} className="text-blue-500" />,
    },
  ];

  const marqueeItems = [
    "50,000+ Patients Served",
    "25+ Specialist Doctors",
    "24/7 Emergency Care",
    "ISO Certified Laboratory",
    "JCI Aligned Protocols",
    "13 Years of Excellence",
    "6 Core Departments",
    "Digital Patient Records",
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes shine {
          0%   { left: -100%; opacity: 0; }
          15%  { opacity: 0.55; }
          30%  { left: 100%; opacity: 0; }
          100% { left: 100%; opacity: 0; }
        }
        .glitter-container { position: relative; overflow: hidden; }
        .glitter-shine {
          position: absolute; top: 0; width: 50%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          animation: shine 3.5s infinite ease-in-out;
          pointer-events: none;
        }
        .glitter-p1 { animation-delay: 0s; }
        .glitter-p2 { animation-delay: 1.2s; }
        .glitter-p3 { animation-delay: 2.4s; }
        .cert-card:hover .cert-img { transform: scale(1.06); }
        .cert-img { transition: transform 0.6s ease; }
      `}</style>
{/* ══ HERO SECTION WITH BACK TO HOME BUTTON & PURE SMOOTH MOTION PANELS ══════════════════════════════════════════ */}
<section className="pt-40 pb-24 px-6 lg:px-16 max-w-7xl mx-auto relative overflow-hidden select-none">

  <div className="grid lg:grid-cols-12 gap-12 items-center">
    
    {/* LEFT SIDE TEXT BLOCK */}
    <motion.div
      initial={{ opacity: 0, x: -60 }} 
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="lg:col-span-6 text-left space-y-6 z-10"
    >
      <div className="space-y-1">
        <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-slate-950 leading-none">ABOUT</h1>
        <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-blue-600 leading-none">OUR CLINIC</h2>
      </div>
      <p className="text-slate-500 text-base max-w-lg font-normal leading-relaxed pt-4 border-t border-slate-100">
        For over 13 years, we have built a legacy of professional medical care in Karachi — through world-class specialists, modern infrastructure, and a genuinely patient-first culture.
      </p>
      <div className="flex gap-3 flex-wrap pt-2">
        <button onClick={() => navigate("/book-appointment")} className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200">
          Book Appointment <FiArrowRight size={14} />
        </button>
        <button onClick={() => navigate("/doctors")} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all">
          Meet Our Doctors
        </button>
      </div>
    </motion.div>

    {/* RIGHT SIDE: PURE FRAMER-MOTION SMOOTH FLOATING REEL PANELS */}
    <div className="lg:col-span-6 grid grid-cols-3 gap-4 h-[440px] lg:h-[520px] w-full items-stretch relative">
      {[
        { 
          src: IMAGES.panel1, 
          cls: "origin-bottom", 
          label: "Advanced Lab",
          floatRange: [0, -12, 0], // Smooth Baseline floating range
          duration: 5
        },
        { 
          src: IMAGES.panel2, 
          cls: "lg:-translate-y-6 shadow-2xl z-10 scale-[1.01] origin-center", // Correctly positioned center upper card
          label: "Expert Specialists",
          floatRange: [-24, -36, -24], // Offset floating coordinate calculation to keep it upper safely
          duration: 5.5
        },
        { 
          src: IMAGES.panel3, 
          cls: "origin-bottom", 
          label: "Premium Lounge",
          floatRange: [0, -12, 0], // Smooth Baseline floating range
          duration: 6
        },
      ].map(({ src, cls, label, floatRange, duration }, i) => (
        <motion.div
          key={i}
          // Initial entrance positioning animation
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          whileInView={{ opacity: 1, y: floatRange[0], scale: 1 }}
          viewport={{ once: true }}
          // Entrance smooth transition setting
          transition={{ duration: 0.85, delay: i * 0.12, ease: "easeOut" }}
          // Pure Framer Motion infinite loop logic for seamless floating
          animate={{
            y: floatRange
          }}
          className={`relative rounded-3xl border border-slate-200/60 overflow-hidden group bg-slate-100 ${cls}`}
          style={{
            // Internal image container scale effect setting
            transition: "box-shadow 0.4s ease, border-color 0.4s ease"
          }}
        >
          {/* Hardware accelerated image layout component */}
          <img 
            src={src} 
            alt={label} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out brightness-[0.94] saturate-[0.95] group-hover:scale-110 group-hover:brightness-[0.82]" 
          />
          
          {/* Immersive cinematic dark mask on target mouse entry */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

          {/* Title tag label trigger overlay popup */}
          <div className="absolute bottom-4 inset-x-2 text-center opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 pointer-events-none z-20">
            <span className="inline-block bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-xl border border-slate-100 shadow-xl tracking-wider uppercase">
              {label}
            </span>
          </div>

          {/* Shimmer light reflect strip layout */}
          <div className={`glitter-shine glitter-p${i + 1} pointer-events-none opacity-40`} />
        </motion.div>
      ))}
    </div>

  </div>
</section>
      {/* ══ MARQUEE STRIP ═════════════════════════════════════════════════════ */}
      <div className="py-5 border-y border-slate-100 bg-white overflow-hidden">
        <Marquee items={marqueeItems} speed={40} />
      </div>

      {/* ══ OUR STORY ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-16 overflow-hidden relative select-none" style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #eff6ff 100%)"
      }}>
        <div className="absolute inset-0 opacity-[0.2]" style={{
          backgroundImage: "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "56px 56px"
        }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16 md:mb-20 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-6 h-px bg-blue-600/50" />
              <span className="text-[11px] font-bold text-blue-600 tracking-[0.3em] uppercase">Our Journey</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              A promise made in 2011.<br />
              <span className="text-[#2165f4]">Kept every single day.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">

            {/* LEFT: Video-Frame Player */}
            <div className="lg:col-span-6 xl:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-2xl bg-slate-950 aspect-[16/10]"
              >
                {/* Top bar */}
                <div className="absolute top-0 inset-x-0 h-10 bg-slate-900/60 backdrop-blur-md z-20 px-4 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
                    Chronological Reel • LIVE
                  </div>
                </div>

                {/* Crossfade image */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={storySlides[activeIndex].image}
                    alt="Medical history scene"
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover opacity-85"
                  />
                </AnimatePresence>

                {/* Progress bar */}
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-slate-800 z-20">
                  <motion.div
                    key={activeIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-[#2165f4]"
                  />
                </div>
              </motion.div>

              {/* Float badge */}
              <div className="absolute -bottom-6 -right-4 bg-white border border-slate-100 shadow-xl rounded-2xl px-6 py-4 items-center gap-4 z-20 hidden sm:flex">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-xl">🏥</div>
                <div>
                  <div className="text-xl font-black text-slate-900 leading-none">13+ Years</div>
                  <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">Of Unmatched Excellence</div>
                </div>
              </div>
            </div>

            {/* RIGHT: Info Panel */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4">
              {storySlides.map((slide, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-white border-blue-200 shadow-md translate-x-2"
                        : "bg-transparent border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-sm font-black px-3 py-1 rounded-full transition-colors duration-300 flex-shrink-0 ${
                        isSelected ? "bg-[#2165f4] text-white" : "bg-slate-200 text-slate-600"
                      }`}>
                        {slide.year}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold tracking-tight mb-1 transition-colors ${
                          isSelected ? "text-slate-900" : "text-slate-700"
                        }`}>
                          {slide.head}
                        </h3>
                        <div className={`transition-all duration-500 overflow-hidden ${
                          isSelected ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                        }`}>
                          <p className="text-slate-600 text-[14px] leading-relaxed font-medium">
                            {slide.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ══ MISSION & VISION ══════════════════════════════════════════════════ */}
      <section className="py-28 bg-white border-y border-slate-100 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="Who We Are" heading="Mission & Vision" />
          <div className="space-y-24">
            <AlternatingRow img={IMAGES.mission} imgAlt="Our Mission" reverse={false}>
              <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase">Our Mission</span>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Healthcare that heals<br />the whole person
              </h3>
              <div className="w-8 h-0.5 bg-blue-200" />
              <p className="text-slate-500 leading-relaxed text-[15px]">
                To provide every patient with healthcare that is not only medically excellent but genuinely compassionate — transparent care, advanced clinical protocols, and a patient experience that restores confidence in modern medicine.
              </p>
              <ul className="space-y-2 pt-1">
                {["Transparent, informed consent at every step", "Collaborative multi-specialist care teams", "Patient feedback integrated into clinical improvement"].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <FiCheckCircle className="text-blue-500 flex-shrink-0" size={14} /> {f}
                  </li>
                ))}
              </ul>
            </AlternatingRow>

            <AlternatingRow img={IMAGES.vision} imgAlt="Our Vision" reverse={true}>
              <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase">Our Vision</span>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                The standard others<br />aspire to reach
              </h3>
              <div className="w-8 h-0.5 bg-blue-200" />
              <p className="text-slate-500 leading-relaxed text-[15px]">
                To be recognised as the region's most trusted healthcare institution — where world-class medical expertise meets genuine human care. Every patient leaves healthier, better informed, and fully reassured.
              </p>
              <ul className="space-y-2 pt-1">
                {["AI-assisted diagnostics & symptom checking", "Digital patient portal & e-prescriptions", "Regional centre of excellence by 2027"].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <FiCheckCircle className="text-blue-500 flex-shrink-0" size={14} /> {f}
                  </li>
                ))}
              </ul>
            </AlternatingRow>
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-16 bg-[#f8f9fb]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="What We Stand For" heading="Core Values" />
          <div className="space-y-24">
            {coreValues.map((val, i) => (
              <AlternatingRow key={val.name} img={val.img} imgAlt={val.name} reverse={i % 2 === 1}>
                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{val.name}</h3>
                <div className="w-8 h-0.5 bg-blue-200" />
                <p className="text-slate-500 leading-relaxed text-[15px] max-w-md">{val.desc}</p>
              </AlternatingRow>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PHILOSOPHY BANNER ════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-16 overflow-hidden relative" style={{
        background: "linear-gradient(135deg, #f1f5f9 0%, #e0f2fe 35%, #fae8ff 75%, #f1f5f9 100%)"
      }}>
        <div className="absolute inset-0 opacity-[0.25]" style={{
          backgroundImage: `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none opacity-40 filter blur-[100px]"
          style={{ background: "radial-gradient(circle, #f472b6 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[450px] rounded-full pointer-events-none opacity-40 filter blur-[100px]"
          style={{ background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }} />

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center space-y-8"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-px bg-blue-600/40" />
              <span className="text-[11px] font-bold text-blue-700 tracking-[0.3em] uppercase">Our Philosophy</span>
              <div className="w-6 h-px bg-blue-600/40" />
            </div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-tight">
              <span className="text-slate-900">Technology supports care.</span>
              <br />
              <span className="text-[#1e40af]">People deliver healing.</span>
            </h2>
            <div className="flex justify-center">
              <div className="w-12 h-px bg-slate-400/60" />
            </div>
            <p className="text-slate-700 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-semibold">
              Our digital tools exist to free our clinicians to focus on what matters most — your health, your comfort, your complete recovery. Medicine is a relationship, not a transaction.
            </p>
            <div className="grid sm:grid-cols-3 gap-5 pt-6">
              {[
                { icon: "🩺", label: "Patient First", sub: "Every decision centers the patient's wellbeing, dignity, and comfort." },
                { icon: "⚡", label: "Precision Tech", sub: "Advanced tools amplify what our specialists can achieve — not replace them." },
                { icon: "🤝", label: "Human Touch", sub: "Warmth and genuine connection are as vital as clinical accuracy." },
              ].map(({ icon, label, sub }) => (
                <motion.div
                  key={label}
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="rounded-2xl border border-slate-300/70 p-6 text-left hover:border-blue-600 hover:shadow-xl transition-all duration-300"
                  style={{ background: "#ffffff", boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)" }}
                >
                  <div className="text-3xl mb-4 bg-slate-100 w-12 h-12 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
                    {icon}
                  </div>
                  <p className="text-slate-900 text-base font-extrabold tracking-tight mb-2">{label}</p>
                  <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-medium">{sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ CERTIFICATIONS ════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white border-y border-slate-100 px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="Credentials" heading="Verified Trust" />
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
                viewport={{ once: true, amount: 0.2 }}
                className="cert-card group rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-400 bg-white"
              >
                <div className="overflow-hidden h-48">
                  <img src={item.img} alt={item.title} className="cert-img w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">{item.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-semibold">{item.badge}</span>
                    <FiCheckCircle className="text-blue-400" size={15} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" custom={1}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 p-7 bg-blue-50/60 rounded-2xl border border-blue-100"
          >
            <p className="text-[10px] font-bold text-blue-500 tracking-[0.25em] uppercase mb-5">Professional Memberships</p>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600 font-medium">
              {[
                "Pakistan Medical & Dental Council (PMDC)",
                "Pakistan Society of Internal Medicine (PSIM)",
                "World Health Organization Partner Network",
              ].map(m => (
                <div key={m} className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={13} />
                  {m}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FACILITIES ════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-16 bg-[#f8f9fb]">
        <div className="max-w-6xl mx-auto">
          <SectionLabel label="Our Infrastructure" heading="World-Class Facilities" />
          <div className="space-y-28">
            {facilities.map((f, i) => (
              <AlternatingRow key={f.name} img={f.img} imgAlt={f.name} reverse={i % 2 === 1}>
                <span className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase">{f.short}</span>
                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{f.name}</h3>
                <div className="w-8 h-0.5 bg-blue-200" />
                <p className="text-slate-500 leading-relaxed text-[15px]">{f.desc}</p>
                <ul className="space-y-2 pt-2">
                  {f.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-slate-600">
                      <FiCheckCircle className="text-blue-500 flex-shrink-0" size={13} /> {feat}
                    </li>
                  ))}
                </ul>
              </AlternatingRow>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATISTICS ════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="py-20 bg-white border-y border-slate-100 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {stats.map(s => (
              <StatItem key={s.label} {...s} start={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-36 px-6">
        <ParallaxImage src={IMAGES.ctaBg} alt="Book Appointment" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <span className="text-[10px] font-bold text-blue-600 tracking-[0.3em] uppercase block mb-4">Get Started</span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Ready to experience<br />modern healthcare?
            </h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
              Our specialists are available to guide you from first consultation to complete recovery. Book online, WhatsApp us, or walk in — we are always here.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" custom={1}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
          >
            <button onClick={() => navigate("/book-appointment")} className="px-7 py-3.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center shadow-lg shadow-blue-200">
              Book Appointment <FiArrowRight size={15} />
            </button>
            <button onClick={() => navigate("/online-consultation")} className="px-7 py-3.5 bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-2 justify-center">
              Online Consultation <FiChevronRight size={15} />
            </button>
            <button onClick={() => navigate("/doctors")} className="px-7 py-3.5 bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-100 hover:border-slate-300 transition-all flex items-center gap-2 justify-center">
              Meet Our Doctors <FiChevronRight size={15} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER CONTACT BAR ════════════════════════════════════════════════ */}
      <section className="py-10 border-t border-blue-50 bg-slate-50/50 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-center gap-8 text-xs font-semibold text-slate-500">
          <div className="flex items-center justify-center gap-2">
            <FiMapPin className="text-blue-500" />
            <span>Phase 6, DHA, Karachi, PK</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FiPhone className="text-blue-500" />
            <span>+92 21 111 254 642</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaAmbulance className="text-blue-500" />
            <span>Emergency Hotline Active</span>
          </div>
        </div>
      </section>
    </div>
  );
}



