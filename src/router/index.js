import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRouterMap = [
    { path: '/', redirect: '/design', },
    { path: '/design', meta: { name: '装修页' }, component: () => import('../views/design/index.vue') },
    { path: '*', redirect: '/404', hidden: true }
]

// 路由实例
const router = new Router({
    routes: constantRouterMap,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    next();
});

export default router;

