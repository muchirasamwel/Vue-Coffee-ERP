<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal"
             title="Add Permission"
             okType="primary" ok-text="Add Permission" cancel-text="close" @ok="createPermission">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <a-spin tip="Submitting..." :spinning="spinning">
        <div>
          <label for="name">Permission Name</label>
          <input class="form-input" type="text" required v-model="form.permissionName" id="name">
          <span v-if="isName" class="text-danger">Please provide permission name</span>
        </div>
      </a-spin>
    </a-modal>
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             title="Edit Permisssion"
             okType="primary" ok-text="Edit Permission" cancel-text="close" @ok="editPermission">
      <a-alert v-if="feedback_two !== ''" type="error" :message=feedback_two banner/>
      <a-spin tip="Submitting..." :spinning="spinning_e">
        <label for="name">Permission Name</label>
        <input class="form-input" type="text" v-model="formEdit.permissionName" id="edit_name">
      </a-spin>
    </a-modal>
    <!--    edit-->
    <h3 class="tx-center">Permissions</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">Add Permission</button>
    </div>
    <div v-if="loading">
      <a-spin tip="Fetching permissions...">
        <div class="spin-content">
        </div>
      </a-spin>
    </div>
    <div v-else>
      <table class="the-table table">
        <thead class="thead-dark">
        <tr>
          <th scope="col">Permission ID</th>
          <th scope="col">Permission Name</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody v-for="item in permissions">
        <tr>
          <td>{{ item.permissionId }}</td>
          <td>{{ item.permissionName }}</td>
          <td>
            <a-button class="action-btns" shape="circle" @click="viewDetails(item.permissionId)"
                      icon="eye"/>
            <a-button class="action-btns sec-color" type="success" shape="circle"
                      @click="showEditModal(item)"
                      icon="edit"/>
            <a-button class="action-btns" type="danger" shape="circle" icon="delete"
                      @click="showDeleteConfirm(item.permissionId)"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import vueTableMixin from '../../mixins/vuetable_mixin'
import {Alert, Modal, Spin, notification} from 'ant-design-vue'
import router from '../../../router'
import {API} from '../../../api'

export default {
  mixins: [vueTableMixin],
  name: 'Permission',
  components: {
    'a-modal': Modal,
    'a-alert': Alert,
    'a-spin': Spin
  },
  data() {
    return {
      loading: true,
      spinning: false,
      spinning_e: false,
      feedback: '',
      feedback_two: '',
      isName: false,
      permissions: [],
      form: {
        permissionName: ''
      },
      formEdit: {},
      visible: false,
      show_modal_edit: false,
      show_modal: false,
    }
  },
  mounted() {
    this.getPermissions()
  },
  methods: {
    getPermissions() {
      API.get('api/usermanagement/v1/permissions')
        .then(response => {
          this.permissions = response.data
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          console.log(e)
        })
    },
    viewDetails(id) {
      router.push('/permissions/' + id)
    },
    showEditModal(item) {
      this.show_modal_edit = true
      this.formEdit.permissionName = item.permissionName
      this.formEdit.permissionId = item.permissionId
    },
    showModal() {
      this.show_modal = true
    },
    createPermission() {
      this.feedback = '';
      (this.form.permissionName === '') ? this.isName = true : this.isName = false;
      if (!(this.isName || this.isCode)) {
        this.confirmCreatePermission();
      }

    },
    confirmCreatePermission() {
      this.spinning = true
      API.post('api/usermanagement/v1/permissions', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Permission saved successfully.'
            })
          }
          this.permissions.push(this.form)
          this.spinning = false
          this.show_modal = false
        })
        .catch(error => {
          this.spinning = false
          this.feedback = error.response.data.message
        })
    },
    editPermission() {
      this.spinning_e = true
      API.put(`api/usermanagement/v1/permissions/${this.formEdit.permissionId}`,
        {permissionName: this.formEdit.permissionName})
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Permission edited successfully.'
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
        title: 'Are you sure delete this permission?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          API.delete(`api/usermanagement/v1/permissions/${id}`)
            .then(res => {
              notification.success({
                message: 'Permission deleted successfully'
              })
            })
            .catch(error => {
              console.log(error.response)
              notification.error({
                message: 'Oops, an error occurred while deleting the permission. Try again'
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
