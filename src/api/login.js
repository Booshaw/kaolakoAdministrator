import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
export function sendLogin(params) {
  const url = debug ? 'http://api.kaolako.com/kaola/login' : 'http://api.kaolako.com/kaola/login'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res)
  })
}