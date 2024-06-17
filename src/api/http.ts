import http from './axios'
// 请求结果
interface ResData<T = any> {
  data: T
  err?: any
  msg: string
}

const fetchData = <T = any> (url = '', data = {}, method = 'GET') => {
  const m = method.toLowerCase() // 小写
  try {
    return new Promise <ResData<T> >((resolve, reject) => {
      http[m](url, data)
        .then((response) => {
          const responseData = response.data as ResData<T> 
          resolve(responseData)
        })
        .catch((err) => {
          reject(err)
        })
    })
  } catch (error) {
    throw error
  }
}

export default  fetchData