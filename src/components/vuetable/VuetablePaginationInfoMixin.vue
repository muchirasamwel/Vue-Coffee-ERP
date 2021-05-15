<script>
export default {
  props: {
    infoClass: {
      type: String,
      default() {
        return 'left floated left aligned six wide column'
      }
    },
    infoTemplate: {
      type: String,
      default() {
        return "<span class='data'>Showing {from} - {to} of {total}</span>"
      }
    },
    noDataTemplate: {
      type: String,
      default() {
        return '<span class="no_data">No relevant data</span>'
      }
    },
  },
}
</script>
