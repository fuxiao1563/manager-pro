import request from '@/shared/utils/request'
import type { UserCenter } from '@/types/domain/userCenter'
import type {
  UserCenterRes,
  UpdataUserCenterRes,
  updataPasswordReq,
} from '@/types/api/userCenter'

enum API {
  getUserCenter_URL = '/userCenter',
  updateUserCenter_URL = '/userCenter/updateUser',
  updatePassword_URL = '/userCenter/updatePassword',
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

// 上传头像
