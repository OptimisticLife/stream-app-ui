import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  // const isDev = mode === "development";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "https://stream-app-server-auj8.onrender.com", // Your Node proxy server
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
  // {
  //   plugins: [react()],
  //   server: {
  //     proxy: {
  //       "/api": {
  //         target: isDev
  //           ? "http://localhost:4647"
  //           : "https://stream-app-server-auj8.onrender.com", // Your Node proxy server
  //         changeOrigin: true,
  //         rewrite: (path) => path.replace(/^\/api/, ""),
  //       },
  //     },
  //   },
  // };
});
// import.meta.env.DEV
