import request from '@/shared/utils/request'
import type { HomeRes } from '@/types/api/home'

enum API {
  getHome_URL = '/home',
}

// 主页
export const reqGetHome = () => request.get<any, HomeRes>(API.getHome_URL)
