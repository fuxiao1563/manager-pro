//创建公告相关的小仓库
import { defineStore } from 'pinia'
import { dayjs } from 'element-plus'
import {
  reqGetBoardBin,
  reqRestoreBoard,
  reqForceDeleteBoard,
} from '@/api/modules/notice/board-bin'
import type { BoardBin } from '@/types/domain/notice'
import type { BoardBinRes } from '@/types/api/notice'
import type { BoardBinState } from '@/types/store/notice'

const boardBinStore = defineStore('BoardBin', {
  state: (): BoardBinState => {
    return {
      boardBin: [],
    }
  },
  actions: {
    // 获取公告回收站
    async getBoardBin() {
      const result: BoardBinRes = await reqGetBoardBin()
      if (result.code === 200) {
        this.boardBin = result.data.map((item: BoardBin) => ({
          ...item,
          deletedAt: dayjs(item.deletedAt).format('YYYY-MM-DD HH:mm:ss'),
        }))
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 还原公告
    async restoreBoard(_id: string) {
      const result = await reqRestoreBoard(_id)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 彻底删除公告
    async forceDeleteBoard(_id: string) {
      const result = await reqForceDeleteBoard(_id)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
  },
})
export default boardBinStore
