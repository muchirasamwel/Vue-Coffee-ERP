<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal" centered title="Add Cooperative">
      <div>
        <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
      </div>
      <div class="form-content">
        <label for="name">Name <span>*</span></label>
        <input class="form-input" type="text" v-model="form.name" id="name">
        <label for="registrationNo">Registration No <span>*</span> </label>
        <input class="form-input" type="text" v-model="form.registrationNo" id="registrationNo">
        <label for="pNo">Phone Number <span>*</span> </label>
        <input class="form-input" type="number" v-model="form.phoneNo" id="pNo"
               placeholder="eg. 0712345678">
        <label for="email">Email <span>*</span> </label>
        <input class="form-input" type="email" v-model="form.email" id="email"
               placeholder="eg. example@email.com">
        <label for="coopCode">Cooperative Code </label>
        <input class="form-input" type="text" v-model="form.coopCode" id="coopCode">
        <label for="address">Address</label>
        <input class="form-input" type="number" v-model="form.address" id="address">
      </div>
      <template slot="footer">
        <a-button key="back" @click="show_modal = false">
          Cancel
        </a-button>
        <a-tooltip v-if="!canAddCooperative" placement="leftTop">
          <template slot="title">
            <span>Fill all required fields</span>
          </template>
          <a-button key="submit" type="primary" style="margin-left: 10px" :disabled="true">
            Add Cooperative
          </a-button>
        </a-tooltip>
        <a-button key="submit" type="primary" v-if="canAddCooperative" :loading="loading_a" @click="createCooperative">
          Add Cooperative
        </a-button>
      </template>
    </a-modal>
    <!--    add-->
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             centered
             title="Edit Cooperative"
             okType="primary" ok-text="Edit Cooperative" cancel-text="close" @ok="editCooperative">
      <div>
        <a-alert v-if="feedback_two !== ''" type="error" :message=feedback_two banner/>
      </div>
      <div>
        <label for="ename">Name</label>
        <input class="form-input" type="text" v-model="formEdit.name" id="ename">
        <label for="eregistrationNo">Registration No</label>
        <input class="form-input" type="text" v-model="formEdit.registrationNo" id="eregistrationNo">
        <label for="epNo">Phone Number</label>
        <input class="form-input" type="number" v-model="formEdit.phoneNo" id="epNo"
               placeholder="eg. 0712345678">
        <label for="eemail">Email</label>
        <input class="form-input" type="email" v-model="formEdit.email" id="eemail"
               placeholder="eg. example@email.com">
        <label for="ecoopCode">Cooperative Code</label>
        <input class="form-input" type="text" v-model="formEdit.coopCode" id="ecoopCode">
        <label for="eaddress">Address</label>
        <input class="form-input" type="number" v-model="formEdit.address" id="eaddress">
      </div>
      <template slot="footer">
        <a-button key="back" @click="show_modal_edit = false">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading_e" @click="editCooperative">
          Edit Cooperative
        </a-button>
      </template>
    </a-modal>
    <!--    edit-->
    <h3 class="tx-center">Cooperatives</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal">Add Cooperative</button>
      <search-bar :search-label='"Search Cooperative ..."'></search-bar>
    </div>
    <div v-if="loading">
      <a-skeleton active
                  :paragraph="{ rows: 8, width: ['100%','100%','100%','100%','100%', '100%','100%','100%','100%'] }"/>
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
          <template slot="phone" slot-scope="props">
            +{{ props.rowData.phoneNo }}
          </template>
          <template slot="action" slot-scope="props">
            <a-button class="ant-btn ant-btn-sm mb-3" v-if="isSmallDevice" @click="showActions=!showActions">...
            </a-button>
            <div class="table-actions" v-if="!isSmallDevice || showActions">
              <label class="action-btns" @click="viewCooperative(props.rowData.coopCode)">
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
import { Alert, Modal, Spin, notification, Tooltip, Skeleton } from 'ant-design-vue'
import { API } from '../../api'
import router from '../../router'

export default {
  mixins: [vueTableMixin, responsiveMixin],
  name: 'Cooperatives',
  components: {
    'a-modal': Modal,
    'a-alert': Alert,
    'a-spin': Spin,
    'a-tooltip': Tooltip,
    'a-skeleton': Skeleton,
  },
  data () {
    return {
      loading: true,
      loading_e: false,
      loading_a: false,
      feedback: '',
      feedback_two: '',
      showActions: false,
      cooperatives: [],
      form: {
        name: '',
        email: '',
        phoneNo: '',
        registrationNo: ''
      },
      fields: [
        {
          name: 'id',
          title: 'Id'
        },
        {
          name: 'coopCode',
          title: 'Cooperative Code'
        },
        {
          name: 'name',
          title: 'Name'
        },
        {
          name: 'email',
          title: 'Email'
        },
        {
          name: '__slot:phone',
          title: 'Phone No'
        },
        {
          name: 'registrationNo',
          title: 'Registration No'
        },
        {
          name: 'noOfFarmers',
          title: 'No of Farmers'
        },
        {
          name: '__slot:action',
          title: 'Action'
        }
      ],
      formEdit: {},
      show_modal_edit: false,
      show_modal: false,
      regions: [],
      defaultDob: null,
      defaultDoj: null
    }
  },

  computed: {
    canAddCooperative () {
      return this.confirmAddCooperative()
    }
  },
  mounted () {
    this.itemsPerPage = 5
  },
  created () {
    this.getCooperatives()
  },
  methods: {
    confirmAddCooperative () {
      return this.form.name !== '' && this.form.phoneNo !== '' &&
        this.form.email !== '' && this.form.registrationNo !== ''
    },
    dataManager (sortOrder, pagination) {
      if (this.cooperatives.length < 1) return
      let local = this.cooperatives

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
    getCooperatives () {
      API.get('api/organisation/cooperatives')
        .then(response => {
          this.cooperatives = response.data
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    showEditModal (data) {
      this.show_modal_edit = true
      this.formEdit = {
        id: data.id,
        name: data.name,
        email: data.email,
        phoneNo: data.phoneNo,
        coopCode: data.coopCode,
        registrationNo: data.registrationNo,
        address: data.address,
      }
    },
    showModal () {
      this.show_modal = true
    },
    createCooperative () {
      this.feedback = ''
      this.loading_a = true
      API.post('api/organisation/cooperatives', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Cooperative added successfully.'
            })
            this.cooperatives.push(this.form)
            this.loading_a = false
            this.show_modal = false
          }
        })
        .catch(error => {
          this.loading_a = false
          this.feedback = error.response.data.message
        })

    },
    editCooperative () {
      this.loading_e = true
      API.put(`api/organisation/cooperatives/${this.formEdit.id}`, this.formEdit)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Cooperative edited successfully.'
            })
            this.show_modal_edit = false
            this.loading_e = false
            this.getRegions()
          }
        })
        .catch(error => {
          this.loading_e = false
          this.feedback_two = error.response.data.message
        })
    },
    viewCooperative (coopCode) {
      router.push('/cooperatives/' + coopCode)
    }
  }
}
</script>

<style scoped>

.form-content span {
  color: red;
}
</style>
