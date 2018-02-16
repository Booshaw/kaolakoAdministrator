import axios from 'axios'
export function sendLogin() {
  const url = '/login'
  const data = {
    username: 'user',
    password: 'sdfasd',
    usertype: 'doctor'
  }
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}