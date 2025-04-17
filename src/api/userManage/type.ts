//全部接口共有的ts类型
export interface ResponseData {
  code: number
  message: string
}
// 返回的完整用户信息类型
export interface DetailUserInfoResponseData {
  _id: string
  username: string
  role: string
  status: string
  avatar: string
  phone: string
  email: string
  gender: string
  signature: string
}
// 提交的完整用户信息类型
export interface SubDetailUserInfo {
  username: string
  role: string
  status: string
  avatar: string
  phone: string
  email: string
  gender: string
}

// 登录接口携带的数据
export interface LoginForm {
  username: string
  password: string
}
// 登录接口返回的数据
export interface LoginResponseData extends ResponseData {
  token: string
  data: {
    username: string
    role: string
  }
}

// 获取用户中心返回的数据
export interface UserCenterInfoResponseData extends ResponseData {
  data: DetailUserInfoResponseData
}
// 修改用户信息需提交的数据????????????????
export interface SubUserCenterInfo {
  username: string
  phone: string
  email: string
  gender: string
  role: string
  avatar: string
}
// 修改用户信息返回的数据
export interface UserCenterInfoResponseData extends ResponseData {
  token: string
}
// 修改用户密码提交的数据
export interface SubUserCenterPassword {
  oldPassword: string
  newPassword: string
}

// 用户管理所需提交的数据
export interface SubUserManageInfoList {
  skip: number
  limit: number
}
// 用户管理返回的数据
export interface UserManageInfoListResponseData extends ResponseData {
  data: {
    total: number
    userInfoList: DetailUserInfoResponseData[]
  }
}
// 修改用户所需提交的数据
export interface SubUserManageUpdataUserInfo extends SubDetailUserInfo {
  _id: string
}
// 批量删除用户所需提交的数据
export interface SubUserManageDeleteUserInfoList {
  _id: string
}
// 批量删除用户返回的数据
export interface UserManageDeleteUserInfoListResponseData extends ResponseData {
  data:
    | {
        _id: string
        username: string
      }[]
    | null
}
