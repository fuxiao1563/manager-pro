// userManage 相关的公共类型
import type { Pagenation } from '@/types/infrastructure/http/request'

// 用户信息的数据类型
export interface User {
  _id: string
  username: string
  gender: string
  role: string
  department: string
  phone: string
  email: string
  status: string
}

// 获取用户列表 + 搜索用户所提交的数据类型
export type SearchParams = User & Pagenation
