import request from '@/shared/utils/request'
import type { BoardBinRes } from '@/types/api/notice'

enum API {
  boardBin_URL = '/notice/board-bin',
  restoreBoard_URL = '/notice/board-bin/restore/',
  forceDeleteBoard_URL = '/notice/board-bin/force-delete/',
}

// 获取公告回收站
export const reqGetBoardBin = () =>
  request.get<any, BoardBinRes>(API.boardBin_URL)
// 还原公告
export const reqRestoreBoard = (_id: string) =>
  request.post<any, any>(API.restoreBoard_URL + _id)
// 彻底删除公告
export const reqForceDeleteBoard = (_id: string) =>
  request.post<any, any>(API.forceDeleteBoard_URL + _id)
