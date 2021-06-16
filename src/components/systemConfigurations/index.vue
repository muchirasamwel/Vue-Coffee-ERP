<template>
  <div>
    <h3 class="tx-center" style="margin: 30px 0">System</h3>
    <div class="user-management-page">
      <router-link to="/branches" class="item">
      Branches
    </router-link>
      <router-link to="/departments" class="item">
        Departments
      </router-link>
      <router-link to="/regions" class="item">
        Regions
      </router-link>
      <router-link to="/weighbridges" class="item">
        Weighbridges
      </router-link>
    </div>
    <div class="user-management-page" style="margin-top: 15px">
      <router-link to="/branch-stores" class="item">
        Branch Stores
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

</style>
