<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal" centered width="900px" title="Add Farmer" on-ok="crea">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <div class="row justify-content-between form-content">
        <div class="col-md-6">
          <label for="fname">First Name <span>*</span></label>
          <input class="form-input" type="text" v-model="form.firstName" id="fname">
          <label for="mname">Middle Name </label>
          <input class="form-input" type="text" v-model="form.middleName" id="mname">
          <label for="lname">Last Name <span>*</span> </label>
          <input class="form-input" type="text" v-model="form.lastName" id="lname">
          <label for="nId">National ID <span>*</span> </label>
          <input class="form-input" type="number" v-model="form.nationalId" id="nId">
          <label for="email">Email</label>
          <input class="form-input" type="email" v-model="form.email" id="email">
          <label for="code">Date of Birth <span>*</span></label><br>
          <a-date-picker  style="width: 100%; margin-bottom: 10px" @change="selectDateOfBirth"/>
        </div>
        <div class="col-md-6">
          <label for="pNo">Primary Phone Number <span>*</span> </label>
          <input class="form-input" type="number" v-model="form.primaryPhone" id="pNo">
          <label for="sNo">Secondary Phone</label>
          <input class="form-input" type="number" v-model="form.secondaryPhone" id="sNo">
          <label for="code">Farmer Code</label>
          <input class="form-input" type="text" v-model="form.code" id="code">
          <label for="rcode">Region Code</label>
          <input class="form-input" type="text" v-model="form.regionCode" id="rcode">
          <label for="code">Gender</label>
          <a-select placeholder="Select gender" style="width: 100%; margin-bottom: 10px" @change="selectGender">
            <a-select-option value="MALE">
              Male
            </a-select-option>
            <a-select-option value="FEMALE">
              Female
            </a-select-option>
            <a-select-option value="UNKNOWN">
              Unknown
            </a-select-option>
          </a-select>
          <label for="code">Date of Joining<span>*</span></label><br>
          <a-date-picker style="width: 100%; margin-bottom: 10px"  @change="selectDateOfJoining"/>
          <br>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="">
          Cancel
        </a-button>
        <a-tooltip v-if="!canAddFarmer" placement="leftTop">
          <template slot="title">
            <span>Fill all required fields</span>
          </template>
            <a-button key="submit" type="primary" style="margin-left: 10px"  :disabled="true">
              Add Farmer
            </a-button>
        </a-tooltip>
        <a-button key="submit" type="primary" v-if="canAddFarmer" :loading="loading" @click="createFarmer">
          Add Farmer
        </a-button>
      </template>
    </a-modal>
    <!--    add-->
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             title="Edit Farmer"
             okType="primary" ok-text="Edit Farmer" cancel-text="close" @ok="">
      <template slot="footer">
        <a-button key="back" @click="">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="edit_loading" @click="">
          Edit Farmer
        </a-button>
      </template>
    </a-modal>
    <!--    edit-->
    <h3 class="tx-center">Farmers</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">Add Farmer</button>
      <search-bar :search-label='"Search Farmer ..."'></search-bar>
    </div>
    <div v-if="loading">
      <a-spin tip="Fetching farmers...">
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
import {Alert, Modal, Spin, DatePicker, notification, Select, Tooltip} from 'ant-design-vue'
import {API} from '../../api'

export default {
  mixins: [vueTableMixin, responsiveMixin],
  name: 'Farmers',
  components: {
    'a-modal': Modal,
    'a-alert': Alert,
    'a-spin': Spin,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-date-picker': DatePicker,
    'a-tooltip': Tooltip
  },
  data() {
    return {
      loading: true,
      edit_loading: false,
      spinning: false,
      spinning_e: false,
      feedback: '',
      feedback_two: '',
      showActions: false,
      isCode: false,
      isName: false,
      farmers: [],
      regionDetails: {
        code: '', name: ''
      },
      form: {
        firstName: '',lastName: '',primaryPhone: '',nationalId: '',dateOfBirth: '',dateOfJoining: '',
      },
      fields: [
        {name: 'id', title: 'Id'},
        {name: '__slot:name', title: 'Name'},
        {name: 'email', title: 'Email'},
        {name: 'primaryPhone', title: 'Phone No'},
        {name: 'nationalId', title: 'National Id'},
        {name: '__slot:action', title: 'Action'}
      ],
      formEdit: {},
      visible: false,
      show_modal_edit: false,
      show_modal: false,
      show_modal_more: false,
    }
  },

  computed: {
    canAddFarmer() {
      return this.confirmAddFarmer()
    }
  },
  mounted() {
    this.itemsPerPage = 5
  },
  created() {
    this.getFarmers()
  },
  methods: {
    selectGender(value) {
      this.form.gender = value
    },
    selectDateOfJoining(date, dateString) {
      this.form.dateOfJoining = dateString
    },
    selectDateOfBirth(date, dateString) {
      this.form.dateOfBirth = dateString
    },
    confirmAddFarmer() {
      return this.form.firstName !== '' && this.form.lastName !== '' &&
        this.form.primaryPhone !== '' && this.form.nationalId !== '' && this.form.dateOfBirth !== ''
        && this.form.dateOfJoining !== ''
    },
    dataManager(sortOrder, pagination) {
      if (this.farmers.length < 1) return
      let local = this.farmers

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
    getFarmers() {
      API.get('api/organisation/farmers')
        .then(response => {
          this.farmers = response.data
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        })
    },
    showEditModal(item) {
      this.show_modal_edit = true
      this.formEdit.name = item.name
      this.formEdit.code = item.code
    },
    showModal() {
      this.show_modal = true
    },
    createFarmer() {
      this.feedback = '';
      this.spinning = true
      console.log(this.form)
      API.post('api/organisation/farmers', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Farmer added successfully.'
            })
          }
          this.farmers.push(this.form)
          this.spinning = false
          this.show_modal = false
        })
        .catch(error => {
          this.spinning = false
          this.feedback = error.response.data.message
        })

    },
    editRegion() {
      this.spinning_e = true
      API.put(`api/organisation/v2/regions/${this.formEdit.code}`, this.formEdit)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Region edited successfully.'
            })
            this.show_modal_edit = false
            this.spinning_e = false
            this.getRegions()
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
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  height: 300px;
  padding: 30px;
}

.form-content span {
  color: red;
}
</style>
