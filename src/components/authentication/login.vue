<template>
  <div class="login">
    <p>0704034231</p>
    <div class="brand mb-2">
      <img height="120" width="120" alt="Vue logo" src="../../assets/logo.png">
    </div>
    <div class="login-details">
      <div class="left-items">
        <div class="details">
          <div class="logo mt-5">
            <img height="120" width="120" alt="Vue logo" src="../../assets/logo.png">
          </div>
          <div class="text-center desc">
            <div class="text-dec">
              <p><span class="h5">Welcome to Coffee ERP</span><br><br>
                Track your coffee processing and sale in one place with ease.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right-items">
        <h5 class="text-center mt-5">Login To Proceed</h5><br>
        <div class="mx-3">
          <a-alert v-if="feedback !== ''" type="error" :message=feedback banner/>
        </div>
        <div class="m-3">
          <label>Email or Phone</label>
          <a-input v-model="form.username" allow-clear placeholder="Input email or phone">
            <a-icon slot="suffix" type="user" style="color: rgba(0,0,0,.45)"/>
          </a-input>
          <span v-if="isEmail" class="text-danger">Please provide email or phone</span>
        </div>
        <div class="m-3">
          <label>Password</label>
          <a-input-password v-model="form.password" allow-clear placeholder="Input password"/>
          <span v-if="isPassword" class="text-danger">Please provide password</span>
        </div>
        <div class="text-center font-bold">
          <span>Forgot <router-link to="/home">account</router-link> ? </span>
        </div>
        <div class="m-3">
          <a-button @click="confirmLogin" type="primary" class="btn-block the-btn" :loading="loading">Login</a-button>
        </div>
        <div class="text-center mb-3" style="font-weight: bold">
          <span>New member ? <router-link to="/">Create Account</router-link>. </span>
        </div>
        <div class="text-center font-italic">
              <span>Facing sny issues using the system? <br>
                Please reach out to us at erps@shamba.com<br>
              or<br>call +254712345678</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Alert, Input, notification } from 'ant-design-vue'
import API from '../../api'
import router from '../../router'
import axios from 'axios'

export default {
  name: 'login',
  components: {
    'a-input': Input,
    'a-icon': Icon,
    'a-input-password': Input.Password,
    'a-alert': Alert
  },

  data () {
    return {
      loading: false,
      feedback: '',
      form: {
        username: '',
        password: ''
      },
      isEmail: false,
      isPassword: false
    }
  },
  methods: {
    confirmLogin () {
      this.feedback = '';
      (this.form.password === '') ? this.isPassword = true : this.isPassword = false;
      (this.form.username === '') ? this.isEmail = true : this.isEmail = false
      if (!(this.isPassword || this.isEmail)) {
        this.login()
      }
    },
    login () {
      this.loading = true
      axios.post(process.env.VUE_APP_BASE_URL + 'api/usermanagement/token', {
        username: this.form.username,
        password: this.form.password
      })
        .then(res => {
          this.isPassword = false
          this.isEmail = false
          if (res.data.status === 0) {
            localStorage.api_token = res.data.token
            this.$store.commit('SET_LOGGEDINUSER', res.data)
            this.loading = false
            notification.success({
              message: 'Login successfully'
            })
            router.push({ name: 'dash' })
          }
        })
        .catch(error => {
          this.isPassword = false
          this.isEmail = false
          this.loading = false
          if (error.response.status === 403) {
            this.feedback = error.response.data.message
          } else {
            notification.error({
              message: 'An error occurred during sign in. Try again'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
