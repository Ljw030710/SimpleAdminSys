import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由配置文件
import ElementPlus from 'element-plus'; // 引入 Element Plus
import 'element-plus/dist/index.css'; // 引入样式文件
import Mock from 'mockjs';
import './mock/login.js'
import './mock/activities.js'
import axios from "axios";
// 创建 Vue 应用实例
const app = createApp(App);

app.use(router); // 使用路由
app.use(ElementPlus); // 使用 Element Plus
app.config.globalProperties.$axios = axios;
app.mount('#app'); // 挂载应用
