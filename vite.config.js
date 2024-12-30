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
  server: {
    proxy: {
      '/a': {
        target: 'http://192.168.123.49:8000',  // 后端接口地址
        changeOrigin: true,  // 是否更改请求头中的 Host 字段
      },
    },
  },
});
