<template>
	<div class="layout">
		<Header/>
		<Converter/>
		<Footer/>
	</div>
	<AnimateBg/>
</template>

<script>
import Header from './components/Header'
import Converter from './components/Converter'
import Footer from './components/Footer'
import AnimateBg from './components/AnimateBg'


export default {
	components: {
		Header,
		Converter,
		AnimateBg,
		Footer
	}
}
</script>

<style lang="sass">
@import "./assets/sass/main"

.layout
	width: 100%
	max-width: 800px
	background: $white
	margin: 50px auto
	border-radius: 25px
	padding: 45px 25px
	position: relative
</style>
