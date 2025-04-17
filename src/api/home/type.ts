//全部接口共有的ts类型
export interface ResponseData {
  code: number
  message: string
}
// 获取首页返回的数据
export interface UserHome extends ResponseData {
  data: {
    username: string
    avatar: string
    signature: string
  }
}
