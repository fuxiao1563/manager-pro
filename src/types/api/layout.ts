// api - layout 相关的类型
import type { BaseRes } from '@/types/infrastructure/http/respones'
import type { AllBoard } from '@/types/domain/layout'

// 获取头像所返回的数据
export interface AvatarRes
  extends BaseRes<{
    avatarUrl: string
  }> {}

// 获取全部公告所返回的数据

export interface AllBoardRes extends BaseRes<AllBoard[]> {}
