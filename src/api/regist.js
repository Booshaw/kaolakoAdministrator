import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
export function regist(params) {
  const url = debug ? '/user/register' : 'http://cd.godo.pub:18080/kaola/user/register'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res)
  })
}