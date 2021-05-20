import Vuetable from '../vuetable/Vuetable.vue'
import VuetablePagination from '../vuetable/VuetablePagination.vue'
import VuetablePaginationInfo from '../vuetable/VuetablePaginationInfo.vue'
import Vue from 'vue'

const vueTableMixin = {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  data () {
    return {
      tableId: 'erp_table',
      itemsPerPage: this.itemsPerPageOptionsInit[0],
      itemsPerPageOptions: this.itemsPerPageOptionsInit
    }
  },
  props: {
    itemsPerPageOptionsInit: {
      default: function () {
        return [5, 10, 25, 50, 100]
      }
    }
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    changePerPage () {
      this.tableState.per_page = this.itemsPerPage
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    }
  },
  events: {
    'search-set' (searchText) {
      if (searchText.id === this.tableId) {
        this.tableState.search = searchText.data
        if (this.promise) {
          this.promise = false
          setTimeout(() => {
            Vue.nextTick(() => this.$refs.vuetable.refresh())
            this.promise = true
          }, 400)
        }
      }
    },
    'filter-start-date' (date) {
      if (date.id === this.tableId) {
        this.tableState.start_date = date.data
        if (this.promise) {
          this.promise = false
          setTimeout(() => {
            Vue.nextTick(() => this.$refs.vuetable.refresh())
            this.promise = true
          }, 400)
        }
      }
    },
    'filter-end-date' (date) {
      if (date.id === this.tableId) {
        this.tableState.end_date = date.data
        if (this.promise) {
          this.promise = false
          setTimeout(() => {
            Vue.nextTick(() => this.$refs.vuetable.refresh())
            this.promise = true
          }, 400)
        }
      }
    }
  }
}

export default vueTableMixin
