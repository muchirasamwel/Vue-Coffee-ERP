<template>
  <div>
    <div class="navigation-top-bar">
      <div class="page-title">
        <span onclick="history.back()">&#8592;</span>
        <span>{{ cooperative.name }}</span>
        <a-tooltip placement="bottomRight">
          <template slot="title">
            <span>Calender</span>
          </template>
          <div class="icon-div">
            <a-icon class="icon" type="calendar"/>
          </div>
        </a-tooltip>
      </div>
    </div>
    <div class="view-item-body">
      <div class="co-op-details">
        <div class="first-dash">
          <div class="mini-card">
            <div class="item-icon">
              <img src="../../assets/icons/farmers.svg" alt=""  width="50px">
            </div>
            <div>
              <p>Total Farmers</p>
              <span class="stats">{{cooperative.noOfFarmers}}</span>
            </div>
          </div>
          <div class="mini-card">
            <div class="item-icon">
              <img src="../../assets/icons/factory.svg" alt="" width="50px">
            </div>
            <div>
              <p>Factories</p>
              <span class="stats">0</span>
            </div>
          </div>
          <div class="mini-card">
            <div class="item-icon">
              <img src="../../assets/icons/credits.svg" alt=""  width="50px">
            </div>
            <div>
              <p>Credits</p>
              <span class="stats">0</span>
            </div>
          </div>
          <div class="mini-card">
            <div class="item-icon">
              <img src="../../assets/icons/payment.svg" alt=""  width="50px">
            </div>
            <div>
              <p>Payments</p>
              <span class="stats">0</span>
            </div>
          </div>
        </div>
        <a-divider/>
      </div>
    </div>
  </div>
</template>

<script>
import { Divider, Tooltip, Icon } from 'ant-design-vue'
import API from '@/api'

export default {
  name: 'viewCooperative',
  components: {
    'a-divider': Divider,
    'a-icon': Icon,
    'a-tooltip': Tooltip
  },
  data () {
    return {
      cooperative: {}
    }
  },
  methods: {
    getCooperative () {
      const coopCode = this.$route.params.coopCode
      console.log(coopCode)
      API.get('api/organisation/cooperatives/' + coopCode)
        .then(resp => {
          if (resp.status == 200) {
            this.cooperative = resp.data
          }
        })
        .catch(err => {
          console.log('error', err)
        })
    }
  },
  created () {
    this.getCooperative()
  }
}
</script>

<style scoped>

</style>
