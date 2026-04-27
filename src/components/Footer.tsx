import { Link } from "react-router-dom";
import { Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import aedixLogo from "@/assets/aedix_logo.png";

const Footer = () => (
  <footer className="border-t border-[rgba(255,255,255,0.04)] pt-16 pb-8 px-6 lg:px-12">
    <div className="max-w-[1320px] mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <Link to="/">
            <img src={aedixLogo} alt="AEDIX" className="h-10 mb-4" />
          </Link>
          <p className="text-[14px] text-[rgba(255,255,255,0.5)] font-light leading-[1.7]">
            La tech company italiana che costruisce il futuro delle PMI con AI, SaaS e sistemi di vendita.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[3px] text-primary mb-6">Prodotto</h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/edilizia-in-cloud"
                className="text-[13px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
              >
                Edilizia in Cloud
              </Link>
            </li>
            <li>
              <a
                href="https://www.ediliziaincloud.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
              >
                ediliziaincloud.com ↗
              </a>
            </li>
            <li>
              <span className="text-[13px] text-[rgba(255,255,255,0.3)] italic">
                Altri prodotti — in arrivo
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[3px] text-primary mb-6">Azienda</h4>
          <ul className="space-y-3">
            {[
              { label: "Perché Noi?", to: "/perche-noi" },
              { label: "Servizi", to: "/servizi" },
              { label: "Edilizia in Cloud", to: "/edilizia-in-cloud" },
              { label: "Articoli", to: "/articoli" },
              { label: "Contatti", to: "/contatti" },
              { label: "Privacy", to: "/privacy" },
              { label: "Termini", to: "/termini" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-[13px] text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[3px] text-primary mb-6">Contatti</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-[13px] text-[rgba(255,255,255,0.5)]">
              <Mail size={14} className="text-primary/60" />
              info@aedix.io
            </li>
            <li className="flex items-center gap-2 text-[13px] text-[rgba(255,255,255,0.5)]">
              <MapPin size={14} className="text-primary/60" />
              Italia
            </li>
          </ul>
          <div className="flex gap-3 mt-6">
            {[
              { icon: <Linkedin size={18} />, href: "#" },
              { icon: <Instagram size={18} />, href: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-primary hover:border-primary/30 transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.04)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[12px] text-[rgba(255,255,255,0.2)] tracking-[1px]">
          © 2026 AEDIX — Domus Group S.r.l. — Tutti i diritti riservati
        </span>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-[11px] text-[rgba(255,255,255,0.15)] font-mono hover:text-[rgba(255,255,255,0.4)] transition-colors">Privacy</Link>
          <Link to="/termini" className="text-[11px] text-[rgba(255,255,255,0.15)] font-mono hover:text-[rgba(255,255,255,0.4)] transition-colors">Termini</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
