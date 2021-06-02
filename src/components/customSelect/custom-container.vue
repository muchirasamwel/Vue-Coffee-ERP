<template>
  <div class="custom-container">
    <div class="item-container my-2" @click="selectItem(item.id)" v-for="item in items" :key="item.id"
         :class="{'pointer-hand':type=='select'}">

      <!--      coffee container-->
      <div v-if="type=='coffee-container'">
        {{ item.coffeeType }}
      </div>
      <div v-if="type=='coffee-container'">
        {{ item.noOfbags }} {{ units }}
      </div>
      <!--      coffee container-->

      <div>
        {{ item.name }}
      </div>
      <div v-if="type=='select'">
        <div class="item-icon" v-if="item.selected==1">
          <img src="../../assets/icons/ticked.svg" alt="" width="20px">
        </div>
      </div>
      <div class="item-icon pointer-hand" v-else @click="deleteItem(item.id)">
        <img src="../../assets/icons/delete.svg" alt="" width="20px">
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from '@/events'

export default {
  props: {
    type: { default: 'container' },
    units: { default: '' },
    initialItems: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    selectItem (id) {
      if (this.type === 'select') {
        this.$emit('select', id)
      }
    },
    deleteItem (id) {
      this.$emit('delete', id)
    }
  },
  created () {
    this.items = this.initialItems
    eventBus.$on('updateSelectData', (data) => {
      this.items = data
    })
  }
}
</script>
<style scoped lang="sass">
.pointer-hand
  cursor: pointer
</style>
