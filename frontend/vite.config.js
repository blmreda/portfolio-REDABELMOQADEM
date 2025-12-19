import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // CRITIQUE: '/' et non './'
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})