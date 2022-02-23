<template>
	<main class="converter">
		<div class="converter__list">
			<div class="converter__item converter__item--insert">
				<div class="textarea">
					<div class="textarea__top">
						<label for="insert" class="textarea__label">Вставьте код SVG:</label>
					</div>
					<textarea id="insert" autofocus class="textarea__item" v-on:input="convertSvg(insertSvg.textarea)" v-model="insertSvg.textarea"></textarea>
				</div>
			</div>
			<div class="converter__item converter__item--preview">
				<div class="preview">
					<div class="preview__top">
						<div class="preview__label">Превью:</div>
						<div class="preview__bg">
							<div :style="{'background': color}" v-for="color in preview.colors" :key="color" @click="preview.background = color" class="preview__bg-item"></div>
							<div class="preview__bg-input" :style="{'backgroundColor': preview.input}">
								<input type="color" v-model="preview.input" @input="preview.background = preview.input">
							</div>
						</div>
					</div>
					<div class="preview__block" :style="{'background': preview.background}">
						<div class="preview__block-image" :style="`background: url(${preview.image}) no-repeat`"></div>
					</div>
				</div>
			</div>
			<div class="converter__item converter__item--result">
				<div class="textarea">
					<div class="textarea__top">
						<label class="textarea__label">Готовый CSS для фона:</label>
						<div class="textarea__tab">
							<div class="textarea__tab-item" :class="{ active: cssType === 1 }" @click="cssType = 1" >Короткая запись</div>
							<div class="textarea__tab-item" :class="{ active: cssType === 2 }" @click="cssType = 2" >Полная запись</div>
						</div>
					</div>
					<div class="textarea__block">
						<textarea v-if="cssType === 1" class="textarea__item" v-model="result.textarea.short"></textarea>
						<textarea v-else class="textarea__item" v-model="result.textarea.long"></textarea>
						<div class="copy" @click="copyCss" :class="{active: insertSvg.textarea}">
							Скопировать
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>


export default {
	name: "Converter",

	data() {
		return {
			cssType: 1,
			insertSvg: {
				textarea: ''
			},
			preview: {
				background: '',
				colors: ['#fff', '#000','#b3b3b3'],
				input: '#5f8bbf',
				image: ''
			},
			result: {
				textarea: {
					short: '',
					long: ''
				}
			},
			settings: {
				repeat: 'no-repeat',
				position: 'center'

			}
		}
	},

	methods: {
		convertSvg(text) {
			if(text) {
				text = this.addXmlns(text)
				text = this.encodeSvg(text)
				this.preview.image = `'data:image/svg+xml,${text}'`
				this.result.textarea.short = `background: url('data:image/svg+xml,${text}') ${this.settings.repeat} ${this.settings.position};`
				this.result.textarea.long = `background-image: url('data:image/svg+xml,${text}');\nbackground-repeat: ${this.settings.repeat};\nbackground-position: ${this.settings.position};`
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
			text = text.replace(/'/g, `"`);		
			text = text.replace(/>\s{1,}</g, `><`);
			text = text.replace(/\s{2,}/g, ` `);
			const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;			
			return text.replace(symbols, encodeURIComponent);
		},
		
		copyCss(event) {
            event.target.previousElementSibling.select()
            document.execCommand("copy")

		}


	}
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
			.copy
				position: absolute
				right: 10px
				bottom: 5px
				cursor: pointer
				padding: 8px
				+text-style(14px)
				background: $blue
				border-radius: 10px
				color: $white
				transition: transform 0.3s
				transform: translateY(115%)
				&.active
					transform: translateY(0)
		&--preview
			.preview
				display: flex 
				flex-direction: column
				height: 100%
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


				&__block
					border: 1px solid $smoke
					height: 100%
					transition: 0.3s
					padding: 8px
					&-image
						height: 100%
				

</style>