// store - auth 相关的类型
import type { RouteRecordRaw } from 'vue-router'

// 认证授权
export interface AuthState {
  authInfo: {
    username: string
    role: string
  }
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
