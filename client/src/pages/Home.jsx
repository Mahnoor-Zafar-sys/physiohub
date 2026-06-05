<<<<<<< HEAD


=======
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaWhatsapp } from "react-icons/fa";
// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import QuickInfoBar from "../components/QuickInfoBar";
// import Services from "../components/Services";
// import WhyUs from "../components/WhyUs";
// import Doctors from "../components/Doctors";
// import Testimonials from "../components/Testimonials";
// import Gallery from "../components/Gallery";
// import Footer from "../components/Footer";
<<<<<<< HEAD

// export default function Home({ onNavigate }) {
//   const whatsappNumber = "+923001234567";
//   const welcomeMessage = encodeURIComponent("Hello Premium Clinic, I want to inquire about your healthcare services.");

=======
// import About from "./About";

// export default function Home() {
//   const whatsappNumber = "+923001234567"; // Replace with your actual phone number
//   const welcomeMessage = encodeURIComponent("Hello Premium Clinic, I want to inquire about your healthcare services.");

//   // State to handle the visibility of the navbar near the footer
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
//   const [showNavbar, setShowNavbar] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
<<<<<<< HEAD
//       const documentHeight = document.documentElement.scrollHeight;
//       const scrollPosition = window.scrollY + window.innerHeight;
//       const footerThreshold = documentHeight - 450;
//       setShowNavbar(scrollPosition < footerThreshold);
//     };
=======
//       // Calculate total height of the document
//       const documentHeight = document.documentElement.scrollHeight;
//       // Get current vertical scroll position
//       const scrollPosition = window.scrollY + window.innerHeight;
      
//       // Define a buffer threshold (e.g., 450px from the bottom where the footer starts rendering)
//       const footerThreshold = documentHeight - 450;

//       // Hide navbar if the user has scrolled down into the footer region
//       if (scrollPosition >= footerThreshold) {
//         setShowNavbar(false);
//       } else {
//         setShowNavbar(true);
//       }
//     };

>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen font-body relative">
<<<<<<< HEAD

//       {/* Navbar — receives onNavigate so Services click works */}
=======
      
//       {/* --- CONDITIONAL NAVBAR RENDER (Animates out when approaching the footer) --- */}
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
//       <AnimatePresence>
//         {showNavbar && (
//           <motion.div
//             initial={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -80 }}
//             transition={{ duration: 0.3 }}
//             className="fixed top-0 left-0 w-full z-50"
//           >
<<<<<<< HEAD
//             <Navbar onNavigate={onNavigate} />
=======
//             <Navbar />
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
//           </motion.div>
//         )}
//       </AnimatePresence>

<<<<<<< HEAD
//       <Hero onNavigate={onNavigate} />
=======
//       {/* --- MAIN CORE CONTENT SECTIONS --- */}
//       <Hero />
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
//       <QuickInfoBar />
//       <Services />
//       <WhyUs />
//       <Doctors />
<<<<<<< HEAD
=======
//       {/* <AppointmentCTA /> */}
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
//       <Testimonials />
//       <Gallery />
//       <Footer />

<<<<<<< HEAD
//       {/* Floating WhatsApp Button */}
//       <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
//         <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
=======
//       {/* --- FLOATING STICKY WHATSAPP BUTTON (Stays persistently pinned on screen) --- */}
//       <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        
//         {/* Subtle Pulse Back-Wave Animation Effect */}
//         <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />

//         {/* Main Floating Button Layer */}
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
//         <motion.a
//           href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           initial={{ opacity: 0, scale: 0.6 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//           className="relative w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-colors duration-200 cursor-pointer group"
//         >
<<<<<<< HEAD
//           <FaWhatsapp size={36} />
=======
//           {/* WhatsApp SVG/Vector Icon */}
//           <FaWhatsapp size={36} />

//           {/* Clean Premium Tooltip (Reveals text on desktop mouse hover) */}
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
//           <span className="absolute right-20 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 pointer-events-none transition-all duration-200">
//             Chat With Us
//           </span>
//         </motion.a>
//       </div>

//     </div>
//   );
// }


<<<<<<< HEAD
// src/pages/Home.jsx
=======
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
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

<<<<<<< HEAD
export default function Home({ onNavigate, onBookAppointment }) {
  const whatsappNumber = "+923001234567";
  const welcomeMessage = encodeURIComponent(
    "Hello Premium Clinic, I want to inquire about your healthcare services."
  );
=======
export default function Home({ onNavigate }) {
  const whatsappNumber = "+923001234567";
  const welcomeMessage = encodeURIComponent("Hello Premium Clinic, I want to inquire about your healthcare services.");

>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + window.innerHeight;
      const footerThreshold = documentHeight - 450;
<<<<<<< HEAD
      setShowNavbar(scrollPosition < footerThreshold);
=======

      if (scrollPosition >= footerThreshold) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-body relative">
<<<<<<< HEAD

=======
      
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full z-50"
          >
<<<<<<< HEAD
            <Navbar onNavigate={onNavigate} onBookAppointment={onBookAppointment} />
=======
            <Navbar onNavigate={onNavigate} />
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
          </motion.div>
        )}
      </AnimatePresence>

<<<<<<< HEAD
      {/* onBookAppointment Hero ko pass karo */}
      <Hero onNavigate={onNavigate} onBookAppointment={onBookAppointment} />
=======
      <Hero />
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
      <QuickInfoBar />
      <Services onNavigate={onNavigate} />
      <WhyUs />
<<<<<<< HEAD
      <Doctors onNavigate={onNavigate} onBookAppointment={onBookAppointment} />
=======
      <Doctors />
>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
      <Testimonials />
      <Gallery />
      <Footer onNavigate={onNavigate} />

<<<<<<< HEAD
      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />
=======
      <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-green-500 rounded-full animate-ping opacity-40 pointer-events-none" />

>>>>>>> 52ea7fcee912ae30c6118c5c642eabe18e9bf485
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=${welcomeMessage}`}
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
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