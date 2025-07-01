import request from '@/shared/utils/request'
import type { Board } from '@/types/domain/notice'
import type { BoardRes, SearchParams } from '@/types/api/notice'

enum API {
  board_URL = '/notice/board',
  addboard_URL = '/notice/board/addBoard',
  updateboard_URL = '/notice/board/updateBoard',
  deleteboard_URL = '/notice/board/deleteBoard/',
  batchDeleteboard_URL = '/notice/board/batchDeleteBoard',
}

// 获取公告列表 + 搜索公告的接口
export const reqGetBoard = (data: SearchParams) =>
  request.post<any, BoardRes>(API.board_URL, data)
// 发布公告
export const reqAddBoard = (data: Board) =>
  request.post<any, any>(API.addboard_URL, data)
// 修改公告
export const reqUpdateBoard = (data: Board) =>
  request.post<any, any>(API.updateboard_URL, data)
// 删除公告
export const reqDeleteBoard = (_id: string) =>
  request.post<any, any>(API.deleteboard_URL + _id)
// 批量删除公告
export const reqBatchDeleteBoard = (ids: any) =>
  request.post<any, any>(API.batchDeleteboard_URL, ids)
