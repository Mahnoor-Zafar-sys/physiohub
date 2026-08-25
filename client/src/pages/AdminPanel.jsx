import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiUsers, FiSearch, FiCalendar, FiClock, FiFileText, FiDollarSign, 
  FiCheckCircle, FiXCircle, FiTrendingUp, FiActivity, FiAward,
  FiPlus, FiTrash, FiShield, FiAlertTriangle, FiCheck, FiChevronRight, FiList, FiPackage, FiShoppingCart,
  FiMapPin, FiVideo, FiPhone, FiMessageCircle
} from "react-icons/fi";
import { FaUserMd, FaHospitalUser, FaUserCog, FaCreditCard, FaPrint } from "react-icons/fa";
import { MdOutlineHealthAndSafety, MdVerifiedUser } from "react-icons/md";
import Navbar from "../components/Navbar";
import SEOHead from "../components/SEOHead";
import { api } from "../services/api";

export default function AdminPanel() {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("vph_user_role") || "admin";
  const userName = localStorage.getItem("vph_user_name") || "Director Admin";
  const activeClinicId = localStorage.getItem("vph_clinic_id") || "1";
  const isSuperAdmin = (userRole === "admin" || userRole === "super_admin") && activeClinicId === "1";

  const [activeTab, setActiveTab] = useState(() => {
    if (userRole === "receptionist") return "reception-queue";
    return "analytics";
  });

  const [appointments, setAppointments] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);
  const [articles, setArticles] = useState([]);
  const [comments, setComments] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [appFilterType, setAppFilterType] = useState("all");
  const [appFilterStatus, setAppFilterStatus] = useState("all");
  const [selectedAppModal, setSelectedAppModal] = useState(null);
  const [logs, setLogs] = useState([
    { time: "10:30 AM", event: "Billing Invoice INV-5002 marked as paid." },
    { time: "11:00 AM", event: "Appointment scheduled with Dr. Omar Farooq." }
  ]);

  // Branches states
  const [branchesList, setBranchesList] = useState([]);
  const [newBranch, setNewBranch] = useState({ name: "", address: "", city: "" });
  const [editingBranch, setEditingBranch] = useState(null);
  const [apptFilter, setApptFilter] = useState("all");

  // Form states
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "", fee: "", branch: "Gulberg", image: "", experience: "", title: "", whatsapp_number: "", whatsapp_username: "" });
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [articleForm, setArticleForm] = useState({ title: "", excerpt: "", content: "", category: "General Health", image: "" });
  const [articleContentMode, setArticleContentMode] = useState("text"); // "text" | "html"
  const [articleHtmlContent, setArticleHtmlContent] = useState(""); // raw HTML string from uploaded .html file
  const [articleHtmlFileName, setArticleHtmlFileName] = useState("");
  
  // Shop states
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: "", category: "Rehabilitation", price: "", description: "", stock: "", image: "" });
  const [selectedOrderFilter, setSelectedOrderFilter] = useState("All");
  const [adminOrderNotes, setAdminOrderNotes] = useState({});

  const [adminNotes, setAdminNotes] = useState({});
  const [doctorSubTab, setDoctorSubTab] = useState("registry");
  const [actioningDoctor, setActioningDoctor] = useState(null);
  const [actionNote, setActionNote] = useState("");
  const [analyticsFilter, setAnalyticsFilter] = useState("month");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [managingDoctor, setManagingDoctor] = useState(null);
  const [mgmtForm, setMgmtForm] = useState(null);
  const [mgmtTab, setMgmtTab] = useState("general");
  const [selectedScreenshotModal, setSelectedScreenshotModal] = useState(null);
  const [selectedReportModal, setSelectedReportModal] = useState(null);
  const [loading, setLoading] = useState(false);

  // User Management states
  const [users, setUsers] = useState([]);
  const [userLogs, setUserLogs] = useState([]);
  const [searchUserQuery, setSearchUserQuery] = useState("");
  const [searchLogQuery, setSearchLogQuery] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUserForm, setAddUserForm] = useState({ name: "", email: "", password: "", role: "patient" });
  const [editUserForm, setEditUserForm] = useState({ name: "", email: "", role: "patient" });
  const [addUserError, setAddUserError] = useState("");
  const [editUserError, setEditUserError] = useState("");

  // SaaS Clinics states
  const [clinicsList, setClinicsList] = useState([]);
  const [showAddClinicModal, setShowAddClinicModal] = useState(false);
  const [addClinicForm, setAddClinicForm] = useState({ name: "", subdomain: "", address: "", adminName: "", adminEmail: "", adminPassword: "" });
  const [addClinicError, setAddClinicError] = useState("");

  // --- Website CMS States ---
  const [cmsSettings, setCmsSettings] = useState({
    clinic_phone: "",
    clinic_email: "",
    clinic_address: "",
    clinic_hours: "",
    ambulance_phone: "",
    why_us_headline: "",
    why_us_description: "",
    hero_title: "",
    hero_subtitle: "",
    about_title: "",
    about_description: "",
    about_ceo_vision: ""
  });
  const [cmsServices, setCmsServices] = useState([]);
  const [cmsFaqs, setCmsFaqs] = useState([]);
  const [cmsCareers, setCmsCareers] = useState([]);
  const [cmsGallery, setCmsGallery] = useState([]);
  const [cmsReviews, setCmsReviews] = useState([]);

  // CMS active sub-navigation view tab
  const [activeCmsSubTab, setActiveCmsSubTab] = useState("settings");

  // Settings form
  const [settingsForm, setSettingsForm] = useState({
    clinic_phone: "",
    clinic_email: "",
    clinic_address: "",
    clinic_hours: "",
    ambulance_phone: "",
    why_us_headline: "",
    why_us_description: "",
    hero_title: "",
    hero_subtitle: "",
    about_title: "",
    about_description: "",
    about_ceo_vision: ""
  });

  // Services form
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    id: "",
    category: "",
    tagline: "",
    shortDesc: "",
    overview: "",
    symptoms: "",
    benefits: "",
    treatments: "",
    procedure: "",
    duration: "",
    recovery: "",
    fee: "",
    popular: 0,
    type: ""
  });

  // FAQs form
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({
    id: "",
    category: "",
    question: "",
    answer: ""
  });

  // Careers form
  const [editingCareer, setEditingCareer] = useState(null);
  const [careerForm, setCareerForm] = useState({
    id: "",
    title: "",
    department: "",
    type: "",
    location: "",
    experience: "",
    salary: "",
    deadline: "",
    description: "",
    requirements: ""
  });

  // Gallery form
  const [editingGallery, setEditingGallery] = useState(null);
  const [galleryForm, setGalleryForm] = useState({
    id: "",
    src: "",
    category: "",
    title: "",
    description: "",
    span: "normal"
  });

  // Reviews form
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    id: "",
    name: "",
    avatar: "",
    rating: 5,
    service: "",
    doctor: "",
    date: "",
    text: "",
    helpful: 0,
    verified: 1,
    tag: "",
    source: "google",
    featured: 0
  });

  const addSystemLog = (event) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setLogs(prev => [{ time: now, event }, ...prev.slice(0, 10)]);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const appts = await api.getAppointments();
      setAppointments(appts);

      const docs = await api.getDoctors();
      setDoctorsList(docs);

      const arts = await api.getArticles();
      setArticles(arts);

      const comms = await api.getComments();
      setComments(comms);

      const prods = await api.getProducts();
      setProducts(prods);

      const ords = await api.getOrders();
      setOrders(ords);

      const branches = await api.getBranches();
      setBranchesList(branches || []);

      const fetchedUsers = await api.getUsers();
      setUsers(fetchedUsers);

      const fetchedApps = await api.getApplications();
      setApplications(fetchedApps || []);

      const fetchedLogs = await api.getUserLogs();
      setUserLogs(fetchedLogs);

      const cmsSettingsData = await api.getSettings();
      if (cmsSettingsData) {
        setCmsSettings(cmsSettingsData);
        setSettingsForm(cmsSettingsData);
      }
      const cmsServicesData = await api.getServices();
      if (cmsServicesData) setCmsServices(cmsServicesData);

      const cmsFaqsData = await api.getFaqs();
      if (cmsFaqsData) setCmsFaqs(cmsFaqsData);

      const cmsCareersData = await api.getCareers();
      if (cmsCareersData) setCmsCareers(cmsCareersData);

      const cmsGalleryData = await api.getGallery();
      if (cmsGalleryData) setCmsGallery(cmsGalleryData);

      if (isSuperAdmin) {
        const clinList = await api.getClinics();
        if (clinList) setClinicsList(clinList);
      }

      const cmsReviewsData = await api.getReviews();
      if (cmsReviewsData) setCmsReviews(cmsReviewsData);
    } catch (err) {
      console.error("Failed to load management dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    setAddUserError("");
    if (!addUserForm.name || !addUserForm.email || !addUserForm.password || !addUserForm.role) {
      setAddUserError("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.createUser(addUserForm);
      if (res && res.success) {
        setShowAddUserModal(false);
        setAddUserForm({ name: "", email: "", password: "", role: "patient" });
        alert("New user created successfully!");
        loadData();
      } else {
        setAddUserError(res?.error || "Failed to create user.");
      }
    } catch (err) {
      setAddUserError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    setEditUserError("");
    if (!editUserForm.name || !editUserForm.email || !editUserForm.role) {
      setEditUserError("All fields are required.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.updateUser({
        id: selectedUser.id,
        name: editUserForm.name,
        email: editUserForm.email,
        role: editUserForm.role
      });
      if (res && res.success) {
        setShowEditUserModal(false);
        setSelectedUser(null);
        alert("User profile updated successfully!");
        loadData();
      } else {
        setEditUserError(res?.error || "Failed to update user profile.");
      }
    } catch (err) {
      setEditUserError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClinicSubmit = async (e) => {
    e.preventDefault();
    setAddClinicError("");
    const { name, subdomain, address, adminName, adminEmail, adminPassword } = addClinicForm;
    if (!name || !subdomain || !adminName || !adminEmail || !adminPassword) {
      setAddClinicError("All fields except address are required.");
      return;
    }
    
    if (!/^[a-zA-Z0-9]+$/.test(subdomain)) {
      setAddClinicError("Subdomain must contain only letters and numbers (no spaces, dashes, or special characters).");
      return;
    }

    try {
      setLoading(true);
      const res = await api.createClinic(addClinicForm);
      if (res && res.success) {
        setShowAddClinicModal(false);
        setAddClinicForm({ name: "", subdomain: "", address: "", adminName: "", adminEmail: "", adminPassword: "" });
        alert("New clinic registered and administrator provisioned successfully!");
        loadData();
      } else {
        setAddClinicError(res?.error || "Failed to register clinic.");
      }
    } catch (err) {
      setAddClinicError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleClinicStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    const msg = `Are you sure you want to change the status of this clinic to ${nextStatus}? All active users in this clinic will be ${nextStatus === "Suspended" ? "locked out" : "granted access"}.`;
    if (!window.confirm(msg)) return;

    try {
      setLoading(true);
      const res = await api.toggleClinicStatus(id, nextStatus);
      if (res && res.success) {
        alert(`Clinic status successfully updated to ${nextStatus}!`);
        loadData();
      } else {
        alert(res?.error || "Failed to update clinic status.");
      }
    } catch (err) {
      alert(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id, email) => {
    if (!window.confirm(`Are you absolutely sure you want to revoke system access for user ${email}?`)) {
      return;
    }
    try {
      setLoading(true);
      const res = await api.deleteUser(id);
      if (res && res.success) {
        alert(`User ${email} deleted successfully.`);
        loadData();
      } else {
        alert(res?.error || "Failed to delete user.");
      }
    } catch (err) {
      alert(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialty) return;
    try {
      setLoading(true);
      const docName = newDoctor.name.startsWith("Dr.") ? newDoctor.name : `Dr. ${newDoctor.name}`;
      const feeFormatted = newDoctor.fee.toString().startsWith("₨") ? newDoctor.fee : `₨ ${newDoctor.fee || "2,500"}`;
      
      if (editingDoctor) {
        const success = await api.updateDoctor(editingDoctor.id, {
          name: docName,
          specialty: newDoctor.specialty,
          fee: feeFormatted,
          branch: newDoctor.branch,
          image: newDoctor.image,
          experience: newDoctor.experience,
          title: newDoctor.title,
          whatsapp_number: newDoctor.whatsapp_number,
          whatsapp_username: newDoctor.whatsapp_username
        });
        if (success) {
          addSystemLog(`Doctor profile updated for ${docName}.`);
          alert("Doctor profile updated successfully!");
          setEditingDoctor(null);
          setNewDoctor({ name: "", specialty: "", fee: "", branch: "Gulberg", image: "", experience: "", title: "", whatsapp_number: "", whatsapp_username: "" });
          loadData();
        }
      } else {
        const doc = await api.createDoctor({
          name: docName,
          specialty: newDoctor.specialty,
          fee: feeFormatted,
          branch: newDoctor.branch,
          image: newDoctor.image,
          experience: newDoctor.experience,
          title: newDoctor.title,
          whatsapp_number: newDoctor.whatsapp_number,
          whatsapp_username: newDoctor.whatsapp_username
        });
        if (doc) {
          addSystemLog(`New specialist ${docName} registered under ${newDoctor.specialty}.`);
          setNewDoctor({ name: "", specialty: "", fee: "", branch: "Gulberg", image: "", experience: "", title: "", whatsapp_number: "", whatsapp_username: "" });
          alert("New specialist added to registry!");
          loadData();
        }
      }
    } catch (err) {
      alert("Error saving doctor.");
    } finally {
      setLoading(false);
    }
  };
  const handleSaveBranch = async (e) => {
    e.preventDefault();
    if (!newBranch.name) return;
    setLoading(true);
    try {
      if (editingBranch) {
        const success = await api.updateBranch(editingBranch.id, newBranch);
        if (success) {
          addSystemLog(`Branch ${newBranch.name} updated.`);
          alert("Branch updated successfully!");
          setEditingBranch(null);
          setNewBranch({ name: "", address: "", city: "" });
          loadData();
        }
      } else {
        const created = await api.createBranch(newBranch);
        if (created) {
          addSystemLog(`New branch ${newBranch.name} added.`);
          alert("New branch registered successfully!");
          setNewBranch({ name: "", address: "", city: "" });
          loadData();
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error saving branch.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBranch = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    setLoading(true);
    try {
      const success = await api.deleteBranch(id);
      if (success) {
        addSystemLog(`Branch ID ${id} deleted.`);
        alert("Branch deleted successfully!");
        loadData();
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting branch.");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor profile?")) return;
    try {
      setLoading(true);
      const success = await api.deleteDoctor(id);
      if (success) {
        addSystemLog(`Doctor ID ${id} deleted.`);
        alert("Doctor deleted successfully!");
        loadData();
      }
    } catch (err) {
      alert("Error deleting doctor.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveManagedDoctor = async (e) => {
    e.preventDefault();
    if (!mgmtForm) return;
    setLoading(true);
    try {
      // Ensure numeric fee
      const cleanFee = String(mgmtForm.fee).replace("PKR", "").replace("₨", "").replace(/,/g, "").trim();
      const feeFormatted = cleanFee ? `₨ ${parseInt(cleanFee).toLocaleString()}` : "₨ 2,500";

      const success = await api.updateDoctor(mgmtForm.id, {
        ...mgmtForm,
        fee: feeFormatted
      });

      if (success) {
        addSystemLog(`Doctor registry settings updated for ${mgmtForm.name}.`);
        loadData();
        setManagingDoctor(null);
        setMgmtForm(null);
        alert("Doctor settings updated successfully!");
      } else {
        alert("Failed to update doctor settings.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating doctor: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDocStatus = async (id, currentStatus) => {
    try {
      setLoading(true);
      const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
      const success = await api.toggleDoctorStatus(id, nextStatus);
      if (success) {
        addSystemLog(`Doctor registry status modified for ID ${id}.`);
        loadData();
      }
    } catch (err) {
      alert("Error toggling doctor status.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDoctor(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleApproveDoctor = async (id, name) => {
    if (!window.confirm(`Are you sure you want to approve and activate the doctor profile for ${name}?`)) return;
    try {
      setLoading(true);
      const success = await api.toggleDoctorStatus(id, "Active");
      if (success) {
        addSystemLog(`Doctor application approved and activated for ${name}.`);
        alert("Doctor approved successfully!");
        loadData();
      }
    } catch (err) {
      alert("Error approving doctor.");
    } finally {
      setLoading(false);
    }
  };

  const handleActionSubmit = async () => {
    if (!actioningDoctor || !actionNote.trim()) return;
    try {
      setLoading(true);
      const { id, nextStatus } = actioningDoctor;
      const success = await api.toggleDoctorStatus(id, nextStatus, actionNote);
      if (success) {
        addSystemLog(`Doctor application status updated to ${nextStatus} for ID ${id}. Feedback: ${actionNote}`);
        alert(`Application status updated to ${nextStatus}.`);
        setActioningDoctor(null);
        setActionNote("");
        loadData();
      }
    } catch (err) {
      alert("Error updating doctor application status.");
    } finally {
      setLoading(false);
    }
  };

  const renderDocAttachmentLink = (label, fileData, fileName) => {
    if (!fileData) return <span className="text-[10px] text-slate-400">Not Uploaded</span>;
    const fileUrl = fileData.startsWith("data:") || fileData.startsWith("http") ? fileData : `http://localhost:5000${fileData}`;
    return (
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-500 font-semibold">{label}:</span>
        <button 
          type="button"
          onClick={() => setSelectedReportModal({ report: fileUrl, name: fileName || label })}
          className="px-2 py-1 bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200/50 rounded-lg text-[9px] font-bold cursor-pointer transition-all flex items-center gap-1"
        >
          👁️ Preview
        </button>
        <a 
          href={fileUrl} 
          download={fileName || label}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[9px] font-bold cursor-pointer transition-all flex items-center gap-1"
          style={{ textDecoration: 'none' }}
        >
          📥 Download
        </a>
      </div>
    );
  };

  const handleProcessPayment = async (id, status) => {
    const note = adminNotes[id] || "";
    try {
      setLoading(true);
      const success = await api.approvePayment(id, status, note);
      if (success) {
        addSystemLog(`Payment for ${id} was marked as ${status} with note: "${note || 'None'}".`);
        alert(`Payment status successfully set to ${status}!`);
        loadData();
      }
    } catch (err) {
      alert("Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleArticleSubmit = async (e) => {
    e.preventDefault();
    if (!articleForm.title) return;
    if (articleContentMode === "text" && !articleForm.content) return;
    if (articleContentMode === "html" && !articleHtmlContent) {
      alert("Please upload an HTML file before publishing.");
      return;
    }
    try {
      const payload = {
        title: articleForm.title,
        excerpt: articleForm.excerpt || articleForm.content.slice(0, 100) + "...",
        content: articleContentMode === "html" ? "[HTML Content]" : articleForm.content,
        html_content: articleContentMode === "html" ? articleHtmlContent : null,
        category: articleForm.category,
        author: user?.name || user?.email || "Director Admin",
        image: articleForm.image
      };
      await api.createArticle(payload);
      setArticleForm({ title: "", excerpt: "", content: "", category: "General Health", image: "" });
      setArticleHtmlContent("");
      setArticleHtmlFileName("");
      setArticleContentMode("text");
      alert("Clinical article published successfully!");
      loadData();
    } catch (err) {
      alert("Error publishing article.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      setLoading(true);
      const success = await api.deleteArticle(id);
      if (success) {
        addSystemLog(`Clinical Article ID ${id} removed.`);
        loadData();
      }
    } catch (err) {
      alert("Error deleting article.");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentStatus = async (id, status) => {
    try {
      setLoading(true);
      const success = await api.updateCommentStatus(id, status);
      if (success) {
        addSystemLog(`Comment ID ${id} moderation status set to ${status}.`);
        loadData();
      }
    } catch (err) {
      alert("Error updating comment status.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      setLoading(true);
      const success = await api.deleteComment(id);
      if (success) {
        addSystemLog(`Comment ID ${id} removed.`);
        loadData();
      }
    } catch (err) {
      alert("Error deleting comment.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckInToggle = async (id, currentStatus) => {
    let nextStatus = "Checked In";
    if (currentStatus === "Pending") nextStatus = "Checked In";
    else if (currentStatus === "Confirmed") nextStatus = "Checked In";
    else if (currentStatus === "Checked In") nextStatus = "In Room";
    else if (currentStatus === "In Room") nextStatus = "Completed";

    try {
      setLoading(true);
      const success = await api.updateAppointmentStatus(id, nextStatus);
      if (success) {
        addSystemLog(`Patient queue status for ${id} updated to ${nextStatus}.`);
        loadData();
      }
    } catch (err) {
      alert("Error checking in patient.");
    } finally {
      setLoading(false);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;
    try {
      setLoading(true);
      if (editingProduct) {
        const success = await api.updateProduct({
          id: editingProduct.id,
          ...productForm
        });
        if (success) {
          addSystemLog(`Product ${productForm.name} updated successfully.`);
          alert("Product updated!");
          cancelProductEdit();
          loadData();
        }
      } else {
        const prod = await api.createProduct(productForm);
        if (prod) {
          addSystemLog(`New product ${productForm.name} added to inventory.`);
          alert("Product added successfully!");
          setProductForm({ name: "", category: "Rehabilitation", price: "", description: "", stock: "", image: "" });
          loadData();
        }
      }
    } catch (err) {
      alert("Error saving product.");
    } finally {
      setLoading(false);
    }
  };

  const startProductEdit = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      description: prod.description,
      stock: prod.stock,
      image: prod.image
    });
  };

  const cancelProductEdit = () => {
    setEditingProduct(null);
    setProductForm({ name: "", category: "Rehabilitation", price: "", description: "", stock: "", image: "" });
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      const success = await api.deleteProduct(id);
      if (success) {
        addSystemLog(`Product ID ${id} deleted.`);
        loadData();
      }
    } catch (err) {
      alert("Error deleting product.");
    } finally {
      setLoading(false);
    }
  };

  const handleProcessOrderPayment = async (id, status) => {
    const note = adminOrderNotes[id] || "";
    try {
      setLoading(true);
      const success = await api.approveOrderPayment(id, status, note);
      if (success) {
        addSystemLog(`Order ${id} payment marked as ${status} with note "${note}".`);
        alert(`Order payment successfully set to ${status}!`);
        loadData();
      }
    } catch (err) {
      alert("Error processing order payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderShipping = async (id, status) => {
    try {
      setLoading(true);
      const success = await api.updateOrderStatus(id, status);
      if (success) {
        addSystemLog(`Order ${id} shipping status changed to ${status}.`);
        loadData();
      }
    } catch (err) {
      alert("Error updating order shipping status.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAppStatus = async (id, status) => {
    try {
      setLoading(true);
      const success = await api.updateApplicationStatus(id, status);
      if (success) {
        addSystemLog(`Application ID ${id} status set to ${status}.`);
        loadData();
      }
    } catch (err) {
      alert("Error updating application status.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApp = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application record?")) return;
    try {
      setLoading(true);
      const success = await api.deleteApplication(id);
      if (success) {
        addSystemLog(`Application ID ${id} deleted.`);
        loadData();
      }
    } catch (err) {
      alert("Error deleting application.");
    } finally {
      setLoading(false);
    }
  };

  // --- Website CMS Handlers ---
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updated = await api.updateSettings(settingsForm);
      if (updated) {
        setCmsSettings(updated);
        addSystemLog("Clinic Settings registry updated.");
        alert("Clinic Settings updated successfully!");
      }
    } catch (err) {
      alert("Error updating clinic settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSave = {
        ...serviceForm,
        id: serviceForm.id ? serviceForm.id.toLowerCase() : `srv-${Date.now().toString().slice(-4)}`,
        popular: parseInt(serviceForm.popular),
        symptoms: typeof serviceForm.symptoms === "string" ? JSON.stringify(serviceForm.symptoms.split(",").map(s => s.trim())) : JSON.stringify(serviceForm.symptoms),
        benefits: typeof serviceForm.benefits === "string" ? JSON.stringify(serviceForm.benefits.split(",").map(s => s.trim())) : JSON.stringify(serviceForm.benefits),
        treatments: typeof serviceForm.treatments === "string" ? JSON.stringify(serviceForm.treatments.split(",").map(s => s.trim())) : JSON.stringify(serviceForm.treatments)
      };
      const saved = await api.createService(dataToSave);
      if (saved) {
        addSystemLog(`Service "${serviceForm.category}" saved successfully.`);
        alert("Service saved!");
        setEditingService(null);
        setServiceForm({
          id: "", category: "", tagline: "", shortDesc: "", overview: "",
          symptoms: "", benefits: "", treatments: "", procedure: "",
          duration: "", recovery: "", fee: "", popular: 0, type: ""
        });
        loadData();
      }
    } catch (err) {
      alert("Error saving service.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      setLoading(true);
      const success = await api.deleteService(id);
      if (success) {
        addSystemLog(`Service ID ${id} deleted.`);
        loadData();
      }
    } catch (err) {
      alert("Error deleting service.");
    } finally {
      setLoading(false);
    }
  };

  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSave = {
        ...faqForm,
        id: faqForm.id ? parseInt(faqForm.id) : undefined
      };
      const saved = await api.createFaq(dataToSave);
      if (saved) {
        addSystemLog(`FAQ Question saved successfully.`);
        alert("FAQ saved!");
        setEditingFaq(null);
        setFaqForm({ id: "", category: "", question: "", answer: "" });
        loadData();
      }
    } catch (err) {
      alert("Error saving FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      setLoading(true);
      const success = await api.deleteFaq(id);
      if (success) {
        addSystemLog(`FAQ ID ${id} deleted.`);
        loadData();
      }
    } catch (err) {
      alert("Error deleting FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSave = {
        ...careerForm,
        id: careerForm.id ? parseInt(careerForm.id) : undefined,
        requirements: typeof careerForm.requirements === "string" ? JSON.stringify(careerForm.requirements.split(",").map(r => r.trim())) : JSON.stringify(careerForm.requirements)
      };
      const saved = await api.createCareerJob(dataToSave);
      if (saved) {
        addSystemLog(`Job Listing "${careerForm.title}" saved successfully.`);
        alert("Job listing saved!");
        setEditingCareer(null);
        setCareerForm({
          id: "", title: "", department: "", type: "", location: "",
          experience: "", salary: "", deadline: "", description: "", requirements: ""
        });
        loadData();
      }
    } catch (err) {
      alert("Error saving job listing.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCareer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;
    try {
      setLoading(true);
      const success = await api.deleteCareerJob(id);
      if (success) {
        addSystemLog(`Job ID ${id} deleted.`);
        loadData();
      }
    } catch (err) {
      alert("Error deleting job listing.");
    } finally {
      setLoading(false);
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSave = {
        ...galleryForm,
        id: galleryForm.id ? parseInt(galleryForm.id) : undefined
      };
      const saved = await api.createGalleryItem(dataToSave);
      if (saved) {
        addSystemLog(`Gallery item saved successfully.`);
        alert("Gallery item saved!");
        setEditingGallery(null);
        setGalleryForm({ id: "", src: "", category: "", title: "", description: "", span: "normal" });
        loadData();
      }
    } catch (err) {
      alert("Error saving gallery item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) return;
    try {
      setLoading(true);
      const success = await api.deleteGalleryItem(id);
      if (success) {
        addSystemLog(`Gallery Item ID ${id} deleted.`);
        loadData();
      }
    } catch (err) {
      alert("Error deleting gallery item.");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSave = {
        ...reviewForm,
        id: reviewForm.id ? parseInt(reviewForm.id) : undefined,
        rating: parseInt(reviewForm.rating),
        verified: parseInt(reviewForm.verified),
        featured: parseInt(reviewForm.featured)
      };
      const saved = await api.createReview(dataToSave);
      if (saved) {
        addSystemLog(`Review by "${reviewForm.name}" saved successfully.`);
        alert("Review saved!");
        setEditingReview(null);
        setReviewForm({
          id: "", name: "", avatar: "", rating: 5, service: "", doctor: "",
          date: "", text: "", helpful: 0, verified: 1, tag: "", source: "google", featured: 0
        });
        loadData();
      }
    } catch (err) {
      alert("Error saving review.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      setLoading(true);
      const success = await api.deleteReview(id);
      if (success) {
        addSystemLog(`Review ID ${id} deleted.`);
        loadData();
      }
    } catch (err) {
      alert("Error deleting review.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(ord => {
    if (selectedOrderFilter === "All") return true;
    if (selectedOrderFilter === "Pending Verification") return ord.payment_status === "Pending Verification";
    return ord.order_status === selectedOrderFilter;
  });

  const checkInAppointments = appointments.filter(appt => {
    if (appt.status === "Cancelled") return false;
    if (apptFilter === "in-person") return appt.type !== "Online Consultation";
    if (apptFilter === "online") return appt.type === "Online Consultation";
    return true;
  });

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
      <SEOHead 
        title="Administrative Secure Portal & Reception Terminal | Physiohub"
        description="Executive administration, reception queue management, staff management and clinic diagnostics dashboard."
        noindex={true}
      />
      <Navbar />

      <div className="flex-grow pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Sidebar */}
          <div className="lg:col-span-3 bg-white/70 backdrop-blur-md rounded-3xl border border-white/50 shadow-md p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="pb-5 border-b border-slate-100 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-extrabold shadow-inner">
                  {userRole === "admin" ? <FaUserCog /> : <FaHospitalUser />}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 leading-none">{userName}</h4>
                  <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest block mt-1">
                    {userRole === "receptionist" ? "Staff Desk" : `${userRole} Portal`}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                {/* Admin Tabs */}
                {userRole === "admin" && [
                  { id: "analytics", label: "Analytical Center", icon: FiTrendingUp },
                  { id: "payments", label: "Payment Verification", icon: FaCreditCard },
                  { id: "doctor-crud", label: "Doctor Registry", icon: FaUserMd },
                  { id: "branches", label: "Manage Branches", icon: FiMapPin },
                  { id: "users", label: "User Management", icon: FiUsers },
                  { id: "memberships-internships", label: "Memberships & Internships", icon: FiAward },
                  ...(isSuperAdmin ? [{ id: "saas-clinics", label: "Super Admin Center", icon: FiShield }] : []),
                  { id: "articles", label: "Clinical Articles", icon: FiFileText },
                  { id: "comments", label: "Comments Moderation", icon: FiAlertTriangle },
                  { id: "shop-products", label: "Shop Inventory", icon: FiPackage },
                  { id: "shop-orders", label: "Shop Orders", icon: FiShoppingCart },
                  { id: "website-cms", label: "Website CMS", icon: FiActivity },
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

            <button 
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="w-full py-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 rounded-xl text-xs font-bold border-none transition-colors mt-6 cursor-pointer"
            >
              Sign Out
            </button>
          </div>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-9 bg-white/80 backdrop-blur-md rounded-3xl border border-white/50 shadow-md p-6 sm:p-8 flex flex-col relative min-h-[500px]">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-3xl">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-pink-500 rounded-full animate-spin" />
              </div>
            )}

            {/* ANALYTICS */}
            {activeTab === "analytics" && (() => {
              // Helper to parse dates
              const parseRecordDate = (dateVal) => {
                if (!dateVal) return new Date();
                if (dateVal instanceof Date) return dateVal;
                
                const dateStr = String(dateVal);
                if (dateStr.includes("T")) {
                  const parsed = new Date(dateStr);
                  if (!isNaN(parsed.getTime())) return parsed;
                }
                
                if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
                  const parsed = new Date(dateStr);
                  if (!isNaN(parsed.getTime())) return parsed;
                }
                
                const cleaned = dateStr.replace(/,/g, "").trim();
                const parts = cleaned.split(" ");
                if (parts.length === 3) {
                  const day = parseInt(parts[0]);
                  const monthName = parts[1];
                  const year = parseInt(parts[2]);
                  const months = {
                    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
                    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
                    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
                    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
                  };
                  const month = months[monthName] !== undefined ? months[monthName] : 0;
                  const parsed = new Date(year, month, day);
                  if (!isNaN(parsed.getTime())) return parsed;
                }

                const fallback = new Date(dateStr);
                return isNaN(fallback.getTime()) ? new Date() : fallback;
              };

              // Get date range limits
              const now = new Date();
              let startDate = new Date();
              let isCustom = false;

              if (analyticsFilter === "day") {
                startDate.setDate(now.getDate() - 6); // Last 7 days
              } else if (analyticsFilter === "week") {
                startDate.setDate(now.getDate() - 28); // Last 4 weeks
              } else if (analyticsFilter === "month") {
                startDate.setMonth(now.getMonth() - 5); // Last 6 months
              } else if (analyticsFilter === "custom") {
                isCustom = true;
              }

              const start = isCustom && customStartDate ? new Date(customStartDate) : startDate;
              const end = isCustom && customEndDate ? new Date(customEndDate) : now;
              
              if (!isCustom) {
                start.setHours(0, 0, 0, 0);
              }
              end.setHours(23, 59, 59, 999);

              // Filter paid appointments within the date range
              const filteredAppts = appointments.filter(a => {
                if (a.payment_status !== "Paid" && a.status !== "Confirmed") return false;
                const rDate = parseRecordDate(a.date);
                return rDate >= start && rDate <= end;
              });

              // Filter paid orders within the date range
              const filteredOrders = orders.filter(o => {
                if (o.payment_status !== "Paid") return false;
                const rDate = parseRecordDate(o.created_at || o.date);
                return rDate >= start && rDate <= end;
              });

              // Calculate revenue values
              const shopRevenue = filteredOrders.reduce((sum, o) => sum + o.total_amount, 0);

              const clinicRevenue = filteredAppts.reduce((sum, a) => {
                const doc = doctorsList.find(d => d.name === a.doctor);
                let feeNum = 2500;
                if (doc && doc.fee) {
                  const parsed = parseInt(doc.fee.replace(/[^\d]/g, ""));
                  if (!isNaN(parsed)) feeNum = parsed;
                }
                return sum + feeNum;
              }, 0);

              const revenueVal = shopRevenue + clinicRevenue;

              const uniquePatients = new Set([
                ...appointments.map(a => a.patient || a.patient_name || ""),
                ...orders.map(o => o.patient_name || "")
              ].filter(name => name.trim() !== ""));
              const registrationsVal = uniquePatients.size + doctorsList.length;

              const reviewsCount = cmsReviews.length;
              const avgStars = reviewsCount > 0 
                ? (cmsReviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount).toFixed(1)
                : "4.9";
              const satisfactionVal = reviewsCount > 0 
                ? ((cmsReviews.reduce((sum, r) => sum + r.rating, 0) / (reviewsCount * 5)) * 100).toFixed(1) + "%"
                : "98.2%";

              // Dynamic data aggregation for line-area trend chart (exactly 6 labels/segments)
              const dataPoints = [];
              const segmentCount = 6;
              const rangeDiffMs = end.getTime() - start.getTime();
              const segmentMs = rangeDiffMs / (segmentCount - 1);

              for (let i = 0; i < segmentCount; i++) {
                const segTime = start.getTime() + i * segmentMs;
                const segStart = new Date(segTime - (i === 0 ? 0 : segmentMs / 2));
                const segEnd = new Date(segTime + (i === segmentCount - 1 ? 0 : segmentMs / 2));
                
                // Aggregate segment revenue
                const segApptRev = filteredAppts
                  .filter(a => {
                    const rDate = parseRecordDate(a.date);
                    return rDate >= segStart && rDate <= segEnd;
                  })
                  .reduce((sum, a) => {
                    const doc = doctorsList.find(d => d.name === a.doctor);
                    let feeNum = 2500;
                    if (doc && doc.fee) {
                      const parsed = parseInt(doc.fee.replace(/[^\d]/g, ""));
                      if (!isNaN(parsed)) feeNum = parsed;
                    }
                    return sum + feeNum;
                  }, 0);

                const segOrderRev = filteredOrders
                  .filter(o => {
                    const rDate = parseRecordDate(o.created_at || o.date);
                    return rDate >= segStart && rDate <= segEnd;
                  })
                  .reduce((sum, o) => sum + o.total_amount, 0);

                const segRevenue = segApptRev + segOrderRev;

                // Label format
                const dObj = new Date(segTime);
                let label = "";
                if (analyticsFilter === "day") {
                  label = dObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                } else if (analyticsFilter === "week") {
                  label = `Wk ${i + 1}`;
                } else if (analyticsFilter === "month") {
                  label = dObj.toLocaleDateString("en-US", { month: "short" });
                } else {
                  label = dObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                }

                dataPoints.push({ label, revenue: segRevenue });
              }

              // Compute Y-coordinates for SVG
              const maxRevenue = Math.max(...dataPoints.map(d => d.revenue), 1000);
              const svgPoints = dataPoints.map((dp, idx) => {
                const x = (idx / (segmentCount - 1)) * 460 + 20;
                const y = 130 - (dp.revenue / maxRevenue) * 100;
                return { x, y, label: dp.label, revenue: dp.revenue };
              });

              // Generate path strings
              const linePath = svgPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");
              const fillPath = `${linePath} L ${svgPoints[segmentCount-1].x} 130 L ${svgPoints[0].x} 130 Z`;

              // Aggregate branch comparisons (Blue Area, DHA Phase 2, Online Consultations, Shop Sales)
              const branchRevenue = {
                BlueArea: 0,
                DHAPhase2: 0,
                Online: 0,
                ShopSales: shopRevenue
              };

              filteredAppts.forEach(a => {
                const doc = doctorsList.find(d => d.name === a.doctor);
                let feeNum = 2500;
                if (doc && doc.fee) {
                  const parsed = parseInt(doc.fee.replace(/[^\d]/g, ""));
                  if (!isNaN(parsed)) feeNum = parsed;
                }
                
                const bStr = String(a.branch || "").toLowerCase();
                if (bStr.includes("blue area") || bStr.includes("gulberg")) {
                  branchRevenue.BlueArea += feeNum;
                } else if (bStr.includes("dha")) {
                  branchRevenue.DHAPhase2 += feeNum;
                } else if (bStr.includes("online") || bStr.includes("virtual")) {
                  branchRevenue.Online += feeNum;
                } else {
                  branchRevenue.BlueArea += feeNum;
                }
              });

              const branchData = [
                { name: "Blue Area Branch", revenue: branchRevenue.BlueArea, color: "#0ea5e9" },
                { name: "DHA Phase 2 Branch", revenue: branchRevenue.DHAPhase2, color: "#a855f7" },
                { name: "Online Clinic", revenue: branchRevenue.Online, color: "#10b981" },
                { name: "Shop Sales", revenue: branchRevenue.ShopSales, color: "#ec4899" }
              ];

              const maxBranchRevenue = Math.max(...branchData.map(b => b.revenue), 1000);

              return (
                <div className="space-y-6 text-left flex-grow">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <FiTrendingUp className="text-pink-500" /> Administrative Analytical Center
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Real-time indicators mapping clinical operations.</p>
                    </div>

                    {/* Duration Switches */}
                    <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
                      {["day", "week", "month", "custom"].map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setAnalyticsFilter(filter)}
                          className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border-none cursor-pointer ${
                            analyticsFilter === filter 
                              ? "bg-white text-slate-900 shadow-sm" 
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Duration Date Inputs */}
                  {analyticsFilter === "custom" && (
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 flex-wrap text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-500">From:</span>
                        <input 
                          type="date" 
                          value={customStartDate}
                          onChange={e => setCustomStartDate(e.target.value)}
                          className="border border-slate-200 bg-white rounded-xl p-2 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-500">To:</span>
                        <input 
                          type="date" 
                          value={customEndDate}
                          onChange={e => setCustomEndDate(e.target.value)}
                          className="border border-slate-200 bg-white rounded-xl p-2 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Total Operations Revenue", val: `₨ ${revenueVal.toLocaleString()}`, change: "Real-time billing index" },
                      { label: "Active Registrations", val: `${registrationsVal.toLocaleString()} Accounts`, change: "Patients & Specialists" },
                      { label: "Satisfaction Index", val: satisfactionVal, change: `Average rating: ${avgStars} / 5.0` },
                    ].map((metric, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 font-semibold shadow-sm">
                        <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">{metric.label}</p>
                        <p className="text-lg font-extrabold text-slate-800">{metric.val}</p>
                        <p className="text-[9px] text-emerald-600 mt-0.5">{metric.change}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Line Chart */}
                    <div className="lg:col-span-2 border border-slate-100 rounded-3xl p-5 space-y-4 bg-white/40 backdrop-blur-sm shadow-sm flex flex-col justify-between">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Operations Revenue Flow</p>
                        <span className="text-xs font-bold text-slate-800 bg-pink-50 text-pink-600 px-2 py-0.5 rounded-lg">Peak: ₨ {maxRevenue.toLocaleString()}</span>
                      </div>
                      <div className="relative w-full h-48 bg-slate-50/50 rounded-2xl overflow-hidden p-3 flex flex-col justify-between border border-slate-100/50">
                        <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#e91e8c" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#0ea5e9" />
                              <stop offset="100%" stopColor="#e91e8c" />
                            </linearGradient>
                          </defs>
                          {/* Grid Lines */}
                          <line x1="20" y1="30" x2="480" y2="30" stroke="#e2e8f0" strokeDasharray="3" strokeWidth="1" />
                          <line x1="20" y1="80" x2="480" y2="80" stroke="#e2e8f0" strokeDasharray="3" strokeWidth="1" />
                          <line x1="20" y1="130" x2="480" y2="130" stroke="#cbd5e1" strokeWidth="1.2" />

                          {/* Gradient Fill Path */}
                          <path d={fillPath} fill="url(#chartGrad)" />

                          {/* Smooth Line Path */}
                          <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                          {/* Interactive data dots */}
                          {svgPoints.map((p, idx) => (
                            <g key={idx} className="group cursor-pointer">
                              <circle cx={p.x} cy={p.y} r="5" fill="#ffffff" stroke="url(#lineGrad)" strokeWidth="2.5" />
                              {/* Dynamic Text Tooltip visible on hover */}
                              <text x={p.x} y={p.y - 12} textAnchor="middle" className="text-[9px] font-black fill-slate-800 bg-white px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ transition: 'opacity 0.2s' }}>
                                ₨ {p.revenue.toLocaleString()}
                              </text>
                            </g>
                          ))}
                        </svg>
                        <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase px-2 pt-1 border-t border-slate-100/50">
                          {dataPoints.map((dp, idx) => (
                            <span key={idx}>{dp.label}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="lg:col-span-1 border border-slate-100 rounded-3xl p-5 space-y-4 bg-white/40 backdrop-blur-sm shadow-sm flex flex-col justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Branch Earnings Comparison</p>
                      <div className="relative w-full h-48 bg-slate-50/50 rounded-2xl overflow-hidden p-3 flex flex-col justify-between border border-slate-100/50">
                        <div className="flex-grow flex items-end justify-around pb-2">
                          {branchData.map((b, idx) => {
                            const percent = (b.revenue / maxBranchRevenue) * 100;
                            const barHeight = Math.max((percent / 100) * 95, 4); // scaled to fit 95px container
                            return (
                              <div key={idx} className="flex flex-col items-center group w-1/4 max-w-[45px]">
                                <span className="text-[8px] font-black text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                                  ₨ {b.revenue >= 1000 ? `${(b.revenue/1000).toFixed(0)}k` : b.revenue}
                                </span>
                                <div 
                                  className="w-full rounded-t-lg transition-all duration-500 hover:brightness-95 shadow-xs" 
                                  style={{ 
                                    height: `${barHeight}px`,
                                    background: `linear-gradient(to top, ${b.color}, ${b.color}cc)`
                                  }} 
                                />
                                <span className="text-[8px] font-bold text-slate-400 uppercase mt-2 text-center truncate w-full" title={b.name}>
                                  {b.name.split(" ")[0]}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-100 rounded-3xl p-5 space-y-3 bg-white/30">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recent System Logs (Live Audit)</p>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto scrollbar-none text-xs">
                      {logs.map((log, idx) => (
                        <div key={idx} className="flex gap-3 text-slate-550 py-1.5 border-b last:border-0">
                          <span className="font-bold text-slate-400 flex-shrink-0">{log.time}</span>
                          <span className="font-semibold text-slate-600 truncate">{log.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* PAYMENT VERIFICATION */}
            {activeTab === "payments" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FaCreditCard className="text-pink-500" /> Payment Verification Desk
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Approve patient checkouts and route bookings to the respective specialist queues.</p>
                </div>

                <div className="space-y-3">
                  {appointments.filter(appt => appt.payment_status === "Pending Verification").length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs">
                      No payments awaiting verification.
                    </div>
                  ) : (
                    appointments.filter(appt => appt.payment_status === "Pending Verification").map(appt => (
                      <div key={appt.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex flex-col gap-4 shadow-sm text-left">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-black uppercase text-pink-500 bg-pink-50 px-2 py-0.5 rounded">{appt.id}</span>
                              <h4 className="font-extrabold text-sm text-slate-800">{appt.patient}</h4>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 font-semibold">Consultation with {appt.doctor} · Branch: {appt.branch}</p>
                            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Slot: {appt.date} at {appt.time} ({appt.type})</span>
                          </div>
                          <div className="flex items-center gap-3 self-end sm:self-auto">
                            <div className="text-right">
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-amber-550 rounded-full animate-pulse" /> Awaiting Verification
                              </span>
                            </div>
                            {appt.patient_report && (
                              <button
                                type="button"
                                onClick={() => setSelectedReportModal({ report: appt.patient_report, name: appt.patient_report_name || "medical_report" })}
                                className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 hover:text-sky-700 rounded-xl text-[10px] font-bold border border-sky-200 flex items-center gap-1 cursor-pointer transition-all shrink-0"
                              >
                                <FiFileText size={12} /> View Report
                              </button>
                            )}
                            {appt.payment_screenshot && (
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 cursor-zoom-in group animate-pulse" onClick={() => setSelectedScreenshotModal(appt.payment_screenshot)}>
                                <img src={appt.payment_screenshot} alt="Receipt proof" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100/60 items-center justify-between w-full">
                          <input 
                            type="text" 
                            placeholder="Review feedback note (e.g. Transaction ID verified)"
                            value={adminNotes[appt.id] || ""}
                            onChange={e => setAdminNotes({ ...adminNotes, [appt.id]: e.target.value })}
                            className="w-full sm:flex-1 border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400 text-slate-800"
                          />
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button 
                              onClick={() => handleProcessPayment(appt.id, "Paid")}
                              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                            >
                              <FiCheck /> Approve
                            </button>
                            <button 
                              onClick={() => handleProcessPayment(appt.id, "Rejected")}
                              className="flex-1 sm:flex-none px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                            >
                              <FiXCircle /> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            {/* DOCTOR REGISTRY CRUD */}
            {activeTab === "doctor-crud" && (
              <div className="space-y-6 text-left flex-grow">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FaUserMd className="text-pink-500" /> Specialist Doctor Registry & Applications
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage doctor profile status, approve sign-up applications or register new specialists.</p>
                  </div>
                  
                  {/* Sub-tabs navigation */}
                  <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
                    <button
                      onClick={() => setDoctorSubTab("registry")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                        doctorSubTab === "registry" 
                          ? "bg-white text-slate-900 shadow-sm" 
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Active Registry
                    </button>
                    <button
                      onClick={() => setDoctorSubTab("applications")}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                        doctorSubTab === "applications" 
                          ? "bg-white text-slate-900 shadow-sm" 
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Applications Review ({doctorsList.filter(d => d.status !== 'Active' && d.status !== 'Suspended').length})
                    </button>
                  </div>
                </div>

                {doctorSubTab === "registry" ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Add Doctor Form */}
                    <div className="md:col-span-1 border border-slate-100 rounded-3xl p-5 bg-slate-50/50">
                      <h4 className="font-black text-slate-800 text-sm mb-4">
                        {editingDoctor ? "Edit Doctor Profile" : "Register Doctor"}
                      </h4>
                      <form onSubmit={handleAddDoctor} className="space-y-3">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Full Name</label>
                          <input 
                            type="text" 
                            required
                            value={newDoctor.name}
                            onChange={e => setNewDoctor({...newDoctor, name: e.target.value})}
                            placeholder="Dr. Sarah Ahmed" 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Credentials</label>
                          <input 
                            type="text" 
                            required
                            value={newDoctor.title}
                            onChange={e => setNewDoctor({...newDoctor, title: e.target.value})}
                            placeholder="MBBS, FCPS" 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Specialty</label>
                          <input 
                            type="text" 
                            required
                            value={newDoctor.specialty}
                            onChange={e => setNewDoctor({...newDoctor, specialty: e.target.value})}
                            placeholder="Physical Therapy" 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Fee</label>
                            <input 
                              type="number" 
                              required
                              value={newDoctor.fee}
                              onChange={e => setNewDoctor({...newDoctor, fee: e.target.value})}
                              placeholder="2500" 
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Experience</label>
                            <input 
                              type="text" 
                              required
                              value={newDoctor.experience}
                              onChange={e => setNewDoctor({...newDoctor, experience: e.target.value})}
                              placeholder="10 Years" 
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Branch</label>
                          <input 
                            type="text" 
                            required
                            value={newDoctor.branch}
                            onChange={e => setNewDoctor({...newDoctor, branch: e.target.value})}
                            placeholder="Blue Area, F-8" 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">WhatsApp Number</label>
                            <input 
                              type="text" 
                              value={newDoctor.whatsapp_number || ""}
                              onChange={e => setNewDoctor({...newDoctor, whatsapp_number: e.target.value})}
                              placeholder="03001234567" 
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">WhatsApp Username</label>
                            <input 
                              type="text" 
                              value={newDoctor.whatsapp_username || ""}
                              onChange={e => setNewDoctor({...newDoctor, whatsapp_username: e.target.value})}
                              placeholder="Dr.Sarah" 
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                            />
                          </div>
                        </div>

                        {/* Profile Image Uploader */}
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Profile Photo</label>
                          <div className="flex items-center gap-3">
                            {newDoctor.image ? (
                              <img 
                                src={newDoctor.image} 
                                alt="Preview" 
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200" 
                              />
                            ) : (
                              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 border-dashed">
                                <FaUserMd size={20} />
                              </div>
                            )}
                            <label className="flex-grow flex items-center justify-center px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-[11px] font-semibold text-slate-600 cursor-pointer hover:bg-slate-50 transition-colors">
                              <span>Choose Photo</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                className="hidden" 
                              />
                            </label>
                          </div>
                        </div>

                        <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer mt-2 shadow-md">
                          {editingDoctor ? "Save Changes" : "Add Specialist"}
                        </button>
                        {editingDoctor && (
                          <button 
                            type="button" 
                            onClick={() => {
                              setEditingDoctor(null);
                              setNewDoctor({ name: "", specialty: "", fee: "", branch: "Gulberg", image: "", experience: "", title: "" });
                            }}
                            className="w-full py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold border-none cursor-pointer mt-2"
                          >
                            Cancel Edit
                          </button>
                        )}
                      </form>
                    </div>

                    {/* Doctor registry listings */}
                    <div className="md:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-1 scrollbar-none">
                      {doctorsList.filter(d => d.status === "Active" || d.status === "Suspended").map(doc => (
                        <div key={doc.id} className="border border-slate-100 bg-white/40 backdrop-blur-sm rounded-2xl p-4 flex justify-between items-center shadow-sm">
                          <div className="flex items-center gap-3">
                            <img 
                              src={doc.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80"} 
                              alt={doc.name} 
                              className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0" 
                            />
                            <div className="text-left">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className="font-extrabold text-xs text-slate-800">{doc.name}</h4>
                                <span className="text-[9px] text-pink-500 font-bold bg-pink-50 px-1.5 py-0.5 rounded">{doc.title}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-0.5">{doc.specialty} · {doc.experience}</p>
                              <span className="text-[9px] text-slate-500 font-semibold block">Branches: {doc.branch} · Fee: {doc.fee}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              doc.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                            }`}>
                              {doc.status}
                            </span>
                            <button 
                              onClick={() => handleToggleDocStatus(doc.id, doc.status)}
                              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[9px] font-bold border-none cursor-pointer"
                            >
                              Toggle Status
                            </button>
                            <button 
                              onClick={() => {
                                setManagingDoctor(doc);
                                setMgmtForm({ ...doc });
                                setMgmtTab("general");
                              }}
                              className="px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-lg text-[9px] font-bold border-none cursor-pointer"
                            >
                              Manage settings
                            </button>
                            <button 
                              onClick={() => {
                                setEditingDoctor(doc);
                                const numericFee = doc.fee ? doc.fee.replace("₨ ", "").trim() : "";
                                setNewDoctor({
                                  name: doc.name,
                                  specialty: doc.specialty,
                                  fee: numericFee,
                                  branch: doc.branch,
                                  image: doc.image || "",
                                  experience: doc.experience,
                                  title: doc.title,
                                  whatsapp_number: doc.whatsapp_number || "",
                                  whatsapp_username: doc.whatsapp_username || ""
                                });
                              }}
                              className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[9px] font-bold border-none cursor-pointer"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteDoctor(doc.id)}
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[9px] font-bold border-none cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {doctorsList.filter(d => d.status === "Active" || d.status === "Suspended").length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                          <p className="font-semibold text-xs">No doctors in the active registry.</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Applications Review Tab */
                  <div className="space-y-4">
                    {doctorsList.filter(d => d.status !== "Active" && d.status !== "Suspended").map(doc => (
                      <div key={doc.id} className="border border-slate-100 bg-white/40 backdrop-blur-sm rounded-2xl p-5 shadow-sm space-y-4">
                        <div className="flex justify-between items-start flex-wrap gap-3">
                          <div className="flex items-center gap-3">
                            <img 
                              src={doc.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80"} 
                              alt={doc.name} 
                              className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0" 
                            />
                            <div className="text-left">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-extrabold text-sm text-slate-800">{doc.name}</h4>
                                <span className="text-[9px] text-pink-500 font-bold bg-pink-50 px-1.5 py-0.5 rounded">{doc.title}</span>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                  doc.status === "Pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                  doc.status === "Need More Details" ? "bg-indigo-50 text-indigo-700 border border-indigo-200" :
                                  "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}>
                                  {doc.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5">{doc.specialty} · {doc.experience} · {doc.branch} branch</p>
                              {doc.email && (
                                <p className="text-[10px] text-slate-500 mt-1">
                                  📧 Email: <a href={`mailto:${doc.email}`} className="text-pink-500 font-semibold hover:underline">{doc.email}</a>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setManagingDoctor(doc);
                                setMgmtForm({ ...doc });
                                setMgmtTab("general");
                              }}
                              className="px-3 py-2 bg-purple-55 text-purple-600 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold cursor-pointer transition-all"
                            >
                              Manage settings
                            </button>
                            <button
                              onClick={() => handleApproveDoctor(doc.id, doc.name)}
                              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold border-none cursor-pointer transition-all shadow-sm"
                            >
                              Approve & Activate
                            </button>
                            <button
                              onClick={() => setActioningDoctor({ id: doc.id, nextStatus: "Need More Details" })}
                              className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold cursor-pointer transition-all"
                            >
                              Request Details
                            </button>
                            <button
                              onClick={() => setActioningDoctor({ id: doc.id, nextStatus: "Rejected" })}
                              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold cursor-pointer transition-all"
                            >
                              Reject
                            </button>
                          </div>
                        </div>

                        {/* Admin note feedback if there's any */}
                        {doc.admin_note && (
                          <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl text-[11px] text-amber-800 text-left">
                            <strong>Current Feedback Note:</strong> {doc.admin_note}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                          {/* File Attachments */}
                          <div className="space-y-2 text-left">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Submitted Credentials</h5>
                            <div className="space-y-2.5">
                              {renderDocAttachmentLink("Curriculum Vitae (CV)", doc.cv_file, doc.cv_name)}
                              {renderDocAttachmentLink("Medical Degree", doc.degrees_file, doc.degrees_name)}
                              {renderDocAttachmentLink("Approved Certification", doc.certificates_file, doc.certificates_name)}
                              {renderDocAttachmentLink("Rewards & Awards", doc.rewards_file, doc.rewards_name)}
                            </div>
                          </div>

                          {/* Social Profiles */}
                          <div className="space-y-2 text-left">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Professional Social Handles</h5>
                            <div className="grid grid-cols-2 gap-2 mt-1.5">
                              <div className="text-[11px]">
                                <span className="text-slate-400">LinkedIn: </span>
                                {doc.social_linkedin ? (
                                  <a href={doc.social_linkedin} target="_blank" rel="noreferrer" className="text-pink-500 hover:underline break-all font-medium">{doc.social_linkedin}</a>
                                ) : <span className="text-slate-300">Not provided</span>}
                              </div>
                              <div className="text-[11px]">
                                <span className="text-slate-400">Facebook: </span>
                                {doc.social_facebook ? (
                                  <a href={doc.social_facebook} target="_blank" rel="noreferrer" className="text-pink-500 hover:underline break-all font-medium">{doc.social_facebook}</a>
                                ) : <span className="text-slate-300">Not provided</span>}
                              </div>
                              <div className="text-[11px]">
                                <span className="text-slate-400">Instagram: </span>
                                {doc.social_instagram ? (
                                  <a href={doc.social_instagram} target="_blank" rel="noreferrer" className="text-pink-500 hover:underline break-all font-medium">{doc.social_instagram}</a>
                                ) : <span className="text-slate-300">Not provided</span>}
                              </div>
                              <div className="text-[11px]">
                                <span className="text-slate-400">Twitter: </span>
                                {doc.social_twitter ? (
                                  <a href={doc.social_twitter} target="_blank" rel="noreferrer" className="text-pink-500 hover:underline break-all font-medium">{doc.social_twitter}</a>
                                ) : <span className="text-slate-300">Not provided</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {doctorsList.filter(d => d.status !== "Active" && d.status !== "Suspended").length === 0 && (
                      <div className="text-center py-12 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                        <FaUserMd className="text-3xl text-slate-300 mx-auto mb-2" />
                        <p className="font-bold text-xs text-slate-400">No applications pending review.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* PUBLIC CLINICAL ARTICLES */}
            {activeTab === "articles" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiFileText className="text-pink-500" /> Clinical Articles & Blog Desk
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Draft, publish, and manage health publications for the patient resource library.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Write Form */}
                  <div className="lg:col-span-5 border border-slate-100 rounded-3xl p-5 bg-slate-50/50 space-y-4">
                    <h4 className="font-black text-slate-800 text-sm">Write Article</h4>
                    <form onSubmit={handleArticleSubmit} className="space-y-3">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 block mb-1">Article Title</label>
                        <input 
                          type="text" 
                          required
                          value={articleForm.title}
                          onChange={e => setArticleForm({...articleForm, title: e.target.value})}
                          placeholder="e.g. 5 Common Posture Mistakes" 
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 block mb-1">Category</label>
                        <input 
                          type="text" 
                          required
                          value={articleForm.category}
                          onChange={e => setArticleForm({...articleForm, category: e.target.value})}
                          placeholder="Physiotherapy" 
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 block mb-1">Cover Image URL</label>
                        <input 
                          type="url" 
                          value={articleForm.image}
                          onChange={e => setArticleForm({...articleForm, image: e.target.value})}
                          placeholder="https://images.unsplash.com/..." 
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 block mb-1">Excerpt (Short Summary)</label>
                        <input 
                          type="text" 
                          value={articleForm.excerpt}
                          onChange={e => setArticleForm({...articleForm, excerpt: e.target.value})}
                          placeholder="Short summary..." 
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>

                      {/* Content Mode Toggle */}
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 block mb-1.5">Article Content Mode</label>
                        <div className="flex gap-1.5 bg-slate-100 rounded-xl p-1">
                          <button
                            type="button"
                            onClick={() => setArticleContentMode("text")}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border-none cursor-pointer transition-all ${
                              articleContentMode === "text"
                                ? "bg-white text-slate-800 shadow-sm"
                                : "bg-transparent text-slate-500"
                            }`}
                          >
                            ✏️ Write Text
                          </button>
                          <button
                            type="button"
                            onClick={() => setArticleContentMode("html")}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border-none cursor-pointer transition-all ${
                              articleContentMode === "html"
                                ? "bg-pink-500 text-white shadow-sm"
                                : "bg-transparent text-slate-500"
                            }`}
                          >
                            🗂️ Upload HTML File
                          </button>
                        </div>
                      </div>

                      {articleContentMode === "text" ? (
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 block mb-1">Content Text</label>
                          <textarea 
                            rows={4}
                            required
                            value={articleForm.content}
                            onChange={e => setArticleForm({...articleForm, content: e.target.value})}
                            placeholder="Draft details..." 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400 resize-none"
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <label className="text-[9px] font-bold text-slate-400 block mb-1">Upload HTML File (.html)</label>
                          <label
                            className="flex flex-col items-center justify-center gap-2 w-full border-2 border-dashed border-pink-200 bg-pink-50/40 rounded-xl p-5 cursor-pointer hover:bg-pink-50 transition-colors"
                          >
                            <span className="text-2xl">📄</span>
                            <span className="text-[10px] font-bold text-pink-600">
                              {articleHtmlFileName ? articleHtmlFileName : "Click to select .html file"}
                            </span>
                            {articleHtmlContent && (
                              <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full">
                                ✓ HTML Loaded — {(articleHtmlContent.length / 1024).toFixed(1)} KB
                              </span>
                            )}
                            <input
                              type="file"
                              accept=".html,.htm"
                              className="hidden"
                              onChange={e => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setArticleHtmlFileName(file.name);
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  setArticleHtmlContent(ev.target.result);
                                };
                                reader.readAsText(file);
                              }}
                            />
                          </label>
                          <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">
                            The full HTML file will be rendered as-is inside the article page using a secure sandboxed frame. The content exactly matches your file.
                          </p>
                          {articleHtmlContent && (
                            <button
                              type="button"
                              onClick={() => { setArticleHtmlContent(""); setArticleHtmlFileName(""); }}
                              className="text-[9px] text-rose-500 font-bold cursor-pointer bg-transparent border-none hover:underline"
                            >
                              ✕ Remove HTML File
                            </button>
                          )}
                        </div>
                      )}

                      <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer mt-2 shadow-md transition-colors">
                        Publish Article
                      </button>
                    </form>
                  </div>

                  {/* List of articles */}
                  <div className="lg:col-span-7 space-y-3 max-h-[550px] overflow-y-auto pr-1 scrollbar-none">
                    {articles.map(art => (
                      <div key={art.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex gap-3 shadow-sm relative group">
                        <img 
                          src={art.image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=150&q=80"} 
                          alt={art.title} 
                          className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0" 
                        />
                        <div className="flex-grow text-left">
                          <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest bg-pink-50 px-2 py-0.5 rounded">{art.category}</span>
                          <h4 className="font-extrabold text-xs text-slate-800 mt-1 leading-tight">{art.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{art.excerpt}</p>
                          <span className="text-[9px] text-slate-400 mt-2 block font-semibold">Author: {art.author}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteArticle(art.id)}
                          className="absolute top-4 right-4 p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold border-none cursor-pointer shadow-sm"
                        >
                          <FiTrash size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* COMMENTS MODERATION */}
            {activeTab === "comments" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiAlertTriangle className="text-pink-500" /> Comments Moderation Desk
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Approve, reject, or delete patient comments on public health articles.</p>
                </div>

                <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1 scrollbar-none">
                  {comments.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs">
                      No comments found.
                    </div>
                  ) : (
                    comments.map(c => {
                      const relatedArticle = articles.find(art => art.id === c.article_id);
                      return (
                        <div key={c.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-sm">
                          <div className="text-left">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-extrabold text-xs text-slate-800">{c.author_name}</h4>
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                                c.status === "Approved" ? "bg-emerald-50 text-emerald-700" :
                                c.status === "Rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"
                              }`}>
                                {c.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 italic font-medium">"{c.comment_text}"</p>
                            {relatedArticle && (
                              <span className="text-[9px] text-slate-400 font-semibold block mt-1">Article: <strong>{relatedArticle.title}</strong></span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                            {c.status === "Pending" && (
                              <>
                                <button 
                                  onClick={() => handleCommentStatus(c.id, "Approved")}
                                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-550 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer shadow-sm flex items-center gap-1"
                                >
                                  <FiCheck size={10} /> Approve
                                </button>
                                <button 
                                  onClick={() => handleCommentStatus(c.id, "Rejected")}
                                  className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-550 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer shadow-sm flex items-center gap-1"
                                >
                                  <FiXCircle size={10} /> Reject
                                </button>
                              </>
                            )}
                            <button 
                              onClick={() => handleDeleteComment(c.id)}
                              className="p-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 rounded-lg text-xs font-bold border-none cursor-pointer"
                            >
                              <FiTrash size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* CHECK-IN DESK */}
            {activeTab === "reception-queue" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiList className="text-pink-500" /> Patient Check-In Desk
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Check in scheduled patients, track waiting times, and route online or in-person rooms.</p>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl w-max">
                  {[
                    { id: "all", label: "All Visits" },
                    { id: "in-person", label: "In-Person Visits" },
                    { id: "online", label: "Online Consultations" }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setApptFilter(f.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border-none cursor-pointer transition-all ${
                        apptFilter === f.id ? "bg-white text-slate-900 shadow-sm" : "bg-transparent text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {checkInAppointments.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs">
                      No active appointments matching filter.
                    </div>
                  ) : (
                    checkInAppointments.map(appt => (
                      <div key={appt.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-slate-800">{appt.patient}</h4>
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{appt.doctor}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Slot: {appt.date} at {appt.time} ({appt.branch})</p>
                        </div>
                        <div className="flex items-center gap-3.5 self-end sm:self-auto">
                          {appt.patient_report && (
                            <button
                              type="button"
                              onClick={() => setSelectedReportModal({ report: appt.patient_report, name: appt.patient_report_name || "medical_report" })}
                              className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-600 hover:text-sky-700 rounded-xl text-[10px] font-bold border border-sky-200 flex items-center gap-1 cursor-pointer transition-all shrink-0"
                            >
                              <FiFileText size={12} /> View Report
                            </button>
                          )}
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
                    ))
                  )}
                </div>
              </div>
            )}

            {/* INSURANCE DESK */}
            {activeTab === "reception-billing" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <MdOutlineHealthAndSafety className="text-pink-500" size={20} /> Insurance Eligibility & Verification
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Query active coverage policies from authorized insurance providers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 border border-slate-100 rounded-3xl p-5 bg-slate-50/50 space-y-4">
                    <h4 className="font-black text-slate-800 text-sm">Query Coverage</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 block mb-1">Insurance Provider</label>
                        <select className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none">
                          <option>Allianz Insurance</option>
                          <option>Jubilee General Health Care</option>
                          <option>EFU General Insurance</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 block mb-1">Policy Number</label>
                        <input type="text" placeholder="e.g. ALL-99023-B" className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none" />
                      </div>
                      <button 
                        onClick={() => alert("Verification successful! Policy is active. Co-pay is 15%.")}
                        className="w-full py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer"
                      >
                        Query Live Panel
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-7 border border-slate-100 rounded-3xl p-5 space-y-3 text-xs text-slate-505">
                    <h4 className="font-black text-slate-800 text-sm mb-1 text-left">Active Coverage Panels</h4>
                    <p className="leading-relaxed">Verify coverage parameters for Allianz (Co-pay 15%), Jubilee (Dental 100%), and EFU (Silver 70%).</p>
                  </div>
                </div>
              </div>
            )}

            {/* SHOP PRODUCTS INVENTORY */}
            {activeTab === "shop-products" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiPackage className="text-pink-500" /> Shop Inventory Control
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Manage products catalog, update stock counts, prices, or add new physiotherapy items.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Register/Edit Product Form */}
                  <div className="md:col-span-1 border border-slate-100 rounded-3xl p-5 bg-slate-50/50">
                    <h4 className="font-black text-slate-800 text-sm mb-4">
                      {editingProduct ? "Edit Product" : "Add Product"}
                    </h4>
                    <form onSubmit={handleProductSubmit} className="space-y-3">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Product Name</label>
                        <input 
                          type="text" 
                          required
                          value={productForm.name}
                          onChange={e => setProductForm({...productForm, name: e.target.value})}
                          placeholder="e.g. Foam Roller" 
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Category</label>
                        <select 
                          value={productForm.category}
                          onChange={e => setProductForm({...productForm, category: e.target.value})}
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400 font-semibold"
                        >
                          <option value="Rehabilitation">Rehabilitation</option>
                          <option value="Supports & Braces">Supports & Braces</option>
                          <option value="Recovery">Recovery</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Price (₨)</label>
                          <input 
                            type="number" 
                            required
                            value={productForm.price}
                            onChange={e => setProductForm({...productForm, price: e.target.value})}
                            placeholder="1200" 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Stock</label>
                          <input 
                            type="number" 
                            required
                            value={productForm.stock}
                            onChange={e => setProductForm({...productForm, stock: e.target.value})}
                            placeholder="15" 
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Image URL</label>
                        <input 
                          type="url" 
                          value={productForm.image}
                          onChange={e => setProductForm({...productForm, image: e.target.value})}
                          placeholder="https://images.unsplash.com/..." 
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Description</label>
                        <textarea 
                          rows={3}
                          required
                          value={productForm.description}
                          onChange={e => setProductForm({...productForm, description: e.target.value})}
                          placeholder="Product details..." 
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400 resize-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button type="submit" className="flex-1 py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md">
                          {editingProduct ? "Update" : "Add Product"}
                        </button>
                        {editingProduct && (
                          <button 
                            type="button" 
                            onClick={cancelProductEdit}
                            className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-bold border-none cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Listings */}
                  <div className="md:col-span-2 space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-none">
                    {products.map(prod => (
                      <div key={prod.id} className="border border-slate-100 bg-white/40 backdrop-blur-sm rounded-2xl p-4 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                          <img 
                            src={prod.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=100&q=80"} 
                            alt={prod.name} 
                            className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0" 
                          />
                          <div className="text-left">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-extrabold text-xs text-slate-800">{prod.name}</h4>
                              <span className="text-[8px] text-pink-500 font-bold bg-pink-50 px-1.5 py-0.5 rounded">{prod.category}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">Price: ₨ {prod.price.toLocaleString()} · Stock: {prod.stock}</p>
                            <span className="text-[9px] text-slate-500 font-semibold block line-clamp-1">{prod.description}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button 
                            onClick={() => startProductEdit(prod)}
                            className="px-2.5 py-1.5 bg-slate-150 hover:bg-slate-200 text-slate-700 rounded-lg text-[9px] font-bold border-none cursor-pointer"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold border-none cursor-pointer"
                          >
                            <FiTrash size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SHOP ORDERS CONTROL */}
            {activeTab === "shop-orders" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiShoppingCart className="text-pink-500" /> Shop Order Management Desk
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Update shipping logistics, approve transfer receipts, or cancel orders.</p>
                </div>

                {/* Subfilter pills for orders */}
                <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-none font-bold text-[9px]">
                  {["All", "Pending Verification", "Pending", "Processing", "Shipped", "Delivered"].map(subf => (
                    <button
                      key={subf}
                      onClick={() => setSelectedOrderFilter(subf)}
                      className={`px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors ${
                        selectedOrderFilter === subf
                          ? "bg-slate-900 text-white"
                          : "bg-white/80 hover:bg-slate-100 text-slate-500"
                      }`}
                    >
                      {subf}
                    </button>
                  ))}
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 scrollbar-none">
                  {filteredOrders.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs font-semibold">
                      No orders matching selection.
                    </div>
                  ) : (
                    filteredOrders.map(ord => (
                      <div key={ord.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex flex-col gap-4 shadow-xs">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-black uppercase text-pink-550 bg-pink-50 px-2 py-0.5 rounded">{ord.id}</span>
                              <h4 className="font-extrabold text-sm text-slate-850">{ord.patient_name} ({ord.patient_email})</h4>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 font-semibold">
                              Items: {ord.items ? ord.items.map(i => `${i.product_name} (x${i.quantity})`).join(", ") : "None"}
                            </p>
                            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                              Phone: {ord.phone} · Address: {ord.shipping_address} · Total: ₨ {ord.total_amount.toLocaleString()} ({ord.payment_method})
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                            <div className="text-right flex flex-col gap-1 items-end">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                ord.payment_status === "Paid" ? "bg-emerald-50 text-emerald-700" :
                                ord.payment_status === "Pending Verification" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-red-50 text-red-750"
                              }`}>
                                Payment: {ord.payment_status}
                              </span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                ord.order_status === "Delivered" ? "bg-emerald-550/10 text-emerald-700" :
                                ord.order_status === "Cancelled" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
                              }`}>
                                Shipping: {ord.order_status}
                              </span>
                            </div>
                            {ord.payment_screenshot && (
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 cursor-zoom-in group" onClick={() => setSelectedScreenshotModal(ord.payment_screenshot)}>
                                <img src={ord.payment_screenshot} alt="Receipt proof" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Controls: Verify payment if pending, update shipping status */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100/60 items-center justify-between w-full">
                          
                          {/* Payment actions if pending verification */}
                          {ord.payment_status === "Pending Verification" ? (
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:flex-1 items-center justify-between">
                              <input 
                                type="text" 
                                placeholder="Review feedback note (e.g. Verified HBL ref)"
                                value={adminOrderNotes[ord.id] || ""}
                                onChange={e => setAdminOrderNotes({ ...adminOrderNotes, [ord.id]: e.target.value })}
                                className="w-full sm:flex-1 border border-slate-200 bg-white rounded-xl p-2 text-xs outline-none focus:border-pink-400 text-slate-800"
                              />
                              <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                                <button 
                                  onClick={() => handleProcessOrderPayment(ord.id, "Paid")}
                                  className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-550 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer shadow-sm flex items-center justify-center gap-1"
                                >
                                  <FiCheck /> Verify Paid
                                </button>
                                <button 
                                  onClick={() => handleProcessOrderPayment(ord.id, "Rejected")}
                                  className="flex-1 sm:flex-none px-3.5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer shadow-md flex items-center justify-center gap-1"
                                >
                                  <FiXCircle /> Reject
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 font-semibold text-left">
                              {ord.admin_note ? `Note: "${ord.admin_note}"` : "No payment verification pending."}
                            </div>
                          )}

                          {/* Shipping Status Dropdown */}
                          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Change Shipping:</label>
                            <select
                              value={ord.order_status}
                              onChange={e => handleUpdateOrderShipping(ord.id, e.target.value)}
                              className="border border-slate-200 bg-white rounded-xl p-2 text-xs outline-none font-semibold text-slate-700"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>

                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* USER MANAGEMENT DASHBOARD */}
            {activeTab === "users" && (
              <div className="space-y-6 text-left flex-grow flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiUsers className="text-pink-500" /> User Management & Audits
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage patients, doctors, receptionist staff, and monitor system-wide activity logs.</p>
                  </div>
                  <button
                    onClick={() => {
                      setAddUserError("");
                      setAddUserForm({ name: "", email: "", password: "", role: "patient" });
                      setShowAddUserModal(true);
                    }}
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer flex items-center gap-1.5 shadow-sm transition-colors shrink-0 animate-pulse"
                  >
                    <FiPlus /> Add Validated User
                  </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { label: "Total Admins", value: users.filter(u => u.role === "admin").length, desc: "Root access accounts" },
                    { label: "Staff Members", value: users.filter(u => u.role === "receptionist").length, desc: "Reception desks" },
                    { label: "Doctors Registered", value: users.filter(u => u.role === "doctor").length, desc: "Medical specialists" },
                    { label: "Patient Profiles", value: users.filter(u => u.role === "patient").length, desc: "Registered customers" },
                    { 
                      label: "Active Actions", 
                      value: userLogs.filter(l => new Date(l.timestamp) > new Date(Date.now() - 24 * 3600 * 1000)).length, 
                      desc: "Operations last 24h"
                    }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/40 border border-slate-100 rounded-3xl p-4 flex flex-col justify-between shadow-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">{stat.label}</span>
                        <h4 className="text-xl font-black text-slate-800 mt-1">{stat.value}</h4>
                      </div>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-1">{stat.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Two-Column Management Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
                  {/* Left Column: Users List */}
                  <div className="lg:col-span-2 bg-white/40 border border-slate-100 rounded-3xl p-5 flex flex-col gap-4 min-h-[500px]">
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                      <h4 className="font-extrabold text-sm text-slate-800">System Accounts Registry</h4>
                      
                      {/* Filters */}
                      <div className="flex flex-wrap gap-2">
                        <div className="relative">
                          <FiSearch className="absolute left-3 top-2.5 text-slate-400" size={13} />
                          <input
                            type="text"
                            placeholder="Search users..."
                            value={searchUserQuery}
                            onChange={e => setSearchUserQuery(e.target.value)}
                            className="pl-8 pr-3 py-1.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold outline-none text-slate-650 w-full sm:w-44 focus:border-pink-500 transition-colors"
                          />
                        </div>
                        <select
                          value={userRoleFilter}
                          onChange={e => setUserRoleFilter(e.target.value)}
                          className="px-2 py-1.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold text-slate-700 outline-none"
                        >
                          <option value="all">All Roles</option>
                          <option value="admin">Admins</option>
                          <option value="receptionist">Staff / Reception</option>
                          <option value="patient">Patients</option>
                        </select>
                      </div>
                    </div>

                    {/* Users Table */}
                    <div className="overflow-x-auto flex-grow max-h-[550px] overflow-y-auto pr-1">
                      {users.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-xs font-semibold">
                          Loading accounts list...
                        </div>
                      ) : (
                        (() => {
                          const filtered = users.filter(u => {
                            if (u.role === "doctor") return false; // Exclude doctors from user management registry
                            const matchesSearch = u.name.toLowerCase().includes(searchUserQuery.toLowerCase()) || u.email.toLowerCase().includes(searchUserQuery.toLowerCase());
                            const matchesRole = userRoleFilter === "all" || u.role === userRoleFilter;
                            return matchesSearch && matchesRole;
                          });

                          if (filtered.length === 0) {
                            return (
                              <div className="p-12 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs font-semibold">
                                No registered accounts found matching selection.
                              </div>
                            );
                          }

                          return (
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[9px]">
                                  <th className="py-2.5">User Profile</th>
                                  <th className="py-2.5">Email Address</th>
                                  <th className="py-2.5">Status Role</th>
                                  <th className="py-2.5 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {filtered.map(u => (
                                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 font-extrabold text-slate-800 flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-650">
                                        {u.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                                      </div>
                                      <div>
                                        <p className="font-extrabold">{u.name}</p>
                                        <span className="text-[10px] text-slate-400 font-semibold block">ID: #{u.id}</span>
                                      </div>
                                    </td>
                                    <td className="py-3 font-semibold text-slate-600">{u.email}</td>
                                    <td className="py-3">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                        u.role === "admin" ? "bg-red-50 text-red-650" :
                                        u.role === "doctor" ? "bg-teal-50 text-teal-650" :
                                        u.role === "receptionist" ? "bg-purple-50 text-purple-650" :
                                        "bg-blue-50 text-blue-650"
                                      }`}>
                                        {u.role === "receptionist" ? "staff desk" : u.role}
                                      </span>
                                    </td>
                                    <td className="py-3 text-right space-x-1.5">
                                      <button
                                        onClick={() => {
                                          setSelectedUser(u);
                                          setEditUserForm({ name: u.name, email: u.email, role: u.role });
                                          setEditUserError("");
                                          setShowEditUserModal(true);
                                        }}
                                        className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold border-none cursor-pointer transition-colors shadow-xs"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDeleteUser(u.id, u.email)}
                                        className="px-2.5 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[10px] font-bold border-none cursor-pointer transition-colors shadow-xs"
                                      >
                                        Revoke
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          );
                        })()
                      )}
                    </div>
                  </div>

                  {/* Right Column: Activity Logs */}
                  <div className="bg-white/40 border border-slate-100 rounded-3xl p-5 flex flex-col gap-4 max-h-[660px]">
                    <div className="flex flex-col gap-1">
                      <h4 className="font-extrabold text-sm text-slate-800">Security & Activity Audit</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">Real-time log tracing of database operations.</p>
                    </div>

                    <div className="relative">
                      <FiSearch className="absolute left-3 top-2.5 text-slate-400" size={13} />
                      <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchLogQuery}
                        onChange={e => setSearchLogQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 border border-slate-200 bg-white rounded-xl text-xs font-semibold outline-none text-slate-650 w-full focus:border-pink-500 transition-colors"
                      />
                    </div>

                    {/* Timeline */}
                    <div className="flex-grow overflow-y-auto pr-1 space-y-3.5 scrollbar-none">
                      {userLogs.length === 0 ? (
                        <div className="p-6 text-center text-slate-400 text-xs font-semibold">
                          No recent operations logged.
                        </div>
                      ) : (
                        (() => {
                          const filtered = userLogs.filter(l => 
                            l.user_email.toLowerCase().includes(searchLogQuery.toLowerCase()) || 
                            l.action.toLowerCase().includes(searchLogQuery.toLowerCase()) ||
                            (l.details && l.details.toLowerCase().includes(searchLogQuery.toLowerCase()))
                          );

                          if (filtered.length === 0) {
                            return (
                              <div className="p-8 text-center text-slate-400 text-xs font-semibold bg-slate-50 border border-dashed rounded-3xl">
                                No logs found matching query.
                              </div>
                            );
                          }

                          return filtered.map((l, index) => (
                            <div key={l.id || index} className="flex gap-2.5 text-left border-l-2 border-slate-100 pl-3.5 pb-1 relative ml-1.5">
                              {/* dot */}
                              <div className="absolute -left-1.5 top-1 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white shadow-xs" />
                              
                              <div className="flex-grow min-w-0 space-y-1">
                                <div className="flex justify-between items-start gap-1">
                                  <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wide ${
                                    l.action === "User Login" ? "bg-emerald-50 text-emerald-650" :
                                    l.action === "User Created" ? "bg-blue-50 text-blue-650" :
                                    l.action === "User Updated" ? "bg-amber-50 text-amber-650" :
                                    l.action === "User Deleted" ? "bg-red-50 text-red-650" :
                                    "bg-slate-100 text-slate-650"
                                  }`}>
                                    {l.action}
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-bold tracking-tight whitespace-nowrap">
                                    {l.timestamp ? new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-700 font-semibold leading-snug">{l.details}</p>
                                <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold mt-1">
                                  <span className="truncate">{l.user_email}</span>
                                  <span>{l.timestamp ? new Date(l.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }) : ""}</span>
                                </div>
                              </div>
                            </div>
                          ));
                        })()
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MEMBERSHIPS & INTERNSHIPS DESK */}
            {activeTab === "memberships-internships" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiAward className="text-pink-500" /> Memberships & Internship Applications Desk
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Review incoming clinical membership requests and internship rotation applications from the website.</p>
                </div>

                {/* Stat Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/50 border border-slate-100 rounded-3xl p-4 shadow-xs">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Total Applications</span>
                    <h2 className="text-2xl font-black text-slate-800 mt-1">{applications.length}</h2>
                    <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Website Submissions</span>
                  </div>
                  <div className="bg-white/50 border border-slate-100 rounded-3xl p-4 shadow-xs">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Pending Review</span>
                    <h2 className="text-2xl font-black text-amber-600 mt-1">{applications.filter(a => a.status === "Pending").length}</h2>
                    <span className="text-[9px] text-amber-500 font-bold block mt-0.5">Awaiting Decision</span>
                  </div>
                  <div className="bg-white/50 border border-slate-100 rounded-3xl p-4 shadow-xs">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Approved Memberships</span>
                    <h2 className="text-2xl font-black text-emerald-600 mt-1">{applications.filter(a => a.type === "membership" && a.status === "Approved").length}</h2>
                    <span className="text-[9px] text-emerald-500 font-bold block mt-0.5">Active Passes</span>
                  </div>
                  <div className="bg-white/50 border border-slate-100 rounded-3xl p-4 shadow-xs">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Active Interns</span>
                    <h2 className="text-2xl font-black text-sky-600 mt-1">{applications.filter(a => a.type === "internship" && a.status === "Approved").length}</h2>
                    <span className="text-[9px] text-sky-500 font-bold block mt-0.5">Accepted Rotations</span>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex justify-between items-center flex-wrap gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-2xl">
                    {["all", "membership", "internship"].map(t => (
                      <button
                        key={t}
                        onClick={() => setAppFilterType(t)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold capitalize border-none cursor-pointer transition-all ${
                          appFilterType === t ? "bg-white text-slate-900 shadow-sm" : "bg-transparent text-slate-500"
                        }`}
                      >
                        {t === "all" ? "All Programs" : t === "membership" ? "Memberships" : "Internships"}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Status:</span>
                    <select
                      value={appFilterStatus}
                      onChange={e => setAppFilterStatus(e.target.value)}
                      className="border border-slate-200 bg-white rounded-xl p-1.5 text-xs font-bold text-slate-700 outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Applications Table / Cards */}
                <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1 scrollbar-none">
                  {(() => {
                    const filtered = applications.filter(a => {
                      const matchType = appFilterType === "all" || a.type === appFilterType;
                      const matchStatus = appFilterStatus === "all" || a.status === appFilterStatus;
                      return matchType && matchStatus;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="p-10 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs font-semibold">
                          No application submissions match the selected filter.
                        </div>
                      );
                    }

                    return filtered.map(app => (
                      <div key={app.id} className="border border-slate-100 bg-white/40 backdrop-blur-sm rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm text-left">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded ${
                              app.type === "membership" ? "bg-purple-100 text-purple-700" : "bg-sky-100 text-sky-700"
                            }`}>
                              {app.type === "membership" ? "Clinical Membership" : "Clinical Internship"}
                            </span>
                            <h4 className="font-extrabold text-sm text-slate-850">{app.full_name}</h4>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                              app.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                              app.status === "Rejected" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                            }`}>
                              {app.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">
                            Email: <span className="font-bold">{app.email}</span> · Phone: <span className="font-bold">{app.phone}</span>
                          </p>
                          <div className="text-[10px] text-slate-400 font-semibold space-x-3">
                            {app.plan_tier && <span>Plan: <strong className="text-slate-700">{app.plan_tier}</strong></span>}
                            {app.duration && <span>Duration: <strong className="text-slate-700">{app.duration}</strong></span>}
                            {app.qualification && <span>Qualification: <strong className="text-slate-700">{app.qualification}</strong></span>}
                            {app.institution && <span>Institution: <strong className="text-slate-700">{app.institution}</strong></span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto shrink-0 flex-wrap">
                          <button
                            onClick={() => setSelectedAppModal(app)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-[10px] font-bold border-none cursor-pointer"
                          >
                            View Details
                          </button>
                          {app.status !== "Approved" && (
                            <button
                              onClick={() => handleUpdateAppStatus(app.id, "Approved")}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer flex items-center gap-1 shadow-xs"
                            >
                              <FiCheck size={11} /> Approve
                            </button>
                          )}
                          {app.status !== "Rejected" && (
                            <button
                              onClick={() => handleUpdateAppStatus(app.id, "Rejected")}
                              className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-bold border-none cursor-pointer flex items-center gap-1 shadow-xs"
                            >
                              <FiXCircle size={11} /> Reject
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteApp(app.id)}
                            className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-400 rounded-lg text-xs font-bold border-none cursor-pointer"
                          >
                            <FiTrash size={12} />
                          </button>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}

            {/* SUPER ADMIN CLINIC NETWORKS MANAGEMENT CENTER */}
            {activeTab === "saas-clinics" && isSuperAdmin && (
              <div className="space-y-6 text-left flex-grow flex flex-col animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <FiShield className="text-pink-500" /> Super Admin Center — Clinic Networks
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">Register new healthcare clinics, manage access status, and audit network distributions.</p>
                  </div>
                  <button
                    onClick={() => {
                      setAddClinicError("");
                      setAddClinicForm({ name: "", subdomain: "", address: "", adminName: "", adminEmail: "", adminPassword: "" });
                      setShowAddClinicModal(true);
                    }}
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
                  >
                    <FiPlus /> Register Clinic Network
                  </button>
                </div>

                {/* SaaS Analytics Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
                    <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Total Networks</span>
                    <h2 className="text-2xl font-black text-slate-800 mt-1">{clinicsList.length}</h2>
                    <span className="text-[9px] text-emerald-500 font-extrabold block mt-1">Multi-tenant instances</span>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
                    <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Active Clinics</span>
                    <h2 className="text-2xl font-black text-emerald-600 mt-1">{clinicsList.filter(c => c.status === "Active").length}</h2>
                    <span className="text-[9px] text-slate-400 font-extrabold block mt-1">Status: Operational</span>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
                    <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Suspended Clinics</span>
                    <h2 className="text-2xl font-black text-rose-600 mt-1">{clinicsList.filter(c => c.status === "Suspended").length}</h2>
                    <span className="text-[9px] text-slate-450 font-extrabold block mt-1 text-rose-500">Awaiting billing or review</span>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs">
                    <span className="text-[10px] font-black text-slate-450 uppercase tracking-wider block">Base Platform Version</span>
                    <h2 className="text-2xl font-black text-slate-800 mt-1">v4.2.0</h2>
                    <span className="text-[9px] text-pink-500 font-extrabold block mt-1">Fully Dynamic Core SaaS</span>
                  </div>
                </div>

                {/* Clinics Registry Table */}
                <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden flex-grow flex flex-col shadow-xs min-h-[400px]">
                  <div className="p-5 border-b border-slate-50 flex justify-between items-center flex-wrap gap-2">
                    <h4 className="font-extrabold text-sm text-slate-800">Clinic Networks Registry</h4>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-650 rounded-full text-[10px] font-bold">
                      {clinicsList.length} Tenant(s) Found
                    </span>
                  </div>

                  <div className="overflow-x-auto flex-grow">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                          <th className="p-4 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Network Details</th>
                          <th className="p-4 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Subdomain Subdomain</th>
                          <th className="p-4 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Location Address</th>
                          <th className="p-4 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Created At</th>
                          <th className="p-4 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Operational Status</th>
                          <th className="p-4 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-right">Actions Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clinicsList.map(clinic => (
                          <tr key={clinic.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors">
                            <td className="p-4">
                              <div>
                                <h5 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                                  {clinic.name}
                                  {clinic.id === 1 && (
                                    <span className="px-1.5 py-0.5 bg-pink-100 text-pink-700 text-[8px] font-bold rounded">MASTER</span>
                                  )}
                                </h5>
                                <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">ID: {clinic.id}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-semibold">
                                {clinic.subdomain}.physiohub.com
                              </span>
                            </td>
                            <td className="p-4 text-xs font-semibold text-slate-650 truncate max-w-[200px]">
                              {clinic.address || "Online/No address"}
                            </td>
                            <td className="p-4 text-[11px] font-semibold text-slate-400">
                              {clinic.created_at ? new Date(clinic.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) : "System Initial"}
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                                clinic.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                              }`}>
                                {clinic.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              {clinic.id !== 1 && (
                                <button
                                  onClick={() => handleToggleClinicStatus(clinic.id, clinic.status)}
                                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border-none cursor-pointer transition-colors ${
                                    clinic.status === "Active"
                                      ? "bg-rose-50 hover:bg-rose-100 text-rose-600"
                                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                                  }`}
                                >
                                  {clinic.status === "Active" ? "Suspend Network" : "Activate Network"}
                                </button>
                              )}
                              {clinic.id === 1 && (
                                <span className="text-[10px] text-slate-350 italic font-bold">Unmodifiable Master</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* MANAGE BRANCHES */}
            {activeTab === "branches" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiMapPin className="text-pink-500" /> Clinic Branches Management
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-semibold">Configure geographic clinic branch locations dynamically. These branches will automatically populate in patient booking forms.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Add Branch Form */}
                  <div className="md:col-span-1 border border-slate-100 rounded-3xl p-5 bg-slate-50/50 h-fit">
                    <h4 className="font-black text-slate-800 text-sm mb-4">
                      {editingBranch ? "Edit Branch Info" : "Register New Branch"}
                    </h4>
                    <form onSubmit={handleSaveBranch} className="space-y-3.5">
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Branch Name *</label>
                        <input
                          type="text"
                          required
                          value={newBranch.name}
                          onChange={e => setNewBranch({ ...newBranch, name: e.target.value })}
                          placeholder="e.g. DHA Phase 6"
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">City</label>
                        <input
                          type="text"
                          value={newBranch.city}
                          onChange={e => setNewBranch({ ...newBranch, city: e.target.value })}
                          placeholder="e.g. Islamabad"
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Street Address</label>
                        <textarea
                          value={newBranch.address}
                          onChange={e => setNewBranch({ ...newBranch, address: e.target.value })}
                          placeholder="e.g. Main Boulevard, Phase 6"
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400 resize-none"
                          rows={3}
                        />
                      </div>

                      <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer mt-2 shadow-md">
                        {editingBranch ? "Save Changes" : "Add Branch"}
                      </button>
                      {editingBranch && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBranch(null);
                            setNewBranch({ name: "", address: "", city: "" });
                          }}
                          className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-bold border-none cursor-pointer mt-1"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </form>
                  </div>

                  {/* Branches List */}
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="font-extrabold text-sm text-slate-800">Geographic Branch Registry</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {branchesList.map(b => (
                        <div key={b.id} className="border border-slate-100 bg-white rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-sm animate-fade-in">
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-850">{b.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase mt-0.5">{b.city || "Islamabad"}</p>
                            <p className="text-xs text-slate-550 mt-1.5 leading-relaxed font-semibold">{b.address || "N/A"}</p>
                          </div>
                          <div className="flex gap-2 pt-2 border-t border-slate-50 justify-end">
                            <button
                              onClick={() => {
                                setEditingBranch(b);
                                setNewBranch({ name: b.name, address: b.address || "", city: b.city || "" });
                              }}
                              className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[9px] font-bold border-none cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBranch(b.id)}
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[9px] font-bold border-none cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      {branchesList.length === 0 && (
                        <div className="col-span-2 text-center py-12 text-slate-400">
                          <p className="font-semibold text-xs">No clinic branches registered.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* WEBSITE CMS DASHBOARD */}
            {activeTab === "website-cms" && (
              <div className="space-y-6 text-left flex-grow flex flex-col">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiActivity className="text-pink-500" /> Website CMS Control Center
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Manage settings, services, FAQs, jobs, photos, and patient testimonials.</p>
                </div>

                {/* Sub Navigation */}
                <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-none font-bold text-[9px] border-b border-slate-100 mb-4 shrink-0">
                  {[
                    { id: "settings", label: "Clinic Settings" },
                    { id: "services", label: "Services" },
                    { id: "faqs", label: "FAQs" },
                    { id: "careers", label: "Careers" },
                    { id: "gallery", label: "Gallery" },
                    { id: "reviews", label: "Testimonials" }
                  ].map(sub => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setActiveCmsSubTab(sub.id);
                      }}
                      className={`px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors ${
                        activeCmsSubTab === sub.id
                          ? "bg-pink-600 text-white shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                <div className="flex-grow flex flex-col">
                  {/* Settings Manager */}
                  {activeCmsSubTab === "settings" && (
                    <form onSubmit={handleSettingsSubmit} className="space-y-4 max-w-2xl text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Clinic Phone</label>
                          <input
                            type="text"
                            required
                            value={settingsForm.clinic_phone}
                            onChange={e => setSettingsForm({ ...settingsForm, clinic_phone: e.target.value })}
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Clinic Email</label>
                          <input
                            type="email"
                            required
                            value={settingsForm.clinic_email}
                            onChange={e => setSettingsForm({ ...settingsForm, clinic_email: e.target.value })}
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Ambulance Emergency Phone</label>
                          <input
                            type="text"
                            required
                            value={settingsForm.ambulance_phone}
                            onChange={e => setSettingsForm({ ...settingsForm, ambulance_phone: e.target.value })}
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Clinic Operating Hours</label>
                          <input
                            type="text"
                            required
                            value={settingsForm.clinic_hours}
                            onChange={e => setSettingsForm({ ...settingsForm, clinic_hours: e.target.value })}
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Clinic Address</label>
                        <textarea
                          rows={2}
                          required
                          value={settingsForm.clinic_address}
                          onChange={e => setSettingsForm({ ...settingsForm, clinic_address: e.target.value })}
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Why-Us Section Headline</label>
                          <input
                            type="text"
                            required
                            value={settingsForm.why_us_headline}
                            onChange={e => setSettingsForm({ ...settingsForm, why_us_headline: e.target.value })}
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Why-Us Description</label>
                          <textarea
                            rows={2}
                            required
                            value={settingsForm.why_us_description}
                            onChange={e => setSettingsForm({ ...settingsForm, why_us_description: e.target.value })}
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold resize-none"
                          />
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-4 mt-4 space-y-4">
                        <h5 className="font-extrabold text-slate-700 text-xs uppercase tracking-wider">Dynamic Pages CMS Controls</h5>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Home Hero Section Title</label>
                            <input
                              type="text"
                              required
                              value={settingsForm.hero_title || ""}
                              onChange={e => setSettingsForm({ ...settingsForm, hero_title: e.target.value })}
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Home Hero Description</label>
                            <input
                              type="text"
                              required
                              value={settingsForm.hero_subtitle || ""}
                              onChange={e => setSettingsForm({ ...settingsForm, hero_subtitle: e.target.value })}
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">About Page Heading</label>
                            <input
                              type="text"
                              required
                              value={settingsForm.about_title || ""}
                              onChange={e => setSettingsForm({ ...settingsForm, about_title: e.target.value })}
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">CEO Vision Statement</label>
                            <input
                              type="text"
                              required
                              value={settingsForm.about_ceo_vision || ""}
                              onChange={e => setSettingsForm({ ...settingsForm, about_ceo_vision: e.target.value })}
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">About Page Description Paragraph</label>
                          <textarea
                            rows={3}
                            required
                            value={settingsForm.about_description || ""}
                            onChange={e => setSettingsForm({ ...settingsForm, about_description: e.target.value })}
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold resize-none"
                          />
                        </div>
                      </div>
                      <button type="submit" className="px-6 py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl font-bold border-none cursor-pointer shadow-md">
                        Save Settings
                      </button>
                    </form>
                  )}

                  {/* Services Manager */}
                  {activeCmsSubTab === "services" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      <div className="lg:col-span-5 border border-slate-100 rounded-3xl p-5 bg-slate-50/50 text-xs">
                        <h4 className="font-black text-slate-800 mb-3">{editingService ? "Edit Treatment Service" : "Add Treatment Service"}</h4>
                        <form onSubmit={handleServiceSubmit} className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-none text-left">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Service ID Key (e.g. physical-therapy, hijama-therapy)</label>
                            <input
                              type="text"
                              required
                              disabled={!!editingService}
                              value={serviceForm.id}
                              onChange={e => setServiceForm({ ...serviceForm, id: e.target.value })}
                              placeholder="e.g. chiropractic"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Service/Treatment Category Name</label>
                            <input
                              type="text"
                              required
                              value={serviceForm.category}
                              onChange={e => setServiceForm({ ...serviceForm, category: e.target.value })}
                              placeholder="e.g. Chiropractic Adjustments"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Tagline / Slogan</label>
                            <input
                              type="text"
                              required
                              value={serviceForm.tagline}
                              onChange={e => setServiceForm({ ...serviceForm, tagline: e.target.value })}
                              placeholder="e.g. Align your skeletal health"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Short Description</label>
                            <textarea
                              rows={2}
                              required
                              value={serviceForm.shortDesc}
                              onChange={e => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                              placeholder="Appears on cards..."
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Detailed Overview</label>
                            <textarea
                              rows={3}
                              required
                              value={serviceForm.overview}
                              onChange={e => setServiceForm({ ...serviceForm, overview: e.target.value })}
                              placeholder="Clinical methodology explanation..."
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Common Symptoms Treated (comma-separated)</label>
                            <input
                              type="text"
                              value={serviceForm.symptoms}
                              onChange={e => setServiceForm({ ...serviceForm, symptoms: e.target.value })}
                              placeholder="Chronic back pain, Joint stiffness, Sciatica"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Clinical Benefits (comma-separated)</label>
                            <input
                              type="text"
                              value={serviceForm.benefits}
                              onChange={e => setServiceForm({ ...serviceForm, benefits: e.target.value })}
                              placeholder="Improved mobility, Correct posture, Pain relief"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Therapy Modalities / Procedures (comma-separated)</label>
                            <input
                              type="text"
                              value={serviceForm.treatments}
                              onChange={e => setServiceForm({ ...serviceForm, treatments: e.target.value })}
                              placeholder="Spinal decompression, Joint mobilization"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Fee (₨)</label>
                              <input
                                type="text"
                                required
                                value={serviceForm.fee}
                                onChange={e => setServiceForm({ ...serviceForm, fee: e.target.value })}
                                placeholder="3,000"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Type (e.g. Clinical, Recovery)</label>
                              <input
                                type="text"
                                required
                                value={serviceForm.type}
                                onChange={e => setServiceForm({ ...serviceForm, type: e.target.value })}
                                placeholder="Clinical"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Duration</label>
                              <input
                                type="text"
                                value={serviceForm.duration}
                                onChange={e => setServiceForm({ ...serviceForm, duration: e.target.value })}
                                placeholder="45 Mins"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Recovery Time</label>
                              <input
                                type="text"
                                value={serviceForm.recovery}
                                onChange={e => setServiceForm({ ...serviceForm, recovery: e.target.value })}
                                placeholder="Immediate"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Popular Status</label>
                            <select
                              value={serviceForm.popular}
                              onChange={e => setServiceForm({ ...serviceForm, popular: parseInt(e.target.value) })}
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            >
                              <option value={0}>Standard</option>
                              <option value={1}>Popular Treatment</option>
                            </select>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button type="submit" className="flex-grow py-2 bg-slate-900 hover:bg-pink-600 text-white rounded-xl font-bold border-none cursor-pointer">
                              {editingService ? "Update Service" : "Create Service"}
                            </button>
                            {editingService && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingService(null);
                                  setServiceForm({
                                    id: "", category: "", tagline: "", shortDesc: "", overview: "",
                                    symptoms: "", benefits: "", treatments: "", procedure: "",
                                    duration: "", recovery: "", fee: "", popular: 0, type: ""
                                  });
                                }}
                                className="px-3 py-2 bg-slate-100 text-slate-500 rounded-xl font-bold border-none cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      <div className="lg:col-span-7 space-y-3 max-h-[450px] overflow-y-auto pr-1 scrollbar-none text-xs text-left">
                        {cmsServices.map(srv => (
                          <div key={srv.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-xs text-slate-800">{srv.category}</h4>
                                <span className="text-[8px] text-pink-500 font-black bg-pink-50 px-1.5 py-0.5 rounded">{srv.type}</span>
                                {srv.popular === 1 && <span className="text-[8px] text-amber-600 font-black bg-amber-50 px-1.5 py-0.5 rounded">Popular</span>}
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{srv.shortDesc}</p>
                              <p className="text-[9px] text-slate-500 mt-1 font-semibold">Fee: ₨ {srv.fee} | Duration: {srv.duration || "N/A"}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingService(srv);
                                  setServiceForm({
                                    ...srv,
                                    symptoms: Array.isArray(srv.symptoms) ? srv.symptoms.join(", ") : (typeof srv.symptoms === "string" && srv.symptoms.startsWith("[") ? JSON.parse(srv.symptoms).join(", ") : srv.symptoms || ""),
                                    benefits: Array.isArray(srv.benefits) ? srv.benefits.join(", ") : (typeof srv.benefits === "string" && srv.benefits.startsWith("[") ? JSON.parse(srv.benefits).join(", ") : srv.benefits || ""),
                                    treatments: Array.isArray(srv.treatments) ? srv.treatments.join(", ") : (typeof srv.treatments === "string" && srv.treatments.startsWith("[") ? JSON.parse(srv.treatments).join(", ") : srv.treatments || "")
                                  });
                                }}
                                className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[9px] font-black border-none cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteService(srv.id)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border-none cursor-pointer"
                              >
                                <FiTrash size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQs Manager */}
                  {activeCmsSubTab === "faqs" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      <div className="lg:col-span-5 border border-slate-100 rounded-3xl p-5 bg-slate-50/50 text-xs">
                        <h4 className="font-black text-slate-800 mb-3">{editingFaq ? "Edit FAQ Q&A" : "Create FAQ Q&A"}</h4>
                        <form onSubmit={handleFaqSubmit} className="space-y-3">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Category</label>
                            <input
                              type="text"
                              required
                              value={faqForm.category}
                              onChange={e => setFaqForm({ ...faqForm, category: e.target.value })}
                              placeholder="e.g. billing, appointments, general"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Question Text</label>
                            <input
                              type="text"
                              required
                              value={faqForm.question}
                              onChange={e => setFaqForm({ ...faqForm, question: e.target.value })}
                              placeholder="e.g. What is the fee structure?"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Answer Detail</label>
                            <textarea
                              rows={4}
                              required
                              value={faqForm.answer}
                              onChange={e => setFaqForm({ ...faqForm, answer: e.target.value })}
                              placeholder="Detail answer text..."
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold resize-none"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button type="submit" className="flex-grow py-2 bg-slate-900 hover:bg-pink-600 text-white rounded-xl font-bold border-none cursor-pointer">
                              {editingFaq ? "Update" : "Add FAQ"}
                            </button>
                            {editingFaq && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingFaq(null);
                                  setFaqForm({ id: "", category: "", question: "", answer: "" });
                                }}
                                className="px-3 py-2 bg-slate-100 text-slate-500 rounded-xl font-bold border-none cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      <div className="lg:col-span-7 space-y-3 max-h-[450px] overflow-y-auto pr-1 scrollbar-none text-xs text-left">
                        {cmsFaqs.map(fq => (
                          <div key={fq.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-xs text-slate-800">{fq.question}</h4>
                                <span className="text-[8px] text-pink-500 font-black bg-pink-50 px-1.5 py-0.5 rounded">{fq.category}</span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1">{fq.answer}</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingFaq(fq);
                                  setFaqForm(fq);
                                }}
                                className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[9px] font-black border-none cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteFaq(fq.id)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border-none cursor-pointer"
                              >
                                <FiTrash size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Careers Manager */}
                  {activeCmsSubTab === "careers" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      <div className="lg:col-span-5 border border-slate-100 rounded-3xl p-5 bg-slate-50/50 text-xs">
                        <h4 className="font-black text-slate-800 mb-3">{editingCareer ? "Edit Job Posting" : "Add Job Posting"}</h4>
                        <form onSubmit={handleCareerSubmit} className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-none text-left">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Job Title</label>
                            <input
                              type="text"
                              required
                              value={careerForm.title}
                              onChange={e => setCareerForm({ ...careerForm, title: e.target.value })}
                              placeholder="e.g. Senior Physical Therapist"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Department</label>
                            <input
                              type="text"
                              required
                              value={careerForm.department}
                              onChange={e => setCareerForm({ ...careerForm, department: e.target.value })}
                              placeholder="e.g. Clinical Operations"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Job Type</label>
                              <input
                                type="text"
                                required
                                value={careerForm.type}
                                onChange={e => setCareerForm({ ...careerForm, type: e.target.value })}
                                placeholder="Full-time / Part-time"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Location</label>
                              <input
                                type="text"
                                required
                                value={careerForm.location}
                                onChange={e => setCareerForm({ ...careerForm, location: e.target.value })}
                                placeholder="Blue Area, Islamabad"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Experience</label>
                              <input
                                type="text"
                                required
                                value={careerForm.experience}
                                onChange={e => setCareerForm({ ...careerForm, experience: e.target.value })}
                                placeholder="3+ Years"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Salary Bracket</label>
                              <input
                                type="text"
                                required
                                value={careerForm.salary}
                                onChange={e => setCareerForm({ ...careerForm, salary: e.target.value })}
                                placeholder="₨ 80,000 - ₨ 120,000"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Application Deadline</label>
                            <input
                              type="text"
                              required
                              value={careerForm.deadline}
                              onChange={e => setCareerForm({ ...careerForm, deadline: e.target.value })}
                              placeholder="July 15, 2026"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Job Description</label>
                            <textarea
                              rows={3}
                              required
                              value={careerForm.description}
                              onChange={e => setCareerForm({ ...careerForm, description: e.target.value })}
                              placeholder="Core clinical duties description..."
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Requirements / Skills (comma-separated)</label>
                            <input
                              type="text"
                              required
                              value={careerForm.requirements}
                              onChange={e => setCareerForm({ ...careerForm, requirements: e.target.value })}
                              placeholder="Doctor of Physical Therapy, FCPS registered"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button type="submit" className="flex-grow py-2 bg-slate-900 hover:bg-pink-600 text-white rounded-xl font-bold border-none cursor-pointer">
                              {editingCareer ? "Update Posting" : "Publish Job"}
                            </button>
                            {editingCareer && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCareer(null);
                                  setCareerForm({
                                    id: "", title: "", department: "", type: "", location: "",
                                    experience: "", salary: "", deadline: "", description: "", requirements: ""
                                  });
                                }}
                                className="px-3 py-2 bg-slate-100 text-slate-500 rounded-xl font-bold border-none cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      <div className="lg:col-span-7 space-y-3 max-h-[450px] overflow-y-auto pr-1 scrollbar-none text-xs text-left">
                        {cmsCareers.map(job => (
                          <div key={job.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-xs text-slate-800">{job.title}</h4>
                                <span className="text-[8px] text-pink-500 font-black bg-pink-50 px-1.5 py-0.5 rounded">{job.type}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1">{job.department} · {job.location}</p>
                              <span className="text-[9px] text-slate-550 font-bold block mt-0.5">Deadline: {job.deadline} | Salary: {job.salary}</span>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingCareer(job);
                                  setCareerForm({
                                    ...job,
                                    requirements: Array.isArray(job.requirements) ? job.requirements.join(", ") : (typeof job.requirements === "string" && job.requirements.startsWith("[") ? JSON.parse(job.requirements).join(", ") : job.requirements || "")
                                  });
                                }}
                                className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[9px] font-black border-none cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCareer(job.id)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border-none cursor-pointer"
                              >
                                <FiTrash size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gallery Manager */}
                  {activeCmsSubTab === "gallery" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      <div className="lg:col-span-5 border border-slate-100 rounded-3xl p-5 bg-slate-50/50 text-xs">
                        <h4 className="font-black text-slate-800 mb-3">{editingGallery ? "Edit Photo Card" : "Add Photo Card"}</h4>
                        <form onSubmit={handleGallerySubmit} className="space-y-3">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Category</label>
                            <input
                              type="text"
                              required
                              value={galleryForm.category}
                              onChange={e => setGalleryForm({ ...galleryForm, category: e.target.value })}
                              placeholder="e.g. Equipment, Facilities, Treatments, Results"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Photo Image Source URL</label>
                            <input
                              type="url"
                              required
                              value={galleryForm.src}
                              onChange={e => setGalleryForm({ ...galleryForm, src: e.target.value })}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Title Label</label>
                            <input
                              type="text"
                              required
                              value={galleryForm.title}
                              onChange={e => setGalleryForm({ ...galleryForm, title: e.target.value })}
                              placeholder="e.g. Cryotherapy Chamber"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Description Detail</label>
                            <textarea
                              rows={3}
                              required
                              value={galleryForm.description}
                              onChange={e => setGalleryForm({ ...galleryForm, description: e.target.value })}
                              placeholder="Aesthetic description details..."
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold resize-none"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Grid Span Width</label>
                            <select
                              value={galleryForm.span}
                              onChange={e => setGalleryForm({ ...galleryForm, span: e.target.value })}
                              className="w-full border border-slate-200 bg-white rounded-xl p-2.5 outline-none focus:border-pink-400 font-semibold"
                            >
                              <option value="normal">Normal Card</option>
                              <option value="wide">Wide Card (Span 2 Cols)</option>
                              <option value="tall">Tall Card (Span 2 Rows)</option>
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button type="submit" className="flex-grow py-2 bg-slate-900 hover:bg-pink-600 text-white rounded-xl font-bold border-none cursor-pointer">
                              {editingGallery ? "Update Card" : "Add to Gallery"}
                            </button>
                            {editingGallery && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingGallery(null);
                                  setGalleryForm({ id: "", src: "", category: "", title: "", description: "", span: "normal" });
                                }}
                                className="px-3 py-2 bg-slate-100 text-slate-500 rounded-xl font-bold border-none cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      <div className="lg:col-span-7 space-y-3 max-h-[450px] overflow-y-auto pr-1 scrollbar-none text-xs text-left">
                        {cmsGallery.map(photo => (
                          <div key={photo.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-3">
                              <img src={photo.src.split(",")[0]} alt={photo.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-extrabold text-xs text-slate-800">{photo.title}</h4>
                                  <span className="text-[8px] text-pink-500 font-black bg-pink-50 px-1.5 py-0.5 rounded">{photo.category}</span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{photo.description}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingGallery(photo);
                                  setGalleryForm(photo);
                                }}
                                className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[9px] font-black border-none cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteGalleryItem(photo.id)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border-none cursor-pointer"
                              >
                                <FiTrash size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reviews Manager */}
                  {activeCmsSubTab === "reviews" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                      <div className="lg:col-span-5 border border-slate-100 rounded-3xl p-5 bg-slate-50/50 text-xs">
                        <h4 className="font-black text-slate-800 mb-3">{editingReview ? "Edit Testimonial" : "Add Testimonial"}</h4>
                        <form onSubmit={handleReviewSubmit} className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-none text-left">
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Patient Name</label>
                            <input
                              type="text"
                              required
                              value={reviewForm.name}
                              onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })}
                              placeholder="e.g. Jane Doe"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Avatar Image URL</label>
                            <input
                              type="url"
                              value={reviewForm.avatar}
                              onChange={e => setReviewForm({ ...reviewForm, avatar: e.target.value })}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Rating (1-5)</label>
                              <input
                                type="number"
                                min={1}
                                max={5}
                                required
                                value={reviewForm.rating}
                                onChange={e => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                                placeholder="5"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Verified Patient</label>
                              <select
                                value={reviewForm.verified}
                                onChange={e => setReviewForm({ ...reviewForm, verified: parseInt(e.target.value) })}
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              >
                                <option value={1}>Verified</option>
                                <option value={0}>Not Verified</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Treated Service</label>
                              <input
                                type="text"
                                required
                                value={reviewForm.service}
                                onChange={e => setReviewForm({ ...reviewForm, service: e.target.value })}
                                placeholder="Physiotherapy"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Attending Doctor</label>
                              <input
                                type="text"
                                required
                                value={reviewForm.doctor}
                                onChange={e => setReviewForm({ ...reviewForm, doctor: e.target.value })}
                                placeholder="Dr. Sarah Ahmed"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Tagline / Highlight</label>
                            <input
                              type="text"
                              required
                              value={reviewForm.tag}
                              onChange={e => setReviewForm({ ...reviewForm, tag: e.target.value })}
                              placeholder="e.g. Life-changing rehabilitation!"
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Review Testimonial Text</label>
                            <textarea
                              rows={3}
                              required
                              value={reviewForm.text}
                              onChange={e => setReviewForm({ ...reviewForm, text: e.target.value })}
                              placeholder="Testimonial details..."
                              className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold resize-none"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Review Source</label>
                              <input
                                type="text"
                                value={reviewForm.source}
                                onChange={e => setReviewForm({ ...reviewForm, source: e.target.value })}
                                placeholder="google / direct"
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Featured Status</label>
                              <select
                                value={reviewForm.featured}
                                onChange={e => setReviewForm({ ...reviewForm, featured: parseInt(e.target.value) })}
                                className="w-full border border-slate-200 bg-white rounded-xl p-2 outline-none focus:border-pink-400 font-semibold"
                              >
                                <option value={0}>Standard Review</option>
                                <option value={15}>Featured on Homepage</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button type="submit" className="flex-grow py-2 bg-slate-900 hover:bg-pink-600 text-white rounded-xl font-bold border-none cursor-pointer">
                              {editingReview ? "Update Review" : "Create Review"}
                            </button>
                            {editingReview && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingReview(null);
                                  setReviewForm({
                                    id: "", name: "", avatar: "", rating: 5, service: "", doctor: "",
                                    date: "", text: "", helpful: 0, verified: 1, tag: "", source: "google", featured: 0
                                  });
                                }}
                                className="px-3 py-2 bg-slate-100 text-slate-500 rounded-xl font-bold border-none cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      <div className="lg:col-span-7 space-y-3 max-h-[450px] overflow-y-auto pr-1 scrollbar-none text-xs text-left">
                        {cmsReviews.map(rev => (
                          <div key={rev.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex justify-between items-center shadow-sm">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-xs text-slate-800">{rev.name}</h4>
                                <span className="text-[8px] text-pink-500 font-black bg-pink-50 px-1.5 py-0.5 rounded">{rev.tag}</span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 font-medium">"{rev.text}"</p>
                              <p className="text-[9px] text-slate-550 mt-1 font-semibold">Service: {rev.service} | Doctor: {rev.doctor} | Rating: {rev.rating}★</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingReview(rev);
                                  setReviewForm(rev);
                                }}
                                className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[9px] font-black border-none cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteReview(rev.id)}
                                className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border-none cursor-pointer"
                              >
                                <FiTrash size={11} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      

      {/* Screen receipt viewer modal */}
      <AnimatePresence>
        {selectedScreenshotModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-2xl w-full text-slate-800 shadow-2xl relative border border-white/50 flex flex-col items-center"
            >
              <button 
                onClick={() => setSelectedScreenshotModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-500 transition-colors border-none cursor-pointer font-bold"
              >
                ✕
              </button>
              <h3 className="font-extrabold text-slate-900 text-sm mb-4 text-center">Proof of Payment Receipt Screenshot</h3>
              <div className="w-full overflow-auto max-h-[70vh] border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center">
                <img 
                  src={selectedScreenshotModal} 
                  alt="Receipt proofs" 
                  className="max-w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Medical Report Viewer Modal */}
      <AnimatePresence>
        {selectedReportModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-4xl w-full text-slate-800 shadow-2xl relative border border-white/50 flex flex-col"
            >
              <button 
                onClick={() => setSelectedReportModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-500 transition-colors border-none cursor-pointer font-bold z-10"
              >
                ✕
              </button>
              <h3 className="font-extrabold text-slate-900 text-sm mb-4 text-center flex items-center gap-1.5 justify-center">
                <FiFileText className="text-sky-500" /> Medical Report: {selectedReportModal.name}
              </h3>
              <div className="w-full overflow-auto max-h-[75vh] border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center p-2 min-h-[300px]">
                {(() => {
                  const reportUrl = selectedReportModal.report.startsWith("data:") || selectedReportModal.report.startsWith("http")
                    ? selectedReportModal.report
                    : `http://localhost:5000${selectedReportModal.report}`;
                  
                  const isImage = reportUrl.startsWith("data:image/") ||
                                  reportUrl.toLowerCase().endsWith(".png") ||
                                  reportUrl.toLowerCase().endsWith(".jpg") ||
                                  reportUrl.toLowerCase().endsWith(".jpeg") ||
                                  reportUrl.toLowerCase().endsWith(".gif");

                  const isPdf = reportUrl.startsWith("data:application/pdf") ||
                                reportUrl.toLowerCase().includes(".pdf");

                  if (isImage) {
                    return (
                      <img 
                        src={reportUrl} 
                        alt="Patient Medical Report" 
                        className="max-w-full max-h-[70vh] object-contain"
                      />
                    );
                  } else if (isPdf) {
                    return (
                      <iframe 
                        src={reportUrl} 
                        className="w-full h-[65vh] rounded-xl border-none"
                        title="Patient Medical Report PDF"
                      />
                    );
                  } else {
                    return (
                      <div className="text-center py-10 flex flex-col items-center gap-4">
                        <FiFileText size={48} className="text-slate-400" />
                        <p className="text-sm font-semibold text-slate-600">This file type ({selectedReportModal.name}) cannot be previewed directly.</p>
                        <a 
                          href={reportUrl} 
                          download={selectedReportModal.name}
                          className="px-6 py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold transition-all"
                          style={{ textDecoration: "none" }}
                        >
                          📥 Download Attached File
                        </a>
                      </div>
                    );
                  }
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Doctor Application Reject/Request Details Modal */}
      {actioningDoctor && (
        <div className="fixed inset-0 z-[310] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative border border-slate-100">
            <button 
              onClick={() => {
                setActioningDoctor(null);
                setActionNote("");
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center text-slate-400 border-none cursor-pointer font-bold"
            >
              ✕
            </button>
            <h3 className="font-extrabold text-slate-800 text-sm mb-2 text-left">
              {actioningDoctor.nextStatus === "Need More Details" ? "Request Additional Details" : "Reject Application"}
            </h3>
            <p className="text-xs text-slate-400 mb-4 text-left">
              Please enter the details/reasons that will be sent as feedback to the applicant:
            </p>
            <textarea
              required
              rows={4}
              value={actionNote}
              onChange={e => setActionNote(e.target.value)}
              placeholder={actioningDoctor.nextStatus === "Need More Details" 
                ? "Specify what files or details are missing (e.g., CV copy needs to be clear)..." 
                : "Reason for rejection..."}
              className="w-full border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-pink-400 bg-slate-50"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setActioningDoctor(null);
                  setActionNote("");
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold border-none cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleActionSubmit}
                disabled={!actionNote.trim()}
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md disabled:bg-slate-300"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Doctor settings control panel modal */}
      {managingDoctor && mgmtForm && (
        <div className="fixed inset-0 z-[280] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl relative border border-slate-100 flex flex-col my-8">
            <button 
              onClick={() => {
                setManagingDoctor(null);
                setMgmtForm(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center text-slate-405 border-none cursor-pointer font-bold"
            >
              ✕
            </button>
            
            <div className="text-left mb-4">
              <h3 className="font-extrabold text-slate-900 text-base">
                Doctor Profile Control Panel
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Configure profile, credentials, and verification status for <span className="font-bold text-slate-800">{mgmtForm.name}</span>
              </p>
            </div>

            {/* Modal Internal Tabs */}
            <div className="flex gap-1.5 border-b border-slate-100 pb-3 mb-4 text-left">
              {[
                { id: "general", label: "General details" },
                { id: "social", label: "Contact & Socials" },
                { id: "verification", label: "Credentials & Status" }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMgmtTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border-none cursor-pointer ${
                    mgmtTab === tab.id 
                      ? "bg-slate-900 text-white shadow-sm" 
                      : "bg-slate-55 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSaveManagedDoctor} className="space-y-4 flex-grow flex flex-col justify-between text-left">
              <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                {mgmtTab === "general" && (
                  <div className="space-y-4">
                    {/* Image override row */}
                    <div className="flex gap-4 items-center p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <img
                        src={mgmtForm.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80"}
                        alt="Preview"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase block">Override Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const b64 = await handleFileToBase64(file);
                              setMgmtForm(prev => ({ ...prev, image: b64 }));
                            }
                          }}
                          className="text-xs text-slate-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Name</label>
                        <input
                          type="text"
                          required
                          value={mgmtForm.name || ""}
                          onChange={e => setMgmtForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Professional Title</label>
                        <input
                          type="text"
                          required
                          value={mgmtForm.title || ""}
                          onChange={e => setMgmtForm(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                          placeholder="e.g. Classified Chiropractor & Consultant"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Specialty</label>
                        <input
                          type="text"
                          required
                          value={mgmtForm.specialty || ""}
                          onChange={e => setMgmtForm(prev => ({ ...prev, specialty: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Consultation Fee (PKR)</label>
                        <input
                          type="text"
                          required
                          value={mgmtForm.fee ? String(mgmtForm.fee).replace(/[^\d]/g, "") : ""}
                          onChange={e => setMgmtForm(prev => ({ ...prev, fee: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                          placeholder="e.g. 3000"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Experience (Years)</label>
                        <input
                          type="text"
                          required
                          value={mgmtForm.experience || ""}
                          onChange={e => setMgmtForm(prev => ({ ...prev, experience: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                          placeholder="e.g. 10 Years"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Branch</label>
                        <select
                          value={Array.isArray(mgmtForm.branch) ? mgmtForm.branch[0] : (mgmtForm.branch || "Blue Area")}
                          onChange={e => setMgmtForm(prev => ({ ...prev, branch: [e.target.value] }))}
                          className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                        >
                          <option value="Blue Area">Blue Area</option>
                          <option value="Blue Area, F-8">Both (Blue Area & F-8)</option>
                          <option value="Gulberg">Gulberg</option>
                          <option value="DHA">DHA</option>
                          <option value="Gulberg, DHA">Both (Gulberg & DHA)</option>
                          <option value="Online">Online / Virtual</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {mgmtTab === "social" && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Contact Email</label>
                      <input
                        type="email"
                        value={mgmtForm.email || ""}
                        onChange={e => setMgmtForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                        placeholder="doctor@physiohub.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">LinkedIn URL</label>
                      <input
                        type="url"
                        value={mgmtForm.social_linkedin || ""}
                        onChange={e => setMgmtForm(prev => ({ ...prev, social_linkedin: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Facebook URL</label>
                      <input
                        type="url"
                        value={mgmtForm.social_facebook || ""}
                        onChange={e => setMgmtForm(prev => ({ ...prev, social_facebook: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                        placeholder="https://facebook.com/username"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Instagram URL</label>
                      <input
                        type="url"
                        value={mgmtForm.social_instagram || ""}
                        onChange={e => setMgmtForm(prev => ({ ...prev, social_instagram: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                        placeholder="https://instagram.com/username"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Twitter URL</label>
                      <input
                        type="url"
                        value={mgmtForm.social_twitter || ""}
                        onChange={e => setMgmtForm(prev => ({ ...prev, social_twitter: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </div>
                )}

                {mgmtTab === "verification" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Administrative Status</label>
                        <select
                          value={mgmtForm.status || "Pending"}
                          onChange={e => setMgmtForm(prev => ({ ...prev, status: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-slate-50 outline-none focus:border-pink-400 font-bold"
                        >
                          <option value="Active">Approved / Active</option>
                          <option value="Pending">Pending Review</option>
                          <option value="Need More Details">Need More Details</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Feedback Note / Reason</label>
                        <textarea
                          rows={2}
                          value={mgmtForm.admin_note || ""}
                          onChange={e => setMgmtForm(prev => ({ ...prev, admin_note: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-slate-50 outline-none focus:border-pink-400"
                          placeholder="Feedback message shown to the specialist regarding their application..."
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                      <p className="font-extrabold text-xs text-slate-800 mb-3 uppercase tracking-wider">Verification Documents</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* CV */}
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">CV Document</p>
                          {mgmtForm.cv_file ? (
                            <div className="flex gap-2 items-center">
                              <span className="text-[11px] text-slate-700 font-bold truncate max-w-[150px]">
                                {mgmtForm.cv_name || "cv_document.pdf"}
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedReportModal({ report: mgmtForm.cv_file, name: mgmtForm.cv_name || "cv_document.pdf" })}
                                className="text-[10px] text-blue-600 hover:underline bg-transparent border-none cursor-pointer font-bold animate-pulse"
                              >
                                Preview
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 block font-medium">No CV uploaded.</span>
                          )}
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const b64 = await handleFileToBase64(file);
                                setMgmtForm(prev => ({ ...prev, cv_file: b64, cv_name: file.name }));
                              }
                            }}
                            className="block w-full text-[10px] text-slate-500 mt-1"
                          />
                        </div>

                        {/* Degrees */}
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Degrees / Education</p>
                          {mgmtForm.degrees_file ? (
                            <div className="flex gap-2 items-center">
                              <span className="text-[11px] text-slate-700 font-bold truncate max-w-[150px]">
                                {mgmtForm.degrees_name || "degrees_cert.pdf"}
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedReportModal({ report: mgmtForm.degrees_file, name: mgmtForm.degrees_name || "degrees_cert.pdf" })}
                                className="text-[10px] text-blue-600 hover:underline bg-transparent border-none cursor-pointer font-bold animate-pulse"
                              >
                                Preview
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 block font-medium">No Degree uploaded.</span>
                          )}
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const b64 = await handleFileToBase64(file);
                                setMgmtForm(prev => ({ ...prev, degrees_file: b64, degrees_name: file.name }));
                              }
                            }}
                            className="block w-full text-[10px] text-slate-500 mt-1"
                          />
                        </div>

                        {/* Certificates */}
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Approved Certificates</p>
                          {mgmtForm.certificates_file ? (
                            <div className="flex gap-2 items-center">
                              <span className="text-[11px] text-slate-700 font-bold truncate max-w-[150px]">
                                {mgmtForm.certificates_name || "certificate.pdf"}
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedReportModal({ report: mgmtForm.certificates_file, name: mgmtForm.certificates_name || "certificate.pdf" })}
                                className="text-[10px] text-blue-600 hover:underline bg-transparent border-none cursor-pointer font-bold animate-pulse"
                              >
                                Preview
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 block font-medium">No Certificate uploaded.</span>
                          )}
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const b64 = await handleFileToBase64(file);
                                setMgmtForm(prev => ({ ...prev, certificates_file: b64, certificates_name: file.name }));
                              }
                            }}
                            className="block w-full text-[10px] text-slate-500 mt-1"
                          />
                        </div>

                        {/* Rewards */}
                        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Approved Rewards</p>
                          {mgmtForm.rewards_file ? (
                            <div className="flex gap-2 items-center">
                              <span className="text-[11px] text-slate-700 font-bold truncate max-w-[150px]">
                                {mgmtForm.rewards_name || "reward.pdf"}
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedReportModal({ report: mgmtForm.rewards_file, name: mgmtForm.rewards_name || "reward.pdf" })}
                                className="text-[10px] text-blue-600 hover:underline bg-transparent border-none cursor-pointer font-bold animate-pulse"
                              >
                                Preview
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 block font-medium">No Rewards uploaded.</span>
                          )}
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const b64 = await handleFileToBase64(file);
                                setMgmtForm(prev => ({ ...prev, rewards_file: b64, rewards_name: file.name }));
                              }
                            }}
                            className="block w-full text-[10px] text-slate-500 mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save footer */}
              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setManagingDoctor(null);
                    setMgmtForm(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-bold border-none cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add User Modal ── */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-2">
                  <FiUsers className="text-pink-500" /> Register Validated Account
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Direct provision of role-based credentials.</p>
              </div>
              <button 
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-400 hover:text-white bg-transparent border-none text-base cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
              {addUserError && (
                <div className="p-3 bg-red-50 text-red-650 rounded-xl text-xs font-semibold">
                  {addUserError}
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">User's Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={addUserForm.name}
                  onChange={e => setAddUserForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@physiohub.com"
                  value={addUserForm.email}
                  onChange={e => setAddUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={addUserForm.password}
                  onChange={e => setAddUserForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">System Role</label>
                <select
                  value={addUserForm.role}
                  onChange={e => setAddUserForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                >
                  <option value="patient">Patient (Standard)</option>
                  <option value="doctor">Doctor (Specialist Specialist)</option>
                  <option value="receptionist">Receptionist (Staff Desk)</option>
                  <option value="admin">Admin (Full Control Access)</option>
                </select>
              </div>

              {addUserForm.role === "doctor" && (
                <div className="p-3 bg-pink-50/50 border border-pink-100 rounded-xl text-[10px] text-pink-700 font-semibold leading-relaxed">
                  NOTE: Registering a Doctor automatically initializes their profile card in the active registry.
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-bold border-none cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md transition-colors"
                >
                  {loading ? "Registering..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit User Modal ── */}
      {showEditUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-2">
                  <FiUsers className="text-pink-500" /> Edit System Account
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Modify profile and roles for {selectedUser?.email}.</p>
              </div>
              <button 
                onClick={() => setShowEditUserModal(false)}
                className="text-slate-400 hover:text-white bg-transparent border-none text-base cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditUserSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
              {editUserError && (
                <div className="p-3 bg-red-50 text-red-650 rounded-xl text-xs font-semibold">
                  {editUserError}
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">User's Name</label>
                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={editUserForm.name}
                  onChange={e => setEditUserForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={editUserForm.email}
                  onChange={e => setEditUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">System Role</label>
                <select
                  value={editUserForm.role}
                  onChange={e => setEditUserForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                >
                  <option value="patient">Patient (Standard)</option>
                  <option value="doctor">Doctor (Specialist Specialist)</option>
                  <option value="receptionist">Receptionist (Staff Desk)</option>
                  <option value="admin">Admin (Full Control Access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditUserModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-bold border-none cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md transition-colors"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Clinic Network Modal ── */}
      {showAddClinicModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] animate-fadeIn">
            <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-2">
                  <FiShield className="text-pink-500" /> Register Clinic Network
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Spin up a clean, partitioned workspace for a new clinic client.</p>
              </div>
              <button 
                onClick={() => setShowAddClinicModal(false)}
                className="text-slate-400 hover:text-white bg-transparent border-none text-base cursor-pointer animate-none"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddClinicSubmit} className="p-6 flex flex-col gap-4 overflow-y-auto">
              {addClinicError && (
                <div className="p-3 bg-red-50 text-red-655 rounded-xl text-xs font-semibold">
                  {addClinicError}
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Clinic Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Physical Therapy"
                  value={addClinicForm.name}
                  onChange={e => setAddClinicForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Clinic Subdomain Slug</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    required
                    placeholder="apexphysio"
                    value={addClinicForm.subdomain}
                    onChange={e => setAddClinicForm(prev => ({ ...prev, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') }))}
                    className="flex-grow border border-slate-200 bg-slate-50/50 focus:bg-white rounded-l-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                  />
                  <span className="bg-slate-100 border border-l-0 border-slate-200 text-slate-500 text-xs px-3 py-3 rounded-r-xl font-bold">
                    .physiohub.com
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Clinic Address</label>
                <input
                  type="text"
                  placeholder="e.g. DHA Phase 2, Islamabad, Pakistan"
                  value={addClinicForm.address}
                  onChange={e => setAddClinicForm(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <hr className="border-slate-100 my-1" />

              <h4 className="text-[10px] font-black text-slate-450 uppercase tracking-widest text-left">Initial Administrator Account</h4>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Admin Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Arthur Pendragon"
                  value={addClinicForm.adminName}
                  onChange={e => setAddClinicForm(prev => ({ ...prev, adminName: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Admin Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="admin@apexphysio.com"
                  value={addClinicForm.adminEmail}
                  onChange={e => setAddClinicForm(prev => ({ ...prev, adminEmail: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Admin Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={addClinicForm.adminPassword}
                  onChange={e => setAddClinicForm(prev => ({ ...prev, adminPassword: e.target.value }))}
                  className="w-full border border-slate-200 bg-slate-50/50 focus:bg-white rounded-xl p-3 text-xs outline-none font-semibold text-slate-700 focus:border-pink-500 transition-colors"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddClinicModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-bold border-none cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer shadow-md transition-colors"
                >
                  {loading ? "Registering..." : "Add Clinic Network"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Application Details Modal */}
      <AnimatePresence>
        {selectedAppModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedAppModal(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-800 shadow-2xl relative border border-slate-100 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedAppModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-500 border-none cursor-pointer font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                  selectedAppModal.type === "membership" ? "bg-purple-100 text-purple-700" : "bg-sky-100 text-sky-700"
                }`}>
                  {selectedAppModal.type === "membership" ? "Clinical Membership Application" : "Physical Therapy Internship Application"}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 mb-1">{selectedAppModal.full_name}</h3>
              <p className="text-xs text-slate-500 mb-4">{selectedAppModal.email} · {selectedAppModal.phone}</p>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2 mb-4">
                {selectedAppModal.plan_tier && <p><span className="text-slate-400 font-semibold">Selected Tier:</span> <strong>{selectedAppModal.plan_tier}</strong></p>}
                {selectedAppModal.duration && <p><span className="text-slate-400 font-semibold">Rotation Duration:</span> <strong>{selectedAppModal.duration}</strong></p>}
                {selectedAppModal.qualification && <p><span className="text-slate-400 font-semibold">Qualification:</span> <strong>{selectedAppModal.qualification}</strong></p>}
                {selectedAppModal.institution && <p><span className="text-slate-400 font-semibold">Institution:</span> <strong>{selectedAppModal.institution}</strong></p>}
                <p><span className="text-slate-400 font-semibold">Status:</span> <strong className="uppercase text-sky-600">{selectedAppModal.status}</strong></p>
              </div>

              {selectedAppModal.cover_letter && (
                <div className="mb-4 space-y-1">
                  <h4 className="text-xs font-black text-slate-700 uppercase">Statement / Notes:</h4>
                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed italic">{selectedAppModal.cover_letter}</p>
                </div>
              )}

              {selectedAppModal.resume_file && (
                <div className="mb-4">
                  <h4 className="text-xs font-black text-slate-700 uppercase mb-2">Resume / CV Attachment:</h4>
                  <a
                    href={selectedAppModal.resume_file.startsWith("data:") ? selectedAppModal.resume_file : `http://localhost:5000${selectedAppModal.resume_file}`}
                    download={selectedAppModal.resume_name || "Resume.pdf"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-xs font-bold no-underline transition-colors shadow-xs"
                  >
                    📥 Download {selectedAppModal.resume_name || "CV File"}
                  </a>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                {selectedAppModal.status !== "Approved" && (
                  <button
                    onClick={() => {
                      handleUpdateAppStatus(selectedAppModal.id, "Approved");
                      setSelectedAppModal(null);
                    }}
                    className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl border-none cursor-pointer"
                  >
                    Approve Candidate
                  </button>
                )}
                {selectedAppModal.status !== "Rejected" && (
                  <button
                    onClick={() => {
                      handleUpdateAppStatus(selectedAppModal.id, "Rejected");
                      setSelectedAppModal(null);
                    }}
                    className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-xl border-none cursor-pointer"
                  >
                    Reject Candidate
                  </button>
                )}
                <button
                  onClick={() => setSelectedAppModal(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border-none cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
