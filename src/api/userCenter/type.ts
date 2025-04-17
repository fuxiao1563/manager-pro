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
