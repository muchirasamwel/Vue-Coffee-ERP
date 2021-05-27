<template>
  <a-table
    :columns="columns"
    :row-key="record => record.id"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
  </a-table>
</template>
<script>

import axios from 'axios'
import {Table} from 'ant-design-vue'
const queryData = params => {
  return axios.get('https://vuetable.ratiw.net/api/users', { params: params })
}
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Nickname',
    dataIndex: 'nickname'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]

export default {
  components: {
    'a-table': Table
  },
  data () {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current_page
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current_page,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    fetch (params = {}) {
      this.loading = true
      queryData({
        results: 10,
        ...params
      }).then(({ data }) => {
        const pagination = { ...this.pagination }
        pagination.total = data.total
        this.loading = false
        this.data = data.data
        this.pagination = pagination
      })
    }
  }
}
</script>
