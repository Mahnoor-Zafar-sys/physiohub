import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
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
  const whatsappNumber = "+923001234567";
  const welcomeMessage = encodeURIComponent(
    "Hello Premium Clinic, I want to inquire about your healthcare services."
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
    <div className="min-h-screen font-body relative">
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