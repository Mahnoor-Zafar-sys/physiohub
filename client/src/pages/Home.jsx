import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import QuickInfoBar from "../components/QuickInfoBar";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Doctors from "../components/Doctors";
import AppointmentCTA from "../components/AppointmentCTA";
import Testimonials from "../components/Testimonials";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <Hero />
      <QuickInfoBar />
      <Services />
      <WhyUs />
      <Doctors />
      <AppointmentCTA />
      <Testimonials />
      <Gallery />
      <Footer />
    </div>
  );
}
