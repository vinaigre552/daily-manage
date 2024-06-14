import axios from 'axios'
import { message } from 'antd'
const instance = axios.create({
  timeout: 1000 * 60 * 5
})


instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    // 错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = ''
          break
        case 401: // token过期，退出登录
          message.error(err.response.data.msg)
          localStorage.removeItem('token')
          setTimeout(() => {
            window.location.href = '/login'
          }, 500)
          break
        case 403:
          err.message = '权限不足: 403'
          break
        case 500:
          err.message = '服务器端出错: 500'
          break
        case 502:
          err.message = '服务器端出错: 502'
          break
        case 504:
          err.message = '服务器端出错: 504'
          break
        case 505:
          err.message = '服务器端出错: 505'
          break
        default:
          err.message = `连接错误 ${err.response.status}`
      }
      return err?.response
    }
    
    return Promise.reject(err)
  }
)
export default instance
