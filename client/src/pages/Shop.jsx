import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiSearch, FiShoppingCart, FiTrash, FiArrowLeft, FiCheck, 
  FiFileText, FiTruck, FiCreditCard, FiPackage, FiInfo, FiTrendingUp 
} from "react-icons/fi";
import { FaPrint, FaRegClipboard } from "react-icons/fa";
import { MdOutlineHealthAndSafety, MdLocalHospital } from "react-icons/md";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";

export default function Shop() {
  const navigate = useNavigate();

  // User auth details
  const isLoggedIn = !!localStorage.getItem("vph_token");
  const defaultName = localStorage.getItem("vph_user_name") || "";
  const defaultEmail = localStorage.getItem("vph_user_email") || "";
  const userRole = localStorage.getItem("vph_user_role");

  // Component states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Cart state
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Checkout modal state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: defaultName,
    email: defaultEmail,
    phone: "",
    address: "",
    paymentMethod: "COD",
    txnRef: "",
    screenshot: ""
  });
  const [screenshotPreview, setScreenshotPreview] = useState(null);

  // Post checkout order success state
  const [placedOrder, setPlacedOrder] = useState(null);

  // Order Tracking state
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackOrderId, setTrackOrderId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackingError, setTrackingError] = useState("");

  const categories = ["All", "Rehabilitation", "Supports & Braces", "Recovery"];

  const loadProducts = async () => {
    setLoading(true);
    try {
      const prods = await api.getProducts();
      setProducts(prods);
    } catch (e) {
      console.error("Failed to load products list:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // Load cart from local storage if exists
    const storedCart = localStorage.getItem("vph_shop_cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (err) {
        console.warn("Could not parse stored cart.");
      }
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("vph_shop_cart", JSON.stringify(newCart));
  };

  const handleAddToCart = (product) => {
    if (userRole === "doctor") {
      alert("Professional accounts (Doctors) cannot place product orders.");
      return;
    }
    if (product.stock <= 0) {
      alert("This item is currently out of stock.");
      return;
    }
    const existing = cart.find(i => i.product_id === product.id);
    let updated;
    if (existing) {
      if (existing.quantity >= product.stock) {
        alert("Cannot add more. Available stock limit reached.");
        return;
      }
      updated = cart.map(i => i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      updated = [...cart, { product_id: product.id, product_name: product.name, price: product.price, image: product.image, quantity: 1, maxStock: product.stock }];
    }
    saveCart(updated);
    setCartOpen(true);
  };

  const handleUpdateCartQty = (productId, change) => {
    const item = cart.find(i => i.product_id === productId);
    if (!item) return;
    const newQty = item.quantity + change;
    if (newQty <= 0) {
      const filtered = cart.filter(i => i.product_id !== productId);
      saveCart(filtered);
    } else {
      if (newQty > item.maxStock) {
        alert("Available stock limit reached.");
        return;
      }
      const updated = cart.map(i => i.product_id === productId ? { ...i, quantity: newQty } : i);
      saveCart(updated);
    }
  };

  const handleRemoveFromCart = (productId) => {
    const filtered = cart.filter(i => i.product_id !== productId);
    saveCart(filtered);
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        alert("Image file size must be less than 1.5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
        setCheckoutForm({ ...checkoutForm, screenshot: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceOrderSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.phone || !checkoutForm.address) {
      alert("Please fill in all the contact details.");
      return;
    }
    if (checkoutForm.paymentMethod !== "COD" && !checkoutForm.screenshot) {
      alert("Please upload transaction proof screenshot for bank transfer.");
      return;
    }

    try {
      setLoading(true);
      const subtotal = getSubtotal();
      const payload = {
        patient_name: checkoutForm.name,
        patient_email: checkoutForm.email,
        shipping_address: checkoutForm.address,
        phone: checkoutForm.phone,
        total_amount: subtotal,
        payment_method: checkoutForm.paymentMethod,
        payment_screenshot: checkoutForm.paymentMethod === "COD" ? null : checkoutForm.screenshot,
        items: cart.map(i => ({
          product_id: i.product_id,
          product_name: i.product_name,
          price: i.price,
          quantity: i.quantity
        }))
      };

      const res = await api.createOrder(payload);
      if (res && res.success) {
        // Set success order object for invoice view
        setPlacedOrder({
          id: res.orderId,
          patient_name: checkoutForm.name,
          patient_email: checkoutForm.email,
          shipping_address: checkoutForm.address,
          phone: checkoutForm.phone,
          total_amount: subtotal,
          payment_method: checkoutForm.paymentMethod,
          payment_status: checkoutForm.paymentMethod === "COD" ? "Unpaid" : "Pending Verification",
          order_status: "Pending",
          created_at: new Date().toLocaleDateString(),
          items: [...cart]
        });

        // Clear cart
        saveCart([]);
        setCheckoutOpen(false);
        // Reset form
        setCheckoutForm({
          name: defaultName,
          email: defaultEmail,
          phone: "",
          address: "",
          paymentMethod: "COD",
          txnRef: "",
          screenshot: ""
        });
        setScreenshotPreview(null);
        loadProducts(); // Refresh stock counts
      } else {
        alert("Failed to submit order. Please try again.");
      }
    } catch (err) {
      alert("Error placing order.");
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrderSubmit = async (e) => {
    e.preventDefault();
    if (!trackOrderId.trim()) return;
    setLoading(true);
    setTrackingError("");
    setTrackedOrder(null);
    try {
      const res = await api.trackOrder(trackOrderId.trim());
      if (res && !res.isHttpError && res.id) {
        setTrackedOrder(res);
      } else {
        setTrackingError(res && res.error ? res.error : "This Order ID does not exist in our systems.");
      }
    } catch (err) {
      setTrackingError("Failed to track order details.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadTrackedProof = async (e) => {
    e.preventDefault();
    if (!trackedOrder || !checkoutForm.screenshot) {
      alert("Please select a screenshot file first.");
      return;
    }
    setLoading(true);
    try {
      const success = await api.submitOrderProof(trackedOrder.id, checkoutForm.paymentMethod, checkoutForm.screenshot);
      if (success) {
        alert("Payment proof uploaded successfully! Awaiting verification.");
        // Reload tracked order details
        const refreshed = await api.trackOrder(trackedOrder.id);
        setTrackedOrder(refreshed);
        setScreenshotPreview(null);
        setCheckoutForm({ ...checkoutForm, screenshot: "" });
      } else {
        alert("Failed to upload payment proof.");
      }
    } catch (err) {
      alert("Error uploading proof.");
    } finally {
      setLoading(false);
    }
  };

  // Filters
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between" style={{ background: "linear-gradient(135deg, #fce4ec 0%, #e0f2fe 60%, #fdf4ff 100%)" }}>
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        .glass-panel {
          background: rgba(255, 255, 255, 0.45) !important;
          backdrop-filter: blur(18px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(18px) saturate(180%) !important;
          border: 1.5px solid rgba(255, 255, 255, 0.55) !important;
          box-shadow: 0 8px 32px -8px rgba(37,99,235,0.08), inset 0 1px 3px rgba(255,255,255,0.7) !important;
        }
        @media print {
          body { background: white !important; color: black !important; margin: 0 !important; padding: 0 !important; }
          nav, footer, .navbar, .footer, .print\\:hidden, .print-hidden { display: none !important; }
          .fixed.inset-0 { position: static !important; background: none !important; backdrop-filter: none !important; padding: 0 !important; display: block !important; }
          .print-invoice-area { position: static !important; width: 100% !important; max-w-none !important; box-shadow: none !important; border: none !important; padding: 0 !important; margin: 0 !important; background: white !important; color: black !important; }
        }
      `}} />

      {/* Main Body */}
      <div className="flex-grow pt-28 pb-16 px-4 print:hidden">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Doctor Warning Banner */}
          {userRole === "doctor" && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-xs font-bold text-left flex items-start gap-2.5 shadow-sm">
              <FiInfo className="text-amber-500 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-extrabold text-amber-900">Doctor Profile Shopping Restriction</p>
                <p className="font-semibold text-amber-800 mt-1 leading-relaxed">
                  Professional doctor profiles are restricted from placing product orders or making purchases. To purchase clinical rehab items, please sign out and sign in with a patient account.
                </p>
              </div>
            </div>
          )}

          {/* Header Banner */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 text-left relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest bg-pink-50 px-2 py-0.5 rounded">Vital Shop</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">Rehab & Recovery Shop</h2>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-lg leading-relaxed">
                Basic physio equipment, posture stabilizers, orthopedic pillows, and healing tools. Easy delivery all across Pakistan.
              </p>
            </div>
            
            <div className="flex gap-3 shrink-0 relative z-10">
              <button 
                onClick={() => {
                  setTrackingOpen(true);
                  setTrackedOrder(null);
                  setTrackingError("");
                }}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold border-none transition-colors shadow flex items-center gap-1.5 cursor-pointer"
              >
                <FiPackage /> Track My Order
              </button>
              
              <button 
                onClick={() => setCartOpen(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold border-none transition-colors shadow flex items-center gap-2 cursor-pointer relative"
              >
                <FiShoppingCart size={14} /> My Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Catalog Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Filter & Search Sidebar */}
            <div className="lg:col-span-3 space-y-4">
              <div className="glass-panel rounded-3xl p-5 space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm text-left">Filter Catalog</h4>
                
                {/* Search */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search equipment..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200/80 rounded-xl py-2 pl-8 pr-3 text-xs outline-none focus:border-blue-400 font-semibold"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-1.5 text-left pt-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border-none text-left transition-colors cursor-pointer ${
                        selectedCategory === cat 
                          ? "bg-slate-900 text-white" 
                          : "bg-transparent text-slate-500 hover:bg-slate-550/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo badge */}
              <div className="glass-panel rounded-3xl p-5 bg-gradient-to-br from-blue-500/10 to-pink-500/10 border border-blue-100 flex items-center gap-3 text-left">
                <MdOutlineHealthAndSafety className="text-blue-500 shrink-0 text-xl" />
                <div>
                  <p className="text-[10px] font-bold text-slate-800">100% Quality Checked</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Sourced from certified medical equipment manufacturers.</p>
                </div>
              </div>
            </div>

            {/* Right Products Grid */}
            <div className="lg:col-span-9">
              {loading ? (
                <div className="w-full py-24 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="glass-panel rounded-3xl p-16 text-center text-slate-400 text-xs font-semibold">
                  No products found matching your filter criteria.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <motion.div 
                      key={product.id}
                      whileHover={{ y: -3 }}
                      className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm bg-white"
                    >
                      {/* Image section */}
                      <div className="w-full h-44 bg-slate-100 relative overflow-hidden">
                        <img 
                          src={product.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80"} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {product.stock <= 0 ? (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Out of Stock</span>
                        ) : product.stock <= 5 ? (
                          <span className="absolute top-3 left-3 bg-amber-550 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Only {product.stock} Left</span>
                        ) : null}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-grow flex flex-col justify-between text-left gap-3">
                        <div className="space-y-1.5">
                          <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest bg-pink-50 px-2 py-0.5 rounded">{product.category}</span>
                          <h4 className="font-extrabold text-sm text-slate-800 leading-snug truncate">{product.name}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-3 leading-normal font-medium">{product.description}</p>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                          <span className="text-sm font-black text-slate-900">₨ {product.price.toLocaleString()}</span>
                          <button
                            disabled={product.stock <= 0 || userRole === "doctor"}
                            onClick={() => handleAddToCart(product)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border-none tracking-wider transition-colors cursor-pointer ${
                              (product.stock <= 0 || userRole === "doctor")
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                                : "bg-slate-900 hover:bg-blue-600 text-white"
                            }`}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* --- CART DRAWER --- */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-[200] overflow-hidden flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            
            {/* Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-md bg-white h-full relative z-10 flex flex-col justify-between p-6 shadow-2xl"
            >
              <div className="space-y-6 flex-grow flex flex-col overflow-hidden">
                <div className="flex justify-between items-center border-b pb-4">
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <FiShoppingCart className="text-blue-500" /> Shopping Cart
                  </h3>
                  <button onClick={() => setCartOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border-none cursor-pointer flex items-center justify-center font-bold">✕</button>
                </div>

                {cart.length === 0 ? (
                  <div className="flex-grow flex flex-col items-center justify-center text-slate-400 text-xs font-semibold gap-2">
                    <FiShoppingCart size={32} />
                    Your cart is currently empty.
                  </div>
                ) : (
                  <div className="flex-grow overflow-y-auto space-y-4 pr-1 scrollbar-none">
                    {cart.map(item => (
                      <div key={item.product_id} className="border border-slate-100 rounded-2xl p-3 flex gap-3 text-left shadow-xs bg-slate-50/50">
                        <img src={item.image} alt={item.product_name} className="w-16 h-16 rounded-xl object-cover border border-white" />
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-extrabold text-xs text-slate-800 leading-tight line-clamp-1">{item.product_name}</h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">₨ {item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center border rounded-lg bg-white p-0.5">
                              <button onClick={() => handleUpdateCartQty(item.product_id, -1)} className="px-2 border-none bg-transparent hover:bg-slate-100 rounded text-xs font-bold cursor-pointer">-</button>
                              <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                              <button onClick={() => handleUpdateCartQty(item.product_id, 1)} className="px-2 border-none bg-transparent hover:bg-slate-100 rounded text-xs font-bold cursor-pointer">+</button>
                            </div>
                            
                            <button onClick={() => handleRemoveFromCart(item.product_id)} className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-500 border-none cursor-pointer">
                              <FiTrash size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t pt-4 space-y-4 bg-white">
                  <div className="flex justify-between font-black text-slate-850 text-sm">
                    <span>Subtotal:</span>
                    <span>₨ {getSubtotal().toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (userRole === "doctor") {
                        alert("Professional accounts (Doctors) cannot place product orders.");
                        return;
                      }
                      setCheckoutOpen(true);
                      setCartOpen(false);
                    }}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider border-none shadow transition-colors cursor-pointer"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CHECKOUT MODAL --- */}
      <AnimatePresence>
        {checkoutOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full text-slate-800 shadow-2xl relative border border-slate-150 flex flex-col justify-between max-h-[90vh]"
            >
              <button 
                onClick={() => setCheckoutOpen(false)} 
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border-none cursor-pointer flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="flex-grow overflow-y-auto pr-1 scrollbar-none text-left space-y-5">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <FiCreditCard className="text-blue-500" /> Checkout Order Details
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Please provide shipping address and select checkout options.</p>
                </div>

                <form onSubmit={handlePlaceOrderSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={checkoutForm.name}
                        onChange={e => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                        className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-blue-400"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={checkoutForm.email}
                        onChange={e => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                        className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-blue-400"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Phone Number</label>
                      <input 
                        type="text" 
                        required
                        value={checkoutForm.phone}
                        onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                        className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-blue-400"
                        placeholder="e.g. +92 300 1234567"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Payment Method</label>
                      <select 
                        value={checkoutForm.paymentMethod}
                        onChange={e => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                        className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-blue-400 font-semibold"
                      >
                        <option value="COD">Cash on Delivery (COD)</option>
                        <option value="Easypaisa">Easypaisa (0341-7388830)</option>
                        <option value="SadePay">SadePay (0341-7388830)</option>
                        <option value="Bank Transfer">HBL Bank Transfer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Shipping & Delivery Address</label>
                    <textarea 
                      rows={2.5}
                      required
                      value={checkoutForm.address}
                      onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-blue-400 resize-none"
                      placeholder="Street No, Area name, City name..."
                    />
                  </div>

                  {/* Manual Payment verification info */}
                  {checkoutForm.paymentMethod !== "COD" && (
                    <div className="border border-blue-100 rounded-2xl p-4 bg-slate-50/60 space-y-3">
                      <div className="flex gap-2 text-xs font-semibold text-slate-650">
                        <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-slate-800">Direct Deposit Credentials</p>
                          {checkoutForm.paymentMethod === "Bank Transfer" ? (
                            <p className="mt-0.5">HBL Bank · Account Number: 1234567890 · Title: Vital Physio Hub</p>
                          ) : (
                            <p className="mt-0.5">{checkoutForm.paymentMethod} account: 0341-7388830 (Dr. Syed Jellan Shah)</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="text-[9px] font-bold text-slate-450 uppercase block mb-1">Transaction Ref / ID</label>
                          <input 
                            type="text" 
                            value={checkoutForm.txnRef}
                            onChange={e => setCheckoutForm({ ...checkoutForm, txnRef: e.target.value })}
                            className="w-full border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none"
                            placeholder="TXN-99820A"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-slate-455 uppercase block mb-1">Upload Receipt Screenshot</label>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleScreenshotChange}
                            className="w-full text-xs"
                          />
                        </div>
                      </div>
                      {screenshotPreview && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 mt-2">
                          <img src={screenshotPreview} alt="Receipt proof preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-slate-100 font-bold">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase leading-none">Total Bill:</p>
                      <p className="text-base text-slate-900 font-black mt-0.5">₨ {getSubtotal().toLocaleString()}</p>
                    </div>
                    <button 
                      type="submit" 
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold border-none shadow transition-colors cursor-pointer"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ORDER PLACED SUCCESS / INVOICE VIEW --- */}
      <AnimatePresence>
        {placedOrder && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full text-slate-800 shadow-2xl relative border border-slate-100 print-invoice-area flex flex-col justify-between max-h-[90vh]"
            >
              <button 
                onClick={() => setPlacedOrder(null)} 
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border-none cursor-pointer flex items-center justify-center text-slate-500 font-bold print:hidden"
              >
                ✕
              </button>

              <div className="flex-grow overflow-y-auto pr-1 scrollbar-none">
                
                {/* Brand Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-100 pb-5 mb-6 text-left">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                      <MdLocalHospital className="text-blue-600 shrink-0" /> VITAL PHYSIO HUB
                    </h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Physiotherapy & Rehab E-commerce</p>
                    <p className="text-xs text-slate-500 mt-2">Plaza 56, Block L, Blue Area, Islamabad</p>
                  </div>
                  <div className="text-right">
                    <h4 className="font-extrabold text-xs text-slate-800 bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full inline-block">Order Placed</h4>
                    <p className="text-[10px] text-pink-500 font-black uppercase tracking-wider mt-1.5">Order ID: {placedOrder.id}</p>
                    <p className="text-xs text-slate-500 mt-1">Date: {placedOrder.created_at}</p>
                  </div>
                </div>

                {/* Customer Details info */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-left mb-6 font-semibold">
                  <div><span className="text-slate-400">Customer Name:</span> {placedOrder.patient_name}</div>
                  <div><span className="text-slate-400">Email Address:</span> {placedOrder.patient_email}</div>
                  <div><span className="text-slate-400">Phone Number:</span> {placedOrder.phone}</div>
                  <div><span className="text-slate-400">Payment Mode:</span> {placedOrder.payment_method} ({placedOrder.payment_status})</div>
                  <div className="sm:col-span-2 mt-1.5 pt-1.5 border-t border-slate-200/50">
                    <span className="text-slate-400">Shipping Address:</span> {placedOrder.shipping_address}
                  </div>
                </div>

                {/* Item List */}
                <div className="text-left space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Invoice Items List</p>
                  <table className="w-full text-xs sm:text-sm text-left text-slate-650">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase text-[9px] tracking-wider font-bold">
                        <th className="py-2">Item Name</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-right">Price</th>
                        <th className="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {placedOrder.items.map((item, idx) => (
                        <tr key={idx} className="border-b border-slate-100 font-semibold">
                          <td className="py-3 font-bold text-slate-800">{item.product_name}</td>
                          <td className="text-center text-slate-600">{item.quantity}</td>
                          <td className="text-right">₨ {item.price.toLocaleString()}</td>
                          <td className="text-right text-slate-900">₨ {(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-6 mt-6 text-left">
                  <span className="text-[10px] text-slate-400 font-semibold">🛡 Vital Physio Hub Automated E-Invoice</span>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Grand Total:</span>
                    <p className="text-lg font-black text-slate-900 mt-0.5">₨ {placedOrder.total_amount.toLocaleString()}</p>
                  </div>
                </div>

              </div>

              <div className="flex justify-center gap-3 mt-8 print:hidden">
                <button 
                  onClick={() => window.print()} 
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border-none shadow-md"
                >
                  <FaPrint /> Print / Save Invoice
                </button>
                <button 
                  onClick={() => setPlacedOrder(null)} 
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border-none"
                >
                  Close View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- TRACK ORDER TIMELINE MODAL --- */}
      <AnimatePresence>
        {trackingOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full text-slate-800 shadow-2xl relative border border-slate-150 flex flex-col justify-between max-h-[90vh]"
            >
              <button 
                onClick={() => setTrackingOpen(false)} 
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 border-none cursor-pointer flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="flex-grow overflow-y-auto pr-1 scrollbar-none text-left space-y-6">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <FiPackage className="text-blue-500" /> Order Tracking Terminal
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Enter your unique Order ID to track shipping & delivery milestones.</p>
                </div>

                <form onSubmit={handleTrackOrderSubmit} className="flex gap-2">
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. ORD-12345"
                    value={trackOrderId}
                    onChange={e => setTrackOrderId(e.target.value)}
                    className="flex-grow border border-slate-200 bg-white rounded-xl p-2.5 text-xs outline-none focus:border-blue-400 font-semibold uppercase"
                  />
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold border-none transition-colors cursor-pointer"
                  >
                    Track Status
                  </button>
                </form>

                {trackingError && (
                  <p className="text-xs text-rose-500 font-semibold bg-rose-50 p-2.5 rounded-lg">{trackingError}</p>
                )}

                {trackedOrder && (
                  <div className="space-y-6 pt-3 border-t border-slate-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-800">Order Reference {trackedOrder.id}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Shipment for {trackedOrder.patient_name} · Total: ₨ {trackedOrder.total_amount.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => {
                          setPlacedOrder(trackedOrder);
                          setTrackingOpen(false);
                        }}
                        className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-[10px] font-black border-none flex items-center gap-1 cursor-pointer"
                      >
                        <FiFileText /> View Invoice
                      </button>
                    </div>

                    {/* Progress tracker timeline */}
                    <div className="relative pl-6 space-y-6">
                      <div className="absolute left-[7px] top-1.5 bottom-1.5 w-0.5 bg-slate-200" />
                      
                      {[
                        { stage: "Pending", desc: "Order submitted to shop registry." },
                        { stage: "Processing", desc: "Invoice paid / COD verified, package preparing." },
                        { stage: "Shipped", desc: "Courier dispatched tracking index." },
                        { stage: "Delivered", desc: "Delivery complete." }
                      ].map((step, idx) => {
                        const stages = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
                        const orderIdx = stages.indexOf(trackedOrder.order_status);
                        const stepIdx = stages.indexOf(step.stage);
                        const isDone = trackedOrder.order_status === "Cancelled" && step.stage === "Pending" ? true : (trackedOrder.order_status === "Cancelled" ? false : stepIdx <= orderIdx);
                        const isCurrent = trackedOrder.order_status === step.stage;

                        return (
                          <div key={idx} className="relative flex gap-3 text-left">
                            <div className={`absolute -left-6 w-3.5 h-3.5 rounded-full border-2 ${
                              isCurrent ? "bg-pink-500 border-pink-200 scale-120 animate-pulse" :
                              isDone ? "bg-emerald-500 border-emerald-100" : "bg-white border-slate-300"
                            }`} />
                            <div>
                              <p className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? "text-pink-600 font-extrabold" : "text-slate-800"}`}>
                                {step.stage} {isCurrent && "· Current Status"}
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Allow uploading proof if unpaid and bank transfer */}
                    {trackedOrder.payment_status === "Unpaid" && trackedOrder.payment_method !== "COD" && (
                      <div className="border border-amber-100 rounded-2xl p-4 bg-amber-50/40 space-y-3">
                        <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                          <FiInfo /> Proof of payment is pending!
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Please deposit ₨ {trackedOrder.total_amount.toLocaleString()} via {trackedOrder.payment_method} to account <strong>0341-7388830</strong>, then upload proof.
                        </p>
                        <form onSubmit={handleUploadTrackedProof} className="space-y-3 pt-2">
                          <input 
                            type="file" 
                            accept="image/*"
                            required
                            onChange={handleScreenshotChange}
                            className="text-xs block w-full"
                          />
                          {screenshotPreview && (
                            <div className="w-12 h-12 rounded overflow-hidden border border-slate-200">
                              <img src={screenshotPreview} alt="Receipt proof review" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <button 
                            type="submit" 
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-bold border-none transition-colors cursor-pointer"
                          >
                            Submit Payment Proof Screenshot
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
