//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/shared/utils/token'
import {
  reqLogin,
  reqRegister,
  reqLogout,
  reqSendCode,
  reqCodeLogin,
} from '@/api/modules/auth'
import type { LoginReq, LoginRes, SendCodeRes } from '@/types/api/auth'
import type { authLogin } from '@/types/domain/auth'
import type { AuthState } from '@/types/store/auth'
import constantRoutes from '@/router/routes'
//创建用户小仓库
const useAuthStore = defineStore('Auth', {
  state: (): AuthState => {
    return {
      authInfo: {
        username: '',
        role: '',
      },
      token: GET_TOKEN(),
      code: {
        phone: '15510882253',
        authCode: '',
      },
      menuRoutes: constantRoutes,
    }
  },
  //处理异步|逻辑地方
  actions: {
    //登录
    async login(data: LoginReq) {
      const result: LoginRes = await reqLogin(data)
      if (result.code === 200) {
        this.authInfo.username = result.data.username
        this.authInfo.role = result.data.role
        this.token = result.token
        SET_TOKEN(result.token)
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 注册
    async register(data: LoginReq) {
      const result = await reqRegister(data)
      if (result.code === 200) return 'ok'
      else return Promise.reject(new Error(result.message))
    },
    // 退出登录
    async logout() {
      const result = await reqLogout()
      if (result.code === 200) {
        this.token = ''
        this.authInfo.username = ''
        this.authInfo.role = ''
        REMOVE_TOKEN()
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 获取验证码
    async sendCode(data: { phone: string }) {
      const result: SendCodeRes = await reqSendCode(data)
      if (result.code === 200) {
        this.code.authCode = result.data
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
    // 验证码登录
    async codeLogin(data: authLogin) {
      const result = await reqCodeLogin(data)
      console.log(result)
      if (result.code === 200) {
        this.authInfo.username = result.data.username
        this.authInfo.role = result.data.role
        this.token = result.token
        SET_TOKEN(result.token)
        return 'ok'
      } else return Promise.reject(new Error(result.message))
    },
  },
})
export default useAuthStore
