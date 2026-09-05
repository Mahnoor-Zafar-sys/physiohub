import { useState, useRef } from "react";
import { api } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX, FiCalendar, FiHome, FiMonitor, FiArrowLeft, FiArrowRight,
  FiCheck, FiUser, FiPhone, FiMail, FiMapPin, FiClock,
  FiVideo, FiMic, FiUpload, FiShield, FiChevronDown, FiCreditCard, FiFileText
} from "react-icons/fi";

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const DOCTORS = ["Dr. Ghulam Jellani (PT)", "Dr. Sara Ahmed (PT)", "Dr. Usman Malik (PT)"];
const SERVICES = ["Physiotherapy", "Cupping Therapy", "Dry Needling", "Kinesio Taping", "Electrotherapy", "Chiropractic", "Fitness Training"];
const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];
const CONSULTATION_FEE = 1500; // PKR
const HOME_VISIT_FEE = 2500;

const getTodayStr = () => new Date().toISOString().split("T")[0];
const getNext7Days = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      date: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      num: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    });
  }
  return days;
};

/* ─── SMALL ATOMS ───────────────────────────────────────────── */
const Field = ({ label, icon: Icon, children }) => (
  <label className="flex flex-col gap-1">
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
      {Icon && <Icon size={10} />} {label}
    </span>
    {children}
  </label>
);

const Input = (props) => (
  <input {...props} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-slate-50" />
);

const Select = ({ children, ...props }) => (
  <div className="relative">
    <select {...props} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-slate-50 appearance-none pr-8">
      {children}
    </select>
    <FiChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
  </div>
);

/* ─── STEP BAR ──────────────────────────────────────────────── */
const StepBar = ({ steps, current }) => (
  <div className="flex items-center justify-between px-2 mb-6">
    {steps.map((label, idx) => {
      const active = idx === current;
      const done = idx < current;
      return (
        <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${done ? "bg-green-500 text-white" : active ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-slate-100 text-slate-400"}`}>
            {done ? <FiCheck size={14} /> : idx + 1}
          </div>
          <span className={`text-xs font-bold hidden sm:inline ${active ? "text-slate-900" : "text-slate-400"}`}>{label}</span>
          {idx < steps.length - 1 && <div className={`h-0.5 flex-1 mx-2 rounded-full ${done ? "bg-green-400" : "bg-slate-100"}`} />}
        </div>
      );
    })}
  </div>
);

/* ─── PAYMENT UPLOAD STEP ───────────────────────────────────── */
function PaymentStep({ fee, onPaid, onBack, accentColor = "blue" }) {
  const [method, setMethod] = useState("online"); // "online" | "challan"
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const colors = {
    blue: { btn: "bg-blue-600 hover:bg-blue-700", ring: "ring-blue-200", border: "border-blue-500 bg-blue-50 text-blue-700" },
    purple: { btn: "bg-purple-600 hover:bg-purple-700", ring: "ring-purple-200", border: "border-purple-500 bg-purple-50 text-purple-700" },
    emerald: { btn: "bg-emerald-600 hover:bg-emerald-700", ring: "ring-emerald-200", border: "border-emerald-500 bg-emerald-50 text-emerald-700" },
  }[accentColor];

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError("");
  };

  const handleConfirm = () => {
    if (!file) {
      setError("Please upload your payment proof before continuing.");
      return;
    }

    setSubmitting(true);
    setError("");

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await onPaid({
          paymentMethod: method === "online" ? "Easypaisa / JazzCash QR" : "ABL Bank Transfer",
          paymentScreenshot: reader.result,
        });
      } catch (err) {
        console.error("Booking submission failed:", err);
        setError("Unable to submit the booking right now. Please try again.");
        setSubmitting(false);
      }
    };
    reader.onerror = () => {
      setError("Unable to read the payment proof. Please choose the file again.");
      setSubmitting(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Consultation Fee</p>
        <p className="text-2xl font-black text-slate-900">PKR {fee.toLocaleString()}</p>
      </div>

      <p className="text-sm font-bold text-slate-700">Choose Payment Method</p>
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: "online", icon: FiCreditCard, label: "JazzCash / EasyPaisa QR", sub: "Scan QR code or Transfer" },
          { id: "challan", icon: FiFileText, label: "ABL Bank Transfer", sub: "Allied Bank Limited" },
        ].map(({ id, icon: Icon, label, sub }) => (
          <button key={id} onClick={() => { setMethod(id); setError(""); }} disabled={submitting}
            className={`p-3 rounded-xl border-2 text-left cursor-pointer transition-all ${method === id ? colors.border : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
            <Icon size={18} className="mb-1.5" />
            <p className="text-xs font-bold leading-tight">{label}</p>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{sub}</p>
          </button>
        ))}
      </div>

      {method && (
        <AnimatePresence mode="wait">
          <motion.div key={method} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {method === "online" && (
              <div className="bg-gradient-to-br from-slate-50 to-pink-50/40 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-extrabold text-slate-900">Account Title:</span>
                  <span className="font-bold text-pink-600 bg-white px-2 py-0.5 rounded border border-slate-200">Ghulam Jellani</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-2.5 rounded-xl border border-rose-200 text-center space-y-1.5 shadow-xs">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider block">JazzCash</span>
                    <p className="font-mono text-xs font-black text-slate-900 select-all">03008786187</p>
                    <div className="w-28 h-28 mx-auto border border-slate-200 rounded-lg overflow-hidden p-1 bg-white">
                      <img src="/jazzcash-qr.jpg" alt="JazzCash QR Code - Ghulam Jellani" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[9px] text-slate-400 block font-semibold">Scan with JazzCash App</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-200 text-center space-y-1.5 shadow-xs">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider block">EasyPaisa</span>
                    <p className="font-mono text-xs font-black text-slate-900 select-all">03008786187</p>
                    <div className="w-28 h-28 mx-auto border border-slate-200 rounded-lg overflow-hidden p-1 bg-white">
                      <img src="/easypaisa-qr.jpg" alt="EasyPaisa QR Code - Ghulam Jellani" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[9px] text-slate-400 block font-semibold">Scan with EasyPaisa App</span>
                  </div>
                </div>
              </div>
            )}
            {method === "challan" && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 space-y-2">
                <p className="font-extrabold text-blue-950 uppercase tracking-wider text-[11px]">ABL — Allied Bank Limited</p>
                <div className="bg-white p-3 rounded-lg border border-blue-150 space-y-1">
                  <p><span className="font-bold text-slate-500">Bank Name:</span> <strong className="text-slate-800">Allied Bank Limited (ABL)</strong></p>
                  <p><span className="font-bold text-slate-500">Account Number:</span> <strong className="font-mono text-blue-700 font-bold select-all">08390010161147740027</strong></p>
                  <p><span className="font-bold text-slate-500">Account Title:</span> <strong className="text-slate-900">Ghulam Jellani</strong></p>
                  <p><span className="font-bold text-slate-500">Amount:</span> <strong className="text-emerald-700">PKR {fee.toLocaleString()}</strong></p>
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">Upload Payment Proof</p>
              <div
                onClick={() => !submitting && fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${preview ? "border-green-300 bg-green-50" : "border-slate-300 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/30"}`}>
                {preview ? (
                  <div className="space-y-2">
                    <img src={preview} alt="Payment proof" className="max-h-28 mx-auto rounded-lg object-contain" />
                    <p className="text-xs text-green-600 font-bold">{file?.name}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-2">
                    <FiUpload size={22} className="text-slate-400" />
                    <p className="text-xs text-slate-500 font-semibold">Click to upload screenshot / photo</p>
                    <p className="text-[10px] text-slate-400">JPG, PNG, PDF supported</p>
                  </div>
                )}
                <input ref={fileRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFile} disabled={submitting} />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={onBack} disabled={submitting} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <FiArrowLeft size={13} /> Back
              </button>
              <button onClick={handleConfirm} disabled={!file || submitting}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-white rounded-xl text-sm font-bold cursor-pointer border-none transition-all ${file && !submitting ? colors.btn : "bg-slate-300 cursor-not-allowed"}`}>
                <FiCheck size={14} /> {submitting ? "Submitting..." : "Verify & Confirm"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {!method && (
        <button onClick={onBack} disabled={submitting} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors w-full justify-center">
          <FiArrowLeft size={13} /> Back
        </button>
      )}
    </div>
  );
}
/* ─── CONFIRMED SCREEN ──────────────────────────────────────── */
function ConfirmedScreen({ icon: Icon, iconBg, title, details, onClose }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center gap-4 py-6">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center ${iconBg}`}>
        <FiShield size={36} className="text-white" />
      </div>
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
          <FiCheck size={12} /> Payment Verified
        </div>
        <h3 className="text-xl font-black text-slate-900 mt-2">{title}</h3>
      </div>
      <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2">
        {details.map(({ label, val }) => (
          <div key={label} className="flex justify-between items-start gap-3 text-sm">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-wide shrink-0">{label}</span>
            <span className="text-slate-800 font-semibold text-right">{val}</span>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-xs">We will call you shortly to confirm. Thank you for choosing Vital Physio Hub!</p>
      <button onClick={onClose} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm cursor-pointer border-none hover:bg-blue-700 transition-colors">
        Done
      </button>
    </motion.div>
  );
}

/* ─── FLOW 1: BOOKING FORM ──────────────────────────────────── */
function BookingFormFlow({ onBack, onClose }) {
  const [step, setStep] = useState(0); // 0=form, 1=review, 2=payment, 3=confirmed
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", age: "", gender: "", phone: "", email: "",
    address: "", doctor: DOCTORS[0], service: SERVICES[0],
    date: getTodayStr(), time: TIME_SLOTS[0], notes: "",
  });
  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    if (error) setError("");
  };

  const validateForm = () => {
    const required = [
      ["Full Name", form.name],
      ["Age", form.age],
      ["Gender", form.gender],
      ["Phone", form.phone],
      ["Email", form.email],
      ["Address", form.address],
      ["Doctor", form.doctor],
      ["Service", form.service],
      ["Date", form.date],
      ["Time", form.time],
    ];
    const missing = required.find(([, value]) => !String(value || "").trim());
    if (missing) {
      setError(`Please fill in ${missing[0]} before continuing.`);
      return false;
    }
    return true;
  };

  const submitBooking = async ({ paymentMethod, paymentScreenshot }) => {
    await api.createAppointment({
      doctor: form.doctor,
      doctor_name: form.doctor,
      date: form.date,
      time: form.time,
      type: "In-Person Visit",
      branch: "Islamabad Branch",
      status: "Pending",
      payment_status: "Pending Verification",
      patient: form.name,
      patient_name: form.name,
      patient_age: form.age,
      patient_gender: form.gender,
      patient_phone: form.phone,
      patient_email: form.email,
      patient_address: form.address,
      service: form.service,
      payment_method: paymentMethod,
      payment_screenshot: paymentScreenshot,
      notes: form.notes || "",
    });
    setStep(3);
  };

  if (step === 3) return (
    <ConfirmedScreen
      title="Appointment Booked!"
      iconBg="bg-blue-600"
      details={[
        { label: "Name", val: form.name },
        { label: "Doctor", val: form.doctor },
        { label: "Service", val: form.service },
        { label: "Date", val: form.date },
        { label: "Time", val: form.time },
        { label: "Location", val: "Vital Physio Hub, Islamabad" },
      ]}
      onClose={onClose}
    />
  );

  return (
    <div>
      <StepBar steps={["Patient Info", "Review", "Payment", "Confirmed"]} current={step} />

      {step === 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name" icon={FiUser}><Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name" /></Field>
            <Field label="Age"><Input type="number" value={form.age} onChange={e => set("age", e.target.value)} placeholder="e.g. 28" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Gender"><Select value={form.gender} onChange={e => set("gender", e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></Select></Field>
            <Field label="Phone" icon={FiPhone}><Input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+92 300..." /></Field>
          </div>
          <Field label="Email" icon={FiMail}><Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@email.com" /></Field>
          <Field label="Address" icon={FiMapPin}><Input value={form.address} onChange={e => set("address", e.target.value)} placeholder="Your address" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Doctor"><Select value={form.doctor} onChange={e => set("doctor", e.target.value)}>{DOCTORS.map(d => <option key={d}>{d}</option>)}</Select></Field>
            <Field label="Service"><Select value={form.service} onChange={e => set("service", e.target.value)}>{SERVICES.map(s => <option key={s}>{s}</option>)}</Select></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date" icon={FiCalendar}><Input type="date" value={form.date} min={getTodayStr()} onChange={e => set("date", e.target.value)} /></Field>
            <Field label="Time" icon={FiClock}><Select value={form.time} onChange={e => set("time", e.target.value)}>{TIME_SLOTS.map(t => <option key={t}>{t}</option>)}</Select></Field>
          </div>
          <Field label="Notes">
            <textarea value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Symptoms or requirements..." rows={2} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all bg-slate-50 resize-none" />
          </Field>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors"><FiArrowLeft size={13} /> Back</button>
            <button onClick={() => validateForm() && setStep(1)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold cursor-pointer border-none hover:bg-blue-700 transition-colors">Review <FiArrowRight size={13} /></button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-black text-slate-900 text-sm">Review Your Information</h3>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
            {[
              { label: "Name", val: form.name }, { label: "Age/Gender", val: `${form.age} / ${form.gender}` },
              { label: "Phone", val: form.phone }, { label: "Email", val: form.email },
              { label: "Address", val: form.address }, { label: "Doctor", val: form.doctor },
              { label: "Service", val: form.service }, { label: "Date", val: form.date },
              { label: "Time", val: form.time }, { label: "Notes", val: form.notes || "None" },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between items-start gap-3 text-sm">
                <span className="text-slate-400 font-bold text-xs uppercase tracking-wide shrink-0">{label}</span>
                <span className="text-slate-800 font-semibold text-right text-xs">{val}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors"><FiArrowLeft size={13} /> Edit</button>
            <button onClick={() => setStep(2)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold cursor-pointer border-none hover:bg-blue-700 transition-colors">Proceed to Payment <FiArrowRight size={13} /></button>
          </div>
        </div>
      )}

      {step === 2 && (
        <PaymentStep
          fee={CONSULTATION_FEE}
          accentColor="blue"
          onBack={() => setStep(1)}
          onPaid={submitBooking}
        />
      )}
    </div>
  );
}

/* ─── FLOW 2: ONLINE CONSULTATION ──────────────────────────── */
function OnlineConsultationFlow({ onBack, onClose }) {
  const [step, setStep] = useState(0); // 0=mode, 1=details, 2=payment, 3=confirmed
  const [mode, setMode] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", doctor: DOCTORS[0], date: getTodayStr(), time: TIME_SLOTS[0], concern: "" });
  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); if (error) setError(""); };

  const validateDetails = () => {
    const required = [
      ["Full Name", form.name],
      ["Phone / WhatsApp", form.phone],
      ["Email", form.email],
      ["Doctor", form.doctor],
      ["Date", form.date],
      ["Time", form.time],
    ];
    const missing = required.find(([, value]) => !String(value || "").trim());
    if (missing) {
      setError(`Please fill in ${missing[0]} before continuing.`);
      return false;
    }
    return true;
  };

  const submitBooking = async ({ paymentMethod, paymentScreenshot }) => {
    await api.createAppointment({
      doctor: form.doctor,
      doctor_name: form.doctor,
      date: form.date,
      time: form.time,
      type: "Online Consultation",
      branch: "Online",
      consult_channel: mode === "video" ? "Video Call" : "Audio Call",
      status: "Pending",
      payment_status: "Pending Verification",
      patient: form.name,
      patient_name: form.name,
      patient_phone: form.phone,
      patient_email: form.email,
      payment_method: paymentMethod,
      payment_screenshot: paymentScreenshot,
      notes: form.concern || "",
    });
    setStep(3);
  };

  if (step === 3) return (
    <ConfirmedScreen
      title="Online Session Booked!"
      iconBg="bg-emerald-600"
      details={[
        { label: "Name", val: form.name || "—" },
        { label: "Mode", val: mode === "video" ? "📹 Video Call" : "🎤 Audio Call" },
        { label: "Doctor", val: form.doctor },
        { label: "Date", val: form.date },
        { label: "Time", val: form.time },
        { label: "Fee Paid", val: `PKR ${CONSULTATION_FEE.toLocaleString()}` },
        { label: "Join via", val: "WhatsApp / Zoom (link sent to your phone)" },
      ]}
      onClose={onClose}
    />
  );

  return (
    <div>
      <StepBar steps={["Mode", "Details", "Payment", "Confirmed"]} current={step} />
      {step === 0 && (
        <div className="space-y-4">
          <h3 className="font-black text-slate-900 text-sm mb-3">Select Consultation Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "video", icon: FiVideo, label: "Video Call", sub: "Face-to-face via Zoom / WhatsApp", color: "border-blue-500 bg-blue-50 text-blue-700" },
              { id: "audio", icon: FiMic, label: "Audio Call", sub: "Voice consultation via phone", color: "border-purple-500 bg-purple-50 text-purple-700" },
            ].map(({ id, icon: Icon, label, sub, color }) => (
              <button key={id} onClick={() => { setMode(id); setError(""); }}
                className={`p-4 rounded-2xl border-2 text-left cursor-pointer transition-all ${mode === id ? color : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
                <Icon size={22} className="mb-2" />
                <p className="text-sm font-bold">{label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{sub}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors"><FiArrowLeft size={13} /> Back</button>
            <button onClick={() => mode && setStep(1)} disabled={!mode}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-none transition-all ${mode ? "bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
              Continue <FiArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 mb-1">
            {mode === "video" ? <FiVideo size={12} /> : <FiMic size={12} />} {mode === "video" ? "Video Call" : "Audio Call"} Selected
          </div>
          <Field label="Full Name" icon={FiUser}><Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" /></Field>
          <Field label="Phone / WhatsApp" icon={FiPhone}><Input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+92 300 0000000" /></Field>
          <Field label="Email" icon={FiMail}><Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@email.com" /></Field>
          <Field label="Select Doctor"><Select value={form.doctor} onChange={e => set("doctor", e.target.value)}>{DOCTORS.map(d => <option key={d}>{d}</option>)}</Select></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date" icon={FiCalendar}><Input type="date" value={form.date} min={getTodayStr()} onChange={e => set("date", e.target.value)} /></Field>
            <Field label="Time" icon={FiClock}><Select value={form.time} onChange={e => set("time", e.target.value)}>{TIME_SLOTS.map(t => <option key={t}>{t}</option>)}</Select></Field>
          </div>
          <Field label="Main Health Concern">
            <textarea value={form.concern} onChange={e => set("concern", e.target.value)} placeholder="Describe your issue briefly..." rows={2}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-all bg-slate-50 resize-none" />
          </Field>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button onClick={() => setStep(0)} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors"><FiArrowLeft size={13} /> Back</button>
            <button onClick={() => validateDetails() && setStep(2)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold cursor-pointer border-none hover:bg-emerald-700 transition-colors">Proceed to Payment <FiArrowRight size={13} /></button>
          </div>
        </div>
      )}

      {step === 2 && (
        <PaymentStep fee={CONSULTATION_FEE} accentColor="emerald"
          onBack={() => setStep(1)} onPaid={submitBooking} />
      )}
    </div>
  );
}

/* ─── FLOW 3: HOME CONSULTATION ─────────────────────────────── */
function HomeConsultationFlow({ onBack, onClose }) {
  const [step, setStep] = useState(0); // 0=calendar, 1=service+doctor+details, 2=payment, 3=confirmed
  const days = getNext7Days();
  const [selectedDay, setSelectedDay] = useState(days[0].date);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [form, setForm] = useState({ name: "", phone: "", address: "", doctor: DOCTORS[0], service: SERVICES[0] });
  const [error, setError] = useState("");
  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); if (error) setError(""); };

  const validateDetails = () => {
    const required = [
      ["Full Name", form.name],
      ["Phone", form.phone],
      ["Home Address", form.address],
      ["Doctor", form.doctor],
      ["Service", form.service],
      ["Date", selectedDay],
      ["Time", selectedTime],
    ];
    const missing = required.find(([, value]) => !String(value || "").trim());
    if (missing) {
      setError(`Please fill in ${missing[0]} before continuing.`);
      return false;
    }
    return true;
  };

  const submitBooking = async ({ paymentMethod, paymentScreenshot }) => {
    await api.createAppointment({
      doctor: form.doctor,
      doctor_name: form.doctor,
      date: selectedDay,
      time: selectedTime,
      type: "Doctor Home Visit",
      branch: "Islamabad",
      consult_channel: "Home Visit",
      home_address: form.address,
      home_time_window: selectedTime,
      status: "Pending",
      payment_status: "Pending Verification",
      patient: form.name,
      patient_name: form.name,
      patient_phone: form.phone,
      service: form.service,
      payment_method: paymentMethod,
      payment_screenshot: paymentScreenshot,
      notes: "",
    });
    setStep(3);
  };

  if (step === 3) return (
    <ConfirmedScreen
      title="Home Visit Scheduled!"
      iconBg="bg-purple-600"
      details={[
        { label: "Name", val: form.name || "—" },
        { label: "Address", val: form.address || "—" },
        { label: "Doctor", val: form.doctor },
        { label: "Service", val: form.service },
        { label: "Date", val: selectedDay },
        { label: "Time", val: selectedTime },
        { label: "Fee Paid", val: `PKR ${HOME_VISIT_FEE.toLocaleString()}` },
        { label: "Note", val: "Our specialist will arrive at your address on time." },
      ]}
      onClose={onClose}
    />
  );

  return (
    <div>
      <StepBar steps={["Schedule", "Details", "Payment", "Confirmed"]} current={step} />

      {step === 0 && (
        <div className="space-y-4">
          <h3 className="font-black text-slate-900 text-sm">Choose Date</h3>
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {days.map(({ date, day, num, month }) => (
              <button key={date} onClick={() => setSelectedDay(date)}
                className={`flex flex-col items-center px-3 py-2.5 rounded-xl border-2 min-w-[56px] cursor-pointer transition-all ${selectedDay === date ? "border-purple-500 bg-purple-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-purple-300"}`}>
                <span className="text-[10px] font-bold uppercase">{day}</span>
                <span className="text-lg font-black leading-tight">{num}</span>
                <span className="text-[10px] font-semibold">{month}</span>
              </button>
            ))}
          </div>

          <h3 className="font-black text-slate-900 text-sm">Choose Time Slot</h3>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map(t => (
              <button key={t} onClick={() => setSelectedTime(t)}
                className={`py-2 px-2 rounded-xl border-2 text-xs font-bold cursor-pointer transition-all ${selectedTime === t ? "border-purple-500 bg-purple-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-purple-300"}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors"><FiArrowLeft size={13} /> Back</button>
            <button onClick={() => setStep(1)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold cursor-pointer border-none hover:bg-purple-700 transition-colors">Continue <FiArrowRight size={13} /></button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs text-purple-800">
            📅 <strong>{selectedDay}</strong> at <strong>{selectedTime}</strong>
          </div>
          <Field label="Full Name" icon={FiUser}><Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Patient name" /></Field>
          <Field label="Phone" icon={FiPhone}><Input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+92 300 0000000" /></Field>
          <Field label="Home Address" icon={FiMapPin}><Input value={form.address} onChange={e => set("address", e.target.value)} placeholder="Complete address for the visit" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Service"><Select value={form.service} onChange={e => set("service", e.target.value)}>{SERVICES.map(s => <option key={s}>{s}</option>)}</Select></Field>
            <Field label="Doctor"><Select value={form.doctor} onChange={e => set("doctor", e.target.value)}>{DOCTORS.map(d => <option key={d}>{d}</option>)}</Select></Field>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button onClick={() => setStep(0)} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 cursor-pointer bg-white hover:bg-slate-50 transition-colors"><FiArrowLeft size={13} /> Back</button>
            <button onClick={() => validateDetails() && setStep(2)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold cursor-pointer border-none hover:bg-purple-700 transition-colors">Proceed to Payment <FiArrowRight size={13} /></button>
          </div>
        </div>
      )}

      {step === 2 && (
        <PaymentStep fee={HOME_VISIT_FEE} accentColor="purple"
          onBack={() => setStep(1)} onPaid={submitBooking} />
      )}
    </div>
  );
}
/* ─── MAIN MODAL ────────────────────────────────────────────── */
export default function BookAppointmentModal({ isOpen, onClose }) {
  const [view, setView] = useState("booking"); // default "booking" | "online" | "home"

  const handleClose = () => { onClose(); };

  const HEADER_CONFIGS = {
    booking: { title: "On Site Visit (In-Clinic Booking)", bg: "bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white" },
    online: { title: "Online Consult (Video / Telehealth)", bg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white" },
    home: { title: "Doctor Visit Home (Home Consultation)", bg: "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white" },
  };

  const activeHeader = HEADER_CONFIGS[view] || HEADER_CONFIGS.booking;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[998] bg-slate-900/60 backdrop-blur-sm" onClick={handleClose} />

          <motion.div key="md" initial={{ opacity: 0, scale: 0.94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 28 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 pointer-events-none">
            <div className="relative w-full max-w-[550px] bg-white rounded-3xl shadow-2xl pointer-events-auto flex flex-col overflow-hidden" style={{ maxHeight: "92vh" }} onClick={e => e.stopPropagation()}>

              {/* Form Colored Header Bar */}
              <div className={`flex items-center justify-between px-6 py-4 transition-all duration-300 shadow-md ${activeHeader.bg}`}>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-white/20 rounded-lg text-white font-bold text-xs">
                    {view === "booking" ? "🏥" : view === "online" ? "💻" : "🏠"}
                  </span>
                  <h2 className="font-extrabold text-white text-base tracking-tight">{activeHeader.title}</h2>
                </div>
                <button onClick={handleClose} className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer border-none transition-colors">
                  <FiX size={19} />
                </button>
              </div>

              {/* 3 Top Category Selection Buttons (On Site Visit, Online Consult, Doctor Visit Home) */}
              <div className="p-3 bg-slate-50 border-b border-slate-150">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setView("booking")}
                    className={`py-2.5 px-2 rounded-xl text-[11px] font-black transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 border cursor-pointer ${
                      view === "booking"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <FiCalendar size={14} />
                    <span>On Site Visit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("online")}
                    className={`py-2.5 px-2 rounded-xl text-[11px] font-black transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 border cursor-pointer ${
                      view === "online"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-[1.02]"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <FiMonitor size={14} />
                    <span>Online Consult</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("home")}
                    className={`py-2.5 px-2 rounded-xl text-[11px] font-black transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 border cursor-pointer ${
                      view === "home"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-600 shadow-md shadow-purple-500/20 scale-[1.02]"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    <FiHome size={14} />
                    <span>Doctor Visit Home</span>
                  </button>
                </div>
              </div>

              {/* Scrollable body displaying chosen form */}
              <div className="overflow-y-auto flex-1 px-5 py-4">
                <AnimatePresence mode="wait">
                  {view === "booking" && (
                    <motion.div key="booking" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
                      <BookingFormFlow onBack={() => {}} onClose={handleClose} />
                    </motion.div>
                  )}
                  {view === "online" && (
                    <motion.div key="online" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
                      <OnlineConsultationFlow onBack={() => {}} onClose={handleClose} />
                    </motion.div>
                  )}
                  {view === "home" && (
                    <motion.div key="home" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
                      <HomeConsultationFlow onBack={() => {}} onClose={handleClose} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}