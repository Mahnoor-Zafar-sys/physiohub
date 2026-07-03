import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";
import { api } from "../services/api";
const links = {
  Services: [
    { name: "Physiotherapy", path: "/services" },
    { name: "Chiropractic Adjustments", path: "/services" },
    { name: "Cupping Therapy", path: "/services" },
    { name: "Hijama Therapy", path: "/services" },
    { name: "Electrotherapy", path: "/services" },
    { name: "Kinesio Taping", path: "/services" },
    { name: "Fitness Training", path: "/services" },
    { name: "Dry Needling", path: "/services" }
  ],
  Patients: [
    { name: "Book Appointment", path: "/book-appointment" },
    { name: "Online Consultation", path: "/online-consultation" },
    { name: "Patient Portal", path: "/dashboard" },
    { name: "Medical Records", path: "/dashboard" },
    { name: "Health Blog", path: "/blog" },
    { name: "Equipment Store", path: "/shop" }
  ],
  Company: [
    { name: "About Us", path: "/about" },
    { name: "Our Doctors", path: "/doctors" },
    { name: "Careers", path: "/careers" },
    { name: "News & Press", path: "/news" },
    { name: "Research", path: "/research" },
    { name: "CSR Initiatives", path: "/csr" }
  ],
};

// Social Icons configuration as it is from your original code setup
const socials = [
  { 
    icon: FiInstagram, 
    baseColor: "text-white border-white/10", 
    hoverStyles: "hover:bg-white/10 hover:border-white/30" 
  },
  { 
    icon: FiTwitter, 
    baseColor: "text-white border-white/10", 
    hoverStyles: "hover:bg-white/10 hover:border-white/30" 
  },
  { 
    icon: FiFacebook, 
    baseColor: "text-white border-white/10", 
    hoverStyles: "hover:bg-white/10 hover:border-white/30" 
  },
  { 
    icon: FiLinkedin, 
    baseColor: "text-white border-white/10", 
    hoverStyles: "hover:bg-white/10 hover:border-white/30" 
  },
];

export default function Footer() {
  const [settings, setSettings] = useState({
    clinic_phone: "+92 300 8786187",
    clinic_email: "jellaniphysio@gmail.com",
    clinic_address: "Plaza 56, Block L, Blue Area, Islamabad"
  });

  useEffect(() => {
    let active = true;
    api.getSettings().then(res => {
      if (res && active) {
        setSettings(prev => ({ ...prev, ...res }));
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <footer className="bg-[#0f172a] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand & Left Details */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#0ea5e9] flex items-center justify-center shadow-md shadow-blue-500/10">
                <MdLocalHospital className="text-white text-xl" />
              </div>
              <div>
                <span className="text-white font-display font-black text-xl tracking-tight">
                  Physio<span style={{ background: "linear-gradient(90deg, #38bdf8, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>hub</span>
                </span>
                <p className="text-slate-400 text-[10px] font-body font-bold tracking-widest uppercase mt-0.5">Advanced Physical Therapy & Rehabilitation</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm font-body leading-relaxed max-w-sm mb-6">
              Redefining healthcare through innovation, compassion, and technology. Our mission is to make world-class medical care accessible to all.
            </p>
            
            {/* Corrected & Synced Information Section */}
            <div className="flex flex-col gap-3">
              {[
                { icon: FiPhone, text: `${settings.clinic_phone} (Clinic)` },
                { icon: FiMail, text: settings.clinic_email },
                { icon: FiMapPin, text: settings.clinic_address },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-slate-300 text-sm font-body hover:text-sky-400 transition-colors cursor-pointer group">
                  <Icon className="text-sky-400 flex-shrink-0 transition-colors group-hover:text-sky-300" />
                  {text}
                </div>
              ))}
            </div>

            {/* Social Buttons Rendered As It Is From Your Input */}
            <div className="flex gap-3 mt-7">
              {socials.map(({ icon: Icon, baseColor, hoverStyles }, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/50 flex items-center justify-center transition-all duration-300 shadow-sm ${baseColor} ${hoverStyles}`}
                >
                  <Icon size={18} className="stroke-[2.5]" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links Categories Mapping */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-display font-extrabold text-xs uppercase tracking-wider mb-5">{category}</h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.name}>
                    {item.path.startsWith("/") ? (
                      <Link to={item.path} className="text-slate-400 text-sm font-body hover:text-sky-400 transition-colors duration-200">
                        {item.name}
                      </Link>
                    ) : (
                      <a href={item.path} className="text-slate-400 text-sm font-body hover:text-sky-400 transition-colors duration-200">
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* --- END PREMIUM ROYAL BLUE BOTTOM BAR (High Contrast Panel) --- */}
      <div className="bg-[#0b0f19] py-6 shadow-[inner_0_2px_4px_rgba(0,0,0,0.06)] border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs font-body font-semibold tracking-wide">
            © {new Date().getFullYear()} Physiohub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link 
              to="/privacy" 
              className="text-slate-400 text-xs font-body font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-slate-400 text-xs font-body font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookie-policy" 
              className="text-slate-405 text-xs font-body font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}