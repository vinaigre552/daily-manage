import http from './axios'

const fetchData = (url = '', data = {}, method: 'GET', config = {}) => {
  try {
    return new Promise((resolve, reject) => {
      http[method](url, data, config)
        .then((response) => {
          const responseData = response.data
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