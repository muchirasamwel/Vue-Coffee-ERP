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
    <!--    show dept details-->
    <a-modal v-model="show_modal_more" centered title="Branch Details">
      <p>Branch Code: <strong>{{ this.branchDetails.branchCode }}</strong></p>
      <p>Branch Name: <strong>{{ this.branchDetails.branchName }}</strong></p>
      <template slot="footer">
        <a-button key="submit" type="primary" @click="show_modal_more = false">
          Close
        </a-button>
      </template>
    </a-modal>
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
      <div>
        <vuetable ref="vuetable"
                  :api-mode="false"
                  :fields="fields"
                  :per-page="itemsPerPage"
                  :data-manager="dataManager"
                  pagination-path="pagination"
                  @vuetable:pagination-data="onPaginationData">
          <template slot="action" slot-scope="props">
            <a-button class="ant-btn ant-btn-sm mb-3" v-if="isSmallDevice" @click="showActions=!showActions">...
            </a-button>
            <div class="table-actions" v-if="!isSmallDevice || showActions">
              <label class="action-btns" @click="viewDetails(props.rowData)">
                <img src="../../../assets/icons/view.svg" alt="" width="30px">
              </label>
              <label class="action-btns" @click="showEditModal(props.rowData)">
                <img src="../../../assets/icons/edit.svg" alt="" width="30px">
              </label>
              <label class="action-btns" @click="showDeleteConfirm(props.rowData)">
                <img src="../../../assets/icons/delete.svg" alt="" width="30px">
              </label>
            </div>
          </template>
        </vuetable>
      </div>
      <div class="pagination-footer">
        <div>
          <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
        </div>
        <div>
          <span>Rows per page</span>
          <select style="background-color: #e3e6eb;outline: none; cursor: pointer ;border: none; border-radius: 9px"
                  v-model="itemsPerPage" @change="changePerPage">
            <option v-for="(option) in itemsPerPageOptions" :key="option" v-bind:value="option">{{ option }}</option>
          </select>
        </div>
        <div>
          <vuetable-pagination ref="pagination"
                               @vuetable-pagination:change-page="onChangePage"
          ></vuetable-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import responsiveMixin from '@/components/mixins/responsiveMixin'
import vueTableMixin from '../../mixins/vuetable_mixin'
import {Alert, Modal, Spin, notification} from 'ant-design-vue'
import {API} from '../../../api'

export default {
  mixins: [vueTableMixin, responsiveMixin],
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
      showActions: false,
      isCode: false,
      isName: false,
      branches: [],
      branchDetails: {
        branchCode: '', branchName: ''
      },
      form: {
        branchCode: '', branchName: ''
      },
      fields: [
        {
          name: 'branchCode',
          title: 'Branch Code'
        },
        {
          name: 'branchName',
          title: 'Branch Name'
        },
        {
          name: '__slot:action',
          title: 'Action'
        }
      ],
      formEdit: {},
      visible: false,
      show_modal_edit: false,
      show_modal: false,
      show_modal_more: false,
    }
  },
  mounted() {
    this.itemsPerPage = 5
  },
  created() {
    this.getBranches()
  },
  methods: {
    dataManager(sortOrder, pagination) {
      if (this.branches.length < 1) return
      let local = this.branches

      if (sortOrder.length > 0) {
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        )
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.itemsPerPage
      )

      const from = pagination.from - 1
      const to = from + this.itemsPerPage

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      }
    },
    getBranches() {
      API.get('api/usermanagement/v1/branches')
        .then(response => {
          this.branches = response.data
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        })
    },
    viewDetails(data) {
      this.branchDetails.branchName = data.branchName;
      this.branchDetails.branchCode= data.branchCode;
      this.show_modal_more = true;
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
        this.getBranches()
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
            this.getBranches()
          }
        })
        .catch(error => {
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
          API.delete(`api/usermanagement/v1/branches/${id.branchCode}`)
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
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  height: 300px;
  padding: 30px;
}
</style>
