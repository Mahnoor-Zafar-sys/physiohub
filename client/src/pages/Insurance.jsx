import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck, FiX, FiShield, FiPhone, FiChevronDown,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { LuBuilding, LuHeart, LuShield, LuStar, LuHospital, LuCircle, LuContact, LuCircleCheck, LuStethoscope, LuFileText } from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  { q: "How do I use my insurance at Premium Clinic?", a: "Bring your insurance card and CNIC at reception. Our insurance desk will verify your coverage on the spot and handle all paperwork — you only pay the co-pay if applicable." },
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
          className="rounded-2xl overflow-hidden border bg-white"
          style={{ borderColor: openIdx === i ? color + "40" : "#f1f5f9" }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
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

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      <Navbar onBookAppointment={onBookAppointment} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-10 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-sm" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", color: THEME.pink, border: "1px solid #fce4ec" }}>
            <HiSparkles size={13} />
            Panel Insurance Partners Updated 2026
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="text-4xl sm:text-6xl font-black text-slate-800 mb-3 leading-tight">
            Insurance &{" "}
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Coverage</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
            Learn more about our panel partners, cashless treatment pathways, claim reimbursements, and coverage details.
          </motion.p>
        </div>
      </section>

      {/* DETAILED CONTENT */}
      <section className="px-4 pb-20 max-w-6xl mx-auto">
        {/* How it works */}
        <div className="mb-12 text-left">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">How Insurance Claims Work</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: "01", icon: LuContact, title: "Bring Your Card", desc: "Bring your insurance card and CNIC to our reception desk.", color: "text-blue-500" },
              { step: "02", icon: LuCircleCheck, title: "Instant Verification", desc: "Our insurance desk verifies your eligibility in real-time.", color: "text-green-500" },
              { step: "03", icon: LuStethoscope, title: "Receive Treatment", desc: "Get treated — our doctors focus on your care, not the paperwork.", color: "text-rose-500" },
              { step: "04", icon: LuFileText, title: "We Handle Claims", desc: "Premium Clinic submits all claims directly to your insurer.", color: "text-amber-500" },
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
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 font-sans">Our Accepted Panel Partners</p>
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
            <h3 className="font-black text-slate-800">Standard Plan Coverage</h3>
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
                  { service: "Physiotherapy", opd: true, ipd: true, surg: false },
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
          <div className="px-6 py-3 bg-slate-50/50 text-xs text-slate-400 border-t border-slate-100">* Note: Coverage limits depend on your insurance company and plan policies. Contact our insurance desk for verification.</div>
        </div>

        {/* Insurance FAQ list */}
        <div className="mb-8 text-left">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">Billing & Insurance FAQ</p>
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
            <h3 className="font-black text-slate-800 text-lg mb-1">Need Insurance Assistance?</h3>
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

      <Footer />
    </div>
  );
}
