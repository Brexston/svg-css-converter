<template>
  <header class="header">
    <h1 class="header__title">Svg encoder to base64</h1>
    <div class="header__description">
      Переведи свою иконку SVG для использования в CSS, закодированный SVG можно
      использовать в <code>background</code>, <code>border-image</code> или в
      <code>mask</code>
    </div>
  </header>
</template>

<style lang="sass">
.header
    padding: 0 0 18px
    border-bottom: 1px solid $smoke
    margin: 0 0 36px
    &__title
        text-align: center
    &__description
        max-width: 600px
        margin: 0 auto
        text-align: center
        code
            background: $silver
            padding: 0 4px
            font-style: italic
</style>