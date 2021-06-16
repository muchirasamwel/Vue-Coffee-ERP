<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal"
             title="Add WeighBridge"
             okType="primary">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <div class="form-content">
        <label for="name">WeighBridge Name <span>*</span></label>
        <input class="form-input" type="text" v-model="form.name" id="name">
        <label for="floor">WeighBridge Code <span>*</span></label>
        <input class="form-input" type="text" v-model="form.code" id="floor">
      </div>
      <template slot="footer">
        <a-button key="back" @click="show_modal = false">
          Cancel
        </a-button>
        <a-tooltip v-if="!canAddWeighBridge" placement="leftTop">
          <template slot="title">
            <span>Fill all required fields</span>
          </template>
          <a-button key="submit" type="primary" style="margin-left: 10px" :disabled="true">
            Add WeighBridge
          </a-button>
        </a-tooltip>
        <a-button key="submit" type="primary" v-if="canAddWeighBridge" :loading="spinning" @click="createWeighBridge">
          Add WeighBridge
        </a-button>
      </template>
    </a-modal>
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             title="Edit WeighBridge"
             okType="primary">
      <a-alert v-if="feedback_two !== ''" type="error" :message=feedback_two banner/>
      <div class="form-content">
        <label for="ename">WeighBridge Name</label>
        <input class="form-input" type="text" v-model="formEdit.name" id="ename">
        <label for="code">Code</label>
        <input class="form-input" type="text" v-model="formEdit.code" id="code">
      </div>
      <template slot="footer">
        <a-button key="back" @click="show_modal_edit = false">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="spinning_e" @click="editWeighBridge">
          Edit WeighBridge
        </a-button>
      </template>
    </a-modal>
    <!--    edit-->
    <!--    show dept details-->
    <a-modal v-model="show_modal_more" centered title="WeighBridge Details">
      <p>WeighBridge Name: <strong>{{ this.weighBridgeDetails.weighBridgeName }}</strong></p>
      <p>WeighBridge Code: <strong>{{ this.weighBridgeDetails.weighBridgeCode }}</strong></p>
      <template slot="footer">
        <a-button key="submit" type="primary" @click="show_modal_more = false">
          Close
        </a-button>
      </template>
    </a-modal>
    <h3 class="tx-center">WeighBridges</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">Add WeighBridge</button>
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
import {Alert, Modal, notification, Skeleton, Select, Tooltip} from 'ant-design-vue'
import {API} from '../../../api'

export default {
  mixins: [vueTableMixin, responsiveMixin],
  name: 'WeighBridge',
  components: {
    'a-skeleton': Skeleton,
    'a-modal': Modal,
    'a-alert': Alert,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-tooltip': Tooltip

  },
  data() {
    return {
      loading: true,
      spinning: false,
      spinning_e: false,
      feedback: '',
      feedback_two: '',
      showActions: false,
      weighBridge: [],
      weighBridgeDetails: {
        weighBridgeCode: '', weighBridgeName: ''
      },
      form: {
        code: '', name: ''
      },
      fields: [
        {
          name: 'weighBridgeCode',
          title: 'WeighBridge Code'
        },
        {
          name: 'weighBridgeName',
          title: 'WeighBridge Name'
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
    canAddWeighBridge() {
      return this.confirmAddWeighBridge()
    }
  },
  mounted() {
    this.itemsPerPage = 50
  },
  created() {
    this.getWeighBridge()
  },
  methods: {
    confirmAddWeighBridge() {
      return this.form.code !== '' && this.form.name !== ''
    },
    dataManager(sortOrder, pagination) {
      if (this.weighBridge.length < 1) return
      let local = this.weighBridge

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
    getWeighBridge() {
      API.get('api/weighbridge/v1/weighbridges')
        .then(response => {
          this.weighBridge = response.data
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        })
    },
    viewDetails(data) {
      this.weighBridgeDetails.weighBridgeCode = data.weighBridgeCode;
      this.weighBridgeDetails.weighBridgeName = data.weighBridgeName;
      this.show_modal_more = true;
    },
    showEditModal(data) {
      this.show_modal_edit = true
      this.formEdit.code = data.weighBridgeCode;
      this.formEdit.name = data.weighBridgeName;
    },
    showModal() {
      this.show_modal = true
    },
    createWeighBridge() {
      this.feedback = '';
      this.spinning = true
      API.post('api/weighbridge/v1/weighbridges', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'WeighBridge saved successfully.'
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
    editWeighBridge() {
      this.spinning_e = true
      API.put(`api/weighbridge/v1/weighbridges/${this.formEdit.code}`, this.formEdit)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'WeighBridge store edited successfully.'
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
