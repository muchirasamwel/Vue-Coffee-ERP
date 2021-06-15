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
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nprogress .bar {
  background: #1fd242 !important;
  height: 4px !important;
}
#nprogress .spinner-icon{
  border:  none !important
}

.icon {
  width: 24px;
}

</style>
