// api - auth 相关的类型
import type { BaseRes } from '@/types/infrastructure/http/respones'

// 登录接口所提交的数据
export interface LoginReq {
  username: string
  password: string
}
// 登录接口所返回的数据
export interface LoginRes
  extends BaseRes<{
    username: string
    role: string
  }> {
  token: string
}
