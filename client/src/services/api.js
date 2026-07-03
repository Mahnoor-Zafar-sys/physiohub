const API_BASE_URL = "http://localhost:5000/api";

// Base helper for handling fetch connections with local storage fallback
async function apiCall(endpoint, method = "GET", body = null, customHeaders = {}) {
  let res;
  try {
    const token = localStorage.getItem("vph_token");
    const clinicId = localStorage.getItem("vph_clinic_id") || "1";
    const headers = { 
      "Content-Type": "application/json",
      "x-clinic-id": clinicId,
      ...customHeaders
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const options = {
      method,
      headers
    };
    if (body) options.body = JSON.stringify(body);
    
    res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  } catch (e) {
    // Network/Connection failure (server is offline or unreachable)
    console.warn(`MySQL Backend API Fallback triggered for ${endpoint}: ${e.message}`);
    return null; // Return null so the caller falls back to localStorage/mock validation
  }

  // Server responded, handle HTTP validation/server errors
  if (!res.ok) {
    let errMsg = `HTTP Error ${res.status}`;
    try {
      const errBody = await res.json();
      if (errBody && errBody.error) {
        errMsg = errBody.error;
      }
    } catch (_) {}
    return { success: false, error: errMsg, isHttpError: true };
  }

  try {
    return await res.json();
  } catch (e) {
    return null;
  }
}

export const api = {
  // Login Authentication
  login: async (email, password, role) => {
    const res = await apiCall("/auth/login", "POST", { email, password, role });
    if (res && res.isHttpError) {
      return res; // Return validation failure directly, bypassing mock fallback
    }
    if (res && res.success) {
      localStorage.setItem("vph_token", res.token);
      localStorage.setItem("vph_user_role", res.user.role);
      localStorage.setItem("vph_user_name", res.user.name);
      localStorage.setItem("vph_user_email", res.user.email);
      // backward compat
      localStorage.setItem("pc_user_role", res.user.role);
      localStorage.setItem("pc_user_name", res.user.name);
      return res;
    }
    // Fallback local validation
    const expectedEmail = role === "patient" ? "patient@physiohub.com" :
                          role === "doctor" ? "doctor@physiohub.com" :
                          role === "admin" ? "admin@physiohub.com" : "staff@physiohub.com";
    if (email !== expectedEmail || (password !== "password123" && password !== "••••••••")) {
      return {
        success: false,
        error: `Authentication failed. Correct email for this role is '${expectedEmail}' and password is 'password123'`
      };
    }
    localStorage.setItem("vph_token", "mock-jwt-session-token");
    localStorage.setItem("vph_user_role", role);
    localStorage.setItem("vph_user_name", role === "patient" ? "Jane Doe" : role === "doctor" ? "Dr. Sarah Ahmed" : role === "admin" ? "Director Admin" : "Reception Desk");
    localStorage.setItem("vph_user_email", email);
    localStorage.setItem("pc_user_role", role);
    localStorage.setItem("pc_user_name", localStorage.getItem("vph_user_name"));
    return {
      success: true,
      token: "mock-jwt-session-token",
      user: { email, role, name: localStorage.getItem("vph_user_name") }
    };
  },

  signup: async (signupData) => {
    const res = await apiCall("/auth/signup", "POST", signupData);
    if (res && res.isHttpError) {
      return res; // Return validation failure directly, bypassing mock fallback
    }
    if (res && res.success) return res;
    // Fallback simulation
    await new Promise(r => setTimeout(r, 600));
    return { success: true };
  },

  updateAppointmentPaymentProof: async (id, method, screenshot) => {
    const res = await apiCall("/appointments/proof", "POST", { id, method, screenshot });
    if (res && res.success) return true;
    
    // Fallback simulation
    const local = localStorage.getItem("pc_appts");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(appt => 
        appt.id === id 
          ? { ...appt, payment_status: "Pending Verification", payment_method: method, payment_screenshot: screenshot } 
          : appt
      );
      localStorage.setItem("pc_appts", JSON.stringify(updated));
    }
    return true;
  },

  // Appointments
  getAppointments: async () => {
    const res = await apiCall("/appointments");
    if (res) {
      localStorage.setItem("pc_appts", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_appts");
    return local ? JSON.parse(local) : [];
  },

  createAppointment: async (apptData) => {
    const res = await apiCall("/appointments", "POST", apptData);
    if (res && res.success) {
      return res.appointment;
    }
    const local = localStorage.getItem("pc_appts");
    const current = local ? JSON.parse(local) : [];
    const newAppt = {
      id: `PC-${Date.now().toString().slice(-5)}`,
      doctor: apptData.doctor,
      date: apptData.date,
      time: apptData.time,
      type: apptData.type,
      branch: apptData.branch,
      status: apptData.status || "Pending",
      patient: apptData.patient || "Jane Doe",
      payment_status: apptData.payment_status || "Pending Verification",
      payment_method: apptData.payment_method || null,
      payment_screenshot: apptData.payment_screenshot || null,
      admin_note: null,
      patient_report: apptData.patient_report || null,
      patient_report_name: apptData.patient_report_name || null
    };
    const updated = [newAppt, ...current];
    localStorage.setItem("pc_appts", JSON.stringify(updated));
    return newAppt;
  },

  updateAppointmentStatus: async (id, status, date = null, time = null) => {
    const res = await apiCall("/appointments/status", "POST", { id, status, date, time });
    if (res && res.success) return true;
    
    const local = localStorage.getItem("pc_appts");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(appt => 
        appt.id === id 
          ? { ...appt, status, ...(date ? { date } : {}), ...(time ? { time } : {}) } 
          : appt
      );
      localStorage.setItem("pc_appts", JSON.stringify(updated));
    }
    return true;
  },

  // EMR records
  getEMR: async (patientName) => {
    const res = await apiCall(`/emr/${patientName}`);
    if (res) {
      localStorage.setItem("pc_emr", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_emr");
    return local ? JSON.parse(local) : [];
  },

  createEMR: async (emrData) => {
    const res = await apiCall("/emr", "POST", emrData);
    if (res && res.success) {
      return res.record;
    }
    const local = localStorage.getItem("pc_emr");
    const current = local ? JSON.parse(local) : [];
    const newRec = {
      id: `EMR-${Date.now().toString().slice(-3)}`,
      date: new Date().toISOString().split("T")[0],
      doctor: emrData.doctor,
      diagnosis: emrData.diagnosis,
      vitals: emrData.vitals || "BP: 120/80, Temp: 98.6°F",
      assessment: emrData.assessment
    };
    const updated = [newRec, ...current];
    localStorage.setItem("pc_emr", JSON.stringify(updated));
    return newRec;
  },

  // Prescriptions
  getPrescriptions: async (patientName) => {
    const res = await apiCall(`/prescriptions/${patientName}`);
    if (res) {
      localStorage.setItem("pc_rx", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_rx");
    return local ? JSON.parse(local) : [];
  },

  createPrescription: async (rxData) => {
    const res = await apiCall("/prescriptions", "POST", rxData);
    if (res && res.success) {
      return res.prescription;
    }
    const local = localStorage.getItem("pc_rx");
    const current = local ? JSON.parse(local) : [];
    const newRx = {
      id: `RX-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split("T")[0],
      doctor: rxData.doctor,
      medicine: rxData.medicine,
      dosage: rxData.dosage,
      duration: rxData.duration || "7 Days",
      instructions: rxData.instructions || "After meals",
      status: "Active"
    };
    const updated = [newRx, ...current];
    localStorage.setItem("pc_rx", JSON.stringify(updated));
    return newRx;
  },

  // Invoices
  getInvoices: async (patientName) => {
    const res = await apiCall(`/invoices/${patientName}`);
    if (res) {
      localStorage.setItem("pc_invs", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_invs");
    return local ? JSON.parse(local) : [];
  },

  createInvoice: async (invData) => {
    const res = await apiCall("/invoices", "POST", invData);
    if (res && res.success) {
      return res.invoice;
    }
    const local = localStorage.getItem("pc_invs");
    const current = local ? JSON.parse(local) : [];
    const newInv = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      description: invData.description,
      amount: invData.amount,
      status: invData.status || "Unpaid",
      date: new Date().toISOString().split("T")[0]
    };
    const updated = [newInv, ...current];
    localStorage.setItem("pc_invs", JSON.stringify(updated));
    return newInv;
  },

  payInvoice: async (id) => {
    const res = await apiCall("/invoices/pay", "POST", { id });
    if (res && res.success) return true;
    
    const local = localStorage.getItem("pc_invs");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(inv => inv.id === id ? { ...inv, status: "Paid" } : inv);
      localStorage.setItem("pc_invs", JSON.stringify(updated));
    }
    return true;
  },

  // Doctors crud
  getDoctors: async () => {
    const res = await apiCall("/doctors");
    if (res) {
      localStorage.setItem("pc_doctors", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_doctors");
    return local ? JSON.parse(local) : [];
  },

  createDoctor: async (docData) => {
    const res = await apiCall("/doctors", "POST", docData);
    if (res && res.success) {
      return res.doctor;
    }
    const local = localStorage.getItem("pc_doctors");
    const current = local ? JSON.parse(local) : [];
    const newDoc = {
      id: current.length + 1,
      name: docData.name,
      specialty: docData.specialty,
      fee: docData.fee,
      branch: docData.branch,
      status: "Active",
      image: docData.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      experience: docData.experience || "10 Years",
      rating: docData.rating || 4.80,
      title: docData.title || "Consultant Specialist",
      slug: docData.slug || docData.name.toLowerCase().replace(/\s+/g, "-"),
      available: 1
    };
    const updated = [...current, newDoc];
    localStorage.setItem("pc_doctors", JSON.stringify(updated));
    return newDoc;
  },

  toggleDoctorStatus: async (id, status, admin_note = null) => {
    const res = await apiCall("/doctors/status", "POST", { id, status, admin_note });
    if (res && res.success) return true;
    
    const local = localStorage.getItem("pc_doctors");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(doc => doc.id === id ? { ...doc, status, admin_note } : doc);
      localStorage.setItem("pc_doctors", JSON.stringify(updated));
    }
    return true;
  },

  resubmitDoctorApplication: async (resubmitData) => {
    const res = await apiCall("/doctors/resubmit", "POST", resubmitData);
    if (res && res.success) return res;
    
    const local = localStorage.getItem("pc_doctors");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(doc => {
        const match = (resubmitData.id && doc.id === resubmitData.id) || 
                      (resubmitData.email && doc.email?.toLowerCase() === resubmitData.email.toLowerCase());
        if (match) {
          const docUpdated = {
            ...doc,
            status: "Pending",
            admin_note: null
          };
          if (resubmitData.cv_file !== undefined) {
            docUpdated.cv_file = resubmitData.cv_file;
            docUpdated.cv_name = resubmitData.cv_name || null;
          }
          if (resubmitData.certificates_file !== undefined) {
            docUpdated.certificates_file = resubmitData.certificates_file;
            docUpdated.certificates_name = resubmitData.certificates_name || null;
          }
          if (resubmitData.degrees_file !== undefined) {
            docUpdated.degrees_file = resubmitData.degrees_file;
            docUpdated.degrees_name = resubmitData.degrees_name || null;
          }
          if (resubmitData.rewards_file !== undefined) {
            docUpdated.rewards_file = resubmitData.rewards_file;
            docUpdated.rewards_name = resubmitData.rewards_name || null;
          }
          return docUpdated;
        }
        return doc;
      });
      localStorage.setItem("pc_doctors", JSON.stringify(updated));
    }
    return { success: true };
  },

  updateDoctor: async (id, docData) => {
    const res = await apiCall("/doctors/update", "POST", { id, ...docData });
    if (res && res.success) return true;
    
    const local = localStorage.getItem("pc_doctors");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(doc => doc.id === id ? { ...doc, ...docData } : doc);
      localStorage.setItem("pc_doctors", JSON.stringify(updated));
    }
    return true;
  },

  deleteDoctor: async (id) => {
    const res = await apiCall(`/doctors/${id}`, "DELETE");
    if (res && res.success) return true;
    
    const local = localStorage.getItem("pc_doctors");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.filter(doc => doc.id !== id);
      localStorage.setItem("pc_doctors", JSON.stringify(updated));
    }
    return true;
  },

  approvePayment: async (id, status, note) => {
    const res = await apiCall("/appointments/approve-payment", "POST", { id, status, admin_note: note });
    if (res && res.success) return true;

    // Fallback
    const local = localStorage.getItem("pc_appts");
    if (local) {
      const current = JSON.parse(local);
      const targetPaymentStatus = status === "Paid" ? "Paid" : "Rejected";
      const targetApptStatus = status === "Paid" ? "Confirmed" : "Cancelled";
      const updated = current.map(appt => 
        appt.id === id 
          ? { ...appt, payment_status: targetPaymentStatus, status: targetApptStatus, admin_note: note || null } 
          : appt
      );
      localStorage.setItem("pc_appts", JSON.stringify(updated));
    }
    return true;
  },

  // Articles Crud
  getArticles: async () => {
    const res = await apiCall("/articles");
    if (res) {
      localStorage.setItem("pc_articles", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_articles");
    return local ? JSON.parse(local) : [];
  },

  createArticle: async (artData) => {
    const res = await apiCall("/articles", "POST", artData);
    if (res && res.success) {
      return res.article;
    }
    const local = localStorage.getItem("pc_articles");
    const current = local ? JSON.parse(local) : [];
    const newArt = {
      id: Date.now(),
      title: artData.title,
      excerpt: artData.excerpt,
      content: artData.content,
      html_content: artData.html_content || null,
      category: artData.category || "General Health",
      author: artData.author || "Director Admin",
      image: artData.image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80"
    };
    const updated = [newArt, ...current];
    localStorage.setItem("pc_articles", JSON.stringify(updated));
    return newArt;
  },

  deleteArticle: async (id) => {
    const res = await apiCall(`/articles/${id}`, "DELETE");
    if (res && res.success) return true;

    const local = localStorage.getItem("pc_articles");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.filter(art => art.id !== id);
      localStorage.setItem("pc_articles", JSON.stringify(updated));
    }
    return true;
  },

  // Comments Crud
  getComments: async () => {
    const res = await apiCall("/comments");
    if (res) {
      localStorage.setItem("pc_comments", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_comments");
    return local ? JSON.parse(local) : [];
  },

  createComment: async (commData) => {
    const res = await apiCall("/comments", "POST", commData);
    if (res && res.success) {
      return res.comment;
    }
    const local = localStorage.getItem("pc_comments");
    const current = local ? JSON.parse(local) : [];
    const newComm = {
      id: Date.now(),
      article_id: commData.articleId,
      author_name: commData.authorName,
      comment_text: commData.commentText,
      status: "Pending"
    };
    const updated = [newComm, ...current];
    localStorage.setItem("pc_comments", JSON.stringify(updated));
    return newComm;
  },

  updateCommentStatus: async (id, status) => {
    const res = await apiCall("/comments/status", "POST", { id, status });
    if (res && res.success) return true;

    const local = localStorage.getItem("pc_comments");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(c => c.id === id ? { ...c, status } : c);
      localStorage.setItem("pc_comments", JSON.stringify(updated));
    }
    return true;
  },

  deleteComment: async (id) => {
    const res = await apiCall(`/comments/${id}`, "DELETE");
    if (res && res.success) return true;

    const local = localStorage.getItem("pc_comments");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.filter(c => c.id !== id);
      localStorage.setItem("pc_comments", JSON.stringify(updated));
    }
    return true;
  },

  // --- Shop / E-commerce ---
  getProducts: async () => {
    const res = await apiCall("/products");
    if (res) {
      localStorage.setItem("pc_products", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_products");
    return local ? JSON.parse(local) : [
      { id: 1, name: "Resistance Bands Set", category: "Rehabilitation", price: 1200, description: "Set of 5 high-quality latex resistance bands with different resistance levels. Perfect for physical therapy, strength training, and rehabilitation.", stock: 25, image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80" },
      { id: 2, name: "Foam Roller", category: "Recovery", price: 1500, description: "High-density foam roller for muscle massage, trigger point therapy, and physical therapy recovery.", stock: 15, image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=400&q=80" },
      { id: 3, name: "Orthopedic Seat Cushion", category: "Supports & Braces", price: 2200, description: "Memory foam seat cushion designed to relieve pressure on the tailbone and improve sitting posture.", stock: 20, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80" },
      { id: 4, name: "TENS Unit Muscle Stimulator", category: "Rehabilitation", price: 3500, description: "Dual-channel TENS machine with 8 modes for muscle pain relief, recovery, and electrical muscle stimulation.", stock: 10, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80" },
      { id: 5, name: "Hot & Cold Gel Compression Pack", category: "Recovery", price: 950, description: "Reusable gel pack for targeted hot or cold therapy, ideal for reducing swelling, muscle spasms, and joint pain.", stock: 30, image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80" }
    ];
  },

  createProduct: async (prodData) => {
    const res = await apiCall("/products", "POST", prodData);
    if (res && res.success) {
      return res.product;
    }
    const local = localStorage.getItem("pc_products");
    const current = local ? JSON.parse(local) : [];
    const newProduct = {
      id: current.length > 0 ? Math.max(...current.map(p => p.id)) + 1 : 1,
      name: prodData.name,
      category: prodData.category,
      price: parseInt(prodData.price),
      description: prodData.description,
      stock: parseInt(prodData.stock),
      image: prodData.image || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80"
    };
    const updated = [...current, newProduct];
    localStorage.setItem("pc_products", JSON.stringify(updated));
    return newProduct;
  },

  updateProduct: async (prodData) => {
    const res = await apiCall("/products/update", "POST", prodData);
    if (res && res.success) return true;

    const local = localStorage.getItem("pc_products");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(p => p.id === parseInt(prodData.id) ? { ...p, ...prodData, price: parseInt(prodData.price), stock: parseInt(prodData.stock) } : p);
      localStorage.setItem("pc_products", JSON.stringify(updated));
    }
    return true;
  },

  deleteProduct: async (id) => {
    const res = await apiCall(`/products/${id}`, "DELETE");
    if (res && res.success) return true;

    const local = localStorage.getItem("pc_products");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.filter(p => p.id !== id);
      localStorage.setItem("pc_products", JSON.stringify(updated));
    }
    return true;
  },

  getOrders: async () => {
    const res = await apiCall("/orders");
    if (res) {
      localStorage.setItem("pc_orders", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_orders");
    return local ? JSON.parse(local) : [];
  },

  createOrder: async (orderData) => {
    const res = await apiCall("/orders", "POST", orderData);
    if (res && res.success) {
      return res;
    }
    
    // Fallback order creation
    const local = localStorage.getItem("pc_orders");
    const current = local ? JSON.parse(local) : [];
    const orderId = `ORD-${Date.now().toString().slice(-5)}`;
    const initialPaymentStatus = orderData.payment_method === "COD" ? "Unpaid" : (orderData.payment_screenshot ? "Pending Verification" : "Unpaid");
    
    const newOrder = {
      id: orderId,
      patient_name: orderData.patient_name,
      patient_email: orderData.patient_email,
      shipping_address: orderData.shipping_address,
      phone: orderData.phone,
      total_amount: parseInt(orderData.total_amount),
      payment_method: orderData.payment_method,
      payment_status: initialPaymentStatus,
      payment_screenshot: orderData.payment_screenshot || null,
      order_status: "Pending",
      admin_note: null,
      created_at: new Date().toISOString(),
      items: orderData.items
    };

    // Update product stocks in localStorage
    const prodLocal = localStorage.getItem("pc_products");
    if (prodLocal) {
      const prods = JSON.parse(prodLocal);
      orderData.items.forEach(item => {
        const p = prods.find(pr => pr.id === parseInt(item.product_id));
        if (p) p.stock = Math.max(0, p.stock - parseInt(item.quantity));
      });
      localStorage.setItem("pc_products", JSON.stringify(prods));
    }

    const updated = [newOrder, ...current];
    localStorage.setItem("pc_orders", JSON.stringify(updated));
    return { success: true, orderId };
  },

  submitOrderProof: async (id, method, screenshot) => {
    const res = await apiCall("/orders/proof", "POST", { id, method, screenshot });
    if (res && res.success) return true;

    const local = localStorage.getItem("pc_orders");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(o => 
        o.id === id 
          ? { ...o, payment_status: "Pending Verification", payment_method: method, payment_screenshot: screenshot } 
          : o
      );
      localStorage.setItem("pc_orders", JSON.stringify(updated));
    }
    return true;
  },

  updateOrderStatus: async (id, status) => {
    const res = await apiCall("/orders/status", "POST", { id, status });
    if (res && res.success) return true;

    const local = localStorage.getItem("pc_orders");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(o => o.id === id ? { ...o, order_status: status } : o);
      localStorage.setItem("pc_orders", JSON.stringify(updated));
    }
    return true;
  },

  approveOrderPayment: async (id, status, note) => {
    const res = await apiCall("/orders/approve-payment", "POST", { id, status, admin_note: note });
    if (res && res.success) return true;

    const local = localStorage.getItem("pc_orders");
    if (local) {
      const current = JSON.parse(local);
      const targetPaymentStatus = status === "Paid" ? "Paid" : "Rejected";
      const updated = current.map(o => 
        o.id === id 
          ? { ...o, payment_status: targetPaymentStatus, admin_note: note || null } 
          : o
      );
      localStorage.setItem("pc_orders", JSON.stringify(updated));
    }
    return true;
  },

  trackOrder: async (orderId) => {
    const res = await apiCall(`/orders/track/${orderId}`);
    if (res) return res;

    // Fallback search
    const local = localStorage.getItem("pc_orders");
    if (local) {
      const orders = JSON.parse(local);
      const found = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
      if (found) return found;
    }
    return null;
  },

  // FAQs CMS
  getFaqs: async () => {
    const res = await apiCall("/faqs");
    if (res) {
      localStorage.setItem("pc_faqs", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_faqs");
    return local ? JSON.parse(local) : [];
  },

  createFaq: async (faqData) => {
    const res = await apiCall("/faqs", "POST", faqData);
    if (res && res.success) return res.faq;
    const local = localStorage.getItem("pc_faqs");
    const current = local ? JSON.parse(local) : [];
    const newFaq = {
      id: faqData.id || (current.length > 0 ? Math.max(...current.map(f => f.id)) + 1 : 1),
      category: faqData.category,
      question: faqData.question,
      answer: faqData.answer
    };
    const updated = faqData.id 
      ? current.map(f => f.id === parseInt(faqData.id) ? newFaq : f)
      : [...current, newFaq];
    localStorage.setItem("pc_faqs", JSON.stringify(updated));
    return newFaq;
  },

  deleteFaq: async (id) => {
    const res = await apiCall(`/faqs/${id}`, "DELETE");
    if (res && res.success) return true;
    const local = localStorage.getItem("pc_faqs");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.filter(f => f.id !== id);
      localStorage.setItem("pc_faqs", JSON.stringify(updated));
    }
    return true;
  },

  // Gallery CMS
  getGallery: async () => {
    const res = await apiCall("/gallery");
    if (res) {
      localStorage.setItem("pc_gallery", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_gallery");
    return local ? JSON.parse(local) : [];
  },

  createGalleryItem: async (itemData) => {
    const res = await apiCall("/gallery", "POST", itemData);
    if (res && res.success) return res.item;
    const local = localStorage.getItem("pc_gallery");
    const current = local ? JSON.parse(local) : [];
    const newItem = {
      id: itemData.id || (current.length > 0 ? Math.max(...current.map(g => g.id)) + 1 : 1),
      src: itemData.src,
      category: itemData.category,
      title: itemData.title,
      description: itemData.description,
      span: itemData.span || 'normal'
    };
    const updated = itemData.id 
      ? current.map(g => g.id === parseInt(itemData.id) ? newItem : g)
      : [...current, newItem];
    localStorage.setItem("pc_gallery", JSON.stringify(updated));
    return newItem;
  },

  deleteGalleryItem: async (id) => {
    const res = await apiCall(`/gallery/${id}`, "DELETE");
    if (res && res.success) return true;
    const local = localStorage.getItem("pc_gallery");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.filter(g => g.id !== id);
      localStorage.setItem("pc_gallery", JSON.stringify(updated));
    }
    return true;
  },

  // Careers CMS
  getCareers: async () => {
    const res = await apiCall("/careers");
    if (res) {
      localStorage.setItem("pc_careers", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_careers");
    return local ? JSON.parse(local) : [];
  },

  createCareerJob: async (jobData) => {
    const res = await apiCall("/careers", "POST", jobData);
    if (res && res.success) return res.job;
    const local = localStorage.getItem("pc_careers");
    const current = local ? JSON.parse(local) : [];
    const newJob = {
      id: jobData.id || (current.length > 0 ? Math.max(...current.map(c => c.id)) + 1 : 1),
      title: jobData.title,
      department: jobData.department,
      type: jobData.type,
      location: jobData.location,
      experience: jobData.experience,
      salary: jobData.salary,
      deadline: jobData.deadline,
      description: jobData.description,
      requirements: jobData.requirements
    };
    const updated = jobData.id 
      ? current.map(c => c.id === parseInt(jobData.id) ? newJob : c)
      : [...current, newJob];
    localStorage.setItem("pc_careers", JSON.stringify(updated));
    return newJob;
  },

  deleteCareerJob: async (id) => {
    const res = await apiCall(`/careers/${id}`, "DELETE");
    if (res && res.success) return true;
    const local = localStorage.getItem("pc_careers");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.filter(c => c.id !== id);
      localStorage.setItem("pc_careers", JSON.stringify(updated));
    }
    return true;
  },

  // Services CMS
  getServices: async () => {
    const res = await apiCall("/services");
    if (res) {
      localStorage.setItem("pc_services", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_services");
    return local ? JSON.parse(local) : [];
  },

  createService: async (serviceData) => {
    const res = await apiCall("/services", "POST", serviceData);
    if (res && res.success) return res.service;
    const local = localStorage.getItem("pc_services");
    const current = local ? JSON.parse(local) : [];
    const newService = { ...serviceData };
    const existingIndex = current.findIndex(s => s.id === serviceData.id);
    const updated = [...current];
    if (existingIndex > -1) {
      updated[existingIndex] = newService;
    } else {
      updated.push(newService);
    }
    localStorage.setItem("pc_services", JSON.stringify(updated));
    return newService;
  },

  deleteService: async (id) => {
    const res = await apiCall(`/services/${id}`, "DELETE");
    if (res && res.success) return true;
    const local = localStorage.getItem("pc_services");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.filter(s => s.id !== id);
      localStorage.setItem("pc_services", JSON.stringify(updated));
    }
    return true;
  },

  // Reviews CMS
  getReviews: async () => {
    const res = await apiCall("/reviews");
    if (res) {
      localStorage.setItem("pc_reviews", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_reviews");
    return local ? JSON.parse(local) : [];
  },

  createReview: async (reviewData) => {
    const res = await apiCall("/reviews", "POST", reviewData);
    if (res && res.success) return res.review;
    const local = localStorage.getItem("pc_reviews");
    const current = local ? JSON.parse(local) : [];
    const newReview = {
      id: reviewData.id || (current.length > 0 ? Math.max(...current.map(r => r.id)) + 1 : 1),
      name: reviewData.name,
      avatar: reviewData.avatar,
      rating: reviewData.rating,
      service: reviewData.service,
      doctor: reviewData.doctor,
      date: reviewData.date || "Just now",
      text: reviewData.text,
      helpful: reviewData.helpful || 0,
      verified: reviewData.verified !== undefined ? reviewData.verified : 1,
      tag: reviewData.tag,
      source: reviewData.source || 'google',
      featured: reviewData.featured !== undefined ? reviewData.featured : 0
    };
    const updated = reviewData.id 
      ? current.map(r => r.id === parseInt(reviewData.id) ? newReview : r)
      : [newReview, ...current];
    localStorage.setItem("pc_reviews", JSON.stringify(updated));
    return newReview;
  },

  deleteReview: async (id) => {
    const res = await apiCall(`/reviews/${id}`, "DELETE");
    if (res && res.success) return true;
    const local = localStorage.getItem("pc_reviews");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.filter(r => r.id !== id);
      localStorage.setItem("pc_reviews", JSON.stringify(updated));
    }
    return true;
  },

  // Clinic Settings CMS
  getSettings: async () => {
    const res = await apiCall("/settings");
    if (res) {
      localStorage.setItem("pc_settings", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_settings");
    return local ? JSON.parse(local) : {
      clinic_phone: "+92 300 8786187",
      clinic_email: "info@vitalphysiohub.com",
      clinic_address: "First Floor, Building 14-B, Main Boulevard, Gulberg, Lahore, Pakistan",
      clinic_hours: "Mon - Sat: 09:00 AM - 09:00 PM",
      ambulance_phone: "+92 (51) 111-911-273",
      why_us_headline: "Why Choose Vital Physio Hub?",
      why_us_description: "We combine gold-standard physical adjustments with dynamic clinical technologies to ensure faster, safer, and complete muscular rehabilitation."
    };
  },

  updateSettings: async (settings) => {
    const res = await apiCall("/settings", "POST", { settings });
    if (res) {
      const newSettings = await apiCall("/settings");
      if (newSettings) {
        localStorage.setItem("pc_settings", JSON.stringify(newSettings));
        return newSettings;
      }
    }
    const local = localStorage.getItem("pc_settings");
    const current = local ? JSON.parse(local) : {};
    const updated = { ...current, ...settings };
    localStorage.setItem("pc_settings", JSON.stringify(updated));
    return updated;
  },

  // User Management CRUD & Activity Logs
  getUsers: async () => {
    const res = await apiCall("/users");
    if (res) {
      localStorage.setItem("pc_users", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_users");
    return local ? JSON.parse(local) : [];
  },

  createUser: async (userData) => {
    const activeEmail = localStorage.getItem("vph_user_email") || "admin@physiohub.com";
    const headers = { "x-admin-email": activeEmail };
    const res = await apiCall("/users", "POST", userData, headers);
    if (res && res.success) {
      const allUsers = await apiCall("/users");
      if (allUsers) localStorage.setItem("pc_users", JSON.stringify(allUsers));
      return res;
    }
    return res;
  },

  updateUser: async (userData) => {
    const activeEmail = localStorage.getItem("vph_user_email") || "admin@physiohub.com";
    const headers = { "x-admin-email": activeEmail };
    const res = await apiCall("/users/update", "POST", userData, headers);
    if (res && res.success) {
      const allUsers = await apiCall("/users");
      if (allUsers) localStorage.setItem("pc_users", JSON.stringify(allUsers));
      return res;
    }
    return res;
  },

  deleteUser: async (id) => {
    const activeEmail = localStorage.getItem("vph_user_email") || "admin@physiohub.com";
    const headers = { "x-admin-email": activeEmail };
    const res = await apiCall(`/users/${id}`, "DELETE", null, headers);
    if (res && res.success) {
      const allUsers = await apiCall("/users");
      if (allUsers) localStorage.setItem("pc_users", JSON.stringify(allUsers));
      return res;
    }
    return res;
  },

  getUserLogs: async () => {
    const res = await apiCall("/users/logs");
    if (res) {
      localStorage.setItem("pc_user_logs", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_user_logs");
    return local ? JSON.parse(local) : [];
  },

  getClinics: async () => {
    const res = await apiCall("/clinics");
    if (res) {
      localStorage.setItem("pc_clinics", JSON.stringify(res));
      return res;
    }
    const local = localStorage.getItem("pc_clinics");
    return local ? JSON.parse(local) : [
      { id: 1, name: "Vital Physio Hub", subdomain: "vitalphysio", address: "Lahore, Pakistan", status: "Active" }
    ];
  },

  createClinic: async (clinicData) => {
    const activeEmail = localStorage.getItem("vph_user_email") || "admin@physiohub.com";
    const headers = { "x-admin-email": activeEmail };
    const res = await apiCall("/clinics", "POST", clinicData, headers);
    return res;
  },

  toggleClinicStatus: async (id, status) => {
    const activeEmail = localStorage.getItem("vph_user_email") || "admin@physiohub.com";
    const headers = { "x-admin-email": activeEmail };
    const res = await apiCall("/clinics/status", "POST", { id, status }, headers);
    return res;
  },

  subscribeNewsletter: async (email) => {
    const res = await apiCall("/newsletter/subscribe", "POST", { email });
    if (res && res.success) return res;
    return { success: true, message: "Subscribed successfully (Mock)!" };
  }
};

