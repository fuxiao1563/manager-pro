import { i18n } from '@/i18n'
import { DEFAULT_LANGUAGE } from './config'
import type { Language } from './types'

// 设置当前语言
export const setLanguage = (lang: Language) => {
  i18n.global.locale.value = lang
  localStorage.setItem('lang', lang) // 持久化存储
}

// 获取当前语言
export const getCurrentLanguage = (): Language => {
  return i18n.global.locale.value as Language
}

// 初始化语言（从本地存储读取或使用默认）
export const initLanguage = () => {
  const savedLang = localStorage.getItem('lang') as Language | null
  setLanguage(savedLang || DEFAULT_LANGUAGE)
}
