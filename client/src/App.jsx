import { useState } from "react";
import Home from "./pages/Home";
import AboutPremium from "./pages/About";
import OnlineConsultation from "./components/OnlineConsultation";
import ServicesPage from "./pages/Services";
import SplashScreen from "./SplashScreen";
import ContactUs from "./pages/Contactus";
import DoctorsPage from "./pages/Doctors";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import ResourcesPage from "./pages/ResourcesPage";
export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [preselectedDoctor, setPreselectedDoctor] = useState(null);

  /**
   * Call this anywhere to navigate to the booking page.
   * Pass a doctor object to pre-select them, or null to start from step 1.
   *
   * Usage:
   *   onBookAppointment()               — open fresh (step 1)
   *   onBookAppointment(doctorObject)   — skip to step 2 with doctor pre-selected
   */
  function handleBookAppointment(doctor = null) {
    setPreselectedDoctor(doctor || null);
    setCurrentPage("book-appointment");
  }

  if (!splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }

  return (
    <>
      {currentPage === "book-appointment" && (
        <BookAppointmentPage
          onNavigate={setCurrentPage}
          preselectedDoctor={preselectedDoctor}
        />
      )}

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

      {currentPage === "about" && (
        <AboutPremium
          onNavigate={setCurrentPage}
          onBookAppointment={handleBookAppointment}
        />
      )}

      {currentPage === "online-consultation" && (
        <OnlineConsultation
          onNavigate={setCurrentPage}
          onBookAppointment={handleBookAppointment}
        />
      )}
      {currentPage === "resources" && (
  <ResourcesPage
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