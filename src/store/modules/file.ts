//创建文件管理相关的小仓库
import { defineStore } from 'pinia'
import { dayjs } from 'element-plus'
import { reqGetFile, reqDeleteFile } from '@/api/modules/file'

const fileStore = defineStore('File', {
  state: () => {
    return {
      fileList: [],
    }
  },
  actions: {
    // 获取文件信息
    async getFile() {
      const result = await reqGetFile()
      if (result.code === 200) {
        this.fileList = result.data.map((item: any) => {
          const { userId, uploadTime, fileSize, ...oldData } = item
          return {
            ...oldData,
            username: userId.username,
            fileSize: (fileSize / 1024).toFixed(2) + ' KB',
            uploadTime: dayjs(uploadTime).format('YYYY-MM-DD HH:mm:ss'),
          }
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 删除文件
    async deleteFile(_id: string) {
      const result = await reqDeleteFile(_id)
      console.log(result)
      if (result.code === 200) return 'ok'
      return Promise.reject(new Error(result.message))
    },
  },
  getters: {},
})
export default fileStore
