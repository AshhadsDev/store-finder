// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_API_KEY,
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.component('GmapCluster', GmapCluster)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
