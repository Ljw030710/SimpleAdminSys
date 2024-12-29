import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置 @ 别名
    },
  },
});
