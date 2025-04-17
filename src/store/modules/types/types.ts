import type { RouteRecordRaw } from 'vue-router'
import type { DetailUserInfoResponseData } from '@/api/user/type'
export interface UserState {
  userInfo: {
    username: string
    role: string
  }
  token: string | null
  menuRoutes: RouteRecordRaw[]
}

export interface HomeState {
  userInfo: {
    username: string
    avatar: string
    signature: string
  }
}

export interface UserCenterState {
  userInfo: DetailUserInfoResponseData
  token: string | null
}

export interface ManageState {
  userInfoList: DetailUserInfoResponseData[]
  deleteResults:
    | {
        _id: string
        username: string
      }[]
    | null
  total: number
  drawerSwitch: Boolean
}
