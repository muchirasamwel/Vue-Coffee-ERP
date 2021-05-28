import state from "./state";

let getters = {

  loggedInUser: state => {
    return state.loggedInUser
  },
}
export default getters
