import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',  // Define the alias for the src folder
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
})
