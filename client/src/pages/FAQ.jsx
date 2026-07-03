import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar, FiChevronDown, FiHelpCircle, FiPhone, FiVideo,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { TbStethoscope } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi";
import { LuCircleHelp } from "react-icons/lu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const CATEGORY_META = {
  appointments: { label: "Appointments", icon: FiCalendar, color: "#0ea5e9", bg: "#e0f2fe" },
  services: { label: "Services & Treatments", icon: TbStethoscope, color: "#e91e8c", bg: "#fce4ec" },
  billing: { label: "Billing & Payments", icon: FiHelpCircle, color: "#34d399", bg: "#d1fae5" },
  general: { label: "General Queries", icon: FiHelpCircle, color: "#a78bfa", bg: "#ede9fe" }
};


function FaqAccordion({ faqs, color, bg, delay = 0 }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-3 text-left">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + i * 0.07 }}
          className="rounded-2xl overflow-hidden border"
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

const DEFAULT_FAQS = [
  { category: "appointments", question: "How do I book an appointment at Vital Physio Hub?", answer: "You can book through our website's booking page, call our helpline at +92-300-8786187, or send us a message on WhatsApp. Online bookings are available 24/7 and confirmed instantly." },
  { category: "appointments", question: "Can I choose a specific doctor for my appointment?", answer: "Yes, absolutely. During the booking process you can browse all available doctors, view their profiles, specializations, and available time slots, and select the one that suits you best." },
  { category: "appointments", question: "What is your cancellation and rescheduling policy?", answer: "You can cancel or reschedule up to 4 hours before your appointment at no charge. Cancellations within 4 hours may incur a small processing fee. Emergency cancellations are always waived." },
  { category: "services", question: "What specialties does Vital Physio Hub offer?", answer: "We offer 8 clinical facilities including Physiotherapy, Chiropractic Adjustments, Cupping, Hijama, Electrotherapy, Kinesio Taping, Fitness Training, and Dry Needling." },
  { category: "services", question: "Do you offer online video consultations?", answer: "Yes. Our telemedicine platform supports video, audio, and chat consultations. You can consult with any of our doctors from the comfort of your home via Zoom or our in-app system." },
  { category: "billing", question: "What payment methods do you accept?", answer: "We accept JazzCash, Easypaisa, Visa/Mastercard debit & credit cards, bank transfers, and cash. Online appointments can be partially or fully paid in advance through our secure portal." },
  { category: "billing", question: "Will I receive an invoice or receipt for my visit?", answer: "A detailed digital invoice is automatically sent to your registered email after every consultation and procedure. You can also access all past invoices from your Patient Portal account." },
  { category: "general", question: "What are your clinic timings?", answer: "We are open Monday to Saturday from 09:00 AM to 09:00 PM. Sundays are reserved for emergencies and pre-scheduled sessions only." }
];

export default function FAQ({ onBookAppointment }) {
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [activeFaqCat, setActiveFaqCat] = useState("appointments");
  const [settings, setSettings] = useState({ clinic_phone: "+92 300 8786187" });

  useEffect(() => {
    api.getFaqs().then(data => {
      if (data && data.length > 0) setFaqs(data);
    });
    api.getSettings().then(data => {
      if (data) setSettings(data);
    });
  }, []);

  const whatsappNumber = settings.clinic_phone ? settings.clinic_phone.replace(/\D/g, "") : "923008786187";

  const uniqueCategories = faqs.length > 0 ? [...new Set(faqs.map(f => f.category))] : ["appointments", "services", "billing", "general"];

  const faqCategories = uniqueCategories.map(catId => {
    const meta = CATEGORY_META[catId] || {
      label: catId.charAt(0).toUpperCase() + catId.slice(1),
      icon: FiHelpCircle,
      color: "#6366f1",
      bg: "#e0e7ff"
    };
    return {
      id: catId,
      label: meta.label,
      icon: meta.icon,
      color: meta.color,
      bg: meta.bg,
      questions: faqs.filter(f => f.category === catId).map(f => ({ q: f.question, a: f.answer }))
    };
  });

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      <Navbar onBookAppointment={onBookAppointment} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-10 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">


          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }} className="text-4xl sm:text-6xl font-black text-slate-800 mb-3 leading-tight">
            Frequently Asked{" "}
            <span style={{ background: "linear-gradient(135deg, #e91e8c, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }} className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
            Got queries? Find instant answers regarding appointments, consulting fees, panel insurance, and reports.
          </motion.p>
        </div>
      </section>

      {/* Accordions */}
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-2 text-left">
          <div className="w-1 h-8 rounded-full" style={{ background: THEME.gradBtn }} />
          <h2 className="text-2xl font-black text-slate-800">Support Categories</h2>
        </div>
        <p className="text-slate-400 text-sm mb-8 ml-4 text-left">Filter answers by selecting your topic.</p>

        {/* Category tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {faqCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFaqCat === cat.id;
            const categoryGradients = {
              appointments: "linear-gradient(135deg, #0ea5e9, #0284c7)",
              services: "linear-gradient(135deg, #e91e8c, #db2777)",
              billing: "linear-gradient(135deg, #10b981, #059669)",
              general: "linear-gradient(135deg, #8b5cf6, #7c3aed)"
            };
            const gradient = categoryGradients[cat.id] || "linear-gradient(135deg, #6366f1, #4f46e5)";
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveFaqCat(cat.id)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center gap-2.5 p-5 rounded-2xl transition-all duration-300 text-center cursor-pointer border-none shadow-md"
                style={{ 
                  background: gradient, 
                  boxShadow: isActive ? `0 12px 24px ${cat.color}60` : `0 4px 10px rgba(0,0,0,0.05)`,
                  transform: isActive ? "scale(1.03)" : "none",
                  border: isActive ? "2px solid #ffffff" : "2px solid transparent"
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/20">
                  <Icon size={18} className="text-white" />
                </div>
                <span className="text-xs font-extrabold text-white">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* FAQ accordion */}
        <AnimatePresence mode="wait">
          {faqCategories.filter((c) => c.id === activeFaqCat).map((cat) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <FaqAccordion faqs={cat.questions} color={cat.color} bg={cat.bg} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-3xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #0ea5e9 0%, #7c3aed 50%, #e91e8c 100%)", boxShadow: "0 12px 30px rgba(124, 58, 237, 0.25)" }}
        >
          <div className="flex justify-center mb-3">
            <LuCircleHelp size={36} className="text-white animate-bounce" />
          </div>
          <h3 className="text-xl font-black text-white mb-2">Still Have a Question?</h3>
          <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">Our reception team is available 7 days a week. Connect instantly on WhatsApp or phone.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg" style={{ background: "#25D366", textDecoration: "none" }}>
              <FaWhatsapp size={16} /> WhatsApp Us
            </motion.a>
            <motion.a href={`tel:${settings.clinic_phone || '+923008786187'}`} whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-white shadow-lg" style={{ color: THEME.pink, textDecoration: "none" }}>
              <FiPhone size={15} /> Call Us Now
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
