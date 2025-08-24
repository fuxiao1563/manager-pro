// store - userCenter 相关的类型
import type { UserCenter } from '@/types/domain/user-center'

// 用户中心
export interface UserCenterState {
  userInfo: UserCenter
  avatar: string
  token: string | null
}
