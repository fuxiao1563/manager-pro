//创建用户相关的小仓库
import { defineStore } from 'pinia'
import {
  reqLogin,
  reqRegist,
  reqLogout,
  reqUserInfo,
  reqUserInfoList,
  reqUpdateUserInfo,
  reqDeleteUserInfo,
  reqAddUserInfo,
} from '@/api/user/index'
import type {
  ResponseData,
  LoginForm,
  LoginResponseData,
  UserInfoListResponseData,
  UserInfo,
  DeleteUserInfoResponseData,
} from '@/api/user/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
import constantRoutes from '@/router/routes'
import type { UserState } from './types/types'
//创建用户小仓库
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      userInfo: {
        _id: '',
        username: '',
        password: '',
        phone: '',
        gender: '',
        email: '',
        role: '',
        avatar: '',
        status: '',
        signature: '',
      },
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
    }
  },
  //处理异步|逻辑地方
  actions: {
    //登录的方法
    async userLogin(data: LoginForm) {
      const result: LoginResponseData = await reqLogin(data)
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
      const result: ResponseData = await reqRegist(data)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录的方法
    async userLogout(username: string) {
      const result: ResponseData = await reqLogout(username)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取用户信息的方法
    async getUserInfo(username: string) {
      const result: UserInfoListResponseData = await reqUserInfo(username)
      if (result.code === 200) {
        this.userInfo = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 修改用户信息的方法
    async updateUserInfo(data: UserInfo) {
      const result: ResponseData = await reqUpdateUserInfo(data)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户管理的方法
    async getUserInfoList(data: any) {
      const result: any = await reqUserInfoList(data)
      if (result.code === 200) {
        return result.data
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 删除用户信息的方法
    async deleteUserInfo(_id: string) {
      const result: DeleteUserInfoResponseData = await reqDeleteUserInfo(_id)
      if (result.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 批量删除用户信息的方法
    async deleteUserInfoList(ids: { _id: string }[]) {
      ids.forEach(async (item: any) => {
        const result: DeleteUserInfoResponseData = await reqDeleteUserInfo(
          item._id,
        )
        if (result.code === 200) {
          return 'ok'
        } else {
          return Promise.reject(new Error(result.message))
        }
      })
    },
    // 添加用户的方法
    async addUserInfo(data: UserInfo) {
      const result: ResponseData = await reqAddUserInfo(data)
      console.log(result)
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
