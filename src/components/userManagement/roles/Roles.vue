<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal"
             title="Add Role"
             okType="primary" ok-text="Add Role" cancel-text="close" @ok="createRole">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <a-spin tip="Submitting..." :spinning="spinning">
        <div>
          <label for="code">Role Code</label>
          <a-input  type="text" allow-clear v-model="form.groupCode" id="code"/>
          <span v-if="isCode" class="text-danger">Please provide group code</span>
        </div>
        <div>
          <label for="name">Role Name</label>
          <a-input  type="text" allow-clear v-model="form.groupName" id="name"/>
          <span v-if="isName" class="text-danger">Please provide group name</span>
        </div>
        <div>
          <label for="permissions">Select Permissions</label><br>
          <a-select
            id="permissions"
            mode="multiple"
            style="width: 100%"
            placeholder="Please select permission"
            v-model="form.permission"
            @change="handleChange">
            <a-select-option v-for="data in fetched_permissions" :key="data.permissionId">
              {{data.permissionName}}
            </a-select-option>
          </a-select>
          <span v-if="isPerm" class="text-danger">Please select atleast one permission</span>
        </div>
      </a-spin>
    </a-modal>
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             title="Edit Role"
             okType="primary" ok-text="Edit Role" cancel-text="close" @ok="editRole">
      <a-alert v-if="feedback_two !== ''" type="error" :message=feedback_two banner/>
      <a-spin tip="Submitting..." :spinning="spinning_e">
        <label for="edit_code">Role Code</label>
        <a-input class="form-input" type="text" v-model="formEdit.groupCode" id="edit_code"/>
        <label for="name">Role Name</label>
        <a-input class="form-input" type="text" v-model="formEdit.groupName" id="edit_name"/>
        <div>
          <label for="e-permissions">Select Permissions</label><br>
          <a-select
            id="e-permissions"
            mode="multiple"
            :default-value=formEdit.permission
            style="width: 100%"
            placeholder="Please select permission"
            >
            <a-select-option v-for="data in fetched_permissions" :key="data.permissionId">
              {{data.permissionName}}
            </a-select-option>
          </a-select>
          <span v-if="isPerm" class="text-danger">Please select at least one permission</span>
        </div>
      </a-spin>
    </a-modal>
    <!--    edit-->
    <h3 class="tx-center">Roles</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">Add Role</button>
    </div>
    <div v-if="loading">
      <a-spin tip="Fetching roles...">
        <div class="spin-content">
        </div>
      </a-spin>
    </div>
    <div v-else>
      <table class="the-table table">
        <thead class="thead-dark">
        <tr>
          <th scope="col">Role Code</th>
          <th scope="col">Role Name</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody v-for="item in roles">
        <tr>
          <td>{{ item.groupCode }}</td>
          <td>{{ item.groupName }}</td>
          <td>
            <a-button class="action-btns" shape="circle" @click="viewDetails(item.groupCode)"
                      icon="eye"/>
            <a-button class="action-btns sec-color" type="success" shape="circle"
                      @click="showEditModal(item)"
                      icon="edit"/>
            <a-button class="action-btns" type="danger" shape="circle" icon="delete"
                      @click="showDeleteConfirm(item.groupCode)"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import vueTableMixin from '../../mixins/vuetable_mixin'
import {Alert, Modal, Spin, Input, notification, Select} from 'ant-design-vue'
import router from '../../../router'
import {API} from '../../../api'

export default {
  mixins: [vueTableMixin],
  name: 'Role',
  components: {
    'a-modal': Modal,
    'a-alert': Alert,
    'a-spin': Spin,
    'a-input': Input,
    'a-select': Select,
    'a-select-option': Select.Option,
  },
  data() {
    return {
      loading: true,
      spinning: false,
      spinning_e: false,
      feedback: '',
      feedback_two: '',
      isCode: false,
      isName: false,
      isPerm: false,
      roles: [],
      fetched_permissions: [],
      form: {
        groupCode: '', groupName: '', permission: []
      },
      formEdit: {},
      visible: false,
      show_modal_edit: false,
      show_modal: false,
    }
  },
  mounted() {
    this.getPermissions()
    this.getRoles()
  },
  methods: {
    handleChange () {
    },
    getPermissions() {
      API.get('api/usermanagement/v1/permissions')
        .then(response => {
          this.fetched_permissions = response.data
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          console.log(e)
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
          console.log(e)
        })
    },
    viewDetails(id) {
      router.push('/roles/' + id)
    },
    showEditModal(item) {
      this.formEdit.permission = []
      this.show_modal_edit = true
      this.formEdit.groupName = item.groupName
      this.formEdit.groupCode = item.groupCode
      const permissions = item.permissions
      let arr = [];
      let len = permissions.length;
      for (let i = 0; i < len; i++) {
        arr.push(permissions[i].permissionId);
      }
      for(let i=0;i<arr.length;i++){
        this.formEdit.permission[i]=arr[i];
      }
    },
    showModal() {
      this.show_modal = true
    },
    createRole() {
      this.feedback = '';
      (this.form.groupCode === '') ? this.isCode = true : this.isCode = false;
      (this.form.groupName === '') ? this.isName = true : this.isName = false;
      (this.form.permission.length === 0 ) ? this.isPerm = true : this.isPerm = false;
      if (!(this.isName || this.isCode || this.isPerm)) {
        let arr = [];
        let len = this.form.permission.length;
        console.log(len)
        for (let i = 0; i < len; i++) {
          arr.push({
            permissionId: this.form.permission[i],
          });
        }
        this.form.permissions = []
        for(let i=0;i<arr.length;i++){
          this.form.permissions[i]=arr[i];
        }
        this.confirmCreateRole();
      }

    },
    confirmCreateRole() {
      this.spinning = true
      this.form.permission = []
      API.post('api/usermanagement/v1/userGroups', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Role saved successfully.'
            })
          }
          this.roles.push(this.form)
          this.spinning = false
          this.show_modal = false
        })
        .catch(error => {
          this.spinning = false
          this.feedback = error.response.data.message
        })
    },
    editRole() {
      this.spinning_e = true
      let arr = [];
      let len = this.formEdit.permission.length;
      console.log(len)
      for (let i = 0; i < len; i++) {
        arr.push({
          permissionId: this.formEdit.permission[i],
        });
      }
      this.formEdit.permissions = []
      for(let i=0;i<arr.length;i++){
        this.formEdit.permissions[i]=arr[i];
      }
      API.put(`api/usermanagement/v1/userGroups/${this.formEdit.groupCode}`, this.formEdit)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Role edited successfully.'
            })
            this.show_modal_edit = false
            this.spinning_e = false
          }
        })
        .catch(error => {
          console.log(error.response)
          this.spinning_e = false
          this.feedback_two = error.response.data.message
        })
    },
    showDeleteConfirm(id) {
      this.$confirm({
        title: 'Are you sure delete this department?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          API.delete(`api/usermanagement/v1/userGroups/${id}`)
            .then(res => {
              if (res.status === 201) {
                notification.success({
                  message: 'Role deleted successfully'
                })
              }
            })
            .catch(error => {
              console.log(error.response)
              notification.error({
                message: 'Oops, an error occurred while deleting the department. Try again'
              })
            })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
  }
}
</script>

<style scoped>
.the-table thead tr th {
  border: none;
}

.the-table thead tr th:first-child {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.the-table thead tr th:last-child {
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}

.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  height: 300px;
  padding: 30px;
}
</style>
