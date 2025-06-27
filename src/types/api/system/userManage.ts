// api - userManage 相关的类型
import type { BaseRes } from '@/types/infrastructure/http/respones'
import type { User } from '@/types/domain/system/userManage'

//  获取用户列表 + 搜索用户所返回的数据类型
export interface SearchUserRes
  extends BaseRes<{
    users: User[]
    totalCount: number
  }> {}
// 编辑用户所提交的数据类型
export interface UpdateUserReq extends User {
  _id: string
}
// 批量删除用户所提交的数据类型
export interface BatchDeleteUserReq extends User {
  _id: string
}
;[]
// 批量删除用户返回的数据
export interface BatchDeleteUserRes
  extends BaseRes<
    | {
        _id: string
        username: string
      }[]
    | null
  > {}
