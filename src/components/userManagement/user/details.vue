<template>
  <div>
    <div class="navigation-top-bar">
      <div>
        <span onclick="history.back()">&#8592;</span>
      </div>
    </div>
    <div class="view-item-body">
      <div v-if="loading">
        <a-spin tip="Fetching user...">
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
      <div v-if="user !== ''">
        <div class="item-body">
          <div class="item-tittle">User Details</div>
          <table class="table table-hover">
            <tbody>
            <tr>
              <td class="bold">
                Name
              </td>
              <td>
                {{ user.firstName }} {{ user.middleName }} {{ user.lastName }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Id Number
              </td>
              <td>
                {{ user.idNumber }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Email
              </td>
              <td>
                {{ user.email }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Phone Number
              </td>
              <td>
                {{ user.phoneNo }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Branch
              </td>
              <td>
                {{ user.branch.branchCode }} - {{ user.branch.branchName }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Department
              </td>
              <td>
                {{ user.department.deptCode }} - {{ user.department.deptName }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Status
              </td>
              <td>
                <a-tag color="green" v-if="user.status === 'Active'">
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
        <div class="item-body">
          <div class="item-tittle">Actions</div>
          <a-button type="danger" v-if="user.status === 'Active'"
                    @click="toggleUserStatus('Deactivated')">Disable User
          </a-button>
          <a-button type="primary" v-else
                    @click="toggleUserStatus('Active')">Activate User
          </a-button>
        </div>
        <div class="item-body">
          <div class="item-tittle">Access Control</div>
          <div class="sub-title">Assign Roles to User</div>
          <div>
            <a-select
              mode="multiple"
              style="width: 300px"
              placeholder="Please select role"
              v-model="select_model">
              <a-select-option v-for="data in newRoles" :key="data.groupCode">
                {{ data.groupName }}
              </a-select-option>
            </a-select>
          </div>
          <div v-if="select_model.length > 0" style="margin: 10px 0">
            <a-button type="primary" :loading="btnLoading" @click="assignRoles">Assign Roles</a-button>
          </div>
          <div class="sub-title">Assign Roles to User</div>
          <div>
            <table class="table custom-table table-bordered table-hover">
              <thead>
              <tr>
                <th>Code</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody v-for="role in user.userGroups">
              <tr>
                <td>{{ role.groupCode }}</td>
                <td>{{ role.groupName }}</td>
                <td>
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span>Revoke</span>
                    </template>
                    <div style="cursor: pointer" class="item-icon pointer-hand"
                         @click="showRevokeConfirm(role.groupCode)">
                      <img src="../../../assets/icons/delete.svg" alt="" width="20px">
                    </div>
                  </a-tooltip>
                </td>
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
import {Alert, notification, Select, Spin, Tag, Tooltip} from 'ant-design-vue'
import API from "../../../api";
import _ from 'lodash';

export default {
  name: 'user_details',
  components: {
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-alert': Alert,
    'a-spin': Spin,
    'a-tag': Tag,
    'a-tooltip': Tooltip
  },
  data() {
    return {
      select_model: [],
      user: '',
      loading: false,
      feedback: '',
      btnLoading: false,
      roles: '',
    }
  },
  computed: {
    newRoles() {
      return _.differenceBy(this.roles, this.user.userGroups, 'groupCode');
    }
  },
  mounted() {
    this.getUser(this.$route.params.id)
    this.getRoles();
  },
  methods: {
    toggleUserStatus(status) {
      let userId = this.user.userId
      let url = `api/usermanagement/v1/users/status/${userId}?status=${status}`
      API.post(url )
        .then(response => {
          if (response.data.status === 0) {
            if (status === 'Active') {
              notification.success({
                message: 'User activated successfully.'
              })
              this.user.status = 'Active';
            } else {
              notification.success({
                message: 'User disabled successfully.'
              })
              this.user.status = 'Deactivated';
            }
          }
        })
        .catch(error => {
          console.log(error.response)
          notification.error({
            message: 'An error occured. Try again.'
          })
        })
    },
    assignRoles() {
      this.btnLoading = true;
      let form = {}
      let arr = [];
      let len = this.select_model.length;
      for (let i = 0; i < len; i++) {
        arr.push({
          groupCode: this.select_model[i],
        });
      }
      form.userId = this.user.userId;
      form.updatedUserGroups = arr;
      form.revokedUserGroups = [];
      API.post(`api/usermanagement/v1/users/userGroups`, form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Role(s) assigned successfully.'
            })
            this.btnLoading = false;
            this.select_model = []
            location.reload();
          }
        })
        .catch(error => {
          console.log(error.response)
          this.btnLoading = false;
          notification.error({
            message: 'Role(s) cannot be assigned, possibly an error occured.!.'
          })
        })
    },
    getRoles() {
      API.get('api/usermanagement/v1/userGroups')
        .then(response => {
          this.roles = response.data
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        })
    },
    getUser(id) {
      this.loading = true
      API.get('api/usermanagement/v1/users', {
        params: {
          userId: id
        }
      })
        .then(response => {
          this.user = response.data
          this.loading = false
        })
        .catch(err => {
          this.feedback = err.response.data
        })
    },
    showRevokeConfirm(id) {
      let user = this.user
      this.$confirm({
        title: 'Are you sure you want to revoke this role form the user?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          let arr = [{groupCode: id}]
          let form = {}
          form.userId = user.userId;
          form.updatedUserGroups = [];
          form.revokedUserGroups = arr;
          API.post(`api/usermanagement/v1/users/userGroups`, form)
            .then(response => {
              if (response.data.status === 0) {
                notification.success({
                  message: 'Role revoked successfully.'
                })
              }
            })
            .catch(error => {
              console.log(error.response)
              notification.error({
                message: 'Role cannot be revoked, possibly an error occured.!.'
              })
            })
        },
        onCancel() {
        }
      })
    },
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

.sub-title
  padding: 20px 0
  color: #1fd242
  font-weight: bold

.bold
  font-weight: bold

.spin-content
  border: 1px solid #91d5ff
  background-color: #e6f7ff
  height: 300px
  padding: 30px

@media only screen and (max-width: 450px)
  .custom-table
    width: 100%
</style>
