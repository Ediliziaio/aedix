import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(<App />);

// Signal prerenderer that app is ready for static rendering
if (typeof window !== "undefined" && process.env.PRERENDER_MODE) {
  window.dispatchEvent(new Event("app-rendered"));
}
