import request from '@/utils/request'
import type {
  ResponseData,
  LoginForm,
  LoginResponseData,
  UserInfoListResponseData,
  UserInfo,
  DeleteUserInfoResponseData,
} from './type'

enum API {
  regist_URL = '/user/regist',
  login_URL = '/user/login',
  logout_URL = '/user/logout/',
  userInfo_URL = '/userCenter/userInfo/',
  updataUserInfo_URL = '/userCenter/updataUserInfo',
  userInfoList_URL = '/manage/userInfoList',
  deleteUserInfo_URL = '/manage/deleteUserInfo/',
  deleteUserInfoList_URL = '/manage/deleteUserInfoList',
  addUserInfo_URL = '/manage/addUserInfo',
}

// 注册接口
export const reqRegist = (data: LoginForm) =>
  request.post<any, ResponseData>(API.regist_URL, data)
// 登录接口
export const reqLogin = (data: LoginForm) =>
  request.post<any, LoginResponseData>(API.login_URL, data)
// 退出登录接口
export const reqLogout = (username: string) =>
  request.post<any, ResponseData>(API.logout_URL + username)
// 获取用户信息接口
export const reqUserInfo = (username: string) =>
  request.get<any, UserInfoListResponseData>(API.userInfo_URL + username)
// 修改用户信息接口
export const reqUpdateUserInfo = (data: UserInfo) =>
  request.patch<any, ResponseData>(API.updataUserInfo_URL, data)
// 用户管理接口
export const reqUserInfoList = (data: any) =>
  request.post<any, any>(API.userInfoList_URL, data)
// 删除用户接口
export const reqDeleteUserInfo = (_id: string) =>
  request.delete<any, DeleteUserInfoResponseData>(API.deleteUserInfo_URL + _id)
// 添加用户接口
export const reqAddUserInfo = (data: UserInfo) =>
  request.post<any, any>(API.addUserInfo_URL, data)
