<template>
  <div class="page-wrapper">
    <sidebar></sidebar>
    <app-map-panel></app-map-panel>
  </div>
</template>
<script>
import MapPanel from './MapPanel'
import Sidebar from './Sidebar'

export default {
  data () {
    return {
      message: 'Welcome to the store locator'
    }
  },
  components: {
    'app-map-panel': MapPanel,
    'sidebar': Sidebar
  }
}
</script>
