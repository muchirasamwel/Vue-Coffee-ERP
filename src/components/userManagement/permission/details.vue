<template>
  <div>
    <div class="navigation-top-bar">
      <div>
        <span onclick="history.back()">&#8592;</span>
      </div>
    </div>
    <div class="view-item-body">
      <div class="item-body">
        <div class="item-tittle">Permission Details</div>
        <table class="table table-hover">
          <tbody>
          <tr>
            <td class="bold">
              Permission Id
            </td>
            <td>
              1
            </td>
          </tr>
          <tr>
            <td class="bold">
              Permission Name
            </td>
            <td>
              addinvestment
            </td>
          </tr>
          <tr>
            <td class="bold">
              Permission Description
            </td>
            <td>
              Add an investment to the system, withdraw, rollover or topup
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="item-body">
        <div class="item-tittle">Assignment</div>
        <p>This permission is available to the following roles</p>
        <table style="margin-top: 10px" class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Role ID</th>
            <th>Role Name</th>
            <th>Role Description</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>4</td>
            <td>Operations Basic</td>
            <td>The basic permissions required in operations</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Operations Client side access</td>
            <td>R/W access to clients, investments and RE</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'permission_details'
}
</script>

<style scoped lang="sass">
.item-tittle
  font-weight: bold
  font-size: 20px
  padding: 0 10px
  margin-bottom: 20px
  color: #008cff

.search-filter
  display: inline-flex
  float: right
  margin-bottom: 10px

.bold
  font-weight: bold
</style>
