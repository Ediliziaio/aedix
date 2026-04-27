import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

const Contatti = lazy(() => import("./pages/Contatti.tsx"));
const PercheNoi = lazy(() => import("./pages/PercheNoi.tsx"));
const Servizi = lazy(() => import("./pages/Servizi.tsx"));
const Progetti = lazy(() => import("./pages/Progetti.tsx"));
const ProgettoDettaglio = lazy(() => import("./pages/ProgettoDettaglio.tsx"));
const Articoli = lazy(() => import("./pages/Articoli.tsx"));
const ArticoloDettaglio = lazy(() => import("./pages/ArticoloDettaglio.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Termini = lazy(() => import("./pages/Termini.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

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
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="/perche-noi" element={<PercheNoi />} />
              <Route path="/servizi" element={<Servizi />} />
              <Route path="/progetti" element={<Progetti />} />
              <Route path="/progetti/:slug" element={<ProgettoDettaglio />} />
              <Route path="/articoli" element={<Articoli />} />
              <Route path="/articoli/:slug" element={<ArticoloDettaglio />} />
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
