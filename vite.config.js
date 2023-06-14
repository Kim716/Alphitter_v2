import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react(), jsconfigPaths()],
  base: "/Alphitter_v2/",
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
