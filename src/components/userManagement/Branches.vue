<template>
  <div>
    <Modal modalClass="clas" v-model="showModal" @before-open="beforeOpen" @before-close="beforeClose" title="My first modal">
      <p>Modal content goes here...</p>
    </Modal>
    <h3 class="tx-center">Branches</h3>
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
      <button class="the-btn sec-color" @click="showModal=true">Add Branch</button>
      <search-bar :search-label='"Search branch ..."'></search-bar>
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
                  class="el-icon-view"></i> </span>
          </template>
        </vuetable>
      </div>

      <div class="pagination-footer">
        <div>
          <vuetable-pagination-info ref="paginationInfo"></vuetable-pagination-info>
        </div>
        <div>
          <span>Rows per page</span>
          <select style="background-color: #e3e6eb;outline: none; cursor: pointer ;border: none; border-radius: 9px" v-model="itemsPerPage" @change="changePerPage">
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
import bodyScroll from 'body-scroll-freezer'
export default {
  mixins: [vueTableMixin],
  name: 'Branches',
  data () {
    return {
      fields: [
        { name: 'name', sortField: 'name', title: 'Branch Name' },
        { name: 'nickname', title: 'Branch Code' },
        { name: '__slot:action', title: 'Action' }
      ],
      showModal: false,
      tableState: {},
      promise: true,
      itemsPerPage: 0
    }
  },
  mounted () {
    this.itemsPerPage = 10
    bodyScroll.init()
  },
  methods: {
    beforeOpen () {
      bodyScroll.freeze()
    },
    beforeClose () {
      bodyScroll.unfreeze()
    }
  }
}
</script>

<style lang="scss" scoped>
.clas{
  border-radius: 8px;
  background-color: red;
}
</style>
