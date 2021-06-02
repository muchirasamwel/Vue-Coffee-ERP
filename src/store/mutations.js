import { API } from '@/api'

let mutations = {

  SET_LOGGEDINUSER (state, user) {
    return state.loggedInUser = user
  },
  SET_BRANCHES (state, branches) {
    return state.branches = branches
  },
  FETCH_BRANCHES (state) {
    console.log('called')
    API.get('api/usermanagement/v1/branches')
      .then(res => {
        state.branches = res.data
      }).catch(err => {
      console.log('fetch error', err)
    })
  },
}
export default mutations
