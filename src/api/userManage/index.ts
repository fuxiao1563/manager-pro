import request from '@/utils/request'
import type {
  ResponseData,
  UserManageInfoListResponseData,
  SubDetailUserInfo,
  SubUserManageDeleteUserInfoList,
  UserManageDeleteUserInfoListResponseData,
} from './type'

enum API {
  getUserInfoList_URL = '/manage/getUserInfoList',
  addUserInfo_URL = '/manage/addUserInfo',
  updataUserInfo_URL = '/manage/updataUserInfo',
  deleteUserInfo_URL = '/manage/deleteUserInfo/',
  deleteUserInfoList_URL = '/manage/deleteUserInfoList',
}

// 用户管理接口
export const reqUserInfoList = (data: any) =>
  request.post<any, UserManageInfoListResponseData>(
    API.getUserInfoList_URL,
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
