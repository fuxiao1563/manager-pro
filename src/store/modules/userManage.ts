// 管理相关仓库
import { defineStore } from 'pinia'
import {
  reqUserInfoList,
  reqDeleteUserInfo,
  reqDeleteUserInfoList,
  reqAddUserInfo,
  reqUpdataUserInfo,
} from '@/api/userManage'
import type {
  ResponseData,
  SubUserManageInfoList,
  SubDetailUserInfo,
  UserManageInfoListResponseData,
  UserManageDeleteUserInfoListResponseData,
  SubUserManageDeleteUserInfoList,
} from '@/api/user/type'
import type { ManageState } from './types/types'

const useUserManageStore = defineStore('manage', {
  state: (): ManageState => {
    return {
      userInfoList: [],
      deleteResults: [],
      total: 0,
      drawerSwitch: false,
    }
  },
  actions: {
    // 用户管理的方法
    async getUserInfoList(data: SubUserManageInfoList) {
      const result: UserManageInfoListResponseData = await reqUserInfoList(data)
      if (result.code === 200) {
        this.userInfoList = result.data.userInfoList
        this.total = result.data.total
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },

    // 添加用户的方法
    async addUserInfo(data: SubDetailUserInfo) {
      const result: ResponseData = await reqAddUserInfo(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 修改用户的方法
    async updataUserInfo(data: SubDetailUserInfo) {
      const result: ResponseData = await reqUpdataUserInfo(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 删除用户信息的方法
    async deleteUserInfo(_id: string) {
      const result: ResponseData = await reqDeleteUserInfo(_id)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 批量删除用户信息的方法???????
    async deleteUserInfoList(ids: SubUserManageDeleteUserInfoList) {
      const result: UserManageDeleteUserInfoListResponseData =
        await reqDeleteUserInfoList(ids)
      if (result.code === 200) {
        this.deleteResults = result.data
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
  },
  // persist: true,
})
export default useUserManageStore
