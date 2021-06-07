<template>
  <div>
    <div class="navigation-top-bar">
      <div>
        <span onclick="history.back()">&#8592;</span>
      </div>
    </div>
    <div class="view-item-body">
      <div class="">
        <div class="item-tittle">Role Details</div>
        <div v-if="loading">
          <a-spin tip="Fetching the role...">
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
        <div v-if="role !== ''">
          <table class="table table-hover">
            <tbody>
            <tr>
              <td class="bold">
                Role Code
              </td>
              <td>
                {{ role.groupCode }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Role Name
              </td>
              <td>
                {{ role.groupName }}
              </td>
            </tr>
            </tbody>
          </table>
          <div>
            <div class="item-tittle">Permissions</div>
            <p>This role has been assigned the following permissions</p>
            <button class="the-btn sec-color" @click="showModal">
              <a-icon type="plus"/>
              Add Permission to role
            </button>
            <table style="margin-top: 10px" class="table table-bordered table-hover">
              <thead>
              <tr>
                <th>Permission ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody v-for="permission in role.permissions">
              <tr>
                <td>{{ permission.permissionId }}</td>
                <td>{{ permission.permissionName }}</td>
                <td>
                  <a-tooltip placement="bottomLeft">
                    <template slot="title">
                      <span>Revoke</span>
                    </template>
                    <div style="cursor: pointer" class="item-icon pointer-hand"
                         @click="showRevokeModal(permission.permissionId)">
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
      <!--    Add Permission to role modal-->
      <a-modal width="90%" v-model="show_modal" centered title="Add Permission to role" on-ok="addPermissionToRole">
        <h1>Some Permissions to add </h1>
        <template slot="footer">
          <a-button key="back" @click="handleCancel('add')">
            Cancel
          </a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="addPermissionToRole()">
            Add Permission to role
          </a-button>
        </template>
      </a-modal>
      <!--    Add Permission to role modal -->

      <a-modal v-model="visible"
               cancelText="No"
               okText="Yes"
               okType="danger"
               @ok="revokePermission">
        <p>Are you sure you want to revoke permission from this Role?</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import {Modal, Icon, notification, Spin, Tooltip} from 'ant-design-vue'
import API from "../../../api";
import _ from 'lodash';

export default {
  name: 'role_details',
  components: {
    'a-icon': Icon,
    'a-modal': Modal,
    'a-spin': Spin,
    'a-tooltip': Tooltip
  },
  data() {
    return {
      show_modal: false,
      loading: false,
      role: '',
      visible: false,
      feedback: '',
      selectedPermission: '',
      form: {}
    }
  },
  methods: {
    showModal() {
      this.show_modal = true
    },
    showRevokeModal(id) {
      this.selectedPermission = id;
      this.visible = true;
    },
    handleCancel() {
      this.show_modal = false
      this.loading = false
    },
    addPermissionToRole() {
      this.loading = true
      this.show_modal = false
    },
    getRole(id) {
      this.loading = true
      API.get('api/usermanagement/v1/userGroups', {
        params: {
          groupCode: id
        }
      })
        .then(response => {
          this.role = response.data
          this.loading = false
        })
        .catch(err => {
          this.feedback = err.response.data
        })
    },
    revokePermission() {
      let form = {}
      let id = this.selectedPermission;
      form.groupCode = this.role.groupCode;
      form.groupName = this.role.groupName;
      _.remove(this.role.permissions, function (e) {
        return e.permissionId === id
      });
      let permissions = [];
      permissions = Array.from(this.role.permissions);
      let arr = [];
      let len = permissions.length;
      for (let i = 0; i < len; i++) {
        arr.push({
          permissionId: permissions[i].permissionId,
        });
      }
      form.permissions = []
      for (let i = 0; i < arr.length; i++) {
        form.permissions[i] = arr[i];
      }
      API.put(`api/usermanagement/v1/userGroups/${form.groupCode}`, form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Permission revoked successfully.'
            })
            this.visible = false;
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    },
  },
  mounted() {
    const id = this.$route.params.id
    this.getRole(id)
  },
}
</script>

<style scoped lang="sass">
.item-tittle
  font-weight: bold
  font-size: 20px
  padding: 0 10px
  margin-bottom: 20px
  color: #008cff

.spin-content
  border: 1px solid #91d5ff
  background-color: #e6f7ff
  height: 300px
  padding: 30px

.bold
  font-weight: bold
</style>
