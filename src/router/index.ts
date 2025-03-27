import { createRouter, createWebHashHistory } from 'vue-router'
// import constantRoutes from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue'),
      name: 'home',
    },
    {
      path: '/login',
      component: () => import('../views/login.vue'),
      name: 'login',
    },
  ],
})
export default router
