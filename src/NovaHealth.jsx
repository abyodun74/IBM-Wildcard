import React, { useState, useRef, useEffect } from "react";
import { Send, Camera, MapPin, Building2, Siren, BookOpen, Sun, Moon, Eye, Star, Upload, Loader2 } from "lucide-react";

// ---------- Theme tokens ----------
const THEMES = {
  light: {
    bg: "#FFFFFF", panel: "#F1EFE8", ink: "#2C2C2A", sub: "#5F5E5A", mute: "#8A887F",
    border: "#D3D1C7", accent: "#534AB7", accentBg: "#EEEDFE",
    teal: "#0F6E56", tealBg: "#E1F5EE", amber: "#854F0B", amberBg: "#FAEEDA",
    pink: "#993556", pinkBg: "#FBEAF0", coral: "#993C1D", coralBg: "#FAECE7",
  },
  dark: {
    bg: "#1B1B19", panel: "#232320", ink: "#F1EFE8", sub: "#B4B2A9", mute: "#7C7A72",
    border: "#3A3934", accent: "#AFA9EC", accentBg: "#3C3489",
    teal: "#6FD3B4", tealBg: "#1E3B33", amber: "#E8B463", amberBg: "#3E2E13",
    pink: "#E9A9C0", pinkBg: "#3E1F2A", coral: "#E8A188", coralBg: "#3E2318",
  },
  colorblind: {
    bg: "#FFFFFF", panel: "#F1EFE8", ink: "#2C2C2A", sub: "#5F5E5A", mute: "#8A887F",
    border: "#D3D1C7", accent: "#185FA5", accentBg: "#E6F1FB",
    teal: "#185FA5", tealBg: "#E6F1FB", amber: "#854F0B", amberBg: "#FAEEDA",
    pink: "#185FA5", pinkBg: "#E6F1FB", coral: "#854F0B", coralBg: "#FAEEDA",
  },
};

const TABS = [
  { id: "home", label: "Home", icon: Send },
  { id: "insurance", label: "Insurance lens", icon: MapPin },
  { id: "noinsurance", label: "No insurance", icon: Building2 },
  { id: "urgent", label: "Urgent", icon: Siren },
  { id: "learn", label: "Learn", icon: BookOpen },
];

// ---------- Mock data (replace with real APIs — see notes at bottom of chat) ----------
const PROVIDERS = [
  { name: "Dr. Amara Osei", specialty: "Family medicine", distance: "0.8 mi", rating: 4.8, tags: ["Accessible", "ASL", "Phone"] },
  { name: "Riverside Health Clinic", specialty: "Internal medicine", distance: "1.2 mi", rating: 4.5, tags: ["Accessible", "Spanish", "Yoruba"] },
  { name: "Dr. Priya Nair", specialty: "Pediatrics", distance: "1.6 mi", rating: 4.9, tags: ["Accessible", "Hindi", "English"] },
  { name: "Dr. Marcus Lee", specialty: "Dermatology", distance: "2.1 mi", rating: 4.6, tags: ["ASL", "English"] },
];
const SPECIALTIES = ["All", "Family medicine", "Internal medicine", "Pediatrics", "Dermatology"];

const GUIDES = [
  { title: "Treating a rash", body: "Most rashes from irritation or mild allergic reaction clear up in a few days with gentle cleaning and avoiding the irritant. See a provider if it spreads quickly, blisters, or comes with fever." },
  { title: "Cleaning ears safely", body: "Ears are self-cleaning — avoid cotton swabs inside the canal. A warm washcloth on the outer ear is usually enough. See a provider for pain, discharge, or hearing changes." },
  { title: "Checklist", body: "Track your last dental cleaning, eye exam, and physical. Most guidelines suggest a dental visit every 6 months and a physical yearly, but this varies by age and health history." },
  { title: "What's urgent", body: "Go to urgent or emergency care for chest pain, difficulty breathing, severe bleeding, sudden confusion, or a fever with stiff neck. When in doubt, it's okay to get it checked." },
];

export default function NovaHealth() {
  const [theme, setTheme] = useState("light");
  const [tab, setTab] = useState("home");
  const t = THEMES[theme];

  return (
    <div style={{ background: t.bg, color: t.ink, minHeight: "100vh", fontFamily: "system-ui, sans-serif", transition: "background 0.2s, color 0.2s" }}>
      <TopBar t={t} theme={theme} setTheme={setTheme} tab={tab} setTab={setTab} />
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "24px 20px 60px" }}>
        {tab === "home" && <HomeTab t={t} />}
        {tab === "insurance" && <InsuranceTab t={t} />}
        {tab === "noinsurance" && <NoInsuranceTab t={t} />}
        {tab === "urgent" && <UrgentTab t={t} />}
        {tab === "learn" && <LearnTab t={t} />}
      </div>
    </div>
  );
}

// ---------- Top nav ----------
function TopBar({ t, theme, setTheme, tab, setTab }) {
  return (
    <div style={{ borderBottom: `1px solid ${t.border}`, position: "sticky", top: 0, background: t.bg, zIndex: 10 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Nova Health</div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          {TABS.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              style={{
                background: "none", border: "none", cursor: "pointer", fontSize: 13,
                color: tab === tb.id ? t.accent : t.sub, fontWeight: tab === tb.id ? 700 : 400, padding: 0,
              }}
            >
              {tb.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, border: `1px solid ${t.border}`, borderRadius: 8, padding: 3 }}>
          <ThemeBtn active={theme === "light"} onClick={() => setTheme("light")} icon={Sun} t={t} label="Light" />
          <ThemeBtn active={theme === "dark"} onClick={() => setTheme("dark")} icon={Moon} t={t} label="Dark" />
          <ThemeBtn active={theme === "colorblind"} onClick={() => setTheme("colorblind")} icon={Eye} t={t} label="Color-blind" />
        </div>
      </div>
    </div>
  );
}

function ThemeBtn({ active, onClick, icon: Icon, t, label }) {
  return (
    <button
      onClick={onClick}
      title={label}
      style={{
        display: "flex", alignItems: "center", gap: 4, fontSize: 11, padding: "5px 8px", borderRadius: 6,
        border: "none", cursor: "pointer", background: active ? t.accentBg : "transparent", color: active ? t.accent : t.sub,
      }}
    >
      <Icon size={13} />
    </button>
  );
}

// ---------- Home / chat tab (real AI call) ----------
function HomeTab({ t }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi, I'm Nova. Tell me what's going on, and I'll help you understand it — not diagnose it, just help you figure out what questions to ask and where to go next." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", text: input };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 400,
          system:
            "You are Nova, a warm, plain-language health information companion inside an app for people who may not have insurance. " +
            "You are NOT a doctor and must never diagnose or prescribe. Help the person understand possible explanations for a symptom in general terms, " +
            "suggest what to watch for, and always end by suggesting whether this sounds like something to monitor, something for a routine visit, " +
            "or something urgent. Keep responses under 120 words, conversational, no medical jargon without explaining it.",
          messages: next.map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      const text = data?.content?.find((c) => c.type === "text")?.text || "Sorry, I couldn't process that just now.";
      setMessages((cur) => [...cur, { role: "assistant", text }]);
    } catch (e) {
      setMessages((cur) => [...cur, { role: "assistant", text: "Something went wrong reaching Nova. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div style={{ background: t.panel, borderRadius: 12, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: t.sub, display: "flex", alignItems: "center", gap: 8 }}>
        Free flu shots available near you this week — see the No insurance tab
      </div>
      <div style={{ border: `1px solid ${t.border}`, borderRadius: 14, padding: 18, minHeight: 380, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginBottom: 12, maxHeight: 420, overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "78%", background: m.role === "user" ? t.accentBg : t.panel,
              color: m.role === "user" ? t.accent : t.ink, padding: "10px 14px", borderRadius: 14,
              borderBottomRightRadius: m.role === "user" ? 4 : 14, borderBottomLeftRadius: m.role === "user" ? 14 : 4,
              fontSize: 13.5, lineHeight: 1.5,
            }}>
              {m.text}
            </div>
          ))}
          {loading && <div style={{ fontSize: 12, color: t.mute, display: "flex", alignItems: "center", gap: 6 }}><Loader2 size={13} className="animate-spin" /> Nova is thinking…</div>}
          <div ref={scrollRef} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Describe what's going on..."
            style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.bg, color: t.ink, fontSize: 13 }}
          />
          <button onClick={send} disabled={loading} style={{ background: t.accent, color: "#fff", border: "none", borderRadius: 10, padding: "0 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600 }}>
            <Send size={14} /> Send
          </button>
        </div>
      </div>
      <p style={{ fontSize: 11, color: t.mute, marginTop: 10 }}>
        Nova gives general information, not a diagnosis. In an emergency, use the Urgent tab or call emergency services directly.
      </p>
    </div>
  );
}

// ---------- Insurance lens tab ----------
function InsuranceTab({ t }) {
  const [specialty, setSpecialty] = useState("All");
  const filtered = PROVIDERS.filter((p) => specialty === "All" || p.specialty === specialty);

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Insurance lens</h2>
      <p style={{ fontSize: 13, color: t.sub, marginBottom: 16 }}>Search providers by specialty, language, and accessibility. (Swap in Google Places API + your insurance directory here.)</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {SPECIALTIES.map((s) => (
          <button key={s} onClick={() => setSpecialty(s)} style={{
            border: "none", borderRadius: 16, padding: "6px 14px", fontSize: 12, cursor: "pointer",
            background: specialty === s ? t.accentBg : t.panel, color: specialty === s ? t.accent : t.sub, fontWeight: specialty === s ? 600 : 400,
          }}>{s}</button>
        ))}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {filtered.map((p) => (
          <div key={p.name} style={{ background: t.panel, borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: t.sub }}>{p.specialty} · {p.distance}</div>
              <div style={{ fontSize: 11, color: t.mute, marginTop: 4 }}>{p.tags.join(" · ")}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: t.amber, fontSize: 13 }}>
              <Star size={13} fill={t.amber} stroke="none" /> {p.rating}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p style={{ fontSize: 13, color: t.mute }}>No providers match that filter yet.</p>}
      </div>
    </div>
  );
}

// ---------- No insurance tab ----------
function NoInsuranceTab({ t }) {
  const cards = [
    { title: "Community clinics", body: "Sliding-scale and free clinics near you, filtered by service type.", color: t.amber, bg: t.amberBg },
    { title: "Public programs", body: "Local health department services, screenings, and outreach events.", color: t.amber, bg: t.amberBg },
    { title: "Government resources", body: "Medicaid, CHIP, and enrollment assistance near you.", color: t.amber, bg: t.amberBg },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>No insurance</h2>
      <p style={{ fontSize: 13, color: t.sub, marginBottom: 16 }}>Community clinics, public programs, and government resources near you.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {cards.map((c) => (
          <div key={c.title} style={{ background: c.bg, borderRadius: 12, padding: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: c.color, marginBottom: 6 }}>{c.title}</div>
            <div style={{ fontSize: 12.5, color: t.sub }}>{c.body}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, background: t.panel, borderRadius: 10, padding: "10px 16px", fontSize: 12.5, color: t.sub }}>
        After-hours line: someone you can call — plus volunteer sign-up
      </div>
    </div>
  );
}

// ---------- Urgent tab (real AI image analysis) ----------
function UrgentTab({ t }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setSummary(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  }

  async function analyze() {
    if (!preview) return;
    setLoading(true);
    try {
      const [, mediaType, base64Data] = preview.match(/^data:(.+);base64,(.+)$/);
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 300,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: mediaType, data: base64Data } },
              { type: "text", text: "Describe only the visible, objective characteristics of what's shown (location on body if visible, color, texture, size if estimable, any swelling or discoloration). Do not diagnose or guess a condition. Write it as short bullet points a person could text to their doctor." },
            ],
          }],
        }),
      });
      const data = await res.json();
      const text = data?.content?.find((c) => c.type === "text")?.text || "Could not generate a summary.";
      setSummary(text);
    } catch (e) {
      setSummary("Something went wrong analyzing the photo. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Urgent</h2>
      <p style={{ fontSize: 13, color: t.sub, marginBottom: 16 }}>Upload a photo and get a plain-language summary to share with a provider. This does not contact emergency services.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: t.pinkBg, borderRadius: 12, padding: 18 }}>
          <label style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
            border: `1px dashed ${t.border}`, borderRadius: 10, padding: "28px 10px", cursor: "pointer", background: t.bg,
          }}>
            {preview ? <img src={preview} alt="Uploaded" style={{ maxHeight: 140, borderRadius: 8 }} /> : <Upload size={22} color={t.pink} />}
            <span style={{ fontSize: 12.5, fontWeight: 600 }}>{file ? file.name : "Upload a photo"}</span>
            <input type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
          </label>
          <button onClick={analyze} disabled={!preview || loading} style={{
            marginTop: 12, width: "100%", background: t.pink, color: "#fff", border: "none", borderRadius: 8,
            padding: "9px 0", fontSize: 12.5, fontWeight: 600, cursor: preview ? "pointer" : "not-allowed", opacity: preview ? 1 : 0.5,
          }}>
            {loading ? "Analyzing…" : "Analyze photo"}
          </button>
        </div>
        <div style={{ background: t.panel, borderRadius: 12, padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Summary for your provider</div>
          {!summary && <div style={{ fontSize: 12.5, color: t.mute }}>Upload and analyze a photo to see a shareable summary here.</div>}
          {summary && <div style={{ fontSize: 12.5, color: t.sub, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{summary}</div>}
        </div>
      </div>
    </div>
  );
}

// ---------- Learn tab ----------
function LearnTab({ t }) {
  const [open, setOpen] = useState(null);
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Learn</h2>
      <p style={{ fontSize: 13, color: t.sub, marginBottom: 16 }}>How-to guides on symptoms, care basics, and what needs a doctor's visit.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {GUIDES.map((g, i) => (
          <button key={g.title} onClick={() => setOpen(open === i ? null : i)} style={{
            textAlign: "left", background: t.coralBg, border: "none", borderRadius: 12, padding: 16, cursor: "pointer",
          }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: t.coral, marginBottom: 6 }}>{g.title}</div>
            {open === i && <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.5 }}>{g.body}</div>}
            {open !== i && <div style={{ fontSize: 11.5, color: t.mute }}>Tap to read</div>}
          </button>
        ))}
      </div>
    </div>
  );
}
