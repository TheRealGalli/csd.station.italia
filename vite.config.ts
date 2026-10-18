import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  // versione delle demo OS: cambia a ogni build, così l'iframe non riusa la pagina in cache
  define: { __OS_VERSION__: JSON.stringify(Date.now().toString(36)) },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
