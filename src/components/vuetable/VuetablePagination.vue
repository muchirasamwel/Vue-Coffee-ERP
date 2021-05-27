<template>
  <div v-if="tablePagination && tablePagination.last_page > 1" :class="css.wrapperClass"
      >
    <a @click="loadPage('prev')"
       style="margin-right: 20px"
      :class="['btn-nav', css.linkClass, isOnFirstPage ? css.disabledClass : '']">
        <i v-if="icons.next !== ''">
          <div class="pagination-btn" @click="prev()">
            &#8592;
          </div>
        </i>
        <span v-else></span>
    </a>
    <a @click="loadPage('next')"
      :class="['btn-nav', css.linkClass, isOnLastPage ? css.disabledClass : '']">
      <i v-if="icons.next !== ''">
          <div class="pagination-btn" @click="next()">
            &#8594;
          </div>
      </i>
      <span v-else></span>
    </a>
  </div>
</template>

<script>
import PaginationMixin from './VuetablePaginationMixin.vue'

export default {
  mixins: [PaginationMixin]
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
