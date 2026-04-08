import { useState, useEffect } from "react";
import { apps, logoFiles } from "./data/apps";
import { categories } from "./data/categories";

function AppLogo({ name, size = 36 }) {
  const file = logoFiles[name];
  const radius = Math.round(size * 0.2);
  if (file) {
    return (
      <img
        src={`/logos/${file}`}
        width={size}
        height={size}
        alt={name}
        style={{ borderRadius: radius, display: "block", objectFit: "contain", flexShrink: 0 }}
      />
    );
  }
  // Fallback
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="#3a3a5a"/>
      <text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="700" fill="white" fontFamily="system-ui, sans-serif">
        {name.charAt(0).toUpperCase()}
      </text>
    </svg>
  );
}

// ── Utility icons ─────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7.5" fill="#10b98122"/>
    <path d="M4 7.5L6.5 10L11 5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const XIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7.5" fill="#ef444420"/>
    <path d="M5 5L10 10M10 5L5 10" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const PartialIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7.5" fill="#f59e0b18"/>
    <path d="M4 7.5H11" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function BoolCell({ value }) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <XIcon />;
  return <PartialIcon />;
}

function CellTooltip({ children, tooltip }) {
  const [show, setShow] = useState(false);
  if (!tooltip) return children;
  return (
    <div
      style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "help" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <div style={{
        position: "absolute",
        top: "-3px",
        right: "-4px",
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: "#f59e0b",
        opacity: show ? 1 : 0.55,
        transition: "opacity 0.15s",
        pointerEvents: "none",
      }} />
      {show && (
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 7px)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 200,
          background: "#13132e",
          border: "1px solid #f59e0b40",
          borderRadius: "8px",
          padding: "9px 12px",
          width: "210px",
          boxShadow: "0 8px 28px rgba(0,0,0,0.6)",
          fontSize: "11px",
          color: "#a8a8cc",
          lineHeight: 1.55,
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          fontWeight: 400,
          textAlign: "left",
          pointerEvents: "none",
          whiteSpace: "normal",
        }}>
          <div style={{ position: "absolute", bottom: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)", width: "8px", height: "8px", background: "#13132e", border: "1px solid #f59e0b40", borderTop: "none", borderLeft: "none" }} />
          {tooltip}
        </div>
      )}
    </div>
  );
}

// ── Feature tag — neutral, unified style ──────────────────────────────────────

function FeatureTag({ label }) {
  return (
    <span style={{
      fontSize: "12px",
      fontWeight: 600,
      padding: "4px 10px",
      borderRadius: "4px",
      background: "#1e1e38",
      color: "#8888bb",
      border: "1px solid #2a2a48",
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: "0.3px",
    }}>
      {label}
    </span>
  );
}

// ── App card ──────────────────────────────────────────────────────────────────

function AppCard({ app, onSelect }) {
  const cat = categories[app.category];
  return (
    <div
      onClick={() => onSelect(app)}
      style={{
        background: "#111120",
        border: "1px solid #1e1e35",
        borderRadius: "14px",
        padding: "20px",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${cat.color}70`;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 32px ${cat.color}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e1e35";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Subtle category accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${cat.color}60, transparent)`, borderRadius: "14px 14px 0 0" }} />

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
        <div style={{ flexShrink: 0 }}>
          <AppLogo name={app.name} size={40} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "18px", color: "#e0e0ff", lineHeight: 1.2, marginBottom: "4px" }}>
            {app.name}
          </div>
          <div style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            background: `${cat.color}18`,
            color: cat.color,
            border: `1px solid ${cat.color}35`,
          }}>
            {cat.label}
          </div>
        </div>
      </div>

      <p style={{ color: "#7777aa", fontSize: "14px", lineHeight: 1.55, margin: "0 0 12px 0" }}>{app.tagline}</p>

      {app.warning && (
        <div style={{
          marginBottom: "10px", padding: "5px 9px", borderRadius: "5px",
          background: "#ef444410", border: "1px solid #ef444430",
          fontSize: "12px", color: "#ef4444", fontFamily: "'JetBrains Mono', monospace",
          display: "block", letterSpacing: "0.3px",
        }}>
          ⚠ {app.warning}
        </div>
      )}

      {app.maturity && (
        <div style={{
          marginBottom: "10px", padding: "4px 11px", borderRadius: "5px",
          background: "#f9731610", border: "1px solid #f9731630",
          fontSize: "12px", color: "#f97316", fontFamily: "'JetBrains Mono', monospace",
          display: "inline-block", letterSpacing: "0.3px",
        }}>
          IN DEV — {app.maturity}
        </div>
      )}

      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {app.pfs && <FeatureTag label="PFS" />}
        {app.quantumResistant && <FeatureTag label="Post-Quantum" />}
        {app.noPhoneRequired && <FeatureTag label="No Phone" />}
        {app.selfHostable && <FeatureTag label="Self-Host" />}
        {app.p2p && <FeatureTag label="P2P" />}
        {app.offlineCapable && <FeatureTag label="Offline" />}
      </div>
    </div>
  );
}

// ── Detail modal ──────────────────────────────────────────────────────────────

function SectionHeader({ color, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
      <div style={{ width: "3px", height: "16px", background: color, borderRadius: "2px", flexShrink: 0 }} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "1.5px" }}>{children}</span>
    </div>
  );
}

function DetailModal({ app, onClose }) {
  const cat = categories[app.category];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)",
      backdropFilter: "blur(10px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "40px 20px",
      overflowY: "auto",
    }} onClick={onClose}>
      <div style={{
        background: "#0e0e1e",
        border: `1px solid ${cat.color}35`,
        borderRadius: "18px",
        maxWidth: "820px",
        width: "100%",
        padding: "36px",
        position: "relative",
        boxShadow: `0 24px 80px ${cat.color}12`,
      }} onClick={(e) => e.stopPropagation()}>

        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${cat.color}, ${cat.color}00)`, borderRadius: "18px 18px 0 0" }} />

        <button onClick={onClose} style={{
          position: "absolute", top: "18px", right: "18px",
          background: "#1a1a30", border: "1px solid #2a2a45",
          color: "#7777aa", fontSize: "18px", cursor: "pointer",
          width: "32px", height: "32px", borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center",
          lineHeight: 1,
        }}>×</button>

        {/* App header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
          <AppLogo name={app.name} size={56} />
          <div>
            <h2 style={{ margin: "0 0 6px 0", fontFamily: "'JetBrains Mono', monospace", color: "#e8e8ff", fontSize: "28px", fontWeight: 700 }}>{app.name}</h2>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 14px", borderRadius: "20px", fontSize: "12px",
              fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase",
              background: `${cat.color}18`, color: cat.color, border: `1px solid ${cat.color}35`,
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: cat.color }} />
              {cat.label} — {cat.desc}
            </div>
          </div>
        </div>

        <p style={{ color: "#7777aa", fontSize: "15px", lineHeight: 1.6, margin: "0 0 24px 0" }}>{app.tagline}</p>

        {app.warning && (
          <div style={{ marginBottom: "20px", padding: "14px 18px", background: "#ef444410", borderRadius: "8px", border: "1px solid #ef444430" }}>
            <div style={{ color: "#ef4444", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>⚠ Caution</div>
            <div style={{ color: "#ff8888", fontSize: "14px", lineHeight: 1.6 }}>{app.warning}</div>
          </div>
        )}

        {/* Info grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {[
            ["Protocol", app.protocol],
            ["Architecture", app.architecture],
            ["Encryption", app.encryption],
            ["Open Source", app.openSource],
            ["Identifier", app.identifier],
            ["Platforms", app.platforms],
            ["Group Size Limit", app.groupSize],
            ["Max Devices", app.maxDevices],
            ["Price", app.price],
            ["User Base", app.userBase],
            ["Jurisdiction", app.jurisdiction],
            ["Funding", app.funding],
            ...(app.maturity ? [["Maturity", app.maturity]] : []),
          ].map(([k, v]) => (
            <div key={k} style={{ background: "#14142a", borderRadius: "8px", padding: "12px 16px", border: "1px solid #1e1e38" }}>
              <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px", color: "#55558a" }}>{k}</div>
              <div style={{ color: "#b8b8d8", fontSize: "14px", lineHeight: 1.4 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Feature booleans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "8px", marginBottom: "28px" }}>
          {[
            ["Perfect Forward Secrecy", app.pfs],
            ["Post-Compromise Security", app.postCompromise],
            ["Quantum Resistant", app.quantumResistant],
            ["Anonymous Sign-up", app.anonymousSignup],
            ["No Phone Required", app.noPhoneRequired],
            ["Self-Hostable", app.selfHostable],
            ["Federated", app.federated],
            ["Peer-to-Peer", app.p2p],
            ["Offline Capable", app.offlineCapable],
            ["Voice/Video", app.voiceVideo],
            ["Multi-Device", app.multiDevice],
            ["Security Audited", app.audited],
          ].map(([label, val]) => (
            <div key={label} style={{
              background: "#14142a", borderRadius: "7px", padding: "10px 12px",
              display: "flex", alignItems: "center", gap: "8px",
              border: "1px solid #1e1e38",
            }}>
              <BoolCell value={val} />
              <span style={{ fontSize: "12px", color: "#8888bb", lineHeight: 1.3 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Pros */}
        <div style={{ marginBottom: "20px" }}>
          <SectionHeader color="#10b981">Strengths</SectionHeader>
          {app.pros.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "4px" }}>
                <circle cx="7" cy="7" r="3" fill="#10b981" opacity="0.7"/>
              </svg>
              <span style={{ color: "#a8a8c8", fontSize: "14px", lineHeight: 1.55 }}>{p}</span>
            </div>
          ))}
        </div>

        {/* Cons */}
        <div style={{ marginBottom: "20px" }}>
          <SectionHeader color="#ef4444">Weaknesses</SectionHeader>
          {app.cons.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "4px" }}>
                <circle cx="7" cy="7" r="3" fill="#ef4444" opacity="0.7"/>
              </svg>
              <span style={{ color: "#a8a8c8", fontSize: "14px", lineHeight: 1.55 }}>{c}</span>
            </div>
          ))}
        </div>

        {/* Centralization points */}
        <div style={{ marginBottom: "24px" }}>
          <SectionHeader color="#f59e0b">Centralization Points</SectionHeader>
          {app.centralizationPoints.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "4px" }}>
                <path d="M7 2.5 L7 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="7" cy="10.5" r="1.2" fill="#f59e0b"/>
              </svg>
              <span style={{ color: "#a8a8c8", fontSize: "14px", lineHeight: 1.55 }}>{c}</span>
            </div>
          ))}
        </div>

        {/* Metadata / rate limiting / offline delivery */}
        {[
          ["Metadata Protection", app.metadataProtection],
          ["Rate Limiting & Spam Protection", app.rateLimiting],
          ["Offline Message Delivery", app.offlineDelivery],
        ].filter(([, v]) => v).map(([label, val]) => (
          <div key={label} style={{ marginBottom: "12px", padding: "14px 18px", background: "#14142a", borderRadius: "8px", border: "1px solid #1e1e38" }}>
            <div style={{ color: "#55558a", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{label}</div>
            <div style={{ color: "#b0b0cc", fontSize: "14px", lineHeight: 1.6 }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Comparison table ──────────────────────────────────────────────────────────

function ComparisonTable({ selected }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    if (!activeTooltip) return;
    const handler = () => setActiveTooltip(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [activeTooltip]);

  const features = [
    { key: "architecture", label: "Architecture", tooltip: "How the system is structured — whether messages flow through servers controlled by a single company, a distributed network of servers, or directly between devices." },
    { key: "encryption", label: "Encryption", tooltip: "The cryptographic algorithm used to scramble your messages so only the intended recipient can read them." },
    { key: "identifier", label: "Identity", tooltip: "What identifies you on the network — a phone number ties your account to your real identity, while a public key or random ID allows more anonymity." },
    { key: "openSourceStatus", label: "Open Source", tooltip: "Whether the client, server, and/or protocol source code is publicly available for independent review. Open source code can be audited by anyone, making it harder to hide backdoors or security flaws." },
    { key: "pfs", label: "Forward Secrecy", bool: true, tooltip: "Each message is encrypted with a fresh temporary key that is immediately discarded. If an attacker steals your keys today, they still can't read past messages.", good: "Past messages stay safe even if your keys are stolen later", bad: "A stolen key could decrypt your entire message history" },
    { key: "postCompromise", label: "Post-Compromise", bool: true, tooltip: "Also called \"Break-in Recovery\" or \"Healing\". Even if an attacker briefly gained access to your device or keys, future messages automatically become secure again without any action from you.", good: "Encryption heals itself — future messages become secure again automatically", bad: "Once compromised, all future messages remain at risk until you take manual action" },
    { key: "quantumResistant", label: "Quantum Resistant", bool: true, tooltip: "Future quantum computers could break today's common encryption. Quantum-resistant algorithms are designed to remain secure even against that threat.", good: "Messages stay secure even if quantum computers become powerful enough to break standard encryption", bad: "The encryption could be broken by a sufficiently powerful quantum computer" },
    { key: "anonymousSignup", label: "Anonymous Sign-up", bool: true, tooltip: "You can create an account without providing a phone number, email, or any personal information that could be used to identify you.", good: "No personal info needed — your account can't be tied to your real identity at registration", bad: "Requires phone number, email, or other identifying info to sign up" },
    { key: "noPhoneRequired", label: "No Phone Required", bool: true, tooltip: "You can use the app without linking it to a phone number. Many apps require phone verification, which ties your account to a real-world identity and carrier.", good: "Usable without a phone number — protects your identity and works without a SIM", bad: "Phone number required — links your account to a carrier and real-world identity" },
    { key: "selfHostable", label: "Self-Hostable", bool: true, tooltip: "You or your organization can run your own server instead of relying on the developer's infrastructure. This gives you full control over your data and removes dependence on the original company.", good: "You can run your own server — full control over data, no dependence on the developer", bad: "Must trust the developer's servers; if they shut down or change policies, you have no alternative" },
    { key: "p2p", label: "Peer-to-Peer", bool: true, tooltip: "Messages travel directly between your device and the recipient's device, without passing through any central server. This eliminates a central point of surveillance or failure.", good: "No central server involved — no single point of interception or failure", bad: "Messages route through central servers, which can log metadata or become a surveillance point" },
    { key: "offlineCapable", label: "Works Offline", bool: true, tooltip: "The app can function — at least partially — without an internet connection, typically over local Wi-Fi, Bluetooth, or by queuing messages for later delivery.", good: "Can send messages over local networks or queue them without internet access", bad: "Requires an active internet connection to function at all" },
    { key: "voiceVideo", label: "Voice/Video", bool: true, tooltip: "Supports encrypted voice and video calls in addition to text messaging.", good: "Encrypted calls available within the same app", bad: "Text only — no call support" },
    { key: "groupSize", label: "Group Chat Size", tooltip: "Maximum number of participants supported in a single group conversation. Hard limits reflect protocol or server constraints; soft limits indicate performance degradation above that threshold." },
    { key: "multiDevice", label: "Multi-Device", bool: true, tooltip: "You can use your account on multiple devices (phone, tablet, desktop) simultaneously, with messages synced across all of them.", good: "One account works across all your devices simultaneously", bad: "Locked to a single device — switching requires migrating or losing your account" },
    { key: "audited", label: "Security Audited", bool: true, tooltip: "Independent security researchers have reviewed the source code and protocol for vulnerabilities. A public audit report gives users third-party assurance that the security claims hold up.", good: "Security claims independently verified — known vulnerabilities were found and fixed", bad: "Unaudited — security claims rest solely on the developer's word" },
    { key: "userBase", label: "User Base", tooltip: "Estimated number of active users. Larger networks are more useful for everyday communication but may also attract more scrutiny." },
    { key: "price", label: "Price", tooltip: "The cost to use the app. Free apps are often funded by ads, data collection, or venture capital — each with its own trade-offs." },
    { key: "maxDevices", label: "Max Devices", tooltip: "The maximum number of devices you can link to a single account at the same time." },
    { key: "metadataProtection", label: "Metadata Protection", tooltip: "Encryption protects message content, but metadata — who you talk to, when, how often, and from where — can reveal as much as the messages themselves. Some apps take extra steps to hide this." },
    { key: "rateLimiting", label: "Rate Limiting", tooltip: "Mechanisms to detect and block spam, abuse, or bulk messaging — such as requiring a phone number, proof-of-work puzzles, or token staking." },
    { key: "offlineDelivery", label: "Offline Delivery", tooltip: "How messages are held and delivered when the recipient's device is offline — typically via server-side storage, with varying retention policies." },
    { key: "jurisdiction", label: "Jurisdiction", tooltip: "The country whose laws govern the company. This determines which governments can compel the company to hand over data, respond to warrants, or restrict the service." },
  ];

  if (selected.length < 2) return (
    <div style={{ textAlign: "center", padding: "80px 40px", fontFamily: "'JetBrains Mono', monospace", fontSize: "15px", color: "#55558a" }}>
      Select 2 or more apps above to compare side-by-side
    </div>
  );

  return (
    <div style={{ overflowX: "auto", marginTop: "16px", borderRadius: "10px", border: "1px solid #1e1e38" }}>
      <table style={{ borderCollapse: "collapse", fontSize: "14px", tableLayout: "fixed" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #1e1e38" }}>
            <th style={{
              textAlign: "left", padding: "12px 18px", color: "#55558a",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
              textTransform: "uppercase", letterSpacing: "1px",
              width: "160px", minWidth: "160px",
              position: "sticky", left: 0, zIndex: 2,
              background: "#0e0e1e",
            }}>Feature</th>
            {selected.map(a => (
              <th key={a.name} style={{
                textAlign: "center", padding: "12px 16px",
                fontFamily: "'JetBrains Mono', monospace", fontSize: "13px",
                width: "130px", minWidth: "130px",
              }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <AppLogo name={a.name} size={32} />
                  <span style={{ color: categories[a.category].color, fontSize: "12px", fontWeight: 700 }}>{a.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={f.key} style={{ background: i % 2 === 0 ? "#0e0e1e" : "transparent" }}>
              <td style={{
                padding: "11px 18px", color: "#7777aa", fontWeight: 500,
                borderBottom: "1px solid #14142a", fontSize: "13px",
                position: "sticky", left: 0, zIndex: activeTooltip === f.key ? 20 : 1,
                background: i % 2 === 0 ? "#0e0e1e" : "#09091a",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", position: "relative" }}>
                  <span style={{ whiteSpace: "nowrap" }}>{f.label}</span>
                  {f.tooltip && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === f.key ? null : f.key); }}
                      style={{
                        flexShrink: 0,
                        width: "14px", height: "14px",
                        borderRadius: "50%",
                        background: activeTooltip === f.key ? "#6366f130" : "transparent",
                        border: `1px solid ${activeTooltip === f.key ? "#6366f1" : "#3a3a60"}`,
                        color: activeTooltip === f.key ? "#6366f1" : "#55558a",
                        fontSize: "8px", fontWeight: 700,
                        cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        lineHeight: 1,
                        padding: 0,
                        transition: "all 0.15s",
                      }}
                    >?</button>
                  )}
                  {activeTooltip === f.key && (
                    <div style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      zIndex: 10,
                      background: "#13132e",
                      border: "1px solid #6366f135",
                      borderRadius: "8px",
                      padding: "12px 14px",
                      width: "240px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                      fontSize: "12px",
                      color: "#a0a0cc",
                      lineHeight: 1.55,
                      fontFamily: "'Segoe UI', system-ui, sans-serif",
                      fontWeight: 400,
                    }}>
                      <div style={{ position: "absolute", top: "-5px", left: "16px", width: "8px", height: "8px", background: "#13132e", border: "1px solid #6366f135", borderRight: "none", borderBottom: "none", transform: "rotate(45deg)" }} />
                      {f.tooltip}
                      {(f.good || f.bad) && (
                        <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #2a2a48", display: "flex", flexDirection: "column", gap: "4px" }}>
                          {f.good && (
                            <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                              <span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0 }}>✓</span>
                              <span style={{ color: "#7a9a8a" }}>{f.good}</span>
                            </div>
                          )}
                          {f.bad && (
                            <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                              <span style={{ color: "#ef4444", fontWeight: 700, flexShrink: 0 }}>✗</span>
                              <span style={{ color: "#9a7a7a" }}>{f.bad}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </td>
              {(() => {
                const isBooleanFeature = selected.every((a) => {
                  const value = a[f.key];
                  return (
                    typeof value === "boolean" ||
                    value === null ||
                    value === undefined ||
                    value === "partial" ||
                    value === "planned"
                  );
                });

                return selected.map((a) => {
                  const cellTip = a.cellTooltips?.[f.key];
                  return (
                    <td key={a.name} style={{ padding: "9px 14px", textAlign: "center", color: "#b0b0cc", borderBottom: "1px solid #14142a" }}>
                      {isBooleanFeature ? (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          <CellTooltip tooltip={cellTip}><BoolCell value={a[f.key]} /></CellTooltip>
                        </div>
                      ) : (
                        <span style={{ fontSize: "13px", lineHeight: 1.4 }}>{a[f.key]}</span>
                      )}
                    </td>
                  );
                });
              })()}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Main app ──────────────────────────────────────────────────────────────────

export default function DecentralizedMessengerComparison() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [compareList, setCompareList] = useState(apps);
  const [activeTab, setActiveTab] = useState("overview");
  const [filterCat, setFilterCat] = useState("all");

  const toggleCompare = (app) => {
    setCompareList(prev =>
      prev.find(a => a.name === app.name)
        ? prev.filter(a => a.name !== app.name)
        : [...prev, app]
    );
  };

  const filtered = filterCat === "all" ? apps : apps.filter(a => a.category === filterCat);

  return (
    <div style={{
      background: "#09091a",
      minHeight: "100vh",
      color: "#e0e0ff",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", padding: "40px 24px", boxSizing: "border-box" }}>

        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#6366f1", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
            Comparative Analysis
          </div>
          <h1 style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 700,
            margin: "0 0 14px 0",
            background: "linear-gradient(135deg, #d0d0f8 0%, #7878e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}>
            Decentralized Messaging Apps
          </h1>
          <p style={{ color: "#6060a0", fontSize: "15px", maxWidth: "720px", lineHeight: 1.7, margin: 0 }}>
            An honest look at {apps.length} messaging platforms — their architectures, encryption strengths, centralization trade-offs, and real-world drawbacks. Nothing is truly decentralized; the question is where the centralization hides.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", borderBottom: "1px solid #1e1e35" }}>
          {[["overview", "All Apps"], ["compare", `Compare${compareList.length > 0 ? ` (${compareList.length})` : ""}`]].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              background: activeTab === id ? "#13132a" : "transparent",
              border: "1px solid",
              borderColor: activeTab === id ? "#2a2a50" : "transparent",
              borderBottom: activeTab === id ? "1px solid #13132a" : "1px solid #1e1e35",
              borderRadius: "8px 8px 0 0",
              padding: "11px 24px",
              color: activeTab === id ? "#d0d0f0" : "#55558a",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: "-1px",
              transition: "color 0.15s",
              letterSpacing: "0.3px",
            }}>{label}</button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            {/* Category filter */}
            <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "22px" }}>
              <FilterPill active={filterCat === "all"} onClick={() => setFilterCat("all")} color="#7777aa">All</FilterPill>
              {Object.entries(categories).map(([k, v]) => (
                <FilterPill key={k} active={filterCat === k} onClick={() => setFilterCat(k)} color={v.color}>{v.label}</FilterPill>
              ))}
            </div>

            {/* App grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "16px", marginBottom: "28px" }}>
              {filtered.map(app => (
                <div key={app.name} style={{ position: "relative" }}>
                  <AppCard app={app} onSelect={setSelectedApp} />
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCompare(app); }}
                    style={{
                      position: "absolute", top: "16px", right: "16px",
                      background: compareList.find(a => a.name === app.name) ? "#6366f1" : "#1e1e38",
                      border: `1px solid ${compareList.find(a => a.name === app.name) ? "#6366f1" : "#2e2e50"}`,
                      borderRadius: "6px",
                      padding: "4px 12px", cursor: "pointer",
                      color: "#e0e0ff", fontSize: "11px", fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      transition: "background 0.15s, border-color 0.15s",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {compareList.find(a => a.name === app.name) ? "✓" : "+"}
                  </button>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{
              background: "#0d0d1f", border: "1px solid #1e1e35", borderRadius: "12px",
              padding: "24px",
            }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#55558a", marginBottom: "18px", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 600 }}>
                Architecture Spectrum
              </div>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
                {Object.entries(categories).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: v.color, flexShrink: 0 }} />
                    <span style={{ fontSize: "13px", color: "#7777aa" }}><strong style={{ color: v.color }}>{v.label}</strong> — {v.desc}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "#55558a", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#7777aa" }}>Key insight:</strong> Every app has centralization points. "Decentralized" is a spectrum, not a binary. Signal's centralized servers are transparent and well-audited. Matrix's federation defaults to matrix.org. Session's node network depends on token staking. SimpleX's default relays are run by one company. Even Briar depends on Tor's directory authorities. The question isn't whether centralization exists — it's whether you can escape it when needed.
              </p>
            </div>
          </>
        )}

        {activeTab === "compare" && (
          <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", minHeight: "24px" }}>
              {compareList.length > 0 && (
                <button onClick={() => setCompareList([])} style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "#55558a",
                  fontSize: "12px",
                  fontFamily: "'JetBrains Mono', monospace",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  transition: "color 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                  onMouseLeave={e => e.currentTarget.style.color = "#55558a"}
                >
                  deselect all
                </button>
              )}
            </div>
            <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "18px" }}>
              {apps.map(app => {
                const selected = !!compareList.find(a => a.name === app.name);
                const color = categories[app.category].color;
                return (
                  <button key={app.name} onClick={() => toggleCompare(app)} style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: selected ? `${color}18` : "#111120",
                    border: `1px solid ${selected ? color + "50" : "#1e1e35"}`,
                    borderRadius: "8px", padding: "7px 14px", cursor: "pointer",
                    color: selected ? color : "#6060a0",
                    fontSize: "13px", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
                    transition: "all 0.15s",
                  }}>
                    <AppLogo name={app.name} size={20} />
                    {app.name}
                  </button>
                );
              })}
            </div>
            <ComparisonTable selected={compareList} />
          </div>
        )}
      </div>

      {selectedApp && <DetailModal app={selectedApp} onClose={() => setSelectedApp(null)} />}
    </div>
  );
}

function FilterPill({ active, onClick, color, children }) {
  return (
    <button onClick={onClick} style={{
      background: active ? `${color}18` : "transparent",
      border: `1px solid ${active ? color + "50" : "#1e1e35"}`,
      borderRadius: "20px",
      padding: "6px 16px",
      color: active ? color : "#55558a",
      fontSize: "12px",
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'JetBrains Mono', monospace",
      transition: "all 0.15s",
      letterSpacing: "0.3px",
    }}>{children}</button>
  );
}
