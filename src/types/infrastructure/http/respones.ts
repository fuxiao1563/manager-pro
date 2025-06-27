// 接口返回的固有ts类型
export interface BaseRes<T> {
  code: number
  message: string
  data: T
}

// 接口返回的创建时间与最后修改时间的类型
export interface DateField {
  $date: string // ISO 8601格式的日期字符串
}
