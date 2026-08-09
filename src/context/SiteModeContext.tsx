import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export type SiteMode = "automazioni" | "nfc";

interface SiteModeContextType {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  toggleMode: () => void;
}

const SiteModeContext = createContext<SiteModeContextType | undefined>(undefined);

export const SiteModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setModeState] = useState<SiteMode>(() => {
    const params = new URLSearchParams(location.search);
    const modeParam = params.get("mode");
    if (modeParam === "nfc" || modeParam === "automazioni") {
      return modeParam;
    }
    return "automazioni";
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const modeParam = params.get("mode");
    if (modeParam === "nfc" || modeParam === "automazioni") {
      if (modeParam !== mode) {
        setModeState(modeParam);
      }
    }
  }, [location.search]);

  const setMode = (newMode: SiteMode) => {
    setModeState(newMode);
    const params = new URLSearchParams(location.search);
    params.set("mode", newMode);
    navigate({ search: params.toString() }, { replace: true });
  };

  const toggleMode = () => {
    setMode(mode === "automazioni" ? "nfc" : "automazioni");
  };

  return (
    <SiteModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </SiteModeContext.Provider>
  );
};

export const useSiteMode = (): SiteModeContextType => {
  const context = useContext(SiteModeContext);
  if (!context) {
    throw new Error("useSiteMode must be used within a SiteModeProvider");
  }
  return context;
};
