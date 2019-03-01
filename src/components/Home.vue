<template>
  <home-content></home-content>
</template>
<script>
import HomeContent from './HomeContent'

export default {
  data () {
    return {
      message: 'Welcome to the store locator'
    }
  },
  components: {
    'home-content': HomeContent
  }
}
</script>
