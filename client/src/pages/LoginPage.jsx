import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield, FiMail, FiLock, FiPhone, FiUser, FiArrowRight, FiAlertTriangle, FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserMd, FaHospitalUser } from "react-icons/fa";
import { api } from "../services/api";

const TABS = [
  { id: "patient", label: "Patient", icon: FiUser, color: "#0ea5e9" },
  { id: "doctor", label: "Doctor", icon: FaUserMd, color: "#e91e8c" },
  { id: "admin", label: "Admin", icon: FiShield, color: "#10b981" },
  { id: "receptionist", label: "Staff", icon: FaHospitalUser, color: "#f59e0b" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const returnTo = location.state?.from || null;

  const roleParam = searchParams.get("role");

  const visibleTabs = TABS.filter(tab => {
    if (tab.id === "admin") return roleParam === "admin";
    if (tab.id === "receptionist") return roleParam === "receptionist" || roleParam === "staff";
    return true;
  });

  const [activeRole, setActiveRole] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const rp = params.get("role");
    if (rp === "admin") return "admin";
    if (rp === "receptionist" || rp === "staff") return "receptionist";
    return "patient";
  });
  const [authMethod, setAuthMethod] = useState("email"); // "email" | "phone"
  const [form, setForm] = useState({ email: "", password: "", phone: "", otp: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("vph_token");
    const role = localStorage.getItem("vph_user_role");
    if (token && role) {
      const portalMap = { patient: "/patient-portal", doctor: "/doctor-portal", admin: "/admin" };
      navigate(portalMap[role] || "/", { replace: true });
    }
  }, [navigate]);

  // OTP countdown timer
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => setOtpTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [otpTimer]);

  const handleSendOTP = async () => {
    if (!form.phone || form.phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    setLoading(true);
    setError("");
    // Simulate OTP send
    await new Promise(r => setTimeout(r, 800));
    setOtpSent(true);
    setOtpTimer(30);
    setForm(prev => ({ ...prev, otp: "1234" })); // Auto-fill for demo
    setLoading(false);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.login(form.email, form.password, activeRole);
      if (res && res.success) {
        const portalMap = { patient: "/patient-portal", doctor: "/doctor-portal", admin: "/admin", receptionist: "/admin" };
        navigate(returnTo || portalMap[res.user.role] || "/", { replace: true });
      } else {
        setError(res?.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setForm({ email: "", password: "", phone: "", otp: "" });
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    if (form.otp !== "1234") {
      setError("Invalid OTP code. Demo OTP is 1234.");
      setForm(prev => ({ ...prev, otp: "" }));
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Simulate phone login
      await new Promise(r => setTimeout(r, 600));
      const mockUser = activeRole === "patient"
        ? { name: "Patient User", email: `patient@physiohub.com`, role: "patient" }
        : { name: "Dr. Haseeb Ur Rehman", email: `doctor@physiohub.com`, role: "doctor" };
      localStorage.setItem("vph_token", "jwt-phone-session-" + Date.now());
      localStorage.setItem("vph_user_role", mockUser.role);
      localStorage.setItem("vph_user_name", mockUser.name);
      localStorage.setItem("vph_user_email", mockUser.email);
      // backward compat
      localStorage.setItem("pc_user_role", mockUser.role);
      localStorage.setItem("pc_user_name", mockUser.name);
      const portalMap = { patient: "/patient-portal", doctor: "/doctor-portal" };
      navigate(returnTo || portalMap[mockUser.role] || "/", { replace: true });
    } catch (err) {
      setError("Error logging in.");
    } finally {
      setForm({ email: "", password: "", phone: "", otp: "" });
      setOtpSent(false);
      setOtpTimer(0);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .login-card { font-family: 'Inter', system-ui, sans-serif; }
        .glow-border { box-shadow: 0 0 60px -12px rgba(14, 165, 233, 0.15), 0 0 60px -12px rgba(233, 30, 140, 0.15); }
        .input-field { transition: border-color 0.2s, box-shadow 0.2s; }
        .input-field:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1); }
        .tab-active { background: linear-gradient(135deg, #0ea5e9, #e91e8c); color: white; }
        .method-btn { transition: all 0.2s; }
        .method-btn.active { background: rgba(14, 165, 233, 0.1); border-color: #0ea5e9; color: #0ea5e9; }
        .login-btn { background: linear-gradient(135deg, #0ea5e9, #e91e8c); transition: all 0.2s; }
        .login-btn:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 25px -5px rgba(14, 165, 233, 0.3); }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        .float-orb { animation: float 6s ease-in-out infinite; }
        .float-orb-2 { animation: float 8s ease-in-out infinite reverse; }
      `}</style>

      {/* Background orbs */}
      <div className="float-orb absolute top-20 left-20 w-72 h-72 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)" }} />
      <div className="float-orb-2 absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #e91e8c 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="login-card relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/[0.08] glow-border overflow-hidden">
          {/* Top gradient line */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #0ea5e9, #e91e8c, #0ea5e9)" }} />

          <div className="p-8 space-y-7">
            {/* Logo & Title */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #0ea5e9, #e91e8c)" }}>
                <FiShield size={28} className="text-white" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Welcome Back</h1>
              <p className="text-sm text-slate-400 mt-1.5">Sign in to Physiohub</p>
            </div>

            {/* Role Toggle */}
            <div className="flex bg-white/[0.05] rounded-2xl p-1 border border-white/[0.06]">
              {visibleTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveRole(tab.id); setError(""); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border-none cursor-pointer ${
                    activeRole === tab.id ? "tab-active shadow-lg" : "bg-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Auth Method Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => { setAuthMethod("email"); setError(""); setOtpSent(false); }}
                className={`method-btn flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                  authMethod === "email" ? "active" : "bg-transparent text-slate-500 border-white/10 hover:border-white/20"
                }`}
              >
                <FiMail size={14} /> Email & Password
              </button>
              <button
                onClick={() => { setAuthMethod("phone"); setError(""); }}
                className={`method-btn flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                  authMethod === "phone" ? "active" : "bg-transparent text-slate-500 border-white/10 hover:border-white/20"
                }`}
              >
                <FiPhone size={14} /> Phone OTP
              </button>
            </div>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-semibold flex items-center gap-2"
                >
                  <FiAlertTriangle className="shrink-0" /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Login Form */}
            {authMethod === "email" && (
              <form onSubmit={handleEmailLogin} className="space-y-4" autoComplete="off">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder={
                        activeRole === "patient" ? "patient@physiohub.com" :
                        activeRole === "doctor" ? "doctor@physiohub.com" :
                        activeRole === "admin" ? "admin@physiohub.com" : "staff@physiohub.com"
                      }
                      autoComplete="off"
                      className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>

                 <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Password</label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-12 py-3.5 text-sm outline-none placeholder:text-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white bg-transparent border-none cursor-pointer flex items-center justify-center p-0 outline-none"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 leading-normal bg-white/[0.02] border border-white/[0.05] p-2.5 rounded-xl text-left">
                    <span className="font-bold text-slate-350 block mb-0.5">Password Security Note:</span>
                    Keep your account secure by using passwords that are at least 8 characters long and contain uppercase, lowercase, numbers, and symbols.
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Remember me</span>
                  </label>
                  <span className="text-xs text-sky-400 hover:text-sky-300 cursor-pointer font-semibold">Forgot password?</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="login-btn w-full py-4 text-white text-sm font-bold rounded-xl border-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Sign In <FiArrowRight /></>
                  )}
                </button>
              </form>
            )}

            {/* Phone OTP Login Form */}
            {authMethod === "phone" && (
              <form onSubmit={handlePhoneLogin} className="space-y-4" autoComplete="off">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 flex items-center text-sm text-slate-400 font-bold shrink-0">
                      +92
                    </div>
                    <div className="relative flex-1">
                      <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="3001234567"
                        maxLength={10}
                        autoComplete="off"
                        className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    disabled={loading}
                    className="login-btn w-full py-4 text-white text-sm font-bold rounded-xl border-none cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Send OTP Code <FiArrowRight /></>
                    )}
                  </button>
                ) : (
                  <>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Enter OTP Code</label>
                      <input
                        type="text"
                        required
                        value={form.otp}
                        onChange={e => setForm({ ...form, otp: e.target.value })}
                        placeholder="Enter 4-digit OTP"
                        maxLength={4}
                        autoComplete="one-time-code"
                        className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl px-4 py-3.5 text-sm outline-none placeholder:text-slate-600 text-center tracking-[0.5em] font-bold"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] text-emerald-400 font-semibold">✓ OTP auto-filled for demo</span>
                        {otpTimer > 0 ? (
                          <span className="text-[10px] text-slate-500">Resend in {otpTimer}s</span>
                        ) : (
                          <button type="button" onClick={handleSendOTP} className="text-[10px] text-sky-400 font-bold bg-transparent border-none cursor-pointer hover:text-sky-300">Resend OTP</button>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="login-btn w-full py-4 text-white text-sm font-bold rounded-xl border-none cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>Verify & Sign In <FiArrowRight /></>
                      )}
                    </button>
                  </>
                )}
              </form>
            )}

            {activeRole === "patient" || activeRole === "doctor" ? (
              <>
                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/[0.08]" />
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">New here?</span>
                  <div className="flex-1 h-px bg-white/[0.08]" />
                </div>

                {/* Sign Up Link */}
                <div className="text-center space-y-3">
                  <Link
                    to="/signup"
                    className="block w-full py-3.5 border border-white/[0.1] text-white text-sm font-bold rounded-xl hover:bg-white/[0.05] transition-colors text-center no-underline"
                  >
                    Create an Account
                  </Link>
                  <Link to="/" className="text-xs text-slate-500 hover:text-white transition-colors no-underline font-semibold inline-flex items-center gap-1">
                    ← Back to Homepage
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-slate-400 leading-normal text-left font-medium">
                  <span className="font-bold text-amber-500 block mb-1">🔐 Administrative Notice:</span>
                  Administrative and staff portal credentials cannot be provisioned publicly. Accounts must be authorized and created internally by the system administrator.
                </div>
                <Link to="/" className="text-xs text-slate-500 hover:text-white transition-colors no-underline font-semibold inline-flex items-center gap-1">
                  ← Back to Homepage
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
