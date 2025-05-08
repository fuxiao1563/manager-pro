//全部接口共有的ts类型
export interface ResponseData {
  code: number
  message: string
}

// 登录接口携带的数据
export interface LoginForm {
  username: string
  password: string
}
// 登录接口返回的数据
export interface LoginResponseData extends ResponseData {
  token: string
  data: {
    username: string
    role: string
  }
}

// 获取头像返回的数据
export interface UserAvatarResponseData extends ResponseData {
  data: {
    avatarUrl: string
  }
}
