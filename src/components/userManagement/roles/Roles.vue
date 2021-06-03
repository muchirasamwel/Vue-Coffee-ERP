<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal" width="700px" centered
             title="Add Role"
             okType="primary" ok-text="Add Role" cancel-text="close" @ok="createRole">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <a-spin tip="Submitting..." :spinning="spinning">
        <div class="row">
          <div class="col-md-6">
            <div>
              <label for="code">Role Code</label>
              <input class="form-input" id="code" type="text" v-model="form.groupCode">
              <span v-if="isCode" class="text-danger">Please provide group code</span>
            </div>
            <div>
              <label for="name">Role Name</label>
              <input class="form-input" id="name" type="text" v-model="form.groupName">
              <span v-if="isName" class="text-danger">Please provide group name</span>
            </div>
            <div>
              <label for="permissions">Select Permissions</label><br>
              <select
                id="permissions"
                style="width: 100%"
                class="form-input"
                v-model="selectedPermission"
                @change="onChange">
                <option v-for="data in fetched_permissions" :value="data.permissionId">
                  {{ data.permissionName }}
                </option>
              </select>
              <span v-if="isPerm" class="text-danger">Please select atleast one permission</span>
            </div>
          </div>
          <div class="col-md-6">
            <p><b>Selected permissions</b></p>
            <div class="custom-container">

              <div v-if="selectedPermissions.length < 1" class="item-container my-2">
                <div>
                  No permission selected
                </div>
              </div>
              <div v-else v-for="item in selectedPermissions" class="item-container my-2">
                <div>
                  {{ item.permissionName }}
                </div>
                <div class="item-icon pointer-hand" @click="removePermission(item.permissionId)">
                  <img src="../../../assets/icons/delete.svg" alt="" width="20px">
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-spin>
    </a-modal>
    <!--edit-->
    <a-modal v-model="show_modal_edit" width="700px" centered
             title="Edit Role"
             okType="primary" ok-text="Edit Role" cancel-text="close" @ok="editRole">
      <a-alert v-if="feedback_two !== ''" type="error" :message=feedback_two banner/>
      <a-spin tip="Submitting..." :spinning="spinning_e">
        <div class="row">
          <div class="col-md-6">
            <div>
              <label for="e-code">Role Code</label>
              <input class="form-input" id="e-code" type="text" v-model="formEdit.groupCode">
            </div>
            <div>
              <label for="e-name">Role Name</label>
              <input class="form-input" id="e-name" type="text" v-model="formEdit.groupName">
            </div>
            <div>
              <label for="e-permissions">Assigned Permissions</label><br>
              <select
                id="e-permissions"
                style="width: 100%"
                class="form-input"
                v-model="editSelectedPermission"
                @change="onChangeEdit">
                <option v-for="data in  edit_permissions" :value="data.permissionId">
                  {{ data.permissionName }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <p><b>Selected permissions</b></p>
            <div class="custom-container">

              <div v-if="userPermissions.length < 1" class="item-container my-2">
                <div>
                  No permission selected
                </div>
              </div>
              <div v-else v-for="item in userPermissions" class="item-container my-2">
                <div>
                  {{ item.permissionName }}
                </div>
                <div class="item-icon pointer-hand" @click="removeAssignedPermission(item.permissionId)">
                  <img src="../../../assets/icons/delete.svg" alt="" width="20px">
                </div>
              </div>
            </div>
          </div>
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
import vueTableMixin from '../../mixins/vuetable_mixin'
import responsiveMixin from '@/components/mixins/responsiveMixin'
import {Alert, Modal, Spin, Input, notification, Select} from 'ant-design-vue'
import router from '../../../router'
import {API} from '../../../api'

export default {
  mixins: [vueTableMixin, responsiveMixin],
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
      itemsPerPage: 0,
      roles: [],
      selectedPermission: '',
      editSelectedPermission: '',
      selectedPermissions: [],
      userPermissions: [],
      fetched_permissions: [],
      edit_permissions: [],
      form: {
        groupCode: '', groupName: '', permission: []
      },
      formEdit: {},
      visible: false,
      show_modal_edit: false,
      show_modal: false,
      showActions: false,
      fields: [
        {
          name: 'groupCode',
          title: 'Role Code'
        },
        {
          name: 'groupName',
          title: 'Role Name'
        },
        {
          name: '__slot:action',
          title: 'Action'
        }
      ],
    }
  },
  mounted() {
    this.getPermissions()
    this.itemsPerPage = 5
  },
  created() {
    this.getRoles()
  },
  methods: {
    removeAssignedPermission(id) {
      let filterValue = this.userPermissions.filter(v => v['permissionId'] === id);
      this. edit_permissions.push(filterValue[0])
      const uniqueData = [...this.edit_permissions.reduce((map, obj) => map.set(obj.permissionId, obj), new Map()).values()];
      this.edit_permissions = [];
      this.edit_permissions = Array.from(uniqueData);
      _.remove(this.userPermissions, function (e) {
        return e.permissionId === id
      });
    },
    removePermission(id) {
      let filterValue = this.selectedPermissions.filter(v => v['permissionId'] === id);
      this.fetched_permissions.push(filterValue[0])
      const uniqueData = [...this.fetched_permissions.reduce((map, obj) => map.set(obj.permissionId, obj), new Map()).values()];
      this.fetched_permissions = [];
      this.fetched_permissions = Array.from(uniqueData);
      _.remove(this.selectedPermissions, function (e) {
        return e.permissionId === id
      });
    },
    onChange() {
      let filterValue = this.fetched_permissions.filter(v => v['permissionId'] === this.selectedPermission);
      let newArray = this.fetched_permissions.filter(x => !this.selectedPermissions.includes(x));
      this.fetched_permissions = [];
      this.fetched_permissions = Array.from(newArray);
      this.selectedPermissions.push(filterValue[0])
    },
    onChangeEdit() {
      let filterValue = this.edit_permissions.filter(v => v['permissionId'] === this.editSelectedPermission);
      let newArray = this.edit_permissions.filter(x => !this.userPermissions.includes(x));
      this. edit_permissions = [];
      this. edit_permissions = Array.from(newArray);
      this.userPermissions.push(filterValue[0])
    },
    dataManager(sortOrder, pagination) {
      if (this.roles.length < 1) return
      let local = this.roles

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
        })
    },
    viewDetails(id) {
      router.push('/roles/' + id.groupCode)
    },
    showEditModal(item) {
      this.edit_permissions = [];
      this.edit_permissions = Array.from(_.difference(this.fetched_permissions, item.permissions));
      this.formEdit.permission = []
      this.show_modal_edit = true
      this.formEdit.groupName = item.groupName
      this.formEdit.groupCode = item.groupCode
      const permissions = item.permissions
      let arr = [];
      let len = permissions.length;
      for (let i = 0; i < len; i++) {
        arr.push(permissions[i]);
      }
      for (let i = 0; i < arr.length; i++) {
        this.userPermissions[i] = arr[i];
      }
    },
    showModal() {
      this.show_modal = true
    },
    createRole() {
      this.feedback = '';
      (this.form.groupCode === '') ? this.isCode = true : this.isCode = false;
      (this.form.groupName === '') ? this.isName = true : this.isName = false;
      (this.selectedPermissions.length === 0) ? this.isPerm = true : this.isPerm = false;
      if (!(this.isName || this.isCode || this.isPerm)) {
        let arr = [];
        let len = this.selectedPermissions.length;
        console.log(len)
        for (let i = 0; i < len; i++) {
          arr.push({
            permissionId: this.selectedPermissions[i].permissionId,
          });
        }
        this.form.permissions = []
        for (let i = 0; i < arr.length; i++) {
          this.form.permissions[i] = arr[i];
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
      let len = this.userPermissions.length;
      console.log(len)
      for (let i = 0; i < len; i++) {
        arr.push({
          permissionId: this.userPermissions[i].permissionId,
        });
      }
      this.formEdit.permissions = []
      for (let i = 0; i < arr.length; i++) {
        this.formEdit.permissions[i] = arr[i];
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
