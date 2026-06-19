import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  FiPhoneCall, FiAlertOctagon, FiMapPin, FiTruck, 
  FiClock, FiCheck, FiHeart, FiArrowRight, FiShield
} from "react-icons/fi";
import { FaHeartbeat, FaAmbulance } from "react-icons/fa";

const triageGuidelines = [
  {
    id: "chest-pain",
    title: "Chest Pain & Cardiac Distress",
    severity: "CRITICAL (Immediate Action)",
    steps: [
      "Call our hotline immediately: +92 300 8786187.",
      "Have the patient sit down and remain completely calm.",
      "Loosen any tight clothing around their neck or chest.",
      "If the patient is conscious and has prescribed nitroglycerin, administer it.",
      "Do NOT leave the patient unattended."
    ]
  },
  {
    id: "breathing",
    title: "Severe Breathing Difficulties",
    severity: "HIGH URGENCY",
    steps: [
      "Sit the patient upright to help open their airways.",
      "Help them use their inhaler or nebulizer if available.",
      "Ensure rooms are well-ventilated; open windows for fresh air.",
      "Avoid giving the patient anything to eat or drink.",
      "Keep talking to them to prevent panic and hyperventilation."
    ]
  },
  {
    id: "burns",
    title: "Severe Burns & Scalds",
    severity: "MEDIUM URGENCY",
    steps: [
      "Run cool (not cold or icy) water over the burn for 10–20 minutes.",
      "Do NOT apply ointments, butter, or home remedies to the burn.",
      "Remove loose clothing, but do NOT peel away stuck fabrics.",
      "Cover the area loosely with clean, sterile plastic wrap.",
      "Elevate the burned limb if possible to reduce swelling."
    ]
  },
  {
    id: "bleeding",
    title: "Heavy Bleeding & Traumas",
    severity: "HIGH URGENCY",
    steps: [
      "Apply direct pressure to the wound using a clean sterile cloth.",
      "Elevate the injured limb above the level of the heart.",
      "Do NOT remove the cloth if blood soaks through; add more layers.",
      "Keep the patient warm and lying flat to prevent shock.",
      "Secure the dressing with a bandage once bleeding slows."
    ]
  }
];

export default function Emergency() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [urgency, setUrgency] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (bookingConfirmed && progress < 100) {
      const timer = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            return 100;
          }
          return p + 20;
        });
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [bookingConfirmed, progress]);

  const handleRequestAmbulance = (e) => {
    e.preventDefault();
    if (location && phone && urgency) {
      setBookingConfirmed(true);
    }
  };

  const getProgressLabel = () => {
    if (progress === 0) return "Ambulance Request Dispatched";
    if (progress === 20) return "Emergency Coordinator Assigned";
    if (progress === 40) return "Ambulance Dispatched from DHA Branch";
    if (progress === 60) return "Paramedic Team In Route";
    if (progress === 80) return "Ambulance Near Location (1 min away)";
    return "Ambulance Arrived at Scene";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <Navbar />

      {/* --- HERO BANNER --- */}
      <section 
        className="relative overflow-hidden pt-36 pb-20"
        style={{ background: "linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fff1f2 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-red-100 rounded-full blur-[130px] animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-rose-200/40 rounded-full blur-[130px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-100 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-widest mb-6">
              <FiAlertOctagon size={13} className="animate-bounce" />
              24/7 Standby Support
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif mb-6 leading-tight text-slate-900">
              Emergency Trauma & <span className="text-red-600">Ambulance Care</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              If you or someone near you is in critical condition, call our direct hotline immediately or request a real-time ambulance dispatch below.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+923008786187"
                className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold rounded-2xl shadow-xl shadow-red-200 hover:bg-red-700 transition-colors border-none text-base"
                style={{ textDecoration: "none" }}
              >
                <FiPhoneCall className="animate-pulse" /> Call +92 300 8786187
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- QUICK ACTION WIZARD --- */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 relative z-20 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10">
          {!bookingConfirmed ? (
            <form onSubmit={handleRequestAmbulance} className="space-y-6 text-left">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <FaAmbulance className="text-red-500" /> Request Ambulance Dispatch
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Provide the details below. Our triage dispatch center will immediately call your number to confirm details while dispatching the closest vehicle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Emergency Severity</label>
                  <select 
                    value={urgency} 
                    onChange={e => setUrgency(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400 transition-colors bg-white"
                  >
                    <option value="">Select Level</option>
                    <option value="Critical">Critical (Unconscious, Cardiac Arrest)</option>
                    <option value="High">High (Severe Bleeding, Fracture)</option>
                    <option value="Medium">Medium (Moderate Burns, Sprains)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Contact Phone Number</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 8786187"
                    required
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-red-400 transition-colors bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Pickup Address / Location</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={location} 
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Provide detailed home address, street, or landmark"
                    required
                    className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:border-red-400 transition-colors bg-white"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-slate-900 hover:bg-red-600 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                <FiTruck /> Dispatch Ambulance Now
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto text-red-600 animate-pulse">
                <FiTruck size={36} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Ambulance Dispatch Active</h2>
              
              {/* Tracker Progress Stepper */}
              <div className="max-w-md mx-auto space-y-3">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Dispatched</span>
                  <span>En Route</span>
                  <span>Arrived</span>
                </div>
              </div>

              <div className="bg-red-50 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3 border border-red-100">
                <p className="text-sm font-bold text-red-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                  Status: {getProgressLabel()}
                </p>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Pickup Location:</strong> {location}</p>
                  <p><strong>Triage Priority:</strong> {urgency} Emergency</p>
                  <p><strong>Driver Contact:</strong> +92 341 7388830</p>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <a href="tel:+923008786187" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5" style={{ textDecoration: "none" }}>
                  <FiPhoneCall /> Call Dispatcher
                </a>
                <button onClick={() => setBookingConfirmed(false)} className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer border-none">
                  Cancel Request
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* --- FIRST AID TRIAGE INSTRUCTIONS --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            Emergency Triage Guide
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Follow these clinical instructions while waiting for the paramedic team. Proper actions can prevent complications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {triageGuidelines.map((guide) => (
            <div 
              key={guide.id} 
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <span className="inline-block text-[10px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full mb-4">
                  {guide.severity}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{guide.title}</h3>
                <ul className="space-y-3.5 text-left">
                  {guide.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-600 text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CLOSING FAQ / DISCLAIMER --- */}
      <section className="py-12 bg-slate-100 border-t border-slate-200/60 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Medical Disclaimer</p>
          <p className="text-slate-500 text-xs leading-relaxed">
            These triage instructions are for reference purposes only and do not replace professional medical advice. Always call local emergency numbers or our dedicated lines immediately in severe health scenarios.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
