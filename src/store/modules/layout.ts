//创建layout相关的小仓库
import { defineStore } from 'pinia'
const useLayoutStore = defineStore('layout', {
  state: () => {
    return {
      refresh: false,
      isCollapse: false,
      isCollapse_title: true,
    }
  },
  actions: {},
})
export default useLayoutStore
