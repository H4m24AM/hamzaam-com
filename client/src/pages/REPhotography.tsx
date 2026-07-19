/* ============================================================
   RE Photography Page — Brooklyn Meridian
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

// Gallery images sourced from the existing hamzaam.com RE Photography page
const galleryImages = [
  {
    src: "https://static.wixstatic.com/media/0a2b0a_b2e2e7c7e8f44e3d9e7b1c6d5f8a9b0c~mv2.jpg",
    fallback: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    label: "Interior",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    label: "Living Space",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    label: "Kitchen",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    label: "Bedroom",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
    label: "Exterior",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    label: "Facade",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    label: "Floor Plan",
    category: "Technical",
  },
  {
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    label: "Bathroom",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    label: "Dining Area",
    category: "Residential",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    label: "Luxury Property",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    label: "Suburban",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
    label: "Modern Interior",
    category: "Residential",
  },
];

export default function REPhotography() {
  const s1 = useReveal();
  const s2 = useReveal();

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navigation />

      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-end pb-16 pt-32 overflow-hidden"
        style={{ background: "#0A0A0A" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/manus-storage/re_photography_bg_4d005440.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.35,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #0A0A0A 30%, rgba(10,10,10,0.4) 100%)" }}
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
            Photography
          </p>
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              lineHeight: 0.88,
              textTransform: "uppercase",
              color: "#F5F0E8",
            }}
          >
            RE
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
              Photography
            </span>
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(245,240,232,0.6)",
              maxWidth: "420px",
              lineHeight: 1.7,
              marginTop: "1.5rem",
            }}
          >
            Every property has a story. The right image tells it before a single word is read.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <div style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100+", label: "Properties Shot" },
              { value: "5", label: "Boroughs Covered" },
              { value: "4K", label: "Resolution" },
              { value: "24hr", label: "Turnaround" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "2.5rem",
                    color: "#00FF41",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.4)",
                    marginTop: "0.25rem",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <section ref={s1} className="py-24" style={{ background: "#0A0A0A" }}>
        <div className="container">
          <p className="reveal-up section-label mb-12">Portfolio</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="reveal-up group relative overflow-hidden"
                style={{
                  aspectRatio: i % 5 === 0 ? "4/3" : "3/4",
                  transitionDelay: `${(i % 3) * 80}ms`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    if (img.fallback) (e.target as HTMLImageElement).src = img.fallback;
                  }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(10,10,10,0.7)" }}
                />
                <div
                  className="absolute bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                >
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#00FF41",
                    }}
                  >
                    {img.category}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      color: "#F5F0E8",
                    }}
                  >
                    {img.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={s2} className="py-24" style={{ background: "#111111" }}>
        <div className="container">
          <p className="reveal-up section-label mb-12">Services</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
            {[
              {
                title: "Interior Photography",
                desc: "Wide-angle, properly lit shots that showcase the full character of every room.",
              },
              {
                title: "Exterior & Architectural",
                desc: "Facade, curb appeal, and neighborhood context shots for listings and portfolios.",
              },
              {
                title: "Floor Plan Documentation",
                desc: "Precise, clean floor plan photography for listings, permits, and staging.",
              },
              {
                title: "Aerial & Drone",
                desc: "Bird's-eye perspectives that reveal property scale, location, and surroundings.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="reveal-up p-10 group"
                style={{ background: "#111111" }}
              >
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.75rem",
                    textTransform: "uppercase",
                    color: "#F5F0E8",
                    lineHeight: 1,
                    marginBottom: "0.75rem",
                    transition: "color 200ms",
                  }}
                  className="group-hover:text-signal"
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(245,240,232,0.55)",
                    lineHeight: 1.75,
                  }}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "#00FF41" }}>
        <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                textTransform: "uppercase",
                color: "#0A0A0A",
                lineHeight: 0.95,
              }}
            >
              Ready to List?
              <br />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.85em",
                }}
              >
                Let's Shoot.
              </span>
            </h2>
          </div>
          <a
            href="mailto:hamza@landmarkelitehomes.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "#0A0A0A",
              color: "#00FF41",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Book a Shoot →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
