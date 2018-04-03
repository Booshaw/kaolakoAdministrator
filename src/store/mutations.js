import * as types from './mutations-types'
const mutations = {
  [types.LOGIN](state, data) {
    localStorage.token = data
    state.token = data
  },
  [types.LOGOUT](state) {
    localStorage.removeItem('token')
    localStorage.removeItem('usertype')
    state.token = null
    state.usertype = null
  },
  [types.TITLE](state, data) {
    state.title = data
  },
  [types.USERTYPE](state, type) {
    localStorage.usertype = type
    state.usertype = type
  },
  [types.SET_ARTICLEID](state, id) {
    state.articleId = id
  },
  [types.SET_PATIENTONFOLLOW](state, patientOnFollow) {
    state.patientOnFollow = patientOnFollow
  }
}
export default mutations
