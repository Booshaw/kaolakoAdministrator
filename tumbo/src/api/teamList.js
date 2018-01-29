import axios from 'axios'
// export function getTeamList() {
//   const url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/teamList'
//   return axios.get(url).then((res) => {
//     return Promise.resolve(res.data)
//   })
// }

export function getIndex() {
  const url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/Index'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getFooter() {
  const url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/Index'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getArticleLists() {
  const url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/articles'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getArticleDetail() {
  const url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/article_detail'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function getUserList() {
  const url = 'https://easy-mock.com/mock/5a0a4bd2b31e3216824d4b95/api/userList'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}