import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiBriefcase, FiMapPin, FiUser, FiDollarSign, FiCalendar, FiCheck, FiChevronDown, FiX, FiMail, FiPhone, FiUpload, FiSend, FiCheckCircle, FiShield, FiBookOpen, FiLock, FiZap, FiFileText
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { LuCoins, LuBookOpen, LuHospital, LuClock, LuRocket, LuHandshake, LuBriefcase, LuPartyPopper } from "react-icons/lu";
import Navbar from "../components/Navbar";
import SEOHead from "../components/SEOHead";
import { api } from "../services/api";

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const DEPT_STYLES = {
  Physiotherapy: { color: "#0ea5e9", bg: "#e0f2fe" },
  Chiropractic: { color: "#e91e8c", bg: "#fce4ec" },
  Dermatology: { color: "#e91e8c", bg: "#fce4ec" },
  Orthopedics: { color: "#0ea5e9", bg: "#e0f2fe" },
  default: { color: "#a78bfa", bg: "#ede9fe" }
};

const DEFAULT_JOBS = [
  {
    id: 1,
    title: "Senior Physiotherapist",
    department: "Physiotherapy",
    type: "Full-Time",
    location: "Islamabad (Blue Area)",
    experience: "5+ years",
    salary: "PKR 1,50,000 - 2,50,000",
    deadline: "July 25, 2026",
    description: "We are looking for a senior manual physical therapist to lead our sports rehab and skeletal adjustments wing. Master's degree or equivalent clinical training required.",
    requirements: ["PT/DPT or equivalent degree", "Demonstrated experience in manual therapy adjustive techniques", "Excellent diagnostic and patient care abilities", "Strong team coordination skills"]
  },
  {
    id: 2,
    title: "Chiropractor",
    department: "Chiropractic",
    type: "Full-Time",
    location: "Islamabad (DHA Phase 2)",
    experience: "3+ years",
    salary: "PKR 2,00,000 - 3,50,000",
    deadline: "July 30, 2026",
    description: "Seeking a certified Chiropractor with hands-on expertise in spinal manipulation, decompression therapy, and posture correction.",
    requirements: ["Doctor of Chiropractic (DC) or equivalent board certification", "3+ years clinical experience", "Active registration with PMDC", "Familiarity with biomechanical posture mapping"]
  }
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

  const style = DEPT_STYLES[job.department] || DEPT_STYLES.default;
  const color = job.color || style.color;
  const bg = job.bg || style.bg;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 overflow-hidden relative text-left"
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, ${color}, #e91e8c)` }} />

      {job.urgent && (
        <span className="absolute top-4 right-4 text-xs font-black px-2.5 py-1 rounded-full text-white" style={{ background: "#ef4444" }}>Urgent</span>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
          <LuBriefcase size={22} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-slate-800 text-base leading-tight">{job.title}</h3>
          <p className="text-sm font-semibold mt-0.5" style={{ color: color }}>{job.department}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { icon: FiMapPin, text: job.location },
          { icon: FiBriefcase, text: job.type },
          { icon: FiDollarSign, text: job.salary },
          { icon: FiCalendar, text: `Exp: ${job.experience}` },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500 font-medium truncate">
              <Icon size={13} className="text-slate-400 shrink-0" />
              <span className="truncate">{item.text}</span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{job.description}</p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 pt-3 border-t border-slate-100 space-y-2 text-left"
          >
            <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Requirements & Skills</h4>
            <ul className="space-y-1 text-xs text-slate-600">
              {job.requirements?.map((req, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FiCheck size={13} className="text-emerald-500 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        <button
          onClick={() => onApply(job)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition-all cursor-pointer border-none"
          style={{ background: THEME.gradBtn }}
        >
          Apply Now
        </button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer bg-white"
          style={{ borderColor: color + "40", color: color }}
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
  const [jobs, setJobs] = useState(DEFAULT_JOBS);
  const [appliedJob, setAppliedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("jobs"); // "jobs" | "internship"
  const [settings, setSettings] = useState({ clinic_phone: "+92 300 8786187", clinic_email: "info@vitalphysiohub.com" });

  // Internship Form State
  const [internForm, setInternForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    qualification: "",
    institution: "",
    duration: "3 Months Clinical Rotation",
    resume_file: "",
    resume_name: "",
    cover_letter: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    api.getCareers().then(data => {
      if (data && data.length > 0) setJobs(data);
    });
    api.getSettings().then(data => {
      if (data) setSettings(data);
    });
  }, []);

  const whatsappNumber = settings.clinic_phone ? settings.clinic_phone.replace(/\D/g, "") : "923008786187";
  const hrEmail = settings.clinic_email || "hr@physiohub.com";

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Resume file size must be under 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setInternForm(prev => ({
          ...prev,
          resume_file: reader.result,
          resume_name: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInternSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    if (!internForm.resume_file) {
      setError("Please upload your CV / Resume file.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.submitApplication({
        type: "internship",
        full_name: internForm.full_name,
        email: internForm.email,
        phone: internForm.phone,
        qualification: internForm.qualification,
        institution: internForm.institution,
        duration: internForm.duration,
        resume_file: internForm.resume_file,
        resume_name: internForm.resume_name,
        cover_letter: internForm.cover_letter
      });
      if (res && res.success) {
        setSuccessMsg("🎓 Your Clinical Internship application has been received! Our medical education board will review your credentials and contact you.");
        setInternForm({
          full_name: "",
          email: "",
          phone: "",
          qualification: "",
          institution: "",
          duration: "3 Months Clinical Rotation",
          resume_file: "",
          resume_name: "",
          cover_letter: ""
        });
      } else {
        setError(res?.error || "Failed to submit internship application. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while submitting your internship application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      <SEOHead 
        title="Careers & Clinical Internship Rotations | Vital Physio Hub Islamabad"
        description="Join Vital Physio Hub's physical therapy clinical team or apply for certified Physical Therapy internship rotations in Islamabad."
        keywords="physiotherapy jobs Islamabad, physical therapist careers Islamabad, DPT internship rotation Islamabad, healthcare vacancies Pakistan"
        canonicalUrl="https://physiohub.com/careers"
      />
      <Navbar onBookAppointment={onBookAppointment} />

      {/* Apply Modal for Job Cards */}
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
              <button onClick={() => setAppliedJob(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer border-none">
                <FiX size={14} />
              </button>
              <LuPartyPopper size={36} className="text-pink-500 mb-3" />
              <h3 className="text-xl font-black text-slate-800 mb-1">Apply for {appliedJob.title}</h3>
              <p className="text-slate-500 text-sm mb-6">Send your CV and cover letter to our HR team. We review applications within 3–5 working days.</p>
              <div className="space-y-3">
                <a
                  href={`mailto:${hrEmail}?subject=Application for ${appliedJob.title}`}
                  className="flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg"
                  style={{ background: THEME.gradBtn, textDecoration: "none" }}
                >
                  <FiMail size={16} />
                  Send CV via Email
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'd like to apply for the ${appliedJob.title} position at Vital Physio Hub.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-2xl font-bold text-sm"
                  style={{ background: "#d1fae5", color: "#065f46", textDecoration: "none" }}
                >
                  <FaWhatsapp size={16} />
                  Apply via WhatsApp
                </a>
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">{hrEmail} · {settings.clinic_phone || "+92 300 8786187"}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-10 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 text-xs font-black uppercase tracking-widest text-pink-600 mb-4 shadow-xs"
          >
            <FiBriefcase className="text-pink-500 animate-pulse" /> Career Growth & Clinical Rotation
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="text-4xl sm:text-6xl font-black text-slate-800 mb-3 leading-tight font-serif">
            Jobs &{" "}
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Clinical Internship
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-medium">
            Explore open clinical & staff positions across our branches, or apply for our accredited Physical Therapy clinical internship program.
          </motion.p>

          {/* Toggle Tabs */}
          <div className="flex justify-center">
            <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-md flex items-center gap-1 max-w-md w-full">
              <button
                onClick={() => { setActiveTab("jobs"); setError(""); setSuccessMsg(""); }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all border-none cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === "jobs"
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <FiBriefcase size={16} /> Open Positions
              </button>
              <button
                onClick={() => { setActiveTab("internship"); setError(""); setSuccessMsg(""); }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all border-none cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === "internship"
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <FiBookOpen size={16} /> Clinical Internship
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Feedback Messages */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl mx-auto mb-8 px-4"
          >
            <div className="p-4 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 shadow-md text-left">
              <FiCheckCircle className="text-emerald-600 text-2xl shrink-0" />
              <span>{successMsg}</span>
            </div>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl mx-auto mb-8 px-4"
          >
            <div className="p-4 bg-rose-500/10 backdrop-blur-md border border-rose-500/30 text-rose-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 shadow-md text-left">
              <FiShield className="text-rose-600 text-2xl shrink-0" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB 1: OPEN JOBS & CAREERS */}
      {activeTab === "jobs" && (
        <section className="px-4 pb-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Open Jobs list */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6 text-left">
                <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
                <h2 className="text-2xl font-black text-slate-800 font-serif">Active Job Openings</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {jobs.map((job, idx) => (
                  <JobCard key={job.id} job={job} index={idx} onApply={setAppliedJob} />
                ))}
              </div>
            </div>

            {/* Perks sidebar */}
            <div className="text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
                <h2 className="text-2xl font-black text-slate-800 font-serif">Job Benefits</h2>
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
      )}

      {/* TAB 2: CLINICAL INTERNSHIP */}
      {activeTab === "internship" && (
        <section className="px-4 pb-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Left Column: Internship Program Highlights & Eligibility */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest block mb-1">Clinical Rotation & Training</span>
                <h2 className="text-3xl font-black text-slate-900 font-serif leading-tight">Physical Therapy Internship Program</h2>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                  Gain intensive, hands-on clinical training under PMDC & HEC board-certified senior physical therapy specialists at our flagship centers in Islamabad.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white/90 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-400/10 rounded-full blur-xl pointer-events-none" />
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <FiBookOpen className="text-pink-500" /> Internship Rotation Highlights
                  </h3>
                  <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100 font-medium">
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Direct patient evaluation & electrotherapy modality application</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Hands-on training in Spinal Decompression & Manual Adjustments</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Official Clinical Internship Completion Certificate upon evaluation</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Fast-track priority hiring for permanent staff therapist positions</li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
                  <h3 className="font-extrabold text-sm text-sky-300 flex items-center gap-2">
                    <FiShield /> Candidate Eligibility
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Open to enrolled 4th/5th year DPT students or fresh DPT / Sports Medicine graduates from recognized universities across Pakistan.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Ultra-Modern Glass Internship Form */}
            <div className="lg:col-span-7 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 via-rose-600 to-sky-500" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest block">Medical Board Review</span>
                  <h3 className="text-2xl font-black text-slate-900 font-serif">Apply for Clinical Internship</h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-lg border border-pink-100 shadow-xs">
                  <FiBookOpen />
                </div>
              </div>

              <form onSubmit={handleInternSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Full Name *</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      required
                      value={internForm.full_name}
                      onChange={e => setInternForm({ ...internForm, full_name: e.target.value })}
                      placeholder="e.g. Dr. Ayesha Tariq"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Email Address *</label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="email"
                        required
                        value={internForm.email}
                        onChange={e => setInternForm({ ...internForm, email: e.target.value })}
                        placeholder="ayesha@example.com"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Phone Number *</label>
                    <div className="relative">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="tel"
                        required
                        value={internForm.phone}
                        onChange={e => setInternForm({ ...internForm, phone: e.target.value })}
                        placeholder="03009876543"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Degree & University */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Degree / Year *</label>
                    <input
                      type="text"
                      required
                      value={internForm.qualification}
                      onChange={e => setInternForm({ ...internForm, qualification: e.target.value })}
                      placeholder="e.g. DPT 5th Year / Fresh Graduate"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">University / Institution *</label>
                    <input
                      type="text"
                      required
                      value={internForm.institution}
                      onChange={e => setInternForm({ ...internForm, institution: e.target.value })}
                      placeholder="e.g. King Edward / UHS"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                    />
                  </div>
                </div>

                {/* Interactive Card Selection for Rotation Duration */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Preferred Rotation Program *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setInternForm({ ...internForm, duration: "3 Months Clinical Rotation" })}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        internForm.duration === "3 Months Clinical Rotation"
                          ? "border-pink-500 bg-pink-50/60 shadow-md ring-2 ring-pink-500/20"
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs text-slate-900">3 Months Rotation</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${internForm.duration === "3 Months Clinical Rotation" ? "bg-pink-500 text-white" : "border border-slate-300"}`}>
                          {internForm.duration === "3 Months Clinical Rotation" && <FiCheck size={10} />}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 block">Core Clinical Training</span>
                    </div>

                    <div
                      onClick={() => setInternForm({ ...internForm, duration: "6 Months Comprehensive Residency" })}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        internForm.duration === "6 Months Comprehensive Residency"
                          ? "border-sky-500 bg-sky-50/60 shadow-md ring-2 ring-sky-500/20"
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs text-slate-900">6 Months Residency</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${internForm.duration === "6 Months Comprehensive Residency" ? "bg-sky-500 text-white" : "border border-slate-300"}`}>
                          {internForm.duration === "6 Months Comprehensive Residency" && <FiCheck size={10} />}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 block">Advanced Patient Care</span>
                    </div>
                  </div>
                </div>

                {/* Upload CV Dropzone */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Upload CV / Resume (PDF, DOC) *</label>
                  <div className="border-2 border-dashed border-pink-200 hover:border-pink-500 bg-pink-50/30 hover:bg-pink-50/70 rounded-2xl p-5 text-center cursor-pointer transition-all relative">
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                      <div className="w-10 h-10 rounded-2xl bg-white text-pink-500 flex items-center justify-center shadow-xs border border-pink-100">
                        <FiUpload size={18} />
                      </div>
                      <span className="text-xs font-black text-slate-800">
                        {internForm.resume_name ? `✓ ${internForm.resume_name}` : "Click to attach CV or drag & drop file"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Supports PDF, DOC, DOCX up to 10MB</span>
                    </div>
                  </div>
                </div>

                {/* Statement of Interest */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Statement of Interest</label>
                  <textarea
                    rows={3}
                    value={internForm.cover_letter}
                    onChange={e => setInternForm({ ...internForm, cover_letter: e.target.value })}
                    placeholder="Briefly state your clinical learning goals and interests in manual therapy..."
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl p-4 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 resize-none"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-600 to-sky-500 hover:from-pink-600 hover:to-sky-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-pink-500/25 border-none cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><FiSend size={15} /> Submit Internship Application</>
                  )}
                </button>

                {/* Trust Footer */}
                <div className="pt-2 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 border-t border-slate-100">
                  <span className="flex items-center gap-1"><FiLock className="text-emerald-500" /> Medical Board Verified</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FiZap className="text-amber-500" /> Direct HR Sync</span>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
