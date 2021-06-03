export default {
  data () {
    return {
      windowWidth: window.innerWidth,
      isSmallDevice: false
    }
  },

  watch: {
    windowWidth (newWidth, oldWidth) {
      console.log(newWidth)
      this.toggleDevice()
    }
  },

  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
    this.toggleDevice()
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize () {
      this.windowWidth = window.innerWidth
    },
    toggleDevice () {
      if (this.windowWidth <= 450) {
        this.isSmallDevice = true
      } else {
        this.isSmallDevice = false
      }
    }
  }
}
