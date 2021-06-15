<template>
  <div>
    <!--add-->
    <a-modal v-model="show_modal" centered width="900px" title="Add Farmer">
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
          <input class="form-input" type="email" v-model="form.email" id="email"
                 placeholder="eg. example@email.com">
          <label for="code">Date of Birth <span>*</span></label><br>
          <a-date-picker style="width: 100%; margin-bottom: 10px" @change="selectDateOfBirth"/>
        </div>
        <div class="col-md-6">
          <label for="pNo">Primary Phone Number <span>*</span> </label>
          <input class="form-input" type="number" v-model="form.primaryPhone" id="pNo"
                 placeholder="eg. 0712345678">
          <label for="sNo">Secondary Phone</label>
          <input class="form-input" type="number" v-model="form.secondaryPhone" id="sNo"
                 placeholder="eg. 0712345678">
          <label for="code">Farmer Code</label>
          <input class="form-input" type="text" v-model="form.code" id="code">
          <label>Region Code</label> <br>
          <a-select v-model="form.regionCode" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="region in regions" :key="region.code">
              {{ region.name }}
            </a-select-option>
          </a-select>
          <label>Gender</label> <br>
          <a-select v-model="form.gender" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="sex in gender" :key="sex.id">
              {{ sex.name }}
            </a-select-option>
          </a-select>
          <label for="code">Date of Joining<span>*</span></label><br>
          <a-date-picker style="width: 100%; margin-bottom: 10px" @change="selectDateOfJoining"/>
          <br>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="show_modal = false">
          Cancel
        </a-button>
        <a-tooltip v-if="!canAddFarmer" placement="leftTop">
          <template slot="title">
            <span>Fill all required fields</span>
          </template>
          <a-button key="submit" type="primary" style="margin-left: 10px" :disabled="true">
            Add Farmer
          </a-button>
        </a-tooltip>
        <a-button key="submit" type="primary" v-if="canAddFarmer" :loading="loading_a" @click="createFarmer">
          Add Farmer
        </a-button>
      </template>
    </a-modal>
    <!--    add-->
    <!--edit-->
    <a-modal v-model="show_modal_edit"
             centered width="900px"
             title="Edit Farmer"
             okType="primary" ok-text="Edit Farmer" cancel-text="close" @ok="editFarmer">
      <div>
        <a-alert v-if="feedback_two !== ''" type="error" :message=feedback_two banner/>
      </div>

      <div class="row justify-content-between form-content">
        <div class="col-md-6">
          <label for="e-fname">First Name</label>
          <input class="form-input" type="text" v-model="formEdit.firstName" id="e-fname">
          <label for="e-mname">Middle Name </label>
          <input class="form-input" type="text" v-model="formEdit.middleName" id="e-mname">
          <label for="e-lname">Last Name </label>
          <input class="form-input" type="text" v-model="formEdit.lastName" id="e-lname">
          <label for="e-nId">National ID</label>
          <input class="form-input" type="number" v-model="formEdit.nationalId" id="e-nId">
          <label for="e-email">Email</label>
          <input class="form-input" type="email" v-model="formEdit.email" id="e-email"
                 placeholder="eg. example@email.com">
          <label for="e-code">Date of Birth</label><br>
          <a-date-picker :default-value="defaultDob"
                         style="width: 100%; margin-bottom: 10px" @change="editSelectDateOfBirth"/>
        </div>
        <div class="col-md-6">
          <label for="e-pNo">Primary Phone Number</label>
          <input class="form-input" type="number" v-model="formEdit.primaryPhone" id="e-pNo"
                 placeholder="eg. 0712345678">
          <label for="e-sNo">Secondary Phone</label>
          <input class="form-input" type="number" v-model="formEdit.secondaryPhone" id="e-sNo"
                 placeholder="eg. 0712345678">
          <label for="e-code">Farmer Code</label>
          <input class="form-input" type="text" v-model="formEdit.code" id="e-code">
          <label>Region Code</label> <br>
          <a-select v-model="formEdit.regionCode" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="region in regions" :key="region.code">
              {{ region.name }}
            </a-select-option>
          </a-select>
          <label>Gender</label> <br>
          <a-select v-model="formEdit.gender" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="sex in gender" :key="sex.id">
              {{ sex.name }}
            </a-select-option>
          </a-select>
          <label for="e-code">Date of Joining</label><br>
          <a-date-picker :default-value="defaultDoj"
                         style="width: 100%; margin-bottom: 10px" @change="editSelectDateOfJoining"/>
          <br>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="show_modal_edit = false">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading_e" @click="editFarmer">
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
      <a-skeleton active :paragraph="{ rows: 8, width: ['100%','100%','100%','100%','100%', '100%','100%','100%','100%'] }" />
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
          <template slot="name" slot-scope="props">
            {{ props.rowData.firstName }} {{ props.rowData.middleName }} {{ props.rowData.lastName }}
          </template>
          <template slot="phone" slot-scope="props">
            +{{ props.rowData.primaryPhone }}
          </template>
          <template slot="action" slot-scope="props">
            <a-button class="ant-btn ant-btn-sm mb-3" v-if="isSmallDevice" @click="showActions=!showActions">...
            </a-button>
            <div class="table-actions" v-if="!isSmallDevice || showActions">
              <label class="action-btns" @click="viewFarmer(props.rowData.growerCode)">
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
import {Alert, Modal, Spin, DatePicker, notification, Select, Tooltip, Skeleton} from 'ant-design-vue'
import {API} from '../../api'
import moment from "moment";
import router from "../../router";

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
    'a-tooltip': Tooltip,
    'a-skeleton': Skeleton,
  },
  data() {
    return {
      loading: true,
      loading_e: false,
      loading_a: false,
      feedback: '',
      feedback_two: '',
      showActions: false,
      farmers: [],
      gender: [
        {id: 'MALE', name: 'Male'}, {id: 'FEMALE', name: 'Female'}, {id: 'UNKNOWN', name: 'Unknown'}
      ],
      form: {
        firstName: '', lastName: '', primaryPhone: '', nationalId: '', dateOfBirth: '', dateOfJoining: '',
      },
      fields: [
        {name: 'id', title: 'Id'},
        {name: '__slot:name', title: 'Name'},
        {name: 'email', title: 'Email'},
        {name: '__slot:phone', title: 'Phone No'},
        {name: 'nationalId', title: 'National Id'},
        {name: '__slot:action', title: 'Action'}
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
    canAddFarmer() {
      return this.confirmAddFarmer()
    }
  },
  mounted() {
    this.itemsPerPage = 5
  },
  created() {
    this.getFarmers();
    this.getRegions();
  },
  methods: {
    selectDateOfJoining(date, dateString) {
      this.form.dateOfJoining = moment(dateString).format('DD-MM-YYYY')
    },
    selectDateOfBirth(date, dateString) {
      this.form.dateOfBirth = moment(dateString).format('DD-MM-YYYY')
    },
    editSelectDateOfJoining(date, dateString) {
      this.formEdit.dateOfJoining = moment(dateString).format('DD-MM-YYYY')
    },
    editSelectDateOfBirth(date, dateString) {
      this.formEdit.dateOfBirth = moment(dateString).format('DD-MM-YYYY')
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
          this.farmers = response.data.content
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        })
    },
    getRegions() {
      API.get('api/organisation/regions')
        .then(response => {
          this.regions = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    showEditModal(data) {
      this.defaultDob = null;
      this.defaultDoj = null;
      this.show_modal_edit = true
      this.formEdit = {
        id: data.id,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        primaryPhone: data.primaryPhone,
        secondaryPhone: data.secondaryPhone,
        code: data.growerCode,
        regionCode: _.find(this.regions, 'name', data.regionName).code,
        nationalId: data.nationalId,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        dateOfJoining: data.dateOfJoining,
      };
      this.defaultDob = data.dateOfBirth;
      this.defaultDoj = data.dateOfJoining;
    },
    showModal() {
      this.show_modal = true
    },
    createFarmer() {
      this.feedback = '';
      this.loading_a = true
      API.post('api/organisation/farmers', this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Farmer added successfully.'
            })
            this.farmers.push(this.form)
            this.loading_a = false
            this.show_modal = false
          }
        })
        .catch(error => {
          this.loading_a = false
          this.feedback = error.response.data.message
        })

    },
    editFarmer() {
      this.loading_e = true
      API.put(`api/organisation/farmers/${this.formEdit.id}`, this.formEdit)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Farmer edited successfully.'
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
    viewFarmer(id){
      router.push('/farmer/' + id)
    }
  }
}
</script>

<style scoped>

.form-content span {
  color: red;
}
</style>
