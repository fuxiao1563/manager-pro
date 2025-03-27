import axios from 'axios'
import { ElMessage } from 'element-plus'
// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在请求发出之前做某事
    return config
  },
  (error) => {
    // 请求错误时做些事
    return Promise.reject(error)
  },
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '无网络'
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
export default request
