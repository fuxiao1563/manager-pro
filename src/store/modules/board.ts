//创建公告相关的小仓库
import { defineStore } from 'pinia'
import { dayjs } from 'element-plus'
import {
  reqGetBoard,
  reqAddBoard,
  reqUpdateBoard,
  reqDeleteBoard,
  reqBatchDeleteBoard,
} from '@/api/modules/notice/board'
import type { Board } from '@/types/domain/notice'
import type { SearchParams, BoardRes } from '@/types/api/notice'
import type { BoardState } from '@/types/store/notice'

const boardStore = defineStore('Board', {
  state: (): BoardState => {
    return {
      isBoardDrawer: false,
      boardDrawerTitle: '',
      isAllBoard: false,
      boards: [],
      board: {
        _id: '',
        title: '',
        category: '',
        department: '',
        author: '',
        target: '',
        level: 1,
        isRead: false,
        views: 0,
        content: '',
      },
      totalCount: 0,
      searchParams: {
        target: '',
        level: 0,
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
          createdAt: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          updatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        }))
        this.totalCount = result.data.totalCount
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 发布公告
    async addBoard(data: Board) {
      const result = await reqAddBoard(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 修改公告
    async updateBoard(data: Board) {
      const result = await reqUpdateBoard(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 删除公告
    async deleteBoard(_id: string) {
      const result = await reqDeleteBoard(_id)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 批量删除公告
    async batchDeleteBoard(ids: string[]) {
      const result = await reqBatchDeleteBoard(ids)
      console.log(result)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
  },
  getters: {},
})
export default boardStore
