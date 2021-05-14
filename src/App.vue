<template>
  <div id="app">
    <NavBar/>
  </div>
</template>
<script>
import NavBar from './components/layout/NavBar'
export default {
  components: { NavBar }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.icon {
  width: 24px;
}

</style>
