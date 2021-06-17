import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/layout/Main'
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/account/login'
  },
  {
    path: '/account/login',
    name: 'login',
    component: () => import('../components/authentication/login')
  },
  {
    path: '/home',
    name: 'home',
    component: Main,
    children: [
      {
        path: '/dash',
        name: 'dash',
        component: () => import('../components/dash')
      },
      {
        path: '/cooperatives',
        name: 'cooperatives',
        component: () => import('../components/cooperatives/main')
      },
      {
        path: '/booking',
        name: 'booking',
        component: () => import('../components/booking/index')
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
        path: '/farmer/:id',
        name: 'view Farmer',
        component: () => import('../components/farmers/viewFarmer')
      },
      {
        path: '/user-management',
        name: 'user-management',
        component: () => import('../components/userManagement/index')
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
      },
      {
        path: '/system-configurations',
        name: 'system-configurations',
        component: () => import('../components/systemConfigurations/index')
      },
      {
        path: '/branches',
        name: 'branches',
        component: () => import('../components/systemConfigurations/branch/index')
      },
      {
        path: '/departments',
        name: 'departments',
        component: () => import('../components/systemConfigurations/department/Department')
      },
      {
        path: '/branch-stores',
        name: 'branch-stores',
        component: () => import('../components/systemConfigurations/stores/index')
      },
      {
        path: '/weighbridges',
        name: 'weighbridges',
        component: () => import('../components/systemConfigurations/weighbridges/index')
      },
      {
        path: '/regions',
        name: 'regions',
        component: () => import('../components/systemConfigurations/regions/index')
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router
