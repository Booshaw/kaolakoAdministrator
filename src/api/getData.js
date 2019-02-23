import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
const serverApi = 'http://cd.godo.pub:18080/kaola'
export const UPLOADURL = 'http://cd.godo.pub:18080/kaola/common/file/upload' // 文件上传地址
export const ERR_OK = '200' // 请求成功res.code

// 获取文章列表
export function getArticleList(params) {
  const url = debug ? `${serverApi}/web/article/list` : `${serverApi}/web/article/list`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取文章详情数据
export function getArticleDetail(params) {
  const url = debug ? `${serverApi}/web/article/get` : `${serverApi}/web/article/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取数据
export function getData(params) {
  const url = debug ? `${serverApi}/homePage` : `${serverApi}/homePage`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取课程列表
export function getCourseList(params) {
  const url = debug ? `${serverApi}/web/course/list` : `${serverApi}/web/course/list`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取课程详情
export function getCourseDetail(params) {
  const url = debug ? `${serverApi}/web/course/detail` : `${serverApi}/web/course/detail`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取认证详情
export function getIdendificationDetail(params) {
  const url = debug ? `${serverApi}/idendificationDetail` : `${serverApi}/idendificationDetail`
  return axios.get(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取文章分类和课程分类
export function getCategoryTag(params) {
  const url = debug ? `${serverApi}/common/dict/get` : `${serverApi}/common/dict/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取教师列表
export function getTeacherList(params) {
  const url = debug ? `${serverApi}/admin/teacher/list` : `${serverApi}/admin/teacher/list`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 按名称查询视频
export function searchVideoHandle(params) {
  const url = debug ? `${serverApi}/admin/vod/get` : `${serverApi}/admin/vod/get`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
