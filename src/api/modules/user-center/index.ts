import request from '@/shared/utils/request'
import type { UserCenter } from '@/types/domain/user-center'
import type {
  UserCenterRes,
  UpdataUserCenterRes,
  updataPasswordReq,
} from '@/types/api/user-center'

enum API {
  getUserCenter_URL = '/user-center',
  updateUserCenter_URL = '/user-center/update',
  updatePassword_URL = '/user-center/update-password',
}

// 获取用户信息
export const reqGetUserCenter = () =>
  request.get<any, UserCenterRes>(API.getUserCenter_URL)
// 修改用户信息
export const reqUpdateUserCenter = (data: UserCenter) =>
  request.patch<any, UpdataUserCenterRes>(API.updateUserCenter_URL, data)
// 修改用户密码
export const reqUpdatePassword = (data: updataPasswordReq) =>
  request.patch<any, any>(API.updatePassword_URL, data)
