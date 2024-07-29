import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // VueDevTools()
  ],
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    rollupOptions: {
      input: "index.html",
      output: {
        // 静态资源打包做处理
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/dev": {
        target: "http://127.0.0.1:8848",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/\/dev/, "");
        },
      },
      "^/devPro-api": {
        target: "http://1.94.146.141:8848",
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path)
          return path.replace(/^\/devPro-api/, "");
        },
      },
    },
    host: "127.0.0.1",
    port: 5173,
    open: true,
  },
});
