import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

/* ─── Easing curves ─── */
const EASE_OUT   = [0.22, 1, 0.36, 1]
const EASE_IN    = [0.64, 0, 0.78, 0]

/* ─── Heartbeat SVG path ─── */
const HB_PATH = 'M0,18 L30,18 L38,18 L44,4 L50,32 L56,10 L62,26 L68,18 L100,18 L108,18 L114,4 L120,32 L126,10 L132,26 L138,18 L200,18'

/* ─── Random particles config ─── */
function makeParticles(count = 42) {
  const colors = ['#5BC8F5', '#F472B6', '#FDA4AF', '#ffffff']
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 20 + Math.random() * 65,
    size: Math.random() * 4 + 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random() * 0.35 + 0.1,
    duration: Math.random() * 6 + 5,
    delay: -(Math.random() * 8),
    dx: (Math.random() * 60 - 30),
  }))
}

/* ══════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════ */

/* Corner accent brackets */
function CornerAccent({ position }) {
  const styles = {
    tl: { top: 24, left: 24, borderTop: '1px solid rgba(91,200,245,0.45)', borderLeft: '1px solid rgba(91,200,245,0.45)' },
    tr: { top: 24, right: 24, borderTop: '1px solid rgba(244,114,182,0.45)', borderRight: '1px solid rgba(244,114,182,0.45)' },
    bl: { bottom: 24, left: 24, borderBottom: '1px solid rgba(91,200,245,0.45)', borderLeft: '1px solid rgba(91,200,245,0.45)' },
    br: { bottom: 24, right: 24, borderBottom: '1px solid rgba(244,114,182,0.45)', borderRight: '1px solid rgba(244,114,182,0.45)' },
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        position: 'fixed', width: 60, height: 60,
        zIndex: 11, ...styles[position],
      }}
    />
  )
}

/* Floating ambient particle */
function Particle({ x, y, size, color, opacity, duration, delay, dx }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`, top: `${y}%`,
        width: size, height: size,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 ${size * 2.5}px ${color}`,
      }}
      animate={{
        y: [0, -120],
        x: [0, dx],
        scale: [1, 0.3],
        opacity: [0, opacity, opacity, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.2, 0.8, 1],
      }}
    />
  )
}

/* Spinning dashed ring around logo */
function SpinningRing() {
  return (
    <motion.svg
      viewBox="0 0 140 140"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
    >
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#5BC8F5" stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#F472B6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#5BC8F5" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <circle cx="70" cy="70" r="66"
        stroke="url(#ringGrad)" strokeWidth="1.3"
        strokeDasharray="6 4" strokeLinecap="round" fill="none" />
    </motion.svg>
  )
}

/* Medical cross icon */
function MedicalCross() {
  return (
    <div style={{
      width: 100, height: 100, borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(91,200,245,0.15), rgba(244,114,182,0.12))',
      border: '1px solid rgba(91,200,245,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(14px)',
      boxShadow: '0 0 30px rgba(91,200,245,0.2), 0 0 60px rgba(244,114,182,0.12), inset 0 0 20px rgba(255,255,255,0.04)',
    }}>
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
        <defs>
          <linearGradient id="crossG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#5BC8F5" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>
        <rect x="16" y="4"  width="10" height="34" rx="3" fill="url(#crossG)" opacity="0.92" />
        <rect x="4"  y="16" width="34" height="10" rx="3" fill="url(#crossG)" opacity="0.92" />
        <circle cx="21" cy="21" r="5" fill="white" opacity="0.12" />
      </svg>
    </div>
  )
}

/* Animated heartbeat SVG */
function HeartbeatLine() {
  const pathLen = 350
  return (
    <svg width="220" height="40" viewBox="0 0 200 36" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="hbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#5BC8F5" />
          <stop offset="50%"  stopColor="#F472B6" />
          <stop offset="100%" stopColor="#5BC8F5" />
        </linearGradient>
        <filter id="hbGlow">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <motion.path
        d={HB_PATH}
        fill="none" stroke="url(#hbGrad)" strokeWidth="1.8"
        strokeLinecap="round" filter="url(#hbGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.6, ease: EASE_OUT }}
      />
    </svg>
  )
}

/* Progress bar */
function ProgressBar({ duration }) {
  return (
    <div style={{ width: 210, height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
      <motion.div
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: duration / 1000 - 1.8, delay: 1.8, ease: 'easeInOut' }}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #5BC8F5, #F472B6, #FDA4AF)',
          borderRadius: 2,
          boxShadow: '0 0 10px rgba(91,200,245,0.6), 0 0 20px rgba(244,114,182,0.4)',
        }}
      />
    </div>
  )
}

/* Dot loading text */
function LoadingDots() {
  const [dots, setDots] = useState('.')
  useEffect(() => {
    const id = setInterval(() => {
      setDots(d => d.length >= 3 ? '.' : d + '.')
    }, 500)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{
      fontSize: '0.58rem', letterSpacing: '0.32em',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
      fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
    }}>
      Loading{dots}
    </span>
  )
}

/* ══════════════════════════════════════════
   MAIN SPLASH SCREEN
══════════════════════════════════════════ */
export default function SplashScreen({
  clinicName = 'Premium Care Clinic',
  tagline = 'Excellence in Healthcare · Compassion in Care',
  duration = 5500,
  onComplete,
}) {
  const videoRef = useRef(null)
  const [show, setShow] = useState(true)
  const [particles] = useState(() => makeParticles(42))

  /* Auto exit */
  useEffect(() => {
    const t = setTimeout(() => setShow(false), duration)
    return () => clearTimeout(t)
  }, [duration])

  const handleExitComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  /* Stagger variants */
  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: EASE_OUT },
  })

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: EASE_IN }}
          style={{
            position: 'fixed', inset: 0,
            background: '#080F1E',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Montserrat', sans-serif",
            overflow: 'hidden',
          }}
        >
          {/* ── Video background ── */}
          <motion.video
            ref={videoRef}
            src="/logo-animation1.mp4"
            autoPlay muted playsInline loop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.42) saturate(1.25)',
              zIndex: 0,
            }}
          />

          {/* ── Gradient mesh ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: `
              radial-gradient(ellipse 60% 50% at 15% 20%, rgba(91,200,245,0.16) 0%, transparent 70%),
              radial-gradient(ellipse 50% 60% at 85% 80%, rgba(244,114,182,0.16) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 50% 50%, rgba(253,164,175,0.06) 0%, transparent 70%)
            `,
          }} />

          {/* ── Vignette ── */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 35%, rgba(8,15,30,0.88) 100%)',
          }} />

          {/* ── Particles ── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
            {particles.map(p => <Particle key={p.id} {...p} />)}
          </div>

          {/* ── Corner accents ── */}
          {['tl', 'tr', 'bl', 'br'].map(pos => <CornerAccent key={pos} position={pos} />)}

          {/* ── Stage content ── */}
          <div style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 0,
          }}>

            {/* Logo ring */}
            <motion.div
              {...fadeUp(0.4)}
              style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <SpinningRing />
              <MedicalCross />
            </motion.div>

            {/* Clinic name */}
            <motion.h1
              {...fadeUp(0.75)}
              style={{
                marginTop: 26,
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(1.9rem, 5vw, 3.1rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #fff 0%, #5BC8F5 40%, #F472B6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 18px rgba(91,200,245,0.35))',
              }}
            >
              {clinicName}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              {...fadeUp(1.05)}
              style={{
                marginTop: 9,
                fontSize: 'clamp(0.62rem, 1.4vw, 0.76rem)',
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 300,
              }}
            >
              {tagline}
            </motion.p>

            {/* Separator line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 230, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: EASE_OUT }}
              style={{
                marginTop: 22, height: 1,
                background: 'linear-gradient(90deg, transparent, #5BC8F5, #F472B6, transparent)',
              }}
            />

            {/* Heartbeat */}
            <motion.div
              {...fadeUp(1.4)}
              style={{ marginTop: 16 }}
            >
              <HeartbeatLine />
            </motion.div>

            {/* Progress bar + loading text */}
            <motion.div
              {...fadeUp(1.7)}
              style={{ marginTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
            >
              <ProgressBar duration={duration} />
              <LoadingDots />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}