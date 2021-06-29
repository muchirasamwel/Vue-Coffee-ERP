<template xmlns="http://www.w3.org/1999/html">
  <div>
    <!--add-->
    <a-modal v-model="show_modal" centered width="950px" title="Add User" on-ok="createUser">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <div class="row form-content">
        <div class="col-md-4">
          <label for="f-name">First Name <span>*</span></label>
          <input class="form-input" type="text" v-model="form.firstName" id="f-name">
          <label for="m-name">Middle Name</label>
          <input class="form-input" type="text" v-model="form.middleName" id="m-name">
          <label for="l-name">Last Name <span>*</span></label>
          <input class="form-input" type="text" v-model="form.lastName" id="l-name">
          <label for="idn">ID Number <span>*</span></label>
          <input class="form-input" type="number" v-model="form.IDNumber" id="idn">
          <label for="pn">Phone Number <span>*</span></label>
          <input class="form-input" type="number" v-model="form.phoneNo" id="pn">
        </div>
        <div class="col-md-4">
          <label for="email">Email</label>
          <input class="form-input" type="text" v-model="form.email" id="email">
          <label for="address">Address</label>
          <input class="form-input" type="text" v-model="form.address" id="address">
          <label>Branch Code</label>
          <a-select v-model="form.branchCode" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="branch in branches" :key="branch.branchCode">
              {{ branch.branchName }}
            </a-select-option>
          </a-select>
          <label>Department Code</label>
          <a-select v-model="form.deptCode" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="dept in departments" :key="dept.deptCode">
              {{ dept.deptName }}
            </a-select-option>
          </a-select>
          <label>Password <span>*</span></label>
          <a-input-password v-model="form.password" allow-clear placeholder="Enter password"/>
        </div>
        <div class="col-md-4">
          <label>Select User Group</label>
          <a-select @change="handleRoles" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="role in roles" :key="role.groupCode">
              {{ role.groupName }}
            </a-select-option>
          </a-select>
          <p><b>Selected user groups</b></p>
          <div class="custom-container">
            <div v-if="selectedRoles.length === 0" class="item-container my-2">
              <div>
                No user group selected
              </div>
            </div>
            <div v-else v-for="item in selectedRoles" class="item-container my-2">
              <div>
                {{ item.groupName }}
              </div>
              <div class="item-icon pointer-hand" @click="removeRoleFromList(item)">
                <img src="../../../assets/icons/delete.svg" alt="" width="20px">
              </div>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="handleCancel('add')">
          Cancel
        </a-button>
        <a-tooltip v-if="!canAddUser" placement="leftTop">
          <template slot="title">
            <span>Fill all required fields</span>
          </template>
          <a-button key="submit" type="primary" style="margin-left: 10px" :disabled="true">
            Add User
          </a-button>
        </a-tooltip>
        <a-button key="submit" type="primary" v-if="canAddUser" :loading="addingUsers" @click="createUser">
          Add User
        </a-button>
      </template>
    </a-modal>
    <!--    add-->

    <!--    edit user-->
    <a-modal v-model="show_modal_edit" centered width="900px" title="Edit User"
             on-ok="createDepartment">
      <div>
        <a-alert v-if="feedback_two !== ''" type="error" :message=feedback_two banner/>
      </div>
      <div class="row">
        <div class="col-md-4">
          <label for="ef-name">First Name</label>
          <input class="form-input" type="text" v-model="formEdit.firstName" id="ef-name">
          <label for="em-name">Middle Name</label>
          <input class="form-input" type="text" v-model="formEdit.middleName" id="em-name">
          <label for="el-name">Last Name </label>
          <input class="form-input" type="text" v-model="formEdit.lastName" id="el-name">
          <label for="eidn">ID Number </label>
          <input class="form-input" type="number" v-model="formEdit.IDNumber" id="eidn">
          <label for="epn">Phone Number </label>
          <input class="form-input" type="number" v-model="formEdit.phoneNo" id="epn">
        </div>
        <div class="col-md-4">
          <label for="eemail">Email</label>
          <input class="form-input" type="text" v-model="formEdit.email" id="eemail">
          <label for="eaddress">Address</label>
          <input class="form-input" type="text" v-model="formEdit.address" id="eaddress">
          <label>Branch Code</label>
          <a-select v-model="formEdit.branchCode" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="branch in branches" :key="branch.branchCode">
              {{ branch.branchName }}
            </a-select-option>
          </a-select>
          <label>Department Code</label>
          <a-select v-model="formEdit.deptCode" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="dept in departments" :key="dept.deptCode">
              {{ dept.deptName }}
            </a-select-option>
          </a-select>
          <label>Select User Group</label>
          <a-select @change="handleUserRoles" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="role in userRolesData" :key="role.groupCode">
              {{ role.groupName }}
            </a-select-option>
          </a-select>
        </div>
        <div class="col-md-4">
          <p><b>Selected user groups</b></p>
          <div class="custom-container">
            <div v-if="userRoles.length === 0" class="item-container my-2">
              <div>
                No user group selected
              </div>
            </div>
            <div v-else v-for="item in userRoles" class="item-container my-2">
              <div>
                {{ item.groupName }}
              </div>
              <div class="item-icon pointer-hand" @click="removeUserRoleFromList(item)">
                <img src="../../../assets/icons/delete.svg" alt="" width="20px">
              </div>
            </div>
          </div>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="handleCancel('edit')">
          Cancel
        </a-button>
        <a-tooltip v-if="!canEditUser" placement="leftTop">
          <template slot="title">
            <span>Fill all required fields</span>
          </template>
          <a-button key="submit" type="primary" style="margin-left: 10px" :disabled="true">
            Edit User
          </a-button>
        </a-tooltip>
        <a-button key="submit" type="primary" v-if="canEditUser" :loading="edit_loading" @click="editUser">
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
      <div v-if="fetchingUsers">
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
              <label class="status_approved" v-if="props.rowData.status === 'Active'">
                active
              </label>
              <label class="status_rejected" v-else>
                inactive
              </label>
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
import {Modal, Icon, notification, Alert, Tag, Spin, Select, Tooltip, Input} from 'ant-design-vue'
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
    'a-tag': Tag,
    'a-select': Select,
    'a-tooltip': Tooltip,
    'a-select-option': Select.Option,
    'a-input-password': Input.Password
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
      addingUsers: false,
      fetchingUsers: false,
      form: {
        phoneNo: '', firstName: '', lastName: '', IDNumber: '', password: ''
      },
      formEdit: {},
      show_modal_edit: false,
      show_modal: false,
      users: [],
      selectedRoles: [],
      userRoles: [],
      userRolesData: [],
      itemsPerPage: 0,
      roles: [],
      feedback: '',
      feedback_two: ''
    }
  },
  computed: {
    canAddUser() {
      return this.confirmAddUser()
    },
    canEditUser() {
      return this.confirmEditUser()
    },
    ...mapGetters({
      branches: 'branches',
      departments: 'departments'
    })
  },
  mounted() {
    this.itemsPerPage = 10
    this.getRoles()
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
    confirmEditUser() {
      return this.formEdit.phoneNo !== '' && this.formEdit.firstName !== '' &&
        this.formEdit.lastName !== '' && this.formEdit.IDNumber !== '' &&
        this.formEdit.password !== '' && this.userRoles.length !== 0
    },
    confirmAddUser() {
      return this.form.phoneNo !== '' && this.form.firstName !== '' &&
        this.form.lastName !== '' && this.form.IDNumber !== '' &&
        this.form.password !== '' && this.selectedRoles.length !== 0
    },
    removeUserRoleFromList(role) {
      let data = this.userRoles;
      _.remove(data, {groupCode: role.groupCode})
      this.userRolesData.push(role)
    },
    handleUserRoles(value) {
      let data = this.userRolesData;
      let role = _.find(data, {groupCode: value});
      this.userRoles.push(role);
      _.remove(data, {groupCode: value})
    },
    removeRoleFromList(role) {
      let data = this.selectedRoles;
      _.remove(data, {groupCode: role.groupCode})
      this.roles.push(role)
    },
    handleRoles(value) {
      let data = this.roles;
      let role = _.find(data, {groupCode: value});
      this.selectedRoles.push(role);
      _.remove(data, {groupCode: value})
    },
    getRoles() {
      API.get('api/usermanagement/v1/userGroups')
        .then(response => {
          this.roles = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    getUsers() {
      this.fetchingUsers = true
      API.get('api/usermanagement/v1/users')
        .then(response => {
          this.users = response.data.content
          this.fetchingUsers = false;
        })
        .catch(e => {
          this.fetchingUsers = false;
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
      this.userRoles = data.userGroups;
      this.userRolesData = _.differenceBy(this.roles, this.userRoles, 'groupCode')
      this.formEdit.userId = data.userId
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
    createUser() {
      this.addingUsers = true
      let arr = [];
      let len = this.selectedRoles.length;
      for (let i = 0; i < len; i++) {
        arr.push({
          groupCode: this.selectedRoles[i].groupCode,
        });
      }
      this.form.userGroups = []
      for (let i = 0; i < arr.length; i++) {
        this.form.userGroups[i] = arr[i];
      }
      API.post('api/usermanagement/v1/users', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'User created successfully.'
            })
          }
          this.addingUsers = false
          this.show_modal = false
        })
        .catch(error => {
          console.log(error.response)
          this.addingUsers = false
          this.feedback = error.response.data.message
          this.show_modal = false
        })

    },
    editUser() {
      this.edit_loading = true
      let arr = [];
      let len = this.userRoles.length;
      for (let i = 0; i < len; i++) {
        arr.push({
          groupCode: this.userRoles[i].groupCode,
        });
      }
      this.formEdit.userGroups = []
      for (let i = 0; i < arr.length; i++) {
        this.formEdit.userGroups[i] = arr[i];
      }
      if (this.canEditUser) {
        API.put(`api/usermanagement/v1/users/${this.formEdit.userId}`, this.formEdit)
          .then(response => {
            if (response.data.status === 0) {
              notification.success({
                message: 'User edited successfully.'
              })
              this.show_modal_edit = false
              this.edit_loading = false
            }
          })
          .catch(error => {
            this.edit_loading = false
            this.feedback_two = error.response.data.message
          })
      } else {
        this.feedback_two = "Fill all the required fields"
      }
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

.form-content span {
  color: red;
}
</style>

