import { useState, useEffect, useRef } from "react";

// ============================================================
// DATA
// ============================================================
const PROJECTS = [
  {
    id: 1,
    code: "PRJ-001",
    name: "JARVIS / CYBX",
    subtitle: "ERP AI Agent — Live Enterprise Integration",
    desc: "Full-stack AI Agent connecting n8n Cloud + Groq LLaMA 3.3 70B to a live Odoo ERP via REST API. Handles HR, Finance & CRM queries through natural language. Deployed in 1 day. Zero cost stack.",
    stack: ["n8n Cloud", "Groq LLaMA 3.3 70B", "Odoo ERP", "REST API", "JSON-RPC"],
    category: "AI · Automation",
    status: "LIVE",
    statusColor: "#00B4CC",
    metrics: ["377ms response", "$0 cost", "3 ERP modules", "1 day build"],
  },
  {
    id: 2,
    code: "PRJ-002",
    name: "Enterprise Network Lab",
    subtitle: "Virtual Multi-Zone Security Infrastructure",
    desc: "Full enterprise network in VirtualBox — WAN/LAN/DMZ/MGMT zones. OPNsense firewall, Windows Server 2022 DC, Suricata IDS. Complete pentest executed: vsftpd CVE-2011-2523 exploited to root via Metasploit. Lateral movement blocked.",
    stack: ["OPNsense", "Windows Server 2022", "Kali Linux", "Metasploit", "Suricata", "VirtualBox"],
    category: "Networking · Security",
    status: "COMPLETE",
    statusColor: "#00B4CC",
    metrics: ["7 phases", "Full pentest", "CVE exploited", "AD DS deployed"],
  },
  {
    id: 3,
    code: "PRJ-003",
    name: "Cisco Packet Tracer Lab",
    subtitle: "Multi-Site Enterprise Network — HQ Mila & Constantine",
    desc: "Simulated enterprise network with 8 VLANs, inter-VLAN routing, OSPF dynamic routing between HQ and remote branch, NAT/PAT, extended ACLs, centralized DHCP, and SSH v2. Zero packet loss across all sites.",
    stack: ["Cisco Packet Tracer", "OSPF", "VLANs", "NAT/PAT", "ACLs", "SSH v2"],
    category: "Networking",
    status: "COMPLETE",
    statusColor: "#00B4CC",
    metrics: ["8 VLANs", "0% packet loss", "2 sites", "Full routing"],
  },
  {
    id: 4,
    code: "PRJ-004",
    name: "NEXUS-CYBEROPS",
    subtitle: "Autonomous AI CyberOps Sovereign · V3.0 SUPERNOVA",
    desc: "Hyper-deterministic AI security system embedded in Kali Linux. 5 specialist sub-agents: SOC Analyst, Pentest Engineer, Digital Forensics, Script Engineer, Threat Hunter. Full kill-chain orchestration with anti-hallucination engine and meta-cognition self-evolution loop.",
    stack: ["Kali Linux", "MITRE ATT&CK", "Volatility 3", "Metasploit", "Sigma/YARA", "Custom AI Agents"],
    category: "AI · Security",
    status: "IN PROGRESS",
    statusColor: "#C0392B",
    metrics: ["5 sub-agents", "7-phase pipeline", "<0.5% error rate", "Self-evolving"],
  },
  {
    id: 5,
    code: "PRJ-005",
    name: "CyberShield-Press",
    subtitle: "AI Cyberattack Detection for Digital Journalism",
    desc: "Bilingual AR/EN AI security system protecting journalism platforms. 5 detection modules: DDoS (ML/LSTM), APT behavioral (GNN/HMM), Phishing NLP (AraBERT/RoBERTa), Deepfake (EfficientNet), Insider Threat (UEBA). React bilingual dashboard. PhD-grade research contribution.",
    stack: ["TensorFlow", "AraBERT", "FastAPI", "React", "Zeek", "Suricata", "Docker", "AWS"],
    category: "AI · Research",
    status: "IN PROGRESS",
    statusColor: "#C0392B",
    metrics: [">98% DDoS accuracy", "5 AI modules", "AR/EN bilingual", "Hybrid cloud"],
  },
  {
    id: 6,
    code: "PRJ-006",
    name: "NEXUS ACADEMY",
    subtitle: "IT Training Center — NESDA Business Plan",
    desc: "Full NESDA-compliant business plan for a physical IT training center in Algiers. Cisco labs, Pearson VUE exam center, multi-vendor certifications. 15M DZD financing via Islamic Murabaha/Ijara structures (Al Baraka / Al Salam Bank).",
    stack: ["NESDA Framework", "Islamic Finance", "Cisco Labs", "Pearson VUE", "Business Planning"],
    category: "Entrepreneurship",
    status: "IN PROGRESS",
    statusColor: "#C0392B",
    metrics: ["15M DZD plan", "Pearson VUE center", "Islamic financing", "Multi-vendor certs"],
  },
  {
    id: 7,
    code: "PRJ-007",
    name: "Networking Encyclopedia",
    subtitle: "75 Protocols · 8 Parts · Professional Reference",
    desc: "Comprehensive technical reference document covering 75 networking protocols across 8 structured parts. Cisco aesthetic, authored as a professional engineering reference with deep conceptual content and practical implementation details.",
    stack: ["TCP/IP", "Routing Protocols", "Security Protocols", "Application Layer", "Technical Writing"],
    category: "Technical Writing",
    status: "COMPLETE",
    statusColor: "#00B4CC",
    metrics: ["75 protocols", "8 parts", "Professional .docx", "Cisco aesthetic"],
  },
  {
    id: 8,
    code: "PRJ-008",
    name: "Cybersecurity Lecture",
    subtitle: "Safe Digital Content Creation — Constantine 3",
    desc: "Cinematic cybersecurity lecture delivered at Université Constantine 3. Two PPTX versions built with dark cyberpunk aesthetic, real background photos, glassmorphism cards, and binary effects. Topic: Safe Digital Content Creation for students.",
    stack: ["pptxgenjs", "Cyberpunk Design", "Glassmorphism", "Education"],
    category: "Education",
    status: "COMPLETE",
    statusColor: "#00B4CC",
    metrics: ["2 PPTX versions", "University lecture", "Cinematic design", "Constantine 3"],
  },
];

const SKILLS = [
  {
    category: "Networking",
    color: "#00B4CC",
    items: ["Cisco IOS", "OPNsense", "VLANs & Trunking", "OSPF / BGP", "NAT / ACLs", "Packet Tracer", "GNS3"],
  },
  {
    category: "Security",
    color: "#C0392B",
    items: ["Penetration Testing", "Metasploit", "Suricata IDS", "Firewall Architecture", "MITRE ATT&CK", "Forensics", "Kali Linux"],
  },
  {
    category: "AI & Automation",
    color: "#00B4CC",
    items: ["n8n Workflows", "Groq LLaMA 3.3", "AI Agent Design", "LLM Integration", "AraBERT / NLP", "TensorFlow", "FastAPI"],
  },
  {
    category: "Infrastructure",
    color: "#C0392B",
    items: ["Windows Server 2022", "Active Directory", "Linux Administration", "Docker", "AWS", "VirtualBox", "VMware"],
  },
  {
    category: "Development",
    color: "#00B4CC",
    items: ["Python", "React", "REST API", "JSON-RPC", "Bash Scripting", "Git / GitHub", "HTML / CSS"],
  },
];

const CERTS = [
  "CyberOps Associate",
  "DevNet Associate",
  "Network Security",
  "Introduction to Cybersecurity",
  "Programming With Python",
  "Introduction to Claude Cowork",
  "AI Fluency: Framework & Foundation",
  "Building with the Claude API",
  "Network Support & Security",
  "Ethical Hacking: Penetration Testing",
  "Network Technician Career Path",
];

const EXPERIENCE = [
  {
    year: "2026",
    role: "IT Officer",
    org: "BellaCeram",
    desc: "Built and deployed JARVIS — a live ERP AI Agent (n8n + Groq + Odoo) presented as a working demonstration of enterprise AI automation capability.",
    type: "INDUSTRY",
  },
  {
    year: "2025–2026",
    role: "Instructor",
    org: "Université Constantine 3 — Salah Boubnider",
    desc: "Delivered technical lectures on cybersecurity and networking. Developed cinematic educational materials for student engagement.",
    type: "ACADEMIA",
  },
  {
    year: "2026",
    role: "Founder",
    org: "NEXUS ACADEMY",
    desc: "Designing Algeria's next-generation IT training center with Cisco labs, Pearson VUE exam center, and multi-vendor certifications. Full NESDA business plan completed.",
    type: "FOUNDER",
  },
];

// ============================================================
// PARTICLE CANVAS
// ============================================================
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,180,204,${p.alpha})`;
        ctx.fill();
      });
      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,180,204,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}

// ============================================================
// GLITCH TEXT
// ============================================================
function GlitchText({ text, style = {} }) {
  return (
    <span className="glitch" data-text={text} style={style}>
      {text}
    </span>
  );
}

// ============================================================
// NAV
// ============================================================
function Nav({ active, setActive }) {
  const links = ["HOME", "ABOUT", "SKILLS", "PROJECTS", "EXPERIENCE", "CONTACT"];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2.5rem",
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(0,180,204,0.12)" : "none",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.1rem", fontWeight: 700, color: "#00B4CC", letterSpacing: "0.15em" }}>
        CYBER<span style={{ color: "#C0392B" }}>X</span>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`}
            onClick={() => setActive(l)}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              color: active === l ? "#00B4CC" : "rgba(232,232,232,0.45)",
              textDecoration: "none",
              transition: "color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => e.target.style.color = "#00B4CC"}
            onMouseLeave={(e) => e.target.style.color = active === l ? "#00B4CC" : "rgba(232,232,232,0.45)"}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const full = "Where AI & Networks Think.";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= full.length) { setTyped(full.slice(0, i)); i++; }
      else clearInterval(t);
    }, 60);
    const c = setInterval(() => setShowCursor((s) => !s), 500);
    return () => { clearInterval(t); clearInterval(c); };
  }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "flex-start",
      padding: "0 8vw", position: "relative", zIndex: 1,
    }}>
      {/* top label */}
      <div style={{
        fontFamily: "'Orbitron', monospace", fontSize: "0.65rem",
        letterSpacing: "0.3em", color: "#C0392B",
        marginBottom: "2rem",
        display: "flex", alignItems: "center", gap: "1rem",
      }}>
        <span style={{ display: "inline-block", width: 32, height: 1, background: "#C0392B" }} />
        SARIA AMINE · ENGINEER & FOUNDER
        <span style={{ display: "inline-block", width: 32, height: 1, background: "#C0392B" }} />
      </div>

      {/* name */}
      <h1 style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
        fontWeight: 900,
        color: "#E8E8E8",
        lineHeight: 1,
        marginBottom: "1.2rem",
        letterSpacing: "-0.02em",
      }}>
        CYBER<span style={{ color: "#00B4CC" }}>X</span>
      </h1>

      {/* hero line */}
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "clamp(1.1rem, 2.5vw, 1.9rem)",
        fontWeight: 300,
        color: "#E8E8E8",
        marginBottom: "0.6rem",
        letterSpacing: "0.02em",
      }}>
        {typed}<span style={{ opacity: showCursor ? 1 : 0, color: "#00B4CC" }}>|</span>
      </h2>

      {/* sub line */}
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "0.85rem",
        color: "rgba(232,232,232,0.4)",
        letterSpacing: "0.2em",
        marginBottom: "3.5rem",
      }}>
        AI &nbsp;·&nbsp; NETWORK AUTOMATION &nbsp;·&nbsp; SECURITY ENGINEERING
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
        <a href="#projects" style={{
          fontFamily: "'Orbitron', monospace", fontSize: "0.65rem",
          letterSpacing: "0.2em", color: "#0A0A0A",
          background: "#00B4CC", padding: "0.9rem 2.2rem",
          textDecoration: "none", fontWeight: 700,
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          transition: "all 0.2s",
        }}
          onMouseEnter={(e) => e.target.style.background = "#00D4F0"}
          onMouseLeave={(e) => e.target.style.background = "#00B4CC"}
        >EXPLORE PROJECTS</a>
        <a href="#contact" style={{
          fontFamily: "'Orbitron', monospace", fontSize: "0.65rem",
          letterSpacing: "0.2em", color: "#E8E8E8",
          border: "1px solid rgba(232,232,232,0.2)", padding: "0.9rem 2.2rem",
          textDecoration: "none",
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          transition: "all 0.2s",
        }}
          onMouseEnter={(e) => { e.target.style.borderColor = "#C0392B"; e.target.style.color = "#C0392B"; }}
          onMouseLeave={(e) => { e.target.style.borderColor = "rgba(232,232,232,0.2)"; e.target.style.color = "#E8E8E8"; }}
        >LET'S BUILD</a>
      </div>

      {/* scroll hint */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "8vw",
        fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
        letterSpacing: "0.3em", color: "rgba(232,232,232,0.2)",
        display: "flex", alignItems: "center", gap: "0.8rem",
      }}>
        <span style={{ display: "inline-block", width: 24, height: 1, background: "rgba(232,232,232,0.2)" }} />
        SCROLL TO EXPLORE
      </div>

      {/* side stats */}
      <div style={{
        position: "absolute", right: "5vw", top: "50%",
        transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: "2rem",
        alignItems: "flex-end",
      }}>
        {[["08", "PROJECTS"], ["11", "CERTIFICATIONS"], ["03", "DOMAINS"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "2rem", fontWeight: 900, color: "#00B4CC", lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", color: "rgba(232,232,232,0.3)", marginTop: "0.2rem" }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ABOUT
// ============================================================
function About() {
  return (
    <section id="about" style={{ padding: "8rem 8vw", position: "relative", zIndex: 1 }}>
      <SectionLabel label="ABOUT" index="01" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center", marginTop: "4rem" }}>
        <div>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            fontWeight: 900, color: "#E8E8E8", lineHeight: 1.15,
            marginBottom: "2rem",
          }}>
            The Engineer<br /><span style={{ color: "#00B4CC" }}>Who Builds</span><br />Intelligence.
          </h2>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1rem", color: "rgba(232,232,232,0.6)",
            lineHeight: 1.85, marginBottom: "1.5rem",
          }}>
            I'm a Network Automation & Security Engineer based in Algeria — but I operate without borders. I don't just configure networks or write scripts. I architect intelligent systems that think, respond, and evolve.
          </p>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1rem", color: "rgba(232,232,232,0.6)",
            lineHeight: 1.85, marginBottom: "1.5rem",
          }}>
            From penetration testing live enterprise labs to building ERP AI agents deployed in production — from designing autonomous AI security sovereigns to planning the next-generation IT training center in Algiers — I build at the intersection of networks, security, and artificial intelligence.
          </p>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1rem", color: "rgba(232,232,232,0.6)",
            lineHeight: 1.85,
          }}>
            This isn't a portfolio. It's a <span style={{ color: "#00B4CC" }}>proof of work</span>.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(0,180,204,0.08)" }}>
          {[
            ["Algeria", "Based In"],
            ["8+", "Projects Built"],
            ["AI + Net + Sec", "Triple Domain"],
            ["NEXUS ACADEMY", "Founder Of"],
          ].map(([val, label]) => (
            <div key={label} style={{
              background: "#0A0A0A", padding: "2.5rem 2rem",
              borderLeft: "1px solid rgba(0,180,204,0.1)",
              borderTop: "1px solid rgba(0,180,204,0.1)",
            }}>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "1.4rem", fontWeight: 900, color: "#00B4CC", marginBottom: "0.5rem" }}>{val}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(232,232,232,0.3)" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SKILLS
// ============================================================
function Skills() {
  return (
    <section id="skills" style={{ padding: "8rem 8vw", position: "relative", zIndex: 1 }}>
      <SectionLabel label="THE ARSENAL" index="02" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "rgba(0,180,204,0.06)", marginTop: "4rem" }}>
        {SKILLS.map((s) => (
          <div key={s.category} style={{
            background: "#0A0A0A", padding: "2.5rem",
            borderTop: `2px solid ${s.color}`,
            transition: "background 0.3s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#111111"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#0A0A0A"}
          >
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: "0.65rem",
              letterSpacing: "0.25em", color: s.color, marginBottom: "1.5rem",
            }}>{s.category}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {s.items.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={{ width: 4, height: 4, background: s.color, borderRadius: "50%", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", color: "rgba(232,232,232,0.7)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// PROJECT CARD
// ============================================================
function ProjectCard({ p, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#111111" : "#0A0A0A",
        border: `1px solid ${hovered ? "rgba(0,180,204,0.3)" : "rgba(0,180,204,0.08)"}`,
        padding: "2.5rem",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* bg number */}
      <div style={{
        position: "absolute", right: "1.5rem", top: "1rem",
        fontFamily: "'Orbitron', monospace", fontSize: "5rem",
        fontWeight: 900, color: "rgba(0,180,204,0.04)",
        lineHeight: 1, userSelect: "none",
      }}>0{index + 1}</div>

      {/* top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <span style={{
          fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
          letterSpacing: "0.25em", color: "rgba(232,232,232,0.25)",
        }}>{p.code}</span>
        <span style={{
          fontFamily: "'Orbitron', monospace", fontSize: "0.5rem",
          letterSpacing: "0.2em", color: p.statusColor,
          border: `1px solid ${p.statusColor}`,
          padding: "0.25rem 0.7rem",
        }}>{p.status}</span>
      </div>

      {/* category */}
      <div style={{
        fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
        letterSpacing: "0.2em", color: "#00B4CC", marginBottom: "0.8rem",
      }}>{p.category}</div>

      {/* name */}
      <h3 style={{
        fontFamily: "'Orbitron', monospace", fontSize: "1.1rem",
        fontWeight: 900, color: "#E8E8E8", marginBottom: "0.4rem",
        letterSpacing: "0.05em",
      }}>{p.name}</h3>
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem",
        color: "rgba(232,232,232,0.35)", marginBottom: "1.2rem",
        letterSpacing: "0.05em",
      }}>{p.subtitle}</p>

      {/* desc */}
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.88rem",
        color: "rgba(232,232,232,0.55)", lineHeight: 1.75,
        marginBottom: "1.8rem",
      }}>{p.desc}</p>

      {/* metrics */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {p.metrics.map((m) => (
          <span key={m} style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem",
            color: "#00B4CC", background: "rgba(0,180,204,0.08)",
            padding: "0.25rem 0.7rem", letterSpacing: "0.05em",
          }}>{m}</span>
        ))}
      </div>

      {/* stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {p.stack.map((s) => (
          <span key={s} style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.68rem",
            color: "rgba(232,232,232,0.35)",
            border: "1px solid rgba(232,232,232,0.1)",
            padding: "0.2rem 0.6rem",
          }}>{s}</span>
        ))}
      </div>

      {/* bottom line on hover */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 2, background: `linear-gradient(90deg, ${p.statusColor}, transparent)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />
    </div>
  );
}

// ============================================================
// PROJECTS
// ============================================================
function Projects() {
  const [filter, setFilter] = useState("ALL");
  const categories = ["ALL", "AI · Automation", "Networking · Security", "Networking", "AI · Security", "AI · Research", "Entrepreneurship", "Technical Writing", "Education"];
  const filtered = filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" style={{ padding: "8rem 8vw", position: "relative", zIndex: 1 }}>
      <SectionLabel label="PROJECTS" index="03" />

      {/* filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "3rem", marginBottom: "3rem" }}>
        {["ALL", "AI · Automation", "Networking · Security", "AI · Security", "AI · Research", "Entrepreneurship"].map((c) => (
          <button key={c} onClick={() => setFilter(c)} style={{
            fontFamily: "'Orbitron', monospace", fontSize: "0.55rem",
            letterSpacing: "0.2em", cursor: "pointer",
            padding: "0.5rem 1.2rem",
            background: filter === c ? "#00B4CC" : "transparent",
            color: filter === c ? "#0A0A0A" : "rgba(232,232,232,0.35)",
            border: filter === c ? "1px solid #00B4CC" : "1px solid rgba(232,232,232,0.1)",
            transition: "all 0.2s",
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "1px", background: "rgba(0,180,204,0.05)" }}>
        {filtered.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
      </div>
    </section>
  );
}

// ============================================================
// EXPERIENCE & CERTS
// ============================================================
function Experience() {
  return (
    <section id="experience" style={{ padding: "8rem 8vw", position: "relative", zIndex: 1 }}>
      <SectionLabel label="EXPERIENCE & CREDENTIALS" index="04" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", marginTop: "4rem" }}>

        {/* Timeline */}
        <div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#00B4CC", marginBottom: "2rem" }}>EXPERIENCE</div>
          <div style={{ position: "relative", paddingLeft: "2rem", borderLeft: "1px solid rgba(0,180,204,0.2)" }}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} style={{ marginBottom: "3rem", position: "relative" }}>
                <div style={{
                  position: "absolute", left: "-2.4rem", top: 4,
                  width: 8, height: 8, borderRadius: "50%",
                  background: e.type === "FOUNDER" ? "#C0392B" : "#00B4CC",
                  boxShadow: `0 0 12px ${e.type === "FOUNDER" ? "#C0392B" : "#00B4CC"}`,
                }} />
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", color: e.type === "FOUNDER" ? "#C0392B" : "#00B4CC", letterSpacing: "0.15em" }}>{e.year}</span>
                  <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.5rem", color: "rgba(232,232,232,0.2)", border: "1px solid rgba(232,232,232,0.1)", padding: "0.15rem 0.5rem", letterSpacing: "0.15em" }}>{e.type}</span>
                </div>
                <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.85rem", fontWeight: 700, color: "#E8E8E8", marginBottom: "0.3rem" }}>{e.role}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "#00B4CC", marginBottom: "0.7rem" }}>{e.org}</div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "rgba(232,232,232,0.45)", lineHeight: 1.7 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certs */}
        <div>
          <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#00B4CC", marginBottom: "2rem" }}>CERTIFICATIONS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {CERTS.map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "0.9rem 1.2rem",
                background: "#0D0D0D",
                border: "1px solid rgba(0,180,204,0.08)",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,180,204,0.3)"; e.currentTarget.style.background = "#111"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,180,204,0.08)"; e.currentTarget.style.background = "#0D0D0D"; }}
              >
                <span style={{ width: 6, height: 6, background: "#00B4CC", borderRadius: "50%", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", color: "rgba(232,232,232,0.65)" }}>{c}</span>
                <span style={{ marginLeft: "auto", fontFamily: "'Orbitron', monospace", fontSize: "0.45rem", color: "rgba(0,180,204,0.5)", letterSpacing: "0.1em" }}>CERTIFIED</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  return (
    <section id="contact" style={{ padding: "8rem 8vw", position: "relative", zIndex: 1 }}>
      <SectionLabel label="CONTACT" index="05" />
      <div style={{ marginTop: "4rem", maxWidth: 700 }}>
        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(1.8rem, 3vw, 3rem)",
          fontWeight: 900, color: "#E8E8E8", lineHeight: 1.2,
          marginBottom: "1.5rem",
        }}>
          Have a project?<br /><span style={{ color: "#00B4CC" }}>Let's make it</span><br />intelligent.
        </h2>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "1rem", color: "rgba(232,232,232,0.45)",
          lineHeight: 1.8, marginBottom: "3.5rem",
        }}>
          Whether it's AI automation, network architecture, security infrastructure — or building the future of IT education in Algeria. I'm ready.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(0,180,204,0.08)" }}>
          {[
            { label: "EMAIL", value: "vviimmxxii@gmail.com", href: "mailto:vviimmxxii@gmail.com" },
            { label: "LINKEDIN", value: "Amine S.", href: "https://linkedin.com/in/amine-s" },
            { label: "GITHUB", value: "Nova-dev1", href: "https://github.com/Nova-dev1" },
          ].map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "1.5rem 2rem", background: "#0A0A0A",
                textDecoration: "none", transition: "all 0.2s",
                borderLeft: "2px solid transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#111"; e.currentTarget.style.borderLeftColor = "#00B4CC"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#0A0A0A"; e.currentTarget.style.borderLeftColor = "transparent"; }}
            >
              <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(232,232,232,0.3)" }}>{c.label}</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", color: "#00B4CC" }}>{c.value}</span>
              <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", color: "rgba(232,232,232,0.2)" }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{
      padding: "2.5rem 8vw",
      borderTop: "1px solid rgba(0,180,204,0.08)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      position: "relative", zIndex: 1,
    }}>
      <div style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.7rem", fontWeight: 700, color: "#00B4CC" }}>
        CYBER<span style={{ color: "#C0392B" }}>X</span>
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem", color: "rgba(232,232,232,0.2)", letterSpacing: "0.1em" }}>
        © 2026 · SARIA AMINE · WHERE AI & NETWORKS THINK
      </div>
    </footer>
  );
}

// ============================================================
// SECTION LABEL
// ============================================================
function SectionLabel({ label, index }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.6rem", color: "#C0392B", letterSpacing: "0.2em" }}>{index}</span>
      <span style={{ display: "inline-block", width: 40, height: 1, background: "rgba(0,180,204,0.3)" }} />
      <span style={{ fontFamily: "'Orbitron', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "rgba(232,232,232,0.3)" }}>{label}</span>
    </div>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [active, setActive] = useState("HOME");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Grotesk:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0A0A0A; color: #E8E8E8; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #00B4CC; }

        .glitch {
          position: relative;
          display: inline-block;
        }
        .glitch::before, .glitch::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
        }
        .glitch::before {
          color: #C0392B;
          animation: glitch1 3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }
        .glitch::after {
          color: #00B4CC;
          animation: glitch2 3s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }
        @keyframes glitch1 {
          0%, 90%, 100% { transform: translate(0); opacity: 0; }
          92% { transform: translate(-2px, 1px); opacity: 0.8; }
          94% { transform: translate(2px, -1px); opacity: 0.8; }
          96% { transform: translate(0); opacity: 0; }
        }
        @keyframes glitch2 {
          0%, 90%, 100% { transform: translate(0); opacity: 0; }
          93% { transform: translate(2px, -1px); opacity: 0.6; }
          95% { transform: translate(-2px, 1px); opacity: 0.6; }
          97% { transform: translate(0); opacity: 0; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        section { animation: fadeInUp 0.6s ease forwards; }

        /* Scanline overlay */
        body::before {
          content: '';
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 2px,
            rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px
          );
          pointer-events: none; z-index: 999;
        }
      `}</style>

      <ParticleCanvas />
      <Nav active={active} setActive={setActive} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
