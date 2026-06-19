import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCalendar, FiMonitor, FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { MdFavorite, MdLocalHospital } from "react-icons/md";
import { GiHeartBeats, GiMicroscope } from "react-icons/gi";
import { TbStethoscope, TbAmbulance, TbActivity } from "react-icons/tb";

const floatingIcons = [
  { Icon: MdFavorite,      color: "#3b82f6", pos: { top: "22%", left: "6%" },   dur: 7,   delay: 0,   size: "1.9rem" },
  { Icon: TbStethoscope,   color: "#10b981", pos: { top: "55%", left: "4%" },   dur: 8,   delay: 1.4, size: "2.2rem" },
  { Icon: GiHeartBeats,    color: "#ec4899", pos: { top: "72%", left: "7%" },   dur: 6.5, delay: 0.8, size: "1.7rem" },
  { Icon: MdLocalHospital, color: "#10b981", pos: { top: "18%", right: "7%" },  dur: 7.5, delay: 1.1, size: "2.0rem" },
  { Icon: TbActivity,      color: "#3b82f6", pos: { top: "46%", right: "5%" },  dur: 9,   delay: 0.3, size: "1.8rem" },
  { Icon: GiMicroscope,    color: "#ec4899", pos: { top: "68%", right: "8%" },  dur: 6,   delay: 2.0, size: "1.6rem" },
  { Icon: TbAmbulance,     color: "#f43f5e", pos: { top: "35%", left: "5%" },   dur: 8.5, delay: 1.7, size: "1.5rem" },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] } },
};

export default function Hero() {
  const navigate = useNavigate();
  const wrapRef  = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img  = imageRef.current;
    if (!wrap || !img) return;
    const onMove = (e) => {
      const r  = wrap.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width  - 0.5;
      const cy = (e.clientY - r.top)  / r.height - 0.5;
      img.style.transform = `scale(1.1) translate(${cx * 35}px, ${cy * 25}px)`;
    };
    const onLeave = () => { img.style.transform = "scale(1.03) translate(0px, 0px)"; };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes pulseRingRed {
          0%   { transform: scale(1);    opacity: 0.45; }
          100% { transform: scale(1.3); opacity: 0;    }
        }
        @keyframes iconFloat {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%     { transform: translateY(-12px) rotate(2deg); }
        }
        .hbtn { font-family:'DM Sans',sans-serif !important; font-weight:600 !important; cursor:pointer !important; border:none !important; display:inline-flex !important; align-items:center !important; gap:8px !important; text-decoration:none !important; }
        .hbtn-primary {
          font-size:.95rem !important; color:#ffffff !important; border-radius:12px !important; padding:12px 26px !important;
          background: #2563eb !important; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25) !important; transition: all .23s ease !important;
        }
        .hbtn-primary:hover { transform:translateY(-3px) !important; background: #1d4ed8 !important; box-shadow: 0 8px 22px rgba(37, 99, 235, 0.4) !important; }
        .hbtn-glass {
          font-size:.95rem !important; color:#1e293b !important; border-radius:12px !important; padding:12px 26px !important;
          background: rgba(255, 255, 255, 0.85) !important; backdrop-filter: blur(8px) !important;
          border: 1.5px solid #e2e8f0 !important; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02) !important; transition: all .23s ease !important;
        }
        .hbtn-glass:hover { transform:translateY(-3px) !important; background: #ffffff !important; border-color: #cbd5e1 !important; }
        .hbtn-whatsapp {
          font-size:.95rem !important; color:#ffffff !important; border-radius:12px !important; padding:12px 26px !important;
          background: #25d366 !important; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25) !important; transition: all .23s ease !important;
        }
        .hbtn-whatsapp:hover { transform:translateY(-3px) !important; background: #20ba5a !important; }
        .hbtn-emergency {
          position:relative !important; overflow:visible !important;
          font-size:.95rem !important; color:#ffffff !important; border-radius:12px !important; padding:12px 26px !important;
          background: #ef4444 !important; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.25) !important; transition: all .23s ease !important;
        }
        .hbtn-emergency:hover { transform:translateY(-3px) !important; background: #dc2626 !important; }
        .hbtn-emergency::before {
          content:'' !important; position:absolute !important; inset:-4px !important; border-radius:16px !important;
          border:2px solid rgba(239, 68, 68, 0.35) !important;
          animation: pulseRingRed 1.8s cubic-bezier(.4,0,.6,1) infinite !important; pointer-events:none !important;
        }
      `}</style>

      <section
        ref={wrapRef} id="home"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <img ref={imageRef} src="/heroimage.jpg" alt="Premium Healthcare Clinic Background"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center", transform: "scale(1.03)", transition: "transform .3s ease-out" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.32) 50%, rgba(240,246,255,0.48) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 30%, rgba(59,130,246,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.18) 0%, transparent 50%)" }} />
        </div>

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, color, pos, dur, delay, size }, i) => (
          <div key={i} style={{ position: "absolute", zIndex: 2, opacity: 0.7, pointerEvents: "none", animation: `iconFloat ${dur}s ease-in-out ${delay}s infinite`, ...pos }}>
            <Icon style={{ color, fontSize: size }} />
          </div>
        ))}

        {/* Content */}
        <div style={{
          flex: 1, position: "relative", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          paddingTop: "max(160px, 18vh)", paddingBottom: "80px",
          paddingLeft: "24px", paddingRight: "24px",
        }}>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="show"
            viewport={{ once: false, amount: 0.15 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2.2rem",
              textAlign: "center",
              maxWidth: 860,
              width: "100%",
              padding: "48px 32px",
              borderRadius: "32px",
              background: "rgba(255, 255, 255, 0.72)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "0 20px 40px -15px rgba(15, 23, 42, 0.08)",
            }}
          >
            <motion.h1 variants={fadeUpVariant} style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: "clamp(2.6rem, 5.8vw, 4.4rem)", fontWeight: 800,
              lineHeight: 1.15, color: "#0f172a", letterSpacing: "-0.012em", margin: 0,
              textShadow: "0 2px 12px rgba(255,255,255,0.5)",
            }}>
              Premium Healthcare, <span style={{ color: "#2563eb" }}>Powered by Innovation</span>
            </motion.h1>

            <motion.p variants={fadeUpVariant} style={{
              maxWidth: 620, color: "#1e293b", fontSize: "1.18rem",
              fontWeight: 500, lineHeight: 1.65, margin: 0,
            }}>
              Book appointments, consult top doctors, and manage your health
              digitally — all in one beautifully designed platform.
            </motion.p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
              
              {/* ── BOOK APPOINTMENT → opens modal ────────── */}
              <motion.button
                variants={fadeUpVariant}
                className="hbtn hbtn-primary"
                onClick={() => navigate("/book-appointment")}
              >
                <FiCalendar /> Book Appointment
              </motion.button>
              
              {/* ── ONLINE CONSULTATION → navigates to virtual consult page ── */}
              <motion.button 
                variants={fadeUpVariant} 
                className="hbtn hbtn-glass"
                onClick={() => navigate("/online-consultation")}
              >
                <FiMonitor style={{ color: "#10b981" }} /> Online Consultation
              </motion.button>

              <motion.a
                variants={fadeUpVariant}
                className="hbtn hbtn-whatsapp"
                href="https://wa.me/923008786187?text=Hello%20Vital%20Physio%20Hub%2C%20I%20want%20to%20inquire%20about%20your%20healthcare%20services."
                target="_blank" rel="noopener noreferrer"
              >
                <FaWhatsapp size="1.1rem" /> WhatsApp Chat
              </motion.a>

              <motion.a
                variants={fadeUpVariant}
                className="hbtn hbtn-emergency"
                href="tel:+923417388830"
              >
                <FiPhoneCall /> Call Now / Emergency
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}