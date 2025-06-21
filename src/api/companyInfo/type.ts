//全部接口共有的ts类型
export interface ResponseData {
  code: number
  message: string
}
// 获取公司信息返回的数据
export interface CompanyInfoResult extends ResponseData {
  data: {
    name: string
    address: string
    introduce: string
    department: [string]
  }
}
// 修改公司信息提交的数据
export interface CompanyInfoSub {
  name: string
  address: string
  introduce: string
  department: [string]
}
