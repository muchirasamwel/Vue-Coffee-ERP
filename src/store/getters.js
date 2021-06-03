import state from "./state";

let getters = {

  loggedInUser: state => {
    return state.loggedInUser
  },
  branches: state => {
    return state.branches
  },
  coffeeTypes: state => {
    return state.coffeeTypes
  },
}
export default getters
