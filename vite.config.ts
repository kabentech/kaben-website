import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load only VITE_ variables for the frontend build
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    define: {
      'process.env': JSON.stringify(env)
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path,
        },
      },
      port: 9000,
    },
    // Frontend dev server runs on 9000, backend API runs on 3000 via proxy.
    // build: {
    //   outDir: "../.local/vite/dist",
    //   assetsDir: "assets",
    //   sourcemap: true,
    //   manifest: true,
    //   rollupOptions: {
    //     output: {
    //       manualChunks: {
    //         react: ["react", "react-dom"],
    //       },
    //     },
    //   },
    // },
  };
});
