import axios from 'axios'
export function sendLogin(params) {
  const url = '/login'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res)
  })
}