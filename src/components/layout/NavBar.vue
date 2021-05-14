<template>
  <div>
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
          <el-tooltip class="item" effect="dark" content="Notifications" placement="bottom-end">
            <icon name="bell"></icon>
          </el-tooltip>
        </div>
        <div class="active-user">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
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
      <div class="content-wrap">
        <div class="side-nav-item">
          <div class="item-icon">
            <icon name="eye"></icon>
          </div>
          <div class="item-label" v-if="toggle">
            Farmer
          </div>
        </div>
        <div class="side-nav-item">
          <div class="item-icon">
            <icon name="activity"></icon>
          </div>
          <div class="item-label" v-if="toggle">
            Corporate
          </div>
        </div>
        <div class="side-nav-item">
          <div class="item-icon">
            <icon name="users"></icon>
          </div>
          <div class="item-label" v-if="toggle">
            <div class="tab">
              <input type="checkbox" id="user">
              <label class="tab-label" for="user">User Management</label>
              <div class="tab-content">
                <p>Roles</p>
                <p>Permissions</p>
              </div>
            </div>
          </div>
        </div>
        <div class="side-nav-item">
          <div class="item-icon">
            <icon name="archive"></icon>
          </div>
          <div class="item-label" v-if="toggle">
           Booking
          </div>
        </div>
      </div>
      </div>
      <div class="collapse-btn">
        <i @click="toggleNav('close')" v-if="toggle" class="el-icon-d-arrow-left"></i>
        <i @click="toggleNav('open')" v-else class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <div class="content-slot" id="main">
      <div class="content-wrapper the-card">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
      toggle: false,
      screenWidth: '',
      showMenu: false
    }
  },
  mounted () {
    this.screenWidth = window.screen.width
    if (this.screenWidth < 451) {
      this.showMenu = true
    }
  },
  methods: {
    toggleNav: function (action) {
      if (action === 'open') {
        if (this.screenWidth > 450) {
          document.getElementById('main').style.marginLeft = '300px'
        } else {
          document.getElementById('main').style.marginLeft = '0px'
        }
        document.getElementById('mySidenav').style.transition = 'width 0.3s'
        document.getElementById('mySidenav').style.width = '300px'
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
.icon {
  color: #2c3e50;
}
</style>
