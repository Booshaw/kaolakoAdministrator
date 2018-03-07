import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
export function sendLogin(params) {
  const url = debug ? '/login' : 'http://192.168.0.6:9080/jiahuan/user/login'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res)
  })
}