import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './src/',
  mode: 'development', // change to 'production' when ready to deploy
  build: {
    minify: false,
    rollupOptions: {
      external: [
        '/node_modules/',
        '/src/',
      ]
    }
  }
})
