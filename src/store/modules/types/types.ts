import type { RouteRecordRaw } from 'vue-router'
import type {
  DetailUserInfoResponseData,
  SubDetailUserInfo,
} from '@/api/userManage/type'
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
  userInfo: SubDetailUserInfo
  total: number
  drawerSwitch: Boolean
  drawerTitle: string
  searchSwitch: Boolean
  searchFrom: {
    username: string
    gender: string
    phone: string
    email: string
    role: string
    status: string
    skip: number
    limit: number
  }
  deleteResults:
    | {
        _id: string
        username: string
      }[]
    | null
}
