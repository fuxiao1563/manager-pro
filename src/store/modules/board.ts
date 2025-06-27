//创建公告相关的小仓库
import { defineStore } from 'pinia'
import { reqGetBoard } from '@/api/modules/notice/board'
import type { SearchParams, BoardRes } from '@/types/api/notice'
import type { BoardState } from '@/types/store/notice'

const boardStore = defineStore('Board', {
  state: (): BoardState => {
    return {
      boardDrawerSwitch: false,
      boardDrawerTitle: '',
      allBoardSwitch: false,
      boards: [],
      board: {
        title: '',
        category: '',
        department: '',
        author: '',
        target: '',
        level: 1,
        content: '',
      },
      totalCount: 0,
      searchParams: {
        department: '',
        level: 1,
        skip: 0,
        limit: 5,
      },
    }
  },
  actions: {
    // 获取所有公告
    async getBoard(data: SearchParams) {
      const result: BoardRes = await reqGetBoard(data)
      if (result.code === 200) {
        this.boards = result.data.boards.map((item) => ({
          ...item,
          publishTime: item.createdAt,
          editTime: item.updatedAt,
        }))
        this.totalCount = result.data.totalCount
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
export default boardStore
