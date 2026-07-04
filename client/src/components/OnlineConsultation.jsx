import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  FiVideo, FiPhone, FiMessageCircle, FiX,
  FiCalendar, FiCheck, FiUpload, FiShield,
  FiUser, FiActivity, FiArrowRight, FiInfo,
  FiChevronLeft, FiClock, FiLock
} from "react-icons/fi";
import { FaWhatsapp, FaStar } from "react-icons/fa";
import { TbStethoscope, TbActivity } from "react-icons/tb";
import { doctors as mockDocs } from "../data/mockData";
import { api } from "../services/api";

const CONSULT_TYPES = [
  { id: "video", label: "Video Consultation", icon: FiVideo, desc: "Face-to-face clinical video consultation with HD feed.", color: "#0ea5e9", lightColor: "rgba(14,165,233,0.08)" },
  { id: "audio", label: "Audio Call", icon: FiPhone, desc: "Voice consultation for quick check-ups and discussions.", color: "#10b981", lightColor: "rgba(16,185,129,0.08)" },
  { id: "chat", label: "Chat Consultation", icon: FiMessageCircle, desc: "Direct messaging to send texts and exchange diagnostic reports.", color: "#8b5cf6", lightColor: "rgba(139,92,246,0.08)" },
  { id: "whatsapp", label: "WhatsApp", icon: FaWhatsapp, desc: "Fast-track consultation routed directly on your mobile device.", color: "#25d366", lightColor: "rgba(37,211,102,0.08)" },
];

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <FaStar key={s} size={11} color={s <= Math.floor(rating) ? "#f59e0b" : "#e5e7eb"} />
      ))}
      <span className="ml-1.5 text-xs font-bold text-slate-600">{rating}</span>
    </div>
  );
}

const FAQ_ITEMS = [
  { q: "How do I join the video consultation?", a: "Once your booking is confirmed, a secure telehealth link is sent via email and WhatsApp. You can also join directly from your Patient Portal dashboard under the 'Appointments' tab.", accent: "#2563eb" },
  { q: "Can my consultant assess my physical movements online?", a: "Yes. Our physical therapists are trained to conduct comprehensive video movement assessments, observe gait patterns, check active ranges of motion, and guide you through customized clinical exercises.", accent: "#7c3aed" },
  { q: "What should I wear during the session?", a: "We recommend wearing comfortable, loose-fitting athletic clothing (shorts, t-shirt, or tracks) so that our specialists can easily observe the affected joint or muscular regions.", accent: "#0284c7" },
  { q: "Can I upload my MRI or X-ray reports?", a: "Absolutely. During the 4th step of our scheduling wizard, you can upload any reports (PDF, JPG, or PNG) which will be securely shared with your selected specialist before the session starts.", accent: "#db2777" },
];

function ConsultFaqAccordion() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-4 max-w-3xl mx-auto text-left">
      {FAQ_ITEMS.map((faq, i) => (
        <div
          key={i}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: openIdx === i ? `1.5px solid ${faq.accent}40` : "1.5px solid #f1f5f9",
            background: openIdx === i ? `linear-gradient(135deg, ${faq.accent}08 0%, #fff 100%)` : "#fff",
            boxShadow: openIdx === i ? `0 4px 24px ${faq.accent}18` : "0 1px 6px rgba(0,0,0,0.04)",
            transition: "all 0.3s ease"
          }}
        >
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-6 text-left border-none cursor-pointer"
            style={{ padding: "18px 24px", background: "transparent" }}
          >
            <div className="flex items-center gap-3">
              <div style={{ width: 8, height: 8, borderRadius: 99, background: faq.accent, flexShrink: 0, opacity: openIdx === i ? 1 : 0.4 }} />
              <span style={{ fontWeight: 800, fontSize: 14, color: openIdx === i ? faq.accent : "#334155" }}>{faq.q}</span>
            </div>
            <div
              style={{
                width: 28, height: 28, borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                background: openIdx === i ? faq.accent : "#f1f5f9",
                transition: "all 0.25s ease"
              }}
            >
              <FiChevronLeft size={14} style={{ color: openIdx === i ? "#fff" : "#94a3b8", transform: openIdx === i ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }} />
            </div>
          </button>
          <AnimatePresence>
            {openIdx === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ padding: "0 24px 18px 44px", fontSize: 13, color: "#64748b", lineHeight: 1.7 }}
              >
                {faq.a}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function OnlineConsultation() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [channel, setChannel] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", age: "", symptoms: "" });
  const [booked, setBooked] = useState(false);
  
  // Payment states
  const [selectedMethod, setSelectedMethod] = useState("Easypaisa");
  const [txnRef, setTxnRef] = useState("");
  const [screenshotBase64, setScreenshotBase64] = useState("");
  const [paymentFile, setPaymentFile] = useState(null);
  const [bookedAppt, setBookedAppt] = useState(null);

  const fileRef = useRef();
  const paymentFileRef = useRef();

  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    api.getDoctors().then(data => {
      if (data && data.length > 0) {
        setDoctorsList(data);
      } else {
        setDoctorsList(mockDocs || []);
      }
    }).catch(() => {
      setDoctorsList(mockDocs || []);
    });
  }, []);

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const handleNextStep = () => {
    if (step === 1 && !channel) return;
    if (step === 2 && !selectedDoc) return;
    if (step === 3 && (!selectedDate || !selectedSlot)) return;
    if (step === 4 && (!form.name || !form.phone)) {
      alert("Please fill in your name and phone number.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleBook = async () => {
    if (!txnRef) {
      alert("Please enter your transaction ID / Reference ID.");
      return;
    }
    
    let reportBase64 = null;
    let reportName = null;
    
    if (uploadedFile) {
      reportName = uploadedFile.name;
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      await new Promise((resolve) => {
        reader.onloadend = () => {
          reportBase64 = reader.result;
          resolve();
        };
      });
    }

    try {
      const apptData = {
        doctor: selectedDoc?.name || "Dr. Sarah Ahmed",
        date: selectedDate ? `${dayNames[selectedDate.getDay()]} ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}` : new Date().toLocaleDateString(),
        time: selectedSlot || "09:00 AM",
        type: "Online Consultation",
        branch: "Online",
        status: "Pending",
        patient: form.name,
        payment_status: "Pending Verification",
        payment_method: selectedMethod,
        payment_screenshot: screenshotBase64 || null,
        patient_report: reportBase64,
        patient_report_name: reportName,
        consult_channel: channel || "video"
      };
      
      const res = await api.createAppointment(apptData);
      if (res) {
        setBookedAppt(res);
        setBooked(true);
      } else {
        alert("Failed to submit consultation booking.");
      }
    } catch (e) {
      console.error(e);
      alert("Error booking online consultation.");
    }
  };

  const resetWizard = () => {
    setWizardOpen(false);
    setStep(1);
    setChannel(null);
    setSelectedDoc(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setUploadedFile(null);
    setForm({ name: "", phone: "", email: "", age: "", symptoms: "" });
    setSelectedMethod("Easypaisa");
    setTxnRef("");
    setScreenshotBase64("");
    setPaymentFile(null);
    setBookedAppt(null);
    setBooked(false);
  };

  const handleSelectChannel = (chId) => {
    setChannel(chId);
    // Auto-advance to doctor selection
    setStep(2);
  };

  const handleSelectDoc = (doc) => {
    setSelectedDoc(doc);
    // Auto-advance to scheduling
    setStep(3);
  };


  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-800 flex flex-col justify-between">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <div
        className="relative flex items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80')",
          minHeight: "88vh",
          paddingTop: 88  /* offset for fixed navbar */
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 z-0" style={{ background: "linear-gradient(105deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.80) 55%, rgba(15,23,42,0.35) 100%)" }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >


            {/* Heading */}
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.15, color: "#fff", fontFamily: "serif", marginBottom: 20, maxWidth: 640 }}>
              Consult Top Specialists{" "}
              <span style={{ background: "linear-gradient(90deg, #60a5fa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                100% Online
              </span>
              {" & Secure"}
            </h1>

            {/* Sub-text */}
            <p style={{ fontSize: 15, color: "#cbd5e1", maxWidth: 520, lineHeight: 1.75, marginBottom: 32, fontWeight: 400 }}>
              Connect with board-certified physiotherapists and chiropractors from anywhere in Pakistan. Skip the waiting room. Your guided consultation is just a few clicks away.
            </p>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button
                onClick={() => setWizardOpen(true)}
                className="group relative inline-flex items-center gap-3 text-white font-bold text-sm cursor-pointer border-none"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                  padding: "14px 32px",
                  borderRadius: 16,
                  boxShadow: "0 16px 40px rgba(37,99,235,0.4)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <FiActivity size={16} style={{ opacity: 0.9 }} />
                Start Online Consultation
                <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #fdf4ff 50%, #fff7ed 100%)", padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif" style={{ color: "#0f172a" }}>
              How Your Online Consultation Works
            </h2>
            <p style={{ color: "#64748b", fontSize: 15, marginTop: 12, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              Get premium physical therapy guidance in four easy steps. No waiting room required.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Select Channel", desc: "Choose video call, audio call, chat, or WhatsApp based on your comfort.", icon: FiVideo, grad: "linear-gradient(135deg,#0ea5e9,#2563eb)", glow: "rgba(37,99,235,0.22)" },
              { step: "02", title: "Choose Specialist", desc: "Browse board-certified physiotherapists and chiropractors.", icon: TbStethoscope, grad: "linear-gradient(135deg,#ec4899,#f43f5e)", glow: "rgba(236,72,153,0.22)" },
              { step: "03", title: "Pick Date & Time", desc: "Find a slot that perfectly fits your daily schedule.", icon: FiCalendar, grad: "linear-gradient(135deg,#7c3aed,#4f46e5)", glow: "rgba(124,58,237,0.22)" },
              { step: "04", title: "Connect Instantly", desc: "Join our secure encrypted digital clinic room and start.", icon: FiActivity, grad: "linear-gradient(135deg,#059669,#0ea5e9)", glow: "rgba(5,150,105,0.22)" }
            ].map((s, idx) => {
              const IconComp = s.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(12px)",
                    borderRadius: 24,
                    padding: "28px 24px",
                    border: "1.5px solid rgba(255,255,255,0.9)",
                    boxShadow: `0 8px 32px ${s.glow}`,
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div style={{ position: "absolute", top: 16, right: 18, fontSize: 38, fontWeight: 900, background: s.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.18, fontFamily: "sans-serif" }}>{s.step}</div>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: s.grad, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: `0 6px 20px ${s.glow}` }}>
                    <IconComp size={22} color="white" />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 15, color: "#0f172a", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, fontWeight: 500 }}>{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── KEY BENEFITS ── */}
      <section style={{ background: "linear-gradient(135deg,#1e1b4b 0%,#1e3a5f 50%,#0c4a6e 100%)", padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif" style={{ color: "#fff" }}>
              Why Choose Digital Telehealth?
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 15, marginTop: 12, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              Same gold-standard rehab care, right from the comfort of your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Zero Travel & Wait", desc: "No waiting rooms or commuting. Consult at your exact time slot from anywhere in Pakistan.", icon: FiClock, grad: "linear-gradient(135deg,#0ea5e9,#38bdf8)", glow: "rgba(14,165,233,0.3)" },
              { title: "Portal Integration", desc: "Assessments, exercises, and prescriptions auto-save to your Patient Portal after each session.", icon: FiShield, grad: "linear-gradient(135deg,#7c3aed,#a78bfa)", glow: "rgba(124,58,237,0.3)" },
              { title: "WhatsApp Support", desc: "Session links and post-consultation follow-ups delivered directly on WhatsApp by our clinical team.", icon: FaWhatsapp, grad: "linear-gradient(135deg,#059669,#34d399)", glow: "rgba(5,150,105,0.3)" },
            ].map((b, idx) => {
              const IconComp = b.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(16px)",
                    border: "1.5px solid rgba(255,255,255,0.12)",
                    borderRadius: 24,
                    padding: "32px 28px",
                    boxShadow: `0 8px 40px ${b.glow}`
                  }}
                >
                  <div style={{ width: 56, height: 56, borderRadius: 18, background: b.grad, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: `0 6px 24px ${b.glow}` }}>
                    <IconComp size={24} color="white" />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: 17, color: "#fff", marginBottom: 12 }}>{b.title}</h3>
                  <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TELEHEALTH FAQ ── */}
      <section style={{ background: "linear-gradient(135deg,#fdf4ff 0%,#f0f9ff 100%)", padding: "80px 24px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif" style={{ color: "#0f172a" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: "#64748b", fontSize: 15, marginTop: 12, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
              Find quick answers about video consults, file uploads, and what to expect.
            </p>
          </div>
          <ConsultFaqAccordion />
        </div>
      </section>

      {/* ── MULTI-STEP WIZARD MODAL ── */}
      <AnimatePresence>
        {wizardOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={resetWizard}
          >
            <motion.div 
              initial={{ y: 40, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 40, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: "88vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-150 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                    <TbStethoscope size={20} />
                             <h3 className="font-black text-slate-800 text-base leading-tight">Telehealth Consultation Wizard</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      {booked ? "Completed" : `Step ${step} of 5 — ${step === 1 ? "Consult Channel" : step === 2 ? "Select Doctor" : step === 3 ? "Schedule" : step === 4 ? "Details" : "Payment"}`}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={resetWizard} 
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors border-none cursor-pointer"
                >
                  <FiX size={16} className="text-slate-500" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {booked ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="text-center py-6 space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mx-auto shadow-lg shadow-blue-100">
                      <FiCheck size={36} color="white" />
                    </div>
                    <div className="space-y-2 text-center">
                      <h2 className="text-2xl font-black text-slate-900">Booking Submitted!</h2>
                      <p className="text-slate-500 text-sm">
                        Your <span className="font-bold text-slate-700 capitalize">{channel} Consultation</span> booking with
                      </p>
                      <p className="text-base font-black text-slate-800">{selectedDoc?.name}</p>
                      <p className="text-slate-500 text-xs">
                        is awaiting payment verification. Ref ID: <span className="font-mono font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{bookedAppt?.id || "N/A"}</span>
                      </p>
                      <p className="text-slate-500 text-xs">
                        Scheduled for <span className="font-bold text-slate-700">{selectedDate && `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`}</span> at <span className="font-bold text-slate-700">{selectedSlot}</span>
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left space-y-3 max-w-md mx-auto text-xs font-semibold text-slate-650">
                      <div className="flex items-center gap-3">
                        <FiClock className="text-amber-500 shrink-0" size={14} />
                        <span>Receipt verification pending (usually takes 1-2 hours)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiShield className="text-blue-500 shrink-0" size={14} />
                        <span>Telehealth room credentials will activate upon approval</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaWhatsapp className="text-emerald-500 shrink-0" size={14} />
                        <span>Coordination notification will be sent on WhatsApp</span>
                      </div>
                    </div>

                    {/* Google Calendar + ICS Download Buttons */}
                    <div className="flex gap-3 justify-center max-w-sm mx-auto">
                      <button
                        onClick={() => {
                          const title = encodeURIComponent(`Online Consultation with ${selectedDoc?.name}`);
                          const desc = encodeURIComponent(`Consultation Type: ${channel} online session\nVerification status: Pending`);
                          const formattedDate = selectedDate ? selectedDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z" : "";
                          const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formattedDate}/${formattedDate}&details=${desc}&location=Online`;
                          window.open(url, "_blank");
                        }}
                        className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition-colors"
                      >
                        Google Calendar
                      </button>
                      <button
                        onClick={() => {
                          const dateStr = selectedDate ? selectedDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z" : "";
                          const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Online Consultation with ${selectedDoc?.name}\nDESCRIPTION:Consultation Type: ${channel} online session\\nVerification status: Pending\nLOCATION:Online\nDTSTART:${dateStr}\nDTEND:${dateStr}\nEND:VEVENT\nEND:VCALENDAR`;
                          const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
                          const link = document.createElement("a");
                          link.href = URL.createObjectURL(blob);
                          link.setAttribute("download", "consultation-booking.ics");
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="flex-1 py-3 px-4 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                      >
                        Download ICS
                      </button>
                    </div>

                    <button 
                      onClick={resetWizard} 
                      className="w-full max-w-sm py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm border-none shadow-md cursor-pointer transition-colors"
                    >
                      Close Wizard
                    </button>
                  </motion.div>
                ) : (
                  <div>
                    {/* STEP 1: SELECT CHANNEL */}
                    {step === 1 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-lg font-extrabold text-slate-900">Select Consultation Channel</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">Choose how you'd like to communicate with your doctor.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          {CONSULT_TYPES.map(ct => {
                            const Icon = ct.icon;
                            const isSel = channel === ct.id;
                            return (
                              <button
                                key={ct.id}
                                onClick={() => handleSelectChannel(ct.id)}
                                className="p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between"
                                style={{
                                  borderColor: isSel ? ct.color : "#f1f5f9",
                                  background: isSel ? ct.lightColor : "white",
                                  boxShadow: isSel ? "0 4px 12px rgba(0,0,0,0.02)" : "none"
                                }}
                              >
                                <div 
                                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                                  style={{ background: isSel ? ct.color : "#f8fafc", color: isSel ? "white" : ct.color }}
                                >
                                  <Icon size={20} />
                                </div>
                                <div>
                                  <p className="font-extrabold text-sm text-slate-900">{ct.label}</p>
                                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ct.desc}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: SELECT SPECIALIST */}
                    {step === 2 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-lg font-extrabold text-slate-900">Choose Available Specialist</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">Select one of our board-certified online specialists for your consult.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          {doctorsList.filter(d => d.status === "Active" || d.available).map(doc => {
                            const isSel = selectedDoc?.id === doc.id;
                            return (
                              <button
                                key={doc.id}
                                onClick={() => handleSelectDoc(doc)}
                                className="p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer flex items-start gap-3 w-full"
                                style={{
                                  borderColor: isSel ? "#3b82f6" : "#f1f5f9",
                                  background: isSel ? "#eff6ff" : "white"
                                }}
                              >
                                <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-xl object-cover border border-slate-100 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="font-extrabold text-sm text-slate-900 truncate">{doc.name}</p>
                                  <p className="text-[11px] text-blue-600 font-bold tracking-wide">{doc.specialty}</p>
                                  <p className="text-xs text-slate-400 mt-0.5">{doc.experience} • Fee: {doc.fee}</p>
                                  <div className="mt-1">
                                    <StarRating rating={doc.rating} />
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: PICK DATE & TIME */}
                    {step === 3 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-lg font-extrabold text-slate-900">Schedule Consultation</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">Pick a preferred date and matching time slot.</p>
                        </div>
                        
                        <div className="space-y-3 pt-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Available Dates</label>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {dates.map((d, i) => {
                              const isSel = selectedDate && d.toDateString() === selectedDate.toDateString();
                              return (
                                <button
                                  key={i}
                                  onClick={() => setSelectedDate(d)}
                                  className="flex-shrink-0 flex flex-col items-center py-3 px-4 rounded-xl border-2 transition-all duration-200 min-w-[65px] cursor-pointer"
                                  style={{
                                    borderColor: isSel ? "#3b82f6" : "#f1f5f9",
                                    background: isSel ? "#2563eb" : "white",
                                    color: isSel ? "white" : "inherit"
                                  }}
                                >
                                  <span className={`text-[10px] font-bold ${isSel ? "text-white/80" : "text-slate-400"}`}>{dayNames[d.getDay()]}</span>
                                  <span className="text-base font-black mt-0.5">{d.getDate()}</span>
                                  <span className={`text-[9px] ${isSel ? "text-white/80" : "text-slate-400"}`}>{monthNames[d.getMonth()]}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Available Slots</label>
                          <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map((slot, idx) => {
                              const isSel = selectedSlot === slot;
                              const isAvail = idx % 3 !== 1; // mock availability
                              return (
                                <button
                                  key={slot}
                                  disabled={!isAvail}
                                  onClick={() => setSelectedSlot(slot)}
                                  className="py-2.5 rounded-xl text-xs font-bold border-2 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed text-center"
                                  style={{
                                    borderColor: isSel ? "#3b82f6" : isAvail ? "#f1f5f9" : "#f8fafc",
                                    background: isSel ? "#2563eb" : isAvail ? "white" : "#f8fafc",
                                    color: isSel ? "white" : isAvail ? "#334155" : "#cbd5e1"
                                  }}
                                >
                                  {slot}
                                  {!isAvail && <span className="block text-[9px] font-bold text-slate-300">Booked</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: PATIENT DETAILS */}
                    {step === 4 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-lg font-extrabold text-slate-900">Enter Personal Details</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">Provide your details to complete the consultation setup.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name *</label>
                            <input
                              type="text"
                              value={form.name}
                              onChange={e => setForm({ ...form, name: e.target.value })}
                              placeholder="John Doe"
                              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-400 bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone / WhatsApp *</label>
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={e => setForm({ ...form, phone: e.target.value })}
                              placeholder="+92 300 1234567"
                              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-400 bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={e => setForm({ ...form, email: e.target.value })}
                              placeholder="john@example.com"
                              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-400 bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Age</label>
                            <input
                              type="number"
                              value={form.age}
                              onChange={e => setForm({ ...form, age: e.target.value })}
                              placeholder="30"
                              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-400 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Describe Symptoms (Optional)</label>
                          <textarea
                            value={form.symptoms}
                            onChange={e => setForm({ ...form, symptoms: e.target.value })}
                            placeholder="Briefly describe your symptoms..."
                            className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-400 bg-white resize-none"
                            rows={3}
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Upload Reports / Medical Files (Optional)</label>
                          <button
                            type="button"
                            onClick={() => fileRef.current.click()}
                            className="w-full border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-450 hover:text-blue-500 bg-slate-50/50 cursor-pointer transition-colors"
                          >
                            <FiUpload size={14} />
                            {uploadedFile ? <span>{uploadedFile.name}</span> : <span>Select Medical File (PDF, JPG, PNG)</span>}
                          </button>
                          <input
                            ref={fileRef}
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={e => setUploadedFile(e.target.files[0])}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 5: PAYMENT VERIFICATION */}
                    {step === 5 && (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-lg font-extrabold text-slate-900">Secure Consultation Payment</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">Pay the fee to any of our wallets or bank transfer and input the details below.</p>
                        </div>
                        
                        <div className="space-y-4 pt-2 text-left">
                          <div>
                            <label className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block mb-2">Select Payment Method</label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { name: "Easypaisa", brand: "Easypaisa Wallet" },
                                { name: "JazzCash", brand: "JazzCash Wallet" },
                                { name: "SadaPay", brand: "SadaPay Card" },
                                { name: "Bank Transfer", brand: "Allied Bank (ABL)" }
                              ].map(method => {
                                const isSel = selectedMethod === method.name;
                                return (
                                  <button
                                    key={method.name}
                                    type="button"
                                    onClick={() => setSelectedMethod(method.name)}
                                    className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-16 w-full cursor-pointer ${isSel ? "border-blue-500 text-blue-600 bg-blue-50/30 border-2 font-bold shadow-sm" : "border-slate-200 text-slate-650 hover:bg-slate-50"}`}
                                  >
                                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 leading-none">{method.brand}</span>
                                    <span className="text-xs font-black text-slate-800 leading-none">{method.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-655 space-y-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Recipient Info</span>
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[9px] font-bold">{selectedMethod}</span>
                            </div>
                            {selectedMethod === "Bank Transfer" ? (
                              <div className="space-y-1 text-slate-700 text-xs">
                                <p className="font-bold text-slate-900">Bank: <span className="font-normal text-slate-600">Allied Bank Limited (ABL)</span></p>
                                <p className="font-bold text-slate-900">Account Title: <span className="font-normal text-slate-600">Vital Physio Hub (Pvt) Ltd</span></p>
                                <p className="font-bold text-slate-900">IBAN / Account #: <span className="font-mono bg-white px-1.5 py-0.5 border border-slate-200 rounded text-pink-600 font-bold select-all">PK12ALBL0012345678901234</span></p>
                              </div>
                            ) : (
                              <div className="space-y-1 text-slate-700 text-xs">
                                <p className="font-bold text-slate-900">Account Title: <span className="font-normal text-slate-600">Vital Physio Hub</span></p>
                                <p className="font-bold text-slate-900">Mobile Wallet Number: <span className="font-mono bg-white px-1.5 py-0.5 border border-slate-200 rounded text-pink-600 font-bold select-all">0300-8786187</span></p>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Transaction ID / Reference ID *</label>
                            <input
                              type="text"
                              value={txnRef}
                              onChange={e => setTxnRef(e.target.value)}
                              placeholder="Enter 12-digit Transaction reference ID"
                              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-400 bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Upload Receipt Screenshot (Optional)</label>
                            <button
                              type="button"
                              onClick={() => paymentFileRef.current.click()}
                              className="w-full border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-450 hover:text-blue-500 bg-slate-50/50 cursor-pointer transition-colors"
                            >
                              <FiUpload size={14} />
                              {paymentFile ? <span>{paymentFile.name}</span> : <span>Select receipt image</span>}
                            </button>
                            <input
                              ref={paymentFileRef}
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={e => {
                                const file = e.target.files[0];
                                if (file) {
                                  setPaymentFile(file);
                                  const r = new FileReader();
                                  r.readAsDataURL(file);
                                  r.onloadend = () => {
                                    setScreenshotBase64(r.result);
                                  };
                                }
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Booking Summary Box */}
                    <div className="p-4 mt-4 bg-blue-50/30 border border-blue-100/50 rounded-2xl space-y-2 text-xs font-semibold text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Doctor</span>
                        <span className="text-slate-800 font-extrabold">{selectedDoc?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Channel</span>
                        <span className="text-slate-800 font-extrabold capitalize">{channel} Consultation</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Date / Time</span>
                        <span className="text-slate-800 font-extrabold">
                          {selectedDate && `${dayNames[selectedDate.getDay()]} ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`} • {selectedSlot}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-slate-150 pt-2 text-sm">
                        <span className="text-slate-900 font-bold">Consultation Fee</span>
                        <span className="text-blue-600 font-black">{selectedDoc?.fee}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {!booked && (
                <div className="p-5 border-t border-slate-150 bg-slate-50/50 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      onClick={handlePrevStep}
                      className="px-6 py-3 rounded-xl border border-slate-200 text-slate-650 hover:bg-slate-100 font-bold text-xs cursor-pointer transition-colors flex items-center gap-1.5"
                    >
                      <FiChevronLeft size={16} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 5 ? (
                    <button
                      disabled={(step === 1 && !channel) || (step === 2 && !selectedDoc) || (step === 3 && (!selectedDate || !selectedSlot))}
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-blue-600 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs rounded-xl border-none cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      disabled={!txnRef}
                      onClick={handleBook}
                      className="px-7 py-3 bg-gradient-to-r from-blue-600 to-sky-500 disabled:from-slate-200 disabled:to-slate-200 text-white disabled:text-slate-400 font-bold text-xs rounded-xl border-none cursor-pointer disabled:cursor-not-allowed transition-all"
                    >
                      Submit Consultation Booking
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
