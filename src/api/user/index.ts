import request from '@/utils/request'
import type {
  ResponseData,
  LoginForm,
  LoginResponseData,
  UserInfoListResponseData,
  UserInfo,
} from './type'

enum API {
  regist_URL = '/user/regist',
  login_URL = '/user/login',
  logout_URL = '/user/logout',
  userInfoList_URL = '/userCenter/userInfoList/',
  updataUserInfo_URL = '/userCenter/updataUserInfo',
}

// 注册接口
export const reqRegist = (data: LoginForm) =>
  request.post<any, ResponseData>(API.regist_URL, data)
// 登录接口
export const reqLogin = (data: LoginForm) =>
  request.post<any, LoginResponseData>(API.login_URL, data)
// 退出登录接口
export const reqLogout = ({ username }: { username: String }) =>
  request.post<any, ResponseData>(API.logout_URL, { username })
// 获取用户信息接口
export const reqUserInfoList = ({ username }: { username: String }) =>
  request.get<any, UserInfoListResponseData>(API.userInfoList_URL, {
    params: { username },
  })
// 修改用户信息接口
export const reqUpdateUserInfo = (data: UserInfo) =>
  request.patch<any, ResponseData>(API.updataUserInfo_URL, data)
