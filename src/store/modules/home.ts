//创建主页相关的小仓库
import { defineStore } from 'pinia'
import { reqGetUserHome } from '@/api/home/index'
import type { UserHome } from '@/api/home/type'
import type { HomeState } from './types/types'
const useHomeStore = defineStore('Home', {
  state: (): HomeState => {
    return {
      userInfo: {
        username: '',
        avatar: '',
        signature: '',
      },
    }
  },
  //处理异步|逻辑地方
  actions: {
    // 主页
    async getUserHome() {
      const result: UserHome = await reqGetUserHome()
      if (result.code === 200) {
        this.userInfo.username = result.data.username
        this.userInfo.avatar = result.data.avatar
        this.userInfo.signature = result.data.signature
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
  // persist: true,
})
export default useHomeStore
