/* ============================================================
   Home Page — Replicating approved ChatGPT design reference
   Dark full-bleed hero → white what-I-do → dark who-I-am →
   white recent-work carousel → dark photo split → gold values → dark footer
   ============================================================ */
import { useState } from "react";

// ── Assets ────────────────────────────────────────────────
const HERO_IMG       = "/manus-storage/hero_man_dark_e068b48c.jpg";
const REALTY_IMG     = "/manus-storage/hero_dark_realty_79565c99.jpg";
const CYBER_IMG      = "/manus-storage/cybersecurity_a59fe9ff.jpg";
const HOODIE_IMG     = "/manus-storage/IMG_2773_7c730c12.jpg";
const WRITING_IMG    = "/manus-storage/writing_desk_fa863a2c.jpg";
const SKYLINE_IMG    = "/manus-storage/nyc_silhouette_3b3b9b83.jpg";
const HOUSE_IMG      = "/manus-storage/house_exterior_86f40f62.jpg";
const BOOK_IMG       = "/manus-storage/book_cover_d4d49632.jpg";
const STREET_IMG     = "/manus-storage/street_night_47e297b0.jpg";
const TRAVEL_IMG     = "/manus-storage/travelogue_bg_6c060f2a.jpg";
const BRIDGE_IMG     = "/manus-storage/brooklyn_bridge_d78c5f45.jpg";
const PORTRAIT_IMG   = "/manus-storage/IMG_2773_7c730c12.jpg";

// ── Design tokens ─────────────────────────────────────────
const GOLD   = "#C8A96E";
const BLACK  = "#0D0D0D";
const DARK   = "#111111";
const WHITE  = "#FFFFFF";
const OFFWHT = "#F8F6F2";
const GRAY   = "#888888";
const BORDER = "#E5E5E5";
const F_SANS = "'DM Sans', sans-serif";
const F_COND = "'Barlow Condensed', sans-serif";
const F_SER  = "'Playfair Display', serif";
const F_MONO = "'Space Mono', monospace";

// ── Reusable outlined button ──────────────────────────────
function OutlineBtn({ children, href, dark = false, style = {} }: {
  children: React.ReactNode; href: string; dark?: boolean; style?: React.CSSProperties;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        border: `1px solid ${dark ? "rgba(255,255,255,0.5)" : BLACK}`,
        color: dark ? (hov ? BLACK : WHITE) : (hov ? WHITE : BLACK),
        background: hov ? (dark ? WHITE : BLACK) : "transparent",
        fontFamily: F_COND, fontWeight: 700, fontSize: "0.72rem",
        letterSpacing: "0.12em", textTransform: "uppercase",
        padding: "0.7rem 1.4rem", textDecoration: "none",
        transition: "all 0.2s",
        ...style,
      }}
    >{children}</a>
  );
}

// ── Nav ───────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: WHITE, borderBottom: `1px solid ${BORDER}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "56px", padding: "0 2rem",
    }}>
      <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0.15rem" }}>
        <span style={{ fontFamily: F_COND, fontWeight: 900, fontSize: "1.1rem", letterSpacing: "0.05em", color: BLACK }}>HAMZA</span>
        <span style={{ fontFamily: F_COND, fontWeight: 400, fontSize: "1.1rem", letterSpacing: "0.05em", color: BLACK }}> AM</span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {[["HOME","/"],["ABOUT","/about"],["COMPANIES","#"],["PHOTOGRAPHY","/re-photography"],["PROJECTS","#"],["CONTACT","#"]].map(([l,h],i) => (
          <a key={l} href={h} style={{
            fontFamily: F_COND, fontWeight: 600, fontSize: "0.7rem",
            letterSpacing: "0.1em", color: i === 0 ? BLACK : "#666",
            textDecoration: "none",
            borderBottom: i === 0 ? `2px solid ${BLACK}` : "2px solid transparent",
            paddingBottom: "2px",
          }}>{l}</a>
        ))}
      </div>
      <a href="/about" style={{
        background: BLACK, color: WHITE,
        fontFamily: F_COND, fontWeight: 700, fontSize: "0.68rem",
        letterSpacing: "0.12em", padding: "0.6rem 1.25rem",
        textDecoration: "none",
      }}>LET'S CONNECT →</a>
    </nav>
  );
}

// ── Main ──────────────────────────────────────────────────
export default function Home() {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [email, setEmail] = useState("");

  const workItems = [
    { img: HOUSE_IMG,   cat: "REAL ESTATE",   title: "Just Listed in Bedford-Stuyvesant", cta: "VIEW LISTING →",   href: "https://realty.hamzaam.com" },
    { img: HOODIE_IMG,  cat: "STATEMENTS",    title: "New Drop: Faith Over Fear",          cta: "SHOP NOW →",       href: "https://shop.hamzaam.com" },
    { img: CYBER_IMG,   cat: "CYBERSECURITY", title: "Why Cybersecurity Is Business Critical", cta: "READ ARTICLE →", href: "#" },
    { img: BOOK_IMG,    cat: "AUTHOR",        title: "Chapters of Growth Now Available",   cta: "LEARN MORE →",     href: "#" },
    { img: STREET_IMG,  cat: "PHOTOGRAPHY",   title: "Fatherhood. Captured.",              cta: "VIEW GALLERY →",   href: "/re-photography" },
  ];

  const maxIdx = Math.max(0, workItems.length - 3);

  return (
    <div style={{ background: WHITE, fontFamily: F_SANS, overflowX: "hidden" }}>
      <Nav />
      <div style={{ height: "56px" }} />

      {/* ══════════════════════════════════════════
          1. HERO — dark full-bleed
      ══════════════════════════════════════════ */}
      <section style={{
        position: "relative", minHeight: "calc(100vh - 56px)",
        background: BLACK, overflow: "hidden",
        display: "flex", alignItems: "center",
      }}>
        {/* Background portrait */}
        <img src={HERO_IMG} alt="Hamza AM"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center top",
            opacity: 0.55,
          }}
        />
        {/* Gradient overlay — darker on left for text legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.88) 40%, rgba(0,0,0,0.15) 100%)",
        }} />

        {/* Vertical Brooklyn NY label */}
        <div style={{
          position: "absolute", left: "1.25rem", top: "50%",
          writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)",
          fontFamily: F_MONO, fontSize: "0.42rem", letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.35)", textTransform: "uppercase",
        }}>BROOKLYN, NY</div>

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: "600px", padding: "5rem 3rem 5rem 4rem",
        }}>
          <p style={{
            fontFamily: F_MONO, fontSize: "0.55rem", letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.55)", textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>ENTREPRENEUR. CREATOR. BUILDER.</p>

          <h1 style={{
            fontFamily: F_SANS, fontWeight: 700,
            fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
            lineHeight: 1.15, color: WHITE,
            margin: "0 0 1.5rem",
          }}>
            Ideas into <span style={{ color: GOLD }}>impact.</span><br />
            Vision into <span style={{ color: GOLD }}>value.</span>
          </h1>

          <p style={{
            fontFamily: F_SANS, fontSize: "0.95rem",
            color: "rgba(255,255,255,0.65)", lineHeight: 1.75,
            maxWidth: "420px", marginBottom: "2.5rem",
          }}>
            I build businesses, solve problems, and create things that matter. Across real estate, technology, apparel, and beyond.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <OutlineBtn href="/about" dark>EXPLORE MY WORLD →</OutlineBtn>
            <OutlineBtn href="/about" dark>ABOUT HAMZA →</OutlineBtn>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
        }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
              <line x1="6" y1="2" x2="6" y2="10" />
              <polyline points="3,7 6,10 9,7" />
            </svg>
          </div>
        </div>

        {/* Signature */}
        <p style={{
          position: "absolute", bottom: "2rem", right: "2.5rem",
          fontFamily: F_SER, fontStyle: "italic",
          fontSize: "1.5rem", color: GOLD, opacity: 0.8,
        }}>Hamza AM</p>
      </section>

      {/* ══════════════════════════════════════════
          2. WHAT I DO — white, 3 dark cards
      ══════════════════════════════════════════ */}
      <section style={{ background: WHITE, padding: "5rem 3rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{
            fontFamily: F_MONO, fontSize: "0.55rem", letterSpacing: "0.2em",
            textTransform: "uppercase", color: GRAY, marginBottom: "0.75rem",
          }}>WHAT I DO</p>
          <h2 style={{
            fontFamily: F_SANS, fontWeight: 700,
            fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
            color: BLACK, margin: "0 0 1rem",
          }}>Different industries. One standard: excellence.</h2>
          <div style={{ width: "2.5rem", height: "2px", background: GOLD, margin: "0 auto" }} />
        </div>

        {/* 3 cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem", maxWidth: "1100px", margin: "0 auto 2.5rem",
        }}>
          {[
            { img: REALTY_IMG, icon: "H", label: "REALTY ESTATE", desc: "Helping clients buy, sell, rent and invest with confidence across New York.", cta: "VISIT REALTY →", href: "https://realty.hamzaam.com" },
            { img: CYBER_IMG,  icon: "P²", label: "P² CYBER SOLUTIONS", desc: "Managed IT, cybersecurity and AI automation that power business growth.", cta: "VISIT P² CYBER →", href: "#" },
            { img: HOODIE_IMG, icon: "T", label: "STATEMENTS", desc: "Apparel inspired by faith, culture and conversation.", cta: "SHOP STATEMENTS →", href: "https://shop.hamzaam.com" },
          ].map((c) => (
            <a key={c.label} href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                display: "block", textDecoration: "none",
                background: DARK, color: WHITE,
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                <img src={c.img} alt={c.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.75)" }}
                />
                <div style={{
                  position: "absolute", top: "1rem", left: "1rem",
                  border: "1.5px solid rgba(255,255,255,0.7)",
                  width: "36px", height: "36px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: F_COND, fontWeight: 900, fontSize: "0.8rem", color: WHITE }}>{c.icon}</span>
                </div>
              </div>
              {/* Text */}
              <div style={{ padding: "1.5rem 1.5rem 1.75rem" }}>
                <p style={{
                  fontFamily: F_COND, fontWeight: 800, fontSize: "1rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: WHITE, marginBottom: "0.6rem",
                }}>{c.label}</p>
                <p style={{
                  fontFamily: F_SANS, fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.6)", lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}>{c.desc}</p>
                <p style={{
                  fontFamily: F_COND, fontWeight: 700, fontSize: "0.65rem",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: GOLD,
                }}>{c.cta}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Explore all */}
        <div style={{ textAlign: "center" }}>
          <a href="#" style={{
            fontFamily: F_COND, fontWeight: 700, fontSize: "0.7rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: BLACK, textDecoration: "none",
            borderBottom: `1px solid ${BLACK}`, paddingBottom: "2px",
          }}>EXPLORE ALL COMPANIES →</a>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. WHO I AM — dark, left text + right photos
      ══════════════════════════════════════════ */}
      <section style={{
        background: DARK,
        display: "grid", gridTemplateColumns: "1fr 1fr",
        minHeight: "420px",
      }}>
        {/* Left */}
        <div style={{
          padding: "5rem 4rem",
          display: "flex", flexDirection: "column", justifyContent: "center",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{
            fontFamily: F_MONO, fontSize: "0.52rem", letterSpacing: "0.18em",
            textTransform: "uppercase", color: GOLD, marginBottom: "1.25rem",
          }}>WHO I AM</p>
          <h2 style={{
            fontFamily: F_SANS, fontWeight: 700,
            fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)",
            color: WHITE, lineHeight: 1.2, marginBottom: "1.5rem",
          }}>Builder. Creator. Problem Solver.</h2>
          <p style={{
            fontFamily: F_SANS, fontSize: "0.88rem",
            color: "rgba(255,255,255,0.6)", lineHeight: 1.8,
            marginBottom: "0.75rem",
          }}>
            I'm a Brooklyn-based entrepreneur and creative whose work lives at the intersection of business, technology, photography, writing, and design.
          </p>
          <p style={{
            fontFamily: F_SANS, fontSize: "0.88rem",
            color: "rgba(255,255,255,0.6)", lineHeight: 1.8,
            marginBottom: "2.5rem",
          }}>
            My mission is simple: add value, leave a legacy, and help others do the same.
          </p>
          <OutlineBtn href="/about" dark>MORE ABOUT HAMZA →</OutlineBtn>
        </div>

        {/* Right — 2 photos side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ overflow: "hidden" }}>
            <img src={WRITING_IMG} alt="Writing"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }}
            />
          </div>
          <div style={{ overflow: "hidden", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            <img src={SKYLINE_IMG} alt="NYC Skyline"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. RECENT WORK — white, carousel
      ══════════════════════════════════════════ */}
      <section style={{ background: WHITE, padding: "5rem 0" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem", padding: "0 3rem" }}>
          <p style={{
            fontFamily: F_COND, fontWeight: 800, fontSize: "0.8rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: BLACK, marginBottom: "0.5rem",
          }}>RECENT WORK</p>
          <div style={{ width: "2.5rem", height: "2px", background: GOLD, margin: "0 auto" }} />
        </div>

        {/* Carousel container */}
        <div style={{ position: "relative", padding: "0 3.5rem" }}>
          {/* Left arrow */}
          <button
            onClick={() => setCarouselIdx(Math.max(0, carouselIdx - 1))}
            disabled={carouselIdx === 0}
            style={{
              position: "absolute", left: "0.5rem", top: "50%",
              transform: "translateY(-50%)", zIndex: 10,
              width: "40px", height: "40px", borderRadius: "50%",
              background: BLACK, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: carouselIdx === 0 ? 0.3 : 1,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={WHITE} strokeWidth="2">
              <polyline points="9,2 4,7 9,12" />
            </svg>
          </button>

          {/* Cards track */}
          <div style={{ overflow: "hidden" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${workItems.length}, calc(33.333% - 0.67rem))`,
              gap: "1rem",
              transform: `translateX(calc(-${carouselIdx} * (33.333% + 0.33rem)))`,
              transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
            }}>
              {workItems.map((item) => (
                <a key={item.title} href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    display: "block", textDecoration: "none",
                    border: `1px solid ${BORDER}`,
                    transition: "box-shadow 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                >
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <img src={item.img} alt={item.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                    <p style={{
                      fontFamily: F_MONO, fontSize: "0.48rem", letterSpacing: "0.14em",
                      textTransform: "uppercase", color: GOLD, marginBottom: "0.5rem",
                    }}>{item.cat}</p>
                    <p style={{
                      fontFamily: F_SANS, fontWeight: 700,
                      fontSize: "0.95rem", color: BLACK,
                      lineHeight: 1.3, marginBottom: "1rem",
                    }}>{item.title}</p>
                    <p style={{
                      fontFamily: F_COND, fontWeight: 700, fontSize: "0.62rem",
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: BLACK, borderBottom: `1px solid ${BLACK}`,
                      display: "inline-block", paddingBottom: "1px",
                    }}>{item.cta}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => setCarouselIdx(Math.min(maxIdx, carouselIdx + 1))}
            disabled={carouselIdx >= maxIdx}
            style={{
              position: "absolute", right: "0.5rem", top: "50%",
              transform: "translateY(-50%)", zIndex: 10,
              width: "40px", height: "40px", borderRadius: "50%",
              background: BLACK, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: carouselIdx >= maxIdx ? 0.3 : 1,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={WHITE} strokeWidth="2">
              <polyline points="5,2 10,7 5,12" />
            </svg>
          </button>
        </div>

        {/* View all */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="#" style={{
            fontFamily: F_COND, fontWeight: 700, fontSize: "0.7rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: BLACK, textDecoration: "none",
            borderBottom: `1px solid ${BLACK}`, paddingBottom: "2px",
          }}>VIEW ALL PROJECTS →</a>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. PHOTOGRAPHY — dark, 50/50 split
      ══════════════════════════════════════════ */}
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        minHeight: "380px", background: DARK,
      }}>
        {/* Left — bridge photo */}
        <div style={{ overflow: "hidden" }}>
          <img src={BRIDGE_IMG} alt="Brooklyn Bridge"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)" }}
          />
        </div>

        {/* Right — text */}
        <div style={{
          padding: "5rem 4rem",
          display: "flex", flexDirection: "column", justifyContent: "center",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{
            fontFamily: F_MONO, fontSize: "0.52rem", letterSpacing: "0.18em",
            textTransform: "uppercase", color: GOLD, marginBottom: "1.25rem",
          }}>BEHIND THE LENS</p>
          <h2 style={{
            fontFamily: F_SANS, fontWeight: 700,
            fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
            color: WHITE, lineHeight: 1.2, marginBottom: "1.25rem",
          }}>Photography that tells<br />the real story.</h2>
          <p style={{
            fontFamily: F_SANS, fontSize: "0.88rem",
            color: "rgba(255,255,255,0.55)", lineHeight: 1.75,
            marginBottom: "2.5rem", maxWidth: "380px",
          }}>
            From architecture to everyday moments, my camera captures what words can't always say.
          </p>
          <OutlineBtn href="/re-photography" dark>EXPLORE PHOTOGRAPHY →</OutlineBtn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. VALUES STRIP — gold background
      ══════════════════════════════════════════ */}
      <section style={{
        background: GOLD,
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        padding: "3rem 3rem",
      }}>
        {[
          { icon: "♟", label: "STRATEGIC MINDSET", desc: "Every decision is intentional." },
          { icon: "⚡", label: "RELENTLESS EXECUTION", desc: "Ideas mean nothing without action." },
          { icon: "◎", label: "COMMUNITY FOCUSED", desc: "Success is better when shared." },
          { icon: "◈", label: "FAITH DRIVEN", desc: "Purpose guides everything." },
        ].map((v, i) => (
          <div key={v.label} style={{
            display: "flex", flexDirection: "column", alignItems: "flex-start",
            gap: "0.6rem", padding: "0 1.5rem",
            borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.12)" : "none",
          }}>
            <span style={{ fontSize: "1.4rem", color: "rgba(0,0,0,0.5)" }}>{v.icon}</span>
            <p style={{
              fontFamily: F_COND, fontWeight: 800, fontSize: "0.72rem",
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: BLACK,
            }}>{v.label}</p>
            <p style={{
              fontFamily: F_SANS, fontSize: "0.78rem",
              color: "rgba(0,0,0,0.6)", lineHeight: 1.5,
            }}>{v.desc}</p>
          </div>
        ))}
      </section>

      {/* ══════════════════════════════════════════
          7. FOOTER — dark
      ══════════════════════════════════════════ */}
      <footer style={{ background: "#0A0A0A", padding: "4rem 3rem 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr 1fr 1fr 220px",
          gap: "2rem", paddingBottom: "3rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.15rem", marginBottom: "1rem" }}>
              <span style={{ fontFamily: F_COND, fontWeight: 900, fontSize: "1.3rem", color: WHITE }}>HAMZA</span>
              <span style={{ fontFamily: F_COND, fontWeight: 400, fontSize: "1.3rem", color: WHITE }}> AM</span>
            </div>
            <p style={{
              fontFamily: F_SANS, fontSize: "0.78rem",
              color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
              marginBottom: "1rem",
            }}>Entrepreneur. Real Estate Agent. Cybersecurity Consultant. Author. Photographer.</p>
            <p style={{
              fontFamily: F_SANS, fontSize: "0.72rem",
              color: "rgba(255,255,255,0.35)",
              display: "flex", alignItems: "center", gap: "0.35rem",
            }}>📍 BROOKLYN, NY</p>
          </div>

          {/* Companies */}
          <div>
            <p style={{ fontFamily: F_COND, fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>COMPANIES</p>
            {[["Realty","https://realty.hamzaam.com"],["P² Cyber Solutions","#"],["Statements","https://shop.hamzaam.com"]].map(([l,h]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <a href={h} style={{ fontFamily: F_SANS, fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{l}</a>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>→</span>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <p style={{ fontFamily: F_COND, fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>QUICK LINKS</p>
            {[["About","/about"],["Photography","/re-photography"],["Projects","#"]].map(([l,h]) => (
              <p key={l} style={{ marginBottom: "0.75rem" }}>
                <a href={h} style={{ fontFamily: F_SANS, fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{l}</a>
              </p>
            ))}
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontFamily: F_COND, fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>CONNECT</p>
            {[["📷 Instagram","#"],["💼 LinkedIn","#"],["✉ Email","#"]].map(([l,h]) => (
              <p key={l} style={{ marginBottom: "0.75rem" }}>
                <a href={h} style={{ fontFamily: F_SANS, fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>{l}</a>
              </p>
            ))}
          </div>

          {/* Stay Connected */}
          <div>
            <p style={{ fontFamily: F_COND, fontWeight: 700, fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>STAY CONNECTED</p>
            <p style={{ fontFamily: F_SANS, fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: "1rem" }}>Get updates on new projects, listings, drops and insights.</p>
            <div style={{ display: "flex" }}>
              <input type="email" placeholder="Enter your email" value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  flex: 1, background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)", borderRight: "none",
                  padding: "0.6rem 0.75rem",
                  fontFamily: F_SANS, fontSize: "0.72rem",
                  color: WHITE, outline: "none",
                }}
              />
              <button style={{
                background: WHITE, border: "none", padding: "0.6rem 0.9rem",
                cursor: "pointer", display: "flex", alignItems: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={BLACK} strokeWidth="2">
                  <line x1="2" y1="7" x2="12" y2="7" />
                  <polyline points="8,3 12,7 8,11" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          padding: "1.5rem 0",
          display: "flex", justifyContent: "center",
        }}>
          <p style={{ fontFamily: F_SANS, fontSize: "0.72rem", color: "rgba(255,255,255,0.25)" }}>
            © 2024 Hamza AM. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
