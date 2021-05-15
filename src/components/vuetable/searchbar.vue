<template>
    <div class="table_top_bar">
        <div class="input-group">
            <input type="text" placeholder="Search ..." v-model="searchText" @keyup="doSearch" class="search-input">
        </div>
    </div>
</template>

<script type="text/babel">
export default {
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    doSearch () {
      this.$events.fire('search-set', { id: this.tableId, data: this.searchText })
    }
  },
  props: {
    tableId: { default: 'erp_table' }
  }
}
</script>
