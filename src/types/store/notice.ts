// store - board 相关的类型
import type { DateField } from '@/types/infrastructure/http/respones'
import type { Pagenation } from '@/types/infrastructure/http/request'
import type { Board } from '@/types/domain/notice'
// 公告管理
export interface BoardState {
  boardDrawerSwitch: boolean
  boardDrawerTitle: string
  allBoardSwitch: boolean
  board: Board
  searchParams: Pagenation & {
    department?: string
    level?: number
  }
  boards: (Board & {
    views: number
    publishTime?: DateField
    createdAt: DateField
    editTime?: DateField
    updatedAt: DateField
  })[]
  totalCount: number
}
