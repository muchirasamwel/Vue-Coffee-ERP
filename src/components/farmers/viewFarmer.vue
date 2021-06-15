<template>
  <div>
    <div class="navigation-top-bar">
      <span onclick="history.back()">&#8592;</span>
    </div>
    <div>
      <div v-if="loading" class="view-item-body">
        <a-skeleton/>
        <a-skeleton/>
      </div>
      <div v-if="feedback !== ''" class="view-item-body">
        <a-alert
          message="Error"
          description="This farmer cannot be fetched, an error occurred."
          type="error"
          show-icon
        />
      </div>
      <div v-if="farmer !== ''">
        <div class="view-item-body">
          <div class="item-tittle">Farmer Details</div>
          <table class="table table-hover">
            <tbody>
            <tr>
              <td class="bold">
                Name
              </td>
              <td>
                {{ farmer.firstName }} {{ farmer.middleName }} {{ farmer.lastName }}
              </td>
              <td class="bold">
                Date of Joining
              </td>
              <td>
                {{ farmer.dateOfJoining }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Id Number
              </td>
              <td>
                {{ farmer.nationalId }}
              </td>
              <td class="bold">
                Date of Birth
              </td>
              <td>
                {{ farmer.dateOfBirth }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Email
              </td>
              <td>
                {{ farmer.email }}
              </td>
              <td class="bold">
                Farmer Code
              </td>
              <td>
                {{ farmer.growerCode }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Phone Number
              </td>
              <td>
                +{{ farmer.primaryPhone }}
              </td>
              <td class="bold">
                Farmer Region
              </td>
              <td>
                {{ farmer.regionName }}
              </td>
            </tr>
            <tr>
              <td class="bold">
                Secondary Number
              </td>
              <td v-if="farmer.secondaryPhone">
                +{{ farmer.secondaryPhone }}
              </td>
              <td v-else>
                nil
              </td>
              <td class="bold">
                Gender
              </td>
              <td>
                {{ farmer.gender }}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="view-item-body" style="margin-top: 10px">
          <div class="item-tittle">Farmer Farms</div>
          <div>
            <a-collapse>
              <a-collapse-panel key="1" header="View Farmer farms">
                <a-button type="primary" @click="show_modal = true">Add Farm</a-button>
                <div v-if="loading_farms" class="view-item-body">
                  <a-skeleton/>
                </div>
                <div v-if="feedback_two !== ''" class="view-item-body">
                  <a-alert
                    message="Error"
                    description="Error occurred while retrieving farmer farms"
                    type="error"
                    show-icon
                  />
                </div>
                <div v-if="farms !== ''">
                  <table class="table custom-table table-bordered table-hover">
                    <thead>
                    <tr>
                      <th>Id</th>
                      <th>Location</th>
                      <th>Number of Acres</th>
                      <th>Number of Trees</th>
                      <th>Region</th>
                    </tr>
                    </thead>
                    <tbody v-for="farm in farms">
                    <tr>
                      <td>{{ farm.id }}</td>
                      <td>{{ farm.location }}</td>
                      <td>{{ farm.noOfAcres }}</td>
                      <td>{{ farm.noOfTrees }}</td>
                      <td>{{ farm.regionName }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div v-if="farms ===''">
                  This Farmer has no farms
                </div>
              </a-collapse-panel>
            </a-collapse>
          </div>
        </div>
      </div>
    </div>
    <!--    add farmer farm-->
    <a-modal v-model="show_modal"
             title="Add Farm"
             okType="primary" ok-text="Add Farm" cancel-text="close">
      <div>
        <a-alert v-if="feedback_add !== ''" type="error" :message=feedback_add banner/>
      </div>
      <div class="form-content">
        <div>
          <label for="loc">Location<span>*</span></label>
          <input class="form-input" type="text" v-model="form.location" id="loc">
        </div>
        <div>
          <label for="acres">No of Acres<span>*</span></label>
          <input class="form-input" type="text" v-model="form.noOfAcres" id="acres">
        </div>
        <div>
          <label for="trees">No of Trees</label>
          <input class="form-input" type="text" v-model="form.noOfTrees" id="trees">
        </div>
        <div>
          <label>Region</label>
          <a-select v-model="form.regionCode" style="width: 100%; margin-bottom: 10px">
            <a-select-option v-for="region in regions" :key="region.code">
              {{ region.name }}
            </a-select-option>
          </a-select>
        </div>
        <div>
          <label for="desc">Description<span>*</span></label>
          <textarea class="form-input" rows="5" style="height: auto !important;" type="text" v-model="form.description"
                    id="desc"/>
        </div>
      </div>
      <template slot="footer">
        <a-button key="back" @click="show_modal = false">
          Close
        </a-button>
        <a-tooltip v-if="!canAddFarm" placement="leftTop">
          <template slot="title">
            <span>Fill all required fields</span>
          </template>
          <a-button key="submit" type="primary" style="margin-left: 10px" :disabled="true">
            Add Farm
          </a-button>
        </a-tooltip>
        <a-button key="submit" type="primary" v-if="canAddFarm" :loading="loading_add" @click="createFarm">
          Add Farm
        </a-button>
      </template>
    </a-modal>
    <!--    add farmer farm-->
  </div>
</template>

<script>
import API from "../../api";
import {Alert, Skeleton, Collapse, Select, Modal, notification} from "ant-design-vue";

export default {
  components: {
    'a-alert': Alert,
    'a-skeleton': Skeleton,
    'a-collapse': Collapse,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-collapse-panel': Collapse.Panel,
    'a-modal': Modal,
  },
  name: 'viewFarmer',
  data() {
    return {
      feedback: '',
      loading: false,
      farmer: '',
      farms: '',
      loading_farms: false,
      loading_add: false,
      feedback_two: '',
      feedback_add: '',
      show_modal: false,
      form: {
        location: '', noOfAcres: '', noOfTrees: '', description: '', regionCode: ''
      },
      regions: ''
    }
  },
  computed: {
    canAddFarm() {
      return this.confirmAddFarm()
    }
  },
  mounted() {
    this.getFarmer(this.$route.params.id)
    this.getFarmerFarms(this.$route.params.id)
  },
  created() {
    this.getRegions();
  },
  methods: {
    confirmAddFarm() {
      return this.form.location !== '' && this.form.noOfAcres !== '' &&
        this.form.description !== ''
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
    getFarmer(id) {
      this.loading = true
      API.get(`api/organisation/farmers/${id}`)
        .then(response => {
          this.farmer = response.data
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.feedback = err.response.data
        })
    },
    getFarmerFarms(id) {
      this.loading_farms = true
      API.get(`api/organisation/farmers/${id}/farm`)
        .then(response => {
          this.farms = response.data
          this.loading_farms = false
        })
        .catch(err => {
          this.loading_farms = false
          this.feedback_two = err.response.data
        })
    },
    createFarm() {
      let id = this.farmer.id
      this.loading_add = true
      API.post(`api/organisation/farmers/${id}/farm`, this.form)
        .then(response => {
          if (response.data.status === 0) {
            notification.success({
              message: 'Farm saved successfully.'
            })
          }
          this.loading_add = false
          this.show_modal = false
        })
        .catch(error => {
          this.loading_add = false
          this.feedback_add = error.response.data.message
        })    }
  }
}
</script>

<style scoped lang="sass">
.form-content
  span
    color: red

.item-tittle
  font-weight: bold
  font-size: 20px
  padding: 0 10px
  margin-bottom: 20px
  color: #008cff

.custom-table
  margin-top: 10px

.sub-title
  padding: 20px 0
  color: #1fd242
  font-weight: bold

.bold
  font-weight: bold

@media only screen and (max-width: 450px)
  .custom-table
    width: 100%
</style>

