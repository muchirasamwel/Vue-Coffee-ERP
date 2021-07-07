<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
}
</script>

<style lang="scss">
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nprogress .bar {
  background: #008cff !important;
  height: 4px !important;
}
#nprogress .spinner-icon{
  border:  none !important
}

.icon {
  width: 24px;
}

</style>
