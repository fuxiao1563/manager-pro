// notice 相关的公共类型

// 公告信息的数据类型
export interface Board {
  _id: string
  title: string
  category: string
  department: string
  author: string
  target: string
  level: number
  views: number
  content: string
}

// 公告列表的数据类型
export type BoardsArray = Array<
  Board & {
    createdAt: string
    updatedAt: string
  }
>

// 公告列表单个的数据类型
export interface BoardsArrayItem extends Board {
  createdAt: string
  updatedAt: string
}

// 公告回收站的数据类型
export interface BoardBin extends Board {
  createdAt: string
  updatedAt: string
  deletedAt: string
}
