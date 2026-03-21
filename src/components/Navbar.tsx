import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import aedixLogo from "@/assets/aedix_logo.png";

const navLinks = [
  { label: "Cosa Facciamo", to: "/servizi" },
  { label: "Progetti", to: "/progetti" },
  { label: "Perché Noi?", to: "/perche-noi" },
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
      <div className="max-w-[1320px] mx-auto flex items-center justify-between px-6 lg:px-12 py-[18px]">
        <Link to="/">
          <motion.img
            src={aedixLogo}
            alt="AEDIX"
            className="h-12"
            animate={{ height: scrolled ? 36 : 48 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-mono text-[13px] uppercase tracking-[1.5px] transition-colors relative ${
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
          className="hidden md:block bg-primary text-primary-foreground font-bold text-[12px] uppercase tracking-[2px] px-6 py-2.5 hover:bg-white transition-colors"
        >
          Contattaci
        </Link>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(10,19,34,0.95)" }}
        >
          {navLinks.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="font-mono text-[13px] uppercase tracking-[1.5px] text-[rgba(255,255,255,0.7)] hover:text-white text-left"
            >
              {s.label}
            </Link>
          ))}
          <Link
            to="/contatti"
            className="bg-primary text-primary-foreground font-bold text-[12px] uppercase tracking-[2px] px-6 py-2.5 mt-2 text-center"
          >
            Contattaci
          </Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
