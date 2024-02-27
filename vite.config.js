import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    minify: false,
    rollupOptions: {
      input: {
        "loadingIndex": "src/additionalPages/loadingIndex.html",
        "errorIndex": "src/additionalPages/errorIndex.html",
        "index": "src/index.html"
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
