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
  UserCenterInfoResponseData,
  SubUserCenterInfo,
  SubUserCenterPassword,
} from '@/api/userCenter/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
const useUserCenterStore = defineStore('userCenter', {
  state: (): UserCenterState => {
    return {
      userInfo: {
        _id: '',
        username: '',
        phone: '',
        gender: '',
        email: '',
        role: '',
        avatar: '',
        status: '',
        signature: '',
      },
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
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 修改用户信息的方法
    async updateUserCenterInfo(data: SubUserCenterInfo) {
      const result: UserCenterInfoResponseData =
        await reqUpdateUserCenterInfo(data)
      this.token = result.token
      SET_TOKEN(result.token)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 修改密码
    async updateUserCenterPassword(data: SubUserCenterPassword) {
      const result: ResponseData = await reqUpdateUserCenterPassword(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 上传头像
  },
})
export default useUserCenterStore
