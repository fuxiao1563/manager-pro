import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 引入全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入svg-icon
// @ts-ignore
import 'virtual:svg-icons-register'
import globalComponent from '@/components/index.ts'

// 注册并挂载应用
createApp(App).use(router).use(globalComponent).mount('#app')
