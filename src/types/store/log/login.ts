// log - login 相关的类型
import type { log } from '@/types/domain/log/login'

// 认证授权
export interface loginLogState {
  logs: log[]
  searchParams: string
}
