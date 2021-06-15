<template>
  <div>
    <h3 class="tx-center" style="margin: 30px 0">System Configurations</h3>
    <div class="user-management-page">
      <router-link to="/regions" class="item">
        Regions
      </router-link>
      <router-link to="/weighbridges" class="item">
        Weighbridges
      </router-link>
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
