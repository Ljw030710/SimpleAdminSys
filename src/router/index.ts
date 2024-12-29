import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue'; // 确保路径正确
import loginPage from '@/views/loginPage.vue'; // 确保路径和文件名正确
import indexPage from "@/views/indexPage.vue";
import activityPage from "@/views/activityPage.vue";
const routes = [
    {
        path: '/',
        redirect: '/loginPage'
    },
    {
        path: '/loginPage', // 确保路径大小写正确
        name: 'loginPage',
        component: loginPage,
    },
    {
        path: '/indexPage',
        name: 'indexPage',
        component: indexPage,
        children: [
            {
                path: '/activityPage',
                name: '/activityPage',
                component: activityPage
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 history 模式
    routes,
});

export default router;
