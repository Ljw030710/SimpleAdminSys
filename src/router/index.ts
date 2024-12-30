import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue'; // 确保路径正确
import loginPage from '@/views/loginPage.vue'; // 确保路径和文件名正确
import indexPage from "@/views/indexPage.vue";
import activityPage from "../views/activityPage.vue";
import activityAdd from "../views/activityAdd.vue";
import activityUpdate from "../views/activityUpdate.vue";
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
    },
    {
        path: '/activityPage',
        name: 'activityPage',
        component: activityPage,
    },
    {
        path:'/activityDetail',
        name: 'activityDetail',
        component: () => import('@/components/More.vue')
    },
    {
        path: '/activityAdd',
        name: 'activityAdd',
        component: activityAdd,
    },
    {
        path: '/activityUpdate',
        name: 'activityUpdate',
        component: activityUpdate,
    }
];

const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 history 模式
    routes,
});

export default router;
