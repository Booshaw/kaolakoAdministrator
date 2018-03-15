import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
export function regist(params) {
  const url = debug ? '/user/register' : 'http://192.168.0.6:9080/jiahuan/user/register'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res)
  })
}