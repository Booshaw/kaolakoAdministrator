import axios from 'axios'
export function getDict(params) {
  const url = '/common/dict/get'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getPatientInfo(params) {
  const url = '/patient/get'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}