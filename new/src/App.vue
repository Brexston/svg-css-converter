<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'App',
});
</script>

<template>
	<component>
		<main class="page">
			<router-view/>
		</main>
	</component>
</template>
