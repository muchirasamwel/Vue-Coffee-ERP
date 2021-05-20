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
    name: 'cooperatives',
    component: () => import('../components/cooperatives/index')
  },
  {
    path: '/cooperatives/:id',
    name: 'view Cooperative',
    component: () => import('../components/cooperatives/viewCooperative')
  },
  {
    path: '/farmers',
    name: 'farmers',
    component: () => import('../components/farmers/index')
  },
  {
    path: '/farmers/:id',
    name: 'view Farmer',
    component: () => import('../components/farmers/viewFarmer')
  },
  {
    path: '/branches',
    name: 'branches',
    component: () => import('../components/userManagement/Branches')
  },
  {
    path: '/departments',
    name: 'departments',
    component: () => import('../components/userManagement/department/Department')
  },
  {
    path: '/departments/:id',
    name: 'view Department',
    component: () => import('../components/userManagement/department/viewDepartment')
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import('../components/userManagement/roles/Roles')
  },
  {
    path: '/roles/:id',
    name: 'role details',
    component: () => import('../components/userManagement/roles/details')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../components/userManagement/user/Users')
  },
  {
    path: '/users/:id',
    name: 'user details',
    component: () => import('../components/userManagement/user/details')
  },
  {
    path: '/permissions',
    name: 'Permissions',
    component: () => import('../components/userManagement/permission/Permissions')
  },
  {
    path: '/permissions/:id',
    name: 'permission details',
    component: () => import('../components/userManagement/permission/details')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
