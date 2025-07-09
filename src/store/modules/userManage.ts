// 用户管理相关仓库
import { defineStore } from 'pinia'
import {
  searchUser,
  addUser,
  updateUser,
  deleteUser,
  batchDeleteUser,
} from '@/api/modules/system/userManage'
import type { User, SearchParams } from '@/types/domain/system/userManage'
import type {
  SearchUserRes,
  BatchDeleteUserReq,
  BatchDeleteUserRes,
} from '@/types/api/system/userManage'
import type { UserManageState } from '@/types/store/system/userManage'

const useUserManageStore = defineStore('UserManage', {
  state: (): UserManageState => {
    return {
      isSearch: false,
      isDrawer: false,
      drawerTitle: '',
      users: [],
      totalCount: 0,
      searchParams: {
        _id: '',
        username: '',
        role: '',
        department: '',
        gender: '',
        phone: '',
        email: '',
        status: '',
        skip: 0,
        limit: 5,
      },
      user: {
        _id: '',
        username: '',
        phone: '',
        gender: '',
        role: '',
        department: '',
        email: '',
        status: '',
      },
      deleteResults: null,
    }
  },
  actions: {
    // 获取用户列表 + 搜索用户
    async searchUser(data: SearchParams) {
      const result: SearchUserRes = await searchUser(data)
      if (result.code === 200) {
        this.users = result.data.users
        this.totalCount = result.data.totalCount
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },

    // 新增用户
    async addUser(data: User) {
      const result = await addUser(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 编辑用户
    async updateUser(data: User) {
      const result = await updateUser(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 删除用户
    async deleteUser(_id: string) {
      const result = await deleteUser(_id)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 批量删除用户
    async batchDeleteUser(ids: BatchDeleteUserReq) {
      const result: BatchDeleteUserRes = await batchDeleteUser(ids)
      if (result.code === 200) {
        this.deleteResults = result.data
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
  },
})
export default useUserManageStore
