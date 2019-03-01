<template>
	<div class="authority-detail">
		<span class="close-icon" @click="onCloseClick">X</span>
	  <div class="score">{{seletedAuthority.score}}</div>
	  <h2>{{seletedAuthority.name}}</h2>
	  <h3 >{{seletedAuthority.id}}</h3>
	  <p>XXX@medway.gov.uk</p>
	  <p>01634 XXX XXX</p>

	 	<button>Sign Pettion</button>

	 	<div class="description">
	 		<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit</p>
	 	</div>
	 	<hr />
	 	<div class="tags">
	 		<div class="tag" v-for="index in 7" :key="index">
	 			<span class="tag-icon"> - img - </span>
	 			<span class="tag-name">Sed ut perspiciatis unde omnis iste</span>
	 		</div>
	 	</div>
	</div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
  data () {
    return {
    	authority: {}
    }
  },
  methods: {
    ...mapActions(['setSelectedAuthority']),
  	onCloseClick() {
  		this.setSelectedAuthority({});
  	}
  },
  computed: {
    seletedAuthority () {
      return this.$store.getters.seletedAuthority
    }
  },
}
</script>
<style>
	.close-icon {
		float: right;
	}
	.authority-detail {
  	float: left;
    width: 300px;
    background: #005094d9;
    color: white;
    padding: 10px;
    height: 100vh;
  }
</style>
