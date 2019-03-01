import Vue from 'vue'
import Router from 'vue-router'
import MapPage from '@/components/MapPage'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/map',
      name: 'MapPage',
      component: MapPage
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
  ]
})
