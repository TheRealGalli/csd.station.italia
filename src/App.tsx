import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OsDemo from "./components/station/OsDemo";
import Legal from "./pages/Legal";
import { ScrollToTop } from "./components/ScrollToTop";
import { RouteSeo } from "./seo/RouteSeo";
import { SiteModeProvider } from "./context/SiteModeContext";

export const AppContent = () => (
    <SiteModeProvider>
      <RouteSeo />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/card-nfc/" element={<Index />} />
        <Route path="/training-ai/" element={<Index />} />
        <Route path="/sito-social/" element={<Index />} />
        <Route path="/video-slide/" element={<Index />} />
        <Route path="/restaurant-os/" element={<OsDemo product="restaurant" />} />
        <Route path="/notaro-os/" element={<OsDemo product="notaro" />} />
        {/* Privacy e Termini: i vecchi indirizzi aprono la stessa pagina alla sezione giusta */}
        <Route path="/privacy-policy" element={<Legal doc="privacy" />} />
        <Route path="/terms-of-service" element={<Legal doc="termini" />} />
        <Route path="/nfc/privacy-policy" element={<Legal doc="privacy" />} />
        <Route path="/nfc/terms-of-service" element={<Legal doc="termini" />} />
        <Route path="/privacy-policy-nfc" element={<Legal doc="privacy" />} />
        <Route path="/terms-of-service-nfc" element={<Legal doc="termini" />} />
        <Route path="/cookie-policy" element={<Legal doc="privacy" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteModeProvider>
);

const App = () => <BrowserRouter><AppContent /></BrowserRouter>;

export default App;
