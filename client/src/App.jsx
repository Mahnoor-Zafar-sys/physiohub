import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Careers from "./pages/Careers";
import WhyUsPage from "./pages/WhyUsPage";
import ScrollToTop from "./components/ScrollToTop";
import Emergency from "./pages/Emergency";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VideoConsultationRoom from "./pages/VideoConsultationRoom";
import BlogPostPage from "./pages/BlogPostPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PatientPortal from "./pages/PatientPortal";
import DoctorPortal from "./pages/DoctorPortal";
import AdminPanel from "./pages/AdminPanel";
import AuthGuard from "./components/AuthGuard";
import AIChatbot from "./components/AIChatbot";
import NewsPress from "./pages/NewsPress";
import ResearchPage from "./pages/Research";
import CSRPage from "./pages/CSR";
import CookiePolicy from "./pages/CookiePolicy";
import NewsArticlePage from "./pages/NewsArticlePage";
import Shop from "./pages/Shop";
import Insurance from "./pages/Insurance";
import HomeConsultationPage from "./pages/HomeConsultationPage";

function DashboardRedirect() {
  const role = localStorage.getItem("vph_user_role");
  if (!role) return <Navigate to="/login" replace />;
  const portalMap = {
    patient: "/patient-portal",
    doctor: "/doctor-portal",
    admin: "/admin-secure-portal-gate-x99",
    receptionist: "/staff-reception-terminal-y77"
  };
  return <Navigate to={portalMap[role] || "/login"} replace />;
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  const isHomePage = window.location.pathname === "/";
  if (isHomePage && !splashDone) {
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
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/book-appointment" element={
          <AuthGuard allowedRoles={["patient"]}>
            <BookAppointmentPage />
          </AuthGuard>
        } />
        <Route path="/online-consultation" element={<OnlineConsultation />} />
        <Route path="/home-consultation" element={<HomeConsultationPage />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/consultation-room" element={<VideoConsultationRoom />} />
        <Route path="/insurance" element={<Insurance />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Portals */}
        <Route path="/patient-portal" element={
          <AuthGuard allowedRoles={["patient"]}>
            <PatientPortal />
          </AuthGuard>
        } />
        <Route path="/doctor-portal" element={
          <AuthGuard allowedRoles={["doctor"]}>
            <DoctorPortal />
          </AuthGuard>
        } />
        <Route path="/admin-secure-portal-gate-x99" element={
          <AuthGuard allowedRoles={["admin"]}>
            <AdminPanel />
          </AuthGuard>
        } />
        <Route path="/staff-reception-terminal-y77" element={
          <AuthGuard allowedRoles={["receptionist"]}>
            <AdminPanel />
          </AuthGuard>
        } />

        {/* Backward Compatibility */}
        <Route path="/dashboard" element={<DashboardRedirect />} />

        <Route path="/news" element={<NewsPress />} />
        <Route path="/news/:id" element={<NewsArticlePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/csr" element={<CSRPage />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      <AIChatbot />
    </Router>
  );
}