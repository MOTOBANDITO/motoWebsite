import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sitemap } from 'vite-plugin-sitemap'; // <-- Import the plugin

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),
    sitemap({ hostname: 'https://motobandit.net',
      dynamicRoutes: [
        '/',          // Your homepage
        '/shop',      // Your shop page
        '/music',     // Your music page
        '/videos',    // Your videos page
        '/unlock',    // Your unlock song page
        '/contact',   // Your contact page
      ],
    })
  ],
})
