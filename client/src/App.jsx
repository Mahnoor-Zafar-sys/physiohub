










// import { useState } from "react";
// import Home from "./pages/Home";
// // import About from "./pages/About";
// import SplashScreen from "./SplashScreen";

// export default function App() {
//   const [splashDone, setSplashDone] = useState(false);
//   const [currentPage, setCurrentPage] = useState("home");

//   if (!splashDone) {
//     return <SplashScreen onComplete={() => setSplashDone(true)} />;
//   }

//   return currentPage === "about"
//     ? <About onNavigate={setCurrentPage} />
//     : <Home onNavigate={setCurrentPage} />;
// }


// import { useState } from "react";
// import Home from "./pages/Home";
// // import About from "./pages/About";
// import OnlineConsultation from "./components/OnlineConsultation"; // ◄ Path yahan change kiya hai
// import SplashScreen from "./SplashScreen";

// export default function App() {
//   const [splashDone, setSplashDone] = useState(false);
//   const [currentPage, setCurrentPage] = useState("home");

//   if (!splashDone) {
//     return <SplashScreen onComplete={() => setSplashDone(true)} />;
//   }

//   // State-based Conditional Rendering Switch
//   switch (currentPage) {
//     case "online-consultation":
//       return <OnlineConsultation onNavigate={setCurrentPage} />;
//     case "about":
//       // return <About onNavigate={setCurrentPage} />;
//       return <Home onNavigate={setCurrentPage} />; 
//     case "home":
//     default:
//       return <Home onNavigate={setCurrentPage} />;
//   }
// }



import { useState } from "react";
import Home from "./pages/Home";
import AboutPremium from "./pages/About"; 
        import OnlineConsultation from "./components/OnlineConsultation";     
import ServicesPage from "./pages/Services";
import SplashScreen from "./SplashScreen";
import ContactUs from "./pages/Contactus";
import DoctorsPage from "./pages/Doctors";
import BookAppointmentModal from "./components/BookAppointmentModal";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");


  // Appointment modal state — preselectedDoctor allows booking a specific doctor
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [preselectedDoctor, setPreselectedDoctor] = useState(null);

  /**
   * Call this anywhere to open the booking modal.
   * Pass a doctor object to pre-select them, or null/undefined to start from step 1.
   *
   * Usage:
   *   onBookAppointment()                — open fresh
   *   onBookAppointment(doctorObject)    — open with doctor pre-selected (skips to step 2)
   */
  function handleBookAppointment(doctor = null) {
    setPreselectedDoctor(doctor || null);
    setAppointmentOpen(true);
  }


  if (!splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }


  return (
    <>
      {/* Global Booking Modal — renders on top of every page */}
      <BookAppointmentModal
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        preselectedDoctor={preselectedDoctor}
      />

      {currentPage === "services" && (
        <ServicesPage
          onNavigate={setCurrentPage}
          onBookAppointment={handleBookAppointment}
        />
      )}

      {currentPage === "contact" && (
        <ContactUs
          onNavigate={setCurrentPage}
          onBookAppointment={handleBookAppointment}
        />
      )}

      {currentPage === "doctors" && (
        <DoctorsPage
          onNavigate={setCurrentPage}
          onBookAppointment={handleBookAppointment}
        />
      )}

      {currentPage === "home" && (
        <Home
          onNavigate={setCurrentPage}
          onBookAppointment={handleBookAppointment}
        />
      )}
    </>
  );
}

  // Pure Conditional Rendering - No overlapping possible
  if (currentPage === "about") {
    return <AboutPremium onNavigate={setCurrentPage} />;
  }

  if (currentPage === "online-consultation") {
    return <OnlineConsultation onNavigate={setCurrentPage} />;
  }

  return <Home onNavigate={setCurrentPage} />;
}




















