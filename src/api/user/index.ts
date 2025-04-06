import request from '@/utils/request'
import type { LoginForm, UserInfoResponseData, LoginResponseData } from './type'

enum API {
  login_URL = '/user/login',
  // USERINFO_URL = '/user/info',

  UserInfoList_URL = '/manage/userInfoList',
}
// admin
// login
// 登录接口
export const reqLogin = (data: LoginForm) =>
  request.post<any, LoginResponseData>(API.login_URL, data)
// 获取用户信息
// export const reqUserInfo = () =>
//   request.get<any, UserInfoResponseData>(API.USERINFO_URL)

// manage
// userManage
// 获取用户信息列表
export const reqUserInfoList = () => request.get<any, any>(API.UserInfoList_URL)
