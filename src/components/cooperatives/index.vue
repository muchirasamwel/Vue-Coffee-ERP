<template>
  <div>
    <h1 class="tx-center">Cooperatives</h1>
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
        <button class="the-btn sec-color">Add Cooperative</button>
        <search-bar :search-label='"Search cooperatives ..."'></search-bar>
      </div>
      <div>
        <div>
          <vuetable ref="vuetable"
                    :api-mode="true"
                    api-url="https://vuetable.ratiw.net/api/users"
                    :fields="fields"
                    pagination-path=""
                    @vuetable:pagination-data="onPaginationData"
                    :append-params="tableState"
                    :per-page="itemsPerPage"
          >
            <template slot="action" slot-scope="props">
                <span @click="viewDetails(props.rowData.id)"><i
                  class="text-center fa fa-list-alt text-primary"></i> </span>
            </template>
          </vuetable>
        </div>

        <div class="pagination-footer">
          <div>
            <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
          </div>
          <div>
            <span>Rows per page</span>
            <select v-model="itemsPerPage" @change="changePerPage">
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
import vueTableMixin from '../mixins/vuetable_mixin'

export default {
  mixins: [vueTableMixin],
  name: 'index',
  data () {
    return {
      fields: [
        { name: 'name', sortField: 'name' },
        { name: 'email', title: 'Email' },
        { name: 'nickname', title: 'Nickname' },
        { name: 'salary', title: 'Salary' }
      ],
      tableState: {},
      promise: true,
      itemsPerPage: 0
    }
  },
  mounted () {
    this.itemsPerPage = 10
  }
}
</script>

<style scoped>

</style>
