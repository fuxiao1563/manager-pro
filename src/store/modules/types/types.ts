import type { RouteRecordRaw } from 'vue-router'
import type {
  DetailUserInfoResponseData,
  SubDetailUserInfo,
} from '@/api/userManage/type'
import type { DetailUserCenterInfo } from '@/api/userCenter/type'
// 登录
export interface UserState {
  userInfo: {
    username: string
    role: string
  }
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
// 首页
export interface HomeState {
  userInfo: {
    username: string
    signature: string
  }
  avatar: string
}
// 用户中心
export interface UserCenterState {
  userInfo: DetailUserCenterInfo
  avatar: string
  token: string | null
}
// 用户管理
export interface ManageState {
  userInfoList: DetailUserInfoResponseData[]
  userInfo: SubDetailUserInfo
  total: number
  drawerSwitch: Boolean
  drawerTitle: string
  searchSwitch: Boolean
  searchFrom: {
    username: string
    role: string
    gender: string
    department: string
    phone: string
    email: string
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
// 公司信息
export interface CompanyInfoState {
  companyInfoList: {
    name: string
    address: string
    introduce: string
    department: string[]
  }
}
