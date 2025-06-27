// 用户中心相关仓库
import { defineStore } from 'pinia'
import { GET_TOKEN, SET_TOKEN } from '@/shared/utils/token'
import type { UserCenterState } from '@/types/store/userCenter'
import type { UserCenter } from '@/types/domain/userCenter'
import type {
  UserCenterRes,
  UpdataUserCenterRes,
  updataPasswordReq,
} from '@/types/api/userCenter'
import {
  reqGetUserCenter,
  reqUpdateUserCenter,
  reqUpdatePassword,
} from '@/api/modules/userCenter'
import { reqAvatar } from '@/api//modules/layout'
import type { AvatarRes } from '@/types/api/layout'

const useUserCenterStore = defineStore('userCenter', {
  state: (): UserCenterState => {
    return {
      userInfo: {
        _id: '',
        username: '',
        phone: '',
        gender: '',
        role: '',
        department: '',
        email: '',
        status: '',
        signature: '',
      },
      avatar: '',
      token: GET_TOKEN(),
    }
  },
  actions: {
    // 获取用户信息的方法
    async getUserCenter() {
      const result: UserCenterRes = await reqGetUserCenter()
      if (result.code === 200) {
        this.userInfo = result.data
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 修改用户信息的方法
    async updateUserCenter(data: UserCenter) {
      const result: UpdataUserCenterRes = await reqUpdateUserCenter(data)
      if (result.code === 200) {
        this.token = result.token
        SET_TOKEN(result.token)
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 修改密码
    async updatePassword(data: updataPasswordReq) {
      const result = await reqUpdatePassword(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 获取头像
    async getAvatar() {
      const result: AvatarRes = await reqAvatar()
      if (result.code === 200) {
        this.avatar = result.data.avatarUrl
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
  },
})
export default useUserCenterStore
