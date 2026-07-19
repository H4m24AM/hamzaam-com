/* ============================================================
   Travelogue Page — Brooklyn Meridian
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

const travelImages = [
  { src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80", location: "Paris", country: "France", year: "2024" },
  { src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80", location: "London", country: "UK", year: "2024" },
  { src: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80", location: "Tokyo", country: "Japan", year: "2023" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", location: "Marrakech", country: "Morocco", year: "2023" },
  { src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80", location: "Rome", country: "Italy", year: "2023" },
  { src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80", location: "Amsterdam", country: "Netherlands", year: "2022" },
  { src: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80", location: "Barcelona", country: "Spain", year: "2022" },
  { src: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80", location: "Istanbul", country: "Turkey", year: "2022" },
  { src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80", location: "Santorini", country: "Greece", year: "2022" },
  { src: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", location: "Dubai", country: "UAE", year: "2021" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", location: "Swiss Alps", country: "Switzerland", year: "2021" },
  { src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", location: "Osaka", country: "Japan", year: "2021" },
  { src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80", location: "New Delhi", country: "India", year: "2020" },
  { src: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80", location: "Sydney", country: "Australia", year: "2020" },
  { src: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80", location: "Rio de Janeiro", country: "Brazil", year: "2019" },
  { src: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80", location: "Havana", country: "Cuba", year: "2019" },
  { src: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80", location: "Nairobi", country: "Kenya", year: "2019" },
  { src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", location: "Singapore", country: "Singapore", year: "2018" },
  { src: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80", location: "Cape Town", country: "South Africa", year: "2018" },
  { src: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800&q=80", location: "Lisbon", country: "Portugal", year: "2018" },
];

export default function Travelogue() {
  const s1 = useReveal();
  const s2 = useReveal();

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navigation />

      {/* Hero */}
      <section
        className="relative min-h-[65vh] flex items-end pb-16 pt-32 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/manus-storage/travelogue_bg_322487ae.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #0A0A0A 30%, rgba(10,10,10,0.3) 100%)" }}
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
            Travelogue
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
            One Lens.
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
              Unfiltered
            </span>
            <br />
            Moments Abroad.
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16" style={{ background: "#0A0A0A" }}>
        <div className="container">
          <div className="max-w-2xl">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.1rem",
                color: "rgba(245,240,232,0.65)",
                lineHeight: 1.85,
              }}
            >
              A visual journal from the road — street scenes, architecture, and the quiet moments between destinations. Every frame is a document. Every city, a chapter.
            </p>
          </div>
        </div>
      </section>

      {/* Masonry-style gallery */}
      <section ref={s1} className="pb-24" style={{ background: "#0A0A0A" }}>
        <div className="container">
          <p className="reveal-up section-label mb-12">The Journal</p>
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {travelImages.map((img, i) => (
              <div
                key={i}
                className="reveal-up group relative overflow-hidden"
                style={{
                  aspectRatio: i % 7 === 0 ? "16/9" : i % 4 === 0 ? "1/1" : "3/4",
                  gridColumn: i % 7 === 0 ? "span 2" : "span 1",
                  transitionDelay: `${(i % 4) * 60}ms`,
                }}
              >
                <img
                  src={img.src}
                  alt={`${img.location}, ${img.country}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(10,10,10,0.65)" }}
                />
                <div
                  className="absolute bottom-0 left-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
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
                    {img.country} · {img.year}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: "1.5rem",
                      textTransform: "uppercase",
                      color: "#F5F0E8",
                      lineHeight: 1,
                    }}
                  >
                    {img.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote strip */}
      <section ref={s2} className="py-24" style={{ background: "#111111" }}>
        <div className="container">
          <div className="reveal-up max-w-3xl">
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                color: "#C8A96E",
                lineHeight: 1.4,
                marginBottom: "1.5rem",
              }}
            >
              "The world is a book, and those who do not travel read only one page."
            </p>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.35)",
              }}
            >
              — Augustine of Hippo
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
