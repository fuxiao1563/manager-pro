// 接口返回的固有ts类型
export interface BaseRes<T> {
  code: number
  message: string
  data: T
}
