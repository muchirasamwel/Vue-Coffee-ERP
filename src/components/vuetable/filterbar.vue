<script type="text/babel">

export default {

  props: {
    tableId: { default: 'erp_table' },
    searchLabel: { default: 'Search ...' }
  },

  data () {
    return {
      start_date: '',
      end_date: '',
      searchText: ''
    }
  },

  watch: {
    start_date: {
      handler: function () {
        this.$events.fire('filter-start-date', { id: this.tableId, data: this.start_date })
      }
    },
    end_date: {
      handler: function () {
        this.$events.fire('filter-end-date', { id: this.tableId, data: this.end_date })
      }
    }
  },
  methods: {
    doSearch () {
      this.$events.fire('search-set', { id: this.tableId, data: this.searchText })
    }
  }
}
</script>

<template>
    <div>
        <div class="filters">
            <el-date-picker
                v-model="start_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="Start Date"
                width="100%">
            </el-date-picker>

            <el-date-picker
                v-model="end_date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="End Date"
                width="100%">
            </el-date-picker>
            <el-input
                style="width: 218px"
                @keyup.native="doSearch"
                placeholder="Search .."
                v-model="searchText">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
    </div>
</template>
