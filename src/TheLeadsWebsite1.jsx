import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://fwqxhwzpfoffriaplhon.supabase.co",
  "sb_publishable_Jo-9ISG6AO5E6984ndGV2w_fkgWaRIg"
);

const NAV_LINKS = ["Services", "How It Works", "Portfolio", "Pricing", "Contact"];

// Particles component
function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map(p => (
        <motion.div key={p.id}
          animate={{ y: [0, -30, 0], opacity: [p.opacity, p.opacity * 2, p.opacity], scale: [1, 1.2, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: `rgba(${Math.random() > 0.5 ? "59,130,246" : Math.random() > 0.5 ? "139,92,246" : "16,185,129"},${p.opacity})`, boxShadow: `0 0 ${p.size * 3}px rgba(59,130,246,0.3)` }}
        />
      ))}
    </div>
  );
}

// Typewriter component
function Typewriter({ texts, speed = 80 }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % texts.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed]);

  return (
    <span>
      {display}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}
        style={{ display: "inline-block", width: 3, height: "0.9em", background: "#60a5fa", marginLeft: 2, verticalAlign: "middle", borderRadius: 1 }} />
    </span>
  );
}

// Loading screen
function LoadingScreen({ onDone }) {
  return (
    <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
      style={{ position: "fixed", inset: 0, background: "#020817", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
      <motion.img src="/theleads.png" alt="TheLeads" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ height: 64, filter: "brightness(0) invert(1)", objectFit: "contain" }} />
      <div style={{ width: 200, height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.2, ease: "easeInOut" }} onAnimationComplete={onDone}
          style={{ height: "100%", background: "linear-gradient(90deg,#2563eb,#7c3aed)", borderRadius: 2 }} />
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ fontSize: 12, color: "#475569", letterSpacing: "2px", fontWeight: 600, textTransform: "uppercase" }}>
        Loading TheLeads...
      </motion.div>
    </motion.div>
  );
}

const SERVICES = [
  {
    icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 22L10 14L16 18L22 8" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="7" r="2.5" fill="#60a5fa" opacity="0.8"/></svg>),
    title: "Lead Generation", desc: "Targeted Meta & Google ad campaigns engineered for real estate. We reach serious buyers actively looking for properties in Bangalore.", tag: "Meta + Google Ads",
    color: "#3b82f6", glow: "rgba(59,130,246,0.3)",
  },
  {
    icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="8" stroke="#a78bfa" strokeWidth="2" opacity="0.9"/><path d="M14 8v6l4 2.5" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/></svg>),
    title: "Site Visit Scheduling", desc: "We don't just hand over numbers. We follow up, qualify, and schedule site visits — sending ready buyers directly to your project.", tag: "Full Follow-up",
    color: "#8b5cf6", glow: "rgba(139,92,246,0.3)",
  },
  {
    icon: (<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="8" width="20" height="15" rx="3" stroke="#34d399" strokeWidth="2" opacity="0.9"/><path d="M9 15h10M9 19h7" stroke="#34d399" strokeWidth="2" strokeLinecap="round"/></svg>),
    title: "Campaign Management", desc: "Full ad account setup, creative production, weekly optimization, and transparent reporting. You focus on closing — we handle the marketing.", tag: "End-to-End",
    color: "#10b981", glow: "rgba(16,185,129,0.3)",
  },
];

const STEPS = [
  { num: "01", title: "You onboard with us", desc: "Share your project details, target audience, and budget. We set up your dedicated ad account in 24 hours.", icon: "📋", color: "#3b82f6" },
  { num: "02", title: "We launch campaigns", desc: "Our team runs optimized Meta and Google ads targeting real buyers in your project's micro-market.", icon: "🚀", color: "#8b5cf6" },
  { num: "03", title: "Leads come in", desc: "Qualified leads are delivered to your WhatsApp in real time — name, number, budget, and project preference.", icon: "📲", color: "#10b981" },
  { num: "04", title: "We schedule site visits", desc: "Our team calls every lead, filters serious buyers, and books site visits directly with your sales team.", icon: "🏠", color: "#f59e0b" },
];

const WHYS = [
  { title: "Real estate only", desc: "We work exclusively with builders and developers. We know what converts in this market.", icon: "🎯", stat: "100%", color: "#3b82f6" },
  { title: "No brokers, no commissions", desc: "Buyers connect directly with you. You keep 100% of the deal — no middlemen cutting in.", icon: "🤝", stat: "0%", color: "#8b5cf6" },
  { title: "Transparent reporting", desc: "Weekly reports showing every rupee spent and every lead generated. No black boxes.", icon: "📊", stat: "24/7", color: "#10b981" },
  { title: "Bangalore expertise", desc: "We know Sarjapur, Whitefield, Devanahalli — the micro-markets, the buyer personas, the price points.", icon: "📍", stat: "3+", color: "#f59e0b" },
];

const STATS = [
  { value: 500, suffix: "+", label: "Leads Delivered", icon: "📈" },
  { value: 300, prefix: "₹", label: "Avg Cost Per Lead", icon: "💰" },
  { value: 40, suffix: "+", label: "Site Visits Booked", icon: "🏠" },
  { value: 3, suffix: "x", label: "Avg ROI For Clients", icon: "🚀" },
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

const MARQUEE_ITEMS = ["Lead Generation", "Site Visits", "Meta Ads", "Google Ads", "Real Estate", "Bangalore", "Quality Leads", "No Brokers", "Direct Sales", "Campaign Management"];

const CHAT_MESSAGES = [
  { from: "bot", text: "Hi! Welcome to TheLeads. How can I help you today?" },
  { from: "bot", text: "We generate quality real estate leads for builders in Bangalore." },
];

const QUICK_REPLIES = ["Get a free consultation", "How does it work?", "What is the pricing?", "Talk to the team"];

// Property images from Unsplash (free)
const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
];

// Property images for sections
const SECTION_IMAGES = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
];

// Animated counter
function Counter({ value, prefix = "", suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    return spring.on("change", v => setDisplay(Math.round(v)));
  }, [spring]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

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
  const [imgIdx, setImgIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showBackTop, setShowBackTop] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setImgIdx(i => (i + 1) % PROPERTY_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const { error } = await supabase.from("leads").insert([{ name: formData.name, phone: formData.phone, project: formData.project, budget: formData.budget }]);
      if (error) throw error;
      const msg = `Hello TheLeads!%0AName: ${formData.name}%0APhone: ${formData.phone}%0AProject: ${formData.project}%0ABudget: ${formData.budget}`;
      window.open(`https://wa.me/918618561535?text=${msg}`, "_blank");
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Something went wrong. Please WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickReply = (reply) => {
    setChatMessages(m => [...m, { from: "user", text: reply }]);
    setTimeout(() => {
      let r = "Our team will get back to you shortly!";
      if (reply.includes("consultation")) r = "Great! Fill the contact form or WhatsApp us at +91 86185 61535.";
      if (reply.includes("work")) r = "We run Meta & Google ads, deliver real-time leads to WhatsApp, and schedule site visits!";
      if (reply.includes("pricing")) r = "We start at Rs.15,000/month + ad spend. Most clients spend Rs.20,000-50,000 on ads/month.";
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

  return (
    <div style={{ fontFamily: "'DM Sans','Inter',sans-serif", color: "#f1f5f9", background: "#020817", minHeight: "100vh", overflowX: "hidden" }}>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setTimeout(() => setLoading(false), 300)} />}
      </AnimatePresence>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(59,130,246,0.6)" }} whileTap={{ scale: .9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ position: "fixed", bottom: 100, left: 28, zIndex: 998, width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(59,130,246,0.35)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 14V4M4 9l5-5 5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.button>
        )}
      </AnimatePresence>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes gradientAnim{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes ping{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2.2);opacity:0}}
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 20px rgba(59,130,246,0.3)}50%{box-shadow:0 0 40px rgba(59,130,246,0.6)}}
        .wa-ping{animation:ping 2s cubic-bezier(0,0,.2,1) infinite}
        .marquee-track{animation:marquee 25s linear infinite}
        .float{animation:float 4s ease-in-out infinite}
        .nav-a{transition:color .2s;position:relative}
        .nav-a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:linear-gradient(90deg,#3b82f6,#8b5cf6);transition:width .3s;border-radius:2px}
        .nav-a:hover{color:#fff!important}
        .nav-a:hover::after{width:100%}
        .glass{background:rgba(255,255,255,0.04);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08)}
        .glass-light{background:rgba(255,255,255,0.06);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1)}
        .neon-border{border:1px solid rgba(59,130,246,0.3);box-shadow:0 0 20px rgba(59,130,246,0.1),inset 0 0 20px rgba(59,130,246,0.05)}
        input:focus,select:focus{border-color:rgba(59,130,246,0.6)!important;box-shadow:0 0 0 3px rgba(59,130,246,0.15),0 0 20px rgba(59,130,246,0.1)!important;outline:none}
        @media(max-width:768px){.nav-links{display:none!important}.hero-btns{flex-direction:column!important;align-items:stretch!important}.stats-grid{grid-template-columns:repeat(2,1fr)!important}.grid-3{grid-template-columns:1fr!important}.grid-2{grid-template-columns:1fr!important}.steps-grid{grid-template-columns:1fr!important}.contact-grid{grid-template-columns:1fr!important}.hero-grid{grid-template-columns:1fr!important}}
      `}</style>

      {/* Top bar */}
      <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        style={{ background: "linear-gradient(90deg,#1e3a8a,#3b82f6,#8b5cf6,#3b82f6,#1e3a8a)", backgroundSize: "300% auto", animation: "gradientAnim 5s ease infinite", padding: "10px 24px", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: ".3px" }}>
        🎉 Free consultation for the first 10 builders this month!
        <motion.span whileHover={{ color: "#bfdbfe" }} onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
          style={{ marginLeft: 12, textDecoration: "underline", cursor: "pointer", color: "#93c5fd" }}>Claim your spot →</motion.span>
      </motion.div>

      {/* Nav */}
      <motion.nav initial={{ y: -64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, delay: .08 }}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%", height: 68, background: "rgba(2,8,23,0.85)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, zIndex: 200 }}>
        <motion.img whileHover={{ scale: 1.05, filter: "brightness(1.2)" }} src="/theleads.png" alt="TheLeads" style={{ height: 46, objectFit: "contain", filter: "brightness(0) invert(1)", cursor: "pointer" }} />
        <ul className="nav-links" style={{ display: "flex", gap: 40, listStyle: "none" }}>
          {NAV_LINKS.map((l, i) => (
            <motion.li key={l} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 + i * .07 }}>
              <a className="nav-a" href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                style={{ fontSize: 16, color: "#cbd5e1", fontWeight: 700, textDecoration: "none", letterSpacing: "-.3px", padding: "6px 0" }}>{l}</a>
            </motion.li>
          ))}
        </ul>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.6)" }} whileTap={{ scale: .97 }}
          onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
          style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none", borderRadius: 8, padding: "11px 26px", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 0 20px rgba(59,130,246,0.35)" }}>
          Get started
        </motion.button>
      </motion.nav>

      {/* Hero */}
      <section style={{ minHeight: "92vh", display: "flex", alignItems: "center", padding: "60px 5%", position: "relative", overflow: "hidden" }}>
        {/* Particles */}
        <Particles />
        {/* Animated background */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(124,58,237,0.1) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 50% 80%, rgba(16,185,129,0.06) 0%, transparent 50%)", pointerEvents: "none", zIndex: 0 }} />
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none", zIndex: 0 }} />

        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", width: "100%", maxWidth: 1200, margin: "0 auto" }}>
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .3 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", color: "#60a5fa", fontSize: 11, fontWeight: 800, padding: "7px 16px", borderRadius: 99, marginBottom: 28, letterSpacing: "1.5px", textTransform: "uppercase", boxShadow: "0 0 20px rgba(59,130,246,0.15)" }}>
              <motion.span animate={{ opacity: [1, .3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
              Bangalore's Real Estate Lead Experts
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .38 }}
              style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, lineHeight: 1.08, color: "#fff", marginBottom: 24, letterSpacing: "-2px" }}>
              Stop paying brokers.<br />
              <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .65, delay: .65 }}
                style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa,#34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
                Start owning your leads.
              </motion.span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8 }}
              style={{ fontSize: 16, color: "#60a5fa", fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "#475569" }}>We specialize in</span>
              <Typewriter texts={["Meta Ads for Real Estate", "Google Ads for Builders", "Quality Lead Generation", "Site Visit Scheduling", "Real Estate Marketing"]} />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .52 }}
              style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.78, marginBottom: 40, maxWidth: 480 }}>
              TheLeads runs targeted Meta & Google ads exclusively for builders and developers — delivering qualified buyers directly to your project, without middlemen.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55, delay: .65 }}
              className="hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.6)" }} whileTap={{ scale: .97 }}
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "16px 36px", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 0 24px rgba(59,130,246,0.4)" }}>
                Get free consultation
              </motion.button>
              <motion.button whileHover={{ scale: 1.04, background: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.6)" }} whileTap={{ scale: .97 }}
                onClick={() => document.getElementById("how-it-works").scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", color: "#60a5fa", border: "1.5px solid rgba(59,130,246,0.4)", borderRadius: 10, padding: "16px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                See how it works
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .85 }}
              style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["No brokers", "Real-time leads", "Site visits", "Bangalore focused"].map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .85 + i * .1 }}
                  style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#64748b", fontWeight: 600 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 10px rgba(59,130,246,0.4)" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                  </div>
                  {t}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Property image showcase */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, delay: .5 }}
            className="float" style={{ position: "relative" }}>
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 0 60px rgba(59,130,246,0.2), 0 0 120px rgba(124,58,237,0.1)" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(37,99,235,0.3),rgba(124,58,237,0.2))", zIndex: 1, mixBlendMode: "overlay" }} />
              <AnimatePresence mode="wait">
                <motion.img key={imgIdx} src={PROPERTY_IMAGES[imgIdx]} alt="Property" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .95 }} transition={{ duration: .8 }}
                  style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} />
              </AnimatePresence>
              {/* Glass overlay card */}
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, zIndex: 2, background: "rgba(2,8,23,0.7)", backdropFilter: "blur(16px)", borderRadius: 16, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 4 }}>Latest lead received</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Rajesh K. — Green Valley, Sarjapur</div>
                <div style={{ fontSize: 12, color: "#22c55e", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  Budget: Rs.50,000 · 2 mins ago
                </div>
              </div>
            </div>
            {/* Floating stat cards */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              style={{ position: "absolute", top: -20, right: -20, background: "rgba(2,8,23,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 16, padding: "14px 18px", boxShadow: "0 0 24px rgba(59,130,246,0.2)" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#60a5fa" }}>500+</div>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>Leads delivered</div>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}
              style={{ position: "absolute", bottom: 100, left: -24, background: "rgba(2,8,23,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 16, padding: "14px 18px", boxShadow: "0 0 24px rgba(139,92,246,0.2)" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#a78bfa" }}>3x ROI</div>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>Avg for clients</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: "rgba(59,130,246,0.08)", borderTop: "1px solid rgba(59,130,246,0.15)", borderBottom: "1px solid rgba(59,130,246,0.15)", padding: "14px 0", overflow: "hidden" }}>
        <div className="marquee-track" style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", letterSpacing: "1px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: "rgba(2,8,23,0.95)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: "100%" }}>
          {STATS.map((s, i) => (
            <FadeUp key={i} delay={i * .1}>
              <motion.div whileHover={{ background: "rgba(59,130,246,0.08)" }}
                style={{ padding: "36px 24px", textAlign: "center", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "background .2s" }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontSize: 38, fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1, background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  <Counter value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
                </div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 8, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>{s.label}</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" style={{ padding: "110px 5%", background: "#020817", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "30%", width: 400, height: 400, background: "radial-gradient(circle,rgba(37,99,235,0.06) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none", transform: "translateY(-50%)" }} />
        <div style={{ position: "relative" }}>
          <FadeUp>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 20, letterSpacing: "2px", textTransform: "uppercase" }}>Our Services</div>
            <h2 style={{ fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-2px", lineHeight: 1.1 }}>
              Everything you need to<br />
              <span style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>sell faster</span>
            </h2>
            <p style={{ fontSize: 17, color: "#475569", maxWidth: 500, lineHeight: 1.78, marginBottom: 60 }}>From the first ad impression to a confirmed site visit — we handle the entire buyer journey.</p>
          </FadeUp>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <FadeUp key={i} delay={i * .13}>
                <motion.div whileHover={{ y: -10, boxShadow: `0 32px 72px ${s.glow}, 0 0 0 1px ${s.color}33` }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px 28px", position: "relative", overflow: "hidden", backdropFilter: "blur(12px)", cursor: "default", height: "100%" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${s.color},transparent)` }} />
                  <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle,${s.glow} 0%,transparent 70%)`, pointerEvents: "none" }} />
                  <motion.div whileHover={{ scale: 1.15, rotate: 8 }} transition={{ type: "spring", stiffness: 400 }}
                    style={{ width: 56, height: 56, borderRadius: 16, background: `rgba(${s.color === "#3b82f6" ? "59,130,246" : s.color === "#8b5cf6" ? "139,92,246" : "16,185,129"},0.15)`, border: `1px solid ${s.color}33`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                    {s.icon}
                  </motion.div>
                  <div style={{ display: "inline-block", background: `${s.color}15`, color: s.color, fontSize: 9, fontWeight: 800, padding: "4px 12px", borderRadius: 99, marginBottom: 14, letterSpacing: "1.2px", textTransform: "uppercase", border: `1px solid ${s.color}30` }}>{s.tag}</div>
                  <div style={{ fontSize: 19, fontWeight: 800, color: "#f1f5f9", marginBottom: 12 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.78 }}>{s.desc}</div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: "110px 5%", background: "rgba(15,23,42,0.8)", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(37,99,235,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 20, letterSpacing: "2px", textTransform: "uppercase" }}>Our Process</div>
          <h2 style={{ fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-2px", lineHeight: 1.1 }}>
            How it <span style={{ background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>works</span>
          </h2>
          <p style={{ fontSize: 17, color: "#475569", maxWidth: 500, lineHeight: 1.78, marginBottom: 72 }}>Simple, transparent, and built around your sales process.</p>
        </FadeUp>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, position: "relative" }}>
          <div style={{ position: "absolute", top: 56, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg,transparent,rgba(59,130,246,0.4),rgba(139,92,246,0.4),transparent)", zIndex: 0 }} />
          {STEPS.map((s, i) => (
            <FadeUp key={i} delay={i * .12}>
              <motion.div whileHover={{ y: -8, background: "rgba(255,255,255,0.04)" }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ padding: "36px 24px", position: "relative", zIndex: 1, textAlign: "left", borderRadius: 16, transition: "background .2s" }}>
                <motion.div whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${s.color}60` }}
                  style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${s.color}cc,${s.color})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: `0 0 20px ${s.color}40`, position: "relative" }}>
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#fff" }}>{s.num}</span>
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [.4, 0, .4] }} transition={{ repeat: Infinity, duration: 2.5, delay: i * .6 }}
                    style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `${s.color}40`, zIndex: -1 }} />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} style={{ fontSize: 32, marginBottom: 14, display: "inline-block" }}>{s.icon}</motion.div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#f1f5f9", marginBottom: 10 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.78 }}>{s.desc}</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section id="why-us" style={{ padding: "110px 5%", background: "#020817", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        {/* Property image strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 64, borderRadius: 20, overflow: "hidden" }}>
          {SECTION_IMAGES.map((img, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}
              style={{ position: "relative", height: 160, overflow: "hidden", borderRadius: 12 }}>
              <img src={img} alt="Property" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(37,99,235,0.5),rgba(124,58,237,0.4))" }} />
              <div style={{ position: "absolute", bottom: 10, left: 12, fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: "1px", textTransform: "uppercase" }}>
                {["Premium Apartments", "Luxury Villas", "Modern Plots", "Commercial Space"][i]}
              </div>
            </motion.div>
          ))}
        </div>
        <FadeUp>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#34d399", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 20, letterSpacing: "2px", textTransform: "uppercase" }}>Why TheLeads</div>
          <h2 style={{ fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-2px", lineHeight: 1.1 }}>
            Built for <span style={{ background: "linear-gradient(135deg,#34d399,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>builders</span>, not brokers
          </h2>
          <p style={{ fontSize: 17, color: "#475569", maxWidth: 500, lineHeight: 1.78, marginBottom: 60 }}>We exist to fix what's broken in real estate marketing.</p>
        </FadeUp>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20 }}>
          {WHYS.map((w, i) => (
            <FadeUp key={i} delay={i * .11}>
              <motion.div whileHover={{ y: -6, borderColor: `${w.color}40`, boxShadow: `0 20px 48px ${w.color}15` }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "36px 30px", backdropFilter: "blur(12px)", cursor: "default", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle,${w.color}15 0%,transparent 70%)`, pointerEvents: "none" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <motion.div whileHover={{ scale: 1.3, rotate: -10 }} style={{ fontSize: 36 }}>{w.icon}</motion.div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-1.5px", lineHeight: 1, background: `linear-gradient(135deg,${w.color},${w.color}aa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{w.stat}</div>
                    <div style={{ fontSize: 9, color: "#475569", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginTop: 4 }}>Key metric</div>
                  </div>
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#f1f5f9", marginBottom: 10 }}>{w.title}</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.78 }}>{w.desc}</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" style={{ padding: "110px 5%", background: "#020817", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(37,99,235,0.05) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 60 }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#34d399", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 20, letterSpacing: "2px", textTransform: "uppercase" }}>Our Portfolio</div>
                <h2 style={{ fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-2px", lineHeight: 1.1 }}>
                  Real projects.<br />
                  <span style={{ background: "linear-gradient(135deg,#34d399,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Real results.</span>
                </h2>
                <p style={{ fontSize: 17, color: "#475569", maxWidth: 480, lineHeight: 1.78 }}>We have been running successful Meta ad campaigns for these Bangalore builders for the past 3 months.</p>
              </div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { value: "4", label: "Active Projects" },
                  { value: "3+", label: "Months Running" },
                  { value: "500+", label: "Leads Generated" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: "#34d399", letterSpacing: "-1px" }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>

            {/* Project 1 — Maruti Akrida */}
            <FadeUp delay={0}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 32px 72px rgba(245,158,11,0.2)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 24, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <img src={`${process.env.PUBLIC_URL}/maruti.jpg`} alt="Maruti Akrida" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.85) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(245,158,11,0.9)", color: "#000", fontSize: 10, fontWeight: 900, padding: "5px 12px", borderRadius: 99, letterSpacing: "1px" }}>BMRDA APPROVED</div>
                  <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(34,197,94,0.9)", color: "#fff", fontSize: 10, fontWeight: 900, padding: "5px 12px", borderRadius: 99, letterSpacing: "1px" }}>● CAMPAIGN ACTIVE</div>
                </div>
                <div style={{ padding: "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Maruti Akrida</div>
                      <div style={{ fontSize: 13, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>📍</span> Near Attibele Circle, Bangalore
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#fbbf24" }}>₹68L+</div>
                      <div style={{ fontSize: 11, color: "#475569" }}>Onwards</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                    {["Premium Apartments", "Swimming Pool", "Modern Gym", "Cricket Net"].map((t, i) => (
                      <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "rgba(245,158,11,0.1)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.2)" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 12 }}>
                    <div style={{ fontSize: 12, color: "#475569" }}>📞 8095273273</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#34d399" }}>✅ Managed by TheLeads</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Project 2 — Amoga Sai Residency */}
            <FadeUp delay={0.13}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 32px 72px rgba(59,130,246,0.2)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 24, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <img src={`${process.env.PUBLIC_URL}/amoga.jpg`} alt="Amoga Sai Residency" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.85) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(59,130,246,0.9)", color: "#fff", fontSize: 10, fontWeight: 900, padding: "5px 12px", borderRadius: 99, letterSpacing: "1px" }}>BDA APPROVED</div>
                  <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(34,197,94,0.9)", color: "#fff", fontSize: 10, fontWeight: 900, padding: "5px 12px", borderRadius: 99, letterSpacing: "1px" }}>● CAMPAIGN ACTIVE</div>
                </div>
                <div style={{ padding: "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Amoga Sai Residency</div>
                      <div style={{ fontSize: 13, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>📍</span> Bangalore
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#60a5fa" }}>₹74L+</div>
                      <div style={{ fontSize: 11, color: "#475569" }}>2BHK Onwards</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                    {["2 BHK ₹74L", "3 BHK ₹87L", "OC & CC Approved", "Banks Approved"].map((t, i) => (
                      <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "rgba(59,130,246,0.1)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 12 }}>
                    <div style={{ fontSize: 12, color: "#475569" }}>📞 9902221329</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#34d399" }}>✅ Managed by TheLeads</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Project 3 — Radiant Kaira */}
            <FadeUp delay={0.2}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 32px 72px rgba(139,92,246,0.2)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 24, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <img src={`${process.env.PUBLIC_URL}/radiant.jpg`} alt="Radiant Kaira" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.85) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(139,92,246,0.9)", color: "#fff", fontSize: 10, fontWeight: 900, padding: "5px 12px", borderRadius: 99, letterSpacing: "1px" }}>BMRDA APPROVED</div>
                  <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(34,197,94,0.9)", color: "#fff", fontSize: 10, fontWeight: 900, padding: "5px 12px", borderRadius: 99, letterSpacing: "1px" }}>● CAMPAIGN ACTIVE</div>
                </div>
                <div style={{ padding: "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Radiant Kaira</div>
                      <div style={{ fontSize: 13, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>📍</span> Chandapura, Anekal Road
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#a78bfa" }}>₹60L+</div>
                      <div style={{ fontSize: 11, color: "#475569" }}>2BHK Onwards</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                    {["2 BHK ₹60L", "3 BHK ₹71L", "991-1490 SqFt", "Aerial View"].map((t, i) => (
                      <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 12 }}>
                    <div style={{ fontSize: 12, color: "#475569" }}>📞 8095273273</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#34d399" }}>✅ Managed by TheLeads</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>

            {/* Project 4 — Garuda Blossoms */}
            <FadeUp delay={0.3}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 32px 72px rgba(16,185,129,0.2)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 24, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                  <img src={`${process.env.PUBLIC_URL}/garuda.jpg`} alt="Garuda Blossoms" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.85) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(16,185,129,0.9)", color: "#fff", fontSize: 10, fontWeight: 900, padding: "5px 12px", borderRadius: 99, letterSpacing: "1px" }}>BBMP APPROVED</div>
                  <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(34,197,94,0.9)", color: "#fff", fontSize: 10, fontWeight: 900, padding: "5px 12px", borderRadius: 99, letterSpacing: "1px" }}>● CAMPAIGN ACTIVE</div>
                </div>
                <div style={{ padding: "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 4 }}>Garuda Blossoms</div>
                      <div style={{ fontSize: 13, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>📍</span> NRI Layout, Ramamurthy Nagar
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#34d399" }}>₹5999/sqft</div>
                      <div style={{ fontSize: 11, color: "#475569" }}>All Inclusive</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                    {["3 BHK Ready", "1630-1730 SqFt", "10 Exclusive Flats", "5 Floors"].map((t, i) => (
                      <span key={i} style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: "rgba(16,185,129,0.1)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 12 }}>
                    <div style={{ fontSize: 12, color: "#475569" }}>📞 7090444421</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: "#34d399" }}>✅ Managed by TheLeads</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          </div>

          {/* CTA below portfolio */}
          <FadeUp delay={0.4}>
            <div style={{ textAlign: "center", marginTop: 56, padding: "36px 40px", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: "-0.5px" }}>Want results like these? 🚀</div>
              <p style={{ fontSize: 15, color: "#475569", marginBottom: 24, lineHeight: 1.7 }}>We are currently running successful campaigns for 4 builders in Bangalore. Join them and start getting quality leads today.</p>
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(16,185,129,0.5)" }} whileTap={{ scale: .97 }}
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                style={{ background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", border: "none", borderRadius: 12, padding: "16px 40px", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 24px rgba(16,185,129,0.3)" }}>
                Get free consultation →
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "110px 5%", background: "rgba(15,23,42,0.8)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: "#fbbf24", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 20, letterSpacing: "2px", textTransform: "uppercase" }}>Testimonials</div>
            <h2 style={{ fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1.1 }}>What our clients say</h2>
          </div>
        </FadeUp>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * .13}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 24px 56px rgba(59,130,246,0.15)", borderColor: "rgba(59,130,246,0.3)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "34px 28px", backdropFilter: "blur(12px)", position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,rgba(59,130,246,0.6),transparent)" }} />
                <div style={{ position: "absolute", top: 20, right: 24, fontSize: 72, color: "rgba(59,130,246,0.08)", fontWeight: 900, lineHeight: 1 }}>"</div>
                <div style={{ color: "#f59e0b", fontSize: 14, marginBottom: 18, letterSpacing: 3, textShadow: "0 0 10px rgba(245,158,11,0.5)" }}>{"★".repeat(t.stars)}</div>
                <div style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.82, marginBottom: 28, fontStyle: "italic" }}>{t.text}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#fff", fontWeight: 900, boxShadow: "0 0 16px rgba(59,130,246,0.4)" }}>{t.initials}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: "#f1f5f9", fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#475569", marginTop: 3 }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: "110px 5%", background: "rgba(15,23,42,0.9)", borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(124,58,237,0.07) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 20, letterSpacing: "2px", textTransform: "uppercase" }}>Pricing Plans</div>
              <h2 style={{ fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, color: "#fff", marginBottom: 16, letterSpacing: "-2px", lineHeight: 1.1 }}>
                Simple, transparent<br />
                <span style={{ background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pricing</span>
              </h2>
              <p style={{ fontSize: 17, color: "#475569", maxWidth: 500, margin: "0 auto", lineHeight: 1.78 }}>No hidden fees. No broker commissions. Just quality leads for your real estate project.</p>
            </div>
          </FadeUp>

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1100, margin: "0 auto" }}>

            {/* Starter */}
            <FadeUp delay={0}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 32px 72px rgba(59,130,246,0.2)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 24, padding: "40px 32px", position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#3b82f6,transparent)" }} />
                <div style={{ fontSize: 12, fontWeight: 800, color: "#60a5fa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>Starter</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>₹15,000</span>
                  <span style={{ fontSize: 14, color: "#475569", marginBottom: 8, fontWeight: 600 }}>/month</span>
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginBottom: 32 }}>+ Ad spend (min Rs.20,000/month)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                  {[
                    "Meta Ads campaign setup",
                    "Up to 50 leads/month",
                    "WhatsApp lead delivery",
                    "Weekly performance report",
                    "1 project at a time",
                    "Email support",
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#94a3b8" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(59,130,246,0.4)" }} whileTap={{ scale: .97 }}
                  onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                  style={{ width: "100%", background: "transparent", color: "#60a5fa", border: "1.5px solid rgba(59,130,246,0.4)", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                  Get started →
                </motion.button>
              </motion.div>
            </FadeUp>

            {/* Growth — Most Popular */}
            <FadeUp delay={0.13}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 32px 72px rgba(124,58,237,0.35)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: "linear-gradient(160deg,rgba(37,99,235,0.15),rgba(124,58,237,0.15))", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 24, padding: "40px 32px", position: "relative", overflow: "hidden", height: "100%", boxShadow: "0 0 40px rgba(124,58,237,0.15)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#3b82f6,#7c3aed,#3b82f6)" }} />
                {/* Most popular badge */}
                <div style={{ position: "absolute", top: 20, right: 20, background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 99, letterSpacing: "1px", textTransform: "uppercase", boxShadow: "0 0 16px rgba(124,58,237,0.5)" }}>Most Popular</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#a78bfa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>Growth</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>₹30,000</span>
                  <span style={{ fontSize: 14, color: "#475569", marginBottom: 8, fontWeight: 600 }}>/month</span>
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginBottom: 32 }}>+ Ad spend (min Rs.30,000/month)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                  {[
                    "Meta + Google Ads campaigns",
                    "Up to 120 leads/month",
                    "WhatsApp + Email delivery",
                    "Site visit scheduling",
                    "Daily performance report",
                    "Up to 2 projects",
                    "Priority WhatsApp support",
                    "Monthly strategy call",
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#94a3b8" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(124,58,237,0.6)" }} whileTap={{ scale: .97 }}
                  onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                  style={{ width: "100%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 24px rgba(124,58,237,0.4)" }}>
                  Get started →
                </motion.button>
              </motion.div>
            </FadeUp>

            {/* Premium */}
            <FadeUp delay={0.26}>
              <motion.div whileHover={{ y: -8, boxShadow: "0 32px 72px rgba(245,158,11,0.2)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 24, padding: "40px 32px", position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#f59e0b,transparent)" }} />
                <div style={{ fontSize: 12, fontWeight: 800, color: "#fbbf24", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 16 }}>Premium</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>₹60,000</span>
                  <span style={{ fontSize: 14, color: "#475569", marginBottom: 8, fontWeight: 600 }}>/month</span>
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginBottom: 32 }}>+ Ad spend (min Rs.60,000/month)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                  {[
                    "Meta + Google + YouTube Ads",
                    "Unlimited leads",
                    "Dedicated lead manager",
                    "Site visit scheduling + followup",
                    "Real-time dashboard access",
                    "Unlimited projects",
                    "24/7 dedicated support",
                    "Weekly strategy call",
                    "Custom creatives & videos",
                    "CRM integration",
                  ].map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#94a3b8" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(245,158,11,0.4)" }} whileTap={{ scale: .97 }}
                  onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                  style={{ width: "100%", background: "transparent", color: "#fbbf24", border: "1.5px solid rgba(245,158,11,0.4)", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                  Get started →
                </motion.button>
              </motion.div>
            </FadeUp>
          </div>

          {/* Bottom note */}
          <FadeUp delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 48, padding: "24px 32px", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 16, maxWidth: 600, margin: "48px auto 0" }}>
              <div style={{ fontSize: 14, color: "#60a5fa", fontWeight: 700, marginBottom: 8 }}>🎉 Not sure which plan to choose?</div>
              <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>Get a free consultation and we'll recommend the best plan based on your project size, location and target audience.</div>
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 24px rgba(59,130,246,0.4)" }} whileTap={{ scale: .97 }}
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginTop: 16 }}>
                Get free consultation →
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Property Gallery */}
      <section style={{ padding: "80px 5%", background: "#020817", position: "relative", overflow: "hidden" }}>
        <FadeUp>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 20, letterSpacing: "2px", textTransform: "uppercase" }}>Property Gallery</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-2px", lineHeight: 1.1 }}>
              Projects we <span style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>market</span> in Bangalore
            </h2>
            <p style={{ fontSize: 16, color: "#475569", maxWidth: 480, margin: "0 auto", lineHeight: 1.78 }}>From luxury apartments to premium villas — we generate leads for all types of real estate projects.</p>
          </div>
        </FadeUp>

        {/* Masonry style grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "auto", gap: 16 }}>
          {/* Large image left */}
          <FadeUp delay={0}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
              style={{ position: "relative", height: 340, borderRadius: 20, overflow: "hidden", gridRow: "span 2" }}>
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="Luxury Apartment" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.9) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#60a5fa", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Luxury Apartment</div>
                <div style={{ fontSize: 17, fontWeight: 900, color: "#fff" }}>Premium 3BHK Living</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Whitefield, Bangalore</div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Top middle */}
          <FadeUp delay={0.1}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
              style={{ position: "relative", height: 160, borderRadius: 20, overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="Villa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.85) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 14, left: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Luxury Villa</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Sarjapur Road</div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Top right */}
          <FadeUp delay={0.15}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
              style={{ position: "relative", height: 160, borderRadius: 20, overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" alt="Modern Home" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.85) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 14, left: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Modern Home</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Devanahalli</div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Bottom middle */}
          <FadeUp delay={0.2}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
              style={{ position: "relative", height: 160, borderRadius: 20, overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="Premium Plot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.85) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 14, left: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Premium Plot</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Attibele, Bangalore</div>
              </div>
            </motion.div>
          </FadeUp>

          {/* Bottom right */}
          <FadeUp delay={0.25}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
              style={{ position: "relative", height: 160, borderRadius: 20, overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" alt="Commercial Space" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.85) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 14, left: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Commercial Space</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Electronic City</div>
              </div>
            </motion.div>
          </FadeUp>
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 16 }}>
          {[
            { img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", title: "2BHK Apartment", location: "Chandapura" },
            { img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80", title: "Ready to Move", location: "Ramamurthy Nagar" },
            { img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", title: "Gated Community", location: "Anekal Road" },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
                style={{ position: "relative", height: 180, borderRadius: 20, overflow: "hidden" }}>
                <img src={item.img} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,8,23,0.9) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 16, left: 18 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>📍 {item.location}</div>
                </div>
                <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(34,197,94,0.9)", color: "#fff", fontSize: 9, fontWeight: 800, padding: "4px 10px", borderRadius: 99, letterSpacing: "1px" }}>● ACTIVE</div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "110px 5%", background: "#020817" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 20, letterSpacing: "2px", textTransform: "uppercase" }}>FAQ</div>
              <h2 style={{ fontSize: "clamp(32px,4vw,50px)", fontWeight: 900, color: "#fff", marginBottom: 14, letterSpacing: "-2px", lineHeight: 1.1 }}>Common questions</h2>
              <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.78 }}>Everything you need to know before getting started.</p>
            </div>
          </FadeUp>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((f, i) => (
              <FadeUp key={i} delay={i * .07}>
                <motion.div whileHover={{ borderColor: "rgba(59,130,246,0.4)" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ background: openFaq === i ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.02)", border: `1.5px solid ${openFaq === i ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: "20px 24px", cursor: "pointer", backdropFilter: "blur(12px)", transition: "all .2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", paddingRight: 16 }}>{f.q}</div>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: .28 }}
                      style={{ width: 30, height: 30, borderRadius: "50%", background: openFaq === i ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: openFaq === i ? "0 0 16px rgba(59,130,246,0.4)" : "none" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </motion.div>
                  </div>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .28 }} style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: 14, color: "#64748b", lineHeight: 1.82, marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "110px 5%", background: "rgba(15,23,42,0.9)", borderTop: "1px solid rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 80% 50%,rgba(37,99,235,0.07) 0%,transparent 60%)", pointerEvents: "none" }} />
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "start", maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <FadeUp>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", color: "#60a5fa", fontSize: 10, fontWeight: 800, padding: "6px 14px", borderRadius: 4, marginBottom: 20, letterSpacing: "2px", textTransform: "uppercase" }}>Contact Us</div>
            <h2 style={{ fontSize: "clamp(30px,3.5vw,46px)", fontWeight: 900, color: "#fff", marginBottom: 18, letterSpacing: "-2px", lineHeight: 1.12 }}>Let's grow your project together</h2>
            <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.82, marginBottom: 40 }}>Tell us about your project and we'll show you exactly how many leads we can generate — before you spend a single rupee.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "WhatsApp", val: "+91 86185 61535", icon: "💬", color: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.2)" },
                { label: "Email", val: "theleads535@gmail.com", icon: "📧", color: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.2)" },
                { label: "Instagram", val: "@thele.ads", icon: "📸", color: "rgba(225,48,108,0.15)", border: "rgba(225,48,108,0.2)" },
                { label: "Location", val: "Bangalore, Karnataka", icon: "📍", color: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.2)" },
              ].map((item) => (
                <motion.div key={item.label} whileHover={{ x: 8, boxShadow: `0 8px 28px ${item.border}` }}
                  transition={{ type: "spring", stiffness: 350 }}
                  style={{ display: "flex", gap: 16, alignItems: "center", background: item.color, border: `1px solid ${item.border}`, borderRadius: 14, padding: "16px 20px", backdropFilter: "blur(12px)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 9, color: "#475569", fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase" }}>{item.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#f1f5f9", marginTop: 4 }}>{item.val}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={.18}>
            {submitted ? (
              <motion.div initial={{ scale: .85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}
                style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 22, padding: "60px 40px", textAlign: "center", backdropFilter: "blur(16px)" }}>
                <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: .6 }} style={{ fontSize: 64, marginBottom: 22 }}>✅</motion.div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#22c55e", marginBottom: 12 }}>WhatsApp Opened!</div>
                <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.78 }}>Your details have been sent. Our team will contact you within 24 hours.</div>
              </motion.div>
            ) : (
              <motion.div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: "44px 38px", backdropFilter: "blur(20px)", boxShadow: "0 0 60px rgba(59,130,246,0.08)" }}>
                <div style={{ fontSize: 21, fontWeight: 900, color: "#f1f5f9", marginBottom: 6 }}>Get a free consultation</div>
                <div style={{ fontSize: 13, color: "#475569", marginBottom: 34, fontWeight: 500 }}>We'll get back within 24 hours ⚡</div>
                <form onSubmit={handleSubmit}>
                  {[
                    { label: "Your name", key: "name", placeholder: "Enter your name" },
                    { label: "Phone number", key: "phone", placeholder: "Enter your phone number" },
                    { label: "Project name", key: "project", placeholder: "Enter your project name" },
                  ].map((field) => (
                    <div key={field.key} style={{ marginBottom: 18 }}>
                      <label style={{ display: "block", fontSize: 10, fontWeight: 800, color: "#475569", marginBottom: 8, letterSpacing: "1.2px", textTransform: "uppercase" }}>{field.label}</label>
                      <input style={{ width: "100%", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "13px 16px", fontSize: 14, color: "#f1f5f9", outline: "none", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", fontFamily: "inherit", transition: "all .2s" }}
                        placeholder={field.placeholder} value={formData[field.key]} onChange={e => setFormData({ ...formData, [field.key]: e.target.value })} required />
                    </div>
                  ))}
                  <div style={{ marginBottom: 26 }}>
                    <label style={{ display: "block", fontSize: 10, fontWeight: 800, color: "#475569", marginBottom: 8, letterSpacing: "1.2px", textTransform: "uppercase" }}>Monthly ad budget</label>
                    <select style={{ width: "100%", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "13px 16px", fontSize: 14, color: "#f1f5f9", outline: "none", background: "rgba(15,23,42,0.9)", boxSizing: "border-box", fontFamily: "inherit", transition: "all .2s" }}
                      value={formData.budget} onChange={e => setFormData({ ...formData, budget: e.target.value })} required>
                      <option value="">Select budget range</option>
                      <option>Rs.20,000 – Rs.50,000</option>
                      <option>Rs.50,000 – Rs.1,00,000</option>
                      <option>Rs.1,00,000+</option>
                    </select>
                  </div>
                  {submitError && (
                    <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 18, fontSize: 13, color: "#f87171" }}>⚠️ {submitError}</div>
                  )}
                  <motion.button whileHover={{ scale: submitting ? 1 : 1.02, boxShadow: submitting ? "none" : "0 0 40px rgba(34,197,94,0.4)" }} whileTap={{ scale: submitting ? 1 : .98 }} type="submit" disabled={submitting}
                    style={{ width: "100%", background: submitting ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg,#16a34a,#15803d)", color: "#fff", border: "none", borderRadius: 11, padding: "17px", fontSize: 16, fontWeight: 800, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                    {submitting ? "⏳ Saving your details..." : "💬 Send via WhatsApp"}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#020817", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 5% 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 40, maxWidth: 1100, margin: "0 auto 40px" }}>
          {/* Brand */}
          <div>
            <motion.img whileHover={{ scale: 1.06 }} src="/theleads.png" alt="TheLeads" style={{ height: 44, objectFit: "contain", filter: "brightness(0) invert(1)", cursor: "pointer", opacity: 0.9, marginBottom: 16, display: "block" }} />
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, maxWidth: 220 }}>Bangalore's #1 real estate lead generation agency. No brokers, just results.</p>
            {/* Social links */}
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              {/* Instagram */}
              <motion.a href="https://www.instagram.com/thele.ads" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(225,48,108,0.5)" }} whileTap={{ scale: .95 }}
                style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </motion.a>
              {/* WhatsApp */}
              <motion.a href="https://wa.me/918618561535" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(37,211,102,0.5)" }} whileTap={{ scale: .95 }}
                style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#25D366,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </motion.a>
              {/* LinkedIn */}
              <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(10,102,194,0.5)" }} whileTap={{ scale: .95 }}
                style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#0a66c2,#0077b5)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#60a5fa", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20 }}>Services</div>
            {["Lead Generation", "Site Visit Scheduling", "Campaign Management", "Meta Ads", "Google Ads"].map((s, i) => (
              <motion.div key={i} whileHover={{ x: 6, color: "#60a5fa" }}
                style={{ fontSize: 13, color: "#475569", marginBottom: 12, cursor: "pointer", transition: "color .2s", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#3b82f6", display: "inline-block", opacity: .6 }} />
                {s}
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#60a5fa", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20 }}>Contact</div>
            {[
              { icon: "💬", text: "+91 86185 61535", href: "https://wa.me/918618561535" },
              { icon: "📧", text: "theleads535@gmail.com", href: "mailto:theleads535@gmail.com" },
              { icon: "📍", text: "Bangalore, Karnataka", href: "#" },
              { icon: "📸", text: "@thele.ads", href: "https://www.instagram.com/thele.ads" },
            ].map((item, i) => (
              <motion.a key={i} href={item.href} target="_blank" rel="noopener noreferrer" whileHover={{ x: 6, color: "#60a5fa" }}
                style={{ fontSize: 13, color: "#475569", marginBottom: 14, cursor: "pointer", transition: "color .2s", display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                <span>{item.icon}</span>
                {item.text}
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#60a5fa", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 20 }}>Get Started</div>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, marginBottom: 20 }}>Ready to grow your real estate project? Get your free consultation today.</p>
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.5)" }} whileTap={{ scale: .97 }}
              onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer", width: "100%" }}>
              Free consultation →
            </motion.button>
            <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#60a5fa", fontWeight: 700, letterSpacing: "0.5px" }}>Follow us on Instagram</div>
              <motion.a href="https://www.instagram.com/thele.ads" target="_blank" rel="noopener noreferrer"
                whileHover={{ color: "#f472b6" }} style={{ fontSize: 14, fontWeight: 800, color: "#fff", textDecoration: "none", display: "block", marginTop: 4 }}>@thele.ads</motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 12, color: "#334155", fontWeight: 500 }}>© 2025 TheLeads. All rights reserved.</div>
          <div style={{ fontSize: 12, color: "#334155", fontWeight: 500 }}>Real estate lead generation · Bangalore</div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map((t, i) => (
              <motion.span key={i} whileHover={{ color: "#60a5fa" }} style={{ fontSize: 12, color: "#334155", cursor: "pointer", transition: "color .2s" }}>{t}</motion.span>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating Chat */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999 }}>
        <AnimatePresence>
          {showNotif && !chatOpen && (
            <motion.div initial={{ opacity: 0, y: 12, scale: .92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .92 }}
              style={{ position: "absolute", bottom: 76, right: 0, background: "rgba(15,23,42,0.95)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 18, padding: "16px 20px", boxShadow: "0 10px 40px rgba(0,0,0,.4), 0 0 20px rgba(59,130,246,0.15)", minWidth: 220, backdropFilter: "blur(16px)" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9", marginBottom: 4 }}>Hi there! 👋</div>
              <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.6 }}>Chat with the TheLeads team</div>
              <div style={{ position: "absolute", bottom: -9, right: 24, width: 0, height: 0, borderLeft: "9px solid transparent", borderRight: "9px solid transparent", borderTop: "9px solid rgba(15,23,42,0.95)" }} />
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ position: "relative" }}>
          <div className="wa-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#25D366", opacity: .25 }} />
          <motion.button whileHover={{ scale: 1.12, boxShadow: "0 0 40px rgba(37,211,102,0.6)" }} whileTap={{ scale: .93 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1 }}
            onClick={() => { setChatOpen(!chatOpen); setShowNotif(false); }}
            style={{ width: 62, height: 62, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#16a34a)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(37,211,102,0.4)", position: "relative" }}>
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
            style={{ position: "fixed", bottom: 108, right: 28, width: 340, background: "rgba(15,23,42,0.97)", borderRadius: 22, boxShadow: "0 28px 72px rgba(0,0,0,.5), 0 0 40px rgba(59,130,246,0.15)", zIndex: 998, border: "1px solid rgba(59,130,246,0.2)", overflow: "hidden", backdropFilter: "blur(20px)" }}>
            <div style={{ background: "linear-gradient(135deg,rgba(37,99,235,0.8),rgba(124,58,237,0.8))", padding: "20px 22px", display: "flex", alignItems: "center", gap: 14, backdropFilter: "blur(20px)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "1.5px solid rgba(255,255,255,0.2)" }}>🏠</div>
              <div>
                <div style={{ fontWeight: 800, color: "#fff", fontSize: 14 }}>TheLeads Support</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 3, display: "flex", alignItems: "center", gap: 6 }}>
                  <motion.span animate={{ opacity: [1, .3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px #22c55e" }} />
                  Online — replies instantly
                </div>
              </div>
            </div>
            <div style={{ padding: "16px", height: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
              {chatMessages.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .04 }}
                  style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ background: m.from === "user" ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "rgba(255,255,255,0.06)", color: "#f1f5f9", borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "11px 15px", maxWidth: "84%", fontSize: 13, lineHeight: 1.55, border: m.from === "user" ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding: "12px 16px 16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {QUICK_REPLIES.map((r, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.05, background: "rgba(59,130,246,0.2)", borderColor: "rgba(59,130,246,0.5)" }} whileTap={{ scale: .96 }} onClick={() => handleQuickReply(r)}
                    style={{ background: "rgba(59,130,246,0.1)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 20, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                    {r}
                  </motion.button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleChatSend()}
                  placeholder="Type a message…" style={{ flex: 1, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", fontSize: 13, outline: "none", background: "rgba(255,255,255,0.04)", fontFamily: "inherit", color: "#f1f5f9", transition: "border .2s" }} />
                <motion.button whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }} whileTap={{ scale: .92 }} onClick={handleChatSend}
                  style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", cursor: "pointer", fontWeight: 800, fontSize: 15 }}>→</motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
