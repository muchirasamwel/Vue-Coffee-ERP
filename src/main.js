import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/main.sass'
import './assets/styles/app.scss'
import feather from 'vue-icon'
import 'element-ui/lib/theme-chalk/index.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueEvents from 'vue-events'
import { Button, Modal, notification } from 'ant-design-vue'

window.Vue = Vue

require('./component')
Vue.use(Button, Modal, notification)
Vue.prototype.$confirm = Modal.confirm
// Vue.prototype.$message = message
Vue.prototype.$notification = notification
// Vue.prototype.$info = Modal.info
// Vue.prototype.$success = Modal.success
// Vue.prototype.$error = Modal.error
// Vue.prototype.$warning = Modal.warning
Vue.use(VueEvents)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(feather)
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
