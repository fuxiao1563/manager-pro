import { createApp } from 'vue'
import App from './App.vue'
// 引入全局样式
import './shared/assets/styles/index.scss'
// 引入国际化插件
import { i18n } from './plugins/i18n'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入路由
import router from './router'
// 引入svg-icon
// @ts-expect-error
import 'virtual:svg-icons-register'
// 引入组件库
import globalComponent from './shared/components/index.ts'
// 引入store
import pinia from './store'
import { zhCn } from 'element-plus/es/locales.mjs'
// 解决echarts中非被动事件监听警告，提升滚动性能
import 'default-passive-events'
// 注册并挂载应用
createApp(App)
  .use(router)
  .use(globalComponent)
  .use(pinia)
  .use(ElementPlus, { locale: zhCn })
  .use(i18n)
  .mount('#app')
