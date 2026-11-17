import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // Slidev's bundled code.css expands to a rule lightningcss rejects; skip minification
    cssMinify: false,
  },
})
