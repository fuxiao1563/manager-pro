import request from '@/utils/request'
import type {
  ResponseData,
  UserManageInfoListResponseData,
  SubDetailUserInfo,
  SubUserManageDeleteUserInfoList,
  UserManageDeleteUserInfoListResponseData,
  SubUserManageSearchUserInfo,
} from './type'

enum API {
  addUserInfo_URL = '/manage/addUserInfo',
  updataUserInfo_URL = '/manage/updataUserInfo',
  deleteUserInfo_URL = '/manage/deleteUserInfo/',
  deleteUserInfoList_URL = '/manage/deleteUserInfoList',
  searchUserInfo_URL = '/userManage/searchUserInfo',
}

// 搜索接口
export const reqSearchUserInfo = (data: SubUserManageSearchUserInfo) =>
  request.post<any, UserManageInfoListResponseData>(
    API.searchUserInfo_URL,
    data,
  )
// 添加用户接口
export const reqAddUserInfo = (data: SubDetailUserInfo) =>
  request.post<any, ResponseData>(API.addUserInfo_URL, data)
// 编辑用户接口
export const reqUpdataUserInfo = (data: any) =>
  request.patch<any, ResponseData>(API.updataUserInfo_URL, data)
// 删除用户接口
export const reqDeleteUserInfo = (_id: string) =>
  request.delete<any, ResponseData>(API.deleteUserInfo_URL + _id)
// 批量删除用户接口
export const reqDeleteUserInfoList = (ids: SubUserManageDeleteUserInfoList) =>
  request.post<any, UserManageDeleteUserInfoListResponseData>(
    API.deleteUserInfoList_URL,
    ids,
  )
