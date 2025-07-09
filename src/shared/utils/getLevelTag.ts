import { computed } from 'vue'
import { boardLevelOpts } from '@/shared/constants/options'

export const getLevelTag = computed(() => (level: number) => {
  const found = boardLevelOpts.find((op) => op.value === level)
  return {
    type: found?.type || 'info',
    label: found?.label || '',
  }
})
