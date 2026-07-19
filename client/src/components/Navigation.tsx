/* ============================================================
   Navigation — supports both dark (default) and light modes
   ============================================================ */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Companies", href: "/about" },
  { label: "Photography", href: "/re-photography" },
  { label: "Travelogue", href: "/travelogue" },
  { label: "Contact", href: "/about" },
];

interface NavigationProps {
  lightMode?: boolean;
}

export default function Navigation({ lightMode = false }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isLight = lightMode && !scrolled;
  const textColor = isLight ? "#111111" : "rgba(245,240,232,0.9)";
  const activeColor = isLight ? "#C8A96E" : "#C8A96E";
  const bgColor = scrolled
    ? (lightMode ? "rgba(255,255,255,0.97)" : "rgba(10,10,10,0.95)")
    : (lightMode ? "#FFFFFF" : "transparent");
  const borderColor = scrolled
    ? (lightMode ? "1px solid #E5E5E5" : "1px solid rgba(255,255,255,0.06)")
    : (lightMode ? "1px solid #E5E5E5" : "none");

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: bgColor,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: borderColor,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: "1rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: textColor,
                  transition: "color 0.3s",
                }}
              >
                HAMZA AM
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: isActive ? activeColor : textColor,
                    textDecoration: "none",
                    transition: "color 0.2s",
                    borderBottom: isActive ? `2px solid ${activeColor}` : "2px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <a
            href="/about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: isLight ? "#111111" : "#C8A96E",
              color: isLight ? "#FFFFFF" : "#111111",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.55rem 1.1rem",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            Let's Connect ↗
          </a>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              background: lightMode ? "#FFFFFF" : "#0A0A0A",
              borderTop: "1px solid #E5E5E5",
              padding: "1.5rem 2rem",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: "block",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: lightMode ? "#111" : "#F5F0E8",
                  textDecoration: "none",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #E5E5E5",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Spacer so content doesn't hide behind fixed nav */}
      <div style={{ height: "64px" }} />
    </>
  );
}
