import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
const serverUrl = 'http://cd.godo.pub:18080/kaola'
const serverApi = 'http://cd.godo.pub:18080/kaola'
// 文件上传
export function upload(url, params) {
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 前台发布文章
export function uploadArticle(params) {
  const url = debug ? `${serverUrl}/user/article/add` : `${serverApi}/user/article/add`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 分类操作
export function updateCategory(params) {
  const url = debug ? `${serverUrl}/admin/dict/update` : `${serverApi}/admin/dict/update`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 标签操作
export function updateTag(params) {
  const url = debug ? `${serverUrl}/admin/dict/update` : `${serverApi}/admin/dict/update`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 发布课程
export function createCourse(params) {
  const url = debug ? `${serverUrl}/admin/course/add` : `${serverUrl}/admin/course/add`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 后台管理发布文章
export function uploadArticleAdmin(params) {
  const url = debug ? `${serverUrl}/admin/article/update` : `${serverApi}/admin/article/update`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}