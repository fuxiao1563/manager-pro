import request from '@/shared/utils/request'
import type { User, SearchParams } from '@/types/domain/system/user-manage'
import type {
  SearchUserRes,
  BatchDeleteUserReq,
  BatchDeleteUserRes,
} from '@/types/api/system/user-manage'

enum API {
  searchUser_URL = '/system/user-manage/search',
  addUser_URL = '/system/user-manage/add',
  updateUser_URL = '/system/user-manage/update',
  deleteUser_URL = '/system/user-manage/delete/',
  batchDeleteUser_URL = '/system/user-manage/batch-delete',
}

// 获取用户列表 + 搜索用户
export const searchUser = (data: SearchParams) =>
  request.post<any, SearchUserRes>(API.searchUser_URL, data)
// 新增用户
export const addUser = (data: User) =>
  request.post<any, any>(API.addUser_URL, data)
// 编辑用户
export const updateUser = (data: User) =>
  request.patch<any, any>(API.updateUser_URL, data)
// 删除用户
export const deleteUser = (_id: string) =>
  request.delete<any, any>(API.deleteUser_URL + _id)
// 批量删除用户
export const batchDeleteUser = (ids: BatchDeleteUserReq) =>
  request.post<any, BatchDeleteUserRes>(API.batchDeleteUser_URL, ids)
