<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal" centered title="Add Booking" width="700px">
      <div class="row">
        <div class="col-md-6">
          <label>Booking Slip No</label>
          <input class="form-input" type="text" v-model="form.bookingSlipNo">

          <label>Grower Category</label>
          <select v-model="form.growerCategory" class="form-input">
            <option value="Farmer">Farmer</option>
            <option value="Cooperative">Cooperative</option>
          </select>

          <label>Grower Code</label>
          <input class="form-input" type="text" v-model="form.growerCode">

          <label>Earliest Expected Date</label>
          <input class="form-input" type="date" v-model="form.earliestExpectedDate">

          <label>Lastest Expected Date</label>
          <input class="form-input" type="date" v-model="form.lastestExpectedDate">

          <label>Delivery Mode</label>
          <select v-model="form.deliveryMode" class="form-input">
            <option value="ROAD">Road</option>
            <option value="RAIL">Rail</option>
          </select>

          <label>Delivery Description</label>
          <textarea cols="10" rows="5" class="form-input" v-model="form.deliveryDescription">
          </textarea>

        </div>
        <div class="col-md-6">
          <label>Receiving Branch</label>
          <select v-model="form.receivingBranchCode" class="form-input">
            <option v-for="branch in branches" :value="branch.branchCode" :key="branch.branchCode">
              {{ branch.branchName }}
            </option>
          </select>
          <h6 class="text-center mb-2">Quantity</h6>

          <label>Coffee Type</label>
          <select v-model="coffee.type" class="form-input">
            <option v-for="type in coffeeTypes" :value="type" :key="type">
              {{ type }}
            </option>
          </select>

          <label>No. of Bags</label>
          <input class="form-input" type="text" v-model="coffee.bags">
          <div class="row d-flex justify-content-end m-2">
            <a-button type="primary" class="float-right" :loading="loading" @click="addCoffee" :small="true">
              Add Coffee
            </a-button>
          </div>
          <div class="my-3">
            <custom-container :type="'coffee-container'" :units="'bags'" @delete="deleteCoffee"></custom-container>
          </div>

        </div>
      </div>

      <template slot="footer">
        <a-button key="back" @click="handleCancel('add')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="createBooking">
          Add Cooperative
        </a-button>
      </template>
    </a-modal>
    <!--    add-->

    <!--edit-->
    <a-modal v-model="show_modal_edit" centered title="Edit Booking" width="700px" v-if="show_modal_edit">
      <div class="row">
        <div class="col-md-6">
          <label>Booking Slip No</label>
          <input class="form-input" type="text" v-model="selectedBooking.bookingSlipNo">

          <label for="growerCategory">Grower Category</label>
          <select id="growerCategory" v-model="selectedBooking.growerCategory" class="form-input">
            <option value="Farmer">Farmer</option>
            <option value="Cooperative">Cooperative</option>
          </select>

          <label>Grower Code</label>
          <input class="form-input" type="text" v-model="selectedBooking.growerCode">

          <label>Earliest Expected Date</label>
          <input class="form-input" type="date" v-model="selectedBooking.earliestExpectedDate">

          <label>Lastest Expected Date</label>
          <input class="form-input" type="date" v-model="selectedBooking.lastestExpectedDate">

          <label>Delivery Mode</label>
          <select v-model="selectedBooking.deliveryMode" class="form-input">
            <option value="ROAD">Road</option>
            <option value="RAIL">Rail</option>
          </select>

          <label>Delivery Description</label>
          <textarea cols="5" rows="10" class="form-input" v-model="selectedBooking.deliveryDescription">
          </textarea>

        </div>
        <div class="col-md-6">
          <label>Receiving Branch</label>
          <select v-model="selectedBooking.receivingBranchCode" class="form-input">
            <option v-for="branch in branches" :value="branch.branchCode" :key="branch.branchCode">
              {{ branch.branchName }}
            </option>
          </select>
          <h6 class="text-center mb-2">Quantity</h6>

          <label>Coffee Type</label>
          <select v-model="coffee.type" class="form-input">
            <option v-for="type in coffeeTypes" :value="type" :key="type">
              {{ type }}
            </option>
          </select>

          <label>No. of Bags</label>
          <input class="form-input" type="text" v-model="coffee.bags">
          <div class="row d-flex justify-content-end m-2">
            <a-button type="primary" class="float-right" :loading="loading" @click="addCoffee" :small="true">
              Add Coffee
            </a-button>
          </div>
          <div class="my-3">
            <custom-container :type="'coffee-container'" :units="'bags'" @delete="deleteCoffee"></custom-container>
          </div>

        </div>
      </div>

      <template slot="footer">
        <a-button key="back" @click="handleCancel('edit')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="edit_loading" @click="editBooking">
          Edit Booking
        </a-button>
      </template>
    </a-modal>
    <!--    edit-->

    <!--show-->
    <a-modal v-model="show_modal_view" centered title="More Booking Details">
      <div class="">
        <div class="text-center">
          <label>Booking Slip No: <span>{{ selectedBooking.bookingSlipNo }}</span></label>
        </div>
        <div>
          Receiving Branch Code: <span class="more-info-details">{{ selectedBooking.receivingBranchCode }}</span>
        </div>
        <div>
          Grower Category: <span class="more-info-details">{{ selectedBooking.growerCategory }}</span>
        </div>
        <div>
          Grower Code: <span class="more-info-details">{{ selectedBooking.growerCode }}</span>
        </div>
        <div>
          Status: <span class="more-info-details">{{ selectedBooking.status }}</span>
        </div>
        <br>
        <div>
          <label>Delivery Description</label>
          <textarea cols="10" rows="10" class="form-input" v-model="selectedBooking.deliveryDescription" readonly>
            </textarea>
        </div>
        <div class="my-3">
          <label>Delivery Quantities</label>
          <custom-container :initialItems="selectedBooking.expectedQuantity" :type="'coffee-container'"
                            :units="'bags'"></custom-container>
        </div>

      </div>
      <template slot="footer">
        <a-button key="submit" type="primary" :loading="edit_loading" @click="showEditModal">
          Edit Booking
        </a-button>
      </template>
    </a-modal>
    <!--    edit-->

    <h3 class="tx-center">Booking</h3>
    <button class="the-btn sec-color" @click="showModal">Add Booking</button>
    <div class="d-flex justify-content-between my-3 filter-container">
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
        <span>Date</span><input type="date" v-model="bookingFilter.asAtDate" class="form-input" @change="filterBooking">
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
                  :data-manager="dataManager"
                  pagination-path="paginationInfo"
                  @vuetable:pagination-data="onPaginationData"
                  :append-params="tableState"
                  :per-page="itemsPerPage"
        >
          <template slot="action" slot-scope="props">
            <label class="action-btns" @click="viewDetails(props.rowData)">
              <img src="../../assets/icons/view.svg" alt="" width="30px">
            </label>
            <label class="action-btns" @click="approveBooking(props.rowData)">
              <img src="../../assets/icons/ticked.svg" alt="" width="30px">
            </label>
            <label class="action-btns" @click="rejectBooking(props.rowData.id)">
              <img src="../../assets/icons/reject.svg" alt="" width="30px">
            </label>
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
import { Modal, notification } from 'ant-design-vue'
import router from '../../router'
import customContainerMixin from '@/components/mixins/customContainerMixin'
import { eventBus } from '@/events'
import API from '../../api'

export default {
  mixins: [vueTableMixin, customContainerMixin],
  name: 'Booking',
  components: {
    'a-modal': Modal
  },
  data () {
    return {
      bookings: [],
      bookingFilter: {
        date_option: 'null',
        booking_type: 'null',
        branchCode: 'null'
      },
      // selectedBookingFilter: [],
      fields: [
        {
          name: 'address.zipcode',
          title: 'Booking Slip No.'
        },
        {
          name: 'group_id',
          title: 'Grower Code'
        },
        {
          name: 'age',
          title: 'Receiving Branch Code'
        },
        {
          name: 'created_at',
          title: 'Earliest Date'
        },
        {
          name: 'updated_at',
          title: 'Latest Date'
        },
        {
          name: 'nickname',
          title: 'Delivery Mode'
        },
        {
          name: 'gender',
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
      branches: [
        {
          branchCode: 'B005',
          branchName: 'Kamuru'
        },
        {
          branchCode: 'B002',
          branchName: 'Kimandi'
        },
        {
          branchCode: 'B001',
          branchName: 'Syokimau'
        }
      ],
      coffeeTypes: [
        'P1',
        'P2',
        'P3',
        'P.L',
        'Mbuni'
      ],
      coffee: {},
      bookedCoffeeTypes: [],
      selectedBooking: {
        'bookingSlipNo': '002',
        'growerCategory': 'Farmer',
        'growerCode': '02032',
        'earliestExpectedDate': '2021-06-03',
        'lastestExpectedDate': '2021-06-04',
        'deliveryMode': 'ROAD',
        'deliveryDescription': 'SOme description here',
        'receivingBranchCode': 'B005',
        expectedQuantity: [{
          'coffeeType': 'P1',
          'noOfbags': '300'
        }, {
          'coffeeType': 'Mbuni',
          'noOfbags': '300'
        }]
      }
    }
  },
  mounted () {
    this.itemsPerPage = 10
  },
  methods: {
    dataManager (sortOrder, pagination) {
      if (this.bookings.length < 1) return

      let local = this.bookings

      // sortOrder can be empty, so we have to check for that as well
      if (sortOrder.length > 0) {
        local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        )
      }

      pagination = this.$refs.vuetable.makePagination(
        local.length,
        this.perPage
      )
      console.log('pagination:', pagination)
      let from = pagination.from - 1
      let to = from + this.perPage

      return {
        pagination: pagination,
        data: _.slice(local, from, to)
      }
    },
    filterBooking (prefix = '') {
      const filters = this.bookingFilter
      let pre = prefix != '/null' && typeof prefix != 'object' ? prefix : ''
      if (pre === '' && this.bookingFilter.booking_type != 'null') {
        pre = this.bookingFilter.booking_type
      }

      if (this.bookingFilter.date_option === 'as_at_date') {
        this.bookingFilter.startDate = 'null'
        this.bookingFilter.endDate = 'null'
      } else {
        if (this.bookingFilter.date_option !== 'custom') {
          this.bookingFilter.endDate = 'null'
        }
        this.bookingFilter.asAtDate = 'null'
      }
      let query = 'api/booking/v1/book' + pre
      let i = 0
      for (const property in filters) {
        if (filters[property] != 'null' && property !== 'date_option' && property !== 'booking_type') {
          if (i === 0) {
            query += '?' + property + '=' + filters[property]
          } else {
            query += '&' + property + '=' + filters[property]
          }
          i++
        }
      }
      console.log(query)

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
        noOfbags: this.coffee.bags
      }
      this.bookedCoffeeTypes.push(data)

      this.updateSelect()
      this.loading = false
    },
    updateSelect () {
      this.bookedCoffeeTypes = this.createIds(this.bookedCoffeeTypes)
      eventBus.$emit('updateSelectData', this.bookedCoffeeTypes)
    },
    viewDetails (booking) {
      console.log(booking)
      this.selectedBooking.expectedQuantity[0].noOfbags = booking.age
      this.show_modal_view = true
    },
    approveBooking (booking) {
      // Approve
    },
    rejectBooking (booking) {
      // Reject
    },
    showEditModal () {
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
    getBookings () {
      API.get('api/booking/v1/coffee/book')
        .then(res => {
          this.bookings = res.data.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    createBooking () {
      this.loading = true
      const expectedQuantity = Object.assign({}, this.bookedCoffeeTypes.map(function (item) {
        delete item.id
        return item
      }))
      const submitData = Object.assign({}, this.form)
      submitData.expectedQuantity = expectedQuantity
      API.post('/api/booking/v1/coffee/book', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Booking saved successfully.'
            })
          }

          this.show_modal = false
        })
        .catch(error => {
          this.feedback = error.response.data.message
        })
      this.show_modal = false
    },
    editBooking () {
      this.edit_loading = true
      this.show_modal_edit = false
    },
    showDeleteConfirm (id) {
      this.$confirm({
        title: 'Confirm Approval?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk () {
          notification.success({
            message: id + 'Cooperative deleted successfully'
          })
        },
        onCancel () {
        }
      })
    }
  },
  created () {
    this.getBookings()
  }
}
</script>

<style lang="sass">
.filter-container
  span
    margin: 0 10px
</style>
