import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

const links = {
  Services: [
    { name: "Cardiology", path: "/services" },
    { name: "Neurology", path: "/services" },
    { name: "Dermatology", path: "/services" },
    { name: "Orthopedics", path: "/services" },
    { name: "Dental Care", path: "/services" },
    { name: "Emergency", path: "/emergency" }
  ],
  Patients: [
    { name: "Book Appointment", path: "/book-appointment" },
    { name: "Online Consultation", path: "/online-consultation" },
    { name: "Patient Portal", path: "#" },
    { name: "Medical Records", path: "#" },
    { name: "Insurance", path: "/insurance" },
    { name: "Health Blog", path: "/blog" }
  ],
  Company: [
    { name: "About Us", path: "/about" },
    { name: "Our Doctors", path: "/doctors" },
    { name: "Careers", path: "/careers" },
    { name: "News & Press", path: "#" },
    { name: "Research", path: "#" },
    { name: "CSR Initiatives", path: "#" }
  ],
};

// Social Icons configuration as it is from your original code setup
const socials = [
  { 
    icon: FiInstagram, 
    baseColor: "text-[#E1306C] border-pink-100", 
    hoverStyles: "hover:bg-pink-50 hover:border-pink-300" 
  },
  { 
    icon: FiTwitter, 
    baseColor: "text-[#1DA1F2] border-sky-100", 
    hoverStyles: "hover:bg-sky-50 hover:border-sky-300" 
  },
  { 
    icon: FiFacebook, 
    baseColor: "text-[#1877F2] border-blue-100", 
    hoverStyles: "hover:bg-blue-50 hover:border-blue-300" 
  },
  { 
    icon: FiLinkedin, 
    baseColor: "text-[#0077B5] border-cyan-100", 
    hoverStyles: "hover:bg-cyan-50 hover:border-cyan-300" 
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand & Left Details */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a8a] to-[#0ea5e9] flex items-center justify-center shadow-md shadow-blue-500/10">
                <MdLocalHospital className="text-white text-xl" />
              </div>
              <div>
                <span className="text-slate-900 font-display font-black text-xl tracking-tight">
                  Premium<span style={{ background: "linear-gradient(90deg, #1e3a8a, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}> Clinic</span>
                </span>
                <p className="text-slate-400 text-[10px] font-body font-bold tracking-widest uppercase mt-0.5">Advanced Healthcare</p>
              </div>
            </div>
            
            <p className="text-slate-500 text-sm font-body leading-relaxed max-w-sm mb-6">
              Redefining healthcare through innovation, compassion, and technology. Our mission is to make world-class medical care accessible to all.
            </p>
            
            {/* Corrected & Synced Information Section */}
            <div className="flex flex-col gap-3">
              {[
                { icon: FiPhone, text: "+92 (51) 111-911-273" },
                { icon: FiMail, text: "care@premiumclinic.com" },
                { icon: FiMapPin, text: "Plaza 56, Block L, Blue Area, Islamabad" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-slate-600 text-sm font-body hover:text-blue-600 transition-colors cursor-pointer group">
                  <Icon className="text-blue-500 flex-shrink-0 transition-colors group-hover:text-blue-600" />
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
                  className={`w-10 h-10 rounded-xl border bg-white flex items-center justify-center transition-all duration-300 shadow-sm ${baseColor} ${hoverStyles}`}
                >
                  <Icon size={18} className="stroke-[2.5]" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links Categories Mapping */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-slate-900 font-display font-extrabold text-xs uppercase tracking-wider mb-5">{category}</h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.name}>
                    {item.path.startsWith("/") ? (
                      <Link to={item.path} className="text-slate-500 text-sm font-body hover:text-blue-600 transition-colors duration-200">
                        {item.name}
                      </Link>
                    ) : (
                      <a href={item.path} className="text-slate-500 text-sm font-body hover:text-blue-600 transition-colors duration-200">
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
      <div className="bg-[#1e3a8a] py-6 shadow-[inner_0_2px_4px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-blue-100 text-xs font-body font-semibold tracking-wide">
            © {new Date().getFullYear()} Premium Clinic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link 
              to="/privacy" 
              className="text-blue-200/90 text-xs font-body font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-blue-200/90 text-xs font-body font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <a 
              href="#" 
              className="text-blue-200/90 text-xs font-body font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}