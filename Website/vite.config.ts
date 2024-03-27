import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  root: "app",
  // base: "/static/",
  build: {
    manifest: true,
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "app/src/main.tsx",
      },
      output: {
        chunkFileNames: "chunks/[name].js",
        assetFileNames: "assets/[name].[ext]",
        entryFileNames: "assets/[name].js",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
