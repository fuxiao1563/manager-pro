// 管理相关仓库
import { defineStore } from 'pinia'
import { reqUserInfoList } from '@/api/user/index'

const useManageStore = defineStore('manage', {
  state: () => {
    return {
      userInfoList: [],
    }
  },
  actions: {
    // 获取用户信息列表
    async getUserInfoList() {
      const result = await reqUserInfoList()
      if (result.code === 200) {
        this.userInfoList = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
})
export default useManageStore
