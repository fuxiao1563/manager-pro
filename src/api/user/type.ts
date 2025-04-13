//全部接口共有的ts类型
export interface ResponseData {
  code: number
  message: string
}
// 用户信息类型
export interface UserInfo {
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
// 登录接口携带的数据
export interface LoginForm {
  username: string
  password: string
}
// 登录接口返回的数据
export interface LoginResponseData extends ResponseData, UserInfo {
  token: string
  data: UserInfo
}
// 获取用户信息返回的接口
export interface UserInfoListResponseData extends ResponseData {
  data: UserInfo
}
// 删除用户的接口
export interface DeleteUserInfoResponseData extends ResponseData {
  data: UserInfo
}
