import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Ignite-ReactJS-Desafio-01-Praticando-os-conceitos-do-ReactJS',
  server: {
    port: 8080,
    host: true
  }
})
