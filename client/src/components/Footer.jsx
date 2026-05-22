import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";

const links = {
  Services: ["Cardiology", "Neurology", "Dermatology", "Orthopedics", "Dental Care", "Emergency"],
  Patients: ["Book Appointment", "Online Consultation", "Patient Portal", "Medical Records", "Insurance", "Health Blog"],
  Company: ["About Us", "Our Doctors", "Careers", "News & Press", "Research", "CSR Initiatives"],
};

export default function Footer() {
  return (
    <footer className="bg-[#030f1e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-med-blue to-med-green flex items-center justify-center">
                <MdLocalHospital className="text-white text-xl" />
              </div>
              <div>
                <span className="text-white font-display font-bold text-xl">
                  Premium<span style={{ background: "linear-gradient(90deg, #0ea5e9, #22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}> Clinic</span>
                </span>
                <p className="text-white/30 text-xs font-body tracking-widest uppercase">Advanced Healthcare</p>
              </div>
            </div>
            <p className="text-white/40 text-sm font-body leading-relaxed max-w-sm mb-6">
              Redefining healthcare through innovation, compassion, and technology. Our mission is to make world-class medical care accessible to all.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: FiPhone, text: "+1 (800) 911-CARE" },
                { icon: FiMail, text: "care@premiumclinic.com" },
                { icon: FiMapPin, text: "420 Wellness Ave, New York, NY" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/50 text-sm font-body hover:text-white/75 transition-colors cursor-pointer">
                  <Icon className="text-med-blue flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-7">
              {[FiInstagram, FiTwitter, FiFacebook, FiLinkedin].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-med-blue hover:border-med-blue/40 transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-display font-semibold text-sm uppercase tracking-widest mb-5">{category}</h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/40 text-sm font-body hover:text-white/75 transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm font-body">
            © 2025 Premium Clinic. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-white/25 text-xs font-body hover:text-white/50 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
