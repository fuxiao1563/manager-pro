import type { RouteRecordRaw } from 'vue-router'
import type {
  DetailUserInfoResponseData,
  SubDetailUserInfo,
} from '@/api/userManage/type'
import type { DetailUserCenterInfo } from '@/api/userCenter/type'
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
    signature: string
  }
  avatar: string
}

export interface UserCenterState {
  userInfo: DetailUserCenterInfo
  avatar: string
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
