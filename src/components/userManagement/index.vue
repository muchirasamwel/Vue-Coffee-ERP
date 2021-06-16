<template>
  <div>
    <h3 class="tx-center" style="margin-top: 15px">User Management</h3>
    <p class="tx-center" style="margin-top: 15px"><b>Management Actions Available</b></p>
    <div class="user-management-page">
      <router-link to="/users" class="item">
        Users
      </router-link>
      <router-link to="/permissions" class="item">
          Permissions
      </router-link>
      <router-link to="/roles" class="item">
          Roles
      </router-link>
    </div>
<!--    <div class="user-management-page" style="margin-top: 15px">-->
<!--    -->
<!--    </div>-->

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
