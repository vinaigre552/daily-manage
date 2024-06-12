import { message } from 'antd'



const isRequestSuccess = (res: Record<any, any>) => {
  if (typeof res === 'object' && !res.err) return true

  if (typeof res === 'object') {
    message.error(res.err)
    return false
  }

  return true
}

export default isRequestSuccess