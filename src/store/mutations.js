import { API } from '@/api'

let mutations = {

  SET_LOGGEDINUSER (state, user) {
    return state.loggedInUser = user
  },
  FETCH_BRANCHES (state) {
    API.get('api/usermanagement/v1/branches')
      .then(res => {
        state.branches = res.data
      }).catch(err => {
      console.log('fetch branches error', err)
    })
  },

  FETCH_COFFEE_TYPES (state) {
    API.get('api/booking/v1/coffeeTypes')
      .then(res => {
        state.coffeeTypes = res.data
      }).catch(err => {
      console.log('fetch coffee type error', err)
    })
  },
}
export default mutations
