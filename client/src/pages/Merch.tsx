/* ============================================================
   Merch Page — Brooklyn Meridian
   Archive dossier aesthetic. Statements by Hamza AM.
   ============================================================ */
import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal-up").forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const statements = [
  {
    num: "01",
    title: "I Heart ALLAH BLK",
    classification: "Devotion / Love",
    status: "Active Signal",
    edition: "Faith",
    origin: "When the heart is engaged, need, fear, hope, trust, reliance, and worship become inseparable from purpose.",
    price: "$30",
    img: "https://shop.hamzaam.com/cdn/shop/files/ninjapod_12695246_f_C1717_00p_f.jpg?v=1777913487&width=600",
    bg: "#0A0A0A",
    textColor: "#F5F0E8",
    accentColor: "#C8A96E",
  },
  {
    num: "02",
    title: "Community Service",
    classification: "Sacrifice / Activism",
    status: "Active Signal",
    edition: "Agency",
    origin: "From within begins self-preservation. The community is the first institution.",
    price: "$30",
    img: "https://shop.hamzaam.com/cdn/shop/files/ninjapod_12796232_f_C1717_54_f.jpg?v=1778565906&width=600",
    bg: "#FFFFFF",
    textColor: "#111111",
    accentColor: "#00FF41",
  },
  {
    num: "08",
    title: "Cancel Cancer, Period!",
    classification: "Health / Healing",
    status: "Liberation Signal",
    edition: "Resistance",
    origin: "What is opposed cannot rule the spirit. The body is political. Healing is radical.",
    price: "$30",
    img: "https://shop.hamzaam.com/cdn/shop/files/unisex-garment-dyed-heavyweight-t-shirt-black-front-69e644617fee5.jpg?v=1776698480&width=600",
    bg: "#0A0A0A",
    textColor: "#F5F0E8",
    accentColor: "#00FF41",
  },
  {
    num: "06",
    title: "Before Streaming",
    classification: "ARTIFacts / ANALOG",
    status: "Archive Signal",
    edition: "Memory",
    origin: "To the beat, yall. Ya don't stop. Before algorithms, there was the record, the tape, the cipher.",
    price: "$30",
    img: "https://shop.hamzaam.com/cdn/shop/files/unisex-staple-t-shirt-athletic-heather-front-69ec542f0591a.jpg?v=1777095743&width=600",
    bg: "#FFFFFF",
    textColor: "#111111",
    accentColor: "#00FF41",
  },
];

export default function Merch() {
  const s1 = useReveal();
  const s2 = useReveal();

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navigation />

      {/* Hero — split world */}
      <section style={{ display: "flex", minHeight: "70vh", paddingTop: "5rem" }}>
        {/* Left — dark archive */}
        <div
          className="relative flex-1 flex flex-col justify-end p-10 md:p-16"
          style={{ background: "#0A0A0A" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(/manus-storage/hero_dark_realty_12bb7cd4.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.1,
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0A0A0A 60%, transparent)" }} />
          <div className="relative z-10">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#C8A96E", textTransform: "uppercase", marginBottom: "1rem" }}>
              [ARCHIVE] · Collection 2026
            </p>
            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                lineHeight: 0.88,
                textTransform: "uppercase",
                color: "#F5F0E8",
              }}
            >
              Statements
              <br />
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 600, color: "#C8A96E", textTransform: "none", fontSize: "0.8em" }}>
                by Hamza AM
              </span>
            </h1>
          </div>
        </div>

        {/* Seam */}
        <div style={{ width: "1px", background: "linear-gradient(to bottom, transparent, #00FF41 30%, #00FF41 70%, transparent)", opacity: 0.6, flexShrink: 0 }} />

        {/* Right — white signal */}
        <div
          className="relative flex-1 flex flex-col justify-end p-10 md:p-16"
          style={{ background: "#FFFFFF" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(/manus-storage/hero_light_culture_e3762599.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.08,
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #FFFFFF 60%, transparent)" }} />
          <div className="relative z-10">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#00FF41", textTransform: "uppercase", marginBottom: "1rem" }}>
              [SIGNAL] · 04 Active
            </p>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                lineHeight: 0.88,
                textTransform: "uppercase",
                color: "#111111",
              }}
            >
              Culture.
              <br />
              <span style={{ color: "#00FF41" }}>Identity.</span>
              <br />
              Purpose.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(17,17,17,0.55)", lineHeight: 1.7, maxWidth: "280px", marginTop: "1rem" }}>
              No logos. No hype. No noise. Just what I wear — and what I mean by it.
            </p>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap py-3" style={{ background: "#111111", color: "#00FF41" }}>
        <div className="ticker-content">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", fontWeight: 700, marginRight: "3rem", color: "#00FF41" }}>
              [LOG] ARCHIVE INDEX LIVE · [TRACE] CULTURE SIGNAL DETECTED · [STATE] 04 STATEMENTS ACTIVE · [VERIFY] PURPOSE TRANSMITTING ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Dossier — alternating dark/light per statement */}
      <section ref={s1}>
        {statements.map((item, i) => (
          <a
            key={item.num}
            href="https://shop.hamzaam.com"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-up group block"
            style={{ background: item.bg, borderBottom: "1px solid rgba(128,128,128,0.12)" }}
          >
            <div className="container py-0">
              <div
                className="grid items-stretch"
                style={{ gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr" }}
              >
                {/* Image — alternates left/right */}
                {i % 2 === 0 && (
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: item.bg === "#0A0A0A" ? "contrast(1.1)" : "none" }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: item.bg === "#0A0A0A" ? "rgba(0,255,65,0.08)" : "rgba(0,0,0,0.05)" }}
                    />
                  </div>
                )}

                {/* Dossier content */}
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  {/* Header metadata */}
                  <div className="flex items-center gap-4 mb-6">
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: item.accentColor,
                        border: `1px solid ${item.accentColor}`,
                        padding: "0.2rem 0.6rem",
                      }}
                    >
                      {item.status}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: item.bg === "#0A0A0A" ? "rgba(245,240,232,0.3)" : "rgba(17,17,17,0.3)",
                      }}
                    >
                      EDITION: {item.edition}
                    </span>
                  </div>

                  {/* Number + Title */}
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: item.accentColor,
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    STATEMENT {item.num}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                      textTransform: "uppercase",
                      color: item.textColor,
                      lineHeight: 0.95,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Classification */}
                  <div
                    className="mb-4 pb-4"
                    style={{ borderBottom: `1px solid ${item.bg === "#0A0A0A" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` }}
                  >
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: item.bg === "#0A0A0A" ? "rgba(245,240,232,0.35)" : "rgba(17,17,17,0.35)", marginBottom: "0.25rem" }}>
                      CLASSIFICATION
                    </p>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: item.accentColor }}>
                      {item.classification}
                    </p>
                  </div>

                  {/* Origin */}
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: item.bg === "#0A0A0A" ? "rgba(245,240,232,0.6)" : "rgba(17,17,17,0.6)",
                      lineHeight: 1.8,
                      marginBottom: "2rem",
                      fontStyle: "italic",
                    }}
                  >
                    "{item.origin}"
                  </p>

                  {/* Price + CTA */}
                  <div className="flex items-center gap-6">
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 800,
                        fontSize: "2rem",
                        color: item.textColor,
                      }}
                    >
                      {item.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: item.accentColor,
                        transition: "letter-spacing 200ms",
                      }}
                      className="group-hover:tracking-widest"
                    >
                      Access Dossier →
                    </span>
                  </div>
                </div>

                {/* Image — right side for odd items */}
                {i % 2 !== 0 && (
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(0,255,65,0.06)" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </a>
        ))}
      </section>

      {/* CTA */}
      <div className="flex justify-center py-16" style={{ background: "#111111" }}>
        <a
          href="https://shop.hamzaam.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-signal"
          style={{ fontSize: "0.9rem", padding: "1rem 2.5rem" }}
        >
          Enter the Full Archive →
        </a>
      </div>

      {/* Philosophy split */}
      <section ref={s2} style={{ display: "flex", minHeight: "50vh" }}>
        <div
          className="relative flex-1 flex flex-col justify-center p-12 md:p-16"
          style={{ background: "#111111" }}
        >
          <div className="reveal-up">
            <p className="section-label mb-6">The Philosophy</p>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                color: "#F5F0E8",
                marginBottom: "1.5rem",
              }}
            >
              Every Garment
              <br />
              <span style={{ color: "#00FF41" }}>Is a Statement.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.85, maxWidth: "380px" }}>
              Wear what you believe. Carry what you stand for. The fabric is the message. Each piece in the collection is rooted in a specific idea — a belief, a principle, a piece of history worth carrying.
            </p>
          </div>
        </div>

        <div style={{ width: "1px", background: "linear-gradient(to bottom, transparent, #00FF41 30%, #00FF41 70%, transparent)", opacity: 0.5, flexShrink: 0 }} />

        <div
          className="relative flex-1 flex flex-col justify-center p-12 md:p-16"
          style={{ background: "#FFFFFF" }}
        >
          <div className="reveal-up delay-200">
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "#00FF41",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ display: "block", width: "2rem", height: "1px", background: "#00FF41" }} />
              Signal Active
            </p>
            <blockquote
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                color: "#111111",
                lineHeight: 1.4,
                marginBottom: "1.5rem",
                borderLeft: "3px solid #00FF41",
                paddingLeft: "1.5rem",
              }}
            >
              "No logos. No hype. No noise. Just what I wear — and what I mean by it."
            </blockquote>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(17,17,17,0.4)" }}>
              — Hamza AM
            </p>
            <a
              href="https://shop.hamzaam.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-signal mt-8 inline-flex"
            >
              Make a Statement →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
