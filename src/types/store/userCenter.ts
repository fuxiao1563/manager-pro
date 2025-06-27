// store - userCenter 相关的类型
import type { UserCenterInfo } from '@/types/domain/userCenter'

// 用户中心
export interface UserCenterState {
  userInfo: UserCenterInfo
  avatar: string
  token: string | null
}
