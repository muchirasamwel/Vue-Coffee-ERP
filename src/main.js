import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/main.sass'
import './assets/styles/app.scss'
import feather from 'vue-icon'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueEvents from 'vue-events'
window.Vue = Vue

require('./component')
Vue.use(VueEvents)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(feather)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
