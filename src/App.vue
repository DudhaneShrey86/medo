<template>
  <div id="app">
    <nav-bar v-if="$store.state.loginModule.isLogged" />
    <main>
      <div class="container" id="main-container" v-if="$store.state.loginModule.isLogged">
        <side-bar />
        <div id="main-content">
          <div id="welcome-user">
            <h5 class="hide-on-small">Welcome, Username</h5>
            <h6>4/10 Tasks Complete</h6>
          </div>
          <router-view/>
        </div>
      </div>
      <template v-else>
        <router-view/>
      </template>
    </main>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from './components/SideBar.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    SideBar
  }
}
</script>

<style lang="scss">
// general styles
body{
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  background: $light-white;
}

h1, h2, h3, h4, h5, h6{
  font-family: 'Nunito', sans-serif;
  margin: 1rem 0;
}
h1{
  font-size: 2rem;
}
h2{
  font-size: 1.75rem;
}
h3{
  font-size: 1.56rem;
}
h4{
  font-size: 1.37rem;
}
h5{
  font-size: 1.25rem;
}
h6{
  font-size: 1.15rem;
  font-weight: 600;
}
.normal-weight{
  font-weight: 400;
}
.semi-weight{
  font-weight: 500;
}
.bold-weight{
  font-weight: 600;
}
.bolder-weight{
  font-weight: 700;
}
a{
  text-decoration: none;
  color: inherit;
}
div{
  box-sizing: border-box;
}

.orange-text{
  @extend %orange-text;
}
.dark-blue-text{
  @extend %dark-blue-text;
}
.white-text{
  @extend %white-text;
}
.red-text{
  color: darken($red, 10);
}

.button-div{
  @include flex-div();

  .equal-child{
    flex: 1;
  }
}
.container{
  margin: 0 auto;
  max-width: 1300px;
  padding: 15px;
}
.center{
  text-align: center;
}

.card{
  border-radius: 10px;
  background: white;
  @extend %normal-shadow;
}
.card-content{
  padding: 15px;
}
.hide-on-small{
  display: none;
}
.hide-on-small-flex{
  display: none !important;
}
.flex-between{
  @include flex-div($justify: space-between);
}
#mobile-add-button{
  position: fixed;
  padding: 10px;
  bottom: 90px;
  right: 15px;
  z-index: 3;
}


// specific styles
.image-div img{
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
}
#main-container{
  display: flex;
  grid-gap: 10px;
  flex-direction: column-reverse;
  height: 100vh;

  #main-content{
    overflow: auto;
    height: calc(100vh - 60px);
    padding: 0px 5px;
  }
}
#welcome-user{
  @include flex-div($justify: space-between);

  h5, h6{
    font-weight: normal;
    margin-top: 0px;
  }
}

@media screen and (min-width: 768px){
  .hide-on-small{
    display: inherit;
  }
  .hide-on-small-flex{
    display: flex !important;
  }

  #main-container{
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 25px;
    height: auto;

    #welcome-user{
      h5, h6{
        margin: 16px 0;
      }
    }
    #main-content{
      height: auto;
    }
  }
  #mobile-add-button{
    display: none;
  }
}
</style>
