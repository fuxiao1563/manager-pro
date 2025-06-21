// 用户中心相关仓库
import { defineStore } from 'pinia'
import type { UserCenterState } from './types/types'
import {
  reqUserCenterInfo,
  reqUpdateUserCenterInfo,
  reqUpdateUserCenterPassword,
} from '@/api/userCenter/index'
import type {
  ResponseData,
  DetailUserCenterInfo,
  UserCenterInfoResponseData,
  UpdataUserCenterInfoResponseData,
  SubUserCenterPassword,
} from '@/api/userCenter/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import { reqUserAvatar } from '@/api/user'
import type { UserAvatarResponseData } from '@/api/user/type'
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
    async getUserCenterInfo() {
      const result: UserCenterInfoResponseData = await reqUserCenterInfo()
      if (result.code === 200) {
        this.userInfo = result.data
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 获取头像
    async getUserAvatar() {
      const result: UserAvatarResponseData = await reqUserAvatar()
      if (result.code === 200) {
        this.avatar = result.data.avatarUrl
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 修改用户信息的方法
    async updateUserCenterInfo(data: DetailUserCenterInfo) {
      const result: UpdataUserCenterInfoResponseData =
        await reqUpdateUserCenterInfo(data)
      if (result.code === 200) {
        this.token = result.token
        SET_TOKEN(result.token)
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 修改密码
    async updateUserCenterPassword(data: SubUserCenterPassword) {
      const result: ResponseData = await reqUpdateUserCenterPassword(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
  },
})
export default useUserCenterStore
