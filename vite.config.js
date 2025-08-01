import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    // --- Update the sitemap configuration to be more explicit ---
    sitemap({
      hostname: "https://motobandit.net",
      // This explicitly tells the plugin about all the pages on your site.
      dynamicRoutes: [
        "/", // Your homepage
        "/shop", // Your shop page
        "/music", // Your music page
        "/videos", // Your videos page
        "/unlock",
        "/about",
        "/contact", // Your contact page
      ],
    }),
  ],
});
