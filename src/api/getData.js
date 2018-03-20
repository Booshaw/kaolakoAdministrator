import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'

// 获取数据字典
export function getDict(params) {
  const url = debug ? '/common/dict/get' : 'http://192.168.0.6:9080/jiahuan/common/dict/get'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取患者列表
export function getPatientList(params) {
  const url = debug ? '/patient/list' : 'http://192.168.0.6:9080/jiahuan/patient/list'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 查询患者个人信息
export function getPatientInfo(params) {
  const url = debug ? '/patient/get' : 'http://192.168.0.6:9080/jiahuan/patient/get'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取疾病分类
export function getDiseaseCategory(params) {
  const url = debug ? '/common/checkup/category' : 'http://192.168.0.6:9080/jiahuan/common/checkup/category'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取疾病检查数据字段
export function getDiseaseList(params) {
  const url = debug ? '/common/checkup/list' : 'http://192.168.0.6:9080/jiahuan/common/checkup/list'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取医生个人信息
export function getDoctorInformation(params) {
  const url = debug ? '/doctor/detail/get' : 'http://192.168.0.6:9080/jiahuan/doctor/detail/get'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取医疗团队详情
export function getDoctorGroupInformation(params) {
  const url = debug ? '/doctor/studio/get' : 'http://192.168.0.6:9080/jiahuan/doctor/studio/get'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取医疗团队会员列表
export function getMemberList(params) {
  const url = debug ? '/doctor/vip/member/list' : 'http://192.168.0.6:9080/jiahuan/doctor/vip/member/list'
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}