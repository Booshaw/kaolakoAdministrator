import axios from 'axios'
export function upload(url, params) {
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}