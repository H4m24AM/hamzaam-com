/* ============================================================
   Footer — Brooklyn Meridian
   Dark bg, two-column: brand left, links right
   ============================================================ */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A0A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Ticker */}
      <div
        className="ticker-wrap py-3"
        style={{
          background: "#00FF41",
          color: "#0A0A0A",
        }}
      >
        <div className="ticker-content">
          {Array(4).fill(null).map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                fontWeight: 700,
                marginRight: "3rem",
              }}
            >
              [SIGNAL] HAMZA AM · BROOKLYN NYC · REAL ESTATE · PHOTOGRAPHY · STATEMENTS · LEGACY IN FOCUS · PURPOSE IN MOTION ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img
                src="/manus-storage/ham_logo_a126c577.png"
                alt="Hamza AM"
                className="h-10 w-10 object-contain"
              />
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#F5F0E8",
                }}
              >
                HAMZA AM
              </span>
            </Link>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(245,240,232,0.5)",
                lineHeight: 1.7,
                maxWidth: "260px",
              }}
            >
              Legacy in focus. Purpose in motion. Brooklyn-born. City-wide.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://realty.hamzaam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-signal"
                style={{ padding: "0.5rem 1rem", fontSize: "0.7rem" }}
              >
                Realty
              </a>
              <a
                href="https://shop.hamzaam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
                style={{ padding: "0.5rem 1rem", fontSize: "0.7rem" }}
              >
                Shop
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="section-label mb-6"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#00FF41" }}
            >
              Navigate
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "RE Photography", href: "/re-photography" },
                { label: "Travelogue", href: "/travelogue" },
                { label: "Merch", href: "/merch" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.6)",
                    transition: "color 200ms",
                  }}
                  className="hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p
              className="section-label mb-6"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#00FF41" }}
            >
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:6463394147"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(245,240,232,0.6)",
                  transition: "color 200ms",
                }}
                className="hover:text-white"
              >
                646.339.4147
              </a>
              <a
                href="mailto:hamza@landmarkelitehomes.com"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(245,240,232,0.6)",
                  transition: "color 200ms",
                }}
                className="hover:text-white"
              >
                hamza@landmarkelitehomes.com
              </a>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(245,240,232,0.4)",
                  marginTop: "0.5rem",
                }}
              >
                Landmark Elite Homes<br />
                Baldwin, NY · NYC
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between mt-16 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              color: "rgba(245,240,232,0.3)",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} Hamza Abdul-Mumit · All rights reserved
          </p>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              color: "rgba(0,255,65,0.4)",
              textTransform: "uppercase",
              marginTop: "0.5rem",
            }}
          >
            [SIGNAL ACTIVE] · 40.6782° N, 73.9442° W
          </p>
        </div>
      </div>
    </footer>
  );
}
