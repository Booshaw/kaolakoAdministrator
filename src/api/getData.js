import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
const serverUrl = 'http://192.168.0.6:9080/jiahuan'

// 获取文章列表
export function getArticleList(params) {
  const url = debug ? '/article' : `${serverUrl}/article`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取数据
export function getData(params) {
  const url = debug ? '/homePage' : `${serverUrl}/homePage`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取课程详情
export function getCourseDetail(params) {
  const url = debug ? '/courseDetail' : `${serverUrl}/courseDetail`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取认证详情
export function getIdendificationDetail(params) {
  const url = debug ? '/idendificationDetail' : `${serverUrl}/idendificationDetail`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}