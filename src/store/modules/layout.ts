//创建layout相关的小仓库
import { defineStore } from 'pinia'
import { reqAvatar } from '@/api/modules/layout'
import type { LayoutState } from '@/types/store/layout'
import type { AvatarRes } from '@/types/api/layout'

const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => {
    return {
      refresh: false,
      isCollapse: false,
      isCollapse_title: true,
      avatar: '',
    }
  },
  actions: {
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
export default useLayoutStore
