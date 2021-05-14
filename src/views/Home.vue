<template>
  <div class="home">
    <img  width="100" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Our Coffee ERP / E-Commerce"/>
    <button class="btn btn-primary">Get Started</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
