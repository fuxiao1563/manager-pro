import request from '@/shared/utils/request'
import type { AvatarRes } from '@/types/api/layout'

enum API {
  getAvatar_URL = '/layout/avatar',
}

// 获取用户头像接口
export const reqAvatar = () => request.get<any, AvatarRes>(API.getAvatar_URL)
