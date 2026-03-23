// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-svgo'
  ],

  svgo: {
    autoImportPath: "./assets/icons"
  },
pwa: {
    registerType: "autoUpdate",
    devOptions: {
      enabled: true,
      type: 'classic'
    },
    manifest: {
      name: 'accounts-manager',
      short_name: 'AManager',
      description: 'Offline account manager',
      display: 'standalone',
      start_url: '/', // Required by Chrome
      theme_color: '#ffffff', // Required by Chrome
      background_color: '#ffffff', // Highly recommended
      icons: [
        {
          src: 'pwa-192x192.png', 
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },

        {
          src: 'pwa-512x512.png', 
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      globPatterns: process.env.NODE_ENV === 'development' ? [] : ['**/*.{js,css,html,png,svg,ico,mjs}'],
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  ssr: false
})