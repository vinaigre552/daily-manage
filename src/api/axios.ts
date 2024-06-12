import axios from 'axios'
import { message } from 'antd'
const instance = axios.create({
  timeout: 1000 * 60 * 5
})


instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    message.error(err)
    return Promise.reject(err)
  }
)
export default instance
