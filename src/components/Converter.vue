<template>
	<main class="converter">
		<div class="converter__list">
			<div class="converter__item converter__item--insert">
				<div class="textarea">
					<div class="textarea__top">
						<label for="insert" class="textarea__label">
							<TextElement :code="'insertSvg'" :defaultText="'Вставьте код SVG:'"/>
						</label>
						<button class="textarea__example" @click="viewExample">
							<TextElement :code="'example'" :defaultText="'Пример'"/>
						</button>
					</div>
					<textarea id="insert" autofocus class="textarea__item" v-on:input="convertSvg" v-model="insertSvg.textarea"></textarea>
				</div>
			</div>
			<div class="converter__item converter__item--preview">
				<div class="preview">
					<div class="preview__top">
						<div class="preview__label">
							<TextElement :code="'preview'" :defaultText="'Превью'"/>
						</div>
						<div class="preview__bg">
							<div class="preview__bg-item" :style="{'background': color}" v-for="color in preview.colors" :key="color" @click="preview.background = color" :class="{ active: preview.background === color }"></div>
							<div class="preview__bg-input" :style="{'backgroundColor': preview.input}">
								<input type="color" v-model="preview.input" @input="preview.background = preview.input">
							</div>
						</div>
					</div>
					<div class="preview__block" :style="{'background': preview.background}">
						<div class="preview__block-image" :style="`background: url(${preview.image}) ${preview.position} ${preview.repeat}`"></div>
					</div>
					<div class="preview__settings" :class="{active: insertSvg.textarea}">
						<div class="preview__direction">
							<div class="preview__direction-item" v-for="position in settings.positionList" :key="position" @click="changePosition(position)" :title="position" :class="{ active: position === settings.position }"></div>
						</div>
						<div class="preview__repeat">
							<div class="preview__repeat-item" v-for="repeat in settings.repeatList" :key="repeat" @click="changeRepeat(repeat)" :class="{ active: repeat === settings.repeat }">{{repeat}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="converter__item converter__item--result">
				<div class="textarea">
					<div class="textarea__top">
						<label class="textarea__label">
							<TextElement :code="'readyCss'" :defaultText="'Готовый CSS для фона:'"/>
						</label>
						<div class="textarea__settings" @click="settings.popupSettingsShow = true"></div>
						<div class="textarea__tab">
							<div class="textarea__tab-item" :class="{ active: cssType === 0 }" @click="cssType = 0" >
								<TextElement :code="'fullRecording'" :defaultText="'Полная запись'"/>
							</div>
							<div class="textarea__tab-item" :class="{ active: cssType === 1 }" @click="cssType = 1" >
								<TextElement :code="'shortRecording'" :defaultText="'Short Recording'"/>
							</div>			
						</div>
					</div>
					<div class="textarea__block">
						<textarea v-if="cssType === 0" class="textarea__item" v-model="result.textarea.long"></textarea>
						<textarea v-else class="textarea__item" v-model="result.textarea.short"></textarea>
						<div class="textarea__modification">
							<div class="textarea__size" @click="searchSize" :class="{active: settings.displayAddSize }" >
								<TextElement :code="'addSize'" :defaultText="'Добавить размеры'"/>
							</div>
							<div class="textarea__semicolon" @click="removeSemicolon" :class="{active: settings.displayCutSemicolon }">
								Sass
							</div>
							<div class="textarea__mask" @click="replaceMask" :class="{active: settings.displayMask }">
								Mask
							</div>							
							<div class="textarea__copy" @click="copyCss" :class="{active: insertSvg.textarea}">
								<TextElement :code="'copy'" :defaultText="'Скопировать'"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
	<transition name="modal">
		<PopupSettings v-if="settings.popupSettingsShow" @close="settings.popupSettingsShow = false, checkSettings()" />
	</transition>
</template>

<script>
import PopupSettings from "@/components/PopupSettings"
import TextElement from "@/components/TextElement"

export default {
	name: 'Converter',
	components: {PopupSettings,TextElement},
	data() {
		return {
			cssType: localStorage.getItem('short') === 'true' ? 1 : 0,
			insertSvg: {
				textarea: ''
			},
			preview: {
				background: '',
				colors: ['#fff','#000','#e0e0e0'],
				input: '#5f8bbf',
				image: '',
				position: 'center',
				repeat: 'no-repeat',
			},
			result: {
				textarea: {
					short: '',
					long: ''
				},
			},
			settings: {
				repeat: 'no-repeat',
				repeatList: ['no-repeat','repeat','repeat-x','repeat-y'],
				position: 'center',
				positionList: ['left top','center top','right top', 'left center','center','right center','left bottom', 'center bottom','right bottom'],
				displayCutSemicolon: false,
				displayAddSize: false,
				displayMask: false,
				popupSettingsShow: false,
			},
		}
	},

	methods: {
		convertSvg() {
			let text = this.insertSvg.textarea
			if(text) {
				text = this.addXmlns(text)
				text = this.encodeSvg(text)
				this.preview.image = `"data:image/svg+xml,${text}"`
				this.result.textarea.short = `background: url("data:image/svg+xml,${text}") ${this.settings.repeat} ${this.settings.position};`
				this.result.textarea.long = `background-image: url("data:image/svg+xml,${text}");\nbackground-repeat: ${this.settings.repeat};\nbackground-position: ${this.settings.position};`
				
				localStorage.getItem('size') === 'true' ? this.searchSize() : this.settings.displayAddSize = true
				localStorage.getItem('sass') === 'true' ? this.removeSemicolon() : this.settings.displayCutSemicolon = true
				this.settings.displayMask = true
			}
			else {
				this.preview.image = ''
				this.result.textarea.short = ''
				this.result.textarea.long = ''
			}
		},

		addXmlns(text) {
			if (text.indexOf(`http://www.w3.org/2000/svg`) < 0) {
				text = text.replace(/<svg/g, `<svg xmlns='http://www.w3.org/2000/svg'`);
			}
			return text
		},

		encodeSvg(text) {
			text = text.replace(/>\s{1,}</g, `><`);
			text = text.replace(/\s{2,}/g, ` `);
			text = text.replace(/"/g, `'`);	
			const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;		
			return text.replace(symbols, encodeURIComponent);
		},
		
		copyCss(event) {
			console.log(event.target.closest('.textarea__modification'))
            event.target.closest('.textarea__modification').previousElementSibling.select()
            document.execCommand("copy")
		},

		removeSemicolon() {
			this.result.textarea.short = this.result.textarea.short.replace(/;/g, "")
			this.result.textarea.long = this.result.textarea.long.replace(/;/g, "")
			this.settings.displayCutSemicolon = false
		},
		replaceMask() {
			this.result.textarea.long = this.result.textarea.long.replaceAll("background", "mask")
			this.settings.displayMask = false
		},
		addSize(width,height) {
			this.result.textarea.long = this.result.textarea.long.concat(`\nwidth: ${width}px;`)
			this.result.textarea.short = this.result.textarea.short.concat(`\nwidth: ${width}px;`)
			this.result.textarea.long = this.result.textarea.long.concat(`\nheight: ${height}px;`)
			this.result.textarea.short = this.result.textarea.short.concat(`\nheight: ${height}px;`)
		},

		searchSize() {
			let width = this.insertSvg.textarea.match(new RegExp(/width="(\\.|[^"\\])*"/g))
			let height = this.insertSvg.textarea.match(new RegExp(/height="(\\.|[^"\\])*"/g))
			if(width && height) {
				width = parseInt(width[0].match(/\d+/))
				height = parseInt(height[0].match(/\d+/))
				this.addSize(width,height)
			}

			this.settings.displayAddSize = false
		},

		viewExample() {
			this.insertSvg.textarea = '<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect width="58" height="58.0078" rx="29" fill="#FDC420"/><path d="M38.4355 29.0039L24.2943 37.1673L24.2943 20.8405L38.4355 29.0039Z" fill="#1D1D1C"/></svg>'
			this.convertSvg()
		},
		changePosition(direction) {
			this.settings.position = direction
			this.preview.position = direction
			this.convertSvg()
		},
		changeRepeat(repeat) {
			this.settings.repeat = repeat
			this.preview.repeat = repeat
			this.convertSvg()
		},
		checkSettings() {
			this.convertSvg()
			this.cssType = localStorage.getItem('short') === 'true' ? 1 : 0
		},
	},
}
</script>

<style lang="sass">
.converter
	&__list
		display: grid
		grid-gap: 24px
		grid-template-columns: repeat(2, 1fr)
	&__item
		&--result
			grid-column: span 2
			.textarea
				&__modification
					position: absolute
					right: 10px
					bottom: 5px
					display: flex
					gap: 5px
					transition: 0.3s
				
				&__copy, &__semicolon, &__size, &__mask
					cursor: pointer
					padding: 8px
					+text-style(14px)
					background: $blue
					border-radius: 5px
					color: $white
					transition: transform 0.3s, background 0.6s
					transform: translateY(115%)
					width: 0
					overflow: hidden
					padding: 0
					&:active
						background: $yellow
					&.active
						transform: translateY(0)
						width: auto
						padding: 8px			
				&__mask
					transition-delay: 0.1s
				&__semicolon
					transition-delay: 0.2s						
				&__size
					transition-delay: 0.3s
				&__item
					min-height: 170px
		&--preview
			.preview
				display: flex 
				flex-direction: column
				height: 100%
				position: relative
				&__top
					+flex(space-between,center)
					margin-bottom: 8px
				&__bg
					display: flex
					align-items: center
					&-item
						width: 18px
						height: 18px
						border-radius: 50%
						cursor: pointer
						border: 1px solid rgba(0, 0, 0, 0.25)
						margin-right: 8px
						transition: 0.3s
						position: relative
						&::after
							content: ''
							width: 24px
							height: 24px
							border-radius: 50%
							border: 1px solid $blue
							position: absolute
							left: -4px
							top: -4px
							opacity: 0
							transition: 0.3s
						&.active
							&::after
								opacity: 1
					&-input
						width: 50px
						height: 18px
						position: relative
						border-radius: 5px
						cursor: pointer
						border: 1px solid rgba(0, 0, 0, 0.25)  
						background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'%0Awidth='64' height='64'%0AviewBox='0 0 128 128'%0Astyle=' fill:%23FFFFFF;'%3E%3Cpath d='M 79.335938 15.667969 C 78.064453 15.622266 76.775 15.762109 75.5 16.099609 C 72.1 16.999609 69.299609 19.199219 67.599609 22.199219 L 64 28.699219 C 63.2 30.099219 63.699609 32.000781 65.099609 32.800781 L 82.400391 42.800781 C 82.900391 43.100781 83.400391 43.199219 83.900391 43.199219 C 84.200391 43.199219 84.399219 43.199609 84.699219 43.099609 C 85.499219 42.899609 86.1 42.399219 86.5 41.699219 L 90.199219 35.199219 C 91.899219 32.199219 92.4 28.700781 91.5 25.300781 C 90.6 21.900781 88.400391 19.100391 85.400391 17.400391 C 83.525391 16.337891 81.455078 15.744141 79.335938 15.667969 z M 60.097656 38.126953 C 59.128906 38.201172 58.199219 38.724609 57.699219 39.599609 L 27.5 92 C 24.1 97.8 22.200781 104.30039 21.800781 110.90039 L 21 123.80078 C 20.9 124.90078 21.5 125.99961 22.5 126.59961 C 23 126.89961 23.5 127 24 127 C 24.6 127 25.199219 126.8 25.699219 126.5 L 36.5 119.40039 C 42 115.70039 46.7 110.8 50 105 L 80.300781 52.599609 C 81.100781 51.199609 80.599219 49.3 79.199219 48.5 C 77.799219 47.7 75.899609 48.199609 75.099609 49.599609 L 44.800781 102 C 41.900781 106.9 37.899609 111.20039 33.099609 114.40039 L 27.300781 118.19922 L 27.699219 111.30078 C 27.999219 105.60078 29.699609 100 32.599609 95 L 62.900391 42.599609 C 63.700391 41.199609 63.200781 39.3 61.800781 38.5 C 61.275781 38.2 60.678906 38.082422 60.097656 38.126953 z M 49 121 C 47.3 121 46 122.3 46 124 C 46 125.7 47.3 127 49 127 L 89 127 C 90.7 127 92 125.7 92 124 C 92 122.3 90.7 121 89 121 L 49 121 z M 104 121 A 3 3 0 0 0 101 124 A 3 3 0 0 0 104 127 A 3 3 0 0 0 107 124 A 3 3 0 0 0 104 121 z'%3E%3C/path%3E%3C/svg%3E") no-repeat center                    
						
						background-size: 16px
						input
							position: absolute
							cursor: pointer
							left: 0
							top: 0
							opacity: 0
							width: 100%
							height: 100%
				&__settings
					position: absolute
					top: 28px
					right: -25px
					width: 80px
					transform: translate(100%)
					height: calc(100% - 38px)
					background: $white
					padding: 5px
					border-radius: 0 5px 5px 0
					opacity: 0
					z-index: 5
					pointer-events: none
					transition: 0.3s
					display: flex
					flex-direction: column
					&.active				
						opacity: 1
						pointer-events: auto

				&__direction
					width: 36px
					display: grid
					grid-gap: 1px
					grid-template-columns: repeat(3,1fr)
					transition: 0.5s
					background: $white
					margin-bottom: 8px
					&-item
						display: block
						width: 12px
						height: 12px
						cursor: pointer
						transition: 0.3s
						border: 1px solid $blue
						&:hover, &.active
							background: $yellow
				&__repeat
					&-item
						cursor: pointer
						padding: 0px 5px
						border: 1px solid $blue
						border-radius: 5px
						+text-style(12px,16px)
						width: max-content
						transition: 0.3s
						&:not(:last-child)
							margin-bottom: 4px
						&:hover, &.active
							background: $yellow
							
				&__block
					border: 1px solid $smoke
					height: 100%
					transition: 0.3s
					&-image
						height: 100%
</style>