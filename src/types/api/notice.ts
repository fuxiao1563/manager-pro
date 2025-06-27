// api - board 相关的类型
import type { Pagenation } from '@/types/infrastructure/http/request'
import type { BaseRes, DateField } from '@/types/infrastructure/http/respones'
import type { Board } from '@/types/domain/notice'

// 获取公告列表 + 搜索公告所提交的数据类型
export interface SearchParams extends Pagenation {
  department?: string
  level?: number
}

// 获取公告列表 + 搜索公告所返回的数据类型
export interface BoardRes
  extends BaseRes<{
    boards: (Board & {
      views: number
      publishTime?: DateField
      createdAt: DateField
      editTime?: DateField
      updatedAt: DateField
    })[]
    totalCount: number
  }> {}
