import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入全局样式
import '@/styles/index.scss'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入路由
import router from './router'
// 引入svg-icon
// @ts-ignore
import 'virtual:svg-icons-register'
// 引入组件库
import globalComponent from './components/index.ts'
// 引入store
import pinia from './store'
import { zhCn } from 'element-plus/es/locales.mjs'
// 注册并挂载应用
createApp(App)
  .use(router)
  .use(globalComponent)
  .use(pinia)
  .use(ElementPlus, { locale: zhCn })
  .mount('#app')
