<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal" centered title="Add Booking" width="700px">
      <div class="row form-content">
        <div class="col-md-6">
          <div class="form-group">
            <label>Booking Slip No <span>*</span></label>
            <input class="form-input" type="text" v-model="form.bookingSlipNo">
            <span v-if="formError.bookingSlipNo" class="mb-2">
            {{ formError.bookingSlipNo }}
          </span>
          </div>
          <div class="form-group">
            <label>Grower Category <span>*</span></label>
            <select v-model="form.growerCategory" class="form-input">
              <option value="FARMER">Farmer</option>
              <option value="COOPERATIVE">Cooperative</option>
            </select>
            <span v-if="formError.growerCategory" class="mb-2">
            {{ formError.growerCategory }}
          </span>
          </div>
          <div class="form-group">
            <label>Grower Code <span>*</span></label>
            <input class="form-input" type="text" v-model="form.growerCode">
            <span v-if="formError.growerCode" class="mb-2">
            {{ formError.growerCode }}
          </span>
          </div>
          <div class="form-group">
            <label>Earliest Expected Date <span>*</span></label>
            <input class="form-input" type="date" v-model="form.earliestExpectedDate">
            <span v-if="formError.earliestExpectedDate" class="mb-2">
            {{ formError.earliestExpectedDate }}
          </span>
          </div>
          <div class="form-group">
            <label>Lastest Expected Date <span>*</span></label>
            <input class="form-input" type="date" v-model="form.lastestExpectedDate">
            <span v-if="formError.lastestExpectedDate" class="mb-2">
            {{ formError.lastestExpectedDate }}
          </span>
          </div>
          <div class="form-group">
            <label>Delivery Mode</label>
            <select v-model="form.deliveryMode" class="form-input">
              <option value="ROAD">Road</option>
              <option value="RAIL">Rail</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Delivery Description</label>
            <textarea cols="10" rows="5" class="form-input" v-model="form.deliveryDescription">
          </textarea>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Receiving Branch <span>*</span></label>
            <select v-model="form.receivingBranchCode" class="form-input">
              <option v-for="branch in branches" :value="branch.branchCode" :key="branch.branchCode">
                {{ branch.branchName }}
              </option>
            </select>
            <span v-if="formError.receivingBranchCode" class="mb-2">
            {{ formError.receivingBranchCode }}
          </span>
          </div>
          <div>
            <h6 class="text-center mb-2">Quantity <span>*</span></h6>
            <label>Coffee Type</label>
            <select v-model="coffee.type" class="form-input">
              <option v-for="type in coffeeTypes" :value="type.coffeeType" :key="type.coffeeType">
                {{ type.coffeeType }}
              </option>
            </select>

            <label>No. of Bags</label>
            <input class="form-input" type="text" v-model="coffee.bags">
            <div class="row d-flex justify-content-end m-2">
              <a-button type="primary" class="float-right" :disabled="!canAddCoffee" @click="addCoffee" :small="true">
                Add Coffee
              </a-button>
            </div>
          </div>
          <div class="my-3">
            <custom-container :type="'coffee-container'" :units="'bags'" @delete="deleteCoffee"></custom-container>
          </div>
          <span v-if="formError.expectedQuantity" class="mb-2">
            {{ formError.expectedQuantity }}
          </span>
        </div>
      </div>

      <template slot="footer">
        <a-button key="back" @click="handleCancel('add')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createBooking" :disabled="!canSave">
          Add Cooperative
        </a-button>
      </template>
    </a-modal>
    <!--    add-->

    <!--edit-->
    <a-modal v-model="show_modal_edit" centered title="Edit Booking" width="700px" v-if="show_modal_edit">
      <div class="row form-content">
        <div class="col-md-6">
          <div class="form-group">
            <label>Booking Slip No <span>*</span></label>
            <input class="form-input" type="text" v-model="selectedBooking.bookingSlipNo">
            <span v-if="formError.bookingSlipNo" class="mb-2">
            {{ formError.bookingSlipNo }}
          </span>
          </div>
          <div class="form-group">
            <label>Grower Category <span>*</span></label>
            <select v-model="selectedBooking.growerCategory" class="form-input">
              <option value="FARMER">Farmer</option>
              <option value="COOPERATIVE">Cooperative</option>
            </select>
            <span v-if="formError.growerCategory" class="mb-2">
            {{ formError.growerCategory }}
          </span>
          </div>
          <div class="form-group">
            <label>Grower Code <span>*</span></label>
            <input class="form-input" type="text" v-model="selectedBooking.growerCode">
            <span v-if="formError.growerCode" class="mb-2">
            {{ formError.growerCode }}
          </span>
          </div>
          <div class="form-group">
            <label>Earliest Expected Date <span>*</span></label>
            <input class="form-input" type="date" v-model="selectedBooking.earliestExpectedDate">
            <span v-if="formError.earliestExpectedDate" class="mb-2">
            {{ formError.earliestExpectedDate }}
          </span>
          </div>
          <div class="form-group">
            <label>Lastest Expected Date <span>*</span></label>
            <input class="form-input" type="date" v-model="selectedBooking.lastestExpectedDate">
            <span v-if="formError.lastestExpectedDate" class="mb-2">
            {{ formError.lastestExpectedDate }}
          </span>
          </div>
          <div class="form-group">
            <label>Delivery Mode</label>
            <select v-model="selectedBooking.deliveryMode" class="form-input">
              <option value="ROAD">Road</option>
              <option value="RAIL">Rail</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Delivery Description</label>
            <textarea cols="10" rows="5" class="form-input" v-model="selectedBooking.deliveryDescription">
          </textarea>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Receiving Branch <span>*</span></label>
            <select v-model="selectedBooking.receivingBranchCode" class="form-input">
              <option v-for="branch in branches" :value="branch.branchCode" :key="branch.branchCode">
                {{ branch.branchName }}
              </option>
            </select>
            <span v-if="formError.receivingBranchCode" class="mb-2">
            {{ formError.receivingBranchCode }}
          </span>
          </div>
          <div>
            <h6 class="text-center mb-2">Quantity <span>*</span></h6>
            <label>Coffee Type</label>
            <select v-model="coffee.type" class="form-input">
              <option v-for="type in coffeeTypes" :value="type.coffeeType" :key="type.coffeeType">
                {{ type.coffeeType }}
              </option>
            </select>

            <label>No. of Bags</label>
            <input class="form-input" type="text" v-model="coffee.bags">
            <div class="row d-flex justify-content-end m-2">
              <a-button type="primary" class="float-right" :disabled="!canAddCoffee" :loading="loading"
                        @click="addCoffee"
                        :small="true">
                Add Coffee
              </a-button>
            </div>
          </div>
          <div class="my-3">
            <custom-container :initialItems="bookedCoffeeTypes" :type="'coffee-container'"
                              :units="'bags'" @delete="deleteCoffee"></custom-container>
          </div>
          <span v-if="formError.expectedQuantity" class="mb-2">
            {{ formError.expectedQuantity }}
          </span>
        </div>
      </div>

      <template slot="footer">
        <a-button key="back" @click="handleCancel('edit')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="edit_loading" @click="editBooking" :disabled="!canEdit"
                  v-if="selectedBooking.status==='PENDING'">
          Edit Booking
        </a-button>
      </template>
    </a-modal>
    <!--    edit-->

    <!--show-->
    <a-modal v-model="show_modal_view" centered title="More Booking Details">
      <div class="">
        <div class="">
          <label>Booking Slip No: <span class="more-info-details">{{ selectedBooking.bookingSlipNo }}</span></label>
        </div>
        <div>
          <label>Receiving Branch Code: <span class="more-info-details">{{ selectedBooking.receivingBranchCode }}</span>
          </label>
        </div>
        <div>
          <label>
            Grower Category: <span class="more-info-details">{{ selectedBooking.growerCategory }}</span>
          </label>
        </div>
        <div>
          <label>
            Grower Code: <span class="more-info-details">{{ selectedBooking.growerCode }}</span>
          </label>
        </div>
        <div>
          <label>
            Status: <span class="more-info-details"
                          :class="{'status_approved':selectedBooking.status==='APPROVED','status_rejected':selectedBooking.status==='REJECTED'}">{{
              selectedBooking.status
            }}</span>
          </label>
        </div>
        <br>
        <div>
          <label>Delivery Description</label>
          <textarea cols="10" rows="5" class="form-input" v-model="selectedBooking.deliveryDescription" readonly>
            </textarea>
        </div>
        <div class="my-3">
          <label>Delivery Quantities</label>
          <custom-container :initialItems="selectedBooking.expectedQuantity" :type="'coffee-container'"
                            :units="'bags'"></custom-container>
        </div>

      </div>
      <template slot="footer">
        <a-button key="back" @click="handleCancel('show')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="edit_loading" @click="showEditModal"
                  v-if="selectedBooking.status==='PENDING'">
          Edit Booking
        </a-button>
      </template>
    </a-modal>
    <!--    show-->
    <!--approve-->
    <a-modal v-model="approve_modal" centered title="Confirm Approval">
      <div class="font-weight-bolder status_approved_text">Approve this booking?</div>
      <div>
        <label>Comment</label>
        <textarea cols="10" rows="5" class="form-input" v-model="comment.approve">
            </textarea>
      </div>
      <template slot="footer">
        <a-button key="back" @click="handleCancel('approve')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" @click="approveBooking(true)" :disabled="!comment.approve">
          Approve
        </a-button>
      </template>
    </a-modal>
    <!--    approve-->

    <!--reject-->
    <a-modal v-model="reject_modal" centered title="Confirm Reject">
      <div class="font-weight-bolder status_rejected_text">Reject this booking?</div>
      <div>
        <label>Comment</label>
        <textarea cols="10" rows="5" class="form-input" v-model="comment.reject">
            </textarea>
      </div>
      <template slot="footer">
        <a-button key="back" @click="handleCancel('reject')">
          Cancel
        </a-button>
        <a-button key="submit" type="danger" @click="approveBooking(false)" :disabled="!comment.reject">
          Reject
        </a-button>
      </template>
    </a-modal>
    <!--    reject-->
    <h3 class="tx-center">{{ is_booking ? 'Booking' : 'Coffee Types' }}</h3>

    <div class="d-flex justify-content-start">
      <button class="the-btn sec-color px-3 mr-4" @click="showModal" v-if="is_booking">Add Booking</button>
      <button class="the-btn pri-color px-3 text-white" @click="is_booking=!is_booking">
        {{ is_booking ? 'Coffee Types' : 'Booking' }}
      </button>
    </div>
    <div v-if="!is_booking">
      <coffee-types></coffee-types>
    </div>

    <div class="booking-process" v-show="is_booking">
      <div class="justify-content-between my-3 filter-container">
        <div>
          <select v-model="bookingFilter.branchCode" class="form-input" @change="filterBooking">
            <option value="null" selected>All Branches</option>
            <option v-for="branch in branches" :value="branch.branchCode" :key="branch.branchCode">
              {{ branch.branchName }}
            </option>
          </select>
        </div>
        <div>
          <select v-model="bookingFilter.booking_type" class="form-input"
                  @change="filterBooking('/'+bookingFilter.booking_type)">
            <option value="null" selected>All Bookings</option>
            <option value="bigLotRegister">Big Lots</option>
            <option value="smallLotRegister">Small Lots</option>
          </select>
        </div>
        <div class="d-flex justify-content-between">
          <select v-model="bookingFilter.date_option" class="form-input">
            <option value="null" selected>No Date Filter</option>
            <option value="weekly">Weekly</option>
            <option value="as_at_date">As at specific date</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div v-if="bookingFilter.date_option==='weekly'" class="d-flex justify-content-around">
          <span>Weekly start date</span><input type="date" v-model="bookingFilter.startDate" class="form-input"
                                               @change="filterBooking('/weekly')">
        </div>
        <div v-if="bookingFilter.date_option==='as_at_date'" class="d-flex justify-content-around">
          <span>Date</span><input type="date" v-model="bookingFilter.asAtDate" class="form-input"
                                  @change="filterBooking">
        </div>
        <div v-if="bookingFilter.date_option==='custom'" class="d-flex justify-content-around">
          <span>Start date</span><input type="date" v-model="bookingFilter.startDate" class="form-input"
                                        @change="filterBooking">
        </div>
        <div v-if="bookingFilter.date_option==='custom'" class="d-flex justify-content-around">
          <span>End date</span> <input type="date" v-model="bookingFilter.endDate" class="form-input"
                                       @change="filterBooking">
        </div>
        <search-bar :search-label='"Search Booking ..."'></search-bar>
      </div>
      <div>
        <div>
          <vuetable ref="vuetable"
                    :api-mode="false"
                    :fields="fields"
                    :per-page="itemsPerPage"
                    :data-manager="dataManager"
                    pagination-path="pagination"
                    @vuetable:pagination-data="onPaginationData">
            <template slot="status" slot-scope="props">
              <label
                :class="{'status_approved':props.rowData.status=='APPROVED','status_rejected':props.rowData.status=='REJECTED','status_pending':props.rowData.status=='PENDING'}">
                {{ props.rowData.status }}
              </label>
            </template>
            <template slot="action" slot-scope="props">
              <a-button class="ant-btn ant-btn-sm mb-3" v-if="isSmallDevice" @click="showActions=!showActions">...
              </a-button>
              <div class="table-actions" v-if="!isSmallDevice || showActions">
                <label class="action-btns" @click="viewDetails(props.rowData)">
                  <img src="../../assets/icons/view.svg" alt="" width="30px">
                </label>
                <label class="action-btns" @click="showApprove(props.rowData,true)"
                       v-show="props.rowData.status=='PENDING'">
                  <img src="../../assets/icons/ticked.svg" alt="" width="30px">
                </label>
                <label class="action-btns" @click="showApprove(props.rowData,false)"
                       v-show="props.rowData.status=='PENDING'">
                  <img src="../../assets/icons/reject.svg" alt="" width="30px">
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
import vueTableMixin from '../mixins/vuetable_mixin'
import { Modal, notification } from 'ant-design-vue'
import customContainerMixin from '@/components/mixins/customContainerMixin'
import { eventBus } from '@/events'
import API from '../../api'
import { mapGetters } from 'vuex'
import moment from 'moment'
import responsiveMixin from '@/components/mixins/responsiveMixin'
import CoffeeTypes from '@/components/coffeeTypes'

export default {
  mixins: [vueTableMixin, customContainerMixin, responsiveMixin],
  name: 'Booking',
  components: {
    CoffeeTypes,
    'a-modal': Modal
  },
  data () {
    return {
      is_booking: true,
      showActions: false,
      approve_modal: false,
      reject_modal: false,
      comment: {},
      canAddCoffee: false,
      bookings: [],
      bookingFilter: {
        date_option: 'null',
        booking_type: 'null',
        branchCode: 'null'
      },
      // selectedBookingFilter: [],
      fields: [
        {
          name: 'bookingSlipNo',
          title: 'Booking Slip No.'
        },
        {
          name: 'growerCode',
          title: 'Grower Code'
        },
        {
          name: 'receivingBranchCode',
          title: 'Receiving Branch Code'
        },
        {
          name: 'earliestExpectedDate',
          title: 'Earliest Date'
        },
        {
          name: 'lastestExpectedDate',
          title: 'Lastest Date'
        },
        {
          name: 'deliveryMode',
          title: 'Delivery Mode'
        },
        {
          name: '__slot:status',
          title: 'Status'
        },
        {
          name: '__slot:action',
          title: 'Action'
        }
      ],
      loading: false,
      edit_loading: false,
      form: {},
      formEdit: {},
      visible: false,
      show_modal_edit: false,
      show_modal_view: false,
      show_modal: false,
      tableState: {},
      promise: true,
      itemsPerPage: 0,
      coffee: {},
      bookedCoffeeTypes: [],
      selectedBooking: {},
      formError: {}
    }
  },
  computed: {
    ...mapGetters({
      branches: 'branches',
      coffeeTypes: 'coffeeTypes'
    }),
    canEdit () {
      return this.selectedBooking.bookingSlipNo &&
        this.selectedBooking.bookingSlipNo.trim().length > 0 &&
        this.selectedBooking.growerCategory &&
        this.selectedBooking.growerCategory.trim().length > 0 &&
        this.selectedBooking.earliestExpectedDate &&
        this.selectedBooking.earliestExpectedDate.trim().length > 3 &&
        this.selectedBooking.lastestExpectedDate &&
        this.selectedBooking.lastestExpectedDate.trim().length > 3 &&
        this.selectedBooking.receivingBranchCode &&
        this.selectedBooking.receivingBranchCode.trim().length > 0 &&
        this.bookedCoffeeTypes.length > 0
    },
    canSave () {
      return this.form.bookingSlipNo &&
        this.form.bookingSlipNo.trim().length > 0 &&
        this.form.growerCategory &&
        this.form.growerCategory.trim().length > 0 &&
        this.form.earliestExpectedDate &&
        this.form.earliestExpectedDate.trim().length > 3 &&
        this.form.lastestExpectedDate &&
        this.form.lastestExpectedDate.trim().length > 3 &&
        this.form.receivingBranchCode &&
        this.form.receivingBranchCode.trim().length > 0 &&
        this.bookedCoffeeTypes.length > 0
    }
  },
  watch: {
    coffee: {
      handler: function () {
        this.canAddCoffee = (this.coffee.hasOwnProperty('bags') && this.coffee.hasOwnProperty('type') &&
          this.coffee.bags.match(/^[0-9]{1,7}$/g) &&
          this.coffee.bags > 0 &&
          (this.coffee.type.length > 1))
      },
      deep: true
    },
    'form.bookingSlipNo': {
      handler: function () {
        this.formError.bookingSlipNo = !this.form.bookingSlipNo || this.form.bookingSlipNo.trim().length < 1
          ? 'Please enter valid booking slip no.'
          : null
      },
      deep: true
    },
    'form.growerCategory': {
      handler: function () {
        console.log('changed')
        this.formError.growerCategory = !this.form.growerCategory || this.form.growerCategory.trim().length < 1
          ? 'Please select a valid category slip no.'
          : null
      },
      deep: true
    },
    'form.growerCode': {
      handler: function () {
        this.formError.growerCode = !this.form.growerCode || this.form.growerCode.trim().length < 1
          ? 'Please select a valid category slip no.'
          : null
      },
      deep: true
    },
    'form.earliestExpectedDate': {
      handler: function () {
        this.formError.earliestExpectedDate = !this.form.earliestExpectedDate || this.form.earliestExpectedDate.trim().length < 3
          ? 'Please select a valid date.'
          : null
      },
      deep: true
    },
    'form.lastestExpectedDate': {
      handler: function () {
        this.formError.lastestExpectedDate = !this.form.lastestExpectedDate || this.form.lastestExpectedDate.trim().length < 3
          ? 'Please select a valid date.'
          : null
      },
      deep: true
    },
    'form.receivingBranchCode': {
      handler: function () {
        this.formError.receivingBranchCode = !this.form.receivingBranchCode || this.form.receivingBranchCode.trim().length < 1
          ? 'Please select a branch.'
          : null
      },
      deep: true
    },

    'selectedBooking.bookingSlipNo': {
      handler: function () {
        this.formError.bookingSlipNo = !this.selectedBooking.bookingSlipNo || this.selectedBooking.bookingSlipNo.trim().length < 1
          ? 'Please enter valid booking slip no.'
          : null
      },
      deep: true
    },
    'selectedBooking.growerCategory': {
      handler: function () {
        console.log('changed')
        this.formError.growerCategory = !this.selectedBooking.growerCategory || this.selectedBooking.growerCategory.trim().length < 1
          ? 'Please select a valid category slip no.'
          : null
      },
      deep: true
    },
    'selectedBooking.growerCode': {
      handler: function () {
        this.formError.growerCode = !this.selectedBooking.growerCode || this.selectedBooking.growerCode.trim().length < 1
          ? 'Please select a valid category slip no.'
          : null
      },
      deep: true
    },
    'selectedBooking.earliestExpectedDate': {
      handler: function () {
        this.formError.earliestExpectedDate = !this.selectedBooking.earliestExpectedDate || this.selectedBooking.earliestExpectedDate.trim().length < 3
          ? 'Please select a valid date.'
          : null
      },
      deep: true
    },
    'selectedBooking.lastestExpectedDate': {
      handler: function () {
        this.formError.lastestExpectedDate = !this.selectedBooking.lastestExpectedDate || this.selectedBooking.lastestExpectedDate.trim().length < 3
          ? 'Please select a valid date.'
          : null
      },
      deep: true
    },
    'selectedBooking.receivingBranchCode': {
      handler: function () {
        this.formError.receivingBranchCode = !this.selectedBooking.receivingBranchCode || this.selectedBooking.receivingBranchCode.trim().length < 1
          ? 'Please select a branch.'
          : null
      },
      deep: true
    },
    bookedCoffeeTypes: {
      handler: function () {
        this.formError.expectedQuantity = !this.bookedCoffeeTypes || this.bookedCoffeeTypes.length < 1
          ? 'Add some coffee to continue with booking'
          : null
      },
      deep: true
    },

  },
  mounted () {
    this.itemsPerPage = 10
  },
  methods: {
    dataManager (sortOrder, pagination) {
      if (this.bookings.length < 1) return
      let local = this.bookings

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
    filterBooking (prefix = '') {
      const filters = this.bookingFilter
      let pre = prefix !== '/null' && typeof prefix !== 'object' ? prefix : ''
      if (pre === '' && this.bookingFilter.booking_type !== 'null') {
        pre = this.bookingFilter.booking_type
      }

      if (this.bookingFilter.date_option === 'as_at_date') {
        this.bookingFilter.asAtDate = moment(this.bookingFilter.asAtDate).format('DD-MM-YYYY')
        this.bookingFilter.startDate = 'null'
        this.bookingFilter.endDate = 'null'
      } else {
        if (this.bookingFilter.date_option === 'null') {
          this.bookingFilter.startDate = 'null'
          this.bookingFilter.endDate = 'null'
          this.bookingFilter.asAtDate = 'null'
        } else if (this.bookingFilter.date_option === 'weekly') {
          this.bookingFilter.startDate = moment(this.bookingFilter.startDate).format('DD-MM-YYYY')
          this.bookingFilter.endDate = 'null'
        } else if (this.bookingFilter.date_option === 'custom') {
          this.bookingFilter.startDate = moment(this.bookingFilter.startDate).format('DD-MM-YYYY')
          this.bookingFilter.endDate = moment(this.bookingFilter.endDate).format('DD-MM-YYYY')
          this.bookingFilter.asAtDate = 'null'
        }
      }
      let query = 'api/booking/v1/coffee/book' + pre
      let i = 0
      for (const property in filters) {
        if (filters[property] !== 'null' && property !== 'date_option' && property !== 'booking_type') {
          if (i === 0) {
            query += '?' + property + '=' + filters[property]
          } else {
            query += '&' + property + '=' + filters[property]
          }
          i++
        }
      }
      console.log(query)
      this.getBookings(query)
    },
    deleteCoffee (id) {
      this.bookedCoffeeTypes = this.bookedCoffeeTypes.filter(coffee => coffee.id !== id)
      this.updateSelect()
    },
    addCoffee () {
      this.loading = true
      const data = {
        id: '',
        coffeeType: this.coffee.type,
        noOfbags: parseInt(this.coffee.bags)
      }
      const exists = this.bookedCoffeeTypes.filter(coffee => {
        if (coffee.coffeeType === this.coffee.type) {
          coffee.noOfbags += parseInt(this.coffee.bags)
          return true
        }
        return false
      })

      if (exists.length == 0) {
        this.bookedCoffeeTypes.push(data)
      }
      this.updateSelect()
      this.loading = false
    },
    async updateSelect () {
      this.bookedCoffeeTypes = await this.createIds(this.bookedCoffeeTypes)
      eventBus.$emit('updateSelectData', this.bookedCoffeeTypes)
    },
    viewDetails (booking) {
      this.selectedBooking = Object.assign({}, booking)
      this.show_modal_view = true
    },
    approveBooking (approved = true) {
      const booking = this.selectedBooking
      const saveData = {
        bookingId: booking.bookingId,
        approved: approved === true,
        comment: approved ? this.comment.approve : this.comment.reject,
        bookingSlipNo: booking.bookingSlipNo
      }
      this.approve_modal = false
      API.post('api/booking/v1/coffee/book/approve', saveData)
        .then(res => {
          if (res.data.status === 0) {
            let msg = ''
            if (approved) {
              msg = 'Booking approved successfully'
            } else {
              msg = 'Booking rejected successfully'
            }
            notification.success({
              message: msg
            })
            this.getBookings()
          } else {
            notification.error({
              message: 'Booking approval failed'
            })
          }
        })
        .catch(err => {
          console.log('approve error', err)
        })
    },
    showApprove (booking, approved = true) {
      this.selectedBooking = booking
      approved ? this.approve_modal = true : this.reject_modal = true
    },
    async showEditModal () {
      this.bookedCoffeeTypes = Object.assign([], this.selectedBooking.expectedQuantity)
      this.bookedCoffeeTypes = await this.createIds(this.bookedCoffeeTypes)
      this.show_modal_edit = true
    },
    showModal () {
      this.bookedCoffeeTypes = []
      this.show_modal = true
    },
    handleCancel (type) {
      if (type === 'edit') {
        this.show_modal_edit = false
      } else if (type === 'approve') {
        this.approve_modal = false
      } else if (type === 'show') {
        this.show_modal_view = false
      } else if (type === 'reject') {
        this.reject_modal = false
      } else {
        this.show_modal = false
      }
    },
    getBookings (query = null) {
      let api = 'api/booking/v1/coffee/book'
      if (query != null) {
        api = query
      }
      API.get(api)
        .then(res => {
          this.bookings = res.data.content
          this.$refs.vuetable.reload()
        })
        .catch(error => {
          console.log(error)
        })
    },
    createBooking () {
      this.loading = true
      const expectedQuantity = Object.assign([], this.bookedCoffeeTypes.map(function (item) {
        delete item.id
        return item
      }))
      const submitData = Object.assign({}, this.form)
      submitData.earliestExpectedDate = moment(submitData.earliestExpectedDate).format('DD-MM-YYYY')
      submitData.lastestExpectedDate = moment(submitData.lastestExpectedDate).format('DD-MM-YYYY')
      submitData.expectedQuantity = expectedQuantity
      API.post('api/booking/v1/coffee/book', submitData)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Booking saved successfully.'
            })
            this.getBookings()
            this.show_modal = false
          } else {
            notification.error({
              message: 'Booking save failed.'
            })
          }
          this.loading = false
        })
        .catch((res, err) => {
          let msg = 'An error occurred'
          if (res.message.indexOf('earliestExpectedDate')) {
            msg = 'invalid dates please change the dates.'
          }
          notification.error({
            message: msg
          })
          this.loading = false
        })
    },
    editBooking () {
      this.edit_loading = true
      const expectedQuantity = Object.assign([], this.bookedCoffeeTypes.map(function (item) {
        delete item.id
        return item
      }))
      const submitData = Object.assign({}, this.selectedBooking)
      submitData.earliestExpectedDate = moment(submitData.earliestExpectedDate).format('DD-MM-YYYY')
      submitData.lastestExpectedDate = moment(submitData.lastestExpectedDate).format('DD-MM-YYYY')
      submitData.expectedQuantity = expectedQuantity
      API.put('api/booking/v1/coffee/book', submitData)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Booking updated successfully.'
            })
            this.getBookings()
            this.show_modal_edit = false
          } else {
            notification.error({
              message: 'Booking update failed.'
            })
          }
          this.edit_loading = false
        })
        .catch(error => {
          console.log('error', error.response)
          this.edit_loading = false
          this.feedback = error.response.data.message
        })
    },
    showDeleteConfirm (id) {
      this.$confirm({
        title: 'Confirm Approval?',
        okText: 'Yes',
        okType: 'success',
        cancelText: 'No',
        onOk () {
          notification.success({
            message: id + 'Booking approved successfuly'
          })
        },
        onCancel () {
        }
      })
    }
  },
  created () {
    if (this.branches.length === 0) {
      this.$store.commit('FETCH_BRANCHES')
    }
    if (this.coffeeTypes.length === 0) {
      this.$store.commit('FETCH_COFFEE_TYPES')
    }

    this.getBookings()
  }
}
</script>

<style lang="sass" scoped>
.form-content span
  color: red

.filter-container
  display: flex
  @media only screen and (max-width: 450px)
    display: block

  span
    margin: 0 10px
</style>
