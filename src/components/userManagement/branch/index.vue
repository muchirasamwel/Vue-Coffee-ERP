<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal"
             title="Add Branch"
             okType="primary" ok-text="Add Branch" cancel-text="close" @ok="createBranch">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <a-spin tip="Submitting..." :spinning="spinning">
        <div>
          <label for="code">Branch Code</label>
          <input class="form-input" type="text" v-model="form.branchCode" id="code">
          <span v-if="isCode" class="text-danger">Please provide branch code</span>
        </div>
        <div>
          <label for="name">Branch Name</label>
          <input class="form-input" type="text" required v-model="form.branchName" id="name">
          <span v-if="isName" class="text-danger">Please provide branch name</span>
        </div>
      </a-spin>
    </a-modal>
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             title="Edit Branch"
             okType="primary" ok-text="Edit Branch" cancel-text="close" @ok="editBranch">
      <a-alert v-if="feedback_two !== ''" type="error" :message=feedback_two banner/>
      <a-spin tip="Submitting..." :spinning="spinning_e">
        <label for="edit_code">Branch Code</label>
        <input class="form-input" type="text" v-model="formEdit.branchCode" id="edit_code">
        <label for="name">Branch Name</label>
        <input class="form-input" type="text" v-model="formEdit.branchName" id="edit_name">
      </a-spin>
    </a-modal>
    <!--    edit-->
    <h3 class="tx-center">Branches</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">Add Branch</button>
    </div>
    <div v-if="loading">
      <a-spin tip="Fetching branches...">
        <div class="spin-content">
        </div>
      </a-spin>
    </div>
    <div v-else>
      <table class="the-table table">
        <thead class="thead-dark">
        <tr>
          <th scope="col">Branch Code</th>
          <th scope="col">Branch Name</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody v-for="item in branches">
        <tr>
          <td>{{ item.branchCode }}</td>
          <td>{{ item.branchName }}</td>
          <td>
            <a-button class="action-btns" shape="circle" @click="viewDetails(item.branchCode)"
                      icon="eye"/>
            <a-button class="action-btns sec-color" type="success" shape="circle"
                      @click="showEditModal(item)"
                      icon="edit"/>
            <a-button class="action-btns" type="danger" shape="circle" icon="delete"
                      @click="showDeleteConfirm(item.branchCode)"/>
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
  name: 'Branch',
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
      isCode: false,
      isName: false,
      branches: [],
      form: {
        branchCode: '', branchName: ''
      },
      formEdit: {},
      visible: false,
      show_modal_edit: false,
      show_modal: false,
    }
  },
  mounted() {
    this.getBranches()
  },
  methods: {
    getBranches() {
      API.get('api/usermanagement/v1/branches')
        .then(response => {
          this.branches = response.data
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          console.log(e)
        })
    },
    viewDetails(id) {
      router.push('/branches/' + id)
    },
    showEditModal(item) {
      this.show_modal_edit = true
      this.formEdit.branchName = item.branchName
      this.formEdit.branchCode = item.branchCode
    },
    showModal() {
      this.show_modal = true
    },
    createBranch() {
      this.feedback = '';
      (this.form.branchCode === '') ? this.isCode = true : this.isCode = false;
      (this.form.branchName === '') ? this.isName = true : this.isName = false;
      if (!(this.isName || this.isCode)) {
        this.confirmCreateDepartment();
      }

    },
    confirmCreateDepartment() {
      this.spinning = true
      API.post('api/usermanagement/v1/branches', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Branch saved successfully.'
            })
          }
          this.branches.push(this.form)
          this.spinning = false
          this.show_modal = false
        })
        .catch(error => {
          this.spinning = false
          this.feedback = error.response.data.message
        })
    },
    editBranch() {
      this.spinning_e = true
      API.put(`api/usermanagement/v1/branches/${this.formEdit.branchCode}`, this.formEdit)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Branch edited successfully.'
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
          API.delete(`api/usermanagement/v1/branches/${id}`)
            .then(res => {
                notification.success({
                  message: 'Branch deleted successfully'
                })
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
