const constantRoutes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: 'layout',
      icon: 'home',
      use: true,
      hidden: false,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/layout/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'home',
          hidden: false,
        },
      },
    ],
  },
  // 用户页
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '用户页',
      icon: 'admin',
      hidden: false,
    },
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '登录页',
          icon: 'login',
          hidden: false,
        },
      },
      {
        path: '/user/regist',
        name: 'regist',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '注册页？',
          icon: 'regist',
          hidden: false,
        },
      },
    ],
  },
  // 系统管理
  {
    path: '/manage',
    name: 'manage',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '系统管理',
      icon: 'manage',
      hidden: false,
    },
    children: [
      {
        path: '/manage/userManage',
        name: 'userManage',
        component: () => import('@/views/manage/userManage/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'userManage',
          hidden: false,
        },
      },
      {
        path: '/manage/roleManage',
        name: 'roleManage',
        component: () => import('@/views/manage/roleManage/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'roleManage',
          hidden: false,
        },
      },
      {
        path: '/manage/menuManage',
        name: 'menuManage',
        component: () => import('@/views/manage/menuManage/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'menuManage',
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
      icon: 'error',
      hidden: false,
    },
    children: [
      {
        path: '/error/403',
        name: '403',
        component: () => import('@/views/error/403/index.vue'),
        meta: {
          title: '403',
          icon: '403',
          hidden: false,
        },
      },
      {
        path: '/error/404',
        name: '404',
        component: () => import('@/views/error/404/index.vue'),
        meta: {
          title: '404',
          icon: '404',
          hidden: false,
        },
      },
      {
        path: '/error/500',
        name: '500',
        component: () => import('@/views/error/500/index.vue'),
        meta: {
          title: '500',
          icon: '500',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/error/404',
    meta: {
      title: 'any',
      hidden: true,
    },
  },
]
export default constantRoutes
