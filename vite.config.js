import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  server : {
    host: "0.0.0.0",
    port: "5173"
  },
  plugins: [
    tailwindcss(),
    react()
  ],
  envPrefix: 'YUBI_',
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
})
