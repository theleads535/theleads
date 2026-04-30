import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fwqxhwzpfoffriaplhon.supabase.co",
  "sb_publishable_Jo-9ISG6AO5E6984ndGV2w_fkgWaRIg"
);

const PASSWORD = "shoaib*_0981";

// Simple bar chart component
function BarChart({ data, label, color }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <motion.div initial={{ height: 0 }} animate={{ height: `${(d.value / max) * 64}px` }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            style={{ width: "100%", background: color, borderRadius: "4px 4px 0 0", minHeight: d.value > 0 ? 4 : 0, boxShadow: `0 0 8px ${color}60` }} />
          <div style={{ fontSize: 9, color: "#475569", fontWeight: 600, whiteSpace: "nowrap" }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterBudget, setFilterBudget] = useState("All");
  const [filterDate, setFilterDate] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedLead, setSelectedLead] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (!error) setLeads(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchLeads();
  }, [authed]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Wrong password! Try again.");
      setPassword("");
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLeads();
    setRefreshing(false);
  };

  // Filter and search
  const filteredLeads = leads.filter(l => {
    const matchSearch = search === "" ||
      l.name?.toLowerCase().includes(search.toLowerCase()) ||
      l.phone?.includes(search) ||
      l.project?.toLowerCase().includes(search.toLowerCase());

    const matchBudget = filterBudget === "All" || l.budget === filterBudget;

    const matchDate = (() => {
      if (filterDate === "All") return true;
      const d = new Date(l.created_at);
      const now = new Date();
      if (filterDate === "Today") return d.toDateString() === now.toDateString();
      if (filterDate === "This week") {
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
        return d >= weekAgo;
      }
      if (filterDate === "This month") return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      return true;
    })();

    return matchSearch && matchBudget && matchDate;
  }).sort((a, b) => {
    if (sortBy === "newest") return new Date(b.created_at) - new Date(a.created_at);
    if (sortBy === "oldest") return new Date(a.created_at) - new Date(b.created_at);
    if (sortBy === "name") return a.name?.localeCompare(b.name);
    return 0;
  });

  // Stats
  const totalLeads = leads.length;
  const todayLeads = leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length;
  const weekLeads = leads.filter(l => new Date(l.created_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
  const budgetCounts = {
    "Rs.20,000 – Rs.50,000": leads.filter(l => l.budget === "Rs.20,000 – Rs.50,000").length,
    "Rs.50,000 – Rs.1,00,000": leads.filter(l => l.budget === "Rs.50,000 – Rs.1,00,000").length,
    "Rs.1,00,000+": leads.filter(l => l.budget === "Rs.1,00,000+").length,
  };

  // Chart data - last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      label: d.toLocaleDateString("en-IN", { weekday: "short" }),
      value: leads.filter(l => new Date(l.created_at).toDateString() === d.toDateString()).length,
    };
  });

  const budgetData = [
    { label: "20-50K", value: budgetCounts["Rs.20,000 – Rs.50,000"] },
    { label: "50K-1L", value: budgetCounts["Rs.50,000 – Rs.1,00,000"] },
    { label: "1L+", value: budgetCounts["Rs.1,00,000+"] },
  ];

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#020817", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
          style={{ width: 400, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 24, padding: "48px 40px", backdropFilter: "blur(20px)", boxShadow: "0 0 60px rgba(59,130,246,0.1)" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: "-0.5px" }}>Admin Dashboard</h1>
            <p style={{ fontSize: 14, color: "#475569" }}>TheLeads · Leads Management</p>
          </div>
          <form onSubmit={handleLogin}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#475569", marginBottom: 8, letterSpacing: "1px", textTransform: "uppercase" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password" autoFocus
              style={{ width: "100%", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "13px 16px", fontSize: 14, color: "#f1f5f9", outline: "none", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", fontFamily: "inherit", marginBottom: 16, transition: "border .2s" }} />
            {error && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#f87171" }}>
                ⚠️ {error}
              </motion.div>
            )}
            <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }} whileTap={{ scale: .98 }} type="submit"
              style={{ width: "100%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
              Login →
            </motion.button>
          </form>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <a href="/" style={{ fontSize: 13, color: "#475569", textDecoration: "none" }}>← Back to website</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#020817", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
      <style>{`*{box-sizing:border-box} input:focus,select:focus{border-color:rgba(59,130,246,0.6)!important;outline:none}`}</style>

      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 5%", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="/theleads.png" alt="TheLeads" style={{ height: 36, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ fontSize: 14, fontWeight: 700, color: "#60a5fa" }}>Admin Dashboard</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }} onClick={handleRefresh}
            style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: "#60a5fa", cursor: "pointer" }}>
            {refreshing ? "⏳ Refreshing..." : "🔄 Refresh"}
          </motion.button>
          <motion.a href="/" whileHover={{ scale: 1.05 }}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: "#94a3b8", cursor: "pointer", textDecoration: "none" }}>
            ← Website
          </motion.a>
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => setAuthed(false)}
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: "#f87171", cursor: "pointer" }}>
            Logout
          </motion.button>
        </div>
      </div>

      <div style={{ padding: "32px 5%" }}>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20, marginBottom: 32 }}>
          {[
            { label: "Total Leads", value: totalLeads, icon: "📊", color: "#3b82f6", glow: "rgba(59,130,246,0.2)" },
            { label: "Today's Leads", value: todayLeads, icon: "📅", color: "#10b981", glow: "rgba(16,185,129,0.2)" },
            { label: "This Week", value: weekLeads, icon: "📈", color: "#8b5cf6", glow: "rgba(139,92,246,0.2)" },
            { label: "High Budget (1L+)", value: budgetCounts["Rs.1,00,000+"], icon: "💰", color: "#f59e0b", glow: "rgba(245,158,11,0.2)" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: `0 16px 40px ${s.glow}` }}
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}30`, borderRadius: 20, padding: "24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${s.color},transparent)` }} />
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1, background: `linear-gradient(135deg,${s.color},${s.color}aa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 6, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
          {/* Leads last 7 days */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "24px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", marginBottom: 20, letterSpacing: "0.5px" }}>LEADS — LAST 7 DAYS</div>
            <BarChart data={last7Days} color="rgba(59,130,246,0.8)" />
          </motion.div>

          {/* Budget distribution */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "24px" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", marginBottom: 20, letterSpacing: "0.5px" }}>LEADS BY BUDGET</div>
            <BarChart data={budgetData} color="rgba(139,92,246,0.8)" />
            <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
              {Object.entries(budgetCounts).map(([k, v]) => (
                <div key={k} style={{ fontSize: 12, color: "#475569" }}>
                  <span style={{ color: "#a78bfa", fontWeight: 800 }}>{v}</span> {k}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 24px", marginBottom: 24, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone or project..."
              style={{ width: "100%", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px 10px 38px", fontSize: 13, color: "#f1f5f9", background: "rgba(255,255,255,0.04)", fontFamily: "inherit", transition: "border .2s" }} />
          </div>
          {/* Budget filter */}
          <select value={filterBudget} onChange={e => setFilterBudget(e.target.value)}
            style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f1f5f9", background: "rgba(15,23,42,0.9)", fontFamily: "inherit", cursor: "pointer" }}>
            <option value="All">All Budgets</option>
            <option value="Rs.20,000 – Rs.50,000">Rs.20K – Rs.50K</option>
            <option value="Rs.50,000 – Rs.1,00,000">Rs.50K – Rs.1L</option>
            <option value="Rs.1,00,000+">Rs.1L+</option>
          </select>
          {/* Date filter */}
          <select value={filterDate} onChange={e => setFilterDate(e.target.value)}
            style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f1f5f9", background: "rgba(15,23,42,0.9)", fontFamily: "inherit", cursor: "pointer" }}>
            <option value="All">All Time</option>
            <option value="Today">Today</option>
            <option value="This week">This Week</option>
            <option value="This month">This Month</option>
          </select>
          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f1f5f9", background: "rgba(15,23,42,0.9)", fontFamily: "inherit", cursor: "pointer" }}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
          </select>
          <div style={{ fontSize: 13, color: "#475569", fontWeight: 600, whiteSpace: "nowrap" }}>
            {filteredLeads.length} leads
          </div>
        </motion.div>

        {/* Leads table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 2fr 1.5fr 1.5fr 1fr", gap: 16, padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
            {["Name", "Phone", "Project", "Budget", "Date & Time", "Action"].map(h => (
              <div key={h} style={{ fontSize: 10, fontWeight: 800, color: "#475569", letterSpacing: "1px", textTransform: "uppercase" }}>{h}</div>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ padding: "48px", textAlign: "center", color: "#475569", fontSize: 14 }}>
              ⏳ Loading leads...
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredLeads.length === 0 && (
            <div style={{ padding: "48px", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#475569" }}>No leads found</div>
              <div style={{ fontSize: 13, color: "#334155", marginTop: 8 }}>Try changing your filters</div>
            </div>
          )}

          {/* Leads rows */}
          {!loading && filteredLeads.map((lead, i) => (
            <motion.div key={lead.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              whileHover={{ background: "rgba(59,130,246,0.05)" }}
              style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 2fr 1.5fr 1.5fr 1fr", gap: 16, padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", alignItems: "center", transition: "background .2s", cursor: "pointer" }}
              onClick={() => setSelectedLead(lead)}>
              <div>
                <div style={{ fontWeight: 700, color: "#f1f5f9", fontSize: 14 }}>{lead.name}</div>
              </div>
              <div>
                <a href={`https://wa.me/${lead.phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: 13, color: "#22c55e", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                  💬 {lead.phone}
                </a>
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{lead.project}</div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: lead.budget === "Rs.1,00,000+" ? "rgba(245,158,11,0.15)" : lead.budget === "Rs.50,000 – Rs.1,00,000" ? "rgba(139,92,246,0.15)" : "rgba(59,130,246,0.15)", color: lead.budget === "Rs.1,00,000+" ? "#fbbf24" : lead.budget === "Rs.50,000 – Rs.1,00,000" ? "#a78bfa" : "#60a5fa", border: `1px solid ${lead.budget === "Rs.1,00,000+" ? "rgba(245,158,11,0.3)" : lead.budget === "Rs.50,000 – Rs.1,00,000" ? "rgba(139,92,246,0.3)" : "rgba(59,130,246,0.3)"}` }}>
                  {lead.budget}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>
                {new Date(lead.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <motion.a href={`https://wa.me/${lead.phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }} onClick={e => e.stopPropagation()}
                  style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: 14 }}>
                  💬
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lead detail modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, backdropFilter: "blur(8px)" }}
            onClick={() => setSelectedLead(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "#0f172a", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 24, padding: "36px", width: "100%", maxWidth: 480, boxShadow: "0 0 60px rgba(59,130,246,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <h3 style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>Lead Details</h3>
                <button onClick={() => setSelectedLead(null)} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 8, width: 32, height: 32, color: "#94a3b8", cursor: "pointer", fontSize: 16 }}>×</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Name", value: selectedLead.name, icon: "👤" },
                  { label: "Phone", value: selectedLead.phone, icon: "📱" },
                  { label: "Project", value: selectedLead.project, icon: "🏗️" },
                  { label: "Budget", value: selectedLead.budget, icon: "💰" },
                  { label: "Date", value: new Date(selectedLead.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), icon: "🕐" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 18px" }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 10, color: "#475569", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase" }}>{item.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginTop: 3 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <motion.a href={`https://wa.me/${selectedLead.phone?.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(37,211,102,0.4)" }}
                style={{ display: "block", marginTop: 24, padding: "14px", background: "linear-gradient(135deg,#25D366,#16a34a)", borderRadius: 12, textAlign: "center", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none" }}>
                💬 WhatsApp {selectedLead.name}
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
