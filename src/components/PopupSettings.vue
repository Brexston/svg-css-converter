<template>
    <div class="popup" @click.self="$emit('close')">
        <div class="popup__block">
            <div class="popup__title">Настройки конвертации</div>
            <div class="popup__settings">
                <div class="checkbox">
                    <input type="checkbox" id="size" v-model="settings.size">
                    <label for="size">Всегда добавлять размеры в итоговый CSS</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="sass" v-model="settings.sass">
                    <label for="sass">Убирать ; для использования в Sass</label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="short" v-model="settings.short">
                    <label for="short">Использовать короткую запись по умолчанию</label>
                </div>
            </div>
            <div class="popup__btn btn" @click="saveSettings">Сохранить</div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            settings: {
                size: localStorage.getItem('size'),
                sass: localStorage.getItem('sass'),
                short: localStorage.getItem('short'),
            }
        }
    },
    methods: {
        saveSettings() {
            for(let i in this.settings) {
                localStorage.setItem(i, this.settings[i]);
            }
            this.$emit('close')
        }
    }
}
</script>

<style lang="sass">
.popup
    position: absolute
</style>