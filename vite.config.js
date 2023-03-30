import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 支持解析其他类型的文件
  assetsInclude: ["**/*.hdr", "**/*.glb", "**/*.gltf"],
});
