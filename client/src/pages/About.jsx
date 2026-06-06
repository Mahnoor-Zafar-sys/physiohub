import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView as useMotionInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiCheckCircle, FiChevronRight, FiMapPin, FiPhone, FiAward, FiShield, FiStar, FiPlus } from "react-icons/fi";
import { FaAmbulance } from "react-icons/fa";
import Navbar from "../components/Navbar";

// ─── IMAGES ──────────────────────────────────────────────────────────────────
const IMG = {
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
  historyBg: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1600&q=80",
  jci:       "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=90",
  award:     "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=900&q=90",
  iso:       "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=90",
};

// ─── COUNTER HOOK ─────────────────────────────────────────────────────────────
function useCountUp(target, duration = 2200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const end = parseInt(target);
    if (isNaN(end)) return;
    let t0 = null;
    const step = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ─── SPLIT REVEAL ─────────────────────────────────────────────────────────────
const fromLeft  = { hidden:{ opacity:0, x:-60 }, visible:{ opacity:1, x:0, transition:{ duration:0.8, ease:[0.22,1,0.36,1] } } };
const fromRight = { hidden:{ opacity:0, x: 60 }, visible:{ opacity:1, x:0, transition:{ duration:0.8, ease:[0.22,1,0.36,1] } } };
const fromBelow = { hidden:{ opacity:0, y: 50 }, visible:(i=0)=>({ opacity:1, y:0, transition:{ duration:0.75, delay:i*0.12, ease:[0.22,1,0.36,1] } }) };

// ─── ALTERNATING ROW (scroll-triggered split animation) ──────────────────────
function SplitRow({ img, imgAlt, children, flip = false }) {
  const ref = useRef(null);
  const inView = useMotionInView(ref, { once: true, amount: 0.15 });
  return (
    <div ref={ref} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? "lg:[direction:rtl]" : ""}`}>
      <motion.div
        variants={flip ? fromRight : fromLeft}
        initial="hidden" animate={inView ? "visible" : "hidden"}
        className={`overflow-hidden rounded-3xl ${flip ? "[direction:ltr]" : ""}`}
      >
        <img src={img} alt={imgAlt} className="w-full h-[300px] lg:h-[380px] object-cover hover:scale-[1.04] transition-transform duration-700 ease-out" />
      </motion.div>
      <motion.div
        variants={flip ? fromLeft : fromRight}
        initial="hidden" animate={inView ? "visible" : "hidden"}
        className={`space-y-5 ${flip ? "[direction:ltr]" : ""}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── FLIP CARD ────────────────────────────────────────────────────────────────
function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="relative h-72 cursor-pointer group"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-all duration-700"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <img src={front.img} alt={front.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 space-y-1">
            <p className="text-[10px] font-bold tracking-[0.2em] text-blue-500 uppercase">{front.tag}</p>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{front.title}</h3>
            <p className="text-xs text-slate-400 font-medium">{front.hint}</p>
          </div>
        </div>
        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl bg-white border border-slate-100 p-7 flex flex-col justify-center space-y-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-8 h-[2px] bg-blue-500" />
          <h3 className="text-lg font-bold text-slate-900">{back.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{back.desc}</p>
          <ul className="space-y-1.5">
            {back.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-xs text-slate-600">
                <FiCheckCircle className="text-blue-500 flex-shrink-0" size={12} /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── PARALLAX IMAGE ───────────────────────────────────────────────────────────
function ParallaxImg({ src, alt, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y }} className="w-full h-[115%] object-cover scale-105" />
    </div>
  );
}

// ─── ORBITING DOTS (decorative) ───────────────────────────────────────────────
function OrbitRing({ size = 200, duration = 8, dotCount = 4, color = "#3b82f6" }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full border border-blue-100"
        style={{ borderStyle: "dashed" }}
      />
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (360 / dotCount) * i;
        const delay = -(duration / dotCount) * i;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ width: size, height: size, top: 0, left: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: color,
                top: "50%",
                left: "50%",
                transformOrigin: `0 0`,
                transform: `rotate(${angle}deg) translateX(${size / 2}px) translateY(-50%)`,
                opacity: 0.7,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── STAT ITEM ───────────────────────────────────────────────────────────────
function StatItem({ value, suffix, label, start }) {
  const n = useCountUp(value, 2200, start);
  return (
    <motion.div variants={fromBelow} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
      <div className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight tabular-nums">
        {start ? n.toLocaleString() : "0"}{suffix}
      </div>
      <div className="w-5 h-[1.5px] bg-blue-400 mx-auto my-3" />
      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

// ─── SECTION EYEBROW ─────────────────────────────────────────────────────────
const Eye = ({ children }) => (
  <p className="text-[10px] font-bold text-blue-500 tracking-[0.25em] uppercase mb-4">{children}</p>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function About({ onNavigate, onBookAppointment }) {
  const statsRef   = useRef(null);
  const statsInView = useMotionInView(statsRef, { once: true, amount: 0.3 });

  const facilities = [
    { name: "Intensive Care Suite", tag: "ICU",
      hint: "Hover to explore →",
      desc: "24/7 monitoring with dedicated specialists. Every critical patient receives immediate, personalised attention with the latest life-support technology.",
      features: ["24/7 Specialist Coverage", "Real-Time Monitoring", "Ventilator Support"],
      img: IMG.icu },
    { name: "Operation Theater", tag: "OT",
      hint: "Hover to explore →",
      desc: "State-of-the-art sterile surgical suites designed to international standards. Laminar airflow and advanced imaging ensure every procedure meets the highest benchmarks.",
      features: ["Laminar Airflow", "Advanced Intra-Op Imaging", "Sterile Architecture"],
      img: IMG.surgery },
    { name: "Diagnostic Laboratory", tag: "LAB",
      hint: "Hover to explore →",
      desc: "Fully automated lab delivering precise results with rapid turnaround. From hematology to microbiology — same-day results, ISO-certified.",
      features: ["Automated Analysis", "Same-Day Results", "ISO QA Certified"],
      img: IMG.lab },
    { name: "In-House Pharmacy", tag: "RX",
      hint: "Hover to explore →",
      desc: "Round-the-clock pharmacy stocked with branded and generic medications. Accurate dispensing, cold-chain storage, and thorough patient counselling.",
      features: ["Open 24/7", "Prescription Verification", "Cold Chain Storage"],
      img: IMG.pharmacy },
    { name: "Patient Lounge", tag: "VIP",
      hint: "Hover to explore →",
      desc: "Thoughtfully designed spaces that respect your time. Premium seating, ambient lighting, free Wi-Fi, and a dedicated concierge.",
      features: ["Wi-Fi Enabled", "Dedicated Concierge", "Family Seating"],
      img: IMG.lounge },
    { name: "Secure Parking", tag: "PKG",
      hint: "Hover to explore →",
      desc: "Covered multi-level parking. CCTV-monitored around the clock, accessible for all mobility requirements, with emergency priority lanes.",
      features: ["CCTV 24/7", "Accessible Bays", "Emergency Priority Lane"],
      img: IMG.parking },
  ];

  const values = [
    { name: "Compassion", desc: "Every patient interaction is guided by genuine empathy. We treat each person as family — not a case number. Our team is trained not just in medicine, but in humanity.", img: IMG.compassion },
    { name: "Innovation", desc: "We invest continuously in medical technologies and digital platforms — from AI diagnostics to robotic-assisted procedures — keeping our patients at the global frontier.", img: IMG.innovation },
    { name: "Trust",      desc: "Transparent communication and consistent outcomes have made us the most referred clinic in the region. We never overpromise — we simply deliver, reliably, every time.", img: IMG.trust },
    { name: "Excellence", desc: "From clinical outcomes to patient experience, we hold every aspect to the highest possible standard. Specialists trained internationally. Protocols reviewed quarterly.", img: IMG.excellence },
  ];

  const certs = [
    { img: IMG.jci,   tag: "Accreditation",      title: "JCI International Standard",   desc: "Clinical procedures and patient safety protocols fully aligned with Joint Commission International benchmarks — the gold standard of global healthcare accreditation.", meta: "Certified 2023", icon: <FiShield size={18} /> },
    { img: IMG.award, tag: "National Recognition",title: "Best Patient Care Award",       desc: "Honoured by the National Healthcare Excellence Council for outstanding patient satisfaction scores and clinical quality indicators over three consecutive years.", meta: "2021 · 2022 · 2023", icon: <FiAward size={18} /> },
    { img: IMG.iso,   tag: "Data Security",       title: "ISO 27001 Compliant",           desc: "Patient data protected under internationally certified information security management systems. Every record encrypted, backed up, and accessible only by authorised personnel.", meta: "ISO 27001:2022", icon: <FiStar size={18} /> },
  ];

  const stats = [
    { value: "50000", suffix: "+", label: "Patients Served" },
    { value: "98",    suffix: "%", label: "Satisfaction Rate" },
    { value: "25",    suffix: "+", label: "Specialists" },
    { value: "13",    suffix: "+", label: "Years of Excellence" },
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white">
      <style>{`
        @keyframes float-y  { 0%,100%{ transform:translateY(0)    } 50%{ transform:translateY(-14px) } }
        @keyframes float-x  { 0%,100%{ transform:translateX(0)    } 50%{ transform:translateX( 10px) } }
        @keyframes bounce-sm{ 0%,100%{ transform:translateY(0)    } 50%{ transform:translateY(-6px)  } }
        @keyframes shine    {
          0%   { left:-100%; opacity:0; }
          15%  { opacity:.5; }
          30%  { left:100%; opacity:0; }
          100% { left:100%; opacity:0; }
        }
        .float-y  { animation: float-y  6s ease-in-out infinite; }
        .float-x  { animation: float-x  5s ease-in-out infinite; }
        .bounce-sm{ animation: bounce-sm 2.4s ease-in-out infinite; }
        .glitter-wrap { position:relative; overflow:hidden; }
        .glitter-ray  {
          position:absolute; top:0; width:45%; height:100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.45) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-22deg);
          animation: shine 4s infinite ease-in-out;
          pointer-events:none;
        }
        .glitter-ray.d1{ animation-delay:0s;   }
        .glitter-ray.d2{ animation-delay:1.3s; }
        .glitter-ray.d3{ animation-delay:2.6s; }

        .perspective-card{ perspective: 1000px; }

        /* Elegant line-through heading accent */
        .section-heading::before {
          content:'';
          display:block;
          width:36px;
          height:2px;
          background:#3b82f6;
          margin-bottom:18px;
        }
      `}</style>

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white/75 backdrop-blur-xl border-b border-slate-100/60">
        <Navbar onNavigate={onNavigate} />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          § 1  HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="pt-36 pb-20 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — slides from left */}
          <motion.div
            variants={fromLeft} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-7"
          >
            <Eye>About Our Clinic</Eye>
            <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-black tracking-tight text-slate-950 leading-[1.02]">
              Where care<br />
              <span className="text-blue-600">meets precision.</span>
            </h1>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-md border-l-2 border-blue-100 pl-4">
              For over 13 years we have built a legacy of professional medical care in Karachi —
              through world-class specialists, modern infrastructure, and a patient-first culture
              that genuinely heals.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => onBookAppointment && onBookAppointment()} className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.97] transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
                Book Appointment <FiArrowRight size={14} />
              </button>
              <button onClick={() => onNavigate && onNavigate("doctors")} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all">
                Meet Our Doctors
              </button>
            </div>
          </motion.div>

          {/* RIGHT — slides from right + floating panels */}
          <motion.div
            variants={fromRight} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative h-[440px] lg:h-[520px]"
          >
            {/* Floating orbit decoration */}
            <div className="absolute -top-6 -right-6 opacity-40 float-y" style={{ animationDelay: "0s" }}>
              <OrbitRing size={120} duration={10} dotCount={3} color="#3b82f6" />
            </div>
            <div className="absolute bottom-4 -left-8 opacity-30 float-x" style={{ animationDelay: "2s" }}>
              <OrbitRing size={80} duration={7} dotCount={2} color="#93c5fd" />
            </div>

            {/* Three panels */}
            <div className="grid grid-cols-3 gap-3 h-full items-stretch">
              {[
                { src: IMG.panel1, alt: "Clinic",      cls: "",          delay: "0.1s"  },
                { src: IMG.panel2, alt: "Specialists",  cls: "-mt-8 z-10 shadow-2xl", delay: "0.25s" },
                { src: IMG.panel3, alt: "Patient Care", cls: "",          delay: "0.4s"  },
              ].map(({ src, alt, cls, delay }, i) => (
                <div key={i} className={`glitter-wrap rounded-2xl overflow-hidden border border-white/60 shadow-md ${cls}`}>
                  <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-600 brightness-95" />
                  <div className={`glitter-ray d${i+1}`} />
                </div>
              ))}
            </div>

            {/* Floating stat pill — bouncing */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bounce-sm">
              <div className="bg-white border border-slate-100 shadow-xl rounded-full px-6 py-2.5 flex items-center gap-3 whitespace-nowrap">
                <span className="text-xl font-black text-blue-600">50k+</span>
                <span className="text-xs text-slate-500 font-semibold">Patients Served</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 2  CLINIC STORY — elegant full-width typographic strip
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left: eyebrow + large year */}
          <motion.div
            variants={fromLeft} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-2"
          >
            <Eye>Our Story</Eye>
            <div className="text-[7rem] lg:text-[9rem] font-black text-slate-100 leading-none select-none tracking-tight">
              2011
            </div>
          </motion.div>

          {/* Right: story text in magazine columns */}
          <motion.div
            variants={fromRight} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="pt-2 space-y-6"
          >
            <h2 className="section-heading text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              Founded on a promise to reimagine healthcare in Pakistan
            </h2>
            <div className="text-slate-500 text-[15px] leading-relaxed columns-1 lg:columns-2 gap-10 space-y-4">
              <p>
                Our clinic was born from a single conviction — that every patient in Karachi deserves
                world-class medical care delivered with genuine compassion. We began with three specialists
                and one operation theatre.
              </p>
              <p>
                Today we serve over 50,000 patients annually across six departments. Our founding promise
                has never wavered: transparent care, clinical excellence, and a human touch at every step.
              </p>
            </div>
            <div className="flex gap-8 pt-4 border-t border-slate-100">
              {[["25+","Specialists"],["6","Departments"],["13yr","Legacy"]].map(([v,l]) => (
                <div key={l}>
                  <div className="text-2xl font-black text-slate-900">{v}</div>
                  <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 3  MISSION & VISION — parallax images + split text
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-20 bg-[#f9fafb]">
        <div className="max-w-6xl mx-auto space-y-28">

          {/* Mission */}
          <SplitRow img={IMG.mission} imgAlt="Mission" flip={false}>
            <Eye>Our Mission</Eye>
            <h2 className="section-heading text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              Healthcare that heals<br />the whole person
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              To provide every patient with care that is not only medically excellent but genuinely
              compassionate — with transparent protocols and an experience that restores confidence
              in modern medicine.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              We measure our success not by procedures completed, but by lives meaningfully improved.
              Our 25+ specialists collaborate on every complex case, placing the patient at the absolute
              centre of every decision.
            </p>
            <ul className="space-y-2 pt-1">
              {["Transparent, informed consent at every step", "Collaborative multi-specialist care teams", "Patient feedback integrated into clinical improvement"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <FiCheckCircle className="text-blue-500 flex-shrink-0" size={13} /> {f}
                </li>
              ))}
            </ul>
          </SplitRow>

          {/* Vision */}
          <SplitRow img={IMG.vision} imgAlt="Vision" flip={true}>
            <Eye>Our Vision</Eye>
            <h2 className="section-heading text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              The standard others<br />aspire to reach
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              To be recognised as the region's most trusted healthcare institution — where world-class
              medical expertise meets genuine human care, and every patient leaves healthier, better
              informed, and fully reassured.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our roadmap: AI-assisted diagnostics, a fully digital patient portal, and becoming
              Pakistan's first JCI-accredited outpatient clinic — setting benchmarks for the entire region.
            </p>
            <ul className="space-y-2 pt-1">
              {["AI-assisted diagnostics & symptom checking", "Digital patient portal & e-prescriptions", "Regional centre of excellence by 2027"].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <FiCheckCircle className="text-blue-500 flex-shrink-0" size={13} /> {f}
                </li>
              ))}
            </ul>
          </SplitRow>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 4  PHILOSOPHY BANNER — parallax + typography
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white border-y border-slate-100">
        <div className="relative h-[420px] lg:h-[480px]">
          <ParallaxImg src={IMG.historyBg} alt="Philosophy" className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-white/82" />
          <motion.div
            variants={fromBelow} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center space-y-6"
          >
            <Eye>Our Philosophy</Eye>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl">
              Technology supports care.{" "}
              <span className="text-blue-600">People deliver healing.</span>
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-xl">
              No machine replaces the human touch. Our digital tools exist to free clinicians to focus
              on what matters most — your health, your comfort, your complete recovery. Medicine is a
              relationship, not a transaction.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 5  CORE VALUES — alternating split rows
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-20 bg-[#f9fafb]">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fromBelow} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Eye>What We Stand For</Eye>
            <h2 className="section-heading text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-20">Core Values</h2>
          </motion.div>
          <div className="space-y-24">
            {values.map((v, i) => (
              <SplitRow key={v.name} img={v.img} imgAlt={v.name} flip={i % 2 === 1}>
                <h3 className="section-heading text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">{v.name}</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed max-w-md">{v.desc}</p>
              </SplitRow>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 6  CERTIFICATIONS — elegant image cards, no badges
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fromBelow} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Eye>Credentials</Eye>
            <h2 className="section-heading text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-16">Verified Trust</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {certs.map((c, i) => (
              <motion.div
                key={i}
                variants={fromBelow} initial="hidden" whileInView="visible" custom={i}
                viewport={{ once: true, amount: 0.2 }}
                className="group rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50/60 transition-all duration-500 bg-white"
              >
                <div className="overflow-hidden h-44">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-600" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-blue-500">
                    {c.icon}
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-500">{c.tag}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
                  <p className="text-xs text-slate-300 font-semibold pt-2 border-t border-slate-50">{c.meta}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Memberships — clean text list */}
          <motion.div
            variants={fromBelow} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 p-8 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <Eye>Professional Memberships</Eye>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600">
              {["Pakistan Medical & Dental Council (PMDC)", "Pakistan Society of Internal Medicine (PSIM)", "World Health Organization Partner Network"].map(m => (
                <div key={m} className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-blue-400 mt-0.5 flex-shrink-0" size={13} /> {m}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 7  FACILITIES — 3D FLIP CARDS GRID
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 lg:px-20 bg-[#f9fafb]">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fromBelow} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Eye>Our Infrastructure</Eye>
            <h2 className="section-heading text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              World-Class Facilities
            </h2>
            <p className="text-slate-400 text-sm mb-16">Hover each card to explore.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <motion.div
                key={f.name}
                variants={fromBelow} initial="hidden" whileInView="visible" custom={i % 3}
                viewport={{ once: true, amount: 0.1 }}
              >
                <FlipCard
                  front={{ img: f.img, tag: f.tag, title: f.name, hint: f.hint }}
                  back={{ title: f.name, desc: f.desc, features: f.features }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 8  STATISTICS — large counter row
      ══════════════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="py-24 bg-white border-y border-slate-100 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map(s => <StatItem key={s.label} {...s} start={statsInView} />)}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § 9  CLOSING CTA — parallax + clean typography
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-36 px-6">
        <ParallaxImg src={IMG.ctaBg} alt="Book Appointment" className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-white/88" />
        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <motion.div variants={fromBelow} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Eye>Get Started</Eye>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              Ready to experience<br />modern healthcare?
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-xl mx-auto">
              Our specialists guide you from first consultation to complete recovery.
              Book online, WhatsApp us, or walk in — we are always here.
            </p>
          </motion.div>
          <motion.div
            variants={fromBelow} initial="hidden" whileInView="visible" custom={1}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button onClick={() => onBookAppointment && onBookAppointment()} className="px-7 py-3.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.97] transition-all flex items-center gap-2 justify-center shadow-xl shadow-blue-200">
              Book Appointment <FiArrowRight size={15} />
            </button>
            <button onClick={() => onNavigate && onNavigate("online-consultation")} className="px-7 py-3.5 bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-2 justify-center">
              Online Consultation <FiChevronRight size={15} />
            </button>
            <button onClick={() => onNavigate && onNavigate("doctors")} className="px-7 py-3.5 bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-100 hover:border-slate-300 transition-all flex items-center gap-2 justify-center">
              Meet Our Doctors <FiChevronRight size={15} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          § FOOTER CONTACT BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-10 border-t border-slate-100 bg-white px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-center gap-8 text-xs font-semibold text-slate-400">
          <div className="flex items-center justify-center gap-2 hover:text-blue-500 transition-colors cursor-default">
            <FiMapPin className="text-blue-400" /> Phase 6, DHA, Karachi, PK
          </div>
          <div className="flex items-center justify-center gap-2 hover:text-blue-500 transition-colors cursor-default">
            <FiPhone className="text-blue-400" /> +92 21 111 254 642
          </div>
          <div className="flex items-center justify-center gap-2 hover:text-blue-500 transition-colors cursor-default">
            <FaAmbulance className="text-blue-400" /> Emergency Hotline Active
          </div>
        </div>
      </section>
    </div>
  );
}










// import { motion, useInView as useMotionInView } from "framer-motion";
// import {
//   FiArrowRight, FiCheckCircle, FiChevronRight,
//   FiMapPin, FiPhone, FiAward, FiShield, FiStar
// } from "react-icons/fi";
// import { FaAmbulance, FaHeartbeat } from "react-icons/fa";
// import Navbar from "../components/Navbar";

// // ─── IMAGE BANK ───────────────────────────────────────────────────────────────
// const IMAGES = {
//   panel1: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
//   panel2: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
//   panel3: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
//   icu:      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
//   surgery:  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=80",
//   lab:      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1400&q=80",
//   pharmacy: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1400&q=80",
//   lounge:   "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80",
//   parking:  "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1400&q=80",
//   mission:  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80",
//   vision:   "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
//   compassion:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
//   innovation:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80",
//   trust:    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
//   excellence:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80",
//   ctaBg:    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=80",
//   historyBg:"https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1600&q=80",
//   // High quality certification / award images
//   jci:      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=90",
//   award:    "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=900&q=90",
//   iso:      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=90",
// };

// // ─── COUNTER HOOK ─────────────────────────────────────────────────────────────
// function useCountUp(target, duration = 2000, start = false) {
//   const [count, setCount] = useState(0);
//   useEffect(() => {
//     if (!start) return;
//     const end = parseInt(target);
//     if (isNaN(end)) return;
//     let startTime = null;
//     const step = (ts) => {
//       if (!startTime) startTime = ts;
//       const progress = Math.min((ts - startTime) / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       setCount(Math.floor(eased * end));
//       if (progress < 1) requestAnimationFrame(step);
//     };
//     requestAnimationFrame(step);
//   }, [start, target, duration]);
//   return count;
// }

// // ─── SPLIT ANIMATION (left / right) ──────────────────────────────────────────
// const slideLeft  = { hidden: { opacity: 0, x: -70 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } } };
// const slideRight = { hidden: { opacity: 0, x:  70 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } } };
// const fadeUp     = { hidden: { opacity: 0, y: 40  }, visible: (i=0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.13, ease: [0.25, 0.1, 0.25, 1] } }) };

// // ─── SECTION LABEL ────────────────────────────────────────────────────────────
// const SectionLabel = ({ label, heading }) => (
//   <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-16">
//     <span className="block w-10 h-[2px] bg-blue-500 mb-5" />
//     <p className="text-[11px] font-bold text-blue-600 tracking-[0.22em] uppercase mb-2">{label}</p>
//     {heading && <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">{heading}</h2>}
//   </motion.div>
// );

// // ─── ALTERNATING ROW ─────────────────────────────────────────────────────────
// const AlternatingRow = ({ img, imgAlt, children, reverse = false }) => {
//   const ref = useRef(null);
//   const inView = useMotionInView(ref, { once: true, amount: 0.2 });
//   return (
//     <div ref={ref} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}>
//       <motion.div
//         initial="hidden" animate={inView ? "visible" : "hidden"}
//         variants={reverse ? slideRight : slideLeft}
//         className={`overflow-hidden rounded-2xl shadow-lg ${reverse ? "[direction:ltr]" : ""}`}
//       >
//         <img src={img} alt={imgAlt} className="w-full h-72 lg:h-[360px] object-cover hover:scale-105 transition-transform duration-700" />
//       </motion.div>
//       <motion.div
//         initial="hidden" animate={inView ? "visible" : "hidden"}
//         variants={reverse ? slideLeft : slideRight}
//         className={`space-y-5 ${reverse ? "[direction:ltr]" : ""}`}
//       >
//         {children}
//       </motion.div>
//     </div>
//   );
// };

// // ─── STAT ITEM ───────────────────────────────────────────────────────────────
// const StatItem = ({ value, suffix, label, start }) => {
//   const count = useCountUp(value, 2200, start);
//   return (
//     <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="text-center space-y-2">
//       <div className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
//         {start ? count.toLocaleString() : "0"}{suffix}
//       </div>
//       <div className="w-6 h-0.5 bg-blue-400 mx-auto" />
//       <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{label}</div>
//     </motion.div>
//   );
// };

// // ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
// export default function About({ onNavigate }) {
//   const statsRef   = useRef(null);
//   const statsInView = useMotionInView(statsRef, { once: true, amount: 0.3 });

//   // ── DATA ──
//   const facilities = [
//     { name: "Intensive Care Suite", short: "ICU", desc: "24/7 continuous monitoring with dedicated specialist teams. Every critical patient receives immediate, personalized attention in our fully equipped critical care environment with the latest life-support technology.", features: ["24/7 Specialist Coverage", "Real-Time Monitoring", "Ventilator Support"], img: IMAGES.icu },
//     { name: "Operation Theater",    short: "OT",  desc: "State-of-the-art sterile surgical suites designed to international safety standards. Our laminar airflow systems and advanced intra-operative imaging ensure every procedure meets the highest benchmarks of precision and safety.", features: ["Laminar Airflow", "Advanced Intra-Op Imaging", "Sterile Architecture"], img: IMAGES.surgery },
//     { name: "Diagnostic Laboratory",short: "LAB", desc: "Fully automated diagnostic lab delivering precise results with rapid turnaround. From hematology to microbiology, our ISO-certified lab serves the complete diagnostic spectrum with same-day reporting.", features: ["Automated Analysis", "Same-Day Results", "ISO QA Certified"], img: IMAGES.lab },
//     { name: "In-House Pharmacy",    short: "RX",  desc: "Round-the-clock pharmacy stocked with an extensive range of branded and generic medications. Our pharmacists ensure accurate dispensing, cold-chain storage, and thorough patient counseling at every visit.", features: ["Open 24/7", "Prescription Verification", "Cold Chain Storage"], img: IMAGES.pharmacy },
//     { name: "Patient Lounge",       short: "VIP", desc: "Thoughtfully designed comfort spaces that respect your time and wellbeing. Premium seating, ambient lighting, free Wi-Fi, and a dedicated concierge create a calm, reassuring atmosphere for patients and families.", features: ["Wi-Fi Enabled", "Dedicated Concierge", "Family Seating"], img: IMAGES.lounge },
//     { name: "Secure Parking",       short: "PKG", desc: "Covered multi-level parking with dedicated zones for patients, visitors, and emergency vehicles. CCTV-monitored around the clock and fully accessible for all mobility requirements — free of charge for patients.", features: ["CCTV Monitored 24/7", "Accessible Bays", "Emergency Priority Lane"], img: IMAGES.parking },
//   ];

//   const coreValues = [
//     { name: "Compassion", desc: "Every patient interaction is guided by genuine empathy. We listen, we care, and we treat each person as family — not a case number. Our clinical team is trained not just in medicine, but in humanity.", img: IMAGES.compassion },
//     { name: "Innovation", desc: "We continuously invest in the latest medical technologies, digital platforms, and clinical protocols to ensure our patients receive treatments at the global frontier — from AI diagnostics to robotic-assisted procedures.", img: IMAGES.innovation },
//     { name: "Trust",      desc: "Transparent communication, ethical practices, and consistent outcomes have made us the most referred clinic in the region. We never overpromise — we simply deliver, reliably, every time.", img: IMAGES.trust },
//     { name: "Excellence", desc: "From clinical outcomes to patient experience, we hold every aspect of our practice to the highest possible standard. Our specialists are trained internationally and our protocols are reviewed quarterly.", img: IMAGES.excellence },
//   ];

//   const stats = [
//     { value: "50000", suffix: "+", label: "Patients Served" },
//     { value: "98",    suffix: "%", label: "Satisfaction Rate" },
//     { value: "25",    suffix: "+", label: "Specialists" },
//     { value: "13",    suffix: "+", label: "Years of Excellence" },
//   ];

//   const certifications = [
//     {
//       img: IMAGES.jci,
//       category: "Accreditation",
//       title: "JCI International Standard",
//       desc: "Our clinical procedures and patient safety protocols are fully aligned with Joint Commission International benchmarks — the gold standard of global healthcare accreditation.",
//       badge: "Certified 2023",
//       icon: <FiShield size={20} className="text-blue-500" />,
//     },
//     {
//       img: IMAGES.award,
//       category: "National Recognition",
//       title: "Best Patient Care Award",
//       desc: "Honoured by the National Healthcare Excellence Council for outstanding patient satisfaction scores and clinical quality indicators over three consecutive years.",
//       badge: "2021 · 2022 · 2023",
//       icon: <FiAward size={20} className="text-blue-500" />,
//     },
//     {
//       img: IMAGES.iso,
//       category: "Data Security",
//       title: "ISO 27001 Compliant",
//       desc: "Patient data is protected under internationally certified information security management systems. Every record is encrypted, backed up, and accessible only by authorised personnel.",
//       badge: "ISO 27001:2022",
//       icon: <FiStar size={20} className="text-blue-500" />,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#fafbfc] text-slate-800 antialiased font-sans selection:bg-blue-600 selection:text-white">
//       <style>{`
//         @keyframes shine {
//           0%   { left: -100%; opacity: 0; }
//           15%  { opacity: 0.55; }
//           30%  { left: 100%; opacity: 0; }
//           100% { left: 100%; opacity: 0; }
//         }
//         .glitter-container { position: relative; overflow: hidden; }
//         .glitter-shine {
//           position: absolute; top: 0; width: 50%; height: 100%;
//           background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
//           transform: skewX(-25deg);
//           animation: shine 3.5s infinite ease-in-out;
//           pointer-events: none;
//         }
//         .glitter-p1 { animation-delay: 0s; }
//         .glitter-p2 { animation-delay: 1.2s; }
//         .glitter-p3 { animation-delay: 2.4s; }

//         /* Credential card image zoom on hover */
//         .cert-card:hover .cert-img { transform: scale(1.06); }
//         .cert-img { transition: transform 0.6s ease; }
//       `}</style>

//       {/* NAVBAR */}
//       <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-blue-50/50">
//         <Navbar onNavigate={onNavigate} />
//       </div>

//       {/* ══ SECTION 1: HERO ══════════════════════════════════════════════════════ */}
//       <section className="pt-40 pb-24 px-6 lg:px-16 max-w-7xl mx-auto relative overflow-hidden">
//         <div className="grid lg:grid-cols-12 gap-12 items-center">
//           {/* TEXT — slides in from left */}
//           <motion.div
//             initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, ease: "easeOut" }}
//             className="lg:col-span-6 text-left space-y-6 z-10"
//           >
//             <div className="space-y-1">
//               <h1 className="text-6xl lg:text-8xl font-black tracking-tight text-slate-950 leading-none">ABOUT</h1>
//               <h2 className="text-5xl lg:text-7xl font-bold tracking-tight text-blue-600 leading-none">OUR CLINIC</h2>
//             </div>
//             <p className="text-slate-500 text-base max-w-lg font-normal leading-relaxed pt-4 border-t border-slate-100">
//               For over 13 years, we have built a legacy of professional medical care in Karachi. Through
//               world-class specialists, modern infrastructure, and a genuinely patient-first culture,
//               we deliver healthcare that heals — body and spirit.
//             </p>
//             <div className="flex gap-3 flex-wrap pt-2">
//               <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200">
//                 Book Appointment <FiArrowRight size={14} />
//               </button>
//               <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all">
//                 Meet Our Doctors
//               </button>
//             </div>
//           </motion.div>

//           {/* IMAGES — slide in from right */}
//           <motion.div
//             initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.85, delay: 0.15, ease: "easeOut" }}
//             className="lg:col-span-6 grid grid-cols-3 gap-4 h-[420px] lg:h-[500px] w-full items-stretch"
//           >
//             {[
//               { src: IMAGES.panel1, cls: "", alt: "Clinic" },
//               { src: IMAGES.panel2, cls: "lg:-translate-y-6 z-10 shadow-xl border-blue-100/50", alt: "Specialists" },
//               { src: IMAGES.panel3, cls: "", alt: "Lounge" },
//             ].map(({ src, cls, alt }, i) => (
//               <div key={i} className={`glitter-container rounded-2xl shadow-md border border-slate-100 overflow-hidden ${cls}`}>
//                 <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 brightness-95 saturate-90" />
//                 <div className={`glitter-shine glitter-p${i + 1}`} />
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ══ SECTION 2: CLINIC HISTORY (short paragraph) ══════════════════════ */}
//       <section className="py-16 bg-blue-600 px-6 lg:px-16">
//         <motion.div
//           variants={fadeUp} initial="hidden" whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//           className="max-w-4xl mx-auto text-center space-y-4"
//         >
//           <p className="text-[11px] font-bold text-blue-100 tracking-[0.22em] uppercase">Our Story</p>
//           <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug tracking-tight">
//             Founded on a promise to reimagine healthcare in Pakistan
//           </h2>
//           <p className="text-blue-100 text-sm leading-relaxed max-w-2xl mx-auto">
//             Established in 2011, our clinic was born from a single conviction — that every patient in
//             this city deserves world-class medical care delivered with genuine compassion. We began
//             with a small team of three specialists and one OT. Today, we serve over 50,000 patients
//             annually across six departments, and our commitment to that founding promise has never wavered.
//           </p>
//         </motion.div>
//       </section>

//       {/* ══ SECTION 3: MISSION & VISION ══════════════════════════════════════ */}
//       <section className="py-28 bg-white border-y border-slate-100 px-6 lg:px-16">
//         <div className="max-w-6xl mx-auto">
//           <SectionLabel label="Who We Are" heading="Mission & Vision" />

//           <div className="space-y-24">
//             {/* MISSION — image left, text right */}
//             <AlternatingRow img={IMAGES.mission} imgAlt="Our Mission" reverse={false}>
//               <span className="text-[11px] font-bold text-blue-500 tracking-[0.2em] uppercase">Our Mission</span>
//               <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
//                 Healthcare that heals the whole person
//               </h3>
//               <div className="w-8 h-0.5 bg-blue-200" />
//               <p className="text-slate-500 leading-relaxed text-[15px]">
//                 To provide every patient with healthcare that is not only medically excellent but
//                 genuinely compassionate. We are committed to transparent care, advanced clinical
//                 protocols, and a patient experience that restores confidence in modern medicine.
//               </p>
//               <p className="text-slate-400 leading-relaxed text-sm">
//                 We measure our success not by procedures completed, but by lives meaningfully improved.
//                 Our team of 25+ specialists works as one — sharing knowledge, collaborating on complex
//                 cases, and placing the patient at the absolute centre of every decision.
//               </p>
//               <ul className="space-y-2 pt-1">
//                 {["Transparent, informed consent at every step","Collaborative multi-specialist care teams","Patient feedback integrated into clinical improvement"].map(f => (
//                   <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
//                     <FiCheckCircle className="text-blue-500 flex-shrink-0" size={14} /> {f}
//                   </li>
//                 ))}
//               </ul>
//             </AlternatingRow>

//             {/* VISION — image right, text left */}
//             <AlternatingRow img={IMAGES.vision} imgAlt="Our Vision" reverse={true}>
//               <span className="text-[11px] font-bold text-blue-500 tracking-[0.2em] uppercase">Our Vision</span>
//               <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
//                 The standard others aspire to reach
//               </h3>
//               <div className="w-8 h-0.5 bg-blue-200" />
//               <p className="text-slate-500 leading-relaxed text-[15px]">
//                 To be recognized as the region's most trusted healthcare institution — a place where
//                 world-class medical expertise meets genuine human care. We envision a future where
//                 every patient leaves healthier, better informed, and fully reassured.
//               </p>
//               <p className="text-slate-400 leading-relaxed text-sm">
//                 Our roadmap includes expanding our specialist roster, integrating AI-assisted diagnostics,
//                 launching a fully digital patient portal, and becoming Pakistan's first JCI-accredited
//                 outpatient clinic — setting benchmarks for the entire region.
//               </p>
//               <ul className="space-y-2 pt-1">
//                 {["AI-assisted diagnostics & symptom checking","Digital patient portal & e-prescriptions","Regional centre of excellence by 2027"].map(f => (
//                   <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
//                     <FiCheckCircle className="text-blue-500 flex-shrink-0" size={14} /> {f}
//                   </li>
//                 ))}
//               </ul>
//             </AlternatingRow>
//           </div>
//         </div>
//       </section>

//       {/* ══ SECTION 4: CORE VALUES ════════════════════════════════════════════ */}
//       <section className="py-28 px-6 lg:px-16 bg-[#fafbfc]">
//         <div className="max-w-6xl mx-auto">
//           <SectionLabel label="What We Stand For" heading="Core Values" />
//           <div className="space-y-24">
//             {coreValues.map((val, i) => (
//               <AlternatingRow key={val.name} img={val.img} imgAlt={val.name} reverse={i % 2 === 1}>
//                 <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{val.name}</h3>
//                 <div className="w-8 h-0.5 bg-blue-200" />
//                 <p className="text-slate-500 leading-relaxed text-[15px] max-w-md">{val.desc}</p>
//               </AlternatingRow>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ SECTION 5: HEALTHCARE PHILOSOPHY BANNER ══════════════════════════ */}
//       <section className="relative overflow-hidden">
//         <div className="relative h-[460px] lg:h-[520px]">
//           <img src={IMAGES.historyBg} alt="Healthcare Philosophy" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-white/80" />
//           <div className="absolute inset-0 flex items-center justify-center px-6">
//             <motion.div
//               variants={fadeUp} initial="hidden" whileInView="visible"
//               viewport={{ once: true, amount: 0.3 }}
//               className="max-w-2xl text-center space-y-6"
//             >
//               <span className="text-[11px] font-bold text-blue-600 tracking-[0.22em] uppercase block">Our Philosophy</span>
//               <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
//                 Technology supports care.<br />
//                 <span className="text-blue-600">People deliver healing.</span>
//               </h2>
//               <p className="text-slate-500 leading-relaxed text-base max-w-lg mx-auto">
//                 We believe that no machine replaces the human touch. Our digital tools exist to free our
//                 clinicians to focus on what matters most — your health, your comfort, your complete recovery.
//                 Medicine is a relationship, not a transaction.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ══ SECTION 6: CERTIFICATIONS (IMAGE CARDS) ══════════════════════════ */}
//       <section className="py-28 bg-white border-y border-slate-100 px-6 lg:px-16">
//         <div className="max-w-6xl mx-auto">
//           <SectionLabel label="Credentials" heading="Verified Trust" />

//           <div className="grid md:grid-cols-3 gap-8">
//             {certifications.map((item, i) => (
//               <motion.div
//                 key={i}
//                 variants={fadeUp} initial="hidden" whileInView="visible" custom={i}
//                 viewport={{ once: true, amount: 0.2 }}
//                 className="cert-card group rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-400 bg-white"
//               >
//                 {/* Image */}
//                 <div className="overflow-hidden h-52">
//                   <img src={item.img} alt={item.title} className="cert-img w-full h-full object-cover" />
//                 </div>

//                 {/* Content */}
//                 <div className="p-7 space-y-3">
//                   <div className="flex items-center gap-2">
//                     {item.icon}
//                     <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">{item.category}</span>
//                   </div>
//                   <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
//                   <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
//                   <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
//                     <span className="text-xs text-slate-400 font-semibold">{item.badge}</span>
//                     <FiCheckCircle className="text-blue-400" size={16} />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Memberships row */}
//           <motion.div
//             variants={fadeUp} initial="hidden" whileInView="visible" custom={1}
//             viewport={{ once: true, amount: 0.2 }}
//             className="mt-14 p-8 bg-blue-50/60 rounded-2xl border border-blue-100"
//           >
//             <p className="text-[11px] font-bold text-blue-500 tracking-[0.2em] uppercase mb-5">Professional Memberships</p>
//             <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-600 font-medium">
//               {[
//                 "Pakistan Medical & Dental Council (PMDC)",
//                 "Pakistan Society of Internal Medicine (PSIM)",
//                 "World Health Organization Partner Network",
//               ].map(m => (
//                 <div key={m} className="flex items-start gap-2.5">
//                   <FiCheckCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={14} />
//                   {m}
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ══ SECTION 7: FACILITIES ════════════════════════════════════════════ */}
//       <section className="py-28 px-6 lg:px-16 bg-[#fafbfc]">
//         <div className="max-w-6xl mx-auto">
//           <SectionLabel label="Our Infrastructure" heading="World-Class Facilities" />

//           <div className="space-y-28">
//             {facilities.map((f, i) => (
//               <AlternatingRow key={f.name} img={f.img} imgAlt={f.name} reverse={i % 2 === 1}>
//                 <span className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase">{f.short}</span>
//                 <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">{f.name}</h3>
//                 <div className="w-8 h-0.5 bg-blue-200" />
//                 <p className="text-slate-500 leading-relaxed text-[15px]">{f.desc}</p>
//                 <ul className="space-y-2 pt-2">
//                   {f.features.map(feat => (
//                     <li key={feat} className="flex items-center gap-3 text-sm text-slate-600">
//                       <FiCheckCircle className="text-blue-500 flex-shrink-0" size={14} /> {feat}
//                     </li>
//                   ))}
//                 </ul>
//               </AlternatingRow>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ SECTION 8: STATISTICS ════════════════════════════════════════════ */}
//       <section ref={statsRef} className="py-20 bg-white border-y border-slate-100 px-6">
//         <div className="max-w-5xl mx-auto">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
//             {stats.map(s => (
//               <StatItem key={s.label} {...s} start={statsInView} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ══ SECTION 9: CLOSING CTA ═══════════════════════════════════════════ */}
//       <section className="relative overflow-hidden py-36 px-6">
//         <img src={IMAGES.ctaBg} alt="Book Appointment" className="absolute inset-0 w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-white/85" />
//         <div className="relative max-w-3xl mx-auto text-center space-y-8">
//           <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
//             <span className="text-[11px] font-bold text-blue-600 tracking-[0.22em] uppercase block mb-4">Get Started</span>
//             <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
//               Ready to experience modern healthcare?
//             </h2>
//             <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
//               Our specialists are available to guide you from first consultation to complete recovery.
//               Book online, WhatsApp us, or walk in — we are always here.
//             </p>
//           </motion.div>
//           <motion.div
//             variants={fadeUp} initial="hidden" whileInView="visible" custom={1}
//             viewport={{ once: true, amount: 0.3 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
//           >
//             <button className="px-7 py-3.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center shadow-lg shadow-blue-200">
//               Book Appointment <FiArrowRight size={15} />
//             </button>
//             <button className="px-7 py-3.5 bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-2 justify-center">
//               Online Consultation <FiChevronRight size={15} />
//             </button>
//             <button className="px-7 py-3.5 bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-100 hover:border-slate-300 transition-all flex items-center gap-2 justify-center">
//               Meet Our Doctors <FiChevronRight size={15} />
//             </button>
//           </motion.div>
//         </div>
//       </section>

//       {/* ══ FOOTER CONTACT BAR ═══════════════════════════════════════════════ */}
//       <section className="py-10 border-t border-blue-50 bg-slate-50/50 px-6">
//         <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-center gap-8 text-xs font-semibold text-slate-500">
//           <div className="flex items-center justify-center gap-2">
//             <FiMapPin className="text-blue-500" />
//             <span>Phase 6, DHA, Karachi, PK</span>
//           </div>
//           <div className="flex items-center justify-center gap-2">
//             <FiPhone className="text-blue-500" />
//             <span>+92 21 111 254 642</span>
//           </div>
//           <div className="flex items-center justify-center gap-2">
//             <FaAmbulance className="text-blue-500" />
//             <span>Emergency Hotline Active</span>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }










// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";

// /* ═══════════════════════════════════════════════════════════
//    FONTS + GLOBAL STYLES
// ═══════════════════════════════════════════════════════════ */
// const GlobalStyles = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     :root {
//       --cream: #FAFAF8;
//       --white: #FFFFFF;
//       --ink: #0A0A0F;
//       --ink-soft: #1C1C28;
//       --blue-vivid: #2563EB;
//       --blue-mid: #3B82F6;
//       --blue-pale: #EFF6FF;
//       --blue-glow: rgba(37,99,235,0.15);
//       --blue-glow-strong: rgba(37,99,235,0.35);
//       --silver: #F1F5F9;
//       --muted: #64748B;
//       --border: rgba(15,15,30,0.08);
//       --glass: rgba(255,255,255,0.7);
//       --glass-border: rgba(255,255,255,0.6);
//     }

//     html { scroll-behavior: smooth; }

//     body {
//       background: var(--cream);
//       color: var(--ink);
//       font-family: 'DM Sans', sans-serif;
//       overflow-x: hidden;
//       cursor: none;
//     }

//     /* CUSTOM CURSOR */
//     .cursor-dot {
//       width: 8px; height: 8px;
//       background: var(--blue-vivid);
//       border-radius: 50%;
//       position: fixed; top: 0; left: 0;
//       pointer-events: none; z-index: 9999;
//       transform: translate(-50%, -50%);
//       transition: transform 0.1s, width 0.3s, height 0.3s, background 0.3s;
//     }
//     .cursor-ring {
//       width: 36px; height: 36px;
//       border: 1px solid rgba(37,99,235,0.5);
//       border-radius: 50%;
//       position: fixed; top: 0; left: 0;
//       pointer-events: none; z-index: 9998;
//       transform: translate(-50%, -50%);
//       transition: transform 0.15s ease, width 0.3s, height 0.3s;
//     }
//     body:has(a:hover) .cursor-dot,
//     body:has(button:hover) .cursor-dot { width: 16px; height: 16px; background: var(--blue-mid); }
//     body:has(a:hover) .cursor-ring,
//     body:has(button:hover) .cursor-ring { width: 60px; height: 60px; }

//     /* NOISE TEXTURE OVERLAY */
//     .noise::after {
//       content: '';
//       position: absolute; inset: 0;
//       background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
//       pointer-events: none; opacity: 0.4; z-index: 0;
//     }

//     /* DISPLAY FONT */
//     .font-display { font-family: 'Syne', sans-serif; }
//     .font-serif { font-family: 'Instrument Serif', serif; }

//     /* GLASS CARD */
//     .glass-card {
//       background: rgba(255,255,255,0.65);
//       backdrop-filter: blur(20px) saturate(180%);
//       -webkit-backdrop-filter: blur(20px) saturate(180%);
//       border: 1px solid rgba(255,255,255,0.8);
//       box-shadow: 0 8px 32px rgba(15,15,30,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
//     }

//     /* FLOATING ANIMATION */
//     @keyframes float {
//       0%, 100% { transform: translateY(0px) rotate(0deg); }
//       33% { transform: translateY(-12px) rotate(1deg); }
//       66% { transform: translateY(-6px) rotate(-1deg); }
//     }
//     .float-1 { animation: float 7s ease-in-out infinite; }
//     .float-2 { animation: float 9s ease-in-out infinite 1s; }
//     .float-3 { animation: float 6s ease-in-out infinite 2s; }

//     /* ORBIT */
//     @keyframes orbit {
//       from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
//       to   { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
//     }
//     @keyframes orbit2 {
//       from { transform: rotate(180deg) translateX(80px) rotate(-180deg); }
//       to   { transform: rotate(540deg) translateX(80px) rotate(-540deg); }
//     }

//     /* SHIMMER */
//     @keyframes shimmer {
//       0% { background-position: -200% 0; }
//       100% { background-position: 200% 0; }
//     }
//     .shimmer-text {
//       background: linear-gradient(90deg, #0A0A0F 40%, #2563EB 50%, #0A0A0F 60%);
//       background-size: 200% auto;
//       -webkit-background-clip: text;
//       -webkit-text-fill-color: transparent;
//       background-clip: text;
//       animation: shimmer 4s linear infinite;
//     }

//     /* PARTICLE */
//     @keyframes particle-rise {
//       0%   { transform: translateY(0) scale(1); opacity: 0.7; }
//       100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
//     }

//     /* SCROLL BAR */
//     ::-webkit-scrollbar { width: 4px; }
//     ::-webkit-scrollbar-track { background: transparent; }
//     ::-webkit-scrollbar-thumb { background: var(--blue-vivid); border-radius: 2px; }

//     /* CONSTELLATION LINE */
//     @keyframes dash-flow {
//       to { stroke-dashoffset: -20; }
//     }
//     .dash-animate { animation: dash-flow 1.5s linear infinite; }

//     /* AWARD PLAQUE GLOW */
//     @keyframes plaque-glow {
//       0%, 100% { box-shadow: 0 0 20px rgba(37,99,235,0.1), 0 0 40px rgba(37,99,235,0.05); }
//       50%       { box-shadow: 0 0 40px rgba(37,99,235,0.25), 0 0 80px rgba(37,99,235,0.1); }
//     }
//     .plaque-glow { animation: plaque-glow 3s ease-in-out infinite; }

//     /* RING PULSE */
//     @keyframes ring-pulse {
//       0%   { transform: translate(-50%,-50%) scale(0.95); opacity: 0.8; }
//       100% { transform: translate(-50%,-50%) scale(1.4); opacity: 0; }
//     }
//     .ring-pulse { animation: ring-pulse 2s ease-out infinite; }
//     .ring-pulse-delay { animation: ring-pulse 2s ease-out infinite 1s; }

//     /* COUNT UP (handled in JS) */
//     .stat-island {
//       transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
//     }
//     .stat-island:hover {
//       transform: translateY(-8px) scale(1.03);
//       box-shadow: 0 24px 60px rgba(37,99,235,0.18);
//     }

//     /* HORIZONTAL SCROLL SNAP */
//     .timeline-inner { display: flex; gap: 0; }

//     /* SECTION SEPARATOR */
//     .section-sep {
//       height: 1px;
//       background: linear-gradient(to right, transparent, rgba(37,99,235,0.2) 30%, rgba(37,99,235,0.2) 70%, transparent);
//     }

//     /* MANIFESTO WORD */
//     .word-reveal { display: inline-block; overflow: hidden; }
//     .word-reveal span { display: inline-block; }

//     /* FACILITY MORPH BG */
//     .facility-bg { transition: background 1.2s cubic-bezier(0.4,0,0.2,1); }

//     /* LIGHT BEAM */
//     @keyframes beam-sweep {
//       0%   { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
//       20%  { opacity: 0.6; }
//       80%  { opacity: 0.4; }
//       100% { transform: translateX(300%) skewX(-20deg); opacity: 0; }
//     }
//     .beam { animation: beam-sweep 4s ease-in-out infinite; }
//     .beam-2 { animation: beam-sweep 4s ease-in-out infinite 2s; }

//     /* GRADIENT ORB */
//     @keyframes orb-breathe {
//       0%, 100% { transform: scale(1) rotate(0deg); }
//       50%       { transform: scale(1.08) rotate(8deg); }
//     }
//     .orb-breathe { animation: orb-breathe 8s ease-in-out infinite; }

//     /* PLAQUE ROTATE */
//     @keyframes slow-rotate {
//       from { transform: rotateY(0deg); }
//       to   { transform: rotateY(360deg); }
//     }
//   `}</style>
// );

// /* ═══════════════════════════════════════════════════════════
//    CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════ */
// function CustomCursor() {
//   const dotRef = useRef(null);
//   const ringRef = useRef(null);
//   useEffect(() => {
//     const move = (e) => {
//       if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
//       if (ringRef.current) { ringRef.current.style.left = e.clientX + "px"; ringRef.current.style.top = e.clientY + "px"; }
//     };
//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, []);
//   return (
//     <>
//       <div ref={dotRef} className="cursor-dot" />
//       <div ref={ringRef} className="cursor-ring" />
//     </>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    FADE-UP WRAPPER
// ═══════════════════════════════════════════════════════════ */
// const FadeUp = ({ children, delay = 0, className = "", blur = false }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40, filter: blur ? "blur(12px)" : "blur(0px)" }}
//       animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
//       transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// /* ═══════════════════════════════════════════════════════════
//    COUNT-UP HOOK
// ═══════════════════════════════════════════════════════════ */
// function useCountUp(target, duration = 2000) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const step = target / (duration / 16);
//     const timer = setInterval(() => {
//       start = Math.min(start + step, target);
//       setCount(Math.floor(start));
//       if (start >= target) clearInterval(timer);
//     }, 16);
//     return () => clearInterval(timer);
//   }, [inView, target, duration]);
//   return { count, ref };
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 0 — NAVBAR
// ═══════════════════════════════════════════════════════════ */
// function Navbar() {
//   return (
//     <motion.nav
//       initial={{ y: -60, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//       className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
//       style={{ background: "rgba(250,250,248,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(15,15,30,0.06)" }}
//     >
//       <div className="font-display font-800 text-lg tracking-tight" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>
//         Premium<span style={{ color: "var(--blue-vivid)" }}>Clinic</span>
//       </div>
//       <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "var(--muted)" }}>
//         {["About", "Doctors", "Services", "Contact"].map(l => (
//           <a key={l} href="#" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
//              onMouseEnter={e => e.target.style.color = "var(--blue-vivid)"}
//              onMouseLeave={e => e.target.style.color = "var(--muted)"}>{l}</a>
//         ))}
//       </div>
//       <button style={{ background: "var(--blue-vivid)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "100px", fontSize: "13px", fontWeight: 600, cursor: "none", fontFamily: "DM Sans" }}>
//         Book Now
//       </button>
//     </motion.nav>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 1 — HERO
// ═══════════════════════════════════════════════════════════ */
// function HeroSection() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
//   const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
//   const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

//   return (
//     <section ref={ref} className="noise" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "var(--cream)" }}>

//       {/* Background orbs */}
//       <motion.div style={{ y: y1 }} className="orb-breathe" aria-hidden>
//         <div style={{ position: "absolute", top: "10%", right: "8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(37,99,235,0.12) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
//       </motion.div>
//       <motion.div style={{ y: y2 }} aria-hidden>
//         <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
//       </motion.div>

//       {/* Floating medical cross */}
//       <motion.div className="float-1" style={{ position: "absolute", top: "20%", right: "12%", opacity: 0.07, fontSize: 120, color: "var(--blue-vivid)", fontWeight: 900, fontFamily: "Syne", userSelect: "none" }} aria-hidden>+</motion.div>
//       <motion.div className="float-2" style={{ position: "absolute", bottom: "25%", left: "8%", opacity: 0.05, fontSize: 80, color: "var(--blue-vivid)", fontWeight: 900, fontFamily: "Syne", userSelect: "none" }} aria-hidden>+</motion.div>

//       {/* LIGHT BEAMS */}
//       <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden>
//         <div className="beam" style={{ position: "absolute", top: 0, left: 0, width: "30%", height: "100%", background: "linear-gradient(to right, transparent, rgba(37,99,235,0.04), transparent)" }} />
//         <div className="beam-2" style={{ position: "absolute", top: 0, left: 0, width: "20%", height: "100%", background: "linear-gradient(to right, transparent, rgba(59,130,246,0.03), transparent)" }} />
//       </div>

//       <motion.div style={{ opacity, scale, y: y2 }} className="relative z-10 text-center px-6" style={{ maxWidth: 900, margin: "0 auto", paddingTop: 120 }}>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}
//         >
//           <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue-vivid)", display: "inline-block" }} />
//           <span style={{ fontSize: 12, fontWeight: 600, color: "var(--blue-vivid)", letterSpacing: "0.1em", textTransform: "uppercase" }}>About Premium Clinic</span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
//           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//           transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
//           style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(48px, 8vw, 96px)", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 24, color: "var(--ink)" }}
//         >
//           Healthcare Redefined<br />
//           <span style={{ fontFamily: "Instrument Serif, serif", fontWeight: 400, fontStyle: "italic", color: "var(--blue-vivid)" }}>for the modern era</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.8 }}
//           style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 48px", fontWeight: 300 }}
//         >
//           A new kind of clinic. Where clinical precision meets cinematic experience.
//           Where technology amplifies compassion, and every patient feels seen.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 1 }}
//           style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
//         >
//           <button
//             style={{ background: "var(--blue-vivid)", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: "none", fontFamily: "DM Sans", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
//             onMouseEnter={e => { e.target.style.transform = "scale(1.06)"; e.target.style.boxShadow = "0 20px 50px rgba(37,99,235,0.4)"; }}
//             onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "none"; }}
//           >
//             Book Appointment →
//           </button>
//           <button
//             style={{ background: "transparent", color: "var(--ink)", border: "1px solid var(--border)", padding: "14px 32px", borderRadius: 100, fontSize: 15, fontWeight: 500, cursor: "none", fontFamily: "DM Sans", transition: "all 0.3s ease" }}
//             onMouseEnter={e => { e.target.style.background = "var(--silver)"; }}
//             onMouseLeave={e => { e.target.style.background = "transparent"; }}
//           >
//             Explore Our Story
//           </button>
//         </motion.div>
//       </motion.div>

//       {/* Scroll hint */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
//       >
//         <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 500 }}>Scroll</span>
//         <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--blue-vivid), transparent)" }} />
//       </motion.div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 2 — FLOATING STATS
// ═══════════════════════════════════════════════════════════ */
// function StatIsland({ value, suffix = "", prefix = "", label, delay = 0 }) {
//   const { count, ref } = useCountUp(value, 2000);
//   const isRef = useRef(null);
//   const inView = useInView(isRef, { once: true });

//   return (
//     <motion.div
//       ref={isRef}
//       initial={{ opacity: 0, y: 60, scale: 0.8 }}
//       animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
//       transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
//       className="stat-island glass-card"
//       style={{ borderRadius: 24, padding: "36px 40px", textAlign: "center", position: "relative", overflow: "hidden", minWidth: 180 }}
//     >
//       {/* Animated ring */}
//       <div style={{ position: "absolute", top: "50%", left: "50%", width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.15)", transform: "translate(-50%,-50%)" }} className="ring-pulse" />
//       <div style={{ position: "absolute", top: "50%", left: "50%", width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.1)", transform: "translate(-50%,-50%)" }} className="ring-pulse-delay" />

//       <div ref={ref} style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 48, lineHeight: 1, color: "var(--ink)", position: "relative", zIndex: 1 }}>
//         {prefix}{count.toLocaleString()}{suffix}
//       </div>
//       <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, position: "relative", zIndex: 1 }}>{label}</div>
//     </motion.div>
//   );
// }

// function StatsSection() {
//   return (
//     <section style={{ padding: "120px 40px", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #F0F7FF 0%, var(--cream) 50%, #F8FAFF 100%)" }}>
//       <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 100%)", pointerEvents: "none" }} aria-hidden />

//       <FadeUp className="text-center" style={{ marginBottom: 80 }}>
//         <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue-vivid)", marginBottom: 16 }}>By The Numbers</p>
//         <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.02em", color: "var(--ink)" }}>
//           Numbers That<br /><span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400 }}>tell our story</span>
//         </h2>
//       </FadeUp>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", maxWidth: 1000, margin: "0 auto" }}>
//         <StatIsland value={50000} suffix="+" label="Patients Served" delay={0} />
//         <StatIsland value={98} suffix="%" label="Satisfaction Rate" delay={0.1} />
//         <StatIsland value={25} suffix="+" label="Specialists" delay={0.2} />
//         <StatIsland value={13} suffix="+" label="Years of Excellence" delay={0.3} />
//         <StatIsland value={6} prefix="" suffix="" label="Facility Wings" delay={0.4} />
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 3 — HORIZONTAL TIMELINE (scroll-driven)
// ═══════════════════════════════════════════════════════════ */
// const milestones = [
//   { year: "2012", title: "Clinic Founded", desc: "Established in Karachi with a vision to redefine patient care in Pakistan. 12 founding specialists. One bold mission.", color: "#2563EB", img: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&q=90" },
//   { year: "2015", title: "Advanced ICU Wing", desc: "Opened a 20-bed intensive care unit — the district's first fully monitored critical care environment.", color: "#1D4ED8", img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=90" },
//   { year: "2016", title: "JCI Accreditation", desc: "Achieved Joint Commission International accreditation on the first submission — a milestone in clinical excellence.", color: "#1E40AF", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=90" },
//   { year: "2019", title: "Digital Transformation", desc: "Launched Pakistan's first AI-powered patient portal and fully paperless EMR system. Healthcare entered a new era.", color: "#3B82F6", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=90" },
//   { year: "2022", title: "Robotic Surgery", desc: "Introduced robotic-assisted surgical theatres — minimally invasive, maximum precision, faster recovery.", color: "#2563EB", img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=90" },
//   { year: "2026", title: "Premium Smart Clinic", desc: "The future is now. AI diagnostics, predictive care pathways, and a fully connected healthcare ecosystem.", color: "#1D4ED8", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=90" },
// ];

// function TimelineSection() {
//   const sectionRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
//   const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
//   const xSpring = useSpring(x, { stiffness: 80, damping: 25 });

//   return (
//     <section ref={sectionRef} style={{ height: "500vh", position: "relative" }}>
//       <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "var(--ink-soft)" }}>

//         {/* Header */}
//         <div style={{ position: "absolute", top: 60, left: 60, zIndex: 20 }}>
//           <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Our Journey</p>
//           <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", color: "#fff", letterSpacing: "-0.02em" }}>
//             A Decade of<br /><span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, color: "var(--blue-mid)" }}>extraordinary care</span>
//           </h2>
//         </div>

//         {/* Scroll hint */}
//         <div style={{ position: "absolute", bottom: 50, left: "50%", transform: "translateX(-50%)", textAlign: "center", zIndex: 20 }}>
//           <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Scroll to explore timeline</p>
//         </div>

//         {/* Progress bar */}
//         <motion.div style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: "var(--blue-vivid)", scaleX: scrollYProgress, transformOrigin: "left", zIndex: 30 }} />

//         {/* Horizontal track */}
//         <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center" }}>
//           <motion.div style={{ x: xSpring, display: "flex", alignItems: "center", gap: 0, paddingLeft: 120, paddingRight: 200 }}>
//             {milestones.map((m, i) => (
//               <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
//                 {/* Panel */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.8, delay: 0.1 }}
//                   style={{ width: 440, padding: "0 20px", position: "relative" }}
//                 >
//                   {/* Year */}
//                   <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 96, lineHeight: 1, color: "rgba(255,255,255,0.05)", position: "absolute", top: -40, left: 20, userSelect: "none" }}>{m.year}</div>

//                   {/* Image */}
//                   <div style={{ borderRadius: 20, overflow: "hidden", height: 260, marginBottom: 28, position: "relative", zIndex: 2 }} className="float-1">
//                     <img src={m.img} alt={m.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85) saturate(0.9)" }} />
//                     <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${m.color}40 0%, transparent 60%)` }} />
//                     <div style={{ position: "absolute", bottom: 16, left: 16, background: m.color, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 100, letterSpacing: "0.05em" }}>{m.year}</div>
//                   </div>

//                   {/* Content */}
//                   <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 26, color: "#fff", marginBottom: 12, letterSpacing: "-0.01em", position: "relative", zIndex: 2 }}>{m.title}</h3>
//                   <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 340, position: "relative", zIndex: 2 }}>{m.desc}</p>
//                 </motion.div>

//                 {/* Connector line */}
//                 {i < milestones.length - 1 && (
//                   <div style={{ width: 80, height: 1, background: "linear-gradient(to right, rgba(37,99,235,0.4), rgba(37,99,235,0.1))", flexShrink: 0, position: "relative" }}>
//                     <div style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)", width: 8, height: 8, borderRadius: "50%", background: "var(--blue-vivid)", border: "2px solid rgba(255,255,255,0.2)" }} />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 4 — MISSION / VISION ORB
// ═══════════════════════════════════════════════════════════ */
// function MissionVisionSection() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//   const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
//   const leftX = useTransform(scrollYProgress, [0, 0.5], [-80, 0]);
//   const rightX = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
//   const fadeIn = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

//   return (
//     <section ref={ref} className="noise" style={{ padding: "160px 40px", position: "relative", overflow: "hidden", background: "var(--cream)" }}>
//       {/* Ambient glow */}
//       <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} aria-hidden />

//       <FadeUp style={{ textAlign: "center", marginBottom: 100 }}>
//         <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blue-vivid)", marginBottom: 16 }}>Our Foundation</p>
//         <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.02em" }}>
//           Mission &amp; <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400 }}>Vision</span>
//         </h2>
//       </FadeUp>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 60, alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>

//         {/* MISSION — LEFT */}
//         <motion.div style={{ x: leftX, opacity: fadeIn }}>
//           <div style={{ textAlign: "right" }}>
//             <div style={{ display: "inline-block", background: "var(--blue-pale)", borderRadius: 12, padding: "6px 16px", fontSize: 11, fontWeight: 700, color: "var(--blue-vivid)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>Mission</div>
//             <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 28, lineHeight: 1.2, marginBottom: 20, letterSpacing: "-0.01em" }}>To engineer a healthcare ecosystem where precision meets compassion</h3>
//             <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>
//               We build clinical environments that eliminate friction, amplify trust, and make every patient feel they are receiving the world's most advanced care — regardless of complexity or condition.
//             </p>
//             {/* Energy lines (decorative) */}
//             <div style={{ marginTop: 32, display: "flex", gap: 8, justifyContent: "flex-end" }}>
//               {[60, 40, 80].map((w, i) => (
//                 <motion.div key={i} animate={{ scaleX: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
//                   style={{ width: w, height: 2, background: "linear-gradient(to right, transparent, var(--blue-vivid))", borderRadius: 2 }} />
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* CENTER ORB */}
//         <div style={{ position: "relative", width: 200, height: 200, flexShrink: 0 }}>
//           {/* Outer rings */}
//           {[200, 170, 140].map((size, i) => (
//             <div key={i} style={{ position: "absolute", top: "50%", left: "50%", width: size, height: size, borderRadius: "50%", border: `1px solid rgba(37,99,235,${0.15 - i * 0.04})`, transform: "translate(-50%,-50%)" }} />
//           ))}
//           {/* Rotating ring */}
//           <motion.div style={{ position: "absolute", top: "50%", left: "50%", width: 180, height: 180, borderRadius: "50%", border: "1.5px dashed rgba(37,99,235,0.25)", transform: "translate(-50%,-50%)", rotate }} />
//           {/* Core orb */}
//           <motion.div className="orb-breathe" style={{ position: "absolute", top: "50%", left: "50%", width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(ellipse at 40% 40%, #60A5FA, #2563EB)", transform: "translate(-50%,-50%)", boxShadow: "0 0 60px rgba(37,99,235,0.5), inset 0 0 20px rgba(255,255,255,0.2)" }} />
//           {/* Orbiting dots */}
//           <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}>
//             <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ position: "absolute" }}>
//               <div style={{ position: "absolute", top: -90, left: -5, width: 10, height: 10, borderRadius: "50%", background: "#fff", boxShadow: "0 0 10px rgba(37,99,235,0.8)" }} />
//             </motion.div>
//           </div>
//           <div style={{ position: "absolute", top: "50%", left: "50%", width: 0, height: 0 }}>
//             <motion.div animate={{ rotate: -360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} style={{ position: "absolute" }}>
//               <div style={{ position: "absolute", top: -70, left: -4, width: 8, height: 8, borderRadius: "50%", background: "#93C5FD" }} />
//             </motion.div>
//           </div>
//         </div>

//         {/* VISION — RIGHT */}
//         <motion.div style={{ x: rightX, opacity: fadeIn }}>
//           <div style={{ textAlign: "left" }}>
//             <div style={{ display: "inline-block", background: "rgba(15,15,30,0.06)", borderRadius: 12, padding: "6px 16px", fontSize: 11, fontWeight: 700, color: "var(--ink)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>Vision</div>
//             <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 28, lineHeight: 1.2, marginBottom: 20, letterSpacing: "-0.01em" }}>To become Pakistan's most trusted integrated healthcare ecosystem</h3>
//             <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>
//               A future where every clinical touchpoint is predictive, every patient interaction is personalised, and every outcome is measurably better than the global standard.
//             </p>
//             <div style={{ marginTop: 32, display: "flex", gap: 8 }}>
//               {[80, 40, 60].map((w, i) => (
//                 <motion.div key={i} animate={{ scaleX: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
//                   style={{ width: w, height: 2, background: "linear-gradient(to right, var(--blue-vivid), transparent)", borderRadius: 2 }} />
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 5 — MANIFESTO (WORD REVEAL)
// ═══════════════════════════════════════════════════════════ */
// function ManifestoSection() {
//   const words = ["Technology", "Enhances", "Care.", "Humanity", "Delivers", "It."];
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

//   return (
//     <section ref={ref} className="noise" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "var(--ink-soft)" }}>

//       {/* Particles */}
//       {[...Array(20)].map((_, i) => (
//         <motion.div key={i} aria-hidden
//           animate={{ y: [-20, -200], opacity: [0.6, 0], x: [0, (Math.random() - 0.5) * 100] }}
//           transition={{ duration: 4 + Math.random() * 4, delay: Math.random() * 4, repeat: Infinity, ease: "easeOut" }}
//           style={{ position: "absolute", bottom: `${Math.random() * 50}%`, left: `${Math.random() * 100}%`, width: 3 + Math.random() * 4, height: 3 + Math.random() * 4, borderRadius: "50%", background: `rgba(${59 + Math.random() * 100},130,246,${0.3 + Math.random() * 0.5})`, pointerEvents: "none" }}
//         />
//       ))}

//       {/* Soft light beams */}
//       <div style={{ position: "absolute", inset: 0, overflow: "hidden" }} aria-hidden>
//         <div style={{ position: "absolute", top: "-20%", left: "20%", width: "60%", height: "80%", background: "radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)", filter: "blur(80px)" }} />
//         <div style={{ position: "absolute", bottom: "-20%", right: "10%", width: "40%", height: "60%", background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
//       </div>

//       <div style={{ textAlign: "center", maxWidth: 900, padding: "0 40px", position: "relative", zIndex: 2 }}>
//         <FadeUp>
//           <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(59,130,246,0.7)", marginBottom: 40 }}>Our Manifesto</p>
//         </FadeUp>

//         <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 20px", marginBottom: 60 }}>
//           {words.map((word, i) => {
//             const progress = useTransform(scrollYProgress, [i / (words.length + 2), (i + 1.5) / (words.length + 2)], [0, 1]);
//             const wordOpacity = useTransform(progress, [0, 1], [0.1, 1]);
//             const wordY = useTransform(progress, [0, 1], [30, 0]);
//             const isAccent = word.includes(".");
//             return (
//               <motion.span key={i} style={{ opacity: wordOpacity, y: wordY, fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(42px, 7vw, 84px)", lineHeight: 1.1, letterSpacing: "-0.03em", color: isAccent ? "var(--blue-mid)" : "#fff", display: "inline-block" }}>
//                 {word}&nbsp;
//               </motion.span>
//             );
//           })}
//         </div>

//         <FadeUp delay={0.3}>
//           <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 540, margin: "0 auto", fontWeight: 300 }}>
//             We build systems that serve physicians so physicians can serve patients.
//             Our technology disappears into the background. Only healing remains visible.
//           </p>
//         </FadeUp>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 6 — CONSTELLATION VALUES
// ═══════════════════════════════════════════════════════════ */
// const valuesData = [
//   { id: "compassion", label: "Compassion", x: 50, y: 15, desc: "Every patient interaction rooted in genuine human empathy and dignity." },
//   { id: "trust", label: "Trust", x: 85, y: 35, desc: "Transparent, accountable, and honest in every clinical and administrative action." },
//   { id: "innovation", label: "Innovation", x: 75, y: 70, desc: "Continuously adopting evidence-based technology to improve outcomes." },
//   { id: "excellence", label: "Excellence", x: 25, y: 75, desc: "Uncompromising standards in clinical accuracy, safety, and facility quality." },
//   { id: "integrity", label: "Integrity", x: 15, y: 40, desc: "Transparent pricing, honest communication, and zero hidden agendas." },
//   { id: "patientfirst", label: "Patient First", x: 50, y: 52, desc: "Every decision, system, and protocol is designed around the patient's wellbeing." },
// ];

// const connections = [
//   [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5]
// ];

// function ConstellationSection() {
//   const [hoveredNode, setHoveredNode] = useState(null);
//   const containerRef = useRef(null);
//   const inView = useInView(containerRef, { once: true });

//   return (
//     <section className="noise" style={{ padding: "160px 40px", background: "#F8FAFF", position: "relative", overflow: "hidden" }}>
//       <FadeUp style={{ textAlign: "center", marginBottom: 80 }}>
//         <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blue-vivid)", marginBottom: 16 }}>What We Stand For</p>
//         <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.02em" }}>
//           Our Core <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400 }}>Values</span>
//         </h2>
//         <p style={{ color: "var(--muted)", marginTop: 16, fontSize: 15, fontWeight: 300 }}>Hover each node to explore</p>
//       </FadeUp>

//       <div ref={containerRef} style={{ position: "relative", width: "100%", maxWidth: 700, margin: "0 auto", height: 460 }}>

//         {/* SVG Connection Lines */}
//         <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
//           {connections.map(([a, b], i) => {
//             const nodeA = valuesData[a];
//             const nodeB = valuesData[b];
//             const isActive = hoveredNode === nodeA.id || hoveredNode === nodeB.id;
//             return (
//               <motion.line key={i}
//                 x1={`${nodeA.x}%`} y1={`${nodeA.y}%`}
//                 x2={`${nodeB.x}%`} y2={`${nodeB.y}%`}
//                 stroke={isActive ? "rgba(37,99,235,0.6)" : "rgba(37,99,235,0.12)"}
//                 strokeWidth={isActive ? 1.5 : 0.8}
//                 strokeDasharray="5 5"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={inView ? { pathLength: 1, opacity: 1 } : {}}
//                 transition={{ duration: 1.2, delay: i * 0.08 }}
//                 style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
//               />
//             );
//           })}
//         </svg>

//         {/* Value Nodes */}
//         {valuesData.map((v, i) => {
//           const isHovered = hoveredNode === v.id;
//           const isCenter = v.id === "patientfirst";
//           return (
//             <motion.div
//               key={v.id}
//               initial={{ opacity: 0, scale: 0 }}
//               animate={inView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
//               onMouseEnter={() => setHoveredNode(v.id)}
//               onMouseLeave={() => setHoveredNode(null)}
//               style={{
//                 position: "absolute",
//                 left: `${v.x}%`, top: `${v.y}%`,
//                 transform: "translate(-50%, -50%)",
//                 zIndex: isHovered ? 10 : 1,
//                 cursor: "none",
//               }}
//             >
//               {/* Pulse ring */}
//               <AnimatePresence>
//                 {isHovered && (
//                   <motion.div initial={{ scale: 0.5, opacity: 0.8 }} animate={{ scale: 2.5, opacity: 0 }} exit={{ opacity: 0 }}
//                     transition={{ duration: 1, repeat: Infinity }}
//                     style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isCenter ? 80 : 60, height: isCenter ? 80 : 60, borderRadius: "50%", border: "1px solid rgba(37,99,235,0.5)", pointerEvents: "none" }} />
//                 )}
//               </AnimatePresence>

//               {/* Node */}
//               <motion.div
//                 animate={{ scale: isHovered ? 1.2 : 1 }}
//                 transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
//                 style={{
//                   width: isCenter ? 90 : 70, height: isCenter ? 90 : 70,
//                   borderRadius: "50%",
//                   background: isHovered
//                     ? "linear-gradient(135deg, #2563EB, #1D4ED8)"
//                     : isCenter
//                       ? "linear-gradient(135deg, #EFF6FF, #DBEAFE)"
//                       : "rgba(255,255,255,0.9)",
//                   border: `2px solid ${isHovered ? "rgba(37,99,235,0.8)" : isCenter ? "rgba(37,99,235,0.4)" : "rgba(37,99,235,0.15)"}`,
//                   backdropFilter: "blur(10px)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   flexDirection: "column",
//                   boxShadow: isHovered ? "0 20px 60px rgba(37,99,235,0.3)" : "0 4px 20px rgba(15,15,30,0.08)",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 <span style={{ fontSize: isCenter ? 10 : 9, fontWeight: 700, textAlign: "center", lineHeight: 1.3, color: isHovered ? "#fff" : isCenter ? "var(--blue-vivid)" : "var(--ink)", letterSpacing: "0.05em", textTransform: "uppercase", padding: "0 6px" }}>
//                   {v.label}
//                 </span>
//               </motion.div>

//               {/* Tooltip */}
//               <AnimatePresence>
//                 {isHovered && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10, scale: 0.9 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 10, scale: 0.9 }}
//                     transition={{ duration: 0.2 }}
//                     style={{
//                       position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)",
//                       background: "rgba(10,10,15,0.92)", backdropFilter: "blur(16px)",
//                       border: "1px solid rgba(255,255,255,0.1)",
//                       borderRadius: 14, padding: "14px 18px",
//                       width: 220, zIndex: 20,
//                       boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
//                     }}
//                   >
//                     <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{v.desc}</p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 7 — FACILITY EXPERIENCE
// ═══════════════════════════════════════════════════════════ */
// const facilities = [
//   { name: "ICU", full: "Intensive Care Unit", img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1400&q=90", stat: "20 Beds", desc: "Round-the-clock hemodynamic monitoring with dedicated intensivists and advanced life support.", color: "#1E3A8A", accent: "#3B82F6" },
//   { name: "OT", full: "Surgical Theatre", img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1400&q=90", stat: "6 Theatres", desc: "Robotic-assisted surgical environments with laminar flow and 4K imaging systems.", color: "#1C1C28", accent: "#60A5FA" },
//   { name: "LAB", full: "Diagnostics Laboratory", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1400&q=90", stat: "ISO 15189", desc: "Automated molecular diagnostic labs delivering same-day, error-free results.", color: "#0C2A4A", accent: "#93C5FD" },
//   { name: "RX", full: "In-House Pharmacy", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1400&q=90", stat: "24/7 Open", desc: "Fully stocked dispensary integrated with digital prescriptions for instant verification.", color: "#14532D", accent: "#6EE7B7" },
//   { name: "VIP", full: "Patient Lounge", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=90", stat: "Premium", desc: "Curated waiting environment with concierge service, Wi-Fi, and ambient comfort design.", color: "#2D1B69", accent: "#A78BFA" },
//   { name: "PKG", full: "Parking Facility", img: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1400&q=90", stat: "200+ Slots", desc: "Multi-level covered parking with valet service, EV charging, and direct clinic access.", color: "#1C2526", accent: "#94A3B8" },
// ];

// function FacilitySection() {
//   const [active, setActive] = useState(0);
//   const f = facilities[active];

//   return (
//     <section style={{ position: "relative", overflow: "hidden" }}>
//       {/* Full-screen background morph */}
//       <AnimatePresence mode="sync">
//         <motion.div key={active}
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//           transition={{ duration: 1.2 }}
//           style={{ position: "absolute", inset: 0, zIndex: 0 }}
//         >
//           <img src={f.img} alt={f.full} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) saturate(0.7)" }} />
//           <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${f.color}CC 0%, rgba(10,10,15,0.8) 100%)` }} />
//         </motion.div>
//       </AnimatePresence>

//       <div style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column", padding: "100px 60px 60px" }}>
//         <FadeUp>
//           <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>Our Infrastructure</p>
//           <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(32px, 4vw, 52px)", color: "#fff", letterSpacing: "-0.02em", marginBottom: 60 }}>
//             World-Class <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, color: f.accent }}>Facilities</span>
//           </h2>
//         </FadeUp>

//         {/* Tab buttons */}
//         <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 60 }}>
//           {facilities.map((fc, i) => (
//             <motion.button key={i} onClick={() => setActive(i)}
//               whileTap={{ scale: 0.95 }}
//               style={{
//                 padding: "10px 20px", borderRadius: 100, fontSize: 12, fontWeight: 700,
//                 letterSpacing: "0.08em", textTransform: "uppercase", cursor: "none",
//                 background: active === i ? "#fff" : "rgba(255,255,255,0.1)",
//                 color: active === i ? "var(--ink)" : "rgba(255,255,255,0.6)",
//                 border: `1px solid ${active === i ? "#fff" : "rgba(255,255,255,0.15)"}`,
//                 backdropFilter: "blur(10px)", transition: "all 0.3s ease", fontFamily: "DM Sans",
//               }}
//             >
//               {fc.name}
//             </motion.button>
//           ))}
//         </div>

//         {/* Facility content */}
//         <div style={{ maxWidth: 600 }}>
//           <AnimatePresence mode="wait">
//             <motion.div key={active}
//               initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
//               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//               exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
//               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <div style={{ display: "inline-block", background: f.accent + "30", border: `1px solid ${f.accent}50`, borderRadius: 100, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: f.accent, marginBottom: 20, letterSpacing: "0.06em" }}>
//                 {f.stat}
//               </div>
//               <h3 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(40px, 6vw, 72px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: 24 }}>
//                 {f.full}
//               </h3>
//               <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontWeight: 300, maxWidth: 480 }}>
//                 {f.desc}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Facility image panel (bottom right) */}
//         <AnimatePresence mode="wait">
//           <motion.div key={active}
//             initial={{ opacity: 0, x: 60, scale: 0.95 }}
//             animate={{ opacity: 1, x: 0, scale: 1 }}
//             exit={{ opacity: 0, x: -60 }}
//             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             className="glass-card"
//             style={{ position: "absolute", right: 60, bottom: 80, width: 340, height: 220, borderRadius: 20, overflow: "hidden" }}
//           >
//             <img src={f.img} alt={f.full} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//             <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
//             <div style={{ position: "absolute", bottom: 16, left: 16 }}>
//               <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{f.full}</div>
//               <div style={{ fontSize: 11, color: f.accent, fontWeight: 600, marginTop: 2 }}>{f.stat}</div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 8 — AWARDS WALL
// ═══════════════════════════════════════════════════════════ */
// const awards = [
//   { title: "JCI Accredited", org: "Joint Commission International", year: "2016", type: "Accreditation" },
//   { title: "ISO 9001:2015", org: "International Standards Organisation", year: "2018", type: "Certification" },
//   { title: "National Excellence Award", org: "Pakistan Health Ministry", year: "2022", type: "Award" },
//   { title: "WHO Compliant", org: "World Health Organisation", year: "2019", type: "Compliance" },
//   { title: "Best Patient Experience", org: "Healthcare Awards PK", year: "2023", type: "Award" },
//   { title: "Digital Innovation Prize", org: "MedTech Pakistan", year: "2024", type: "Innovation" },
// ];

// function AwardsSection() {
//   const [spotlightIdx, setSpotlightIdx] = useState(null);

//   return (
//     <section className="noise" style={{ padding: "160px 60px", background: "var(--cream)", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 600, background: "radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)", pointerEvents: "none" }} aria-hidden />

//       <FadeUp style={{ textAlign: "center", marginBottom: 80 }}>
//         <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--blue-vivid)", marginBottom: 16 }}>Recognition</p>
//         <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.02em" }}>
//           Awards &amp; <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400 }}>Accreditations</span>
//         </h2>
//       </FadeUp>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
//         {awards.map((a, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: i * 0.08 }}
//             onMouseEnter={() => setSpotlightIdx(i)}
//             onMouseLeave={() => setSpotlightIdx(null)}
//             className="glass-card plaque-glow"
//             style={{
//               borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden", cursor: "none",
//               transform: spotlightIdx === i ? "translateY(-6px) scale(1.02)" : "none",
//               transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
//             }}
//           >
//             {/* Spotlight beam on hover */}
//             <AnimatePresence>
//               {spotlightIdx === i && (
//                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                   style={{ position: "absolute", top: -50, left: "30%", width: "40%", height: "150%", background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)", transform: "skewX(-20deg)", pointerEvents: "none" }} />
//               )}
//             </AnimatePresence>

//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
//               <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--blue-vivid)", background: "var(--blue-pale)", padding: "4px 12px", borderRadius: 100 }}>{a.type}</span>
//               <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>{a.year}</span>
//             </div>

//             {/* Decorative plaque icon */}
//             <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, var(--blue-pale), #DBEAFE)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 20 }}>
//               🏆
//             </div>

//             <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, marginBottom: 8, letterSpacing: "-0.01em" }}>{a.title}</h3>
//             <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 400 }}>{a.org}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 9 — CINEMATIC WALKTHROUGH
// ═══════════════════════════════════════════════════════════ */
// const walkthrough = [
//   { label: "Entering Reception", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=90", caption: "A space designed to reassure the moment you arrive." },
//   { label: "Patient Lounge", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=90", caption: "Comfort as a clinical consideration, not an afterthought." },
//   { label: "Advanced Laboratory", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1600&q=90", caption: "Precision diagnostics. Real-time results. Zero error." },
//   { label: "Operation Theatre", img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600&q=90", caption: "Where expert hands and intelligent systems operate as one." },
// ];

// function WalkthroughSection() {
//   return (
//     <section style={{ background: "var(--ink)" }}>
//       <FadeUp style={{ textAlign: "center", padding: "100px 40px 60px" }}>
//         <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(59,130,246,0.6)", marginBottom: 16 }}>Virtual Tour</p>
//         <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", color: "#fff", letterSpacing: "-0.02em" }}>
//           Step Inside Our <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, color: "var(--blue-mid)" }}>World</span>
//         </h2>
//       </FadeUp>

//       {walkthrough.map((w, i) => {
//         const ref = useRef(null);
//         const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//         const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
//         const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

//         return (
//           <motion.div key={i} ref={ref} style={{ height: "90vh", position: "relative", overflow: "hidden" }}>
//             <motion.div style={{ scale, position: "absolute", inset: 0 }}>
//               <img src={w.img} alt={w.label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(0.8)" }} />
//               <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,15,0.8) 0%, transparent 60%)" }} />
//             </motion.div>

//             <motion.div style={{ y, position: "absolute", left: 80, bottom: 80, zIndex: 2 }}>
//               <motion.div
//                 initial={{ opacity: 0, x: -40 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
//               >
//                 <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(32px, 5vw, 64px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16 }}>
//                   {w.label}
//                 </div>
//                 <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", fontWeight: 300, maxWidth: 420 }}>{w.caption}</p>
//               </motion.div>
//             </motion.div>

//             <div style={{ position: "absolute", right: 60, top: "50%", transform: "translateY(-50%)", fontFamily: "Syne", fontWeight: 800, fontSize: 120, color: "rgba(255,255,255,0.04)", userSelect: "none" }}>0{i + 1}</div>
//           </motion.div>
//         );
//       })}
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    SECTION 10 — FINAL CTA
// ═══════════════════════════════════════════════════════════ */
// function FinalSection() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
//   const bgY = useTransform(scrollYProgress, [0, 1], [60, 0]);

//   return (
//     <section ref={ref} className="noise" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink-soft)" }}>

//       {/* Doctor image as background */}
//       <motion.div style={{ y: bgY, position: "absolute", inset: 0, zIndex: 0 }}>
//         <img src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=1600&q=90" alt="Doctor" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.2) saturate(0.5)" }} />
//         <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--ink-soft) 0%, rgba(28,28,40,0.7) 50%, var(--ink-soft) 100%)" }} />
//       </motion.div>

//       {/* Floating gradient orbs */}
//       <div aria-hidden style={{ position: "absolute", top: "20%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)", filter: "blur(80px)" }} />
//       <div aria-hidden style={{ position: "absolute", bottom: "20%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)", filter: "blur(60px)" }} />

//       {/* Particles */}
//       {[...Array(15)].map((_, i) => (
//         <motion.div key={i} aria-hidden
//           animate={{ y: [-10, -150], opacity: [0.5, 0], x: [(Math.random() - 0.5) * 60] }}
//           transition={{ duration: 5 + Math.random() * 3, delay: Math.random() * 3, repeat: Infinity, ease: "easeOut" }}
//           style={{ position: "absolute", bottom: `${10 + Math.random() * 40}%`, left: `${Math.random() * 100}%`, width: 2 + Math.random() * 3, height: 2 + Math.random() * 3, borderRadius: "50%", background: "rgba(147,197,253,0.6)", pointerEvents: "none" }}
//         />
//       ))}

//       <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 40px", maxWidth: 900 }}>
//         <FadeUp>
//           <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(147,197,253,0.7)", marginBottom: 32 }}>Begin Your Journey</p>
//         </FadeUp>

//         <FadeUp delay={0.15} blur>
//           <h2 style={{ fontFamily: "Syne", fontWeight: 800, fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "#fff", marginBottom: 32 }}>
//             A healthcare<br />
//             <span style={{ fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400, color: "#93C5FD" }}>designed around</span>
//             <br />people
//           </h2>
//         </FadeUp>

//         <FadeUp delay={0.3}>
//           <p style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 56px", fontWeight: 300 }}>
//             Experience a clinic where every detail — from your first appointment to your last follow-up — is orchestrated with intention.
//           </p>
//         </FadeUp>

//         <FadeUp delay={0.45}>
//           <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
//             {[
//               { label: "Book Appointment", style: { background: "var(--blue-vivid)", color: "#fff", border: "none" } },
//               { label: "Online Consultation", style: { background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" } },
//               { label: "Meet Our Doctors", style: { background: "transparent", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)" } },
//             ].map((btn, i) => (
//               <motion.button key={i}
//                 whileHover={{ scale: 1.06, y: -3 }}
//                 whileTap={{ scale: 0.97 }}
//                 style={{ ...btn.style, padding: "14px 32px", borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: "none", fontFamily: "DM Sans", transition: "box-shadow 0.3s ease" }}
//                 onMouseEnter={e => e.currentTarget.style.boxShadow = "0 20px 50px rgba(37,99,235,0.35)"}
//                 onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
//               >
//                 {btn.label}
//               </motion.button>
//             ))}
//           </div>
//         </FadeUp>

//         {/* Bottom contact bar */}
//         <FadeUp delay={0.6}>
//           <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center", paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
//             {[
//               { icon: "📍", label: "Phase 6, DHA, Karachi, PK" },
//               { icon: "📞", label: "+92 21 111 254 642" },
//               { icon: "🚑", label: "Emergency: 1122" },
//             ].map((c, i) => (
//               <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>
//                 <span>{c.icon}</span>
//                 <span>{c.label}</span>
//               </div>
//             ))}
//           </div>
//         </FadeUp>
//       </div>
//     </section>
//   );
// }

// /* ═══════════════════════════════════════════════════════════
//    ROOT EXPORT
// ═══════════════════════════════════════════════════════════ */
// export default function AboutPremium({ onNavigate }) {
//   return (
//     <>
//       <GlobalStyles />
//       <CustomCursor />
//       <Navbar />
//       <main>
//         <HeroSection />
//         <div className="section-sep" />
//         <StatsSection />
//         <TimelineSection />
//         <MissionVisionSection />
//         <ManifestoSection />
//         <ConstellationSection />
//         <FacilitySection />
//         <AwardsSection />
//         <WalkthroughSection />
//         <FinalSection />
//       </main>
//     </>
//   );
// }






















