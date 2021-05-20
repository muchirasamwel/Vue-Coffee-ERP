<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal" centered title="Add Role" on-ok="createDepartment">
      <label for="code">Role Code</label>
      <input class="form-input" type="text" v-model="formEdit.code" id="code">
      <label for="name">Role Name</label>
      <input class="form-input" type="text" v-model="formEdit.name" id="name">
      <template slot="footer">
        <a-button key="back" @click="handleCancel('add')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createCooperative">
          Add Role
        </a-button>
      </template>
    </a-modal>
    <!--    add-->
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             title="Edit Role"
             okType="primary" ok-text="Edit Role" cancel-text="close" @ok="editDepartment">
      <label for="e-code">Role Code</label>
      <input class="form-input" type="text" v-model="formEdit.code" id="e-code">
      <label for="e-name">Role Name</label>
      <input class="form-input" type="text" v-model="formEdit.name" id="e-name">
      <template slot="footer">
        <a-button key="back" @click="handleCancel('edit')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="edit_loading" @click="editDepartment">
          Edit Role
        </a-button>
      </template>
    </a-modal>
    <!--    edit-->
    <h3 class="tx-center">Roles</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal"><a-icon type="plus" /> Add Role</button>
      <search-bar :search-label='"Search Role ..."'></search-bar>
    </div>
    <div>
      <div>
        <vuetable ref="vuetable"
                  :api-mode="true"
                  api-url="https://vuetable.ratiw.net/api/users"
                  :fields="fields"
                  pagination-path=""
                  @vuetable:pagination-data="onPaginationData"
                  :append-params="tableState"
                  :per-page="itemsPerPage"
        >
          <template slot="action" slot-scope="props">
            <a-button class="action-btns" shape="circle" @click="viewDetails(props.rowData.id)"
                      icon="eye"/>
            <a-button class="action-btns sec-color" type="success" shape="circle" @click="showEditModal(props.rowData)"
                      icon="edit"/>
            <a-button class="action-btns" type="danger" shape="circle" icon="delete"
                      @click="showDeleteConfirm(props.rowData.id)"/>
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
import { Modal, Icon, notification } from 'ant-design-vue'
import router from '../../../router'

export default {
  mixins: [vueTableMixin],
  name: 'Role',
  components: {
    'a-modal': Modal,
    'a-icon': Icon
  },
  data () {
    return {
      fields: [
        { name: 'id', sortField: 'id', title: 'Role Code' },
        { name: 'name', sortField: 'name', title: 'Role Name' },
        { name: '__slot:action', title: 'Action' }
      ],
      loading: false,
      edit_loading: false,
      form: {},
      formEdit: {},
      visible: false,
      show_modal_edit: false,
      show_modal: false,
      tableState: {},
      promise: true,
      itemsPerPage: 0
    }
  },
  mounted () {
    this.itemsPerPage = 10
  },
  methods: {
    viewDetails (id) {
      router.push('/roles/' + id)
    },
    showEditModal (data) {
      this.formEdit.name = data.name
      this.formEdit.code = data.nickname
      this.show_modal_edit = true
    },
    showModal () {
      this.show_modal = true
    },
    handleCancel (type) {
      if (type === 'edit') {
        this.show_modal_edit = false
      } else {
        this.show_modal = false
      }
    },
    createCooperative () {
      this.loading = true
      this.show_modal = false
    },
    editDepartment () {
      this.edit_loading = true
      this.show_modal_edit = false
    },
    showDeleteConfirm (id) {
      this.$confirm({
        title: 'Are you sure delete this Role?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          notification.success({
            message: id + 'Role deleted successfully'
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
