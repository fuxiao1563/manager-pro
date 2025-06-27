// api - home 相关的类型
import type { BaseRes } from '@/types/infrastructure/http/respones'
import type { Home } from '@/types/domain/home'

// 获取首页所返回的数据
export interface HomeRes extends BaseRes<Home> {}
