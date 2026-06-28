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

  const [clinics, setClinics] = useState([]);
  const [selectedClinicId, setSelectedClinicId] = useState(() => {
    return localStorage.getItem("vph_clinic_id") || "1";
  });

  useEffect(() => {
    async function loadClinics() {
      try {
        const list = await api.getClinics();
        if (list && list.length > 0) {
          setClinics(list);
          const active = localStorage.getItem("vph_clinic_id");
          if (!active) {
            localStorage.setItem("vph_clinic_id", list[0].id);
            localStorage.setItem("vph_clinic_name", list[0].name);
            setSelectedClinicId(String(list[0].id));
          } else {
            const matched = list.find(c => String(c.id) === String(active));
            if (matched) {
              localStorage.setItem("vph_clinic_name", matched.name);
            }
          }
        }
      } catch (e) {
        console.warn("Failed to load clinics on start:", e);
      }
    }
    loadClinics();
  }, []);

  const handleClinicChange = (id) => {
    setSelectedClinicId(id);
    localStorage.setItem("vph_clinic_id", id);
    const matched = clinics.find(c => String(c.id) === String(id));
    if (matched) {
      localStorage.setItem("vph_clinic_name", matched.name);
    }
  };

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem("vph_token");
    const role = localStorage.getItem("vph_user_role");
    if (token && role) {
      const portalMap = { patient: "/patient-portal", doctor: "/doctor-portal", admin: "/admin", receptionist: "/staff" };
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
        const portalMap = { patient: "/patient-portal", doctor: "/doctor-portal", admin: "/admin", receptionist: "/staff" };
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

  const renderFormContent = () => (
    <div className="space-y-7">
      {/* Logo & Title */}
      <div className="text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow" style={{ background: "linear-gradient(135deg, #0ea5e9, #e91e8c)" }}>
          <FiShield size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
        <p className="text-sm text-slate-500 mt-1.5 font-medium">
          Sign in to {clinics.find(c => String(c.id) === String(selectedClinicId))?.name || "Vital Physio Hub"}
        </p>
      </div>

      {/* Clinic Selector Dropdown */}
      <div className="space-y-2 text-left">
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Select Clinic Network</label>
        <select
          value={selectedClinicId}
          onChange={e => handleClinicChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3.5 text-xs outline-none font-bold focus:border-pink-500 transition-colors shadow-xs"
        >
          {clinics.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} {c.status === "Suspended" ? "(Suspended)" : ""}
            </option>
          ))}
          {clinics.length === 0 && (
            <option value="1">Vital Physio Hub</option>
          )}
        </select>
      </div>

      {/* Role Toggle */}
      <div className="flex bg-slate-100/80 rounded-2xl p-1 border border-slate-200/50">
        {visibleTabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => { setActiveRole(tab.id); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all border-none cursor-pointer ${
              activeRole === tab.id ? "tab-active shadow" : "bg-transparent text-slate-500 hover:text-slate-800"
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
            authMethod === "email" ? "active" : "bg-transparent text-slate-500 border-slate-200 hover:border-slate-350"
          }`}
        >
          <FiMail size={14} /> Email & Password
        </button>
        <button
          onClick={() => { setAuthMethod("phone"); setError(""); }}
          className={`method-btn flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
            authMethod === "phone" ? "active" : "bg-transparent text-slate-500 border-slate-200 hover:border-slate-350"
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
            className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold flex items-center gap-2"
          >
            <FiAlertTriangle className="shrink-0 text-rose-500" /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Login Form */}
      {authMethod === "email" && (
        <form onSubmit={handleEmailLogin} className="space-y-4" autoComplete="off">
          <div>
            <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-2">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
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
                className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none placeholder:text-slate-400 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                autoComplete="new-password"
                className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-12 py-3.5 text-sm outline-none placeholder:text-slate-400 font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 bg-transparent border-none cursor-pointer flex items-center justify-center p-0 outline-none"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            <div className="mt-2 text-[10px] text-slate-500 leading-normal bg-slate-50 border border-slate-150 p-2.5 rounded-xl text-left font-medium">
              <span className="font-bold text-slate-700 block mb-0.5">Password Security Note:</span>
              Keep your account secure by using passwords that are at least 8 characters long and contain uppercase, lowercase, numbers, and symbols.
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-xs text-slate-550 cursor-pointer select-none font-semibold">
              <input type="checkbox" className="rounded border-slate-350 text-sky-600 focus:ring-sky-500 cursor-pointer" />
              <span>Remember me</span>
            </label>
            <span className="text-xs text-sky-600 hover:text-sky-700 cursor-pointer font-bold">Forgot password?</span>
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
            <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-2">Phone Number</label>
            <div className="flex gap-2">
              <div className="bg-slate-100 border border-slate-200 rounded-xl px-3 flex items-center text-sm text-slate-500 font-bold shrink-0">
                +92
              </div>
              <div className="relative flex-1">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="3001234567"
                  maxLength={10}
                  autoComplete="off"
                  className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none placeholder:text-slate-400 font-semibold"
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
                <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-2">Enter OTP Code</label>
                <input
                  type="text"
                  required
                  value={form.otp}
                  onChange={e => setForm({ ...form, otp: e.target.value })}
                  placeholder="Enter 4-digit OTP"
                  maxLength={4}
                  autoComplete="one-time-code"
                  className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 text-sm outline-none placeholder:text-slate-400 text-center tracking-[0.5em] font-bold"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-emerald-600 font-bold">✓ OTP auto-filled for demo</span>
                  {otpTimer > 0 ? (
                    <span className="text-[10px] text-slate-400 font-bold">Resend in {otpTimer}s</span>
                  ) : (
                    <button type="button" onClick={handleSendOTP} className="text-[10px] text-sky-600 font-bold bg-transparent border-none cursor-pointer hover:text-sky-700">Resend OTP</button>
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
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">New here?</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Sign Up Link */}
          <div className="text-center space-y-3">
            <Link
              to="/signup"
              className="block w-full py-3.5 border border-slate-200 hover:bg-slate-50 text-slate-800 text-sm font-bold rounded-xl transition-colors text-center no-underline"
            >
              Create an Account
            </Link>
            <Link to="/" className="text-xs text-slate-400 hover:text-slate-700 transition-colors no-underline font-semibold inline-flex items-center gap-1">
              ← Back to Homepage
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 text-[11px] text-slate-500 leading-normal text-left font-medium">
            <span className="font-bold text-amber-600 block mb-1">🔐 Administrative Notice:</span>
            Administrative and staff portal credentials cannot be provisioned publicly. Accounts must be authorized and created internally by the system administrator.
          </div>
          <Link to="/" className="text-xs text-slate-400 hover:text-slate-700 transition-colors no-underline font-semibold inline-flex items-center gap-1">
            ← Back to Homepage
          </Link>
        </div>
      )}
    </div>
  );

  const isSplitLayout = activeRole === "patient" || activeRole === "doctor";

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .login-card { font-family: 'Inter', system-ui, sans-serif; }
        .glow-border { box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.08); }
        .input-field { transition: border-color 0.2s, box-shadow 0.2s; }
        .input-field:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15); }
        .tab-active { background: linear-gradient(135deg, #0ea5e9, #e91e8c); color: white; }
        .method-btn { transition: all 0.2s; }
        .method-btn.active { background: rgba(14, 165, 233, 0.08); border-color: #0ea5e9; color: #0ea5e9; }
        .login-btn { background: linear-gradient(135deg, #0ea5e9, #e91e8c); transition: all 0.2s; }
        .login-btn:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 8px 25px -5px rgba(14, 165, 233, 0.25); }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        .float-orb { animation: float 6s ease-in-out infinite; }
        .float-orb-2 { animation: float 8s ease-in-out infinite reverse; }
      `}</style>

      {/* Background orbs */}
      <div className="float-orb absolute top-20 left-20 w-72 h-72 rounded-full opacity-35" style={{ background: "radial-gradient(circle, #bbedff 0%, transparent 70%)" }} />
      <div className="float-orb-2 absolute bottom-20 right-20 w-96 h-96 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #ffd3e8 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="login-card relative z-10 w-full max-w-5xl mx-4"
      >
        {isSplitLayout ? (
          <div className="bg-white/55 backdrop-blur-xl rounded-3xl border border-white/70 glow-border overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            {/* Left Side: Premium Image Panel */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 relative text-white overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={activeRole === "patient" 
                    ? "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" 
                    : "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
                  } 
                  alt="Healthcare Background" 
                  className="w-full h-full object-cover brightness-[0.55] saturate-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/25 to-transparent" />
              </div>
              
              {/* Top Text Content */}
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest">
                  <FiShield className="text-sky-300" /> Vital Physio Hub
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight font-serif leading-tight">
                  {activeRole === "patient" ? "Your Path to Pain-Free Living Starts Here" : "Join Our Global Network of Rehabilitation Specialists"}
                </h2>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {activeRole === "patient" 
                    ? "Access your electronic medical records, book consultations with top fellowship-trained specialists, and track your rehab progress in real-time."
                    : "Manage patient appointments, write secure digital prescriptions, update medical histories, and collaborate with our medical desk."
                  }
                </p>
              </div>

              {/* Bottom Quote */}
              <div className="relative z-10 text-left pt-6 border-t border-white/20">
                <p className="text-[10px] font-black text-sky-300 uppercase tracking-widest">Patient First Care</p>
                <p className="text-xs italic text-slate-300 mt-1.5 font-serif">"Healing is a matter of time, but it is sometimes also a matter of opportunity."</p>
              </div>
            </div>

            {/* Right Side: Form Panel */}
            <div className="col-span-1 lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white/30">
              {renderFormContent()}
            </div>
          </div>
        ) : (
          <div className="bg-white/55 backdrop-blur-xl rounded-3xl border border-white/70 glow-border overflow-hidden max-w-md mx-auto">
            {/* Top gradient line */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #0ea5e9, #e91e8c, #0ea5e9)" }} />
            <div className="p-8 space-y-7 bg-white/30">
              {renderFormContent()}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
