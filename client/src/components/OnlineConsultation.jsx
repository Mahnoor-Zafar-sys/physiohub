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
  const fileRef = useRef();

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
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleBook = async () => {
    if (!form.name || !form.phone) {
      alert("Please fill in your name and phone number.");
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
        type: channel || "video",
        branch: "Online",
        status: "Confirmed",
        patient: form.name,
        payment_status: "Paid",
        patient_report: reportBase64,
        patient_report_name: reportName
      };
      
      const res = await api.createAppointment(apptData);
      if (res) {
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

      {/* ── OVERHAULED HERO SECTION ── */}
      <div 
        className="relative min-h-[75vh] flex items-center justify-center bg-cover bg-center px-4" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80')" }}
      >
        {/* Dark overlay grid overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-transparent z-0" />
        
        <div className="relative z-10 max-w-4xl w-full text-left md:pl-8 text-white space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white font-serif">
              Consult Top Specialists <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
                100% Online & Secure
              </span>
            </h1>
            <p className="text-slate-300 text-sm md:text-lg max-w-xl leading-relaxed">
              Connect with leading physiotherapists, chiropractors, and medical consultants from anywhere. Skip the waiting room with our guided diagnostic consult wizard.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button
              onClick={() => setWizardOpen(true)}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-base px-8 py-4.5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(37,99,235,0.35)] hover:shadow-[0_24px_48px_-8px_rgba(14,165,233,0.5)] transition-all duration-305 hover:-translate-y-0.5"
            >
              <FiActivity className="text-xl animate-pulse text-sky-100" />
              <span>Start Online Consultation</span>
              <FiArrowRight className="text-lg transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── STICKY TRUST BAR ── */}
      <div className="bg-white border-y border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-around items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <FiShield size={16} className="text-blue-500" />
            <span>100% HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <FiLock size={16} className="text-blue-500" />
            <span>End-to-End Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <TbActivity size={16} className="text-blue-500" />
            <span>Digital Prescriptions</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar size={16} className="text-blue-500" />
            <span>Direct WhatsApp Follow-up</span>
          </div>
        </div>
      </div>

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
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-base leading-tight">Telehealth Consultation Wizard</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                      {booked ? "Completed" : `Step ${step} of 4 — ${step === 1 ? "Consult Channel" : step === 2 ? "Select Doctor" : step === 3 ? "Schedule" : "Details"}`}
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
                    <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-100">
                      <FiCheck size={36} color="white" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-slate-900">Consultation Booked!</h2>
                      <p className="text-slate-500 text-sm">
                        Your <span className="font-bold text-slate-700 capitalize">{channel} Consultation</span> with
                      </p>
                      <p className="text-lg font-black text-slate-800">{selectedDoc?.name}</p>
                      <p className="text-slate-500 text-sm">
                        is confirmed for <span className="font-bold text-slate-700">{selectedDate && `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]}`}</span> at <span className="font-bold text-slate-700">{selectedSlot}</span>
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left space-y-3 max-w-md mx-auto text-xs font-semibold text-slate-655">
                      <div className="flex items-center gap-3">
                        <FiCheck className="text-emerald-500" />
                        <span>Confirmation sent via Email and SMS</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaWhatsapp className="text-emerald-500" />
                        <span>Direct WhatsApp coordination link dispatched</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiShield className="text-emerald-500" />
                        <span>Encrypted HIPAA-compliant telehealth room initialized</span>
                      </div>
                    </div>

                    <button 
                      onClick={resetWizard} 
                      className="w-full max-w-sm py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-sm border-none shadow-md cursor-pointer transition-colors"
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
                            className="w-full border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-500 bg-slate-50/50 cursor-pointer transition-colors"
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

                        {/* Booking Summary Box */}
                        <div className="p-4 bg-blue-50/30 border border-blue-100/50 rounded-2xl space-y-2 text-xs font-semibold text-slate-700">
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
                      </motion.div>
                    )}
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

                  {step < 4 ? (
                    <button
                      disabled={(step === 1 && !channel) || (step === 2 && !selectedDoc) || (step === 3 && (!selectedDate || !selectedSlot))}
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-blue-600 disabled:bg-slate-200 text-white disabled:text-slate-400 font-bold text-xs rounded-xl border-none cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      disabled={!form.name || !form.phone}
                      onClick={handleBook}
                      className="px-7 py-3 bg-gradient-to-r from-blue-600 to-sky-500 disabled:from-slate-200 disabled:to-slate-200 text-white disabled:text-slate-400 font-bold text-xs rounded-xl border-none cursor-pointer disabled:cursor-not-allowed transition-all"
                    >
                      Confirm Consultation
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
