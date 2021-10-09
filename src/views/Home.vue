<template>
  <div class="home">
    <div id="main-grid">
      <div id="login-div">
        <div>
          <div>
            <h2 class="orange-text">Welcome to ME-DO!</h2>
            <h6 class="dark-blue-text">Login/Create an account to get started</h6>
          </div>
          <form action="" id="login-form" class="padding-15-0" @submit.prevent="login">
            <input-box id="username" labelText="Username" :required="true"></input-box>
            <input-box id="password" type="password" labelText="Password" :required="true"></input-box>
            <div class="button-div padding-40-0">
              <button class="orange-button" @click="login">Login</button>
              <button type="button" class="outlined-button" @click="register">Register</button>
              <!-- <base-button buttonText="Login" />
              <base-button buttonText="Register" buttonClass="outline-button" /> -->
            </div>
          </form>
        </div>
      </div>
      <div id="intro-div">
        <div>
          <div class="image-div" id="intro-image-div">
            <img src="/images/blue_image.svg" alt="">
          </div>
          <div class="center">
            <h1 class="orange-text">ME-DO</h1>
            <h6 class="dark-blue-text">Track your daily TODOS</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputBox from '../components/InputBox.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    InputBox,
  },
  methods: {
    login () {
      const form = new FormData(document.getElementById('login-form'))
      const data = {}
      let ok = true
      for (let [l, r] of form) {
        if (r == "") {
          ok = false
        }
        data[l] = r
      }
      if (ok) {
        // submit form
        // for now just going to next page
        // window.localStorage.setItem("isLogged", true)
        this.$store.commit('setLoggedIn')
        this.$router.replace({ name: 'Dashboard' })
      } else {
        // 
      }
    },
    register () {

    }
  }
}
</script>
<style lang="scss">
@include padding-dynamic(15 40, 0);
@import '@/assets/css/buttons.scss';

#main-grid{
  display: grid;
  grid-template-columns: 1fr 2fr;

  > div{
    @include flex-div;
    padding: 15px;
  }

  #login-div{
    min-width: 380px;
  }

  #intro-div{
    background: $light-orange;
    min-height: 100vh;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    box-shadow: 0px 0px 10px rgba($dark-blue, 0.2);
  }
  #intro-image-div img{
    max-width: 380px;
  }
}
</style>