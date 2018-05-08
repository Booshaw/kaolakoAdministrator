import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
const serverUrl = 'https://easy-mock.com/mock/5ac20177470d657aa5c1dd51/kaolako'
const serverApi = 'http://api.kaolako.com/kaola'

// 获取文章列表
export function getArticleList(params) {
  const url = debug ? 'http://api.kaolako.com/kaola/web/article/list' : `${serverApi}/web/article/list`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取文章详情数据
export function getArticleDetail(params) {
  const url = debug ? 'http://api.kaolako.com/kaola/web/article/get' : `${serverUrl}/web/article/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取数据
export function getData(params) {
  const url = debug ? 'https://easy-mock.com/mock/5ac20177470d657aa5c1dd51/kaolako/homePage' : `${serverUrl}/homePage`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取课程详情
export function getCourseDetail(params) {
  const url = debug ? 'https://easy-mock.com/mock/5ac20177470d657aa5c1dd51/kaolako/courseDetail' : `${serverUrl}/courseDetail`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取认证详情
export function getIdendificationDetail(params) {
  const url = debug ? 'https://easy-mock.com/mock/5ac20177470d657aa5c1dd51/kaolako/idendificationDetail' : `${serverUrl}/idendificationDetail`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}