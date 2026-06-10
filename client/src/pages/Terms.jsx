import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiFileText, FiAlertTriangle, FiCalendar, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <Navbar />

      {/* --- HERO BANNER --- */}
      <section 
        className="relative overflow-hidden pt-36 pb-20"
        style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-sky-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <FiFileText className="text-sky-500" />
              Service Guidelines
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif mb-6 leading-tight text-slate-900">
              Terms & <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Conditions</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Read our service terms, medical disclaimers, cancellation policies, and virtual consultation frameworks carefully before booking clinic sessions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 text-left">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12 space-y-10">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiAlertTriangle className="text-red-500" /> 1. Medical Services Disclaimer
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The details provided on this digital clinic portal (such as blog posts, symptom checkers, and general FAQ advice) do NOT constitute direct diagnostic outcomes or medical prescriptions. Formal consults (either online or in-clinic) are required to receive clinical prescription records.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiCalendar className="text-sky-500" /> 2. Appointment Booking & Rescheduling
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Patients must report to the clinic reception at least 15 minutes before their booked schedule. If you wish to reschedule or cancel a session, notify our helpline desk at least 2 hours prior to the slot.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiMapPin className="text-sky-500" /> 3. Video Consultations & Technical Requirements
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Virtual consult sessions require an active internet connection, functional audio-video peripherals, and browser microphone/webcam permissions. Premium Clinic is not liable for dropped calls due to patient connection failures.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FiFileText className="text-sky-500" /> 4. Prescription & Records Usage
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Digital prescriptions generated via our virtual rooms are legally signed by licensed PMDC certified practitioners. We advise checking with local pharmacy networks for validation if needed.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
