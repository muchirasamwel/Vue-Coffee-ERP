<template>
  <div>
    <!--add coffee type-->
    <a-modal v-model="add_coffee_type_modal" centered title="Add Coffee Type">
      <div class="">
        <label>Coffee Type</label>
        <input class="form-input" type="text" v-model="form.coffeeType">

        <label>Maximum Moisture Limit</label>
        <input class="form-input" type="number" v-model="form.maximumMoistureLimitPerc">

        <label>Auto Approve If Moisture Start</label>
        <input class="form-input" type="number" v-model="form.autoApproveIfMoistureStart">

        <label>Auto Approve If Moisture End</label>
        <input class="form-input" type="number" v-model="form.autoApproveIfMoistureEnd">

        <label>Description</label>
        <textarea cols="10" rows="5" class="form-input" v-model="form.description">
          </textarea>

      </div>
      <template slot="footer">
        <a-button key="back" @click="handleCancel('add')">
          Cancel
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="addCoffeeType">
          Add Grade
        </a-button>
      </template>
    </a-modal>
    <!--    add coffee type-->
    <button class="the-btn sec-color px-3 my-3" @click="add_coffee_type_modal=true">Add Coffee Types</button>

    <div>
      <vuetable ref="vuetable"
                :api-mode="false"
                :fields="fields"
                :per-page="itemsPerPage"
                :data-manager="dataManager"
                pagination-path="pagination"
                @vuetable:pagination-data="onPaginationData">
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
</template>
<script>
import vueTableMixin from '@/components/mixins/vuetable_mixin'
import responsiveMixin from '@/components/mixins/responsiveMixin'
import { mapGetters } from 'vuex'
import API from '@/api'
import { Modal, notification } from 'ant-design-vue'

export default {
  name: 'CoffeeTypes',
  mixins: [vueTableMixin, responsiveMixin],
  components: {
    'a-modal': Modal
  },
  data () {
    return {
      form: {},
      tableState: {},
      itemsPerPage: 10,
      loading: false,
      add_coffee_type_modal: false,
      fields: [
        {
          name: 'coffeeType',
          title: 'Coffee Type'
        },
        {
          name: 'maximumMoistureLimitPerc',
          title: 'Maximum Moisture Limit'
        },
        {
          name: 'autoApproveIfMoistureStart',
          title: 'Auto Approve If Moisture Start'
        },
        {
          name: 'autoApproveIfMoistureEnd',
          title: 'Auto Approve If Moisture End'
        },
        {
          name: 'description',
          title: 'Description'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      coffeeTypes: 'coffeeTypes'
    })
  },
  methods: {
    handleCancel (type) {
      if (type === 'add') {
        this.add_coffee_type_modal = false
      }
    },
    dataManager (sortOrder, pagination) {
      if (this.coffeeTypes.length < 1) return
      let local = this.coffeeTypes

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
    async addCoffeeType () {
      this.loading = true
      const payload = Object.assign({}, this.form)
      await API.post('api/booking/v1/coffeeTypes', payload)
        .then(res => {
          if (res.data.status === 0) {
            notification.success({
              message: 'Coffee type added successfully'
            })
          } else {
            notification.error({
              message: 'An error occurred when adding coffee type'
            })
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          console.log('post error' + err)
        })
      await this.$store.commit('FETCH_COFFEE_TYPES')
      this.$refs.vuetable.reload()
    }
  },
  created () {
    if (this.coffeeTypes.length === 0) {
      this.$store.commit('FETCH_COFFEE_TYPES')
      // console.log('Fetching types')
    }
    // console.log(this.coffeeTypes, 'types')
  }
}
</script>
