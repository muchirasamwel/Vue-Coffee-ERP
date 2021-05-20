<template>
  <div>
    <div class="navigation-top-bar">
      <div>
        <span onclick="history.back()">&#8592;</span>
      </div>
    </div>
    <div class="view-item-body">
      <div class="item-body">
        <div class="item-tittle">Role Details</div>
        <table class="table table-hover">
          <tbody>
          <tr>
            <td class="bold">
              Role Code
            </td>
            <td>
              R001
            </td>
          </tr>
          <tr>
            <td class="bold">
              Role Name
            </td>
            <td>
              Super Admin
            </td>
          </tr>
          <tr>
            <td class="bold">
              Role Description
            </td>
            <td>
              This is a super admin to handle all the details
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="item-body">
        <div class="item-tittle">Membership</div>
        <p>The following are the members of this role</p>
        <div>
          <div class="search-filter">
            <search-bar :search-label='"Search Role ..."'></search-bar>
          </div>
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
                <option v-for="(option) in itemsPerPageOptions" :key="option" v-bind:value="option">{{
                    option
                  }}
                </option>
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
      <div class="item-body">
        <div class="item-tittle">Permissions</div>
        <p>This role has been assigned the following permissions</p>
        <button class="the-btn sec-color" @click="showModal">
          <a-icon type="plus"/>
          Add Permission to role
        </button>
        <table style="margin-top: 10px" class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Permission ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
         <tr>
           <td>4</td>
           <td>addusers</td>
           <td><a-button @click="showRevokeConfirm(5)" type="danger">Revoke</a-button> </td>
         </tr>
         <tr>
           <td>5</td>
           <td>system:administration</td>
           <td><a-button @click="showRevokeConfirm(5)" type="danger">Revoke</a-button> </td>
         </tr>
         <tr>
           <td>7</td>
           <td>viewactivitylog</td>
           <td><a-button @click="showRevokeConfirm(5)" type="danger">Revoke</a-button> </td>
         </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--    Add Permission to role modal-->
    <a-modal width="90%" v-model="show_modal" centered title="Add Permission to role" on-ok="addPermissionToRole">
      <h1>Some Permissions to add </h1>
      <template slot="footer">
        <a-button key="back" @click="handleCancel('add')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="addPermissionToRole()">
          Add Permission to role
        </a-button>
      </template>
    </a-modal>
    <!--    Add Permission to role modal -->
  </div>
</template>

<script>
import { Modal, Icon, notification } from 'ant-design-vue'
import vueTableMixin from '../../mixins/vuetable_mixin'

export default {
  mixins: [vueTableMixin],
  name: 'role_details',
  components: {
    'a-icon': Icon,
    'a-modal': Modal
  },
  data () {
    return {
      fields: [
        { name: 'id', sortField: 'id', title: 'Member Id' },
        { name: 'nickname', sortField: 'name', title: 'Username' },
        { name: 'name', sortField: 'name', title: 'Name' },
        { name: '__slot:action', title: 'Remove' }
      ],
      tableState: {},
      promise: true,
      itemsPerPage: 0,
      show_modal: false,
      loading: false,
      form: {}
    }
  },
  methods: {
    showModal () {
      this.show_modal = true
    },
    handleCancel () {
      this.show_modal = false
      this.loading = false
    },
    addPermissionToRole () {
      this.loading = true
      this.show_modal = false
    },
    showDeleteConfirm (id) {
      this.$confirm({
        title: 'Are you sure you want to remove user from this Role?',
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
    },
    showRevokeConfirm (id) {
      this.$confirm({
        title: 'Are you sure you want to revoke permission from this Role?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          notification.success({
            message: id + 'Permission revoked successfully'
          })
        },
        onCancel () {
        }
      })
    }
  },
  mounted () {
    this.itemsPerPage = 5
  }
}
</script>

<style scoped lang="sass">
.item-tittle
  font-weight: bold
  font-size: 20px
  padding: 0 10px
  margin-bottom: 20px
  color: #008cff

.search-filter
  display: inline-flex
  float: right
  margin-bottom: 10px

.bold
  font-weight: bold
</style>
