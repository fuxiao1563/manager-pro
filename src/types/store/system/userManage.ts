// store - userManage 相关的类型
import type { User, SearchParams } from '@/types/domain/system/userManage'

// 用户管理
export interface UserManageState {
  isDrawer: boolean
  drawerTitle: string
  isSearch: boolean
  searchParams: SearchParams
  users: User[]
  totalCount: number
  user: User
  deleteResults:
    | {
        _id: string
        username: string
      }[]
    | null
}
