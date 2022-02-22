<template>
	<div class="bg">
		<div class="bg__item bg__item--1"></div>
		<div class="bg__item bg__item--2"></div>
		<div class="bg__item bg__item--3"></div>
	</div>
</template>

<style lang="sass">
.bg
	position: fixed
	width: 100%
	height: 100%
	top: 0
	left: 0
	z-index: -1
	&__item
		background: transparent
		&::after
			content: ''
			position: absolute
			background: transparent
			top: 2000px
		&--1
			width: 1px
			height: 1px
			box-shadow: $shadows-small
			animation: animateStar 50s linear infinite
			&::after
				width: 1px
				height: 1px
				box-shadow: $shadows-medium
		&--2
			width: 2px
			height: 2px
			box-shadow: $shadows-medium
			animation: animateStar 100s linear infinite
			&::after
				width: 2px
				height: 2px
				box-shadow: $shadows-medium
		&--2
			width: 3px
			height: 3px
			box-shadow: $shadows-big
			animation: animateStar 150s linear infinite
			&::after
				width: 3px
				height: 3px
				box-shadow: $shadows-big

</style>