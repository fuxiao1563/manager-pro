// api - layout 相关的类型
import type { BaseRes } from '@/types/infrastructure/http/respones'

// 获取头像返回的数据
export interface AvatarRes
  extends BaseRes<{
    avatarUrl: string
  }> {}
