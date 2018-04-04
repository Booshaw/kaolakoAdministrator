import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
const serverUrl = 'http://192.168.0.6:9080/jiahuan/'

// 获取数据字典
export function getDict(params) {
  const url = debug ? '/common/dict/get' : `${serverUrl}common/dict/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取患者列表
export function getPatientList(params) {
  const url = debug ? '/patient/list' : `${serverUrl}patient/list`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 查询患者个人信息
export function getPatientInfo(params) {
  const url = debug ? '/patient/get' : `${serverUrl}patient/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取疾病分类
export function getDiseaseCategory(params) {
  const url = debug ? '/common/checkup/category' : `${serverUrl}common/checkup/category`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取疾病检查数据字段
export function getDiseaseList(params) {
  const url = debug ? '/common/checkup/list' : `${serverUrl}common/checkup/list`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取医生个人信息
export function getDoctorInformation(params) {
  const url = debug ? '/doctor/detail/get' : `${serverUrl}doctor/detail/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取医疗团队详情
export function getDoctorGroupInformation(params) {
  const url = debug ? '/doctor/studio/get' : `${serverUrl}doctor/studio/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取医疗团队会员列表
export function getMemberList(params) {
  const url = debug ? '/doctor/vip/member/list' : `${serverUrl}doctor/vip/member/list`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取医疗团队随访列表
export function getFollowList(params) {
  const url = debug ? '/doctor/follow/list' : `${serverUrl}doctor/follow/list`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 官网健康档案文章列表
export function getArticleList(params) {
  const url = debug ? '/web/article/list' : `${serverUrl}web/article/list`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 官网健康档案文章详情
export function getArticleDetail(params) {
  const url = debug ? '/web/article/get' : `${serverUrl}web/article/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 患者查询数据列表
export function getPatient(params) {
  const url = debug ? '/doctor/patient/imported/list' : `${serverUrl}doctor/patient/imported/list`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 导入上传患者数据
export function uploadPatient(params) {
  const url = debug ? '/doctor/excel/import' : `${serverUrl}doctor/excel/import`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 官网首页数据获取
export function getIndex(params) {
  const url = debug ? '/web/index' : `${serverUrl}web/index`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 官网首页团队获取
export function getTeamList(params) {
  const url = debug ? '/web/studio' : `${serverUrl}web/studio`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 官网首页服务项目获取
export function getServiceList(params) {
  const url = debug ? '/web/service' : `${serverUrl}web/service`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 官网首页评估获取
export function getEvaluate(params) {
  const url = debug ? '/web/evaluate' : `${serverUrl}web/evaluate`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 官网首页智库获取
export function getKb(params) {
  const url = debug ? '/web/kb' : `${serverUrl}web/kb`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}