// store - layout 相关的类型
import type { AllBoard } from '@/types/domain/layout'

// layout
export interface LayoutState {
  refresh: boolean
  isCollapse: boolean
  isCollapse_title: boolean
  avatar: string
  allBoard: AllBoard[]
  dotCount: number
}
