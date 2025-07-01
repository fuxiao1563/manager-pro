// store - board 相关的类型
import type { Pagenation } from '@/types/infrastructure/http/request'
import type { Board, BoardsArray, BoardBin } from '@/types/domain/notice'
// 公告管理
export interface BoardState {
  isBoardDrawer: boolean
  boardDrawerTitle: string
  isAllBoard: boolean
  board: Board
  searchParams: Pagenation & {
    target?: string
    level?: number
  }
  boards: BoardsArray
  totalCount: number
}

// 公告回收站
export interface BoardBinState {
  boardBin: BoardBin[]
}
