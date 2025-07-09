import request from '@/shared/utils/request'

enum API {
  getFile_URL = '/file',
  deleteFile_URL = '/file/delete',
}

// 主页
export const reqGetFile = () => request.get<any, any>(API.getFile_URL)
// 删除文件
export const reqDeleteFile = (_id: string) =>
  request.delete<any, any>(`${API.deleteFile_URL}/${_id}`)
