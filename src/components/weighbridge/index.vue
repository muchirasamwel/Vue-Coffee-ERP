<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal"
             title="Open an Out-Turn"
             okType="primary">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <div class="form-content">
        <div v-if="booking === ''">
        <label for="bookingSlip">Search Booking</label>
        <input class="form-input" type="text" placeholder="Enter booking slip" v-model="bookingSlip" id="bookingSlip">
        </div>
          <div v-if="booking !== ''">
          <label for="outturnNo">Out-Turn No <span>*</span></label>
          <input class="form-input" type="text" v-model="form.outturnNo" id="outturnNo">

          <label for="coffeeType">Coffee Type <span>*</span></label>
          <a-select v-model="deliveredQuantity.coffeeType" style="width: 100%; margin-bottom: 10px">
            <a-select-option id="coffeeType" v-for="coffeeType in coffeeTypes" :key="coffeeType.coffeeType">
              {{ coffeeType.coffeeType }}
            </a-select-option>
          </a-select>
          <label for="season">Delivered No Of Bags <span>*</span></label>
          <input class="form-input" type="number" v-model="deliveredQuantity.noOfBags" id="number">

          <label for="weight">Weight <span>*</span></label>
          <input class="form-input" type="number" v-model="deliveredQuantity.weight" id="weight">

          <label for="season">Season <span>*</span></label>
          <input class="form-input" type="text" v-model="form.season" id="season">

          <label for="remarks">Remarks</label>
          <textarea rows="10" style="min-height: 80px !important;" class="form-input" type="text"
                    v-model="form.remarks" id="remarks"></textarea>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="clearForm">
          Cancel
        </a-button>
          <a-tooltip v-if="!canOpenOutturn && booking !== ''" placement="leftTop">
            <template slot="title">
              <span>Fill all required fields</span>
            </template>
            <a-button key="submit" type="primary" style="margin-left: 10px" :disabled="true">
              Open Out-Turn
            </a-button>
          </a-tooltip>
          <a-button key="submit" type="primary" v-if="canOpenOutturn && booking !== ''" :loading="spinning" @click="openOutturn">
            Open Out-Turn
          </a-button>
        <a-button key="submit" type="primary" v-if="booking === ''" :loading="spinning_b" @click="getBooking">
          Search
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
    <h4 class="tx-center font-weight-light">Coffee Outturn</h4>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">Open Outturn</button>
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
                <img src="../../assets/icons/view.svg" alt="" width="30px">
              </label>
              <label class="action-btns" @click="showEditModal(props.rowData)">
                <img src="../../assets/icons/edit.svg" alt="" width="30px">
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
import vueTableMixin from '../mixins/vuetable_mixin'
import {Alert, Modal, notification, Skeleton, Select, Tooltip} from 'ant-design-vue'
import {API} from '../../api'
import {mapGetters} from "vuex";

export default {
  mixins: [vueTableMixin, responsiveMixin],
  name: 'coffee_weighing',
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
      spinning_b: false,
      bookingSlip: '',
      feedback: '',
      feedback_two: '',
      showActions: false,
      outturn: [],
      weighBridgeDetails: {
        weighBridgeCode: '', weighBridgeName: ''
      },
      deliveredQuantity: {
        coffeeType: '', noOfBags: '', weight: ''
      },
      form: {
        closeOutturn: true, outturnNo: '', season: ''
      },
      fields: [
        {
          name: 'outTurnNo',
          title: 'Out-Turn No'
        },
        {
          name: 'bookingSlipNo',
          title: 'Booking Slip No'
        },
        {
          name: 'seasonYear',
          title: 'Season'
        },
        {
          name: 'overturnStatus',
          title: 'Status'
        },
        {
          name: '__slot:action',
          title: 'Action'
        }
      ],
      booking: '',
      coffeeTypes: [],
      formEdit: {},
      show_modal_edit: false,
      show_modal: false,
      show_modal_more: false,
    }
  },
  computed: {
    canOpenOutturn() {
      return this.confirmOpenOutturn()
    },
  },
  mounted() {
    this.itemsPerPage = 50
  },
  created() {
    this.getOutturn()
  },
  methods: {
    clearForm() {
      this.show_modal = false
      this.booking = ''
      this.form = {}
    },
    getBooking() {
      this.feedback = '';
      this.spinning_b = true
      API.get(`api/booking/v1/coffee/book/filter`, {
        params: {
          slipNo: this.bookingSlip
        }
      })
        .then(response => {
          if (response.status === 200 && response.data !== '') {
            this.booking = response.data
            this.spinning_b = false
            this.coffeeTypes = response.data.expectedQuantity
          } else {
            this.feedback = "Incorrect booking slip. Try again."
          }
        })
        .catch(error => {
          this.spinning_b = false
          this.feedback = error.response.data.message
        })
    },
    confirmOpenOutturn() {
      return this.form.bookingId !== ''
        && this.form.outturnNo !== ''
        && this.form.season !== ''
        && this.deliveredQuantity.coffeeType !== ''
        && this.deliveredQuantity.noOfBags !== ''
        && this.deliveredQuantity.weight !== ''
    },
    dataManager(sortOrder, pagination) {
      if (this.outturn.length < 1) return
      let local = this.outturn

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
    getOutturn() {
      API.get('api/weighbridge/v1/outturn')
        .then(response => {
          this.outturn = response.data.content
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
    openOutturn() {
      this.feedback = '';
      this.spinning = true
      this.form.bookingId = parseInt(this.booking.bookingId, 10)
      this.form.deliveredQuantity = {
        coffeeType: this.deliveredQuantity.coffeeType,
        noOfBags: this.deliveredQuantity.noOfBags,
        weight: this.deliveredQuantity.weight
      }
      API.post('api/weighbridge/v1/outturn/open', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Outturn opened successfully.'
            })
            this.show_modal = false
          } else {
            this.feedback = response.data.message
          }
          this.spinning = false
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
