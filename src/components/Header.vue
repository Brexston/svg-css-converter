<template>
  <header class="header">
    <h1 class="header__title">Конвертируйте свой SVG в CSS </h1>
    <div class="header__description">
        С помощью данного сервиса вы можете закодировать свою иконку
        SVG для использования в CSS через data URI, закодированный SVG можно
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
        text:
            align: center
            transform: uppercase
        +text-style(32px, 40px)
    &__description
        max-width: 600px
        margin: 0 auto
        text-align: center
        code
            background: $silver
            padding: 0 4px
            font-style: italic
</style>