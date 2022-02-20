<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <div class="star">
    <div class="star__item star__item--1"></div>
    <div class="star__item star__item--2"></div>
    <div class="star__item star__item--3"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="sass">
@import "./assets/sass/main"


</style>
