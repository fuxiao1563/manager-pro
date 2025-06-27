// api - userCenter 相关的类型
import type { BaseRes } from '@/types/infrastructure/http/respones'
import type { UserCenter } from '@/types/domain/userCenter'

// 获取用户中心所返回的数据
export interface UserCenterRes extends BaseRes<UserCenter> {}

// 修改用户信息所返回的数据
export interface UpdataUserCenterRes extends BaseRes<UserCenter> {
  token: string
}

// 修改用户密码所提交的数据
export interface updataPasswordReq {
  oldPassword: string
  newPassword: string
}
