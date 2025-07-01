// api - board 相关的类型
import type { Pagenation } from '@/types/infrastructure/http/request'
import type { BaseRes } from '@/types/infrastructure/http/respones'
import type { BoardsArray, BoardBin } from '@/types/domain/notice'

// 获取公告列表 + 搜索公告所提交的数据类型
export interface SearchParams extends Pagenation {
  department?: string
  level?: number
}

// 获取公告列表 + 搜索公告所返回的数据类型
export interface BoardRes
  extends BaseRes<{
    boards: BoardsArray
    totalCount: number
  }> {}

// 获取公告回收站所返回的数据类型
export interface BoardBinRes extends BaseRes<BoardBin[]> {}
