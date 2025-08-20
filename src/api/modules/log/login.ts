import request from '@/shared/utils/request'
// import type { AvatarRes, AllBoardRes } from '@/types/api/layout'

enum API {
  postSearchLog_URL = '/log/login/searchLog',
  postRecordLog_URL = '/log/login/recordLog',
  deleteClearLog_URL = '/log/login/clearLog',
}

// 获取登录日志
export const reqSearchLog = (data: any) =>
  request.post<any, any>(API.postSearchLog_URL, data)
// 记录登录日志
export const reqRecordLog = (data: any) =>
  request.post<any, any>(API.postRecordLog_URL, data)
// 清空登录日志
export const reqClearLog = () =>
  request.delete<any, any>(API.deleteClearLog_URL)
