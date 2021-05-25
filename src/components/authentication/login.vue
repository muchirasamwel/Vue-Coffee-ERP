<template>
  <div class="login">
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
        <div class="m-3">
          <label>Email/Username</label>
          <a-input>
            <a-icon slot="suffix" type="user" style="color: rgba(0,0,0,.45)"/>
          </a-input>
        </div>
        <div class="m-3">
          <label>Password</label>
          <a-input-password allow-clear placeholder="input password"/>
        </div>
        <div class="text-center font-bold">
          <span>Forgot <router-link to="/home">Username/Password</router-link> ? </span>
        </div>
        <div class="m-3">
          <button class="sec-color btn-block the-btn">Login</button>
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
import {Icon, Input} from 'ant-design-vue'

export default {
  name: 'login',
  components: {
    'a-input': Input,
    'a-icon': Icon,
    'a-input-password': Input.Password
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
