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
    devOptions: {
      enabled: true,
      type: 'classic'
    },
    manifest: {
      name: 'accounts-manager',
      short_name: 'AManager',
      display: 'standalone',
      icons: [
        {
          src: 'icons/icons1.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any'
        },
        {
          src: 'icons/icons1.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'maskable'
        },
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  ssr: false
})

  // pwa: {
  //   manifest: {
  //     name: 'My Vault',
  //     short_name: 'Vault',
  //     description: 'Offline account manager',
  //     theme_color: '#ffffff',
  //     icons: [
  //       {
  //         src: 'pwa-192x192.png', // You'll need to drop a 192x192 logo in your public/ folder
  //         sizes: '192x192',
  //         type: 'image/png'
  //       },
  //       {
  //         src: 'pwa-512x512.png', // And a 512x512 logo in your public/ folder
  //         sizes: '512x512',
  //         type: 'image/png'
  //       }
  //     ]
  //   },
  //   workbox: {
  //     navigateFallback: '/',
  //     globPatterns: ['**/*.{js,css,html,png,svg,ico}']
  //   },
  //   devOptions: {
  //     enabled: true,
  //     type: 'module'
  //   }
  // }