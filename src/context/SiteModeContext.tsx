import React, { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getServiceMode, servicePaths, type ServiceMode } from "@/seo/routes";

export type SiteMode = ServiceMode;
interface SiteModeContextType {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  toggleMode: () => void;
}
const SiteModeContext = createContext<SiteModeContextType | undefined>(undefined);
export const SiteModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = getServiceMode(location.pathname, location.search);
  const setMode = (newMode: SiteMode) => navigate(servicePaths[newMode]);
  return <SiteModeContext.Provider value={{ mode, setMode, toggleMode: () => setMode(mode === 'automazioni' ? 'nfc' : 'automazioni') }}>{children}</SiteModeContext.Provider>;
};
export const useSiteMode = (): SiteModeContextType => {
  const context = useContext(SiteModeContext);
  if (!context) throw new Error("useSiteMode must be used within a SiteModeProvider");
  return context;
};
