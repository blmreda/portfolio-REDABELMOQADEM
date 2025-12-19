import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // IMPORTANT: '/' pour Vercel
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  // Optionnel: proxy pour développement local
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5002', // Votre backend local
        changeOrigin: true,
      }
    }
  }
})