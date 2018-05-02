import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
const serverUrl = 'http://192.168.0.6:9080/jiahuan'
// 文件上传
export function upload(url, params) {
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改分类
export function updateCategory(params) {
  const url = debug ? '/web/category/update' : `${serverUrl}/web/category/update`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 发布课程
export function createCourse(params) {
  const url = debug ? '/web/category/update' : `${serverUrl}/web/category/update`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}