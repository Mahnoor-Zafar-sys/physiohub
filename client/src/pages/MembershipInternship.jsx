import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiAward, FiBookOpen, FiCheckCircle, FiUser, FiMail, FiPhone, 
  FiUpload, FiSend, FiShield, FiBriefcase, FiCheck, FiLock, FiZap, FiStar
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import SEOHead from "../components/SEOHead";
import { api } from "../services/api";

export default function MembershipInternship() {
  const [activeTab, setActiveTab] = useState("membership"); // "membership" | "internship"
  
  // Membership Form State
  const [memberForm, setMemberForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    qualification: "",
    plan_tier: "Premium Patient Pass",
    cover_letter: ""
  });

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

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await api.submitApplication({
        type: "membership",
        full_name: memberForm.full_name,
        email: memberForm.email,
        phone: memberForm.phone,
        qualification: memberForm.qualification,
        plan_tier: memberForm.plan_tier,
        cover_letter: memberForm.cover_letter
      });
      if (res && res.success) {
        setSuccessMsg("🎉 Your Clinical Membership application has been registered! Our desk will review and contact you shortly.");
        setMemberForm({
          full_name: "",
          email: "",
          phone: "",
          qualification: "",
          plan_tier: "Premium Patient Pass",
          cover_letter: ""
        });
      } else {
        setError(res?.error || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while submitting your application.");
    } finally {
      setLoading(false);
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
        setSuccessMsg("🎓 Your Physical Therapy Internship application has been received! Our medical education board will review your credentials.");
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
        setError(res?.error || "Failed to submit application. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while submitting your internship application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
      <SEOHead
        title="Clinical Membership & Physical Therapy Internship | Vital Physio Hub Islamabad"
        description="Join the Vital Physio Hub Clinical Membership network or apply for certified Physical Therapy clinical internship rotations in Islamabad."
      />
      <Navbar />

      {/* Hero Header */}
      <div className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 text-xs font-black uppercase tracking-widest text-sky-600 shadow-xs">
            <FiShield className="text-sky-500 animate-pulse" /> Excellence in Rehabilitation & Clinical Training
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif text-slate-900">
            Membership & Clinical Internship Programs
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Elevate your personal recovery with specialized clinical membership privileges or gain hands-on clinical rotation experience through our accredited physical therapy internship program.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Toggle Pills */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-md flex items-center gap-1 max-w-md w-full">
            <button
              onClick={() => { setActiveTab("membership"); setError(""); setSuccessMsg(""); }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all border-none cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "membership"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <FiAward size={16} /> Clinical Membership
            </button>
            <button
              onClick={() => { setActiveTab("internship"); setError(""); setSuccessMsg(""); }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all border-none cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "internship"
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <FiBriefcase size={16} /> Clinical Internship
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto mb-8 p-4 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 text-emerald-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 shadow-md text-left"
            >
              <FiCheckCircle className="text-emerald-600 text-2xl shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto mb-8 p-4 bg-rose-500/10 backdrop-blur-md border border-rose-500/30 text-rose-800 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 shadow-md text-left"
            >
              <FiShield className="text-rose-600 text-2xl shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB 1: MEMBERSHIP PROGRAM */}
        {activeTab === "membership" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Left: Program Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest block mb-1">Exclusive Health Benefits</span>
                <h2 className="text-3xl font-black text-slate-900 font-serif leading-tight">Physiohub Clinical Membership Tiers</h2>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                  Designed for patients requiring long-term physical rehabilitation, spine maintenance, or posture correction with zero waiting time and priority clinical access.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white/90 backdrop-blur-xl border border-sky-100 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <FiAward className="text-sky-500" /> Premium Patient Pass
                    </h3>
                    <span className="text-xs font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">PKR 5,000 / Yr</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100 font-medium">
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Priority Express Booking & Zero Waiting Time</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> 15% Discount on all Manual Therapy & Decompression sessions</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Free Monthly Digital Posture & Spine Alignment Audit</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/90 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <FiStar className="text-pink-500" /> Professional Practitioner Network
                    </h3>
                    <span className="text-xs font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">PKR 12,000 / Yr</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100 font-medium">
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Access to Physiohub Specialized Gym & Rehab Equipment</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Clinical Case Discussion & Inter-Specialist Referral Network</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Free Entry to Quarterly Clinical Workshops & CPD Seminars</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Glass Form */}
            <div className="lg:col-span-7 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-600 to-pink-500" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest block">Instant Registration</span>
                  <h3 className="text-2xl font-black text-slate-900 font-serif">Apply for Clinical Membership</h3>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg border border-sky-100 shadow-xs">
                  <FiAward />
                </div>
              </div>

              <form onSubmit={handleMemberSubmit} className="space-y-5">
                {/* Interactive Card Selection for Membership Plan */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Select Your Membership Tier *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setMemberForm({ ...memberForm, plan_tier: "Premium Patient Pass" })}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        memberForm.plan_tier === "Premium Patient Pass"
                          ? "border-sky-500 bg-sky-50/60 shadow-md ring-2 ring-sky-500/20"
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs text-slate-900">Premium Patient Pass</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${memberForm.plan_tier === "Premium Patient Pass" ? "bg-sky-500 text-white" : "border border-slate-300"}`}>
                          {memberForm.plan_tier === "Premium Patient Pass" && <FiCheck size={10} />}
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-sky-600 block">PKR 5,000 / Year</span>
                    </div>

                    <div
                      onClick={() => setMemberForm({ ...memberForm, plan_tier: "Professional Practitioner" })}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                        memberForm.plan_tier === "Professional Practitioner"
                          ? "border-pink-500 bg-pink-50/60 shadow-md ring-2 ring-pink-500/20"
                          : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-xs text-slate-900">Practitioner Network</span>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${memberForm.plan_tier === "Professional Practitioner" ? "bg-pink-500 text-white" : "border border-slate-300"}`}>
                          {memberForm.plan_tier === "Professional Practitioner" && <FiCheck size={10} />}
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-pink-600 block">PKR 12,000 / Year</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Full Name *</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      required
                      value={memberForm.full_name}
                      onChange={e => setMemberForm({ ...memberForm, full_name: e.target.value })}
                      placeholder="e.g. Dr. Muhammad Ali"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Email Address *</label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="email"
                        required
                        value={memberForm.email}
                        onChange={e => setMemberForm({ ...memberForm, email: e.target.value })}
                        placeholder="ali@example.com"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
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
                        value={memberForm.phone}
                        onChange={e => setMemberForm({ ...memberForm, phone: e.target.value })}
                        placeholder="03001234567"
                        className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl pl-11 pr-4 py-3.5 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Qualification / Profession</label>
                  <input
                    type="text"
                    value={memberForm.qualification}
                    onChange={e => setMemberForm({ ...memberForm, qualification: e.target.value })}
                    placeholder="e.g. DPT Graduate / Senior Patient"
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Health Goals & Special Requirements</label>
                  <textarea
                    rows={3}
                    value={memberForm.cover_letter}
                    onChange={e => setMemberForm({ ...memberForm, cover_letter: e.target.value })}
                    placeholder="Mention any specific physical therapy focus, spinal rehab goals, or health notes..."
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl p-4 text-xs font-semibold outline-none transition-all focus:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-sky-500 via-blue-600 to-pink-500 hover:from-sky-600 hover:to-pink-600 text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-sky-500/25 border-none cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><FiSend size={15} /> Submit Membership Application</>
                  )}
                </button>

                <div className="pt-2 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 border-t border-slate-100">
                  <span className="flex items-center gap-1"><FiLock className="text-emerald-500" /> 256-Bit SSL Encrypted</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FiZap className="text-amber-500" /> Instant Admin Review</span>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: INTERNSHIP PROGRAM */}
        {activeTab === "internship" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Left: Program Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest block mb-1">Clinical Rotation & Training</span>
                <h2 className="text-3xl font-black text-slate-900 font-serif leading-tight">Physical Therapy Internship Program</h2>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                  Gain intensive, hands-on clinical training under PMDC & HEC board-certified senior physical therapy specialists at our flagship center in Islamabad.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white/90 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <FiBookOpen className="text-pink-500" /> Internship Rotation Highlights
                  </h3>
                  <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100 font-medium">
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Direct patient evaluation & electrotherapy modality application</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Hands-on training in Spinal Decompression & Manual Adjustments</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Official Clinical Internship Completion Certificate upon evaluation</li>
                  </ul>
                </div>

                <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl space-y-2 relative overflow-hidden">
                  <h3 className="font-extrabold text-sm text-sky-300 flex items-center gap-2">
                    <FiShield /> Candidate Eligibility
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Open to enrolled 4th/5th year DPT students or fresh DPT / Sports Medicine graduates from recognized universities across Pakistan.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Glass Form */}
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

                <div className="pt-2 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 border-t border-slate-100">
                  <span className="flex items-center gap-1"><FiLock className="text-emerald-500" /> Medical Board Verified</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FiZap className="text-amber-500" /> Direct HR Sync</span>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
