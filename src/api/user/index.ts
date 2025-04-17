import request from '@/utils/request'
import type { ResponseData, LoginForm, LoginResponseData } from './type'

enum API {
  regist_URL = '/user/regist',
  login_URL = '/user/login',
  logout_URL = '/user/logout/',
}

// 注册接口
export const reqRegist = (data: LoginForm) =>
  request.post<any, ResponseData>(API.regist_URL, data)
// 登录接口
export const reqLogin = (data: LoginForm) =>
  request.post<any, LoginResponseData>(API.login_URL, data)
// 退出登录接口
export const reqLogout = () => request.post<any, ResponseData>(API.logout_URL)
