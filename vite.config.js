import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/starlife-movies/", // 👈 MUST MATCH REPO NAME
});
