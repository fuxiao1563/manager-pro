import request from '@/shared/utils/request'
import type { BoardRes, SearchParams } from '@/types/api/notice'

enum API {
  board_URL = '/notice/board',
}

// 获取公告列表 + 搜索公告的接口
export const reqGetBoard = (data: SearchParams) =>
  request.post<any, BoardRes>(API.board_URL, data)
