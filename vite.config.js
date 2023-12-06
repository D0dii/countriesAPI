import { defineConfig } from "vite";

export default defineConfig({
  build: {
    assetsDir: "public",
    rollupOptions: {
      input: {
        main: "index.html",
        details: "details.html",
      },
    },
  },
});
