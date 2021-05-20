<template>
  <div>
<!--add-->
    <a-modal v-model="show_modal"
             title="Add Department"
             okType="primary" ok-text="Add Department" cancel-text="close" @ok="createDepartment">
      <label for="code">Department Code</label>
      <input class="form-input" type="text" v-model="form.code" id="code">
      <label for="name">Department Name</label>
      <input class="form-input" type="text" v-model="form.name" id="name">
    </a-modal>
<!--edit-->
    <a-modal v-model="show_modal_edit"
             title="Edit Department"
             okType="primary" ok-text="Edit Department" cancel-text="close" @ok="editDepartment">
      <label for="edit_code">Department Code</label>
      <input class="form-input" type="text" v-model="formEdit.code" id="edit_code">
      <label for="name">Department Name</label>
      <input class="form-input" type="text" v-model="formEdit.name" id="edit_name">
    </a-modal>
<!--    edit-->
    <h3 class="tx-center">Departments</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">Add Department</button>
      <search-bar :search-label='"Search department ..."'></search-bar>
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
import bodyScroll from 'body-scroll-freezer'
import { Modal, notification } from 'ant-design-vue'
import router from '../../../router'

export default {
  mixins: [vueTableMixin],
  name: 'Department',
  components: {
    'a-modal': Modal
  },
  data () {
    return {
      fields: [
        { name: 'name', sortField: 'name', title: 'Department Name' },
        { name: 'nickname', title: 'Department Code' },
        { name: '__slot:action', title: 'Action' }
      ],
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
    bodyScroll.init()
  },
  methods: {
    viewDetails (id) {
      router.push('/departments/' + id)
    },
    showEditModal (data) {
      this.formEdit.name = data.name
      this.formEdit.code = data.nickname
      this.show_modal_edit = true
    },
    showModal () {
      this.show_modal = true
    },
    createDepartment () {
      this.show_modal = false
    },
    editDepartment () {
      this.show_modal_edit = false
    },
    showDeleteConfirm (id) {
      this.$confirm({
        title: 'Are you sure delete this department?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          notification.success({
            message: id + 'Department deleted successfully'
          })
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    beforeOpen () {
      bodyScroll.freeze()
    },
    beforeClose () {
      bodyScroll.unfreeze()
    }
  }
}
</script>
