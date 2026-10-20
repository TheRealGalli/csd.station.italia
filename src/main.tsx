import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { canonicalNavigation } from "./seo/routes";
// font ospitato sul sito: nessuna richiesta a server di terze parti durante la navigazione
import "@fontsource-variable/inter";
import "./index.css";

const destination = canonicalNavigation(location.pathname, location.search, location.hash);
if (destination) {
  location.replace(destination);
} else {
  const root = document.getElementById("root")!;
  if (root.dataset.prerendered === 'true') hydrateRoot(root, <App />);
  else createRoot(root).render(<App />);
}
