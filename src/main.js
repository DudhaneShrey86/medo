import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mqlOptions from './plugins/mqlOptions.js'

Vue.config.productionTip = false
const baseURL = '/server'
const cdnBaseURL = '/cdnserver'
Vue.use(mqlOptions, {
  baseURL: baseURL,
  cdnBaseURL: cdnBaseURL,
  cdnConfig: [
    {
      purposeId: '1',
      bucketId: '123456',
      bucketName: 'client2',
      clientId: '26',
      userId: '23',
      isPrivateBucket: true
    },
    {
      bucketName: 'client2',
      clientId: 'client2',
      isPrivateBucket: false
    },
    {
      bucketId: '1TBvOvV0WPk52KoYrslIPmdieBD',
      bucketName: 'TestBucket',
      clientId: '1TBvKXU60Lu2zPAfU85dcPYOvlb',
      createdBy: 'suvarnar@mkcl.org',
      createdOn: 1572946274,
      description: 'TestBucket.',
      isPrivateBucket: null,
      modifiedBy: 'suvarnar@mkcl.org',
      modifiedOn: 1572946274,
      purposeId: '1TBvKXU60Lu2zPAfU85dcPYOvlb'
    },
    {
      bucketId: '1TC5up2yyDGAeJfMXBRnazhPG6Z',
      bucketName: 'TestBucket',
      clientId: '1TC5qFX6rFuxNcrtTqCzpGumfWI',
      createdBy: 'suvarnar@mkcl.org',
      createdOn: 1572951461,
      description: 'Testbucket.',
      isPrivateBucket: null,
      modifiedBy: 'suvarnar@mkcl.org',
      modifiedOn: 1572951461,
      purposeId: '1TC5qFX6rFuxNcrtTqCzpGumfWI'
    }
  ]
})

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.app = vm