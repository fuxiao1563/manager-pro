//创建登录日志相关的小仓库
import { defineStore } from 'pinia'
import {
  reqSearchLog,
  reqRecordLog,
  reqClearLog,
} from '@/api/modules/log/login'
import type { loginLogState } from '@/types/store/log/login'
//创建登录日志小仓库
const useLoginLogStore = defineStore('LoginLog', {
  state: (): loginLogState => {
    return {
      logs: [
        {
          userId: '',
          username: '',
          phone: null,
          email: '',
          createdAt: '',
        },
      ],
      searchParams: '',
    }
  },
  //处理异步|逻辑地方
  actions: {
    //获取登录日志
    async searchLog() {
      const result = await reqSearchLog({ searchParams: this.searchParams })
      if (result.code === 200) {
        result.data.forEach((item: any) => {
          item.username = item.userId.username
          item.phone = item.userId.phone
          item.email = item.userId.email
          item.userId = item.userId._id
        })
        this.logs = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 登录日志记录
    async recordLog(data: any) {
      const result = await reqRecordLog(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 清除登录日志
    async clearLog() {
      const result = await reqClearLog()
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
  },
})
export default useLoginLogStore
