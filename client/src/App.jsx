import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPremium from "./pages/About";
import OnlineConsultation from "./components/OnlineConsultation";
import ServicesPage from "./pages/Services";
import SplashScreen from "./SplashScreen";
import ContactUs from "./pages/Contactus";
import DoctorsPage from "./pages/Doctors";
import BookAppointmentPage from "./pages/Bookappointmentpage";
import Reviews from "./pages/Reviews";
import GalleryPage from "./pages/GalleryPage";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Insurance from "./pages/Insurance";
import Careers from "./pages/Careers";
import WhyUsPage from "./pages/WhyUsPage";
import ScrollToTop from "./components/ScrollToTop";
import Emergency from "./pages/Emergency";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VideoConsultationRoom from "./pages/VideoConsultationRoom";
import BlogPostPage from "./pages/BlogPostPage";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPremium />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/online-consultation" element={<OnlineConsultation />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/consultation-room" element={<VideoConsultationRoom />} />
      </Routes>
    </Router>
  );
}