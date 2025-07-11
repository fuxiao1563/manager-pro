import { computed } from 'vue'
import { BOARD } from '@/shared/constants/options'
const { levelOpts } = BOARD

export const getLevelTag = computed(() => (level: number) => {
  const found = levelOpts.find((op) => op.value === level)
  return {
    type: found?.type || 'info',
    label: found?.label || '',
  }
})
