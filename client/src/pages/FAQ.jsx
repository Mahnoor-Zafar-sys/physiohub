import { useState } from "react";
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

const THEME = {
  pink:    "#e91e8c",
  sky:     "#0ea5e9",
  grad:    "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

const FAQ_CATEGORIES = [
  {
    id: "appointments",
    label: "Appointments",
    icon: FiCalendar,
    color: "#0ea5e9",
    bg: "#e0f2fe",
    questions: [
      { q: "How do I book an appointment at Vital Physio Hub?", a: "You can book through our website's booking page, call our helpline at +92-300-8786187, or send us a message on WhatsApp. Online bookings are available 24/7 and confirmed instantly." },
      { q: "Can I choose a specific doctor for my appointment?", a: "Yes, absolutely. During the booking process you can browse all available doctors, view their profiles, specializations, and available time slots, and select the one that suits you best." },
      { q: "What is your cancellation and rescheduling policy?", a: "You can cancel or reschedule up to 4 hours before your appointment at no charge. Cancellations within 4 hours may incur a small processing fee. Emergency cancellations are always waived." },
      { q: "Do you offer same-day or emergency appointments?", a: "Yes. We maintain dedicated emergency slots each day. Call our emergency line or walk in — our triage team will assess and accommodate you as quickly as possible." },
    ],
  },
  {
    id: "services",
    label: "Services & Treatments",
    icon: TbStethoscope,
    color: "#e91e8c",
    bg: "#fce4ec",
    questions: [
      { q: "What specialties does Vital Physio Hub offer?", a: "We offer 8 clinical facilities including Physiotherapy, Chiropractic Adjustments, Cupping, Hijama, Electrotherapy, Kinesio Taping, Fitness Training, and Dry Needling." },
      { q: "Do you offer online video consultations?", a: "Yes. Our telemedicine platform supports video, audio, and chat consultations. You can consult with any of our doctors from the comfort of your home via Zoom or our in-app system." },
      { q: "Are your treatments FDA-approved?", a: "All procedures, devices, and rehabilitation equipment used at Vital Physio Hub are certified by relevant healthcare and regulatory authorities. Patient safety is our highest priority." },
      { q: "Can I get a second opinion from your specialists?", a: "Of course. We welcome second-opinion consultations and can review previous reports, imaging, and diagnoses from other providers to give you a comprehensive independent assessment." },
    ],
  },
  {
    id: "billing",
    label: "Billing & Payments",
    icon: FiHelpCircle,
    color: "#34d399",
    bg: "#d1fae5",
    questions: [
      { q: "What payment methods do you accept?", a: "We accept JazzCash, Easypaisa, Visa/Mastercard debit & credit cards, bank transfers, and cash. Online appointments can be partially or fully paid in advance through our secure portal." },
      { q: "Do you offer installment plans for expensive procedures?", a: "Yes, for procedures above PKR 30,000 we offer easy 3 to 12 month installment plans with zero markup through selected partner banks. Our billing team can assist with the application." },
      { q: "Will I receive an invoice or receipt for my visit?", a: "A detailed digital invoice is automatically sent to your registered email after every consultation and procedure. You can also access all past invoices from your Patient Portal account." },
    ],
  },
  {
    id: "general",
    label: "General Queries",
    icon: FiHelpCircle,
    color: "#a78bfa",
    bg: "#ede9fe",
    questions: [
      { q: "What are your clinic opening hours?", a: "Our main branch is open Saturday–Thursday 9:00 AM – 9:00 PM and Friday 2:00 PM – 9:00 PM. Emergency services are available 24/7 at all branches." },
      { q: "Do you have branches in multiple cities?", a: "Currently we have three branches — Lahore (DHA Phase 5), Islamabad (Blue Area), and Rawalpindi (Saddar). Each branch offers the full range of services with the same Premium standard." },
      { q: "Is parking available at the clinic?", a: "Yes, all three branches have dedicated free parking for patients. The Lahore branch also has a basement parking level with direct elevator access to the clinic floors." },
      { q: "How do I access my reports and prescriptions?", a: "All reports, lab results, and prescriptions are uploaded to your Patient Portal within 24 hours of your visit. You'll receive a notification via SMS and email once they're ready." },
    ],
  },
];

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

export default function FAQ({ onBookAppointment }) {
  const [activeFaqCat, setActiveFaqCat] = useState("appointments");
  const whatsappNumber = "923008786187";

  return (
    <div className="min-h-screen font-sans" style={{ background: THEME.grad }}>
      <Navbar onBookAppointment={onBookAppointment} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-32 pb-10 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-4 shadow-sm" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", color: THEME.pink, border: "1px solid #fce4ec" }}>
            <HiSparkles size={13} />
            Patient Help Center
          </motion.div>

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
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFaqCat === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveFaqCat(cat.id)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 text-center"
                style={isActive ? { background: cat.bg, border: `1.5px solid ${cat.color}40`, boxShadow: `0 4px 20px ${cat.color}20` } : { background: "rgba(255,255,255,0.8)", border: "1px solid #f1f5f9" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: isActive ? cat.color : "#f1f5f9" }}>
                  <Icon size={18} style={{ color: isActive ? "white" : "#94a3b8" }} />
                </div>
                <span className="text-xs font-bold" style={{ color: isActive ? cat.color : "#64748b" }}>{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* FAQ accordion */}
        <AnimatePresence mode="wait">
          {FAQ_CATEGORIES.filter((c) => c.id === activeFaqCat).map((cat) => (
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
          className="mt-12 rounded-3xl p-7 text-center"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(233,30,140,0.1)" }}
        >
          <div className="flex justify-center mb-3">
            <LuCircleHelp size={36} className="text-pink-500 animate-bounce" />
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-2">Still Have a Question?</h3>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">Our reception team is available 7 days a week. Connect instantly on WhatsApp or phone.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <motion.a href={`https://wa.me/${whatsappNumber}`} target="_blank" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg" style={{ background: "#25D366", textDecoration: "none" }}>
              <FaWhatsapp size={16} /> WhatsApp Us
            </motion.a>
            <motion.a href="tel:+923008786187" whileHover={{ scale: 1.04 }} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg" style={{ background: THEME.gradBtn, textDecoration: "none" }}>
              <FiPhone size={15} /> Call Us Now
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
