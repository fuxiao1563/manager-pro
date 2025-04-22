//全部接口共有的ts类型
export interface ResponseData {
  code: number
  message: string
}

// 提交的表单用户信息类型
export interface SubDetailUserInfo {
  username: string
  gender: string
  phone: string
  email: string
  role: string
  status: string
}
// 返回的完整用户信息类型
export interface DetailUserInfoResponseData extends SubDetailUserInfo {
  _id: string
}

// 搜索用户所需提交的数据
export interface SubUserManageSearchUserInfo extends SubDetailUserInfo {
  skip: number
  limit: number
}

//  搜索用户返回的数据
export interface UserManageInfoListResponseData extends ResponseData {
  data: {
    total: number
    userInfoList: DetailUserInfoResponseData[]
  }
}
// 修改用户所需提交的数据
export interface SubUserManageUpdataUserInfo extends SubDetailUserInfo {
  _id: string
}
// 批量删除用户所需提交的数据
export interface SubUserManageDeleteUserInfoList {
  _id: string
}
;[]
// 批量删除用户返回的数据
export interface UserManageDeleteUserInfoListResponseData extends ResponseData {
  data:
    | {
        _id: string
        username: string
      }[]
    | null
}
