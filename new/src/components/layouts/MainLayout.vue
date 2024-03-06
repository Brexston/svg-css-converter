<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/navigate/Header.vue';
import Converter from '@/components/converter/Converter.vue';

export default defineComponent({
  	components: { Header, Converter },
	name: 'MainLayout',
	data() {
		return {
			title: 'Онлайн-конвертер из SVG в CSS',
			description: 'С помощью данного сервиса вы можете закодировать иконку SVG для использования в CSS через data URL, закодированный SVG можно использовать в <code>background</code>, <code>border-image</code> или в <code>mask-image</code>'	
		}
	}
});
</script>

<template>
	<Header :headText="{title, description}" />
	<Converter/>
</template>
