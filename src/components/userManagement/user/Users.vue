<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal" centered width="900px" title="Add User" on-ok="createDepartment">
      <div class="row">
        <div class="col-md-4">
          <div>
            <label for="f-name">First Name</label>
            <input class="form-input" type="text" v-model="form.firstName" id="f-name">
          </div>
          <div>
            <label for="m-name">Middle Name</label>
            <input class="form-input" type="text" v-model="form.middleName" id="m-name">
          </div>
          <div>
            <label for="l-name">Last Name</label>
            <input class="form-input" type="text" v-model="form.flastName" id="l-name">
          </div>
        </div>
        <div class="col-md-4">
          <div>
            <label for="id-name">ID Number</label>
            <input class="form-input" type="text" v-model="form.IDNumber" id="id-name">
          </div>
          <div>
            <label for="ph-name">Phone No</label>
            <input class="form-input" type="text" v-model="form.phoneNo" id="ph-name">
          </div>
          <div>
            <label for="email">Email</label>
            <input class="form-input" type="text" v-model="form.email" id="email">
          </div>
        </div>
        <div class="col-md-4">
          <div>
            <label for="address">Address</label>
            <input class="form-input" type="text" v-model="form.address" id="address">
          </div>
          <div>
            <label for="l-name">Branch Code</label>
            <select v-model="form.branchCode" class="form-input">
              <option value="null" selected>All Branches</option>
              <option v-for="branch in branches" :value="branch.branchCode" :key="branch.branchCode">
                {{ branch.branchName }}
              </option>
            </select>
          </div>
          <div>
            <label>Department Code</label>
            <select v-model="form.deptCode" class="form-input">
              <option value="null" selected>All Departments</option>
              <option v-for="dept in departments"  :key="dept.deptCode">
                {{ dept.deptName }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="handleCancel('add')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createCooperative">
          Add User
        </a-button>
      </template>
    </a-modal>
    <!--    add-->
    <!--    edit user-->
    <a-modal v-model="show_modal_edit" centered width="900px" title="Edit User"
             on-ok="createDepartment">
      <div class="row">
        <div class="col-md-4">
          <div>
            <label for="e-f-name">First Name</label>
            <input class="form-input" type="text" v-model="formEdit.firstName" id="e-f-name">
          </div>
          <div>
            <label for="e-m-name">Middle Name</label>
            <input class="form-input" type="text" v-model="formEdit.middleName" id="e-m-name">
          </div>
          <div>
            <label for="e-l-name">Last Name</label>
            <input class="form-input" type="text" v-model="formEdit.lastName" id="e-l-name">
          </div>
        </div>
        <div class="col-md-4">
          <div>
            <label for="e-id-name">ID Number</label>
            <input class="form-input" type="text" v-model="formEdit.IDNumber" id="e-id-name">
          </div>
          <div>
            <label for="e-ph-name">Phone No</label>
            <input class="form-input" type="text" v-model="formEdit.phoneNo" id="e-ph-name">
          </div>
          <div>
            <label for="e-email">Email</label>
            <input class="form-input" type="text" v-model="formEdit.email" id="e-email">
          </div>
        </div>
        <div class="col-md-4">
          <div>
            <label for="e-address">Address</label>
            <input class="form-input" type="text" v-model="formEdit.address" id="e-address">
          </div>
          <div>
            <label>Branch Code</label>
            <select v-model="formEdit.branchCode" class="form-input">
              <option value="null" selected>All Branches</option>
              <option v-for="branch in branches"  :key="branch.branchCode">
                {{ branch.branchName }}
              </option>
            </select>
          </div>
          <div>
            <label>Department Code</label>
            <select v-model="formEdit.deptCode" class="form-input">
              <option value="null" selected>All Departments</option>
              <option v-for="dept in departments"  :key="dept.deptCode">
                {{ dept.deptName }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <!--      <div>-->
      <!--        <label for="e-pass">Password</label>-->
      <!--        <input class="form-input" type="password" v-model="formEdit.password" id="e-pass">-->
      <!--      </div>-->
      <template slot="footer">
        <a-button key="back" @click="handleCancel('edit')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createCooperative">
          Edit User
        </a-button>
      </template>
    </a-modal>
    <!--    edit user-->
    <h3 class="tx-center">Users</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">
        <a-icon type="plus"/>
        Add User
      </button>
      <search-bar :search-label='"Search User ..."'></search-bar>
    </div>
    <div>
      <div v-if="loading">
        <a-spin tip="Fetching users...">
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
            <template slot="name" slot-scope="props">
              {{ props.rowData.firstName }} {{ props.rowData.lastName }}
            </template>
            <template slot="status" slot-scope="props">
              <a-tag color="green" v-if="props.rowData.status === 'Active'">
                active
              </a-tag>
              <a-tag color="red" v-else>
                inactive
              </a-tag>
            </template>
            <template slot="action" slot-scope="props">
              <a-button class="ant-btn ant-btn-sm mb-3" v-if="isSmallDevice" @click="showActions=!showActions">...
              </a-button>
              <div class="table-actions" v-if="!isSmallDevice || showActions">
                <label class="action-btns" @click="viewDetails(props.rowData.userId)">
                  <img src="../../../assets/icons/view.svg" alt="" width="30px">
                </label>
                <label class="action-btns" @click="showEditModal(props.rowData)">
                  <img src="../../../assets/icons/edit.svg" alt="" width="30px">
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
  </div>
</template>

<script>
import vueTableMixin from '../../mixins/vuetable_mixin'
import {Modal, Icon, notification, Alert, Tag, Spin} from 'ant-design-vue'
import responsiveMixin from '@/components/mixins/responsiveMixin'
import router from '../../../router'
import {API} from "../../../api";
import {mapGetters} from "vuex";

export default {
  mixins: [vueTableMixin, responsiveMixin],
  name: 'User',
  components: {
    'a-icon': Icon,
    'a-modal': Modal,
    'a-alert': Alert,
    'a-spin': Spin,
    'a-tag': Tag
  },
  data() {
    return {
      showActions: false,
      fields: [
        {name: 'userId', title: 'Id'},
        {name: 'idNumber', title: 'Id Number'},
        {name: '__slot:name', title: 'Name'},
        {name: 'phoneNo', title: 'Phone'},
        {name: 'email', title: 'Email'},
        {name: '__slot:status', title: 'Status'},
        {name: '__slot:action', title: 'Action'}
      ],
      edit_loading: false,
      loading: true,
      spinning: false,
      spinning_e: false,
      form: {},
      formEdit: {},
      visible: false,
      show_modal_edit: false,
      show_modal: false,
      users: [],
      itemsPerPage: 0
    }
  },
  computed: {
    ...mapGetters({
      branches: 'branches',
      departments: 'departments'
    })
  },
  mounted() {
    this.itemsPerPage = 10
  },
  created() {
    if (this.branches.length === 0) {
      this.$store.commit('FETCH_BRANCHES')
    }
    if (this.departments.length === 0) {
      this.$store.commit('FETCH_DEPARTMENTS')
    }
    this.getUsers();
  },
  methods: {
    getUsers() {
      API.get('api/usermanagement/v1/users')
        .then(response => {
          this.users = response.data.content
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          console.log(e)
        })
    },
    dataManager(sortOrder, pagination) {
      if (this.users.length < 1) return
      let local = this.users

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
    viewDetails(id) {
      router.push('/users/' + id)
    },
    showEditModal(data) {
      this.formEdit.firstName = data.firstName
      this.formEdit.lastName = data.lastName
      this.formEdit.middleName = data.middleName
      this.formEdit.phoneNo = data.phoneNo
      this.formEdit.IDNumber = data.idNumber
      this.formEdit.email = data.email
      this.formEdit.IDNumber = data.idNumber
      this.formEdit.branchCode = data.branch.branchCode
      this.formEdit.deptCode = data.department.deptCode
      this.formEdit.address = data.address
      this.show_modal_edit = true
    },
    showModal() {
      this.show_modal = true
    },
    handleCancel(type) {
      if (type === 'edit') {
        this.show_modal_edit = false
      } else {
        this.show_modal = false
      }
    },
    createCooperative() {
      this.loading = true
      this.show_modal = false
    },
    editDepartment() {
      this.edit_loading = true
      this.show_modal_edit = false
    },
    showDeleteConfirm(id) {
      this.$confirm({
        title: 'Are you sure delete this User?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          notification.success({
            message: id + 'User deleted successfully'
          })
        },
        onCancel() {
        }
      })
    }
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
