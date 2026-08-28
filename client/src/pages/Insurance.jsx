import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck, FiX, FiShield, FiPhone, FiChevronDown, FiAward, FiUser, FiMail, FiSend, FiCheckCircle, FiLock, FiStar, FiZap
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { LuBuilding, LuHeart, LuShield, LuStar, LuHospital, LuCircle, LuContact, LuCircleCheck, LuStethoscope, LuFileText } from "react-icons/lu";
import Navbar from "../components/Navbar";
import SEOHead from "../components/SEOHead";
import { api } from "../services/api";

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const INSURANCE_PARTNERS = [
  { name: "State Life", logo: LuBuilding, type: "Government", color: "#0ea5e9", coverage: "OPD + IPD" },
  { name: "Jubilee Health", logo: LuHeart, type: "Private", color: "#e91e8c", coverage: "Full Coverage" },
  { name: "EFU Life", logo: LuShield, type: "Private", color: "#a78bfa", coverage: "OPD + IPD" },
  { name: "Adamjee Insurance", logo: LuStar, type: "Private", color: "#34d399", coverage: "IPD Only" },
  { name: "TPL Health", logo: LuHospital, type: "Private", color: "#ff7f50", coverage: "Full Coverage" },
  { name: "ChubbLife", logo: LuCircle, type: "International", color: "#f59e0b", coverage: "Full Coverage" },
  { name: "SLIC", logo: LuStar, type: "Government", color: "#0ea5e9", coverage: "OPD + IPD" },
  { name: "Allianz EFU", logo: LuCircle, type: "International", color: "#a78bfa", coverage: "Full Coverage" },
];

const INSURANCE_FAQS = [
  { q: "How do I use my insurance at Physiohub?", a: "Bring your insurance card and CNIC at reception. Our insurance desk will verify your coverage on the spot and handle all paperwork — you only pay the co-pay if applicable." },
  { q: "What if my insurer is not on your panel?", a: "We'll provide detailed itemized invoices that you can submit directly to your insurance company for reimbursement. Our billing team is happy to assist with any claim documentation." },
  { q: "Does insurance cover cosmetic procedures?", a: "Most cosmetic procedures (like laser skin treatments or hair transplants) are not covered unless medically indicated. However, reconstructive and medically necessary aesthetic procedures are often covered. Check with your insurer." },
  { q: "Can I get pre-authorization assistance?", a: "Yes. Our insurance coordination desk handles all pre-authorization requests on your behalf. Simply bring your insurance details 24–48 hours before your scheduled procedure." },
];

function FaqAccordion({ faqs, color, bg }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-3 text-left">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          className="rounded-2xl overflow-hidden border bg-white shadow-xs"
          style={{ borderColor: openIdx === i ? color + "40" : "#f1f5f9" }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors cursor-pointer border-none bg-transparent"
            style={{ background: openIdx === i ? bg : "white" }}
          >
            <span className="font-bold text-slate-700 text-sm pr-4">{faq.q}</span>
            <motion.div animate={{ rotate: openIdx === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
              <FiChevronDown size={16} style={{ color: openIdx === i ? color : "#94a3b8" }} />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-4 pt-1 text-sm text-slate-500 leading-relaxed bg-white"
              >
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

export default function Insurance({ onBookAppointment }) {
  const whatsappNumber = "923008786187";
  const [activeTab, setActiveTab] = useState("insurance"); // "insurance" | "membership"

  const [settings, setSettings] = useState(() => {
    const local = localStorage.getItem("pc_settings");
    return local ? JSON.parse(local) : {};
  });

  useEffect(() => {
    api.getSettings().then(res => {
      if (res) setSettings(res);
    });
  }, []);

  // Membership Form State
  const [memberForm, setMemberForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    qualification: "",
    plan_tier: "Premium Patient Pass",
    cover_letter: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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
        setError(res?.error || "Failed to submit membership application. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while submitting your membership request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      <SEOHead 
        title="Insurance Coverage & Clinical Membership | Vital Physio Hub Islamabad"
        description="Vital Physio Hub accepts leading insurance panels (State Life, Jubilee, EFU, Adamjee, TPL) & offers exclusive Clinical Membership privileges for priority appointments."
        keywords="physiotherapy insurance coverage Islamabad, insurance panel physical therapy Islamabad, Jubilee health physio Islamabad, clinical membership physiohub"
        canonicalUrl="https://physiohub.com/insurance"
      />
      <Navbar onBookAppointment={onBookAppointment} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-10 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 text-xs font-black uppercase tracking-widest text-sky-600 mb-4 shadow-xs"
          >
            <FiShield className="text-sky-500 animate-pulse" /> Complete Coverage & Priority Privilege
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="text-4xl sm:text-6xl font-black text-slate-800 mb-3 leading-tight font-serif">
            Insurance &{" "}
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Clinical Membership
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-medium">
            Learn more about our panel partners, cashless treatment pathways, claim reimbursements, or join our exclusive Clinical Membership network.
          </motion.p>

          {/* Toggle Tabs */}
          <div className="flex justify-center">
            <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-md flex items-center gap-1 max-w-md w-full">
              <button
                onClick={() => { setActiveTab("insurance"); setError(""); setSuccessMsg(""); }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all border-none cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === "insurance"
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <FiShield size={16} /> Insurance Coverage
              </button>
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

      {/* TAB 1: INSURANCE COVERAGE */}
      {activeTab === "insurance" && (
        <section className="px-4 pb-20 max-w-6xl mx-auto">
          {/* How it works */}
          <div className="mb-12 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "01", icon: LuContact, title: "Bring Your Card", desc: "Bring your insurance card and CNIC to our reception desk.", color: "text-blue-500" },
                { step: "02", icon: LuCircleCheck, title: "Instant Verification", desc: "Our insurance desk verifies your eligibility in real-time.", color: "text-green-500" },
                { step: "03", icon: LuStethoscope, title: "Receive Treatment", desc: "Get treated — our doctors focus on your care, not the paperwork.", color: "text-rose-500" },
                { step: "04", icon: LuFileText, title: "We Handle Claims", desc: "Physiohub submits all claims directly to your insurer.", color: "text-amber-500" },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden group hover:shadow-lg transition-shadow duration-400"
                  >
                    <div className="absolute top-4 right-4 text-5xl font-black opacity-5 select-none">{step.step}</div>
                    <div className="mb-3">
                      <Icon size={28} className={step.color} />
                    </div>
                    <h4 className="font-black text-slate-800 text-sm mb-1.5">{step.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" style={{ background: THEME.gradBtn }} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Insurance partners */}
          <div className="mb-12 text-left">
            <h3 className="text-xl font-black text-slate-800 mb-6 font-serif flex items-center gap-2">
              <HiSparkles className="text-sky-500" /> Accepted Insurance Panel Partners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {INSURANCE_PARTNERS.map((ins, i) => {
                const LogoComp = ins.logo;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    whileHover={{ y: -4, boxShadow: `0 12px 40px ${ins.color}20` }}
                    className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-100 cursor-default transition-all duration-300"
                  >
                    <div className="flex justify-center mb-2">
                      <LogoComp size={24} style={{ color: ins.color }} />
                    </div>
                    <p className="font-black text-slate-800 text-sm">{ins.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold mt-1.5 inline-block" style={{ background: ins.color + "15", color: ins.color }}>{ins.type}</span>
                    <p className="text-xs text-slate-400 mt-1.5 font-medium">{ins.coverage}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Coverage Details Table */}
          <div className="mb-12 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <FiShield size={18} style={{ color: THEME.pink }} />
              <h3 className="font-black text-slate-800">Standard Plan Coverage Matrix</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs font-black text-slate-500 uppercase tracking-wide">Service</th>
                    <th className="px-6 py-3 text-center text-xs font-black text-slate-500 uppercase tracking-wide">OPD (Out-Patient)</th>
                    <th className="px-6 py-3 text-center text-xs font-black text-slate-500 uppercase tracking-wide">IPD (In-Patient)</th>
                    <th className="px-6 py-3 text-center text-xs font-black text-slate-500 uppercase tracking-wide">Surgical</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { service: "General Consultation", opd: true, ipd: true, surg: false },
                    { service: "Diagnostic Tests & Labs", opd: true, ipd: true, surg: false },
                    { service: "Emergency Services", opd: true, ipd: true, surg: true },
                    { service: "Surgical Procedures", opd: false, ipd: true, surg: true },
                    { service: "Physiotherapy & Rehab", opd: true, ipd: true, surg: false },
                    { service: "Cosmetic Procedures", opd: false, ipd: false, surg: false },
                    { service: "Maternity Services", opd: true, ipd: true, surg: true },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="px-6 py-3.5 text-slate-700 font-medium text-sm">{row.service}</td>
                      {[row.opd, row.ipd, row.surg].map((v, j) => (
                        <td key={j} className="px-6 py-3.5 text-center">
                          {v ? <FiCheck size={16} className="mx-auto" style={{ color: "#34d399" }} /> : <FiX size={16} className="mx-auto text-slate-200" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-slate-50/50 text-xs text-slate-400 border-t border-slate-100">* Note: Coverage limits depend on your insurance provider's specific policy terms. Contact our desk for instant verification.</div>
          </div>

          {/* Insurance FAQ list */}
          <div className="mb-8 text-left">
            <h3 className="text-xl font-black text-slate-800 mb-6 font-serif">Frequently Asked Insurance Questions</h3>
            <FaqAccordion faqs={INSURANCE_FAQS} color={THEME.sky} bg="#e0f2fe" />
          </div>

          {/* Coordination desk CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-7 flex flex-col sm:flex-row items-center gap-6"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(14,165,233,0.15)" }}
          >
            <LuShield size={36} className="text-sky-500 flex-shrink-0 animate-pulse" />
            <div className="text-left">
              <h3 className="font-black text-slate-800 text-lg mb-1">Need Insurance Verification?</h3>
              <p className="text-slate-500 text-sm">Our dedicated insurance coordination desk is available 9 AM – 6 PM, Monday through Saturday.</p>
            </div>
            <div className="sm:ml-auto flex flex-shrink-0 gap-2">
              <motion.a href="tel:+923417388830" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: THEME.gradBtn, textDecoration: "none" }}>
                <FiPhone size={14} /> Call Desk
              </motion.a>
              <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white" style={{ background: "#25D366", textDecoration: "none" }}>
                <FaWhatsapp size={15} /> WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </section>
      )}

      {/* TAB 2: CLINICAL MEMBERSHIP */}
      {activeTab === "membership" && (
        <section className="px-4 pb-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Left Column: Membership Tiers & Benefits Showcase */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest block mb-1">Exclusive Care Privilege</span>
                <h2 className="text-3xl font-black text-slate-900 font-serif leading-tight">Physiohub Clinical Membership Tiers</h2>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                  Designed for patients requiring long-term physical rehabilitation, spine maintenance, or posture correction with zero waiting time and priority clinical access.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-white/90 backdrop-blur-xl border border-sky-100 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <FiAward className="text-sky-500" /> Premium Patient Pass
                    </h3>
                    <span className="text-xs font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">{settings.membership_patient_price || "PKR 5,000 / Yr"}</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100 font-medium">
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Priority Express Booking & Zero Waiting Time</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> 15% Discount on all Manual Therapy & Decompression sessions</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Free Monthly Digital Posture & Spine Alignment Audit</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Complimentary Electrotherapy Session Add-on</li>
                  </ul>
                </div>

                <div className="p-6 bg-white/90 backdrop-blur-xl border border-pink-100 rounded-3xl shadow-md space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-400/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <FiStar className="text-pink-500" /> Professional Practitioner Network
                    </h3>
                    <span className="text-xs font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">{settings.membership_practitioner_price || "PKR 12,000 / Yr"}</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100 font-medium">
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Access to Physiohub Specialized Gym & Rehab Equipment</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Clinical Case Discussion & Inter-Specialist Referral Network</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Free Entry to Quarterly Clinical Workshops & CPD Seminars</li>
                    <li className="flex items-center gap-2"><FiCheck className="text-emerald-500 shrink-0 text-sm" /> Official Listing on Physiohub Specialist Practitioner Registry</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Stunning Ultra-Modern Glass Form */}
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

                {/* Full Name Input */}
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

                {/* Email & Phone */}
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

                {/* Qualification / Occupation */}
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

                {/* Health Goals / Statement */}
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

                {/* Submit Action Button */}
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

                {/* Trust Footer */}
                <div className="pt-2 flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 border-t border-slate-100">
                  <span className="flex items-center gap-1"><FiLock className="text-emerald-500" /> 256-Bit SSL Encrypted</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><FiZap className="text-amber-500" /> Instant Admin Review</span>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
