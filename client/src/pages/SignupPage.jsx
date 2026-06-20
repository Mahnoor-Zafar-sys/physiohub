import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield, FiMail, FiLock, FiPhone, FiUser, FiArrowRight, FiAlertTriangle, FiUpload, FiMapPin, FiAward, FiDollarSign, FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserMd } from "react-icons/fa";
import { api } from "../services/api";

const TABS = [
  { id: "patient", label: "Patient Sign Up", icon: FiUser, color: "#0ea5e9" },
  { id: "doctor", label: "Join as Doctor", icon: FaUserMd, color: "#e91e8c" },
];

export default function SignupPage() {
  const navigate = useNavigate();

  const [activeRole, setActiveRole] = useState("patient");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    specialty: "",
    branch: "",
    fee: "",
    experience: "",
    title: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { score: 0, label: "Empty", color: "bg-slate-700", criteria: {} };
    
    const criteria = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd)
    };

    const count = Object.values(criteria).filter(Boolean).length;
    if (count <= 2) return { score: count, label: "Weak", color: "bg-rose-500", criteria };
    if (count <= 4) return { score: count, label: "Medium", color: "bg-amber-500", criteria };
    return { score: count, label: "Strong", color: "bg-emerald-500", criteria };
  };

  const suggestStrongPassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const all = uppercase + lowercase + numbers + symbols;
    
    let password = "";
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    const length = 12;
    for (let i = 4; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }
    
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setForm(prev => ({
      ...prev,
      password: password,
      confirmPassword: password
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setError("Profile photo size must be less than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const strength = getPasswordStrength(form.password);
    if (strength.score < 5) {
      setError("Please choose a stronger password. You must satisfy all security criteria (ensure all ticks are green).");
      setLoading(false);
      return;
    }

    try {
      let res;
      if (activeRole === "patient") {
        res = await api.signup({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: "patient"
        });
      } else {
        // Doctor Application registration
        res = await api.signup({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: "doctor",
          specialty: form.specialty,
          branch: form.branch,
          fee: form.fee,
          experience: form.experience,
          title: form.title,
          image: form.image
        });
      }

      if (res && res.success) {
        if (activeRole === "patient") {
          setSuccessMsg("Registration successful! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setSuccessMsg("Application submitted! Admin will verify and activate your profile soon.");
          // Clear form
          setForm({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            specialty: "",
            branch: "",
            fee: "",
            experience: "",
            title: "",
            image: ""
          });
        }
      } else {
        setError(res?.error || "Registration failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-6" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .signup-card { font-family: 'Inter', system-ui, sans-serif; }
        .glow-border { box-shadow: 0 0 60px -12px rgba(14, 165, 233, 0.15), 0 0 60px -12px rgba(233, 30, 140, 0.15); }
        .input-field { transition: border-color 0.2s, box-shadow 0.2s; }
        .input-field:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1); }
        .tab-active { background: linear-gradient(135deg, #0ea5e9, #e91e8c); color: white; }
        .signup-btn { background: linear-gradient(135deg, #0ea5e9, #e91e8c); transition: all 0.2s; }
        .signup-btn:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 25px -5px rgba(14, 165, 233, 0.3); }
        .signup-btn:active { transform: translateY(0); }
        .signup-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
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
        className="signup-card relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/[0.08] glow-border overflow-hidden">
          {/* Top gradient line */}
          <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #0ea5e9, #e91e8c, #0ea5e9)" }} />

          <div className="p-5 space-y-4 text-left">
            {/* Logo & Title */}
            <div className="text-center">
              <div className="w-11 h-11 mx-auto rounded-xl flex items-center justify-center mb-2" style={{ background: "linear-gradient(135deg, #0ea5e9, #e91e8c)" }}>
                <FiShield size={22} className="text-white" />
              </div>
              <h1 className="text-xl font-black text-white tracking-tight">Create Account</h1>
              <p className="text-xs text-slate-400 mt-0.5">Join Vital Physio Hub clinic portals</p>
            </div>

            {/* Role Toggle */}
            <div className="flex bg-white/[0.05] rounded-2xl p-1 border border-white/[0.06]">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => { setActiveRole(tab.id); setError(""); setSuccessMsg(""); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                    activeRole === tab.id ? "tab-active shadow-lg" : "bg-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <tab.icon size={14} /> {tab.label}
                </button>
              ))}
            </div>

            {/* Notifications */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-semibold flex items-center gap-2"
                >
                  <FiAlertTriangle className="shrink-0" /> {error}
                </motion.div>
              )}
              {form.password && getPasswordStrength(form.password).score < 5 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs font-semibold flex items-center gap-2"
                >
                  <FiAlertTriangle className="shrink-0" /> Password must satisfy all 5 criteria (all ticks green) to submit.
                </motion.div>
              )}
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2"
                >
                  <FiShield className="shrink-0" /> {successMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                {/* Full Name */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={activeRole === "patient" ? "Jane Doe" : "Dr. Haseeb Ur Rehman"}
                      className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder={activeRole === "patient" ? "jane@example.com" : "doctor@example.com"}
                      className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Phone Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. 03001234567"
                      className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Credentials / Title (Doctor Only) */}
                {activeRole === "doctor" && (
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Medical Credentials</label>
                    <div className="relative">
                      <FiAward className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="text"
                        name="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g. MBBS, FCPS (Dermatology)"
                        className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Doctor Specific Info Fields */}
              {activeRole === "doctor" && (
                <div className="grid grid-cols-1 gap-4 border-t border-white/5 pt-4 mt-2">
                  {/* Specialty */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Specialty Department</label>
                    <div className="relative">
                      <FaUserMd className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="text"
                        name="specialty"
                        required
                        value={form.specialty}
                        onChange={handleChange}
                        placeholder="e.g. Physical Therapy / Orthopedic"
                        className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Branch Locations */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Practice Branches</label>
                    <div className="relative">
                      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="text"
                        name="branch"
                        required
                        value={form.branch}
                        onChange={handleChange}
                        placeholder="e.g. Gulberg, DHA"
                        className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Consulting Fee */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Consultation Fee (PKR)</label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="number"
                        name="fee"
                        required
                        value={form.fee}
                        onChange={handleChange}
                        placeholder="e.g. 2500"
                        className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Years of Experience</label>
                    <div className="relative">
                      <FiAward className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type="text"
                        name="experience"
                        required
                        value={form.experience}
                        onChange={handleChange}
                        placeholder="e.g. 8 Years"
                        className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Profile Photo upload */}
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Upload Profile Photo</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="text-xs w-full text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border file:border-white/10 file:text-xs file:font-semibold file:bg-white/[0.05] file:text-white hover:file:bg-white/[0.1] cursor-pointer"
                        />
                      </div>
                      {form.image && (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                          <img src={form.image} alt="Profile Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-3 border-t border-white/5 pt-3 mt-2">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Password</label>
                      <button
                        type="button"
                        onClick={suggestStrongPassword}
                        className="text-[10px] font-bold text-sky-455 hover:text-sky-300 bg-transparent border-none cursor-pointer uppercase tracking-wider"
                      >
                        Suggest Strong Password
                      </button>
                    </div>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Choose a password"
                        autoComplete="new-password"
                        className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-12 py-2.5 text-sm outline-none placeholder:text-slate-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white bg-transparent border-none cursor-pointer flex items-center justify-center p-0 outline-none"
                      >
                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Confirm Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                        className="input-field w-full bg-white/[0.05] border border-white/[0.1] text-white rounded-xl pl-11 pr-12 py-2.5 text-sm outline-none placeholder:text-slate-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white bg-transparent border-none cursor-pointer flex items-center justify-center p-0 outline-none"
                      >
                        {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Strength Indicator & Instructions */}
                {form.password && (
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold">Password Strength:</span>
                      <span className={`font-black px-2 py-0.5 rounded text-[10px] uppercase text-white ${
                        getPasswordStrength(form.password).label === "Weak" ? "bg-rose-500" :
                        getPasswordStrength(form.password).label === "Medium" ? "bg-amber-500" : "bg-emerald-500"
                      }`}>
                        {getPasswordStrength(form.password).label}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getPasswordStrength(form.password).color}`}
                        style={{ width: `${(getPasswordStrength(form.password).score / 5) * 105}%` }}
                      />
                    </div>

                    {/* Checklist Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-bold">
                      {[
                        { key: "length", text: "Min 8 Characters" },
                        { key: "uppercase", text: "Uppercase Letter (A-Z)" },
                        { key: "lowercase", text: "Lowercase Letter (a-z)" },
                        { key: "number", text: "Number (0-9)" },
                        { key: "special", text: "Special Symbol (!@#$)" }
                      ].map(metric => {
                        const isMet = getPasswordStrength(form.password).criteria?.[metric.key];
                        return (
                          <div key={metric.key} className="flex items-center gap-1.5">
                            <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[8px] font-black ${
                              isMet ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "border-white/10 text-slate-600"
                            }`}>
                              {isMet ? "✓" : "✗"}
                            </span>
                            <span className={isMet ? "text-emerald-400" : "text-slate-500"}>{metric.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[10px] text-slate-400 leading-relaxed pt-1.5 border-t border-white/5">
                      <span className="font-bold text-slate-350 block mb-0.5">Strong Password Instructions:</span>
                      Use a mix of uppercase letters, numbers, and symbols. Avoid common words or public personal details (like names, birthdays, or emails) to keep your medical profile secure.
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading || (form.password ? getPasswordStrength(form.password).score < 5 : true)}
                className="signup-btn w-full py-3 text-white text-sm font-bold rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : form.password && getPasswordStrength(form.password).score < 5 ? (
                  "Complete Password Requirements"
                ) : (
                  <>
                    {activeRole === "patient" ? "Register Account" : "Submit Application"}{" "}
                    <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Already have an account?</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            {/* Log In Link */}
            <div className="text-center space-y-2">
              <Link
                to="/login"
                className="block w-full py-2.5 border border-white/[0.1] text-white text-sm font-bold rounded-xl hover:bg-white/[0.05] transition-colors text-center no-underline"
              >
                Sign In Instead
              </Link>
              <Link to="/" className="text-xs text-slate-500 hover:text-white transition-colors no-underline font-semibold inline-flex items-center gap-1">
                ← Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
