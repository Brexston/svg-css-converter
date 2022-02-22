<template>
	<div class="layout">
		<Header/>
		<HelloWorld msg="Welcome to Your Vue.js App"/>
		
	</div>
	<AnimateBg/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header'
import AnimateBg from './components/AnimateBg'

export default {
	components: {
		HelloWorld,
		AnimateBg,
		Header
	}
}
</script>

<style lang="sass">
@import "./assets/sass/main"

.layout
	width: 100%
	max-width: 800px
	background: $white
	margin: 40px auto
	border-radius: 25px
	padding: 25px


	

</style>
