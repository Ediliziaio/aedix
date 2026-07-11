import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: process.env.PORT ? Number(process.env.PORT) : 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // Pacchetti CJS da bundlare nel build SSR: lasciati "external",
    // Node ESM non riesce a estrarne i named export.
    noExternal: ["react-helmet-async"],
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks solo per il build client: nel build SSR react è
        // "external" e i chunk manuali farebbero fallire rollup.
        manualChunks: isSsrBuild ? undefined : {
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
