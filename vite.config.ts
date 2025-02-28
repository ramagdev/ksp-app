import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'docs', // Folder output build
    emptyOutDir: true, // Bersihkan folder dist sebelum build
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom', 'react-router','react-transition-group'],
          vendor: ['dexie', 'lodash', '@tanstack/react-table','@tanstack/react-query'],
          recharts: ['recharts'],
        },
      },
    },
  },
  base: './',
})
