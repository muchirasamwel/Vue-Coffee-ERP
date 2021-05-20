<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal" centered title="Add Farmer" on-ok="createDepartment">
      <label for="name">Farmer Name</label>
      <input class="form-input" type="text" v-model="form.name" id="name">
      <label for="location">Location</label>
      <input class="form-input" type="text" v-model="form.location" id="location">
      <label for="person_name">Contact Person Name</label>
      <input class="form-input" type="text" v-model="form.contactPersonName" id="person_name">
      <label for="person_phone">Contact Person Name</label>
      <input class="form-input" type="text" v-model="form.contactPersonPhone" id="person_phone">
      <label for="officer">Field Officer</label>
      <input class="form-input" type="text" v-model="form.fieldOfficer" id="officer">
      <label for="officer_phone">Field Officer Phone</label>
      <input class="form-input" type="text" v-model="form.fieldOfficerPhone" id="officer_phone">
      <label for="manager">Manager</label>
      <input class="form-input" type="text" v-model="form.manager" id="manager">
      <template slot="footer">
        <a-button key="back" @click="handleCancel('add')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createCooperative">
          Add Farmer
        </a-button>
      </template>
    </a-modal>
    <!--    add-->
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             title="Edit Farmer"
             okType="primary" ok-text="Edit Farmer" cancel-text="close" @ok="editDepartment">
      <label for="e-name">Farmer Name</label>
      <input class="form-input" type="text" v-model="formEdit.name" id="e-name">
      <label for="e-location">Location</label>
      <input class="form-input" type="text" v-model="formEdit.location" id="e-location">
      <label for="e-person_name">Contact Person Name</label>
      <input class="form-input" type="text" v-model="formEdit.contactPersonName" id="e-person_name">
      <label for="e-person_phone">Contact Person Phone</label>
      <input class="form-input" type="text" v-model="formEdit.contactPersonPhone" id="e-person_phone">
      <label for="e-officer">Field Officer</label>
      <input class="form-input" type="text" v-model="formEdit.fieldOfficer" id="e-officer">
      <label for="e-officer_phone">Field Officer Phone</label>
      <input class="form-input" type="text" v-model="formEdit.fieldOfficerPhone" id="e-officer_phone">
      <label for="e-manager">Manager</label>
      <input class="form-input" type="text" v-model="formEdit.manager" id="e-manager">
      <template slot="footer">
        <a-button key="back" @click="handleCancel('edit')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="edit_loading" @click="editDepartment">
          Edit Farmer
        </a-button>
      </template>
    </a-modal>
    <!--    edit-->
    <h3 class="tx-center">Farmers</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal"><a-icon type="plus" /> Add Farmer</button>
      <search-bar :search-label='"Search Farmer ..."'></search-bar>
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
import vueTableMixin from '../mixins/vuetable_mixin'
import { Modal, Icon, notification } from 'ant-design-vue'
import router from '../../router'

export default {
  mixins: [vueTableMixin],
  name: 'Farmer',
  components: {
    'a-modal': Modal,
    'a-icon': Icon
  },
  data () {
    return {
      fields: [
        { name: 'name', sortField: 'name' },
        { name: 'email', title: 'Email' },
        { name: 'nickname', title: 'Nickname' },
        { name: 'salary', title: 'Amount' },
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
      router.push('/farmers/' + id)
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
        title: 'Are you sure delete this Farmer?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          notification.success({
            message: id + 'Farmer deleted successfully'
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
