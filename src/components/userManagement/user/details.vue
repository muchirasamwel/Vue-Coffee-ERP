<template>
  <div>
    <div class="navigation-top-bar">
      <div>
        <span onclick="history.back()">&#8592;</span>
      </div>
    </div>
    <div class="view-item-body">
      <div class="item-body">
        <div class="item-tittle">User Details</div>
        <table class="table table-hover">
          <tbody>
          <tr>
            <td class="bold">
              Name
            </td>
            <td>
              Cetric Okola Omwirikha
            </td>
          </tr>
          <tr>
            <td class="bold">
              Email
            </td>
            <td>
              okolacetric@gmail.com
            </td>
          </tr>
          <tr>
            <td class="bold">
              Phone Number
            </td>
            <td>
              +254704145832
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="item-body">
        <div class="item-tittle">Actions</div>
        <a-button type="danger">Disable User</a-button>
      </div>
    </div>
    <div class="item-body">
      <div class="item-tittle">Access Control</div>
      <div class="sub-title">Assign Roles to User</div>
      <div>
        <a-select
          mode="multiple"
          style="width: 312px"
          placeholder="Please select role"
          v-model="select_model"
          @change="handleChange"
        >
          <a-select-option v-for="data in selectData" :key="data.id">
            {{data.name}}
          </a-select-option>
        </a-select>
      </div>
      <div v-if="select_model.length > 0" style="margin: 10px 0">
        <button class="the-btn sec-color">Assign Roles</button>
      </div>
      <div class="sub-title">Assign Roles to User</div>
      <div>
        <table  class="table custom-table table-bordered table-hover">
          <thead>
          <tr>
            <th>Role</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Operations Basic</td>
            <td><a-button @click="showRevokeConfirm(5)" type="danger">Revoke</a-button> </td>
          </tr>
          <tr>
            <td>Operations Client side access</td>
            <td><a-button @click="showRevokeConfirm(5)" type="danger">Revoke</a-button> </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {notification, Select} from 'ant-design-vue'
export default {
  name: 'user_details',
  components: {
    'a-select': Select,
    'a-select-option': Select.Option,
  },
  data () {
    return {
      select_model: [],
      selectData: [
        { id: 1, name: 'Cetric' },
        { id: 2, name: 'Benson' },
        { id: 3, name: 'Clinton' },
        { id: 4, name: 'Joyce' },
        { id: 5, name: 'Sam' },
        { id: 6, name: 'George' },
        { id: 7, name: 'Elvis' },
        { id: 8, name: 'Kevin' },
        { id: 9, name: 'Fred' },
      ]
    }
  },
  methods: {
    showRevokeConfirm (id) {
      this.$confirm({
        title: 'Are you sure you want to revoke this role form the user?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          notification.success({
            message: id + 'Role revoked successfully'
          })
        },
        onCancel () {
        }
      })
    },
    handleChange () {
      console.log(this.select_model)
    }
  }
}
</script>

<style scoped lang="sass">
.item-tittle
  font-weight: bold
  font-size: 20px
  padding: 0 10px
  margin-bottom: 20px
  color: #008cff
.custom-table
  width: 70%
.search-filter
  display: inline-flex
  float: right
  margin-bottom: 10px
.sub-title
  padding: 20px 0
  color: #00c18b
  font-weight: bold
.bold
  font-weight: bold
@media only screen and (max-width: 450px)
  .custom-table
    width: 100%
</style>
