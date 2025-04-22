import request from '@/utils/request'
import type { UserHome } from './type'

enum API {
  getUserHome_URL = '/userHome',
}

// 主页
export const reqGetUserHome = () =>
  request.get<any, UserHome>(API.getUserHome_URL)
