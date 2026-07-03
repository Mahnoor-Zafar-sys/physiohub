import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";
import { 
  FiAward, FiShield, FiActivity, FiDollarSign, FiVideo, 
  FiCheckCircle, FiStar, FiArrowRight, FiUserCheck, FiCpu
} from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";

const reasonsData = [
  {
    id: "doctors",
    icon: FiUserCheck,
    title: "Experienced Doctors & Certified Specialists",
    subtitle: "World-Class Clinical Expertise",
    metric: "120+",
    label: "Certified Consultants",
    summary: "Our clinic is home to highly qualified, international fellowship-trained medical consultants and certified clinical specialists who deliver unmatched patient care with precision, accuracy, and clinical excellence.",
    details: [
      "Top-tier certified consultants with international fellowship credentials.",
      "Comprehensive multi-disciplinary team coverage across key health departments.",
      "Ongoing research, education, and implementation of cutting-edge clinical practices.",
      "Personalized, compassionate consulting and custom patient-centric care frameworks."
    ],
    media: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
    color: "#0284c7"
  },
  {
    id: "equipment",
    icon: FiCpu,
    title: "Modern Equipment & Diagnostics",
    subtitle: "State-of-the-Art Medical Technology",
    metric: "3T MRI",
    label: "Robotic Surgery Kits",
    summary: "We invest heavily in state-of-the-art modern equipment, ultra-precise robotic surgical infrastructure, and high-definition diagnostic systems to detect, diagnose, and treat with top efficiency.",
    details: [
      "Next-generation 3T MRI, Ultra-HD CT scanners, and diagnostic imaging suites.",
      "Advanced robotic surgical setups (e.g., da Vinci surgical systems) for minimally invasive precision.",
      "Modern pathology labs enabling rapid, highly accurate blood work and molecular testing.",
      "Digital-first infrastructure for real-time symptom tracking and diagnostics reports."
    ],
    media: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    color: "#7c3aed"
  },
  {
    id: "emergency",
    icon: FiShield,
    title: "24/7 Emergency Support",
    subtitle: "Always Active Trauma Care",
    metric: "<3 Min",
    label: "Emergency Response Time",
    summary: "We operate fully active trauma bays, rapid-response clinical units, and dedicated emergency operations around the clock to provide immediate, life-saving care when every second counts.",
    details: [
      "24/7 active emergency bays, surgical teams, and cardiac monitors.",
      "Average response and initial stabilization times under 3 minutes.",
      "Fully equipped ambulances standing by with active ICU life support systems.",
      "Direct integration with regional emergency grids for rapid patient transport."
    ],
    media: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1400&q=80",
    color: "#dc2626"
  },
  {
    id: "affordable",
    icon: FiDollarSign,
    title: "Affordable Premium Healthcare",
    subtitle: "Price Transparency & Accessibility",
    metric: "100%",
    label: "Honest Frameworks",
    summary: "We believe premium healthcare should be accessible to all. We implement honest, transparent pricing frameworks with zero hidden charges, cooperating with leading insurance providers.",
    details: [
      "Upfront, clear pricing estimates before treatment procedures start.",
      "Partnership with all major insurance panels for cashless treatment programs.",
      "Interest-free easy payment installments for major operations and treatments.",
      "Welfare initiatives and subsidised diagnostic checkups for deserving patients."
    ],
    media: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
    color: "#16a34a"
  },
  {
    id: "consultation",
    icon: FiVideo,
    title: "Online Consultation Facility",
    subtitle: "Secure Virtual Care Globally",
    metric: "HD",
    label: "Video Connectivity",
    summary: "Connect with certified consultants from the comfort of your home or office. Our online platform offers high-definition video consultations, digital prescriptions, and immediate coordination.",
    details: [
      "Secure, encrypted video consults adhering to HIPAA data standards.",
      "Immediate digital prescriptions, diagnostic orders, and specialist references.",
      "One-click scheduling with active slots available globally.",
      "Seamless integration with direct medicine delivery services to your doorstep."
    ],
    media: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    color: "#0891b2"
  }
];

export default function WhyUsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const [settings, setSettings] = useState(() => {
    const local = localStorage.getItem("pc_settings");
    return local ? JSON.parse(local) : {};
  });

  useEffect(() => {
    api.getSettings().then(res => {
      if (res) setSettings(res);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-body select-none">
      <Navbar />

      {styleInjection()}

      {/* --- HERO BANNER --- */}
      <section 
        className="relative overflow-hidden pt-36 pb-20"
        style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#ffffff 45%,#fdf2f8 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-sky-200/20 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "9s" }} />
          <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-pink-200/20 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "13s" }} />
          <div className="absolute inset-0 opacity-[0.18]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(14,165,233,0.08) 1px, transparent 0)",
            backgroundSize: "24px 24px"
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif mb-6 leading-tight text-slate-900">
              {settings.why_us_headline ? (
                settings.why_us_headline.includes("Vital Physio Hub") ? (
                  <>
                    {settings.why_us_headline.split("Vital Physio Hub")[0]}
                    <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Vital Physio Hub</span>
                    {settings.why_us_headline.split("Vital Physio Hub")[1]}
                  </>
                ) : (
                  settings.why_us_headline
                )
              ) : (
                <>Why Patients Trust <span style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Vital Physio Hub</span></>
              )}
            </h1>
            <p className="text-slate-500 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
              {settings.why_us_description || "We coordinate elite medical specialists, modern clinical diagnostics, and a patient-first support ecosystem to deliver optimal healthcare outcomes with maximum care."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="relative -mt-8 z-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { metric: "120+", label: "Certified Doctors" },
            { metric: "99.2%", label: "Diagnostic Accuracy" },
            { metric: "24/7", label: "Emergency Trauma" },
            { metric: "50K+", label: "Happy Patients" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p 
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{ background: "linear-gradient(135deg,#0ea5e9,#db2777)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {stat.metric}
              </p>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- DETAILED REASONS INTERACTIVE AREA --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            A Closer Look at Our Standards
          </h2>
          <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Click on each category to explore the details, equipment standards, and treatment protocols that define our clinical ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs Menu Column */}
          <div className="lg:col-span-4 space-y-3">
            {reasonsData.map((feat, idx) => {
              const Icon = feat.icon;
              const active = activeTab === idx;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    active 
                      ? "bg-white border-slate-200 shadow-lg" 
                      : "bg-transparent border-transparent hover:bg-white/50"
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300"
                    style={{ 
                      backgroundColor: active ? `${feat.color}12` : "#e2e8f0",
                      color: active ? feat.color : "#64748b"
                    }}
                  >
                    <Icon className="text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm sm:text-base tracking-tight truncate transition-colors duration-200 ${
                      active ? "text-slate-950 font-extrabold" : "text-slate-700"
                    }`}>
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{feat.subtitle}</p>
                  </div>
                  <FiArrowRight className={`text-slate-400 transition-transform duration-300 ${active ? "translate-x-1" : "opacity-0"}`} />
                </button>
              );
            })}
          </div>

          {/* Details Content Card Column */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden min-h-[500px] flex flex-col">
              
              {/* Media showcase frame */}
              <div className="h-64 sm:h-80 relative bg-slate-900 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTab}
                    src={reasonsData[activeTab].media}
                    alt={reasonsData[activeTab].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                
                <div 
                  className="absolute bottom-6 left-6 text-white"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Feature Highlight</p>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 font-serif">
                    {reasonsData[activeTab].title}
                  </h3>
                </div>

                <div 
                  className="absolute top-6 right-6 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-right"
                >
                  <p className="text-2xl font-black tracking-tight" style={{ color: reasonsData[activeTab].color }}>
                    {reasonsData[activeTab].metric}
                  </p>
                  <p className="text-[9px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
                    {reasonsData[activeTab].label}
                  </p>
                </div>
              </div>

              {/* Text specifications and checklists */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {reasonsData[activeTab].summary}
                  </p>

                  <div className="border-t border-slate-100 pt-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Specifications & Checklist</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {reasonsData[activeTab].details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5">
                          <FiCheckCircle className="shrink-0 mt-0.5 text-blue-500" size={15} />
                          <span className="text-slate-600 text-xs sm:text-sm leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom navigation hooks */}
                <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-400">
                    Vital Physio Hub Advanced Rehabilitation Standards
                  </span>
                  <button 
                    onClick={() => navigate("/book-appointment")}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border-none"
                  >
                    Schedule Consultation <FiArrowRight size={13} />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- CLOSING CTA --- */}
      <section className="relative overflow-hidden py-32 px-6 bg-[#f8f9fb] border-t border-slate-100">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-blue-300 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center space-y-8 z-10">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Ready to experience<br />modern healthcare?
          </h2>
          <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
            Our specialists are available to guide you from first consultation to complete recovery. Book online, contact our desk, or walk in — we are always here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button onClick={() => navigate("/book-appointment")} className="px-7 py-3.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center shadow-lg shadow-blue-200 border-none cursor-pointer">
              Book Appointment <FiArrowRight size={15} />
            </button>
            <button onClick={() => navigate("/online-consultation")} className="px-7 py-3.5 bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center gap-2 justify-center cursor-pointer">
              Online Consultation <FiArrowRight size={15} className="rotate-0" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function styleInjection() {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes floatEffect {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      .float-card {
        animation: floatEffect 5s ease-in-out infinite;
      }
    `}} />
  );
}
