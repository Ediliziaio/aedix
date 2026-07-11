// Entry SSR per il prerendering statico (scripts/prerender.mjs).
// Route table con import STATICI (React.lazy non è supportato da renderToString):
// tenere allineata a src/App.tsx quando si aggiungono route.
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StaticRouter } from "react-router-dom/server";
import { Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import Contatti from "./pages/Contatti.tsx";
import PercheNoi from "./pages/PercheNoi.tsx";
import Servizi from "./pages/Servizi.tsx";
import EdiliziaInCloud from "./pages/EdiliziaInCloud.tsx";
import Articoli from "./pages/Articoli.tsx";
import ArticoloDettaglio from "./pages/ArticoloDettaglio.tsx";
import Metodo from "./pages/Metodo.tsx";
import Sicurezza from "./pages/Sicurezza.tsx";
import Privacy from "./pages/Privacy.tsx";
import Termini from "./pages/Termini.tsx";
import NotFound from "./pages/NotFound.tsx";

export function render(url: string): { appHtml: string; helmet: HelmetServerState } {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const queryClient = new QueryClient();

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
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
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termini" element={<Termini />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return { appHtml, helmet: helmetContext.helmet! };
}
