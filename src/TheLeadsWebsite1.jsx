import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fwqxhwzpfoffriaplhon.supabase.co",
  "sb_publishable_Jo-9ISG6AO5E6984ndGV2w_fkgWaRIg"
);

const NAV_LINKS = ["Services", "How It Works", "Why Us", "Contact"];

const SERVICES = [
  {
    icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 22L10 14L16 18L22 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="7" r="2.5" fill="white" opacity="0.8"/></svg>),
    title: "Lead Generation", desc: "Targeted Meta & Google ad campaigns engineered for real estate. We reach serious buyers actively looking for properties in Bangalore.", tag: "Meta + Google Ads", gradient: "135deg, #1e3a8a, #2563eb", accent: "#3b82f6",
  },
  {
    icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="8" stroke="white" strokeWidth="2" opacity="0.9"/><path d="M14 8v6l4 2.5" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M6 22l3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/></svg>),
    title: "Site Visit Scheduling", desc: "We don't just hand over numbers. We follow up, qualify, and schedule site visits — sending ready buyers directly to your project.", tag: "Full Follow-up", gradient: "135deg, #0c4a6e, #0284c7", accent: "#0ea5e9",
  },
  {
    icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="8" width="20" height="15" rx="3" stroke="white" strokeWidth="2" opacity="0.9"/><path d="M9 15h10M9 19h7" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M11 8V5M17 8V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/></svg>),
    title: "Campaign Management", desc: "Full ad account setup, creative production, weekly optimization, and transparent reporting. You focus on closing — we handle the marketing.", tag: "End-to-End", gradient: "135deg, #4c1d95, #7c3aed", accent: "#8b5cf6",
  },
];

const STEPS = [
  { num: "01", title: "You onboard with us", desc: "Share your project details, target audience, and budget. We set up your dedicated ad account in 24 hours.", icon: "📋", color: "#2563eb" },
  { num: "02", title: "We launch campaigns", desc: "Our team runs optimized Meta and Google ads targeting real buyers in your project's micro-market.", icon: "🚀", color: "#0284c7" },
  { num: "03", title: "Leads come in", desc: "Qualified leads are delivered to your WhatsApp in real time — name, number, budget, and project preference.", icon: "📲", color: "#059669" },
  { num: "04", title: "We schedule site visits", desc: "Our team calls every lead, filters serious buyers, and books site visits directly with your sales team.", icon: "🏠", color: "#d97706" },
];

const WHYS = [
  { title: "Real estate only", desc: "We work exclusively with builders and developers. We know what converts in this market.", icon: "🎯", stat: "100%", label: "Focused" },
  { title: "No brokers, no commissions", desc: "Buyers connect directly with you. You keep 100% of the deal — no middlemen cutting in.", icon: "🤝", stat: "0%", label: "Commission" },
  { title: "Transparent reporting", desc: "Weekly reports showing every rupee spent and every lead generated. No black boxes.", icon: "📊", stat: "24/7", label: "Reporting" },
  { title: "Bangalore expertise", desc: "We know Sarjapur, Whitefield, Devanahalli — the micro-markets, the buyer personas, the price points.", icon: "📍", stat: "3+", label: "Years" },
];

const STATS = [
  { value: "500+", label: "Leads Delivered", icon: "📈" },
  { value: "₹300", label: "Avg Cost Per Lead", icon: "💰" },
  { value: "40+", label: "Site Visits Booked", icon: "🏠" },
  { value: "3x", label: "Avg ROI For Clients", icon: "🚀" },
];

const TESTIMONIALS = [
  { name: "Ramesh Reddy", role: "Builder, Sarjapur Road", text: "TheLeads delivered 60+ quality leads in the first month. Our sales team couldn't keep up! Best investment we made.", stars: 5, initials: "RR" },
  { name: "Priya Sharma", role: "Developer, Whitefield", text: "We used to spend lakhs on brokers. Now we get direct buyers at a fraction of the cost. Highly recommend!", stars: 5, initials: "PS" },
  { name: "Suresh Kumar", role: "Owner, Devanahalli", text: "Site visit scheduling is a game changer. They don't just send leads — they send serious buyers ready to close.", stars: 5, initials: "SK" },
];

const FAQS = [
  { q: "How quickly will I start getting leads?", a: "Most clients see their first leads within 48-72 hours of campaign launch. We set up everything within 24 hours of onboarding." },
  { q: "What is the minimum budget required?", a: "We recommend a minimum ad spend of Rs.20,000/month for meaningful results. Our service fee starts at Rs.15,000/month." },
  { q: "Do you work with all types of real estate projects?", a: "Yes — apartments, villas, plots, commercial spaces. As long as it's in Bangalore, we can generate leads for it." },
  { q: "How are leads delivered to me?", a: "Leads are delivered instantly to your WhatsApp as soon as they come in — with name, phone number, budget and project interest." },
  { q: "What makes you different from other agencies?", a: "We are 100% focused on real estate. No generic agency juggling 50 industries. Every rupee we spend is optimized for property buyers." },
];

const CHAT_MESSAGES = [
  { from: "bot", text: "Hi! Welcome to TheLeads. How can I help you today?" },
  { from: "bot", text: "We generate quality real estate leads for builders in Bangalore." },
];

const QUICK_REPLIES = ["Get a free consultation", "How does it work?", "What is the pricing?", "Talk to the team"];

function FadeUp({ children, delay = 0, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
  );
}

const SectionLabel = ({ children, light }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: light ? "rgba(255,255,255,0.1)" : "#EFF6FF", color: light ? "rgba(255,255,255,0.8)" : "#1d4ed8", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 18, letterSpacing: "2px", textTransform: "uppercase", border: light ? "1px solid rgba(255,255,255,0.15)" : "1px solid #BFDBFE" }}>
    {children}
  </div>
);

export default function TheLeadsWebsite() {
  const [formData, setFormData] = useState({ name: "", phone: "", project: "", budget: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [showNotif, setShowNotif] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const chatEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      // Save lead to Supabase
      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name,
          phone: formData.phone,
          project: formData.project,
          budget: formData.budget,
        },
      ]);

      if (error) throw error;

      // Open WhatsApp with lead details
      const msg = `Hello TheLeads!%0AName: ${formData.name}%0APhone: ${formData.phone}%0AProject: ${formData.project}%0ABudget: ${formData.budget}`;
      window.open(`https://wa.me/918618561535?text=${msg}`, "_blank");
      setSubmitted(true);

    } catch (err) {
      console.error("Error saving lead:", err);
      setSubmitError("Something went wrong. Please try again or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickReply = (reply) => {
    setChatMessages(m => [...m, { from: "user", text: reply }]);
    setTimeout(() => {
      let r = "Our team will get back to you shortly!";
      if (reply.includes("consultation")) r = "Great! Please fill the contact form or WhatsApp us at +91 86185 61535.";
      if (reply.includes("work")) r = "We run Meta & Google ads, deliver real-time leads to WhatsApp, and schedule site visits!";
      if (reply.includes("pricing")) r = "We start at Rs.15,000/month + ad spend. Most clients spend Rs.20,000–50,000 on ads/month.";
      if (reply.includes("team")) r = "Reach us at +91 86185 61535 or theleads535@gmail.com. We respond within 1 hour!";
      setChatMessages(m => [...m, { from: "bot", text: r }]);
    }, 700);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages(m => [...m, { from: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => setChatMessages(m => [...m, { from: "bot", text: "Thanks! WhatsApp us at +91 86185 61535 for the fastest response." }]), 900);
  };

  const G = {
    primary: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
    dark: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    subtle: "linear-gradient(160deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%)",
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Inter','Segoe UI',sans-serif", color: "#0f172a", background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&display=swap" rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box}
        @keyframes bar{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes ping{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}
        .wa-ping{animation:ping 2s cubic-bezier(0,0,.2,1) infinite}
        .nav-a{transition:color .2s}
        .nav-a:hover{color:#2563eb!important}
        input:focus,select:focus{border-color:#2563eb!important;box-shadow:0 0 0 3px rgba(37,99,235,.12)!important}
        @media(max-width:768px){
          .nav-links{display:none!important}
          .hero-btns{flex-direction:column!important;align-items:center!important}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
          .steps-grid{grid-template-columns:1fr!important}
        }
        @media(max-width:640px){
          .grid-3{grid-template-columns:1fr!important}
          .grid-2{grid-template-columns:1fr!important}
          .contact-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* Top bar */}
      <motion.div initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ background: "linear-gradient(90deg,#0f172a,#1e3a8a,#2563eb,#1e3a8a,#0f172a)", backgroundSize: "300% auto", animation: "bar 6s ease infinite", padding: "10px 24px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: ".2px" }}>
        🎉 Free consultation for the first 10 builders this month!
        <motion.span whileHover={{ color: "#bfdbfe" }} onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
          style={{ marginLeft: 12, textDecoration: "underline", cursor: "pointer", color: "#93c5fd" }}>Claim your spot →</motion.span>
      </motion.div>

      {/* Nav */}
      <motion.nav initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, delay: .08, ease: "easeOut" }}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%", height: 66, background: "rgba(255,255,255,.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, zIndex: 200, boxShadow: "0 1px 20px rgba(15,23,42,.06)" }}>
        <motion.img whileHover={{ scale: 1.04 }} src="/theleads.png" alt="TheLeads" style={{ height: 46, objectFit: "contain", cursor: "pointer" }} />
        <ul className="nav-links" style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {NAV_LINKS.map((l, i) => (
            <motion.li key={l} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 + i * .07 }}>
              <a className="nav-a" href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                style={{ fontSize: 15, color: "#334155", fontWeight: 700, textDecoration: "none", letterSpacing: "-.2px" }}>{l}</a>
            </motion.li>
          ))}
        </ul>
        <motion.button initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .4 }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(37,99,235,.4)" }} whileTap={{ scale: .97 }}
          onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
          style={{ background: G.primary, color: "#fff", border: "none", borderRadius: 8, padding: "11px 26px", fontSize: 14, fontWeight: 800, cursor: "pointer", letterSpacing: "-.2px" }}>
          Get started
        </motion.button>
      </motion.nav>

      {/* ── HERO ── */}
      <section style={{ padding: "96px 5% 72px", maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .3 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1d4ed8", fontSize: 11, fontWeight: 800, padding: "7px 18px", borderRadius: 99, marginBottom: 28, letterSpacing: "1.5px", textTransform: "uppercase" }}>
          <motion.span animate={{ opacity: [1, .4, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          Bangalore's Real Estate Lead Experts
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .38, ease: [.22, 1, .36, 1] }}
          style={{ fontSize: "clamp(40px,6vw,68px)", fontWeight: 900, lineHeight: 1.06, color: "#0f172a", margin: "0 0 24px", letterSpacing: "-3px" }}>
          Stop paying brokers.
          <br />
          <motion.span initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .65 }}
            style={{ background: G.primary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
            Start owning your leads.
          </motion.span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .52 }}
          style={{ fontSize: 18, color: "#64748b", lineHeight: 1.78, maxWidth: 580, margin: "0 auto 40px", fontWeight: 400 }}>
          TheLeads runs targeted Meta & Google ads exclusively for builders and developers — delivering qualified buyers directly to your project, without middlemen.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .65 }}
          className="hero-btns" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}>
          <motion.button whileHover={{ scale: 1.05, boxShadow: "0 16px 48px rgba(37,99,235,.45)" }} whileTap={{ scale: .97 }}
            onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
            style={{ background: G.primary, color: "#fff", border: "none", borderRadius: 10, padding: "17px 40px", fontSize: 16, fontWeight: 800, cursor: "pointer", letterSpacing: "-.3px" }}>
            Get free consultation
          </motion.button>
          <motion.button whileHover={{ scale: 1.04, background: "#EFF6FF" }} whileTap={{ scale: .97 }}
            onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })}
            style={{ background: "#fff", color: "#1d4ed8", border: "2px solid #BFDBFE", borderRadius: 10, padding: "17px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            See how it works
          </motion.button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }}
          style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {["No brokers", "Real-time leads", "Site visits included", "Bangalore focused"].map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85 + i * .1 }}
              style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748b", fontWeight: 600 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: G.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
              </div>
              {t}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <FadeIn>
        <div style={{ background: G.dark, margin: "0", padding: "0" }}>
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: "100%" }}>
            {STATS.map((s, i) => (
              <motion.div key={i} whileHover={{ background: "rgba(37,99,235,.15)" }}
                style={{ padding: "32px 24px", textAlign: "center", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,.06)" : "none", transition: "background .2s" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                <motion.div initial={{ opacity: 0, scale: .8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * .1, type: "spring" }}
                  style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1 }}>{s.value}</motion.div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 8, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "110px 5%", background: "#0f172a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(37,99,235,.1) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(124,58,237,.08) 0%, transparent 55%)", pointerEvents: "none" }} />
        {/* City skyline */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", opacity: .06 }} viewBox="0 0 1440 200" fill="white" preserveAspectRatio="none">
          <path d="M0,160 L0,200 L1440,200 L1440,160 L1420,160 L1420,100 L1400,100 L1400,60 L1380,60 L1380,40 L1360,40 L1360,60 L1340,60 L1340,100 L1320,100 L1320,80 L1300,80 L1300,30 L1280,30 L1280,10 L1260,10 L1260,30 L1240,30 L1240,80 L1220,80 L1220,120 L1200,120 L1200,90 L1180,90 L1180,50 L1160,50 L1160,20 L1140,20 L1140,0 L1120,0 L1120,20 L1100,20 L1100,50 L1080,50 L1080,90 L1060,90 L1060,70 L1040,70 L1040,40 L1020,40 L1020,70 L1000,70 L1000,110 L980,110 L980,85 L960,85 L960,55 L940,55 L940,85 L920,85 L920,100 L900,100 L900,75 L880,75 L880,45 L860,45 L860,15 L840,15 L840,0 L820,0 L820,15 L800,15 L800,45 L780,45 L780,75 L760,75 L760,55 L740,55 L740,80 L720,80 L720,110 L700,110 L700,90 L680,90 L680,60 L660,60 L660,90 L640,90 L640,120 L620,120 L620,100 L600,100 L600,70 L580,70 L580,40 L560,40 L560,10 L540,10 L540,0 L520,0 L520,10 L500,10 L500,40 L480,40 L480,70 L460,70 L460,100 L440,100 L440,80 L420,80 L420,50 L400,50 L400,80 L380,80 L380,100 L360,100 L360,80 L340,80 L340,110 L320,110 L320,90 L300,90 L300,60 L280,60 L280,90 L260,90 L260,120 L240,120 L240,95 L220,95 L220,65 L200,65 L200,35 L180,35 L180,20 L160,20 L160,35 L140,35 L140,65 L120,65 L120,95 L100,95 L100,75 L80,75 L80,105 L60,105 L60,80 L40,80 L40,50 L20,50 L20,80 L0,80 Z"/>
        </svg>
        <div style={{ position: "relative" }}>
          <FadeUp>
            <SectionLabel light>Our Services</SectionLabel>
            <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
              Everything you need to<br /><span style={{ color: "#60a5fa" }}>sell faster</span>
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,.45)", maxWidth: 520, lineHeight: 1.78, marginBottom: 56 }}>From the first ad impression to a confirmed site visit — we handle the entire buyer journey.</p>
          </FadeUp>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <FadeUp key={i} delay={i * .13}>
                <motion.div whileHover={{ y: -10, boxShadow: "0 32px 72px rgba(0,0,0,.4)" }} transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: "36px 30px", position: "relative", overflow: "hidden", backdropFilter: "blur(12px)", height: "100%", cursor: "default" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(${s.gradient})` }} />
                  <div style={{ position: "absolute", bottom: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `linear-gradient(${s.gradient})`, opacity: .06 }} />
                  <motion.div whileHover={{ scale: 1.12, rotate: 6 }} transition={{ type: "spring", stiffness: 400 }}
                    style={{ width: 58, height: 58, borderRadius: 16, background: `linear-gradient(${s.gradient})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, boxShadow: `0 10px 32px rgba(0,0,0,.35)` }}>
                    {s.icon}
                  </motion.div>
                  <div style={{ display: "inline-block", background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.55)", fontSize: 9, fontWeight: 800, padding: "4px 12px", borderRadius: 99, marginBottom: 14, letterSpacing: "1.2px", textTransform: "uppercase" }}>{s.tag}</div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: "#fff", marginBottom: 12, letterSpacing: "-.3px" }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.78 }}>{s.desc}</div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: "110px 5%", background: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,.04) 0%, transparent 70%)", pointerEvents: "none" }} />
        <FadeUp>
          <SectionLabel>Our Process</SectionLabel>
          <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: "#0f172a", marginBottom: 16, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
            How it <span style={{ background: G.primary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>works</span>
          </h2>
          <p style={{ fontSize: 17, color: "#64748b", maxWidth: 520, lineHeight: 1.78, marginBottom: 64 }}>Simple, transparent, and built around your sales process.</p>
        </FadeUp>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, position: "relative" }}>
          {/* connector line */}
          <div style={{ position: "absolute", top: 60, left: "12.5%", right: "12.5%", height: 2, background: "linear-gradient(90deg, #BFDBFE, #2563eb, #BFDBFE)", zIndex: 0, opacity: .5 }} />
          {STEPS.map((s, i) => (
            <FadeUp key={i} delay={i * .12}>
              <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}
                style={{ padding: "36px 28px 32px", position: "relative", zIndex: 1, textAlign: "left" }}>
                <motion.div whileHover={{ scale: 1.1 }} style={{ width: 56, height: 56, borderRadius: "50%", background: G.primary, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 24px rgba(37,99,235,.35)", position: "relative" }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#fff" }}>{s.num}</span>
                  <motion.div animate={{ scale: [1, 1.4, 1], opacity: [.5, 0, .5] }} transition={{ repeat: Infinity, duration: 2, delay: i * .5 }}
                    style={{ position: "absolute", inset: 0, borderRadius: "50%", background: G.primary, zIndex: -1 }} />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</motion.div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", marginBottom: 10, letterSpacing: "-.3px" }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.78 }}>{s.desc}</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why-us" style={{ padding: "110px 5%", background: "#0f172a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 45% at 75% 35%, rgba(37,99,235,.13) 0%, transparent 60%)", pointerEvents: "none" }} />
        {/* Skyline mirrored */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", opacity: .05, transform: "scaleX(-1)" }} viewBox="0 0 1440 200" fill="white" preserveAspectRatio="none">
          <path d="M0,160 L0,200 L1440,200 L1440,160 L1420,160 L1420,100 L1400,100 L1400,60 L1380,60 L1380,40 L1360,40 L1360,60 L1340,60 L1340,100 L1320,100 L1320,80 L1300,80 L1300,30 L1280,30 L1280,10 L1260,10 L1260,30 L1240,30 L1240,80 L1220,80 L1220,120 L1200,120 L1200,90 L1180,90 L1180,50 L1160,50 L1160,20 L1140,20 L1140,0 L1120,0 L1120,20 L1100,20 L1100,50 L1080,50 L1080,90 L1060,90 L1060,70 L1040,70 L1040,40 L1020,40 L1020,70 L1000,70 L1000,110 L980,110 L980,85 L960,85 L960,55 L940,55 L940,85 L920,85 L920,100 L900,100 L900,75 L880,75 L880,45 L860,45 L860,15 L840,15 L840,0 L820,0 L820,15 L800,15 L800,45 L780,45 L780,75 L760,75 Z"/>
        </svg>
        <div style={{ position: "relative" }}>
          <FadeUp>
            <SectionLabel light>Why TheLeads</SectionLabel>
            <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
              Built for <span style={{ color: "#60a5fa" }}>builders</span>, not brokers
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,.4)", maxWidth: 520, lineHeight: 1.78, marginBottom: 60 }}>We exist to fix what's broken in real estate marketing.</p>
          </FadeUp>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
            {WHYS.map((w, i) => (
              <FadeUp key={i} delay={i * .11}>
                <motion.div whileHover={{ y: -6, background: "rgba(255,255,255,.07)", borderColor: "rgba(96,165,250,.35)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: "36px 32px", backdropFilter: "blur(12px)", cursor: "default" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <motion.div whileHover={{ scale: 1.25, rotate: -8 }} style={{ fontSize: 36 }}>{w.icon}</motion.div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 32, fontWeight: 900, color: "#60a5fa", letterSpacing: "-1.5px", lineHeight: 1 }}>{w.stat}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginTop: 4 }}>{w.label}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 10, letterSpacing: "-.3px" }}>{w.title}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,.45)", lineHeight: 1.78 }}>{w.desc}</div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "110px 5%", background: G.subtle }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <SectionLabel>Testimonials</SectionLabel>
            <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-1.5px", lineHeight: 1.1 }}>What our clients say</h2>
          </div>
        </FadeUp>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * .13}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 24px 56px rgba(37,99,235,.12)" }} transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: "36px 30px", position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: G.primary, opacity: .7 }} />
                <div style={{ position: "absolute", top: 20, right: 24, fontSize: 64, color: "#EFF6FF", fontWeight: 900, lineHeight: 1, userSelect: "none" }}>"</div>
                <div style={{ color: "#f59e0b", fontSize: 14, marginBottom: 18, letterSpacing: 3 }}>{"★".repeat(t.stars)}</div>
                <div style={{ fontSize: 15, color: "#334155", lineHeight: 1.82, marginBottom: 28, fontStyle: "italic", position: "relative" }}>{t.text}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: G.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#fff", fontWeight: 900, flexShrink: 0, letterSpacing: "-.5px" }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: "#0f172a", fontSize: 14, letterSpacing: "-.2px" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 3, fontWeight: 500 }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "110px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <SectionLabel>FAQ</SectionLabel>
              <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, color: "#0f172a", marginBottom: 16, letterSpacing: "-1.5px", lineHeight: 1.1 }}>Common questions</h2>
              <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.78 }}>Everything you need to know before getting started.</p>
            </div>
          </FadeUp>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((f, i) => (
              <FadeUp key={i} delay={i * .07}>
                <motion.div whileHover={{ borderColor: "#2563eb" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ background: openFaq === i ? "#EFF6FF" : "#fff", border: `1.5px solid ${openFaq === i ? "#2563eb" : "#e2e8f0"}`, borderRadius: 14, padding: "20px 24px", cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", paddingRight: 16, letterSpacing: "-.2px" }}>{f.q}</div>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: .28 }}
                      style={{ width: 30, height: 30, borderRadius: "50%", background: openFaq === i ? G.primary : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke={openFaq === i ? "#fff" : "#2563eb"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </motion.div>
                  </div>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .28, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.82, marginTop: 14, paddingTop: 14, borderTop: "1px solid #BFDBFE" }}>{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "110px 5%", background: G.subtle }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "start", maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp>
            <SectionLabel>Contact Us</SectionLabel>
            <h2 style={{ fontSize: "clamp(30px,3.5vw,44px)", fontWeight: 900, color: "#0f172a", marginBottom: 18, letterSpacing: "-1.5px", lineHeight: 1.12 }}>Let's grow your project together</h2>
            <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.82, marginBottom: 40 }}>Tell us about your project and we'll show you exactly how many leads we can generate — before you spend a single rupee.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "WhatsApp", val: "+91 86185 61535", icon: "💬", bg: "#f0fdf4" },
                { label: "Email", val: "theleads535@gmail.com", icon: "📧", bg: "#EFF6FF" },
                { label: "Location", val: "Bangalore, Karnataka", icon: "📍", bg: "#fff7ed" },
              ].map((item) => (
                <motion.div key={item.label} whileHover={{ x: 8, boxShadow: "0 8px 28px rgba(37,99,235,.1)" }} transition={{ type: "spring", stiffness: 350 }}
                  style={{ display: "flex", gap: 16, alignItems: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "16px 20px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase" }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginTop: 4, letterSpacing: "-.2px" }}>{item.val}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={.18}>
            {submitted ? (
              <motion.div initial={{ scale: .85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}
                style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 22, padding: "60px 40px", textAlign: "center" }}>
                <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: .6 }} style={{ fontSize: 60, marginBottom: 22 }}>✅</motion.div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#16a34a", marginBottom: 12, letterSpacing: "-.5px" }}>WhatsApp Opened!</div>
                <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.78 }}>Your details have been sent. Our team will contact you within 24 hours.</div>
              </motion.div>
            ) : (
              <motion.div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 22, padding: "44px 40px", boxShadow: "0 24px 72px rgba(37,99,235,.09)" }}>
                <div style={{ fontSize: 21, fontWeight: 900, color: "#0f172a", marginBottom: 6, letterSpacing: "-.4px" }}>Get a free consultation</div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 34, fontWeight: 500 }}>We'll get back within 24 hours ⚡</div>
                <form onSubmit={handleSubmit}>
                  {[
                    { label: "Your name", key: "name", placeholder: "Rajesh Kumar" },
                    { label: "Phone number", key: "phone", placeholder: "+91 86185 61535" },
                    { label: "Project name", key: "project", placeholder: "Green Valley Residences" },
                  ].map((field) => (
                    <div key={field.key} style={{ marginBottom: 18 }}>
                      <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#475569", marginBottom: 8, letterSpacing: "1px", textTransform: "uppercase" }}>{field.label}</label>
                      <input style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "13px 16px", fontSize: 14, color: "#0f172a", outline: "none", boxSizing: "border-box", background: "#f8fafc", fontFamily: "inherit", transition: "all .2s" }}
                        placeholder={field.placeholder} value={formData[field.key]} onChange={e => setFormData({ ...formData, [field.key]: e.target.value })} required />
                    </div>
                  ))}
                  <div style={{ marginBottom: 26 }}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 800, color: "#475569", marginBottom: 8, letterSpacing: "1px", textTransform: "uppercase" }}>Monthly ad budget</label>
                    <select style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "13px 16px", fontSize: 14, color: "#0f172a", outline: "none", background: "#f8fafc", boxSizing: "border-box", fontFamily: "inherit", transition: "all .2s" }}
                      value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })} required>
                      <option value="">Select budget range</option>
                      <option>Rs.20,000 – Rs.50,000</option>
                      <option>Rs.50,000 – Rs.1,00,000</option>
                      <option>Rs.1,00,000+</option>
                    </select>
                  </div>
                  {submitError && (
                    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginBottom: 18, fontSize: 13, color: "#dc2626", fontWeight: 500 }}>
                      ⚠️ {submitError}
                    </div>
                  )}
                  <motion.button whileHover={{ scale: submitting ? 1 : 1.02, boxShadow: submitting ? "none" : "0 16px 40px rgba(37,211,102,.38)" }} whileTap={{ scale: submitting ? 1 : .98 }} type="submit"
                    disabled={submitting}
                    style={{ width: "100%", background: submitting ? "#94a3b8" : "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff", border: "none", borderRadius: 11, padding: "17px", fontSize: 16, fontWeight: 800, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit", letterSpacing: "-.2px", transition: "background 0.2s" }}>
                    {submitting ? "⏳ Saving your details..." : "💬 Send via WhatsApp"}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a0f1e", borderTop: "1px solid rgba(255,255,255,.05)", padding: "28px 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
        <motion.img whileHover={{ scale: 1.06 }} src="/theleads.png" alt="TheLeads" style={{ height: 40, objectFit: "contain", filter: "brightness(0) invert(1)", cursor: "pointer" }} />
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", fontWeight: 500 }}>Real estate lead generation · Bangalore</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)", fontWeight: 500 }}>© 2025 TheLeads. All rights reserved.</div>
      </footer>

      {/* ── FLOATING CHAT ── */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999 }}>
        <AnimatePresence>
          {showNotif && !chatOpen && (
            <motion.div initial={{ opacity: 0, y: 12, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .92 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{ position: "absolute", bottom: 76, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: "16px 20px", boxShadow: "0 12px 40px rgba(0,0,0,.15)", minWidth: 220 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Hi there! 👋</div>
              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>Chat with the TheLeads team</div>
              <div style={{ position: "absolute", bottom: -9, right: 24, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid #fff" }} />
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ position: "relative" }}>
          <div className="wa-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#25D366", opacity: .3 }} />
          <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: .93 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 }}
            onClick={() => { setChatOpen(!chatOpen); setShowNotif(false); }}
            style={{ width: 62, height: 62, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#16a34a)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 32px rgba(37,211,102,.5)", position: "relative" }}>
            <AnimatePresence mode="wait">
              {chatOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .18 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </motion.div>
                : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: .18 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {chatOpen && (
          <motion.div initial={{ opacity: 0, y: 24, scale: .93 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .93 }} transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ position: "fixed", bottom: 108, right: 28, width: 340, background: "#fff", borderRadius: 22, boxShadow: "0 28px 72px rgba(0,0,0,.18)", zIndex: 998, border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ background: G.dark, padding: "20px 22px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "1.5px solid rgba(255,255,255,.12)" }}>🏠</div>
              <div>
                <div style={{ fontWeight: 800, color: "#fff", fontSize: 14, letterSpacing: "-.2px" }}>TheLeads Support</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", marginTop: 3, display: "flex", alignItems: "center", gap: 6 }}>
                  <motion.span animate={{ opacity: [1, .3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  Online — replies instantly
                </div>
              </div>
            </div>
            <div style={{ padding: "16px", height: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
              {chatMessages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }}
                  style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ background: m.from === "user" ? G.primary : "#f1f5f9", color: m.from === "user" ? "#fff" : "#0f172a", borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "11px 15px", maxWidth: "85%", fontSize: 13, lineHeight: 1.58, fontWeight: 500 }}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding: "12px 16px 16px", borderTop: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {QUICK_REPLIES.map((r, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.04, background: "#dbeafe" }} whileTap={{ scale: .96 }} onClick={() => handleQuickReply(r)}
                    style={{ background: "#EFF6FF", color: "#1d4ed8", border: "1px solid #BFDBFE", borderRadius: 20, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    {r}
                  </motion.button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleChatSend()}
                  placeholder="Type a message…" style={{ flex: 1, border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 14px", fontSize: 13, outline: "none", background: "#f8fafc", fontFamily: "inherit", transition: "border .2s" }} />
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: .92 }} onClick={handleChatSend}
                  style={{ background: G.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", cursor: "pointer", fontWeight: 800, fontSize: 16 }}>→</motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
