// 管理相关仓库
import { defineStore } from 'pinia'
import {
  reqDeleteUserInfo,
  reqDeleteUserInfoList,
  reqAddUserInfo,
  reqUpdataUserInfo,
  reqSearchUserInfo,
} from '@/api/userManage/index'
import type {
  ResponseData,
  SubDetailUserInfo,
  UserManageInfoListResponseData,
  UserManageDeleteUserInfoListResponseData,
  SubUserManageDeleteUserInfoList,
  SubUserManageSearchUserInfo,
} from '@/api/userManage/type'
import type { ManageState } from './types/types'

const useUserManageStore = defineStore('UserManage', {
  state: (): ManageState => {
    return {
      userInfoList: [],
      total: 0,
      searchSwitch: false,
      searchFrom: {
        username: '',
        role: '',
        gender: '',
        department: '',
        phone: '',
        email: '',
        status: '',
        skip: 0,
        limit: 5,
      },
      drawerSwitch: false,
      drawerTitle: '',
      userInfo: {
        username: '',
        role: '',
        department: '',
        status: '',
        phone: '',
        email: '',
        gender: '',
      },
      deleteResults: [],
    }
  },
  actions: {
    // 搜索用户信息的方法
    async searchUserInfo(data: SubUserManageSearchUserInfo) {
      const result: UserManageInfoListResponseData =
        await reqSearchUserInfo(data)
      if (result.code === 200) {
        this.userInfoList = result.data.userInfoList
        this.total = result.data.total
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },

    // 新增用户的方法
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
      console.log(result)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 批量删除用户信息的方法
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
