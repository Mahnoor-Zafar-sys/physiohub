import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiCalendar, FiClock, FiFileText, FiDollarSign, 
  FiCheckCircle, FiXCircle, FiTrendingUp, FiActivity, 
  FiPlus, FiTrash, FiShield, FiAlertTriangle, FiCheck, FiChevronRight, FiList, FiPackage, FiShoppingCart
} from "react-icons/fi";
import { FaUserMd, FaHospitalUser, FaUserCog, FaCreditCard, FaPrint } from "react-icons/fa";
import { MdOutlineHealthAndSafety, MdVerifiedUser } from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

export default function AdminPanel() {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("vph_user_role") || "admin";
  const userName = localStorage.getItem("vph_user_name") || "Director Admin";

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
  const [logs, setLogs] = useState([
    { time: "10:30 AM", event: "Billing Invoice INV-5002 marked as paid." },
    { time: "11:00 AM", event: "Appointment scheduled with Dr. Omar Farooq." }
  ]);

  // Form states
  const [newDoctor, setNewDoctor] = useState({ name: "", specialty: "", fee: "", branch: "Gulberg", image: "", experience: "", title: "" });
  const [articleForm, setArticleForm] = useState({ title: "", excerpt: "", content: "", category: "General Health", image: "" });
  
  // Shop states
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: "", category: "Rehabilitation", price: "", description: "", stock: "", image: "" });
  const [selectedOrderFilter, setSelectedOrderFilter] = useState("All");
  const [adminOrderNotes, setAdminOrderNotes] = useState({});

  const [adminNotes, setAdminNotes] = useState({});
  const [selectedScreenshotModal, setSelectedScreenshotModal] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Website CMS States ---
  const [cmsSettings, setCmsSettings] = useState({
    clinic_phone: "",
    clinic_email: "",
    clinic_address: "",
    clinic_hours: "",
    ambulance_phone: "",
    why_us_headline: "",
    why_us_description: ""
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
    why_us_description: ""
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

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialty) return;
    try {
      setLoading(true);
      const docName = newDoctor.name.startsWith("Dr.") ? newDoctor.name : `Dr. ${newDoctor.name}`;
      const doc = await api.createDoctor({
        name: docName,
        specialty: newDoctor.specialty,
        fee: `₨ ${newDoctor.fee || "2,500"}`,
        branch: newDoctor.branch,
        image: newDoctor.image,
        experience: newDoctor.experience,
        title: newDoctor.title
      });
      if (doc) {
        addSystemLog(`New specialist ${docName} registered under ${newDoctor.specialty}.`);
        setNewDoctor({ name: "", specialty: "", fee: "", branch: "Gulberg", image: "", experience: "", title: "" });
        alert("New specialist added to registry!");
        loadData();
      }
    } catch (err) {
      alert("Error adding doctor.");
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
    if (!articleForm.title || !articleForm.content) return;
    try {
      setLoading(true);
      const art = await api.createArticle({
        title: articleForm.title,
        excerpt: articleForm.excerpt || articleForm.content.slice(0, 100) + "...",
        content: articleForm.content,
        category: articleForm.category,
        author: userName,
        image: articleForm.image
      });
      if (art) {
        addSystemLog(`Clinical Article Published: "${art.title}"`);
        setArticleForm({ title: "", excerpt: "", content: "", category: "General Health", image: "" });
        alert("Clinical article published successfully!");
        loadData();
      }
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

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
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
                  <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest block mt-1">{userRole} Portal</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                {/* Admin Tabs */}
                {userRole === "admin" && [
                  { id: "analytics", label: "Analytical Center", icon: FiTrendingUp },
                  { id: "payments", label: "Payment Verification", icon: FaCreditCard },
                  { id: "doctor-crud", label: "Doctor Registry", icon: FaUserMd },
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
            {activeTab === "analytics" && (
              <div className="space-y-6 text-left flex-grow">
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FiTrendingUp className="text-pink-500" /> Administrative Analytical Center
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time indicators mapping clinical operations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Total Operations Revenue", val: "₨ 890,200", change: "+14.5% this mo." },
                    { label: "Active Registrations", val: "2,400+", change: "+8% growth index" },
                    { label: "Satisfaction Index", val: "98.2%", change: "Based on 1.2k surveys" },
                  ].map((metric, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 font-semibold shadow-sm">
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">{metric.label}</p>
                      <p className="text-lg font-extrabold text-slate-800">{metric.val}</p>
                      <p className="text-[9px] text-emerald-600 mt-0.5">{metric.change}</p>
                    </div>
                  ))}
                </div>

                <div className="border border-slate-100 rounded-3xl p-5 space-y-4 bg-white/30">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Revenue & Case Inflow Curve</p>
                  <div className="relative w-full h-44 bg-slate-50 rounded-xl overflow-hidden p-2 flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                      <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                      <path d="M0,80 Q70,40 140,65 T280,30 T420,50 T500,10" fill="none" stroke="url(#chartGrad)" strokeWidth="3" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#e91e8c" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute bottom-1 left-0 right-0 px-2 flex justify-between text-[8px] font-black text-slate-400 uppercase">
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
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
            )}

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
                <div>
                  <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                    <FaUserMd className="text-pink-500" /> Specialist Doctor Registry & Applications
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Manage doctor profile status, approve sign-up applications or register new specialists.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Add Doctor Form */}
                  <div className="md:col-span-1 border border-slate-100 rounded-3xl p-5 bg-slate-50/50">
                    <h4 className="font-black text-slate-800 text-sm mb-4">Register Doctor</h4>
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
                          placeholder="Gulberg, DHA" 
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
                      <button type="submit" className="w-full py-3 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer mt-2 shadow-md">
                        Add Specialist
                      </button>
                    </form>
                  </div>

                  {/* Doctor registry listings */}
                  <div className="md:col-span-2 space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-none">
                    {doctorsList.map(doc => (
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
                        <div className="flex items-center gap-2">
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                        <label className="text-[9px] font-bold text-slate-400 block mb-1">Excerpt</label>
                        <input 
                          type="text" 
                          value={articleForm.excerpt}
                          onChange={e => setArticleForm({...articleForm, excerpt: e.target.value})}
                          placeholder="Short summary..." 
                          className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-pink-400"
                        />
                      </div>
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
                      <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-pink-600 text-white rounded-xl text-xs font-bold border-none cursor-pointer mt-2 shadow-md">
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
                  <p className="text-xs text-slate-400 mt-0.5">Check in scheduled patients, track current waiting times, and manage active consultation rooms.</p>
                </div>

                <div className="space-y-3">
                  {appointments.filter(appt => appt.status !== "Cancelled").length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-dashed rounded-3xl text-slate-400 text-xs">
                      No active appointments to check in.
                    </div>
                  ) : (
                    appointments.filter(appt => appt.status !== "Cancelled").map(appt => (
                      <div key={appt.id} className="border border-slate-100 bg-white/40 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
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
                                placeholder="Gulberg, Lahore"
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

      <Footer />

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
    </div>
  );
}
