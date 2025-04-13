import type { RouteRecordRaw } from 'vue-router'
export interface UserState {
  userInfo: {
    _id: string
    username: string
    password: string
    phone: string
    gender: string
    email: string
    role: string
    avatar: string
    status: string
    signature: string
  }
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
