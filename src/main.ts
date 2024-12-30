import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由配置文件
import ElementPlus from 'element-plus'; // 引入 Element Plus
import 'element-plus/dist/index.css'; // 引入样式文件
import axios from 'axios';
import { createPinia } from 'pinia';  // 引入 Pinia

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 Pinia
const pinia = createPinia();
app.use(pinia);  // 注册 Pinia

// 使用其他插件
app.use(router); // 使用路由
app.use(ElementPlus); // 使用 Element Plus
app.config.globalProperties.$axios = axios;  // 配置 axios 为全局属性

// 挂载应用
app.mount('#app');
