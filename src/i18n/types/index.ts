// 支持的语言类型
export type Language = 'en' | 'zh-CN'

// 语言包类型定义（根据实际结构调整）
export type I18nMessages = {
  board: {
    category: {
      company: string
      department: string
      personal: string
    }
    level: {
      normal: string
      important: string
      urgent: string
    }
  }
  // 其他翻译字段...
}
