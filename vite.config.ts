import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import PrerenderSpaPlugin from "prerender-spa-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    command === "build" && new PrerenderSpaPlugin({
      staticDir: path.resolve(__dirname, "dist"),
      routes: [
        "/",
        "/perche-noi",
        "/servizi",
        "/edilizia-in-cloud",
        "/articoli",
        "/articoli/ai-pmi-italiane-2025",
        "/articoli/automazione-processi-aziendali",
        "/articoli/marketing-performance-edilizia",
        "/articoli/agenti-ai-vs-chatbot",
        "/articoli/errori-pmi-digitale",
        "/articoli/roi-intelligenza-artificiale",
        "/articoli/saas-verticale-vs-generico",
        "/articoli/futuro-lavoro-ai-automazione",
        "/articoli/gdpr-ai-pmi-italiane-guida-2026",
        "/articoli/whatsapp-business-ai-pmi-italiane",
        "/articoli/ai-generativa-pmi-italiane-2026",
        "/articoli/come-scegliere-fornitore-ai-pmi-italiana",
        "/articoli/ai-act-2026-pmi-italiane-cosa-cambia",
        "/articoli/quanto-costa-ai-pmi-italiana-guida-2026",
        "/articoli/perche-le-pmi-italiane-hanno-paura-dellai",
        "/articoli/5-processi-pmi-italiana-automatizzare-oggi",
        "/articoli/agenti-ai-per-pmi-cosa-sono-e-come-usarli",
        "/contatti",
        "/privacy",
        "/termini",
      ],
      renderer: new (require("@prerenderer/renderer-jsdom"))({
        headless: true,
        renderAfterDocumentEvent: "app-rendered",
      }),
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion": ["framer-motion"],
          "radix": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
          "icons": ["lucide-react"],
          "forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "query": ["@tanstack/react-query"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
