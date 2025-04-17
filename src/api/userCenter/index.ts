import request from '@/utils/request'
import type {
  ResponseData,
  UserCenterInfoResponseData,
  SubUserCenterInfo,
  SubUserCenterPassword,
} from './type'

enum API {
  getUserCenterInfo_URL = '/userCenter/getUserInfo/',
  updataUserCenterInfo_URL = '/userCenter/updataUserInfo',
}

// 获取用户信息接口
export const reqUserCenterInfo = () =>
  request.get<any, UserCenterInfoResponseData>(API.getUserCenterInfo_URL)
// 修改用户信息接口
export const reqUpdateUserCenterInfo = (data: SubUserCenterInfo) =>
  request.patch<any, UserCenterInfoResponseData>(
    API.updataUserCenterInfo_URL,
    data,
  )
// 修改用户密码接口
export const reqUpdateUserCenterPassword = (data: SubUserCenterPassword) =>
  request.patch<any, ResponseData>(API.updataUserCenterInfo_URL, data)
