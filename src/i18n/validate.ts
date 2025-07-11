import messages from './locales'
import type { I18nMessages } from './types'

const validateKeys = (
  base: I18nMessages,
  target: I18nMessages,
  path: string[] = [],
) => {
  Object.keys(base).forEach((key) => {
    const currentPath = [...path, key]
    if (!(key in target)) {
      console.warn(`Missing key: ${currentPath.join('.')}`)
      return
    }

    if (
      typeof (base as any)[key] === 'object' &&
      typeof (target as any)[key] === 'object'
    ) {
      validateKeys(
        (base as any)[key] as any,
        (target as any)[key] as any,
        currentPath,
      )
    }
  })
}

// 开发环境验证
if (import.meta.env.DEV) {
  const languages = Object.values(messages)
  for (let i = 1; i < languages.length; i++) {
    validateKeys(languages[0], languages[i])
  }
}
