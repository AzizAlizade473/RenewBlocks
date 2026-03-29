import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Problem", "Solution", "Specs", "Standards", "Team"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
}

const PROBLEMS = [
  {
    label: "Construction",
    stat: "2100 kg/m³",
    desc: "Traditional limestone blocks force developers to overspend on steel foundations, adding structural costs to every floor.",
  },
  {
    label: "Energy",
    stat: "High Heat Loss",
    desc: "Stone transfers heat with no resistance. Residents absorb elevated heating and cooling bills through every wall.",
  },
  {
    label: "Waste",
    stat: "Unmanaged",
    desc: "Quarry dust, silica fume, and plastic waste accumulate across the Absheron Peninsula with no industrial outlet.",
  },
];

const FEATURES = [
  {
    num: "01",
    title: "50% Lighter",
    body: "At ~1150 kg/m³, RenewBlocks halves the dead load on structural systems — reducing seismic force exposure and enabling leaner, cheaper foundations.",
  },
  {
    num: "02",
    title: "Thermal Shield",
    body: "A thermal conductivity of 0.42 W/mK — 50% better insulation than conventional concrete — cuts heating and cooling costs for residents.",
  },
  {
    num: "03",
    title: "Carbon Mineralized",
    body: "Injected CO₂ reacts with calcium hydroxide to form calcite in 24 hours. What was pollution becomes the structural mineral matrix.",
  },
  {
    num: "04",
    title: "The Nano-Matrix",
    body: "Silica fume packs microscopic gaps around plastic flakes, creating a mechanically locked, waterproof, salt-resistant composite with self-healing properties.",
  },
];

const COMPARISON = [
  { metric: "Weight", renewblocks: "~12 kg (Low)", kubik: "28 kg (Very High)", better: true },
  { metric: "Installation Speed", renewblocks: "Fast (Flat Surface)", kubik: "Slow (Irregular)", better: true },
  { metric: "Thermal Insulation", renewblocks: "High (0.42 W/mK)", kubik: "Very Low", better: true },
  { metric: "Water Resistance", renewblocks: "High (Hydrophobic)", kubik: "Low (Absorbs)", better: true },
  { metric: "Earthquake Resistance", renewblocks: "High", kubik: "Low", better: true },
  { metric: "Mortar Required", renewblocks: "Up to 70% Less", kubik: "Standard (High)", better: true },
  { metric: "Self-Healing", renewblocks: "Yes", kubik: "No", better: true },
  { metric: "Unit Price", renewblocks: "0.85 ₼", kubik: "0.70 ₼", better: false },
];

const STANDARDS = [
  { code: "ASTM C129", desc: "Strength Standard for Non-Load Bearing Concrete Masonry Units", val: "≥ 4.14 MPa required · RenewBlocks: 5–6 MPa" },
  { code: "ASTM C1113", desc: "Thermal Conductivity Standard", val: "Measured at 0.42 W/mK" },
  { code: "EN 13501-1", desc: "European Fire Safety Classification", val: "Met when covered with gypsum plaster" },
  { code: "AZS 418-2010", desc: "Azerbaijan State Standard — Grade M50 for Partition Walls", val: "Regional compliance confirmed" },
];

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: "#F5F4F0", color: "#1C1C1C" }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navScrolled ? "rgba(245,244,240,0.97)" : "transparent",
        borderBottom: navScrolled ? "1px solid #D5D3CC" : "1px solid transparent",
        transition: "all 0.3s ease",
        backdropFilter: navScrolled ? "blur(8px)" : "none",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: "#2D5A27", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, padding: 4 }}>
              {[0,1,2,3].map(i => <div key={i} style={{ background: "#F5F4F0", opacity: i % 2 === 0 ? 1 : 0.5 }} />)}
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, letterSpacing: "-0.5px", color: "#1C1C1C" }}>RenewBlocks</span>
          </div>
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 500, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "#3D3D3A",
                padding: 0, transition: "color 0.2s"
              }}
                onMouseEnter={e => e.target.style.color = "#2D5A27"}
                onMouseLeave={e => e.target.style.color = "#3D3D3A"}
              >{l}</button>
            ))}
            <button onClick={() => scrollTo("team")} style={{
              background: "#2D5A27", color: "#F5F4F0", border: "none",
              padding: "10px 22px", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer",
              transition: "background 0.2s"
            }}
              onMouseEnter={e => e.target.style.background = "#1e3d1b"}
              onMouseLeave={e => e.target.style.background = "#2D5A27"}
            >Contact</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: "#1C1C1C",
        borderBottom: "4px solid #2D5A27",
        position: "relative", overflow: "hidden",
        paddingTop: 68
      }}>
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        {/* Right accent bar */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 4, background: "#2D5A27" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 820 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(45,90,39,0.2)", border: "1px solid rgba(45,90,39,0.5)",
              padding: "6px 16px", marginBottom: 40
            }}>
              <div style={{ width: 6, height: 6, background: "#4A9F42", borderRadius: "50%" }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7BC67A" }}>
                Baku Higher Oil School — SOCAR
              </span>
            </div>

            <h1 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.08, fontWeight: 400,
              color: "#F5F4F0", margin: "0 0 32px",
              letterSpacing: "-1.5px"
            }}>
              Transforming Industrial<br />
              Waste into the<br />
              <span style={{ color: "#4A9F42", fontStyle: "italic" }}>Carbon-Negative</span><br />
              Skeleton of Future Cities.
            </h1>

            <p style={{ fontSize: 18, color: "#9C9A94", lineHeight: 1.7, maxWidth: 580, margin: "0 0 48px", fontWeight: 300 }}>
              A lightweight, highly insulative composite masonry unit made from local waste — limestone dust, silica fume, and shredded plastic — cured in 24 hours with CO₂.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("specs")} style={{
                background: "#2D5A27", color: "#F5F4F0", border: "none",
                padding: "16px 36px", fontSize: 14, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
                transition: "all 0.2s"
              }}
                onMouseEnter={e => { e.target.style.background = "#4A9F42"; }}
                onMouseLeave={e => { e.target.style.background = "#2D5A27"; }}
              >View Technical Specs</button>
              <button onClick={() => scrollTo("team")} style={{
                background: "transparent", color: "#F5F4F0",
                border: "1px solid rgba(245,244,240,0.25)",
                padding: "16px 36px", fontSize: 14, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
                transition: "all 0.2s"
              }}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(245,244,240,0.7)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(245,244,240,0.25)"; }}
              >Contact Us</button>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0, borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: 80, paddingTop: 40
          }}>
            {[
              { val: "1150 kg/m³", label: "Block Density (vs 2100 natural stone)" },
              { val: "0.42 W/mK", label: "Thermal Conductivity" },
              { val: "24 hrs", label: "CO₂ Cure Time (vs 28 days concrete)" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "0 32px 0 0", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", paddingLeft: i > 0 ? 32 : 0 }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, color: "#4A9F42", letterSpacing: "-1px" }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "#6B6966", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" style={{ padding: "100px 32px", background: "#F5F4F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 64, borderBottom: "1px solid #D5D3CC", paddingBottom: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#2D5A27" }}>01 / Problem</span>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)", margin: 0, letterSpacing: "-0.5px" }}>
                The "Dead Loss" Crisis
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
            {PROBLEMS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div style={{
                  borderLeft: i === 0 ? "1px solid #D5D3CC" : "none",
                  borderRight: "1px solid #D5D3CC",
                  borderTop: "1px solid #D5D3CC",
                  borderBottom: "1px solid #D5D3CC",
                  padding: "40px 36px",
                  marginLeft: i === 0 ? 0 : -1
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8884", marginBottom: 20 }}>{p.label}</div>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#C1392B", marginBottom: 20, letterSpacing: "-0.5px" }}>{p.stat}</div>
                  <div style={{ borderTop: "2px solid #1C1C1C", paddingTop: 20 }}>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4A4845", margin: 0, fontWeight: 300 }}>{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" style={{ padding: "100px 32px", background: "#222220" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 80, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4A9F42" }}>02 / Solution</span>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)", margin: 0, color: "#F5F4F0", letterSpacing: "-0.5px" }}>
                Why RenewBlocks
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(255,255,255,0.07)" }}>
            {FEATURES.map((f, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{
                  background: "#222220", padding: "48px 44px",
                  transition: "background 0.3s",
                  cursor: "default"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "#2a2a27"}
                  onMouseLeave={e => e.currentTarget.style.background = "#222220"}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#4A9F42" }}>{f.num}</span>
                    <div style={{ width: 32, height: 2, background: "#4A9F42", marginTop: 7 }} />
                  </div>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: "#F5F4F0", margin: "0 0 16px", letterSpacing: "-0.3px" }}>{f.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: "#8A8884", margin: 0, fontWeight: 300 }}>{f.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Process strip */}
          <FadeIn delay={0.3}>
            <div style={{ marginTop: 60, background: "#2D5A27", padding: "32px 44px", display: "flex", alignItems: "center", gap: 0 }}>
              {["Collect Industrial Waste", "Shred & Mix", "Press & Vibrate", "CO₂ Cure (24 hrs)", "Certified Masonry Unit"].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,244,240,0.5)", marginBottom: 4 }}>Step {i + 1}</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#F5F4F0" }}>{step}</div>
                  </div>
                  {i < 4 && <div style={{ width: 24, textAlign: "center", color: "rgba(245,244,240,0.4)", fontSize: 18, flexShrink: 0 }}>›</div>}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SPECS / COMPARISON */}
      <section id="specs" style={{ padding: "100px 32px", background: "#F5F4F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 64, borderBottom: "1px solid #D5D3CC", paddingBottom: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#2D5A27" }}>03 / Technical Specs</span>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)", margin: 0, letterSpacing: "-0.5px" }}>
                Market Comparison
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8884", borderBottom: "2px solid #1C1C1C" }}>Metric</th>
                    <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2D5A27", borderBottom: "2px solid #2D5A27", background: "rgba(45,90,39,0.04)" }}>RenewBlocks</th>
                    <th style={{ textAlign: "left", padding: "14px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8A8884", borderBottom: "2px solid #D5D3CC" }}>Kubik (Natural Stone)</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #E8E7E2" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#EEECEA"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "18px 20px", fontSize: 14, fontWeight: 500, color: "#1C1C1C" }}>{row.metric}</td>
                      <td style={{ padding: "18px 20px", fontSize: 14, color: "#2D5A27", fontWeight: 600, background: "rgba(45,90,39,0.03)" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          {row.better && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4A9F42", display: "inline-block" }} />}
                          {row.renewblocks}
                        </span>
                      </td>
                      <td style={{ padding: "18px 20px", fontSize: 14, color: "#6B6966" }}>{row.kubik}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ marginTop: 20, padding: "16px 20px", background: "#EEECEA", borderLeft: "3px solid #8A8884" }}>
              <p style={{ margin: 0, fontSize: 13, color: "#6B6966", fontWeight: 300 }}>
                <strong style={{ color: "#4A4845" }}>Note:</strong> Unit cost is slightly above natural stone (0.85 ₼ vs 0.70 ₼), however total wall cost is significantly lower when accounting for 70% less mortar, reduced labor time, and lighter foundations.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* STANDARDS */}
      <section id="standards" style={{ padding: "100px 32px", background: "#1C1C1C" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 64, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4A9F42" }}>04 / Standards</span>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)", margin: 0, color: "#F5F4F0", letterSpacing: "-0.5px" }}>
                Certifications &amp; Compliance
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}>
            {STANDARDS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "#1C1C1C", padding: "40px 40px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    <div style={{ minWidth: 3, height: 48, background: "#2D5A27", marginTop: 4 }} />
                    <div>
                      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#F5F4F0", marginBottom: 8 }}>{s.code}</div>
                      <div style={{ fontSize: 14, color: "#8A8884", marginBottom: 12, lineHeight: 1.5 }}>{s.desc}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#4A9F42", letterSpacing: "0.05em", textTransform: "uppercase" }}>{s.val}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: 60, display: "flex", gap: 40, padding: "40px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {[
                { label: "SDG 11", detail: "Sustainable Cities and Communities" },
                { label: "SDG 12", detail: "Responsible Consumption and Production" },
                { label: "Circular Economy", detail: "80% of raw materials from industrial waste" },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 40, height: 40, background: "#2D5A27", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 20, height: 20, border: "2px solid #4A9F42", borderRadius: "50%" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#F5F4F0" }}>{b.label}</div>
                    <div style={{ fontSize: 12, color: "#6B6966" }}>{b.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TEAM + CONTACT */}
      <section id="team" style={{ padding: "100px 32px", background: "#F5F4F0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 64, borderBottom: "1px solid #D5D3CC", paddingBottom: 32 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#2D5A27" }}>05 / Team</span>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 4vw, 52px)", margin: 0, letterSpacing: "-0.5px" }}>
                Contact Us
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            {/* Team */}
            <FadeIn>
              <div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, margin: "0 0 32px", color: "#1C1C1C" }}>The Founders</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {[
                    { name: "Ziyad Shiraliyev", role: "Chief Executive Officer", email: "ziyad.shiraliyev.std@bhos.edu.az", phone: "+994 51 410 2706" },
                    { name: "Farid Valimammadov", role: "Chief Operating Officer", email: "farid.valimammadov.std@bhos.edu.az" },
                  ].map((p, i) => (
                    <div key={i} style={{
                      padding: "28px 0",
                      borderBottom: "1px solid #D5D3CC",
                      borderTop: i === 0 ? "1px solid #D5D3CC" : "none"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <div style={{
                          width: 52, height: 52, background: "#2D5A27",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#F5F4F0",
                          flexShrink: 0
                        }}>
                          {p.name[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: 16, fontWeight: 600, color: "#1C1C1C", marginBottom: 2 }}>{p.name}</div>
                          <div style={{ fontSize: 12, color: "#8A8884", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{p.role}</div>
                          <a href={`mailto:${p.email}`} style={{ fontSize: 13, color: "#2D5A27", textDecoration: "none", display: "block" }}>{p.email}</a>
                          {p.phone && <div style={{ fontSize: 13, color: "#6B6966", marginTop: 2 }}>{p.phone}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: "20px 0 0" }}>
                    <div style={{ fontSize: 12, color: "#8A8884", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Institution</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "#1C1C1C" }}>Baku Higher Oil School (SOCAR)</div>
                    <div style={{ fontSize: 14, color: "#6B6966" }}>Baku, Azerbaijan</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact form */}
            <FadeIn delay={0.15}>
              <div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, margin: "0 0 32px", color: "#1C1C1C" }}>Send a Message</h3>
                <ContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111110", padding: "28px 32px", borderTop: "1px solid #2a2a27" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 20, height: 20, background: "#2D5A27", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, padding: 3 }}>
              {[0,1,2,3].map(i => <div key={i} style={{ background: "#F5F4F0", opacity: i % 2 === 0 ? 1 : 0.4 }} />)}
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#F5F4F0" }}>RenewBlocks</span>
          </div>
          <div style={{ fontSize: 12, color: "#4A4845" }}>
            Carbon-Mineralized Composite Masonry · Baku, Azerbaijan · 2026
          </div>
          <div style={{ fontSize: 12, color: "#4A4845" }}>BHOS / SOCAR Research Initiative</div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    window.location.href = `mailto:ziyad.shiraliyev.std@bhos.edu.az?subject=Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`;
    setSent(true);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", fontSize: 14,
    background: "#EEECEA", border: "1px solid #D5D3CC",
    outline: "none", color: "#1C1C1C", boxSizing: "border-box",
    fontFamily: "inherit", transition: "border-color 0.2s"
  };

  if (sent) return (
    <div style={{ padding: "48px 40px", background: "#2D5A27", textAlign: "center" }}>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#F5F4F0", marginBottom: 8 }}>Message Prepared</div>
      <div style={{ fontSize: 14, color: "rgba(245,244,240,0.7)" }}>Your email client should open with the message ready to send.</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8884", marginBottom: 6 }}>Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" style={inputStyle}
            onFocus={e => e.target.style.borderColor = "#2D5A27"}
            onBlur={e => e.target.style.borderColor = "#D5D3CC"}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8884", marginBottom: 6 }}>Email</label>
          <input name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle}
            onFocus={e => e.target.style.borderColor = "#2D5A27"}
            onBlur={e => e.target.style.borderColor = "#D5D3CC"}
          />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8884", marginBottom: 6 }}>Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Inquiry about RenewBlocks..." style={{ ...inputStyle, resize: "vertical" }}
          onFocus={e => e.target.style.borderColor = "#2D5A27"}
          onBlur={e => e.target.style.borderColor = "#D5D3CC"}
        />
      </div>
      <button onClick={handleSubmit} style={{
        background: "#1C1C1C", color: "#F5F4F0", border: "none",
        padding: "16px 32px", fontSize: 13, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
        transition: "background 0.2s", alignSelf: "flex-start"
      }}
        onMouseEnter={e => e.target.style.background = "#2D5A27"}
        onMouseLeave={e => e.target.style.background = "#1C1C1C"}
      >
        Send Inquiry
      </button>
    </div>
  );
}
