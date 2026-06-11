const API_BASE_URL = "http://localhost:5000/api";

// Base helper for handling fetch connections with local storage fallback
async function apiCall(endpoint, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" }
    };
    if (body) options.body = JSON.stringify(body);
    
    const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!res.ok) throw new Error("HTTP Connection Error");
    return await res.json();
  } catch (e) {
    console.warn(`MySQL Backend API Fallback triggered for ${endpoint}: ${e.message}`);
    return null; // Return null so the caller falls back to localStorage
  }
}

export const api = {
  // Login Authentication
  login: async (email, password, role) => {
    const res = await apiCall("/auth/login", "POST", { email, password, role });
    if (res && res.success) {
      localStorage.setItem("pc_user_role", res.user.role);
      localStorage.setItem("pc_user_name", res.user.name);
      return res;
    }
    // Fallback local validation
    const expectedEmail = role === "patient" ? "patient@premiumclinic.com" :
                          role === "doctor" ? "doctor@premiumclinic.com" :
                          role === "admin" ? "admin@premiumclinic.com" : "staff@premiumclinic.com";
    if (email !== expectedEmail || (password !== "password123" && password !== "••••••••")) {
      return {
        success: false,
        error: `Authentication failed. Correct email for this role is '${expectedEmail}' and password is 'password123'`
      };
    }
    localStorage.setItem("pc_user_role", role);
    localStorage.setItem("pc_user_name", role === "patient" ? "Jane Doe" : role === "doctor" ? "Dr. Sarah Ahmed" : role === "admin" ? "Director Admin" : "Reception Desk");
    return {
      success: true,
      token: "mock-jwt-session-token",
      user: { email, role, name: localStorage.getItem("pc_user_name") }
    };
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
      status: apptData.status || "Confirmed",
      patient: apptData.patient || "Jane Doe"
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

  toggleDoctorStatus: async (id, status) => {
    const res = await apiCall("/doctors/status", "POST", { id, status });
    if (res && res.success) return true;
    
    const local = localStorage.getItem("pc_doctors");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(doc => doc.id === id ? { ...doc, status } : doc);
      localStorage.setItem("pc_doctors", JSON.stringify(updated));
    }
    return true;
  },

  approvePayment: async (id) => {
    const res = await apiCall("/appointments/approve-payment", "POST", { id });
    if (res && res.success) return true;

    // Fallback
    const local = localStorage.getItem("pc_appts");
    if (local) {
      const current = JSON.parse(local);
      const updated = current.map(appt => 
        appt.id === id ? { ...appt, payment_status: "Paid", status: "Confirmed" } : appt
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
  }
};
