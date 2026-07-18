import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import aedixLogo from "@/assets/aedix_logo.png";

const navLinks = [
  { label: "Sistemi", to: "/servizi" },
  { label: "Edilizia in Cloud", to: "/edilizia-in-cloud" },
  { label: "Metodo", to: "/metodo" },
  { label: "Sicurezza", to: "/sicurezza" },
  { label: "Articoli", to: "/articoli" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-[rgba(255,255,255,0.04)]" : ""
      }`}
      style={{
        background: scrolled ? "rgba(10,19,34,0.85)" : "rgba(10,19,34,0.7)",
        backdropFilter: "blur(24px)",
      }}
    >
      <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-4 px-5 sm:px-6 lg:px-8 xl:px-12 py-[14px] sm:py-[18px]">
        <Link to="/" className="shrink-0">
          <img
            src={aedixLogo}
            alt="AEDIX"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-10 sm:h-12"}`}
          />
        </Link>

        {/* Nav desktop — solo da lg: sotto i 1024px i 5 link + CTA non ci stanno */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-9 min-w-0">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-mono text-[12px] xl:text-[13px] uppercase tracking-[1px] xl:tracking-[1.5px] whitespace-nowrap transition-colors relative ${
                location.pathname === l.to
                  ? "text-primary"
                  : "text-[rgba(255,255,255,0.7)] hover:text-white"
              }`}
            >
              {l.label}
              {location.pathname === l.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <Link
          to="/contatti"
          className="hidden lg:block shrink-0 whitespace-nowrap bg-primary text-primary-foreground font-bold text-[11px] xl:text-[12px] uppercase tracking-[1.5px] xl:tracking-[2px] px-5 xl:px-7 py-2.5 rounded-lg glow-btn hover:bg-primary/90 transition-all"
        >
          Prenota una demo
        </Link>

        <button
          className="lg:hidden text-white p-2 -mr-2"
          aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden px-6 pt-2 pb-10 flex flex-col border-t border-[rgba(255,255,255,0.06)] min-h-[calc(100dvh-70px)]"
          style={{ background: "rgba(10,19,34,0.99)", backdropFilter: "blur(24px)" }}
        >
          {navLinks.map((s) => {
            const active = location.pathname === s.to;
            return (
              <Link
                key={s.to}
                to={s.to}
                className={`flex items-center justify-between py-4 border-b border-[rgba(255,255,255,0.06)] font-mono text-[14px] uppercase tracking-[1.5px] transition-colors ${
                  active ? "text-primary" : "text-[rgba(255,255,255,0.85)] hover:text-white"
                }`}
              >
                {s.label}
                <ChevronRight size={16} className={active ? "text-primary" : "text-[rgba(255,255,255,0.3)]"} />
              </Link>
            );
          })}
          <Link
            to="/contatti"
            className="bg-primary text-primary-foreground font-bold text-[13px] uppercase tracking-[2px] px-6 py-4 mt-6 text-center rounded-lg glow-btn"
          >
            Prenota una demo
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
