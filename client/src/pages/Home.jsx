import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaUserMd } from "react-icons/fa";
import { FiUser, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Doctors from "../components/Doctors";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

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
      <SEOHead 
        title="Vital Physio Hub | Best Physical Therapy & Rehabilitation Clinic in Islamabad"
        description="Leading physical therapy & rehabilitation clinic in Islamabad (Blue Area, F-8 Markaz, DHA Phase 2). Expert treatment for back pain, sports injuries, stroke rehab & physiotherapy."
        keywords="physical therapy clinic Islamabad, best physiotherapist Islamabad, physio clinic Blue Area, sports rehabilitation Islamabad, back pain treatment Islamabad, stroke recovery physiotherapy Islamabad, physiohub Pakistan"
        canonicalUrl="https://physiohub.com/"
      />
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
          <div className="cta-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between items-start" style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #ede9fe 100%)", border: "1px solid rgba(59, 130, 246, 0.15)" }}>
            <div className="w-full">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-sm">
                <FiUser size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Are you a Patient?</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">Book clinical consultations, access digital medical records (EMR), view authorized prescriptions, and manage billing invoices securely.</p>
            </div>
            <Link to="/login" className="mt-8 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all no-underline flex items-center gap-1.5 shadow-md">
              Access Patient Portal <FiArrowRight />
            </Link>
          </div>

          {/* Doctor Portal Card */}
          <div className="cta-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between items-start" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #fae8ff 100%)", border: "1px solid rgba(236, 72, 153, 0.15)" }}>
            <div className="w-full">
              <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-sm">
                <FaUserMd size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Join as a Doctor?</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">Register your clinical practice at Vital Physio Hub, schedule consulting slots, coordinate online consult video calls, and dispatch digital prescriptions.</p>
            </div>
            <Link to="/signup" className="mt-8 px-6 py-3.5 bg-gradient-to-r from-pink-600 to-rose-500 hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all no-underline flex items-center gap-1.5 shadow-md">
              Apply to Join <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <Doctors />
      <Testimonials />
      <Footer />
    </div>
  );
}