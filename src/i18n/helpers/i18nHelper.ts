import { useI18n } from 'vue-i18n'
import type { Language } from '../types'

export const getCategoryName = (value: number) => {
  const { t } = useI18n()
  const map: Record<number, string> = {
    1: 'board.category.company',
    2: 'board.category.department',
    3: 'board.category.personal',
  }
  return t(map[value])
}

// 新增：获取支持的语言列表
export const getSupportedLanguages = (): Language[] => {
  return ['en', 'zh-CN'] // 或从config导入
}
