import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');

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
        "/api/v1": {
          target: "http://localhost:9001/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, ""),
        },
      },
      port: 9000,
    },
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
