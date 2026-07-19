/* ============================================================
   About Page — Brooklyn Meridian
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

export default function About() {
  const s1 = useReveal();
  const s2 = useReveal();

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navigation />

      {/* Hero */}
      <section
        className="relative min-h-[60vh] flex items-end pb-16 pt-32"
        style={{ background: "#0A0A0A" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://assets.cdn.filesafe.space/ENt4aQtf2f5y5OANybOt/media/6a557527d0addc5a7d446829.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: 0.15,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #0A0A0A 50%, transparent 100%)" }}
        />
        <div className="container relative z-10">
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
            About
          </p>
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(4rem, 10vw, 8rem)",
              lineHeight: 0.88,
              textTransform: "uppercase",
              color: "#F5F0E8",
            }}
          >
            Hamza
            <br />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 600,
                color: "#C8A96E",
                textTransform: "none",
                fontSize: "0.75em",
              }}
            >
              Abdul-Mumit
            </span>
          </h1>
        </div>
      </section>

      {/* Bio section */}
      <section ref={s1} className="py-24" style={{ background: "#0A0A0A" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Portrait */}
            <div className="reveal-up relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src="https://assets.cdn.filesafe.space/ENt4aQtf2f5y5OANybOt/media/6a557527d0addc5a7d446829.png"
                  alt="Hamza Abdul-Mumit"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9), transparent)" }}
                >
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "#C8A96E", textTransform: "uppercase" }}>
                    Licensed NYS Real Estate Agent
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(245,240,232,0.5)", textTransform: "uppercase", marginTop: "0.25rem" }}>
                    Landmark Elite Homes · New York
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full -z-10" style={{ border: "1px solid rgba(0,255,65,0.15)" }} />
            </div>

            {/* Text */}
            <div>
              <p className="reveal-up section-label mb-8">The Story</p>
              <p
                className="reveal-up delay-100"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.75)", lineHeight: 1.85, marginBottom: "1.5rem" }}
              >
                Brooklyn native Hamza Abdul-Mumit is a real estate agent, photographer, and curator focused on helping people navigate opportunity, tell their stories, and build stronger communities.
              </p>
              <p
                className="reveal-up delay-200"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.75)", lineHeight: 1.85, marginBottom: "1.5rem" }}
              >
                Drawing on a background that spans technology, education, and entrepreneurship, his work sits at the intersection of property, culture, and service.
              </p>
              <p
                className="reveal-up delay-300"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.75)", lineHeight: 1.85, marginBottom: "2.5rem" }}
              >
                Whether helping a family find a home, capturing the character of a neighborhood, or developing projects that spark conversation, Hamza approaches every endeavor with curiosity, discipline, and a commitment to real-world impact.
              </p>

              {/* Tags */}
              <div className="reveal-up delay-400 flex flex-wrap gap-3">
                {["Real Estate Agent", "Photographer", "Tech Curator", "Brooklyn Native", "NYC"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#00FF41",
                      border: "1px solid rgba(0,255,65,0.3)",
                      padding: "0.35rem 0.75rem",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section ref={s2} className="py-24" style={{ background: "#111111" }}>
        <div className="container">
          <p className="reveal-up section-label mb-12">Disciplines</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {[
              {
                num: "01",
                title: "Real Estate",
                color: "#C8A96E",
                desc: "Licensed NYS agent with Landmark Elite Homes. Rentals, residential sales, investment properties — all five boroughs and beyond.",
                link: "https://realty.hamzaam.com",
                linkLabel: "realty.hamzaam.com",
              },
              {
                num: "02",
                title: "Photography",
                color: "#00FF41",
                desc: "Real estate photography that captures the character of a space — from architectural floor plans to interior lifestyle shots.",
                link: "/re-photography",
                linkLabel: "View Portfolio",
              },
              {
                num: "03",
                title: "Statements",
                color: "#00FF41",
                desc: "A curated collection of clothing rooted in culture, identity, and purpose. Wear what you believe.",
                link: "https://shop.hamzaam.com",
                linkLabel: "shop.hamzaam.com",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="reveal-up p-10"
                style={{ background: "#111111" }}
              >
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    color: item.color,
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                  }}
                >
                  {item.num}
                </p>
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    textTransform: "uppercase",
                    color: "#F5F0E8",
                    lineHeight: 1,
                    marginBottom: "1rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(245,240,232,0.55)",
                    lineHeight: 1.75,
                    marginBottom: "1.5rem",
                  }}
                >
                  {item.desc}
                </p>
                <a
                  href={item.link}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: item.color,
                    textDecoration: "none",
                  }}
                >
                  {item.linkLabel} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split-world duality section */}
      <section style={{ display: "flex", minHeight: "60vh" }}>
        {/* Left — Realty world */}
        <div
          className="relative flex-1 flex flex-col justify-center p-12 md:p-16"
          style={{ background: "#0A0A0A" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(/manus-storage/hero_dark_realty_12bb7cd4.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.25,
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0A0A0A 30%, rgba(10,10,10,0.6))" }} />
          <div className="relative z-10">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#C8A96E", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              01 · Real Estate
            </p>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                color: "#F5F0E8",
                marginBottom: "1rem",
              }}
            >
              Landmark
              <br />
              <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 600, color: "#C8A96E", textTransform: "none" }}>Elite Homes</span>
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.75, maxWidth: "280px", marginBottom: "1.5rem" }}>
              Licensed NYS agent. All five boroughs. Rentals, residential sales, investment properties.
            </p>
            <a href="https://realty.hamzaam.com" target="_blank" rel="noopener noreferrer" className="btn-outline-light" style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}>
              realty.hamzaam.com →
            </a>
          </div>
        </div>

        {/* Seam */}
        <div style={{ width: "1px", background: "linear-gradient(to bottom, transparent, #00FF41 30%, #00FF41 70%, transparent)", opacity: 0.5, flexShrink: 0 }} />

        {/* Right — Culture world */}
        <div
          className="relative flex-1 flex flex-col justify-center p-12 md:p-16"
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
          <div className="absolute inset-0" style={{ background: "linear-gradient(to left, #FFFFFF 30%, rgba(255,255,255,0.6))" }} />
          <div className="relative z-10">
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#00FF41", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              03 · Statements
            </p>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                color: "#111111",
                marginBottom: "1rem",
              }}
            >
              Statements
              <br />
              <span style={{ color: "#00FF41" }}>by Hamza AM</span>
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(17,17,17,0.55)", lineHeight: 1.75, maxWidth: "280px", marginBottom: "1.5rem" }}>
              Culture. Identity. Purpose. Clothing rooted in meaning — no logos, no hype, no noise.
            </p>
            <a href="https://shop.hamzaam.com" target="_blank" rel="noopener noreferrer" className="btn-signal" style={{ fontSize: "0.75rem", padding: "0.6rem 1.25rem" }}>
              shop.hamzaam.com →
            </a>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-16" style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="section-label mb-3">Get in Touch</p>
            <h3
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "2rem",
                textTransform: "uppercase",
                color: "#F5F0E8",
              }}
            >
              Let's Make Something Move.
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            <a href="tel:6463394147" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.6)" }}>
              646.339.4147
            </a>
            <a href="mailto:hamza@landmarkelitehomes.com" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.6)" }}>
              hamza@landmarkelitehomes.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
