import { lazy, Suspense, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

const Contatti = lazy(() => import("./pages/Contatti.tsx"));
const PercheNoi = lazy(() => import("./pages/PercheNoi.tsx"));
const Servizi = lazy(() => import("./pages/Servizi.tsx"));
const EdiliziaInCloud = lazy(() => import("./pages/EdiliziaInCloud.tsx"));
const Articoli = lazy(() => import("./pages/Articoli.tsx"));
const ArticoloDettaglio = lazy(() => import("./pages/ArticoloDettaglio.tsx"));
const Metodo = lazy(() => import("./pages/Metodo.tsx"));
const Sicurezza = lazy(() => import("./pages/Sicurezza.tsx"));
const Grazie = lazy(() => import("./pages/Grazie.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Termini = lazy(() => import("./pages/Termini.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

// ─── Meta Pixel — eventi SPA ─────────────────────────────────
// Il base code in index.html spara il primo PageView; qui gestiamo le
// navigazioni client-side (che non ricaricano la pagina) e gli eventi
// per route: Lead su /grazie, ViewContent sulla pagina prodotto.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fbq = (...args: unknown[]) => (window as any).fbq?.(...args);

// Il pixel è condiviso tra tutti i siti del gruppo: ogni evento dichiara
// esplicitamente la provenienza, così in Events Manager si filtra per sito.
const PIXEL_SITE = "aedix.it";

const MetaPixelTracker = () => {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    // Il PageView iniziale è già tracciato dal base code in index.html
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      fbq("track", "PageView", { site: PIXEL_SITE });
    }

    if (pathname === "/grazie") {
      fbq("track", "Lead", { site: PIXEL_SITE, content_name: "Richiesta contatto AEDIX" });
    } else if (pathname === "/edilizia-in-cloud") {
      fbq("track", "ViewContent", { site: PIXEL_SITE, content_name: "Edilizia in Cloud", content_category: "Prodotto" });
    } else if (pathname === "/contatti") {
      fbq("track", "Contact", { site: PIXEL_SITE, content_name: "Pagina contatti AEDIX" });
    }
  }, [pathname]);

  return null;
};

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MetaPixelTracker />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="/perche-noi" element={<PercheNoi />} />
              <Route path="/servizi" element={<Servizi />} />
              <Route path="/edilizia-in-cloud" element={<EdiliziaInCloud />} />
              <Route path="/progetti" element={<Navigate to="/edilizia-in-cloud" replace />} />
              <Route path="/progetti/:slug" element={<Navigate to="/edilizia-in-cloud" replace />} />
              <Route path="/metodo" element={<Metodo />} />
              <Route path="/sicurezza" element={<Sicurezza />} />
              <Route path="/articoli" element={<Articoli />} />
              <Route path="/articoli/:slug" element={<ArticoloDettaglio />} />
              <Route path="/grazie" element={<Grazie />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termini" element={<Termini />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
