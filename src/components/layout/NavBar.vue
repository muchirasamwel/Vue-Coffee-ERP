<template>
  <div>
    <a-back-top />
    <div class="top-bar">
      <div class="left-side">
        <div v-if="!toggle" class="brand">
          <div class="logo">
            <img height="40" width="40" alt="Vue logo" src="../../assets/logo.png">
          </div>
          <div class="name">
            Coffee - ERP
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="notification">
          <a-tooltip placement="bottomRight">
            <template slot="title">
              <span>Notifications</span>
            </template>
            <icon name="bell"></icon>
          </a-tooltip>
        </div>
        <div class="active-user">
          <a-avatar icon="user" />
        </div>
      </div>
    </div>
    <div id="mySidenav" class="sidenav">
      <div class="side-top">
        <div class="side-header">
          <div @click="toggleNav('open')" v-if="!toggle" class="toggle-icon">
            <icon name="menu"/>
          </div>
          <div class="brand-name" v-if="toggle">
            <div class="logo">
              <img height="40" width="40" alt="Vue logo" src="../../assets/logo.png">
            </div>
            <div class="name">
              Coffee - ERP
            </div>
          </div>
          <div class="close-btn" @click="toggleNav('close')" v-if="toggle">
            <icon @click="toggleNav('close')" v-if="toggle" name="x"/>
          </div>
        </div>
        <div>
          <div v-if="toggle">
            <div class="sub-dept">
              Corporative Name
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">
        <div id="content-wrap" class="content-wrap">
          <div class="side-nav-item active">
            <div class="collapse-label">
              <div class="item-icon">
                <i class="el-icon-odometer"></i>
              </div>
              <div class="item-label" v-if="toggle">
                Dashboard
              </div>
            </div>
          </div>
          <div class="side-nav-item">
            <router-link to="/farmers">
              <div class="collapse-label">
                <div class="item-icon">
                  <i class="el-icon-connection"></i>
                </div>
                <div class="item-label" v-if="toggle">
                  Farmer
                </div>
              </div>
            </router-link>
          </div>
          <div class="side-nav-item">
            <router-link to="/cooperatives">
              <div class="collapse-label">
                <div class="item-icon">
                  <i class="el-icon-full-screen"></i>
                </div>
                <div class="item-label" v-if="toggle">
                  Corporatives
                </div>
              </div>
            </router-link>
          </div>
          <div class="side-nav-item">
            <div class="tab">
              <input type="checkbox" id="user">
              <label class="tab-label" for="user">
                <div class="collapse-label">
                  <div class="item-icon">
                    <i class="el-icon-user"></i>
                  </div>
                  <div class="item-label" v-if="toggle">
                    User Management
                  </div>
                </div>
              </label>
              <div class="tab-content">
                <router-link to="/users"><p>Users</p></router-link>
                <router-link to="/departments"><p>Departments</p></router-link>
                <router-link to="/branches"><p>Branches</p></router-link>
                <router-link to="/permissions"><p>Permissions</p></router-link>
                <router-link to="/roles"><p>User Groups</p></router-link>
              </div>
            </div>
          </div>
          <div class="side-nav-item">
            <div class="collapse-label">
              <div class="item-icon">
                <i class="el-icon-date"></i>
              </div>
              <div class="item-label" v-if="toggle">
                Booking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-slot" id="main">
      <div class="content-wrapper the-card">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { Tooltip, Avatar, BackTop } from 'ant-design-vue'
export default {
  name: 'NavBar',
  components: {
    'a-tooltip': Tooltip,
    'a-avatar': Avatar,
    'a-back-top': BackTop
  },
  data () {
    return {
      toggle: false,
      screenWidth: '',
      showMenu: false
    }
  },
  mounted () {
    const items = document.getElementsByClassName('side-nav-item')
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function () {
        const current = document.getElementsByClassName('active')
        current[0].className = current[0].className.replace(' active', '')
        this.className += ' active'
      })
    }
    this.screenWidth = window.screen.width
    if (this.screenWidth < 451) {
      this.showMenu = true
    }
  },
  methods: {
    toggleNav: function (action) {
      if (action === 'open') {
        if (this.screenWidth > 450) {
          document.getElementById('main').style.marginLeft = '230px'
        } else {
          document.getElementById('main').style.marginLeft = '0px'
        }
        document.getElementById('mySidenav').style.transition = 'width 0.3s'
        document.getElementById('mySidenav').style.width = '230px'
        this.toggle = true
      } else {
        if (this.screenWidth > 450) {
          document.getElementById('main').style.marginLeft = '55px'
          document.getElementById('mySidenav').style.width = '55px'
        } else {
          document.getElementById('main').style.marginLeft = '0px'
          document.getElementById('mySidenav').style.width = '0px'
        }
        this.toggle = false
      }
    }
  }
}
</script>

<style scoped lang="scss">

a:link {
  text-decoration: none;
}

.icon {
  color: #2c3e50;
}
</style>
