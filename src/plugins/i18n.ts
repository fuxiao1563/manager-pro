import { createI18n } from 'vue-i18n'
import messages from '@/i18n/locales/index'

// 创建 i18n 实例
export const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'zh', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages,
})

// 导出 i18n 实例以便在其他文件中使用
export const i18nInstance = i18n.global
