<template>
  <div id="sidebar">
    <div class="card">
      <div class="card-content">
        <router-link to="/dashboard" title="Dashboard"><Home title="Dashboard" /> <span class="sidebar-link-text">Dashboard</span> </router-link>
        <router-link to="/workspace" title="Workspace"><ViewSplitVertical title="Workspace" /> <span class="sidebar-link-text">Workspace</span> </router-link>
        <router-link to="/categories" title="Categories"><Shape title="Categories" /> <span class="sidebar-link-text">Categories</span> </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Home from 'vue-material-design-icons/Home'
import ViewSplitVertical from 'vue-material-design-icons/ViewSplitVertical'
import Shape from 'vue-material-design-icons/Shape'
export default {
  name: 'SideBar',
  components: {
    Home,
    ViewSplitVertical,
    Shape
  }
}
</script>

<style lang="scss">
#sidebar{
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 1;
  transition: all 0.2s ease;
  height: 60px;
  box-sizing: border-box;

  .card{
    height: 100%;
  }
  .card-content{
    padding: 5px 15px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  a{
    display: flex;
    flex-direction: column;
    grid-gap: 0px;
    align-items: center;
    border-radius: 5px;
    font-weight: 500;
    background: $light-white;
    color: $dark-blue;
    padding: 5px;
    // margin-bottom: 10px;
    transition: all 0.2s ease;

    &:hover{
      background: darken($light-white, 3);
    }
    .sidebar-link-text{
      font-size: 11px;
      margin-top: -2px;
    }
  }
  a.router-link-exact-active{
    background: $orange;
    color: white;
  }
}
@media screen and (min-width: 768px) {
  #sidebar{
    height: calc(100vh - 90px);
    max-width: 74px;
    width: 100%;
    top: 75px;
    left: 0px;
    bottom: auto;
    
    .card-content{
      grid-template-columns: 1fr;
      padding: 30px 10px;
    }
    a{
      padding: 15px;
      grid-gap: 10px;
      flex-direction: row;

      .sidebar-link-text{
        font-size: 16px;
        margin-top: 0;
        display: none;
      }
    }
  }
}
@media screen and (min-width: 1300px){
  #sidebar{
    width: 250px;

    a{
      .sidebar-link-text{
        display: block;
      }
    }
  }
}
</style>