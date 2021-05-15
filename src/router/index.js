import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cooperatives',
    name: 'Cooperatives',
    component: () => import('../components/cooperatives/index')
  },
  {
    path: '/farmers',
    name: 'Farmers',
    component: () => import('../components/farmers/index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
