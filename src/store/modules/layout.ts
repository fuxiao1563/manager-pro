//创建layout相关的小仓库
import { defineStore } from 'pinia'
import { dayjs } from 'element-plus'
import { reqAvatar, reqAllBoard, reqAddRead } from '@/api/modules/layout'
import type { LayoutState } from '@/types/store/layout'
import type { AvatarRes, AllBoardRes } from '@/types/api/layout'

const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => {
    return {
      refresh: false,
      isCollapse: false,
      isCollapse_title: true,
      avatar: '',
      allBoard: [],
      isDot: false,
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
    // 获取全部公告
    async getAllBoard() {
      const result: AllBoardRes = await reqAllBoard()
      if (result.code === 200) {
        this.allBoard = result.data.map((item) => ({
          ...item,
          createdAt: dayjs(item.createdAt).format('YYYY-MM-DD'),
        }))
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 获取未读公告数量
    async getDotCount() {
      const result: AllBoardRes = await reqAllBoard()
      if (result.code === 200) {
        const dotCount = result.data.filter(
          (item) => item.isRead === false,
        ).length
        this.isDot = dotCount > 0 ? true : false
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 添加已读公告
    async addRead(_id: string) {
      const result = await reqAddRead(_id)
      if (result.code === 200) return 'ok'
      return Promise.reject(new Error(result.message))
    },
  },
})
export default useLayoutStore
