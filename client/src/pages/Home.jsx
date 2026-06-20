import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaUserMd } from "react-icons/fa";
import { FiUser, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import QuickInfoBar from "../components/QuickInfoBar";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Doctors from "../components/Doctors";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

export default function Home() {
  const whatsappNumber = "923008786187";
  const welcomeMessage = encodeURIComponent(
    "Hello Vital Physio Hub, I want to inquire about your physical therapy services."
  );

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      const footerThreshold = documentHeight - 450;
      setShowNavbar(scrollPosition < footerThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-body relative" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full z-50"
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />
      <QuickInfoBar />
      <Services />
      <WhyUs />
      
      {/* ── Patient & Doctor Portals CTA Section ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-left font-sans">
        <style>{`
          .cta-card {
            background: rgba(255, 255, 255, 0.55);
            backdrop-filter: blur(16px);
            border: 1.5px solid rgba(255,255,255,0.75);
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.04);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s;
          }
          .cta-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 30px 60px -15px rgba(14, 165, 233, 0.12), 0 30px 60px -15px rgba(233, 30, 140, 0.12);
          }
        `}</style>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patient Portal Card */}
          <div className="cta-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between items-start">
            <div className="w-full">
              <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 mb-6">
                <FiUser size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Are you a Patient?</h3>
              <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">Book clinical consultations, access digital medical records (EMR), view authorized prescriptions, and manage billing invoices securely.</p>
            </div>
            <Link to="/login" className="mt-8 px-6 py-3.5 bg-slate-900 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all no-underline flex items-center gap-1.5 shadow-sm">
              Access Patient Portal <FiArrowRight />
            </Link>
          </div>

          {/* Doctor Portal Card */}
          <div className="cta-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between items-start">
            <div className="w-full">
              <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mb-6">
                <FaUserMd size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Join as a Doctor?</h3>
              <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">Register your clinical practice at Vital Physio Hub, schedule consulting slots, coordinate online consult video calls, and dispatch digital prescriptions.</p>
            </div>
            <Link to="/signup" className="mt-8 px-6 py-3.5 bg-gradient-to-r from-sky-500 to-pink-500 hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all no-underline flex items-center gap-1.5 shadow-md">
              Apply to Join <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <Doctors />
      <Testimonials />
      <Gallery />
      <Footer />

      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors cursor-pointer group"
        >
          <FaWhatsapp size={36} />
          <span className="absolute right-20 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200">
            Chat With Us
          </span>
        </motion.a>
      </div>
    </div>
  );
}