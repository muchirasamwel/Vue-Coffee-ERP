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
        <div v-if="loading">
          <a-spin tip="Fetching permission...">
            <div class="spin-content">
            </div>
          </a-spin>
        </div>
        <div v-if="feedback !== ''">
          <a-alert
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            show-icon
          />
        </div>
        <div v-if="permission !== ''">
          <table class="table table-hover">
            <tbody>
            <tr>
              <td class="bold">
                Permission Id
              </td>
              <td>
                {{ permission.permissionId }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Permission Name
              </td>
              <td>
                {{ permission.permissionName }}
              </td>
            </tr>
            </tbody>
          </table>
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
    </div>
  </div>
</template>

<script>

import API from '../../../api'
import { Alert, Spin } from 'ant-design-vue'

export default {
  name: 'permission_details',
  components: {
    'a-alert': Alert,
    'a-spin': Spin
  },
  data () {
    return {
      permission: '',
      loading: false,
      feedback: ''
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.getPermission(id)
  },
  methods: {
    getPermission (id) {
      this.loading = true
      API.get('api/usermanagement/v1/permissions', {
        params: {
          permissionId: id
        }
      })
        .then(response => {
          this.permission = response.data
          this.loading = false
        })
        .catch(err => {
          this.feedback = err.response.data
        })
    }
  }
}
</script>

<style scoped lang="sass">
.spin-content
  border: 1px solid #91d5ff
  background-color: #e6f7ff
  height: 300px
  padding: 30px

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
