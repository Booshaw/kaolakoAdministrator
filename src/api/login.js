import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
export function sendLogin(params) {
  const url = debug ? '/login' : 'http://kaola.eaon.win:8080/kaola/login'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res)
  })
}