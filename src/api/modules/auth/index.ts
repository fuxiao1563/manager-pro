import request from '@/shared/utils/request'
import type { LoginReq, LoginRes } from '@/types/api/auth'

enum API {
  login_URL = '/auth/login',
  register_URL = '/auth/register',
  logout_URL = '/auth/logout/',
}

// 登录接口
export const reqLogin = (data: LoginReq) =>
  request.post<any, LoginRes>(API.login_URL, data)
// 注册接口
export const reqRegister = (data: LoginReq) =>
  request.post<any, any>(API.register_URL, data)
// 退出登录接口
export const reqLogout = () => request.post<any, any>(API.logout_URL)
