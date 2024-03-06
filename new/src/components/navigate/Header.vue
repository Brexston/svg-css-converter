<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	name: 'Header',
    props: {
        headText: {
            type: Object as PropType<{title: string, description?: string}>,
            required: true
        }
    }
});
</script>

<template>
    <header class="header">
        <nav class="header__nav">
            <router-link class="header__nav-link" to="/">Конвертер</router-link>
            <router-link class="header__nav-link" to="/faq">FAQ</router-link>
        </nav>
        <div class="header__lang">
            <router-link class="header__lang-link" to="/">RU</router-link>
            <router-link class="header__lang-link" to="/">EN</router-link>
            <router-link class="header__lang-link" to="/">DE</router-link>
        </div>
        
        <h1 class="header__title">{{ headText.title }}</h1>
        <p v-if="headText.description" class="header__description" v-html="headText.description"></p>
    </header>
</template>


<style lang="sass">
.header
    display: flex
    align-items: center
</style>