<template>
	<div class="sidebar">
		<div class="nav-menu">
		  <main-menu></main-menu>
		  <authority-detail v-if="seletedAuthority.id"></authority-detail>
		</div>
	</div>
</template>
<script>
import MainMenu from './MainMenu';
import AuthorityDetail from './AuthorityDetail';

export default {
  data () {
    return {
      message: 'Welcome to the store locator'
    }
  },
  computed: {
    seletedAuthority () {
      return this.$store.getters.seletedAuthority
    }
  },
  components: {
    'authority-detail': AuthorityDetail,
    'main-menu': MainMenu
  }
}
</script>
<style>
  .sidebar {
  	position: fixed;
  	height: 100vh;
  	width: auto;
  	z-index: 1;
  }
</style>
