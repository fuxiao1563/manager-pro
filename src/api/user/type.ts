// 登录接口携带的数据
export interface LoginForm {
  username: string
  password: string
}
// 登录接口返回的数据
export interface LoginResponseData {
  code: number
  data: {
    token: string
  }
}

// 用户信息接口返回的数据
export interface UserInfoResponseData {
  code: number
  data: {
    userId: number
    avatar: string
    username: string
    password: number
    desc: string
    roles: string[]
    buttons: string[]
    routes: string[]
    token: string
  }
}
