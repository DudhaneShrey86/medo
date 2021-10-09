import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

function loadView (viewName) {
  return import(/* webpackChunkName: "about" */ '../views/' + viewName + '.vue')
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => loadView('Home')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => loadView('Dashboard'),
    meta: { requiresLogin: true }
  },
  {
    path: '/workspace',
    name: 'Workspace',
    component: () => loadView('Workspace'),
    props: true,
    meta: { requiresLogin: true }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => loadView('Categories'),
    props: true,
    meta: { requiresLogin: true }
  },
  {
    path: '/task/:id',
    name: 'TaskPage',
    component: () => loadView('TaskPage'),
    props: true,
    meta: { requiresLogin: true }
  },
  {
    path: '/create-task',
    name: 'CreateTask',
    component: () => loadView('CreateTask'),
    props: true,
    meta: { requiresLogin: true }
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresLogin) {
    // requires login, check if not
    if (!store.state.loginModule.isLogged) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    // login page
    // redirect to dashboard if logged in
    if (store.state.loginModule.isLogged) {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }
})

export default router
