import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiBriefcase, FiMapPin, FiUser, FiDollarSign, FiCalendar, FiCheck, FiChevronDown, FiX, FiMail,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { LuCoins, LuBookOpen, LuHospital, LuClock, LuRocket, LuHandshake, LuBriefcase, LuPartyPopper } from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const JOB_OPENINGS = [
  {
    id: 1,
    title: "Senior Dermatologist",
    department: "Dermatology",
    type: "Full-Time",
    location: "Lahore (DHA)",
    experience: "5+ years",
    salary: "PKR 3,50,000 – 5,00,000",
    deadline: "July 15, 2026",
    color: "#e91e8c",
    bg: "#fce4ec",
    urgent: true,
    description: "We are looking for a board-certified Dermatologist with expertise in laser procedures, cosmetic dermatology, and skin disease management. FCPS or equivalent required.",
    requirements: ["FCPS/MCPS in Dermatology", "Experience with laser devices (Fractional CO₂, Q-Switch)", "Excellent patient communication skills", "Willingness to work flexible hours"],
  },
  {
    id: 2,
    title: "Orthopedic Surgeon",
    department: "Orthopedics",
    type: "Full-Time",
    location: "Islamabad",
    experience: "7+ years",
    salary: "PKR 4,00,000 – 6,50,000",
    deadline: "July 20, 2026",
    color: "#0ea5e9",
    bg: "#e0f2fe",
    urgent: true,
    description: "Seeking an experienced Orthopedic Surgeon specializing in minimally invasive joint surgeries and sports medicine. Fellowship training in arthroscopy is a strong plus.",
    requirements: ["FCPS Orthopedic Surgery or equivalent", "Proficiency in arthroscopic procedures", "Strong surgical and post-op management skills", "Active medical license from PMDC"],
  },
  {
    id: 3,
    title: "Dental Officer",
    department: "Dental Care",
    type: "Full-Time",
    location: "Rawalpindi",
    experience: "2+ years",
    salary: "PKR 1,20,000 – 1,80,000",
    deadline: "July 10, 2026",
    color: "#a78bfa",
    bg: "#ede9fe",
    urgent: false,
    description: "Looking for a passionate Dental Officer with proficiency in routine dental care, minor oral surgeries, and cosmetic procedures including teeth whitening and veneers.",
    requirements: ["BDS from recognized institution", "PMDC registered", "Experience in cosmetic dentistry preferred", "Friendly chairside manner"],
  },
  {
    id: 4,
    title: "Registered Nurse – ICU",
    department: "Nursing",
    type: "Full-Time",
    location: "Lahore (DHA)",
    experience: "3+ years",
    salary: "PKR 80,000 – 1,20,000",
    deadline: "June 30, 2026",
    color: "#34d399",
    bg: "#d1fae5",
    urgent: true,
    description: "We need experienced ICU nurses who can handle critical care patients, operate ventilators, and work efficiently under pressure in our expanding inpatient department.",
    requirements: ["BSN or Post-RN BSN degree", "ICU/CCU experience mandatory", "BLS/ACLS certification", "Ability to work rotating shifts"],
  },
  {
    id: 5,
    title: "Medical Receptionist",
    department: "Administration",
    type: "Full-Time",
    location: "All Branches",
    experience: "1+ year",
    salary: "PKR 50,000 – 70,000",
    deadline: "July 5, 2026",
    color: "#ff7f50",
    bg: "#fff0eb",
    urgent: false,
    description: "We are expanding our reception teams across all branches. Ideal candidates are organized, warm, and tech-savvy with experience in a clinical or hospitality environment.",
    requirements: ["Graduation from recognized university", "Fluent in Urdu & English", "Basic computer proficiency", "Professional appearance and communication"],
  },
  {
    id: 6,
    title: "Social Media & Content Manager",
    department: "Marketing",
    type: "Full-Time",
    location: "Lahore (DHA)",
    experience: "2+ years",
    salary: "PKR 90,000 – 1,30,000",
    deadline: "July 12, 2026",
    color: "#f59e0b",
    bg: "#fef3c7",
    urgent: false,
    description: "Looking for a creative content professional who understands the healthcare space and can build an engaging digital presence across Instagram, YouTube, and LinkedIn.",
    requirements: ["Degree in Marketing/Communications/Media", "Proven social media portfolio", "Video editing skills (Reels, Shorts)", "Healthcare content knowledge a plus"],
  },
];

const CAREER_PERKS = [
  { icon: LuCoins, title: "Competitive Pay", desc: "Above-market salaries reviewed annually with performance bonuses" },
  { icon: LuBookOpen, title: "CPD & Training", desc: "Fully funded Continuing Professional Development programs & workshops" },
  { icon: LuHospital, title: "Health Coverage", desc: "Free medical care for you and immediate family at all Premium branches" },
  { icon: LuClock, title: "Flexible Hours", desc: "Multiple shift options and part-time arrangements for certain roles" },
  { icon: LuRocket, title: "Career Growth", desc: "Clear promotion pathways, mentoring, and leadership development programs" },
  { icon: LuHandshake, title: "Great Culture", desc: "Collaborative, respectful environment focused on excellence and compassion" },
];

function JobCard({ job, index, onApply }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 overflow-hidden relative text-left"
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, ${job.color}, #e91e8c)` }} />

      {job.urgent && (
        <span className="absolute top-4 right-4 text-xs font-black px-2.5 py-1 rounded-full text-white" style={{ background: "#ef4444" }}>Urgent</span>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: job.bg }}>
          <LuBriefcase size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-slate-800 text-base leading-tight">{job.title}</h3>
          <p className="text-sm font-semibold mt-0.5" style={{ color: job.color }}>{job.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { icon: FiMapPin, text: job.location },
          { icon: FiBriefcase, text: job.type },
          { icon: FiUser, text: job.experience },
          { icon: FiDollarSign, text: job.salary },
        ].map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
            <Icon size={11} style={{ color: job.color }} />
            <span className="truncate">{text}</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">{job.description}</p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Requirements</p>
            <ul className="space-y-1.5">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                  <FiCheck size={12} className="mt-0.5 flex-shrink-0" style={{ color: job.color }} />
                  {req}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
              <FiCalendar size={11} />
              <span>Deadline: <strong className="text-slate-600">{job.deadline}</strong></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onApply(job)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white shadow-md cursor-pointer"
          style={{ background: `linear-gradient(135deg, ${job.color}, #e91e8c)` }}
        >
          Apply Now
        </motion.button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer"
          style={{ borderColor: job.color + "40", color: job.color, background: job.bg }}
        >
          {expanded ? "Less" : "Details"}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <FiChevronDown size={12} />
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
}

export default function Careers({ onBookAppointment }) {
  const [appliedJob, setAppliedJob] = useState(null);
  const whatsappNumber = "923008786187";

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      <Navbar onBookAppointment={onBookAppointment} />

      {/* Apply Modal */}
      <AnimatePresence>
        {appliedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setAppliedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setAppliedJob(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer">
                <FiX size={14} />
              </button>
              <LuPartyPopper size={36} className="text-pink-500 mb-3" />
              <h3 className="text-xl font-black text-slate-800 mb-1">Apply for {appliedJob.title}</h3>
              <p className="text-slate-500 text-sm mb-6">Send your CV and cover letter to our HR team. We review applications within 3–5 working days.</p>
              <div className="space-y-3">
                <a
                  href={`mailto:hr@vitalphysiohub.com?subject=Application for ${appliedJob.title}`}
                  className="flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg"
                  style={{ background: THEME.gradBtn, textDecoration: "none" }}
                >
                  <FiMail size={16} />
                  Send CV via Email
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'd like to apply for the ${appliedJob.title} position at Premium Clinic.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-2xl font-bold text-sm"
                  style={{ background: "#d1fae5", color: "#065f46", textDecoration: "none" }}
                >
                  <FaWhatsapp size={16} />
                  Apply via WhatsApp
                </a>
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">hr@vitalphysiohub.com · +92 300 8786187</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-10 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-sm" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", color: THEME.pink, border: "1px solid #fce4ec" }}>
            <HiSparkles size={13} />
            Join Pakistan's Premier Healthcare Team
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="text-4xl sm:text-6xl font-black text-slate-800 mb-3 leading-tight">
            Careers &{" "}
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Jobs</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
            Explore active career opportunities across all clinic branches. We provide competitive salaries, flex schedules, and continuing education.
          </motion.p>
        </div>
      </section>

      {/* OPEN POSITIONS & BENEFITS */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Open Jobs list */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 text-left">
              <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
              <h2 className="text-2xl font-black text-slate-800">Active Job Openings</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {JOB_OPENINGS.map((job, idx) => (
                <JobCard key={job.id} job={job} index={idx} onApply={setAppliedJob} />
              ))}
            </div>
          </div>

          {/* Perks sidebar */}
          <div className="text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
              <h2 className="text-2xl font-black text-slate-800">Job Benefits</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {CAREER_PERKS.map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                  <span className="bg-slate-50 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"><Icon size={20} className="text-sky-500" /></span>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">{title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
