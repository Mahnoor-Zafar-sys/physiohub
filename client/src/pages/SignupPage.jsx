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
    image: "",
    cv_file: "",
    cv_name: "",
    certificates_file: "",
    certificates_name: "",
    degrees_file: "",
    degrees_name: "",
    rewards_file: "",
    rewards_name: "",
    social_linkedin: "",
    social_facebook: "",
    social_instagram: "",
    social_twitter: ""
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

  const handleFileChange = (e, fileKey, nameKey) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError(`File size of ${file.name} must be less than 10MB`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          [fileKey]: reader.result,
          [nameKey]: file.name
        }));
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

    if (activeRole === "doctor") {
      if (!form.cv_file || !form.degrees_file || !form.certificates_file) {
        setError("Please upload all mandatory verification documents (CV, Degrees, and Certifications) to submit your application.");
        setLoading(false);
        return;
      }
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
          image: form.image,
          cv_file: form.cv_file,
          cv_name: form.cv_name,
          certificates_file: form.certificates_file,
          certificates_name: form.certificates_name,
          degrees_file: form.degrees_file,
          degrees_name: form.degrees_name,
          rewards_file: form.rewards_file,
          rewards_name: form.rewards_name,
          social_linkedin: form.social_linkedin,
          social_facebook: form.social_facebook,
          social_instagram: form.social_instagram,
          social_twitter: form.social_twitter
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
            image: "",
            cv_file: "",
            cv_name: "",
            certificates_file: "",
            certificates_name: "",
            degrees_file: "",
            degrees_name: "",
            rewards_file: "",
            rewards_name: "",
            social_linkedin: "",
            social_facebook: "",
            social_instagram: "",
            social_twitter: ""
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

  const renderFormContent = () => (
    <div className="space-y-6">
      {/* Logo & Title */}
      <div className="text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3 shadow" style={{ background: "linear-gradient(135deg, #0ea5e9, #e91e8c)" }}>
          <FiShield size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight font-sans">Create Account</h1>
        <p className="text-sm text-slate-500 mt-1 font-medium font-sans">Join Vital Physio Hub clinic portals</p>
      </div>

      {/* Role Toggle */}
      <div className="flex bg-slate-100/80 rounded-2xl p-1 border border-slate-200/50">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => { setActiveRole(tab.id); setError(""); setSuccessMsg(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
              activeRole === tab.id ? "tab-active shadow" : "bg-transparent text-slate-500 hover:text-slate-800"
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
            className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-xs font-semibold flex items-center gap-2 text-left"
          >
            <FiAlertTriangle className="shrink-0 text-rose-500" /> {error}
          </motion.div>
        )}
        {form.password && getPasswordStrength(form.password).score < 5 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-xs font-semibold flex items-center gap-2 text-left"
          >
            <FiAlertTriangle className="shrink-0 text-amber-500" /> Password must satisfy all 5 criteria (all ticks green) to submit.
          </motion.div>
        )}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold flex items-center gap-2 text-left"
          >
            <FiShield className="shrink-0 text-emerald-600" /> {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-3.5 text-left font-sans">
          {/* Full Name */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder={activeRole === "patient" ? "Jane Doe" : "Dr. Haseeb Ur Rehman"}
                className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder={activeRole === "patient" ? "jane@example.com" : "doctor@example.com"}
                className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Phone Number</label>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 03001234567"
                className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
              />
            </div>
          </div>

          {/* Credentials / Title (Doctor Only) */}
          {activeRole === "doctor" && (
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Medical Credentials</label>
              <div className="relative">
                <FiAward className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. MBBS, FCPS (Dermatology)"
                  className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
                />
              </div>
            </div>
          )}
        </div>

        {/* Doctor Specific Info Fields */}
        {activeRole === "doctor" && (
          <div className="grid grid-cols-1 gap-3.5 border-t border-slate-100 pt-4 mt-2 text-left font-sans">
            {/* Specialty */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Specialty Department</label>
              <div className="relative">
                <FaUserMd className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  name="specialty"
                  required
                  value={form.specialty}
                  onChange={handleChange}
                  placeholder="e.g. Physical Therapy / Orthopedic"
                  className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
                />
              </div>
            </div>

            {/* Branch Locations */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Practice Branches</label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  name="branch"
                  required
                  value={form.branch}
                  onChange={handleChange}
                  placeholder="e.g. Gulberg, DHA"
                  className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
                />
              </div>
            </div>

            {/* Consulting Fee */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Consultation Fee (PKR)</label>
              <div className="relative">
                <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="number"
                  name="fee"
                  required
                  value={form.fee}
                  onChange={handleChange}
                  placeholder="e.g. 2500"
                  className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Years of Experience</label>
              <div className="relative">
                <FiAward className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  name="experience"
                  required
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="e.g. 8 Years"
                  className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
                />
              </div>
            </div>

            {/* Profile Photo upload */}
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Upload Profile Photo</label>
              <div className="flex items-center gap-3">
                <div className="flex-grow relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-xs w-full text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                  />
                </div>
                {form.image && (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                    <img src={form.image} alt="Profile Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Verification Documents Upload (Mandatory CV, Degrees, Certifications; Optional Rewards) */}
            <div className="col-span-1 border-t border-slate-150/70 pt-4 mt-2">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Verification Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-slate-50/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/60">
                  <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-1 font-sans">Upload CV / Resume <span className="text-rose-500">*</span></label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "cv_file", "cv_name")}
                    className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                  />
                  {form.cv_name && <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ {form.cv_name}</p>}
                </div>

                <div className="bg-slate-50/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/60">
                  <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-1 font-sans">Upload Degrees <span className="text-rose-500">*</span></label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "degrees_file", "degrees_name")}
                    className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                  />
                  {form.degrees_name && <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ {form.degrees_name}</p>}
                </div>

                <div className="bg-slate-50/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/60">
                  <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-1 font-sans">Authentic Certificates <span className="text-rose-500">*</span></label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "certificates_file", "certificates_name")}
                    className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                  />
                  {form.certificates_name && <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ {form.certificates_name}</p>}
                </div>

                <div className="bg-slate-50/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/60">
                  <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-1 font-sans">Approved Rewards / Awards</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "rewards_file", "rewards_name")}
                    className="text-xs w-full text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer"
                  />
                  {form.rewards_name && <p className="text-[10px] text-emerald-600 font-bold mt-1 truncate">✓ {form.rewards_name}</p>}
                </div>
              </div>
            </div>

            {/* Social Handles URL Links */}
            <div className="col-span-1 border-t border-slate-150/70 pt-4 mt-2">
              <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-3">Social Media Accounts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-1.5 font-sans">LinkedIn Profile</label>
                  <input
                    type="url"
                    name="social_linkedin"
                    value={form.social_linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none placeholder:text-slate-400 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-1.5 font-sans">Facebook Profile</label>
                  <input
                    type="url"
                    name="social_facebook"
                    value={form.social_facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/username"
                    className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none placeholder:text-slate-400 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-1.5 font-sans">Instagram Profile</label>
                  <input
                    type="url"
                    name="social_instagram"
                    value={form.social_instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/username"
                    className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none placeholder:text-slate-400 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-550 uppercase tracking-widest block mb-1.5 font-sans">Twitter / X Profile</label>
                  <input
                    type="url"
                    name="social_twitter"
                    value={form.social_twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/username"
                    className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none placeholder:text-slate-400 font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Password Fields */}
        <div className="grid grid-cols-1 gap-3.5 border-t border-slate-100 pt-4 mt-2 text-left font-sans">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Password</label>
              <button
                type="button"
                onClick={suggestStrongPassword}
                className="text-[9px] font-bold text-sky-600 hover:text-sky-700 bg-transparent border-none cursor-pointer uppercase tracking-wider p-0 outline-none"
              >
                Suggest Strong Password
              </button>
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Choose a password"
                autoComplete="new-password"
                className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-12 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 bg-transparent border-none cursor-pointer flex items-center justify-center p-0 outline-none"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                autoComplete="new-password"
                className="input-field w-full bg-white/85 border border-slate-200 text-slate-800 rounded-xl pl-11 pr-12 py-3 text-sm outline-none placeholder:text-slate-400 font-semibold"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 bg-transparent border-none cursor-pointer flex items-center justify-center p-0 outline-none"
              >
                {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* Password Strength Indicator & Checklist */}
          {form.password && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 space-y-3 font-sans">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-550 font-bold">Password Strength:</span>
                <span className={`font-black px-2 py-0.5 rounded text-[10px] uppercase text-white ${
                  getPasswordStrength(form.password).label === "Weak" ? "bg-rose-500" :
                  getPasswordStrength(form.password).label === "Medium" ? "bg-amber-500" : "bg-emerald-500"
                }`}>
                  {getPasswordStrength(form.password).label}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${getPasswordStrength(form.password).color}`}
                  style={{ width: `${(getPasswordStrength(form.password).score / 5) * 105}%` }}
                />
              </div>

              {/* Checklist Metrics */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                {[
                  { key: "length", text: "Min 8 Characters" },
                  { key: "uppercase", text: "Uppercase Letter (A-Z)" },
                  { key: "lowercase", text: "Lowercase Letter (a-z)" },
                  { key: "number", text: "Number (0-9)" },
                  { key: "special", text: "Special Symbol (!@#$)" }
                ].map(metric => {
                  const isMet = getPasswordStrength(form.password).criteria?.[metric.key];
                  return (
                    <div key={metric.key} className="flex items-center gap-1.5 font-sans">
                      <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[8px] font-black ${
                        isMet ? "bg-emerald-500/20 border-emerald-500 text-emerald-600" : "border-slate-200 text-slate-400"
                      }`}>
                        {isMet ? "✓" : "✗"}
                      </span>
                      <span className={isMet ? "text-emerald-600" : "text-slate-400"}>{metric.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[10px] text-slate-500 leading-relaxed pt-1.5 border-t border-slate-150 font-medium">
                <span className="font-bold text-slate-700 block mb-0.5 font-sans">Strong Password Instructions:</span>
                Use a mix of uppercase letters, numbers, and symbols. Avoid common words or public personal details (like names, birthdays, or emails) to keep your medical profile secure.
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={loading || (form.password ? getPasswordStrength(form.password).score < 5 : true)}
          className="signup-btn w-full py-3.5 text-white text-sm font-extrabold rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Already have an account?</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Log In Link */}
      <div className="text-center space-y-2 font-sans">
        <Link
          to="/login"
          className="block w-full py-3 border border-slate-200 text-slate-700 text-sm font-extrabold rounded-xl hover:bg-slate-50 transition-colors text-center no-underline"
        >
          Sign In Instead
        </Link>
        <Link to="/" className="text-xs text-slate-400 hover:text-slate-650 transition-colors no-underline font-semibold inline-flex items-center gap-1">
          ← Back to Homepage
        </Link>
      </div>
    </div>
  );

  const isSplitLayout = activeRole === "patient" || activeRole === "doctor";

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .signup-card { font-family: 'Inter', system-ui, sans-serif; }
        .glow-border { box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.08); }
        .input-field { transition: border-color 0.2s, box-shadow 0.2s; }
        .input-field:focus { border-color: #0ea5e9; box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15); }
        .tab-active { background: linear-gradient(135deg, #0ea5e9, #e91e8c); color: white; }
        .signup-btn { background: linear-gradient(135deg, #0ea5e9, #e91e8c); transition: all 0.2s; }
        .signup-btn:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 8px 25px -5px rgba(14, 165, 233, 0.25); }
        .signup-btn:active { transform: translateY(0); }
        .signup-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
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
        className="signup-card relative z-10 w-full max-w-5xl mx-4"
      >
        {isSplitLayout ? (
          <div className="bg-white/55 backdrop-blur-xl rounded-3xl border border-white/70 glow-border overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            {/* Left Side: Premium Image Panel */}
            <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-10 relative text-white overflow-hidden text-left">
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
