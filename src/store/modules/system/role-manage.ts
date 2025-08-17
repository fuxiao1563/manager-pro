//创建角色相关的小仓库
import { defineStore } from 'pinia'
//创建用户小仓库
const useAuthStore = defineStore('Auth', {
  state: () => {
    return {
      role: {
        rolename: '',
        descripte: '',
        status: '',
      },
      searchParams: {
        rolename: '',
        status: '',
        skip: 0,
        limit: 5,
      },
    }
  },
  //处理异步|逻辑地方
  actions: {
    // 获取角色列表
    async searchRole(searchParams: any) {
      // const result = await searchRole(this.searchParams)
      // if (result.code === 200) {
      //     return 'ok'
      // } else return Promise.reject(new Error(result.message))
    },
  },
  getters: {},
  persist: true,
})
export default useAuthStore
