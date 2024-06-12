import fetchData from "../http"

const user_apis = {
  login: (data) => fetchData('/user/login', data, 'POST')
}

export default user_apis
