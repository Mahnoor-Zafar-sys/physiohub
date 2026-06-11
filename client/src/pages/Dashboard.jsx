import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiCalendar, FiClock, FiFileText, FiDollarSign, 
  FiCheckCircle, FiXCircle, FiTrendingUp, FiActivity, 
  FiPlus, FiTrash, FiShield, FiCpu, FiExternalLink, 
  FiSliders, FiCheck, FiChevronRight, FiGrid, FiList, FiAlertTriangle 
} from "react-icons/fi";
import { FaUserMd, FaHospitalUser, FaUserCog, FaCreditCard, FaPrint, FaBriefcaseMedical } from "react-icons/fa";
import { MdOutlineHealthAndSafety, MdVerifiedUser } from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Theme constants
const THEME = {
  pink: "#e91e8c",
  sky: "#0ea5e9",
  grad: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #fdf2f8 100%)",
  gradBtn: "linear-gradient(135deg, #0ea5e9, #e91e8c)",
};

// Initial Mock Datasets to seed localStorage
const INITIAL_EMR = [
  { id: "EMR-101", date: "2026-05-15", doctor: "Dr. Sarah Ahmed", diagnosis: "Mild Atopic Dermatitis", vitals: "BP: 120/80, Temp: 98.6°F", assessment: "Patient presented with dry, itchy skin patches. Prescribed topical Hydrozole cream." },
  { id: "EMR-102", date: "2026-06-01", doctor: "Dr. Omar Farooq", diagnosis: "Localized Gingivitis", vitals: "BP: 118/75, Temp: 98.4°F", assessment: "Slight inflammation in upper gums. Completed scaling and advised antiseptic mouthwash twice daily." }
];

const INITIAL_PRESCRIPTIONS = [
  { id: "RX-9901", date: "2026-06-01", doctor: "Dr. Sarah Ahmed", medicine: "Hydrozole Topical Cream", dosage: "Apply twice daily", duration: "7 Days", instructions: "External skin application only", status: "Active" },
  { id: "RX-9902", date: "2026-06-05", doctor: "Dr. Omar Farooq", medicine: "Amoxicillin 500mg", dosage: "1 tablet thrice daily", duration: "5 Days", instructions: "After meals", status: "Active" }
];

const INITIAL_APPOINTMENTS = [
  { id: "PC-88201", doctor: "Dr. Sarah Ahmed", date: "15 Jun, 2026", time: "04:30 PM", type: "Video Consultation", branch: "Online", status: "Confirmed", patient: "Jane Doe" },
  { id: "PC-88202", doctor: "Dr. Omar Farooq", date: "18 Jun, 2026", time: "11:30 AM", type: "In-Person Visit", branch: "Gulberg Branch", status: "Pending", patient: "Jane Doe" }
];

const INITIAL_INVOICES = [
  { id: "INV-5001", description: "Dermatological Laser Consultation", amount: "₨ 3,000", status: "Unpaid", date: "2026-06-10" },
  { id: "INV-5002", description: "Dental Routine Prophylaxis", amount: "₨ 2,500", status: "Paid", date: "2026-06-05" }
];

const INITIAL_DOCTORS = [
  { id: 1, name: "Dr. Sarah Ahmed", specialty: "Skin & Dermatology", fee: "₨ 3,000", branch: "Gulberg, DHA", status: "Active" },
  { id: 2, name: "Dr. Omar Farooq", specialty: "Dental Care", fee: "₨ 2,500", branch: "Gulberg", status: "Active" },
  { id: 3, name: "Dr. Fatima Malik", specialty: "Gynecology & Obstetrics", fee: "₨ 3,500", branch: "DHA", status: "Active" }
];

export default function Dashboard() {
  const navigate = useNavigate();

  // Role authentication state
  const [userRole, setUserRole] = useState(null); // 'patient' | 'doctor' | 'admin' | 'receptionist'
  const [authForm, setAuthForm] = useState({ email: "", password: "", role: "patient" });

  // Core Data State (synchronized with localStorage)
  const [emrRecords, setEmrRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [logs, setLogs] = useState([
    { time: "10:30 AM", event: "Billing Invoice INV-5002 marked as paid." },
    { time: "11:00 AM", event: "Appointment scheduled with Dr. Omar Farooq." }
  ]);

  // Sidebar Tab state
  const [activeTab, setActiveTab] = useState("");

  // Stepper/Form States
  const [prescriptionForm, setPrescriptionForm] = useState({ doctor: "Dr. Sarah Ahmed", medicine: "", dosage: "", duration: "", instructions: "" });
  const [emrForm, setEmrForm] = useState({ doctor: "Dr. Sarah Ahmed", diagnosis: "", vitals: "", assessment: "" });
  const [checkoutInvoice, setCheckoutInvoice] = useState(null);
  const [checkoutCard, setCheckoutCard] = useState({ number: "", expiry: "", cvc: "" });
  const [rescheduleAppt, setRescheduleAppt] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({ date: "", time: "09:00 AM" });
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "", fee: "", branch: "Gulberg" });
  
  // Printable Prescription details modal
  const [selectedPrescriptionPrint, setSelectedPrescriptionPrint] = useState(null);

  // Initialize and load localStorage data
  useEffect(() => {
    const localEMR = localStorage.getItem("pc_emr");
    const localRx = localStorage.getItem("pc_rx");
    const localAppt = localStorage.getItem("pc_appts");
    const localInvs = localStorage.getItem("pc_invs");
    const localDocs = localStorage.getItem("pc_doctors");

    if (localEMR) setEmrRecords(JSON.parse(localEMR));
    else {
      setEmrRecords(INITIAL_EMR);
      localStorage.setItem("pc_emr", JSON.stringify(INITIAL_EMR));
    }

    if (localRx) setPrescriptions(JSON.parse(localRx));
    else {
      setPrescriptions(INITIAL_PRESCRIPTIONS);
      localStorage.setItem("pc_rx", JSON.stringify(INITIAL_PRESCRIPTIONS));
    }

    if (localAppt) setAppointments(JSON.parse(localAppt));
    else {
      setAppointments(INITIAL_APPOINTMENTS);
      localStorage.setItem("pc_appts", JSON.stringify(INITIAL_APPOINTMENTS));
    }

    if (localInvs) setInvoices(JSON.parse(localInvs));
    else {
      setInvoices(INITIAL_INVOICES);
      localStorage.setItem("pc_invs", JSON.stringify(INITIAL_INVOICES));
    }

    if (localDocs) setDoctorsList(JSON.parse(localDocs));
    else {
      setDoctorsList(INITIAL_DOCTORS);
      localStorage.setItem("pc_doctors", JSON.stringify(INITIAL_DOCTORS));
    }
  }, []);

  // Update localStorage when state updates
  const updateStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    // In a fully built mock app, any credentials authenticate to speed up validation.
    setUserRole(authForm.role);
    // Set default active tab based on role
    if (authForm.role === "patient") setActiveTab("records");
    else if (authForm.role === "doctor") setActiveTab("queue");
    else if (authForm.role === "admin") setActiveTab("analytics");
    else if (authForm.role === "receptionist") setActiveTab("reception-queue");
    
    // Add event log
    addSystemLog(`User logged in as ${authForm.role.toUpperCase()}`);
  };

  // Logout handler
  const handleLogout = () => {
    setUserRole(null);
    setActiveTab("");
  };

  const addSystemLog = (event) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setLogs(prev => [{ time: now, event }, ...prev.slice(0, 10)]);
  };

  // Cancellation appointment handler
  const handleCancelAppt = (id) => {
    const updated = appointments.map(appt => appt.id === id ? { ...appt, status: "Cancelled" } : appt);
    setAppointments(updated);
    updateStorage("pc_appts", updated);
    addSystemLog(`Appointment ${id} has been cancelled by patient.`);
    alert(`Appointment ${id} cancelled successfully.`);
  };

  // Reschedule appointment handler
  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (rescheduleAppt) {
      const updated = appointments.map(appt => 
        appt.id === rescheduleAppt.id 
          ? { ...appt, date: rescheduleData.date, time: rescheduleData.time, status: "Rescheduled" } 
          : appt
      );
      setAppointments(updated);
      updateStorage("pc_appts", updated);
      addSystemLog(`Appointment ${rescheduleAppt.id} rescheduled to ${rescheduleData.date} at ${rescheduleData.time}.`);
      setRescheduleAppt(null);
      alert("Appointment rescheduled successfully!");
    }
  };

  // Patient Payment checkout handler
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (checkoutInvoice) {
      const updated = invoices.map(inv => inv.id === checkoutInvoice.id ? { ...inv, status: "Paid" } : inv);
      setInvoices(updated);
      updateStorage("pc_invs", updated);
      addSystemLog(`Invoice ${checkoutInvoice.id} (${checkoutInvoice.description}) paid via digital portal.`);
      setCheckoutInvoice(null);
      setCheckoutCard({ number: "", expiry: "", cvc: "" });
      alert("Payment successful! Invoice marked as paid and log updated.");
    }
  };

  // Doctor EMR append handler
  const handleEMRSubmit = (e) => {
    e.preventDefault();
    if (emrForm.diagnosis && emrForm.assessment) {
      const newRec = {
        id: `EMR-${Date.now().toString().slice(-3)}`,
        date: new Date().toISOString().split("T")[0],
        doctor: emrForm.doctor,
        diagnosis: emrForm.diagnosis,
        vitals: emrForm.vitals || "BP: 120/80, Temp: 98.6°F",
        assessment: emrForm.assessment
      };
      const updated = [newRec, ...emrRecords];
      setEmrRecords(updated);
      updateStorage("pc_emr", updated);
      addSystemLog(`New EMR record added for patient by ${emrForm.doctor}.`);
      setEmrForm({ doctor: "Dr. Sarah Ahmed", diagnosis: "", vitals: "", assessment: "" });
      alert("EMR diagnostic record added to patient clinical history!");
    }
  };

  // Doctor Rx Prescription write handler
  const handleRxSubmit = (e) => {
    e.preventDefault();
    if (prescriptionForm.medicine && prescriptionForm.dosage) {
      const newRx = {
        id: `RX-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split("T")[0],
        doctor: prescriptionForm.doctor,
        medicine: prescriptionForm.medicine,
        dosage: prescriptionForm.dosage,
        duration: prescriptionForm.duration || "7 Days",
        instructions: prescriptionForm.instructions || "After meals",
        status: "Active"
      };
      const updated = [newRx, ...prescriptions];
      setPrescriptions(updated);
      updateStorage("pc_rx", updated);
      addSystemLog(`Prescription ${newRx.id} generated by ${prescriptionForm.doctor}.`);
      
      // Auto append a billing invoice for prescription review
      const newInv = {
        id: `INV-${Date.now().toString().slice(-4)}`,
        description: `Clinical Consultation Fee - ${prescriptionForm.doctor}`,
        amount: "₨ 3,000",
        status: "Unpaid",
        date: new Date().toISOString().split("T")[0]
      };
      const updatedInvs = [newInv, ...invoices];
      setInvoices(updatedInvs);
      updateStorage("pc_invs", updatedInvs);

      setPrescriptionForm({ doctor: "Dr. Sarah Ahmed", medicine: "", dosage: "", duration: "", instructions: "" });
      alert("Digital prescription generated successfully and published to Patient Portal!");
    }
  };

  // Receptionist live Check-in toggle handler
  const handleCheckInToggle = (id, currentStatus) => {
    let nextStatus = "Waiting";
    if (currentStatus === "Pending") nextStatus = "Checked In";
    else if (currentStatus === "Checked In") nextStatus = "In Room";
    else if (currentStatus === "In Room") nextStatus = "Completed";

    const updated = appointments.map(appt => appt.id === id ? { ...appt, status: nextStatus } : appt);
    setAppointments(updated);
    updateStorage("pc_appts", updated);
    addSystemLog(`Patient queue status for ${id} updated to ${nextStatus}.`);
  };

  // Admin Doctor Registry CRUD - Create
  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (newDoctor.name && newDoctor.specialty) {
      const doc = {
        id: doctorsList.length + 1,
        name: newDoctor.name.startsWith("Dr.") ? newDoctor.name : `Dr. ${newDoctor.name}`,
        specialty: newDoctor.specialty,
        fee: `₨ ${newDoctor.fee || "2,500"}`,
        branch: newDoctor.branch,
        status: "Active"
      };
      const updated = [...doctorsList, doc];
      setDoctorsList(updated);
      updateStorage("pc_doctors", updated);
      addSystemLog(`New specialist ${doc.name} registered under ${doc.specialty}.`);
      setNewDoctor({ name: "", specialty: "", fee: "", branch: "Gulberg" });
      alert("New specialist added to registry!");
    }
  };

  // Admin Doctor Registry CRUD - Delete/Status toggle
  const handleToggleDocStatus = (id) => {
    const updated = doctorsList.map(doc => 
      doc.id === id ? { ...doc, status: doc.status === "Active" ? "Suspended" : "Active" } : doc
    );
    setDoctorsList(updated);
    updateStorage("pc_doctors", updated);
    addSystemLog(`Doctor registry status modified for ID ${id}.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      <Navbar />

      {/* --- PRINT AREA STYLING FOR Rx PRESCRIPTION --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          .print-prescription-area, .print-prescription-area * { visibility: visible; }
          .print-prescription-area { position: absolute; left: 0; top: 0; width: 100%; color: #000 !important; background: white !important; }
        }
      `}} />

      {/* --- SELECTED PRESCRIPTION PRINT MODAL --- */}
      <AnimatePresence>
        {selectedPrescriptionPrint && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPrescriptionPrint(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full text-slate-800 shadow-2xl relative border border-slate-100 print-prescription-area"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPrescriptionPrint(null)} 
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors border-none cursor-pointer print:hidden"
              >
                ✕
              </button>

              {/* Letterhead */}
              <div className="flex justify-between items-start border-b-2 border-slate-100 pb-5 mb-6 text-left">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">PREMIUM CLINIC</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Advanced digital healthcare</p>
                  <p className="text-xs text-slate-500 mt-2">Plaza 56, Block L, Blue Area, Islamabad</p>
                </div>
                <div className="text-right">
                  <h4 className="font-extrabold text-sm text-slate-800">{selectedPrescriptionPrint.doctor}</h4>
                  <p className="text-[10px] text-pink-500 font-bold uppercase tracking-wider">Consultant Specialist</p>
                  <p className="text-xs text-slate-500 mt-2">Date: {selectedPrescriptionPrint.date}</p>
                </div>
              </div>

              {/* Patient details */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs grid grid-cols-2 gap-y-1.5 text-left mb-6 font-semibold">
                <div><span className="text-slate-400">Patient Name:</span> Jane Doe</div>
                <div><span className="text-slate-400">Age / Gender:</span> 28 / Female</div>
                <div><span className="text-slate-400">Prescription ID:</span> {selectedPrescriptionPrint.id}</div>
                <div><span className="text-slate-400">Status:</span> Active Course</div>
              </div>

              {/* Rx Formula block */}
              <div className="text-left space-y-4">
                <span className="text-2xl font-serif italic text-slate-800 font-black">Rx</span>
                <table className="w-full text-xs sm:text-sm text-left text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] tracking-wider">
                      <th className="py-2">Medicine Name</th>
                      <th>Dosage</th>
                      <th>Duration</th>
                      <th>Instruction</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 font-semibold">
                      <td className="py-3 font-bold text-slate-800">{selectedPrescriptionPrint.medicine}</td>
                      <td>{selectedPrescriptionPrint.dosage}</td>
                      <td>{selectedPrescriptionPrint.duration}</td>
                      <td>{selectedPrescriptionPrint.instructions}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer Stamp & Sign */}
              <div className="flex justify-between items-end border-t border-slate-100 pt-6 mt-12 text-left">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <FiShield size={12} className="text-emerald-500" /> HIPAA Secured Digital Prescription
                </span>
                <div className="text-right space-y-1">
                  <div className="font-serif italic text-slate-700 text-base">{selectedPrescriptionPrint.doctor.replace("Dr. ", "")}</div>
                  <div className="w-24 h-px bg-slate-300 ml-auto" />
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Authorized signature</p>
                </div>
              </div>

              {/* Actions row */}
              <div className="flex justify-center gap-3 mt-8 print:hidden">
                <button 
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border-none shadow-md"
                >
                  <FaPrint /> Print / Save PDF
                </button>
                <button 
                  onClick={() => setSelectedPrescriptionPrint(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border-none"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DASHBOARD ENTRY ROUTER --- */}
      <div className="flex-grow pt-28 pb-16 px-4">
        
        {userRole === null ? (
          /* --- LOGIN AUTH SIMULATOR SCREEN --- */
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden text-left mt-6">
            <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-pink-500" />
            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto text-white shadow-lg mb-4">
                  <FiShield size={24} />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">Clinic Portal Authorization</h2>
                <p className="text-xs text-slate-400 mt-1">Select a mock credential profile to access the panel</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Select Role Profile</label>
                  <select 
                    value={authForm.role}
                    onChange={e => {
                      const r = e.target.value;
                      setAuthForm({
                        role: r,
                        email: r === "patient" ? "patient@premiumclinic.com" : r === "doctor" ? "doctor@premiumclinic.com" : r === "admin" ? "admin@premiumclinic.com" : "staff@premiumclinic.com",
                        password: "••••••••"
                      });
                    }}
                    className="w-full border border-slate-200 bg-white rounded-xl p-3 text-xs outline-none focus:border-pink-400 transition-colors"
                  >
                    <option value="patient">Patient Portal (Jane Doe)</option>
                    <option value="doctor">Doctor Portal (Dr. Sarah Ahmed)</option>
                    <option value="admin">Administrator Dashboard (Clinical Analytics)</option>
                    <option value="receptionist">Receptionist / Staff Desk</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    readOnly
                    value={authForm.email || "patient@premiumclinic.com"}
                    className="w-full border border-slate-200 bg-slate-50 text-slate-400 rounded-xl p-3 text-xs outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">Password</label>
                  <input 
                    type="password" 
                    required 
                    readOnly
                    value={authForm.password || "••••••••"}
                    className="w-full border border-slate-200 bg-slate-50 text-slate-400 rounded-xl p-3 text-xs outline-none cursor-not-allowed"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-slate-900 hover:bg-pink-600 text-white text-xs font-bold rounded-xl shadow-md transition-colors border-none cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <MdVerifiedUser size={14} /> Launch Demo Portal
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* --- MOCK PORTAL LAYOUT SYSTEM --- */
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mt-4 min-h-[580px]">
            
            {/* SIDEBAR NAVIGATION PANEL */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between">
              <div>
                
                {/* User Card */}
                <div className="pb-5 border-b border-slate-100 flex items-center gap-3 mb-6 text-left">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-extrabold shadow-inner">
                    {userRole === "patient" && <FiUser />}
                    {userRole === "doctor" && <FaUserMd />}
                    {userRole === "admin" && <FaUserCog />}
                    {userRole === "receptionist" && <FaHospitalUser />}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 leading-none">
                      {userRole === "patient" && "Jane Doe"}
                      {userRole === "doctor" && "Dr. Sarah Ahmed"}
                      {userRole === "admin" && "Director Admin"}
                      {userRole === "receptionist" && "Reception Desk"}
                    </h4>
                    <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest block mt-1">
                      {userRole.toUpperCase()} PORTAL
                    </span>
                  </div>
                </div>

                {/* Tab Items */}
                <div className="flex flex-col gap-1.5 text-left">
                  {/* Patient Tabs */}
                  {userRole === "patient" && [
                    { id: "records", label: "Medical History (EMR)", icon: FiActivity },
                    { id: "patient-rx", label: "My Prescriptions", icon: FiFileText },
                    { id: "appointments", label: "Appointments", icon: FiCalendar },
                    { id: "billing", label: "Invoices & Payments", icon: FiDollarSign }
                  ].map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                        activeTab === tab.id 
                          ? "bg-slate-900 text-white shadow" 
                          : "bg-transparent text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <tab.icon size={13} /> {tab.label}
                    </button>
                  ))}

                  {/* Doctor Tabs */}
                  {userRole === "doctor" && [
                    { id: "queue", label: "Today's Patient Queue", icon: FiList },
                    { id: "emr-writer", label: "EMR Diagnosis Entry", icon: FiActivity },
                    { id: "rx-writer", label: "Write Prescription", icon: FiFileText },
                    { id: "doctor-schedule", label: "Availability Settings", icon: FiClock }
                  ].map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                        activeTab === tab.id 
                          ? "bg-slate-900 text-white shadow" 
                          : "bg-transparent text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <tab.icon size={13} /> {tab.label}
                    </button>
                  ))}

                  {/* Admin Tabs */}
                  {userRole === "admin" && [
                    { id: "analytics", label: "Analytical Center", icon: FiTrendingUp },
                    { id: "doctor-crud", label: "Doctor Registry", icon: FaUserMd }
                  ].map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                        activeTab === tab.id 
                          ? "bg-slate-900 text-white shadow" 
                          : "bg-transparent text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <tab.icon size={13} /> {tab.label}
                    </button>
                  ))}

                  {/* Receptionist Tabs */}
                  {userRole === "receptionist" && [
                    { id: "reception-queue", label: "Check-In Desk", icon: FiList },
                    { id: "reception-billing", label: "Insurance Desk", icon: MdOutlineHealthAndSafety }
                  ].map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                        activeTab === tab.id 
                          ? "bg-slate-900 text-white shadow" 
                          : "bg-transparent text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <tab.icon size={13} /> {tab.label}
                    </button>
                  ))}

                </div>
              </div>

              {/* Switch Portal Button */}
              <button 
                onClick={handleLogout}
                className="w-full py-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 rounded-xl text-xs font-bold border-none transition-colors mt-6 cursor-pointer"
              >
                Logout / Switch Role
              </button>

            </div>

            {/* MAIN PORTAL VIEWS */}
            <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between relative">
              
              {/* --- PATIENT: EMR MEDICAL RECORDS --- */}
              {activeTab === "records" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiActivity className="text-pink-500" /> Electronic Medical Record (EMR)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Your official clinical diagnostics and laboratory summaries.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 text-xs space-y-1.5 font-semibold">
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider">Patient Information</p>
                      <p><span className="text-slate-400">Name:</span> Jane Doe</p>
                      <p><span className="text-slate-400">Age / Gender:</span> 28 / Female</p>
                      <p><span className="text-slate-400">Blood Group:</span> O positive</p>
                      <p><span className="text-slate-400">Allergies:</span> Penicillin, Peanuts</p>
                    </div>
                    <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 text-xs space-y-1.5 font-semibold">
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider">Clinical Vitals (Latest)</p>
                      <p><span className="text-slate-400">Blood Pressure:</span> 120/80 mmHg</p>
                      <p><span className="text-slate-400">Heart Rate:</span> 72 bpm</p>
                      <p><span className="text-slate-400">Blood Sugar:</span> 95 mg/dL</p>
                      <p><span className="text-slate-400">Primary Branch:</span> Gulberg Center</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b pb-1">Past Consultations & Diagnoses</p>
                    {emrRecords.map(rec => (
                      <div key={rec.id} className="border border-slate-100 rounded-2xl p-5 space-y-3 shadow-sm hover:border-slate-200 transition-colors">
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{rec.date}</span>
                            <h4 className="font-extrabold text-sm text-slate-800">{rec.diagnosis}</h4>
                          </div>
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700">{rec.doctor}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{rec.assessment}</p>
                        <div className="text-[10px] text-slate-400 font-bold bg-slate-50 p-2 rounded-lg">
                          Vitals Taken: {rec.vitals}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- PATIENT: MY PRESCRIPTIONS --- */}
              {activeTab === "patient-rx" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiFileText className="text-pink-500" /> Prescriptions & Medications (Rx)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Click Print to generate authorized PDFs of your active courses.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prescriptions.map(rx => (
                      <div key={rx.id} className="border border-slate-100 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-black uppercase text-pink-500 bg-pink-50 px-2 py-0.5 rounded">{rx.id}</span>
                            <span className="text-[10px] font-bold text-slate-400">{rx.date}</span>
                          </div>
                          <h4 className="font-black text-slate-800 text-sm leading-snug">{rx.medicine}</h4>
                          <p className="text-xs text-slate-500 mt-1 font-semibold">Dosage: {rx.dosage} · Duration: {rx.duration}</p>
                          <p className="text-[10px] text-slate-400 mt-2">Doctor: {rx.doctor}</p>
                        </div>
                        <div className="border-t border-slate-50 pt-3 mt-4 flex justify-between items-center">
                          <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1 h-1 bg-emerald-500 rounded-full inline-block" /> {rx.status}
                          </span>
                          <button 
                            onClick={() => setSelectedPrescriptionPrint(rx)}
                            className="px-3.5 py-1.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-[10px] font-bold flex items-center gap-1 transition-colors border-none cursor-pointer"
                          >
                            <FaPrint size={10} /> View / Print Rx
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- PATIENT: APPOINTMENTS --- */}
              {activeTab === "appointments" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiCalendar className="text-pink-500" /> Appointment Bookings
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage your active and past clinical schedules.</p>
                  </div>

                  {appointments.length === 0 ? (
                    <p className="text-xs text-slate-400">No scheduled appointments.</p>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map(appt => (
                        <div key={appt.id} className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-800">{appt.doctor}</span>
                              <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{appt.type}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Date: {appt.date} at {appt.time} ({appt.branch})</p>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                              appt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" :
                              appt.status === "Cancelled" ? "bg-red-50 text-red-700" : "bg-sky-50 text-sky-700"
                            }`}>
                              {appt.status}
                            </span>
                            
                            {appt.status !== "Cancelled" && appt.status !== "Completed" && (
                              <>
                                <button 
                                  onClick={() => {
                                    setRescheduleAppt(appt);
                                    setRescheduleData({ date: appt.date, time: appt.time });
                                  }}
                                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold border-none cursor-pointer"
                                >
                                  Reschedule
                                </button>
                                <button 
                                  onClick={() => handleCancelAppt(appt.id)}
                                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[10px] font-bold border-none cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reschedule Modal */}
                  {rescheduleAppt && (
                    <div className="absolute inset-0 bg-white/95 rounded-3xl p-6 flex flex-col justify-center items-center z-10">
                      <form onSubmit={handleRescheduleSubmit} className="max-w-sm w-full space-y-4">
                        <h4 className="font-extrabold text-base text-slate-800">Reschedule Appointment {rescheduleAppt.id}</h4>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">New Date</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. 25 Jun, 2026"
                            value={rescheduleData.date}
                            onChange={e => setRescheduleData({...rescheduleData, date: e.target.value})}
                            className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">New Time Slot</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. 04:30 PM"
                            value={rescheduleData.time}
                            onChange={e => setRescheduleData({...rescheduleData, time: e.target.value})}
                            className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="flex-1 py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer">Confirm</button>
                          <button type="button" onClick={() => setRescheduleAppt(null)} className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer">Cancel</button>
                        </div>
                      </form>
                    </div>
                  )}

                </div>
              )}

              {/* --- PATIENT: BILLING & PAYMENT CHECKOUT --- */}
              {activeTab === "billing" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiDollarSign className="text-pink-500" /> Billing Desk & Invoice Checkout
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Pay outstanding invoices securely via Stripe / JazzCash mockup streams.</p>
                  </div>

                  <div className="space-y-3">
                    {invoices.map(inv => (
                      <div key={inv.id} className="border border-slate-100 rounded-2xl p-4 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400">{inv.date}</span>
                          <h4 className="font-extrabold text-sm text-slate-800 mt-0.5">{inv.description}</h4>
                          <span className="text-xs font-black text-pink-500 mt-1 block">{inv.amount}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            inv.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                          }`}>
                            {inv.status}
                          </span>
                          
                          {inv.status === "Unpaid" && (
                            <button 
                              onClick={() => setCheckoutInvoice(inv)}
                              className="px-4 py-2 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow"
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Checkout Drawer overlay */}
                  {checkoutInvoice && (
                    <div className="absolute inset-0 bg-white/95 rounded-3xl p-6 flex flex-col justify-center items-center z-10">
                      <form onSubmit={handleCheckoutSubmit} className="max-w-sm w-full space-y-4 bg-white border border-slate-100 p-6 rounded-3xl shadow-xl">
                        <div className="text-center pb-2 border-b">
                          <h4 className="font-black text-slate-800 text-base">Secure checkout</h4>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Amount: {checkoutInvoice.amount}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Card Number</label>
                            <div className="relative">
                              <FaCreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input 
                                type="text" 
                                required
                                value={checkoutCard.number}
                                onChange={e => setCheckoutCard({...checkoutCard, number: e.target.value})}
                                placeholder="4242 4242 4242 4242"
                                className="w-full border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none focus:border-pink-400"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Expiry (MM/YY)</label>
                              <input 
                                type="text" 
                                required
                                value={checkoutCard.expiry}
                                onChange={e => setCheckoutCard({...checkoutCard, expiry: e.target.value})}
                                placeholder="12/28"
                                className="w-full border border-slate-200 p-2.5 rounded-xl text-xs outline-none focus:border-pink-400 text-center"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">CVC / CVV</label>
                              <input 
                                type="password" 
                                required
                                value={checkoutCard.cvc}
                                onChange={e => setCheckoutCard({...checkoutCard, cvc: e.target.value})}
                                placeholder="•••"
                                maxLength={3}
                                className="w-full border border-slate-200 p-2.5 rounded-xl text-xs outline-none focus:border-pink-400 text-center"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2.5 pt-2">
                          <button type="submit" className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md">Complete payment</button>
                          <button type="button" onClick={() => setCheckoutInvoice(null)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer">Cancel</button>
                        </div>
                      </form>
                    </div>
                  )}

                </div>
              )}

              {/* --- DOCTOR: TODAY'S PATIENT QUEUE --- */}
              {activeTab === "queue" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiList className="text-pink-500" /> Today's Scheduled Queue
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Start video consultations with patients directly from the list.</p>
                  </div>

                  <div className="space-y-3">
                    {appointments.filter(appt => appt.status !== "Cancelled").map(appt => (
                      <div key={appt.id} className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-800">{appt.patient}</h4>
                            <span className="text-[9px] font-bold bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full">{appt.type}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Slot: {appt.date} at {appt.time}</p>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                            appt.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" :
                            appt.status === "In Room" ? "bg-pink-50 text-pink-700 animate-pulse" :
                            appt.status === "Completed" ? "bg-slate-100 text-slate-500" : "bg-sky-50 text-sky-700"
                          }`}>
                            {appt.status}
                          </span>
                          
                          {appt.type.includes("Video") && appt.status !== "Completed" && (
                            <button 
                              onClick={() => navigate("/consultation-room", { state: { doctor: { name: "Dr. Sarah Ahmed", specialty: "Skin & Dermatology", title: "MBBS, FCPS" }, patientName: appt.patient } })}
                              className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold flex items-center gap-1 border-none cursor-pointer shadow-md"
                            >
                              <FiExternalLink /> Start Call
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- DOCTOR: EMR DIAGNOSIS ENTRY --- */}
              {activeTab === "emr-writer" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiActivity className="text-pink-500" /> Electronic Medical Record (EMR) Editor
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Publish diagnostic notes and physiological vitals directly to the patient folder.</p>
                  </div>

                  <form onSubmit={handleEMRSubmit} className="space-y-4 max-w-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Consultant Doctor</label>
                        <input type="text" readOnly value={emrForm.doctor} className="w-full border border-slate-200 bg-slate-50 text-slate-400 rounded-xl p-3 text-xs outline-none" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Clinical Vitals (BP, Temp)</label>
                        <input 
                          type="text" 
                          value={emrForm.vitals}
                          onChange={e => setEmrForm({...emrForm, vitals: e.target.value})}
                          placeholder="e.g. BP: 120/80, Temp: 98.6°F"
                          className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Primary Diagnosis / Condition</label>
                      <input 
                        type="text" 
                        required
                        value={emrForm.diagnosis}
                        onChange={e => setEmrForm({...emrForm, diagnosis: e.target.value})}
                        placeholder="e.g. Contact Dermatitis or Chronic Plaque Psoriasis"
                        className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Clinical Findings & Assessment Notes</label>
                      <textarea 
                        rows={4}
                        required
                        value={emrForm.assessment}
                        onChange={e => setEmrForm({...emrForm, assessment: e.target.value})}
                        placeholder="Describe the clinical examination, severity, and advice..."
                        className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400 resize-none"
                      />
                    </div>

                    <button type="submit" className="px-6 py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow">
                      Publish to Patient EMR
                    </button>
                  </form>
                </div>
              )}

              {/* --- DOCTOR: WRITE PRESCRIPTION --- */}
              {activeTab === "rx-writer" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiFileText className="text-pink-500" /> Write Digital Prescription (Rx)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Authorizing prescriptions adds them live to the patient portal feed.</p>
                  </div>

                  <form onSubmit={handleRxSubmit} className="space-y-4 max-w-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Consultant Doctor</label>
                        <input type="text" readOnly value={prescriptionForm.doctor} className="w-full border border-slate-200 bg-slate-50 text-slate-400 rounded-xl p-3 text-xs outline-none" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Medicine Name & Strength</label>
                        <input 
                          type="text" 
                          required
                          value={prescriptionForm.medicine}
                          onChange={e => setPrescriptionForm({...prescriptionForm, medicine: e.target.value})}
                          placeholder="e.g. Surbex Z or Aerius 5mg"
                          className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Dosage Frequency</label>
                        <input 
                          type="text" 
                          required
                          value={prescriptionForm.dosage}
                          onChange={e => setPrescriptionForm({...prescriptionForm, dosage: e.target.value})}
                          placeholder="e.g. 1 tablet daily"
                          className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Duration Course</label>
                        <input 
                          type="text" 
                          value={prescriptionForm.duration}
                          onChange={e => setPrescriptionForm({...prescriptionForm, duration: e.target.value})}
                          placeholder="e.g. 15 Days"
                          className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Course Timing</label>
                        <input 
                          type="text" 
                          value={prescriptionForm.instructions}
                          onChange={e => setPrescriptionForm({...prescriptionForm, instructions: e.target.value})}
                          placeholder="e.g. After breakfast"
                          className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                    </div>

                    <button type="submit" className="px-6 py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow">
                      Authorize & Dispatch Prescription
                    </button>
                  </form>
                </div>
              )}

              {/* --- DOCTOR: AVAILABILITY SETTINGS --- */}
              {activeTab === "doctor-schedule" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiClock className="text-pink-500" /> Availability & Schedule Manager
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Configure your weekly consulting slots across branches.</p>
                  </div>

                  <div className="space-y-4 max-w-md">
                    {[
                      { day: "Monday", time: "10:00 AM – 2:00 PM", branch: "Gulberg Branch" },
                      { day: "Wednesday", time: "3:00 PM – 7:00 PM", branch: "DHA Branch" },
                      { day: "Friday", time: "10:00 AM – 1:00 PM", branch: "Gulberg Branch" },
                      { day: "Saturday", time: "4:00 PM – 8:00 PM", branch: "DHA Branch" },
                    ].map((slot, idx) => (
                      <div key={idx} className="border border-slate-100 rounded-2xl p-4 flex justify-between items-center bg-slate-50">
                        <div>
                          <p className="text-xs font-black text-slate-800">{slot.day}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{slot.time} ({slot.branch})</p>
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" /> Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- ADMIN: ANALYTICAL CENTER --- */}
              {activeTab === "analytics" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiTrendingUp className="text-pink-500" /> Administrative Analytical Center
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Real-time indicators mapping clinical operations.</p>
                  </div>

                  {/* Summary Metric Row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Total Operations Revenue", val: "₨ 890,200", change: "+14.5% this mo." },
                      { label: "Active Registrations", val: "2,400+", change: "+8% growth index" },
                      { label: "Satisfaction Index", val: "98.2%", change: "Based on 1.2k surveys" },
                    ].map((metric, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left font-semibold">
                        <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">{metric.label}</p>
                        <p className="text-lg font-extrabold text-slate-800">{metric.val}</p>
                        <p className="text-[9px] text-emerald-600 mt-0.5">{metric.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* SVG Analytic Chart */}
                  <div className="border border-slate-100 rounded-3xl p-5 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Revenue & Case Inflow Curve</p>
                    
                    {/* SVG Graphic charting layout */}
                    <div className="relative w-full h-44 bg-slate-50 rounded-xl overflow-hidden p-2 flex items-end">
                      <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                        <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                        
                        {/* Chart Line Path */}
                        <path d="M0,80 Q70,40 140,65 T280,30 T420,50 T500,10" fill="none" stroke="url(#chartGrad)" strokeWidth="3" strokeLinecap="round" />
                        
                        {/* Gradients */}
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#e91e8c" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* X axis labels */}
                      <div className="absolute bottom-1 left-0 right-0 px-2 flex justify-between text-[8px] font-black text-slate-400 uppercase">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent system logs */}
                  <div className="border border-slate-100 rounded-3xl p-5 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recent System Logs (Live Audit)</p>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto scrollbar-none text-xs">
                      {logs.map((log, idx) => (
                        <div key={idx} className="flex gap-3 text-slate-500 py-1.5 border-b last:border-0">
                          <span className="font-bold text-slate-400 flex-shrink-0">{log.time}</span>
                          <span className="font-semibold truncate">{log.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* --- ADMIN: DOCTOR REGISTRY CRUD --- */}
              {activeTab === "doctor-crud" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiUser className="text-pink-500" /> Specialist Doctor Registry
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage doctor profile status or add new consultants to the database.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Add Doctor Form */}
                    <div className="md:col-span-1 border border-slate-100 rounded-3xl p-5 bg-slate-50/50">
                      <h4 className="font-black text-slate-800 text-sm mb-4">Register Doctor</h4>
                      <form onSubmit={handleAddDoctor} className="space-y-3.5">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Full Name</label>
                          <input 
                            type="text" 
                            required
                            value={newDoctor.name}
                            onChange={e => setNewDoctor({...newDoctor, name: e.target.value})}
                            placeholder="e.g. Sarah Ahmed" 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Specialty Department</label>
                          <input 
                            type="text" 
                            required
                            value={newDoctor.specialty}
                            onChange={e => setNewDoctor({...newDoctor, specialty: e.target.value})}
                            placeholder="e.g. Skin & Dermatology" 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Fee (PKR)</label>
                          <input 
                            type="number" 
                            required
                            value={newDoctor.fee}
                            onChange={e => setNewDoctor({...newDoctor, fee: e.target.value})}
                            placeholder="e.g. 3000" 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer">
                          Add Specialist
                        </button>
                      </form>
                    </div>

                    {/* Doctors List */}
                    <div className="md:col-span-2 space-y-3 max-h-[350px] overflow-y-auto pr-1 scrollbar-none">
                      {doctorsList.map(doc => (
                        <div key={doc.id} className="border border-slate-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                          <div>
                            <h4 className="font-extrabold text-xs text-slate-800">{doc.name}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5">{doc.specialty} · Fee: {doc.fee}</p>
                            <span className="text-[9px] text-slate-400 mt-1 block">Branches: {doc.branch}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              doc.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                            }`}>
                              {doc.status}
                            </span>
                            <button 
                              onClick={() => handleToggleDocStatus(doc.id)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[9px] font-bold border-none cursor-pointer"
                            >
                              Toggle Status
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              )}

              {/* --- RECEPTIONIST: CLINIC CHECK-IN QUEUE --- */}
              {activeTab === "reception-queue" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiList className="text-pink-500" /> Patient Reception Desk
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Check in scheduled patients, track current waiting times, and manage active consultation rooms.</p>
                  </div>

                  <div className="space-y-3">
                    {appointments.filter(appt => appt.status !== "Cancelled").map(appt => (
                      <div key={appt.id} className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-800">{appt.patient}</h4>
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{appt.doctor}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Slot: {appt.date} at {appt.time} ({appt.branch})</p>
                        </div>
                        <div className="flex items-center gap-3.5 self-end sm:self-auto">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                            appt.status === "Confirmed" ? "bg-slate-100 text-slate-600" :
                            appt.status === "Checked In" ? "bg-amber-50 text-amber-700" :
                            appt.status === "In Room" ? "bg-pink-50 text-pink-700 animate-pulse" :
                            appt.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700"
                          }`}>
                            {appt.status}
                          </span>
                          
                          {appt.status !== "Completed" && (
                            <button 
                              onClick={() => handleCheckInToggle(appt.id, appt.status)}
                              className="px-3.5 py-1.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer transition-colors"
                            >
                              {appt.status === "Pending" && "Check In"}
                              {appt.status === "Confirmed" && "Check In"}
                              {appt.status === "Checked In" && "Send to Doctor"}
                              {appt.status === "In Room" && "Mark Completed"}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- RECEPTIONIST: INSURANCE VERIFIER --- */}
              {activeTab === "reception-billing" && (
                <div className="space-y-6 text-left flex-grow">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <MdOutlineHealthAndSafety className="text-pink-500" size={20} /> Insurance Eligibility & Verification
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Query active coverage policies from authorized insurance providers.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Verifier tool */}
                    <div className="md:col-span-5 border border-slate-100 rounded-3xl p-5 bg-slate-50/50 space-y-4">
                      <h4 className="font-black text-slate-800 text-sm">Query Coverage</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 block mb-1">Insurance Provider</label>
                          <select className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none">
                            <option>Allianz Insurance (Standard & Gold)</option>
                            <option>Jubilee General Health Care</option>
                            <option>EFU General Insurance</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 block mb-1">Policy Number</label>
                          <input type="text" placeholder="e.g. ALL-99023-B" className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none" />
                        </div>
                        <button 
                          onClick={() => alert("Verification successful! Policy is active. Co-pay limit set to 15%.")}
                          className="w-full py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer"
                        >
                          Query Live Panel
                        </button>
                      </div>
                    </div>

                    {/* Guidelines */}
                    <div className="md:col-span-7 border border-slate-100 rounded-3xl p-5 space-y-3 text-xs text-slate-500">
                      <h4 className="font-black text-slate-800 text-sm mb-1 text-left">Active Coverage Panels</h4>
                      <p className="leading-relaxed">Verify these default parameters during patient checkout audits:</p>
                      <ul className="space-y-2 leading-relaxed list-disc pl-4 text-left">
                        <li><strong>Allianz Gold:</strong> 85% coverage on laser therapies, diagnostic scans. Co-pay is 15%.</li>
                        <li><strong>Jubilee General:</strong> 100% coverage on root canal and basic dental cleaning.</li>
                        <li><strong>EFU Silver:</strong> 70% coverage on specialist consultations and diagnostic tests.</li>
                      </ul>
                      <div className="p-3 bg-amber-50 text-amber-700 rounded-xl flex items-start gap-2 border border-amber-100 font-semibold mt-4">
                        <FiAlertTriangle size={14} className="shrink-0 mt-0.5" />
                        <p className="text-[10px]">Unverified claims require manual coordinator pre-authorization before billing dispatch.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}
