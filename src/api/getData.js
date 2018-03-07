import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
export function getDict(params) {
  const url = debug ? '/common/dict/get' : 'http://192.168.0.6:9080/jiahuan/common/dict/get'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getPatientInfo(params) {
  const url = debug ? '/patient/get' : 'http://192.168.0.6:9080/jiahuan/patient/get'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}