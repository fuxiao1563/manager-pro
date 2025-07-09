import request from '@/shared/utils/request'
import type { AvatarRes, AllBoardRes } from '@/types/api/layout'

enum API {
  getAvatar_URL = '/layout/avatar',
  getAllBoard_URL = '/layout/allBoard',
  putAddRead_URL = '/layout/addRead',
}

// 获取用户头像
export const reqAvatar = () => request.get<any, AvatarRes>(API.getAvatar_URL)
// 获取全部公告
export const reqAllBoard = () =>
  request.get<any, AllBoardRes>(API.getAllBoard_URL)
// 添加已读公告
export const reqAddRead = (_id: string) =>
  request.put<any, any>(`${API.putAddRead_URL}/${_id}`)
