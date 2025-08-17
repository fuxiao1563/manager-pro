const constantRoutes = [
  // 首页
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
  // 认证授权页
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '认证授权页',
      icon: 'admin',
      hidden: false,
    },
    children: [
      {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/views/auth/login/index.vue'),
        meta: {
          title: '登录页',
          icon: 'login',
          hidden: false,
        },
      },
      {
        path: '/auth/register',
        name: 'register',
        component: () => import('@/views/auth/register/index.vue'),
        meta: {
          title: '注册页',
          icon: 'register',
          hidden: false,
        },
      },
      {
        path: '/auth/authcode',
        name: 'authcode',
        component: () => import('@/views/auth/authcode/index.vue'),
        meta: {
          title: '验证登录页???',
          icon: 'authcode',
          hidden: false,
        },
      },
      {
        path: '/auth/reset',
        name: 'reset',
        component: () => import('@/views/auth/reset/index.vue'),
        meta: {
          title: '重置页???',
          icon: 'reset',
          hidden: false,
        },
      },
    ],
  },
  // 公告管理
  {
    path: '/notice',
    name: 'notice',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '公告管理',
      icon: 'notice',
      hidden: false,
    },
    children: [
      {
        path: '/notice/board',
        name: 'board',
        component: () => import('@/views/notice/board/index.vue'),
        meta: {
          title: '公告栏',
          icon: 'board',
          hidden: false,
        },
      },
      {
        path: '/notice/board-bin',
        name: 'board-bin',
        component: () => import('@/views/notice/board-bin/index.vue'),
        meta: {
          title: '回收站',
          icon: 'boardBin',
          hidden: false,
        },
      },
    ],
  },
  // 用户中心
  {
    path: '/user-center-layout',
    name: 'user-center-layout',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: 'user-center-layout',
      icon: 'home',
      hidden: false,
    },
    children: [
      {
        path: '/user-center',
        name: 'user-center',
        component: () => import('@/views/user-center/index.vue'),
        meta: {
          title: '用户中心',
          icon: 'userCenter',
          hidden: false,
        },
      },
    ],
  },
  // 系统管理
  {
    path: '/system',
    name: 'system',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '系统管理',
      icon: 'system',
      hidden: false,
    },
    children: [
      {
        path: '/system/company',
        name: 'company',
        component: () => import('@/views/system/company/index.vue'),
        meta: {
          title: '公司信息',
          icon: 'companyInfo',
          hidden: false,
        },
      },
      {
        path: '/system/user-manage',
        name: 'user-manage',
        component: () => import('@/views/system/user-manage/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'userManage',
          hidden: false,
        },
      },
      {
        path: '/system/role-manage',
        name: 'role-manage',
        component: () => import('@/views/system/role-manage/index.vue'),
        meta: {
          title: '角色管理?',
          icon: 'roleManage',
          hidden: false,
        },
      },
      {
        path: '/system/menu-manage',
        name: 'menu-manage',
        component: () => import('@/views/system/menu-manage/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'menuManage',
          hidden: false,
        },
      },
    ],
  },
  // 文件管理
  {
    path: '/file',
    name: 'file',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '文件管理',
      icon: 'file',
      hidden: false,
    },
    children: [
      {
        path: '/file/file-manage',
        name: 'file-manage',
        component: () => import('@/views/file/file-manage/index.vue'),
        meta: {
          title: '文件管理',
          icon: 'file',
          hidden: false,
        },
      },
    ],
  },
  // 日志管理
  {
    path: '/log',
    name: 'log',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '日志管理',
      icon: 'log',
      hidden: false,
    },
    children: [
      {
        path: '/log/ctrl-log',
        name: 'ctrl-log',
        component: () => import('@/views/log/ctrl-log/index.vue'),
        meta: {
          title: '操作日志？',
          icon: 'ctrLog',
          hidden: false,
        },
      },
      {
        path: '/log/login-log',
        name: 'login-log',
        component: () => import('@/views/log/login-log/index.vue'),
        meta: {
          title: '登录日志？',
          icon: 'loginLog',
          hidden: false,
        },
      },
    ],
  },
  // 文档
  {
    path: '/document',
    name: 'document',
    component: () => import('@/views/layout/index.vue'),
    meta: {
      title: '文档页',
      icon: 'document',
      hidden: false,
    },
    children: [
      {
        path: '/document/vue3',
        name: 'vue3',
        component: () => import('@/views/document/vue3/index.vue'),
        meta: {
          title: 'Vue 渐进式 JS 框架',
          icon: 'vue',
          hidden: false,
        },
      },
      {
        path: '/document/vite',
        name: 'vite3',
        component: () => import('@/views/document/vite3/index.vue'),
        meta: {
          title: 'Vite 下一代前端工具链',
          icon: 'vite',
          hidden: false,
        },
      },
      {
        path: '/document/pinia',
        name: 'pinia',
        component: () => import('@/views/document/pinia/index.vue'),
        meta: {
          title: 'Pinia 中文文档',
          icon: 'pinia',
          hidden: false,
        },
      },

      {
        path: '/document/axios',
        name: 'axios',
        component: () => import('@/views/document/axios/index.vue'),
        meta: {
          title: 'Axios 中文文档',
          icon: 'axios',
          hidden: false,
        },
      },
      {
        path: '/document/echarts',
        name: 'echarts',
        component: () => import('@/views/document/echarts/index.vue'),
        meta: {
          title: 'Apache ECharts',
          icon: 'echarts',
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
      // 敬请期待
      {
        path: '/error/forward',
        name: 'forward',
        component: () => import('@/views/error/forward/index.vue'),
        meta: {
          title: '敬请期待',
          icon: 'forward',
          hidden: false,
        },
      },
    ],
  },
  // 任意路由
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
