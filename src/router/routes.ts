const constantRoutes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/layout/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'House',
          hidden: false,
        },
      },
    ],
  },
  // 数据大屏
  {
    path: '/banner',
    name: 'banner',
    component: () => import('@/views/banner/index.vue'),
    meta: {
      title: '数据大屏',
      icon: 'DataAnalysis',
      hidden: false,
    },
  },
  // 用户页
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '用户页',
      icon: 'Key',
      hidden: false,
    },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '登录页',
          icon: 'Key',
          hidden: false,
        },
      },
    ],
  },
  // 异常页
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '异常页',
      icon: 'Bell',
      hidden: false,
    },
    children: [
      {
        path: '/error/403',
        name: '403',
        component: () => import('@/views/error/403/index.vue'),
        meta: {
          title: '403',
          icon: 'Bell',
          hidden: false,
        },
      },
      {
        path: '/error/404',
        name: '404',
        component: () => import('@/views/error/404/index.vue'),
        meta: {
          title: '404',
          icon: 'Bell',
          hidden: false,
        },
      },
      {
        path: '/error/500',
        name: '500',
        component: () => import('@/views/error/500/index.vue'),
        meta: {
          title: '500',
          icon: 'Bell',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
]
export default constantRoutes
