import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'BerryStore Premium',
        short_name: 'BerryStore',
        theme_color: '#0056b3',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        screenshots: [
          {
            "src": "screenshot-desktop.png",
            "sizes": "1899x908",
            "type": "image/png",
            "form_factor": "wide"
          },
          {
            "src": "screenshot-mobile.png",
            "sizes": "441x803",
            "type": "image/png",
            "form_factor": "narrow"
          }
        ],
        
      }
    })
  ]
})