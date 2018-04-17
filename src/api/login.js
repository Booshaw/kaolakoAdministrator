import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
export function sendLogin(params) {
  const url = debug ? '/login' : ''
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res)
  })
}