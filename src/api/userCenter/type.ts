//全部接口共有的ts类型
export interface ResponseData {
  code: number
  message: string
}
// 完整用户信息类型
export interface DetailUserCenterInfo {
  _id: string
  username: string
  phone: string
  email: string
  gender: string
  status: string
  signature: string
}

// 获取用户中心返回的数据
export interface UserCenterInfoResponseData extends ResponseData {
  data: DetailUserCenterInfo
}
// 修改用户信息返回的数据
export interface UpdataUserCenterInfoResponseData extends ResponseData {
  token: string
}
// 修改用户密码提交的数据
export interface SubUserCenterPassword {
  oldPassword: string
  newPassword: string
}
