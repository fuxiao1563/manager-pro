//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user/index'
import type { LoginForm, LoginResponseData } from '@/api/user/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import constantRoutes from '@/router/routes'
import type { UserState } from './types/types'
//创建用户小仓库
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
    }
  },
  //处理异步|逻辑地方
  actions: {
    async userLogin(data: LoginForm) {
      let result: LoginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token
        SET_TOKEN(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
