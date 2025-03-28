//全部接口共有的ts类型
export interface ResponseData {
  code: number
}
// 登录接口携带的数据
export interface LoginForm {
  username: string
  password: string
}
// 登录接口返回的数据
export interface LoginResponseData extends ResponseData {
  data: {
    token: string
    message?: string
  }
}

// 用户信息接口返回的数据
export interface UserInfoResponseData extends ResponseData {
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
