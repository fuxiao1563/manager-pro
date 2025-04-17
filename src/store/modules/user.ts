//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqRegist, reqLogout } from '@/api/user'
import type {
  ResponseData,
  LoginForm,
  LoginResponseData,
} from '@/api/user/type'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import constantRoutes from '@/router/routes'
import type { UserState } from './types/types'
//创建用户小仓库
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      userInfo: {
        username: '',
        role: '',
      },
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
    }
  },
  //处理异步|逻辑地方
  actions: {
    //登录
    async userLogin(data: LoginForm) {
      const result: LoginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.userInfo.username = result.data.username
        this.userInfo.role = result.data.role
        this.token = result.token
        SET_TOKEN(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 注册
    async userRegist(data: LoginForm) {
      const result: ResponseData = await reqRegist(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 退出登录
    async userLogout() {
      const result: ResponseData = await reqLogout()
      if (result.code === 200) {
        this.token = ''
        this.userInfo.username = ''
        this.userInfo.role = ''
        REMOVE_TOKEN()
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
  },
  getters: {},
  // persist: true,
})
export default useUserStore
