import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Contatti from "./pages/Contatti.tsx";
import PercheNoi from "./pages/PercheNoi.tsx";
import Servizi from "./pages/Servizi.tsx";
import Progetti from "./pages/Progetti.tsx";
import ProgettoDettaglio from "./pages/ProgettoDettaglio.tsx";
import Privacy from "./pages/Privacy.tsx";
import Termini from "./pages/Termini.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/perche-noi" element={<PercheNoi />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/progetti" element={<Progetti />} />
          <Route path="/progetti/:slug" element={<ProgettoDettaglio />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/termini" element={<Termini />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
