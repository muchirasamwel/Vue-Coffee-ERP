<template>
  <div>
    <h4>Logged in user details</h4>
    <div>
      <p>{{loggedInUser.userGroups}}</p>
      <p>{{loggedInUser.permissions}}</p>
      <p>{{loggedInUser.header}}</p>
      <p>{{loggedInUser.token}}</p>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex/dist/vuex.mjs"
export default {
  computed: {
    ...mapGetters([
      'loggedInUser'
    ]),
  },
}
</script>
