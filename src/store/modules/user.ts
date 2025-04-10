//创建用户相关的小仓库
import { defineStore } from 'pinia'
import {
  reqLogin,
  reqRegist,
  reqLogout,
  reqUserInfoList,
  reqUpdateUserInfo,
} from '@/api/user/index'
import type {
  ResponseData,
  LoginForm,
  LoginResponseData,
  UserInfoListResponseData,
  UserInfo,
} from '@/api/user/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import constantRoutes from '@/router/routes'
import type { UserState } from './types/types'
//创建用户小仓库
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      userInfo: {
        username: '',
        password: '',
        phone: '',
        gender: '',
        email: '',
        role: '',
        avatar: '',
        status: '',
      },
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
    }
  },
  //处理异步|逻辑地方
  actions: {
    //登录的方法
    async userLogin(data: LoginForm) {
      let result: LoginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.userInfo = result.data
        this.token = result.token
        SET_TOKEN(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 注册的方法
    async userRegist(data: LoginForm) {
      let result: ResponseData = await reqRegist(data)
      console.log(result)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录的方法
    async userLogout({ username }: { username: String }) {
      let result: ResponseData = await reqLogout({ username })
      console.log(result)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取用户信息的方法
    async getUserInfoList({ username }: { username: String }) {
      let result: UserInfoListResponseData = await reqUserInfoList({ username })
      if (result.code === 200) {
        console.log(result.data)
        this.userInfo = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 修改用户信息的方法
    async updateUserInfo(data: UserInfo) {
      let result: ResponseData = await reqUpdateUserInfo(data)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
export default useUserStore
