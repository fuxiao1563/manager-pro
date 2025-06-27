//创建主页相关的小仓库
import { defineStore } from 'pinia'
import { reqGetHome } from '@/api/modules/home'
import type { HomeRes } from '@/types/api/home'
import type { HomeState } from '@/types/store/home'
const useHomeStore = defineStore('Home', {
  state: (): HomeState => {
    return {
      user: {
        username: '',
        signature: '',
      },
    }
  },
  //处理异步|逻辑地方
  actions: {
    // 主页
    async getHome() {
      const result: HomeRes = await reqGetHome()
      if (result.code === 200) {
        this.user.username = result.data.username
        this.user.signature = result.data.signature
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
