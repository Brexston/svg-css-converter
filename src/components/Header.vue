<template>
	<header class="header">
		<h1 class="header__title">
			<TextElement :code="'title'" :defaultText="'Конвертируйте свой SVG в CSS'"></TextElement>
		</h1>
		<div class="header__description">
			<TextElement :code="'description'" :defaultText="'С помощью данного сервиса вы можете закодировать свою иконку SVG для использования в CSS через data URL, закодированный SVG можно использовать в <code>background</code>, <code>border-image</code> или в code>mask</code>'"></TextElement>
		</div>
		<div class="header__language">
			<div class="header__language-item" 
				v-for="lang in getLanguages" :key="lang" 
				@click="this.updateCurrentLanguage(lang.languageName)"
				:class="{active : getCurrentLanguage === lang.languageName}"
				>
				{{lang.languageName}}
			</div>
		</div>
	</header>
</template>
<style lang="sass">
.header
	padding: 0 0 18px
	border-bottom: 1px solid $smoke
	margin: 0 0 36px
	&__title
		text:
			align: center
			transform: uppercase
		+text-style(32px, 40px)
		margin: 0 0 25px
	&__description
		max-width: 600px
		margin: 0 auto
		text-align: center
		code
			background: $silver
			padding: 0 4px
			font-style: italic
	&__language
		position: absolute
		top: 10px
		left: 25px
		display: flex
		grid-gap: 10px
		color: $black
		&-item
			cursor: pointer
			text-transform: capitalize
			transition: 0.3s
			&.active
				color: $yellow
</style>

<script>
import TextElement from "@/components/TextElement"
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'Header',
  components: {TextElement},
  methods: mapMutations(['updateCurrentLanguage']),
  computed: mapGetters(['getLanguages', 'getCurrentLanguage'])

}
</script>