import request from '@/utils/request'
import type { LoginForm, UserInfoResponseData, LoginResponseData } from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
// 登录接口
export const reqLogin = (data: LoginForm) =>
  request.post<LoginResponseData>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () =>
  request.get<UserInfoResponseData>(API.USERINFO_URL)
