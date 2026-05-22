import { motion } from "framer-motion";
import { FiClock, FiPhone, FiMapPin, FiStar } from "react-icons/fi";

const infos = [
  {
    icon: FiClock,
    label: "Opening Hours",
    value: "Mon–Sat: 7AM – 10PM",
    iconBg: "rgba(26,135,232,0.10)",
    iconColor: "#1a87e8",
  },
  {
    icon: FiPhone,
    label: "Emergency 24/7",
    value: "+1 (800) 911-CARE",
    iconBg: "rgba(242,93,93,0.10)",
    iconColor: "#d43030",
    valueColor: "#c0392b",
  },
  {
    icon: FiMapPin,
    label: "Our Location",
    value: "420 Wellness Ave, New York",
    iconBg: "rgba(52,199,130,0.10)",
    iconColor: "#1a9e60",
  },
  {
    icon: FiStar,
    label: "Live Rating",
    value: "4.9 / 5 · 3,400+ Reviews",
    iconBg: "rgba(255,185,50,0.12)",
    iconColor: "#c07c00",
    live: true,
  },
];

export default function QuickInfoBar() {
  return (
    <>
      {/* Inline keyframe for the live dot */}
      <style>{`
        @keyframes liveP {
          0%,100% { transform:scale(1); opacity:1; }
          50%      { transform:scale(1.55); opacity:0.5; }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          zIndex: 30,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(160,200,255,0.28)",
          borderTop: "1px solid rgba(160,200,255,0.18)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {infos.map(({ icon: Icon, label, value, iconBg, iconColor, valueColor, live }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 22px",
                borderRight: i < 3 ? "1px solid rgba(160,200,255,0.22)" : "none",
                cursor: "default",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(236,246,255,0.85)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Icon bubble */}
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                transition: "transform 0.2s",
              }}>
                <Icon style={{ color: iconColor, fontSize: "1.1rem" }} />
              </div>

              {/* Text */}
              <div style={{ minWidth: 0 }}>
                <p style={{
                  fontSize: "0.62rem", letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#7aa0c0",
                  fontWeight: 600, margin: 0,
                }}>
                  {label}
                </p>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6, marginTop: 2,
                }}>
                  <p style={{
                    fontSize: "0.8rem", fontWeight: 600,
                    color: valueColor || "#0d2d52",
                    margin: 0,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {value}
                  </p>

                  {live && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 3,
                      fontSize: "0.58rem", fontWeight: 700,
                      color: "#16914e",
                      background: "rgba(52,199,130,0.12)",
                      borderRadius: 100, padding: "2px 7px",
                      letterSpacing: "0.08em", flexShrink: 0,
                    }}>
                      <span style={{
                        width: 5, height: 5,
                        background: "#34c782",
                        borderRadius: "50%",
                        animation: "liveP 1.8s ease-in-out infinite",
                        display: "inline-block",
                      }} />
                      LIVE
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}