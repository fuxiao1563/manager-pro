// store - auth 相关的类型
import type { RouteRecordRaw } from 'vue-router'
import type { authLogin } from '@/types/domain/auth'

// 认证授权
export interface AuthState {
  authInfo: {
    username: string
    role: string
  }
  token: string | null
  code: authLogin
  menuRoutes: RouteRecordRaw[]
}
