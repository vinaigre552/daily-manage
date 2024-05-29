import axios from 'axios'
import { message } from 'antd'
import { useDispatch } from 'react-redux'
const instance = axios.create({
  timeout: 1000 * 60 * 5
})


instance.interceptors.request.use((config) => {
  const dispatch = useDispatch()
  dispatch({type: 'start'})
  return config
})

instance.interceptors.response.use(
  (response) => {
    const dispatch = useDispatch()
    dispatch({type: 'end'})
    return response
  },
  (err) => {
    const dispatch = useDispatch()
    dispatch({type: 'end'})
    message.error(err)
    return Promise.reject(err)
  }
)
export default instance
