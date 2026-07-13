// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: "/livro-conquista/",
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   base: "/livro-conquista/",
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const electronBuild = process.env.ELECTRON_BUILD === 'true'
const pagesProdBase = '/ficha-atividade-main/'

// https://vite.dev/config/
// - GitHub Pages: base /livro-bett/
// - Executável Electron (offline): base / (servido em localhost)
export default defineConfig({
  plugins: [react()],
  base:
    electronBuild ? '/' : process.env.NODE_ENV === 'production' ? pagesProdBase : '/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist',
  },
})
