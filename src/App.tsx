import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NfcPrivacyPolicy from "./pages/NfcPrivacyPolicy";
import NfcTermsOfService from "./pages/NfcTermsOfService";
import { CookiePolicy } from "./pages/CookiePolicy";
import { CookieBanner } from "./components/CookieBanner";

import { ScrollToTop } from "./components/ScrollToTop";
import { SiteModeProvider } from "./context/SiteModeContext";

const App = () => (
  <BrowserRouter>
    <SiteModeProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/nfc/privacy-policy" element={<NfcPrivacyPolicy />} />
        <Route path="/nfc/terms-of-service" element={<NfcTermsOfService />} />
        <Route path="/privacy-policy-nfc" element={<NfcPrivacyPolicy />} />
        <Route path="/terms-of-service-nfc" element={<NfcTermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
    </SiteModeProvider>
  </BrowserRouter>
);

export default App;
