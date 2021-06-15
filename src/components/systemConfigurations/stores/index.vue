<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal"
             title="Add Store"
             okType="primary">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <div class="form-content">
        <label for="name">Store Name <span>*</span></label>
        <input class="form-input" type="text" v-model="form.storeName" id="name">
        <label for="floor">No of Floors <span>*</span></label>
        <input class="form-input" type="text" v-model="form.noOfFloor" id="floor">
        <label for="name">Branch Code</label>
        <a-select v-model="form.branchCode" style="width: 100%; margin-bottom: 10px">
          <a-select-option v-for="branch in branches" :key="branch.branchCode">
            {{ branch.branchName }}
          </a-select-option>
        </a-select>
      </div>
      <template slot="footer">
        <a-button key="back" @click="show_modal = false">
          Cancel
        </a-button>
        <a-tooltip v-if="!canAddStore" placement="leftTop">
          <template slot="title">
            <span>Fill all required fields</span>
          </template>
          <a-button key="submit" type="primary" style="margin-left: 10px" :disabled="true">
            Add Store
          </a-button>
        </a-tooltip>
        <a-button key="submit" type="primary" v-if="canAddStore" :loading="spinning" @click="createStore">
          Add Store
        </a-button>
      </template>
    </a-modal>
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             title="Edit Store"
             okType="primary">
      <a-alert v-if="feedback_two !== ''" type="error" :message=feedback_two banner/>
      <div class="form-content">
        <label for="ename">Store Name <span>*</span></label>
        <input class="form-input" type="text" v-model="formEdit.storeName" id="ename">
        <label for="efloor">No of Floors <span>*</span></label>
        <input class="form-input" type="text" v-model="formEdit.noOfFloor" id="efloor">
        <label >Branch Code</label>
        <a-select v-model="formEdit.branchCode" style="width: 100%; margin-bottom: 10px">
          <a-select-option v-for="branch in branches" :key="branch.branchCode">
            {{ branch.branchName }}
          </a-select-option>
        </a-select>
      </div>
      <template slot="footer">
        <a-button key="back" @click="show_modal_edit = false">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="spinning_e" @click="editStore">
          Edit Store
        </a-button>
      </template>
    </a-modal>
    <!--    edit-->
    <!--    show dept details-->
    <a-modal v-model="show_modal_more" centered title="Branch Store Details">
      <p>Store Id: <strong>{{ this.storeDetails.storeId }}</strong></p>
      <p>Store Name: <strong>{{ this.storeDetails.storeName }}</strong></p>
      <p>Branch Code: <strong>{{ this.storeDetails.branchCode }}</strong></p>
      <p>Number of Trees: <strong>{{ this.storeDetails.noOfTrees }}</strong></p>
      <template slot="footer">
        <a-button key="submit" type="primary" @click="show_modal_more = false">
          Close
        </a-button>
      </template>
    </a-modal>
    <h3 class="tx-center">Branch Stores</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">Add Branch Store</button>
    </div>
    <div v-if="loading">
      <a-skeleton/>
      <a-skeleton/>
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
import responsiveMixin from '@/components/mixins/responsiveMixin'
import vueTableMixin from '../../mixins/vuetable_mixin'
import {Alert, Modal, Spin, notification, Skeleton, Collapse, Select} from 'ant-design-vue'
import {API} from '../../../api'
import {mapGetters} from "vuex";

export default {
  mixins: [vueTableMixin, responsiveMixin],
  name: 'BranchStore',
  components: {
    'a-skeleton': Skeleton,
    'a-modal': Modal,
    'a-alert': Alert,
    'a-spin': Spin,
    'a-select': Select,
    'a-select-option': Select.Option

  },
  data() {
    return {
      loading: true,
      spinning: false,
      spinning_e: false,
      feedback: '',
      feedback_two: '',
      showActions: false,
      stores: [],
      storeDetails: {
        branchCode: '', storeId: '', storeName: '', noOfTrees: ''
      },
      form: {
        branchCode: '', storeName: '', noOfTrees: ''
      },
      fields: [
        {
          name: 'storeId',
          title: 'Store Id'
        },
        {
          name: 'storeName',
          title: 'Store Name'
        },
        {
          name: 'noOfFloor',
          title: 'Number of Floor'
        },
        {
          name: 'branchCode',
          title: 'Branch Code'
        },
        {
          name: '__slot:action',
          title: 'Action'
        }
      ],
      formEdit: {},
      show_modal_edit: false,
      show_modal: false,
      show_modal_more: false,
    }
  },
  computed: {
    canAddStore() {
      return this.confirmAddStore()
    },
    ...mapGetters({
      branches: 'branches',
    })
  },
  mounted() {
    this.itemsPerPage = 50
  },
  created() {
    if (this.branches.length === 0) {
      this.$store.commit('FETCH_BRANCHES')
    }
    this.getBranchStores()
  },
  methods: {
    confirmAddStore() {
      return this.form.branchCode !== '' && this.form.storeName !== ''
    },
    dataManager(sortOrder, pagination) {
      if (this.strores.length < 1) return
      let local = this.stores

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
    getBranchStores() {
      API.get('api/weighbridge/v1/store')
        .then(response => {
          this.stores = response.data
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        })
    },
    viewDetails(data) {
      this.storeDetails.storeName = data.storeName;
      this.storeDetails.branchCode = data.branchCode;
      this.storeDetails.storeId = data.storeId;
      this.storeDetails.noOfTrees = data.noOfTrees;
      this.show_modal_more = true;
    },
    showEditModal(data) {
      this.show_modal_edit = true
      this.formEdit.storeName = data.storeName;
      this.formEdit.branchCode = data.branchCode;
      this.formEdit.storeId = data.storeId;
      this.formEdit.noOfTrees = data.noOfTrees;
    },
    showModal() {
      this.show_modal = true
    },
    createStore() {
      this.feedback = '';
      this.spinning = true
      API.post('api/weighbridge/v1/store', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Branch store saved successfully.'
            })
          }
          this.spinning = false
          this.show_modal = false
        })
        .catch(error => {
          this.spinning = false
          this.feedback = error.response.data.message
        })
    },
    editStore() {
      this.spinning_e = true
      API.put(`api/weighbridge/v1/store/${this.formEdit.storeId}`, this.formEdit)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Branch store edited successfully.'
            })
            this.show_modal_edit = false
            this.spinning_e = false
          }
        })
        .catch(error => {
          this.spinning_e = false
          this.feedback_two = error.response.data.message
        })
    },
  }
}
</script>

<style scoped>
.form-content span {
  color: red;
}
</style>
