import React, { useState } from "react";

const kneeBundle = {
  name: "Total Knee Replacement Bundle — State of Florida",
  minTotal: 34722,
  maxTotal: 47453,
  steps: [
    { title: "Step 1: Office visit with specialist", range: "$153 – $220",        desc: "Initial evaluation and appointment with your orthopedic specialist." },
    { title: "Step 2: Total Knee Replacement Surgery", range: "$33,609 – $44,894", desc: "Surgery to replace a diseased or damaged knee joint with manmade parts." },
    { title: "Step 3: Outpatient Physical Therapy",   range: "$758 – $1,035",     desc: "A guided exercise program to reduce stiffness and improve range of motion." },
    { title: "Step 4: Follow-up office visit",        range: "$202 – $304",       desc: "Follow-up visits and X-ray after leaving the hospital." },
  ],
};

const plan = {
  name: "Oscar Health Maintenance Organisation of Florida",
  sub: "Bronze Simple Breathe Easy with Enhanced COPD Benefits",
  premium: "$493.67 / month",
  deductible: "$9,000",
  oopMax: "$10,600",
  benefits: [
    { label: "Primary care",            value: "40% coinsurance after deductible" },
    { label: "Specialist care",         value: "40% coinsurance after deductible" },
    { label: "Urgent care",             value: "40% coinsurance after deductible" },
    { label: "Emergency room",          value: "40% coinsurance after deductible" },
    { label: "Outpatient mental health",value: "40% coinsurance after deductible" },
    { label: "Generic drugs",           value: "$3 copay", highlight: true },
  ],
  notIncluded: ["Adult dental", "Child dental"],
};

export default function ManageCareCosts({ t }) {
  const [coverage, setCoverage]       = useState(80);
  const [deferred, setDeferred]       = useState(false);

  const calcOop = (total) => (total * (100 - coverage)) / 100;

  const Section = ({ title, children }) => (
    <div style={{ border: `1px solid ${t.border}`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: t.ink, margin: "0 0 16px 0" }}>{title}</h2>
      {children}
    </div>
  );

  const Row = ({ label, value, sub, highlight, last }) => (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "11px 0", borderBottom: last ? "none" : `1px solid ${t.border}`,
    }}>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: t.ink }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: t.mute, marginTop: 2 }}>{sub}</div>}
      </div>
      <span style={{ fontSize: 14, fontWeight: 700, color: highlight ? t.teal : t.accent }}>{value}</span>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Manage costs</h2>
      <p style={{ fontSize: 13, color: t.sub, marginBottom: 20 }}>
        Understand your care costs, see what your plan covers, and manage payments.
      </p>

      {/* ── Section 1: Estimated cost of care ── */}
      <Section title="Estimated cost of care">
        <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, marginBottom: 12 }}>{kneeBundle.name}</div>
        {kneeBundle.steps.map((step, i) => (
          <div key={i} style={{
            padding: "10px 0",
            borderBottom: i < kneeBundle.steps.length - 1 ? `1px dashed ${t.border}` : "none",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, fontWeight: 600 }}>
              <span style={{ color: t.ink }}>{step.title}</span>
              <span style={{ color: t.accent }}>{step.range}</span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 12.5, color: t.mute, lineHeight: 1.5 }}>{step.desc}</p>
          </div>
        ))}

        {/* Total banner */}
        <div style={{
          background: t.accentBg, border: `1px solid ${t.border}`, borderLeft: `4px solid ${t.accent}`,
          borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between",
          alignItems: "center", marginTop: 16,
        }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: t.ink }}>State of Florida total</span>
          <strong style={{ fontSize: 15, color: t.accent }}>
            ${kneeBundle.minTotal.toLocaleString()} – ${kneeBundle.maxTotal.toLocaleString()}
          </strong>
        </div>

        {/* Coverage slider */}
        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: 13.5, fontWeight: 600, color: t.ink, display: "block", marginBottom: 8 }}>
            Your insurance coverage: <span style={{ color: t.accent }}>{coverage}%</span>
          </label>
          <input
            type="range" min="0" max="100" value={coverage}
            onChange={(e) => setCoverage(Number(e.target.value))}
            style={{ width: "100%", accentColor: t.accent, cursor: "pointer" }}
          />
        </div>

        {/* Out-of-pocket display */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          background: t.panel, borderRadius: 10, padding: "14px 18px", marginTop: 14,
        }}>
          <div>
            <div style={{ fontSize: 12, color: t.mute }}>Estimated min out-of-pocket</div>
            <strong style={{ fontSize: 18, color: t.teal }}>${calcOop(kneeBundle.minTotal).toFixed(2)}</strong>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: t.mute }}>Estimated max out-of-pocket</div>
            <strong style={{ fontSize: 18, color: t.teal }}>${calcOop(kneeBundle.maxTotal).toFixed(2)}</strong>
          </div>
        </div>
      </Section>

      {/* ── Section 2: What your plan covers ── */}
      <Section title="What your plan covers">
        <div style={{ fontSize: 14, fontWeight: 700, color: t.ink }}>{plan.name}</div>
        <div style={{ fontSize: 12.5, color: t.mute, marginBottom: 14 }}>{plan.sub}</div>

        <Row label="Premium" value={plan.premium} />
        <Row label="Deductible" value={plan.deductible} sub="Individual total (health & drug combined)" />
        <Row label="Out-of-pocket maximum" value={plan.oopMax} sub="Individual total" />

        <div style={{ fontSize: 12, fontWeight: 700, color: t.sub, textTransform: "uppercase", letterSpacing: "0.06em", padding: "14px 0 6px" }}>
          You pay
        </div>

        {plan.benefits.map((b, i) => (
          <Row key={b.label} label={b.label} value={b.value} highlight={b.highlight} last={i === plan.benefits.length - 1} />
        ))}

        {/* Not included */}
        <div style={{ background: t.coralBg, border: `1px solid ${t.border}`, borderRadius: 8, padding: "12px 14px", marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.coral, marginBottom: 6 }}>Not included</div>
          {plan.notIncluded.map((item) => (
            <div key={item} style={{ fontSize: 13, color: t.sub, display: "flex", gap: 8 }}>
              <span style={{ color: t.coral }}>•</span> {item}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 18 }}>
          <a
            href="https://healthcare.gov"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block", background: t.teal, color: "#fff",
              padding: "10px 20px", borderRadius: 10, fontSize: 13,
              fontWeight: 600, textDecoration: "none",
            }}
          >
            Compare Florida plans on HealthCare.gov →
          </a>
        </div>
      </Section>

      {/* ── Section 3: Payment plan ── */}
      <Section title="Payment plan">
        <Row label="Total amount due"       value="$1,850.00" sub="Outstanding balance" />
        <Row label="Monthly premium"        value="$150.00 / month" sub="Split payment schedule" />
        <Row label="Payment method"         value="Visa •••• 4219" sub="Debit card" />

        {/* Upcoming payment with defer */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "11px 0", borderBottom: `1px solid ${t.border}`,
        }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.ink }}>Upcoming payment</div>
            <div style={{ fontSize: 12, color: t.mute, marginTop: 2 }}>Auto-draft deadline</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: t.ink, background: t.panel, padding: "4px 10px", borderRadius: 6 }}>
              {deferred ? "Oct 01, 2026" : "Sept 01, 2026"}
            </span>
            <button
              onClick={() => setDeferred(v => !v)}
              style={{
                background: t.amberBg, color: t.amber, border: `1px solid ${t.border}`,
                padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}
            >
              {deferred ? "Undo defer" : "Defer installment"}
            </button>
          </div>
        </div>

        {/* Financial assistance */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "11px 0", borderBottom: `1px solid ${t.border}`,
        }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.ink }}>Financial assistance</div>
            <div style={{ fontSize: 12, color: t.mute, marginTop: 2 }}>Request a relief waiver</div>
          </div>
          <button style={{
            background: t.coralBg, color: t.coral, border: `1px solid ${t.border}`,
            padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>
            Submit request
          </button>
        </div>

        {/* Statements */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "11px 0", borderBottom: `1px solid ${t.border}`,
        }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.ink }}>Statements</div>
            <div style={{ fontSize: 12, color: t.mute, marginTop: 2 }}>Statement_Aug_2026.pdf (4.2 MB)</div>
          </div>
          <button
            onClick={() => alert("Downloading Statement_Aug_2026.pdf...")}
            style={{ background: "none", border: "none", color: t.accent, fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
          >
            Download PDF
          </button>
        </div>

        {/* Payment status */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "11px 0",
        }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: t.ink }}>Payment status</div>
            <div style={{ fontSize: 12, color: t.mute, marginTop: 2 }}>Processing and clearance tracking</div>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 700, color: t.teal,
            background: t.tealBg, border: `1px solid ${t.border}`,
            padding: "5px 12px", borderRadius: 20,
          }}>
            ● Synchronized
          </span>
        </div>
      </Section>
    </div>
  );
}
