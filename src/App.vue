<template>
	<div class="layout" v-if="getLoadedStatus">
		<Header/>
		<Converter/>
		<Footer/>
	</div>
	<Tooltip/>
	<AnimateBg/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Header from './components/Header'
import Converter from './components/Converter'
import Footer from './components/Footer'
import AnimateBg from './components/AnimateBg'
import Tooltip from './components/Tooltip'



export default {
	components: {
		Header,
		Converter,
		AnimateBg,
		Tooltip,
		Footer
	},
    methods: {
        ...mapActions(['loadTranslate']),
    },
	async mounted() {
        this.loadTranslate()
    },
	computed: mapGetters(['getLoadedStatus']),
}


</script>

<style lang="sass">
@import "./assets/sass/main"

.layout
	width: 100%
	max-width: 800px
	background: $white
	margin: 60px auto
	border-radius: 25px
	padding: 45px 25px
	position: relative
</style>
