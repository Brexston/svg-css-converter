<template>
    <div class="popup" @click.self="$emit('close')">
        <div class="popup__block">
            <div class="popup__close" @click="$emit('close')"></div>
            <div class="popup__title">Дополнительные настройки</div>

            <div class="popup__card-buttons">
                <button @click="$emit('close')">
                    Отмена
                </button>
                <button @click="$emit('confirm')">
                    Подтвердить
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['link'],
    beforeCreate() {
        document.body.classList.add("popup-opened")
        
    },
    beforeUnmount() {
        document.body.classList.remove("popup-opened")
    },
}
</script>

<style lang="sass">

</style>
