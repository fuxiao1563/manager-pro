import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  userInfo: {
    username: string
    password: string
    phone: string
    gender: string
    email: string
    role: string
    avatar: string
    status: string
  }
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
