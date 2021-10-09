<template>
  <nav class="hide-on-small" id="desktop-nav" v-if="$store.state.loginModule.isLogged">
      <div class="nav-container">
        <router-link to="/dashboard" id="logo">MEDO</router-link>
        <div id="nav-options">
          <router-link to="/dashboard"><Account /></router-link>
        </div>
      </div>
    </nav>
</template>

<script>
import Account from 'vue-material-design-icons/AccountCircle'
export default {
  name: 'NavBar',
  components: {
    Account
  }
}
</script>

<style lang="scss">
nav{
  background: $dark-blue;
  font-weight: 600;
  position: sticky;
  top: 0;
  left: 0;

  .nav-container{
    @include flex-div($justify: space-between);
    margin: 0 auto;
    max-width: 1300px;
    padding: 0 15px;
  }

  #logo{
    font-size: 1.56rem;
    font-weight: 700;
    @extend %white-text;
  }
  a{
    display: block;
    padding: 15px 0;
    color: $light-white;
    transition: all 0.2s ease;

    i{
      font-size: 1.4rem;
    }
  }
  a:hover{
    color: white;
  }
}
</style>