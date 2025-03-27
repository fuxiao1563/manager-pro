import request from '@/utils/request'
import type { LoginForm, UserInfoResponseData } from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}
// 登录接口
export const reqLogin = (data: LoginForm) =>
  request.post<UserInfoResponseData>({
    url: API.LOGIN_URL,
    data,
  })
// 获取用户信息
export const reqUserInfo = () =>
  request<UserInfoResponseData>({
    url: API.USERINFO_URL,
    method: 'get',
  })
