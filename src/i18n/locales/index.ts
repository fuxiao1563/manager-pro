import type { I18nMessages } from '../types'

// 自动导入所有语言包
const messages = import.meta.glob('./*/index.ts', { eager: true }) as Record<
  string,
  { default: I18nMessages }
>

export default Object.entries(messages).reduce(
  (acc, [path, module]) => ({
    ...acc,
    [path.split('/')[1]]: module.default, // 提取目录名作为语言代码
  }),
  {} as Record<string, I18nMessages>,
)
