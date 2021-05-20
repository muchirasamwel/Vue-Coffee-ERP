<template>
  <div>
    <div class="navigation-top-bar">
      <div>
        <span onclick="history.back()">&#8592;</span>
        <span>Cooperative Name</span>
      </div>
      <a-tooltip placement="bottomRight">
        <template slot="title">
          <span>Calender</span>
        </template>
        <div class="icon-div">
          <a-icon class="icon" type="calendar"/>
        </div>
      </a-tooltip>
    </div>
    <div class="view-item-body">
      <div class="co-op-details">
        <div class="first-dash">
          <div class="mini-card">
            Total Farmers
          </div>
          <div class="mini-card">
            Factories
          </div>
          <div class="mini-card">
            Credits
          </div>
          <div class="mini-card">
            Payments
          </div>
          <div class="mini-card">
            Inventory
          </div>
          <div class="mini-card">
            Bookings
          </div>
        </div>
        <a-divider/>
      </div>
    </div>
  </div>
</template>

<script>
import { Divider, Tooltip, Icon } from 'ant-design-vue'

export default {
  name: 'viewCooperative',
  components: {
    'a-divider': Divider,
    'a-icon': Icon,
    'a-tooltip': Tooltip
  }
}
</script>

<style scoped>

</style>
