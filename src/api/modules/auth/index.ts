import request from '@/shared/utils/request'
import type { LoginReq, LoginRes, SendCodeRes } from '@/types/api/auth'
import type { AuthLogin, ForgetPassword } from '@/types/domain/auth'
enum API {
  login_URL = '/auth/login',
  register_URL = '/auth/register',
  logout_URL = '/auth/logout/',
  sendCode_URL = '/auth/send-code',
  codeLogin_URL = '/auth/code-login',
  forgetPassword_URL = '/auth/forget-password',
}

// 登录接口
export const reqLogin = (data: LoginReq) =>
  request.post<any, LoginRes>(API.login_URL, data)
// 注册接口
export const reqRegister = (data: LoginReq) =>
  request.post<any, any>(API.register_URL, data)
// 退出登录接口
export const reqLogout = () => request.post<any, any>(API.logout_URL)
// 获取验证码
export const reqSendCode = (data: { phone: string }) =>
  request.post<any, SendCodeRes>(API.sendCode_URL, data)
// 验证码登录
export const reqCodeLogin = (data: AuthLogin) =>
  request.post<any, LoginRes>(API.codeLogin_URL, data)
// 忘记密码
export const reqForgetPassword = (data: ForgetPassword) =>
  request.post<any, any>(API.forgetPassword_URL, data)
