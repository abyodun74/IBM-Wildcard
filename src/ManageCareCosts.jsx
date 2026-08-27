import React, { useState } from "react";
function ManageCareCosts() {
  // Slider state tracking percentage covered by health insurance (default 80%)
  const [insuranceCovered, setInsuranceCovered] = useState(80);

  // Your exact Florida Knee Replacement Bundle data specifications
  const kneeBundle = {
    name: "Total Knee Replacement Bundle - State of Florida Breakdown",
    minTotal: 34722,
    maxTotal: 47453,
    steps: [
      {
        title: "Step 1: Office visit with specialist for evaluation",
        range: "$153 - $220",
        desc: "Initial evaluation and appointment with your orthopedic specialist.",
      },
      {
        title: "Step 2: Total Knee Replacement Surgery",
        range: "$33,609 - $44,894",
        desc: "Surgery to replace a diseased or damaged knee joint with manmade parts.",
      },
      {
        title: "Step 3: Outpatient Physical Therapy/Rehabilitation",
        range: "$758 - $1,035",
        desc: "A guided exercise program to reduce stiffness and improve range of motion in the knee.",
      },
      {
        title: "Step 4: Follow up Office Visit",
        range: "$202 - $304",
        desc: "Follow up office visits and x-ray after you have left the hospital.",
      },
    ],
  };

  // Live calculation engine for out-of-pocket values based on the interactive slider
  const calcOutOfPocket = (total) => (total * (100 - insuranceCovered)) / 100;

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Segoe UI, Roboto, sans-serif",
        maxWidth: "750px",
        margin: "0 auto",
        color: "#333",
      }}
    >
      {/* PAGE HEADER */}
      <h1
        style={{
          color: "#0f62fe",
          borderBottom: "2px solid #0f62fe",
          paddingBottom: "10px",
          marginTop: "0",
        }}
      >
        Understand & Manage Costs
      </h1>
      <p style={{ color: "#666", fontSize: "16px", marginBottom: "25px" }}>
        Navigate your Florida medical finances clearly and predict regional
        surgery expenses.
      </p>

      {/* 📊 MAIN CONTAINER FOR SECTION 1 */}
      <div
        style={{
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{ margin: "0 0 15px 0", fontSize: "20px", color: "#0f62fe" }}
        >
          📊 View Estimated Cost of Care
        </h2>

        {/* Step-by-Step Care Bundle Mapping Grid */}
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            marginBottom: "15px",
          }}
        >
          <strong
            style={{
              fontSize: "15px",
              display: "block",
              marginBottom: "10px",
              color: "#111",
            }}
          >
            {kneeBundle.name}
          </strong>

          {kneeBundle.steps.map((step, index) => (
            <div
              key={index}
              style={{
                padding: "10px 0",
                borderBottom:
                  index !== kneeBundle.steps.length - 1
                    ? "1px dashed #eee"
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                <span style={{ color: "#222" }}>{step.title}</span>
                <span style={{ color: "#0f62fe" }}>{step.range}</span>
              </div>
              {step.desc && (
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "13px",
                    color: "#666",
                    lineHeight: "1.4",
                  }}
                >
                  {step.desc}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* State Total Range Banner */}
        <div
          style={{
            background: "#e0e8ff",
            padding: "12px 15px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            borderLeft: "5px solid #0f62fe",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>
            State of Florida Total:
          </span>
          <strong style={{ fontSize: "16px", color: "#0f62fe" }}>
            ${kneeBundle.minTotal.toLocaleString()} - $
            {kneeBundle.maxTotal.toLocaleString()}
          </strong>
        </div>

        {/* Interactive Coverage Slider Panel */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              fontSize: "14px",
            }}
          >
            Your Insurance Coverage:{" "}
            <span style={{ color: "#0f62fe", fontSize: "16px" }}>
              {insuranceCovered}%
            </span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={insuranceCovered}
            onChange={(e) => setInsuranceCovered(Number(e.target.value))}
            style={{
              width: "100%",
              height: "6px",
              cursor: "pointer",
              accentColor: "#0f62fe",
            }}
          />
        </div>

        {/* Real-Time Out-of-Pocket Display Elements */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "white",
            padding: "15px",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
          }}
        >
          <div>
            <span style={{ color: "#666", display: "block", fontSize: "12px" }}>
              Estimated Min Out-of-Pocket:
            </span>
            <strong style={{ fontSize: "18px", color: "#16a34a" }}>
              ${calcOutOfPocket(kneeBundle.minTotal).toFixed(2)}
            </strong>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ color: "#666", display: "block", fontSize: "12px" }}>
              Estimated Max Out-of-Pocket:
            </span>
            <strong style={{ fontSize: "18px", color: "#16a34a" }}>
              ${calcOutOfPocket(kneeBundle.maxTotal).toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
      {/* 🛡️ SECTION 2: SEE WHAT INSURANCE COVERS */}
      <div
        style={{
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{ margin: "0 0 15px 0", fontSize: "20px", color: "#0f62fe" }}
        >
          🛡️ See What Insurance Covers
        </h2>

        {/* Plan 1 Permanent Container Card */}
        <div
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            padding: "20px",
          }}
        >
          <div
            style={{
              borderBottom: "2px solid #eee",
              paddingBottom: "12px",
              marginBottom: "15px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                color: "#111",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Plan 1 Oscar Health Maintenance Organisation of Florida
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#555",
                display: "block",
                marginTop: "4px",
              }}
            >
              Bronze Simple Breathe Easy with Enhanced COPD Benefits
            </span>
          </div>

          {/* Premium Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <strong style={{ color: "#222" }}>Premium</strong>
            <span
              style={{ fontWeight: "bold", color: "#0f62fe", fontSize: "16px" }}
            >
              $493.67/month
            </span>
          </div>

          {/* Estimated Total Yearly Cost Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
              alignItems: "center",
            }}
          >
            <strong style={{ color: "#222" }}>
              Estimated total yearly cost
            </strong>
            <button
              style={{
                fontSize: "13px",
                color: "#0f62fe",
                background: "none",
                border: "none",
                padding: "0",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Add yearly cost
            </button>
          </div>

          {/* Deductible Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ color: "#222" }}>Deductible</strong>
              <span
                style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}
              >
                Individual total
              </span>
              <span style={{ fontSize: "12px", color: "#666" }}>
                (health & drug combined)
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#c2410c",
                  fontWeight: "bold",
                  marginTop: "4px",
                }}
              >
                Extra deductible for some services
              </span>
            </div>
            <span
              style={{ fontWeight: "bold", color: "#0f62fe", fontSize: "16px" }}
            >
              $9,000
            </span>
          </div>

          {/* Out-of-Pocket Maximum Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong style={{ color: "#222" }}>Out-of-pocket maximum</strong>
              <span
                style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}
              >
                Individual total
              </span>
            </div>
            <span
              style={{ fontWeight: "bold", color: "#0f62fe", fontSize: "16px" }}
            >
              $10,600
            </span>
          </div>

          {/* You Pay Section Divider */}
          <div
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#111",
              padding: "15px 0 5px 0",
              borderBottom: "2px solid #333",
              marginTop: "10px",
            }}
          >
            You pay
          </div>

          {/* Medical Benefit Line Items Grid */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#444" }}>Primary care</span>
            <span style={{ fontWeight: "bold" }}>
              40% coinsurance after deductible
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#444" }}>Specialist care</span>
            <span style={{ fontWeight: "bold" }}>
              40% coinsurance after deductible
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#444" }}>Urgent care</span>
            <span style={{ fontWeight: "bold" }}>
              40% coinsurance after deductible
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#444" }}>Emergency room</span>
            <span style={{ fontWeight: "bold" }}>
              40% coinsurance after deductible
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#444" }}>Outpatient mental health</span>
            <span style={{ fontWeight: "bold" }}>
              40% coinsurance after deductible
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#444" }}>Generic drugs</span>
            <span style={{ fontWeight: "bold", color: "#16a34a" }}>$3</span>
          </div>

          {/* Plan Features Notification Block */}
          <div
            style={{
              background: "#fff5f5",
              border: "1px solid #fee2e2",
              padding: "15px",
              borderRadius: "6px",
              marginTop: "20px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#991b1b",
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Plan features -
            </span>
            <div
              style={{
                fontSize: "13px",
                color: "#4b5563",
                marginBottom: "4px",
                display: "flex",
                gap: "8px",
              }}
            >
              <span style={{ color: "#ef4444", fontWeight: "bold" }}>•</span>{" "}
              Not included Adult dental
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#4b5563",
                display: "flex",
                gap: "8px",
              }}
            >
              <span style={{ color: "#ef4444", fontWeight: "bold" }}>•</span>{" "}
              Not included Child dental
            </div>
          </div>

          {/* Provider Directory Search Section */}
          <div
            style={{
              borderTop: "2px dashed #eee",
              marginTop: "20px",
              paddingTop: "15px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#111",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Find covered providers & drugs
            </span>
            <button
              style={{
                background: "#e0e8ff",
                color: "#0f62fe",
                border: "1px solid #bfdbfe",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Add doctors & facilities
            </button>
          </div>

          {/* Premium Direct Link Web Integration Button */}
          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
              paddingTop: "20px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <a
              href="https://healthcare.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#16a34a",
                color: "white",
                padding: "12px 24px",
                borderRadius: "6px",
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: "14px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              🔎 Compare & See Other Florida Live Insurance Plans ↗
            </a>
          </div>
        </div>
      </div>

      {/* 💳 SECTION 3: SET UP A PAYMENT PLAN, WHERE AVAILABLE */}
      <div
        style={{
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          marginTop: "25px",
        }}
      >
        <h2
          style={{ margin: "0 0 15px 0", fontSize: "20px", color: "#0f62fe" }}
        >
          💳 Set Up a Payment Plan
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            marginTop: "-10px",
            marginBottom: "15px",
          }}
        >
          Manage your active billing cycles, schedule installments, or request
          localized state assistance records:
        </p>

        <div
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            padding: "20px",
          }}
        >
          {/* View total amount due Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div>
              <strong
                style={{ display: "block", fontSize: "14px", color: "#111" }}
              >
                Total Amount Due
              </strong>
              <span style={{ fontSize: "12px", color: "#666" }}>
                View total outstanding balancing charges
              </span>
            </div>
            <span
              style={{ fontSize: "18px", fontWeight: "bold", color: "#0f62fe" }}
            >
              $1,850.00
            </span>
          </div>

          {/* Set up monthly premium payments Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div>
              <strong
                style={{ display: "block", fontSize: "14px", color: "#111" }}
              >
                Monthly Premium Payments
              </strong>
              <span style={{ fontSize: "12px", color: "#666" }}>
                Set up monthly premium payments split schedules
              </span>
            </div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#111",
                background: "#f0f4fe",
                padding: "4px 10px",
                borderRadius: "4px",
                border: "1px solid #d0e1fd",
              }}
            >
              $150.00 / month
            </span>
          </div>

          {/* Choose a payment method Row (STREAMLINED - SINGLE PERMANENT VIEW) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div>
              <strong
                style={{ display: "block", fontSize: "14px", color: "#111" }}
              >
                Payment Method
              </strong>
              <span style={{ fontSize: "12px", color: "#666" }}>
                Choose a payment method link (Credit Card, Bank, HSA)
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  background: "#0f62fe",
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                DEBIT CARD
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#333",
                  marginLeft: "8px",
                }}
              >
                Visa •••• 4219
              </span>
            </div>
          </div>

          {/* View upcoming payments Row with Active Defer Feature */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div>
              <strong
                style={{ display: "block", fontSize: "14px", color: "#111" }}
              >
                Upcoming Payments Calendar
              </strong>
              <span style={{ fontSize: "12px", color: "#666" }}>
                View upcoming payments and auto-draft deadlines
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                id="reactPaymentDate"
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#333",
                  background: "#f4f4f4",
                  padding: "4px 10px",
                  borderRadius: "4px",
                }}
              >
                Sept 01, 2026
              </span>
              <button
                style={{
                  background: "#fff8e1",
                  color: "#b7791f",
                  border: "1px solid #fef3c7",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={() => {
                  const dateBox = document.getElementById("reactPaymentDate");
                  if (dateBox.innerText === "Sept 01, 2026") {
                    dateBox.innerText = "Oct 01, 2026";
                    alert(
                      "Success: Your upcoming automated installment plan payment has been deferred to October 1st!",
                    );
                  } else {
                    dateBox.innerText = "Sept 01, 2026";
                  }
                }}
              >
                Defer Installment
              </button>
            </div>
          </div>

          {/* Request financial assistance Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div>
              <strong
                style={{ display: "block", fontSize: "14px", color: "#111" }}
              >
                Financial Assistance
              </strong>
              <span style={{ fontSize: "12px", color: "#666" }}>
                Request financial assistance relief waivers
              </span>
            </div>
            <button
              style={{
                background: "#fff5f5",
                color: "#ef4444",
                border: "1px solid #fee2e2",
                padding: "6px 14px",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Submit Request
            </button>
          </div>

          {/* Download your bill Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div>
              <strong
                style={{ display: "block", fontSize: "14px", color: "#111" }}
              >
                Statements
              </strong>
              <span style={{ fontSize: "12px", color: "#666" }}>
                Download your bill invoice copies (PDF)
              </span>
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                style={{
                  fontSize: "13px",
                  color: "#0f62fe",
                  background: "none",
                  border: "none",
                  padding: "0",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "underline",
                  display: "block",
                }}
                onClick={() => alert("Downloading Statement_Aug_2026.pdf...")}
              >
                Download PDF 💾
              </button>
              <span
                style={{
                  fontSize: "11px",
                  color: "#888",
                  fontStyle: "italic",
                  display: "block",
                  marginTop: "2px",
                }}
              >
                Statement_Aug_2026.pdf (4.2 MB)
              </span>
            </div>
          </div>

          {/* Track payment status Row with Functional Click Alerts */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0 0 0",
            }}
          >
            <div>
              <strong
                style={{ display: "block", fontSize: "14px", color: "#111" }}
              >
                Payment Tracker Status
              </strong>
              <span style={{ fontSize: "12px", color: "#666" }}>
                Track payment status clearings and processing gates
              </span>
            </div>
            <button
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                color: "#15803d",
                background: "#dcfce7",
                border: "1px solid #bbf7d0",
                padding: "6px 14px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
              onClick={() =>
                alert(
                  "Database re-verification complete! Your transactions are fully synchronized with the marketplace gateway network.",
                )
              }
            >
              ● Synchronized
            </button>
          </div>
        </div>
      </div>
      {/* 🤝 SECTION 4: FINANCIAL ASSISTANCE SUPPORT */}
      <div
        style={{
          background: "#f4f4f4",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          marginTop: "25px",
        }}
      >
        <h2
          style={{ margin: "0 0 15px 0", fontSize: "20px", color: "#0f62fe" }}
        >
          🤝 Financial Assistance Support
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            marginTop: "-10px",
            marginBottom: "15px",
          }}
        >
          Explore active non-profit relief foundations, temporary employment
          coverage continuations, and state-funded medical support networks:
        </p>

        {/* 1. National Medical Bill & Debt Relief (Dollar For) */}
        <div
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <strong
                style={{ fontSize: "15px", color: "#111", display: "block" }}
              >
                National Medical Bill & Debt Relief
              </strong>
              <span
                style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}
              >
                Source: Dollar For
              </span>
              <p
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "13px",
                  color: "#444",
                  lineHeight: "1.4",
                }}
              >
                A dedicated non-profit organisation that helps patients check
                their eligibility for hidden hospital charity care programs and
                guides them through the application to get medical debt
                completely forgiven or crushed.
              </p>
            </div>
            <a
              href="https://dollarfor.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#e0e8ff",
                color: "#0f62fe",
                border: "1px solid #bfdbfe",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Check Eligibility ↗
            </a>
          </div>
        </div>

        {/* 2. Co-pay, Premium, & Deductible Aid (HealthWell Foundation) */}
        <div
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <strong
                style={{ fontSize: "15px", color: "#111", display: "block" }}
              >
                Co-pay, Premium, & Deductible Aid
              </strong>
              <span
                style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}
              >
                Source: HealthWell Foundation
              </span>
              <p
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "13px",
                  color: "#444",
                  lineHeight: "1.4",
                }}
              >
                An independent non-profit foundation that steps in when health
                insurance isn't enough, directly assisting with medication
                co-pays, premiums, and out-of-pocket thresholds.
              </p>
            </div>
            <a
              href="https://healthwellfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#e0e8ff",
                color: "#0f62fe",
                border: "1px solid #bfdbfe",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Apply For Aid ↗
            </a>
          </div>
        </div>

        {/* 3. State Health Insurance Support (Medicaid & CHIP) */}
        <div
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <strong
                style={{ fontSize: "15px", color: "#111", display: "block" }}
              >
                State Health Insurance Support
              </strong>
              <span
                style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}
              >
                Source: Medicaid & CHIP National Directives
              </span>
              <p
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "13px",
                  color: "#444",
                  lineHeight: "1.4",
                }}
              >
                Helps users quickly navigate state-specific portals to apply for
                medical assistance, low-income coverage, and state-funded
                children's insurance safety nets.
              </p>
            </div>
            <a
              href="https://medicaid.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#e0e8ff",
                color: "#0f62fe",
                border: "1px solid #bfdbfe",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Find State Portal ↗
            </a>
          </div>
        </div>

        {/* 4. Temporary Insurance Continuation (COBRA) */}
        <div
          style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            padding: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <strong
                style={{ fontSize: "15px", color: "#111", display: "block" }}
              >
                Temporary Insurance Continuation
              </strong>
              <span
                style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}
              >
                Source: USA.gov COBRA Continuation
              </span>
              <p
                style={{
                  margin: "6px 0 0 0",
                  fontSize: "13px",
                  color: "#444",
                  lineHeight: "1.4",
                }}
              >
                Provides official federal instruction on how workers can legally
                keep their temporary group employer health coverage active
                following qualifying job changes or hour reductions.
              </p>
            </div>
            <a
              href="https://usa.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#e0e8ff",
                color: "#0f62fe",
                border: "1px solid #bfdbfe",
                padding: "6px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "bold",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              View COBRA Rules ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCareCosts;
