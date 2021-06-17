<template>
  <div>
   <p class="text-center font-weight-bolder" style="color: #1fd242"> Dashboard</p>
    <div class="card" style="margin: 20px">
     <div style="margin: 10px">
       <h4>Logged in user details</h4>
     </div>
      <table class="table table-hover">
        <tbody>
        <tr>
          <td class="bold">
            Name
          </td>
          <td>
            {{ loggedInUser.user.name }}
          </td>
        </tr>
        <tr>
          <td class="bold">
            Email
          </td>
          <td>
            {{ loggedInUser.user.email }}
          </td>
        </tr>
        <tr>
          <td class="bold">
            Phone Number
          </td>
          <td>
            {{ loggedInUser.user.phoneNo }}
          </td>
        </tr>
        <tr>
          <td class="bold">
            Status
          </td>
          <td>
            <a-tag color="green" v-if="loggedInUser.user.status === 'Active'">
              active
            </a-tag>
            <a-tag color="red" v-else>
              inactive
            </a-tag>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p class="text-center" style="font-weight: lighter; font-size: 30px;">This dashboard is still under development.... its not complete.</p>
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
<style scoped>
.bold{ font-weight: bold;}

</style>
