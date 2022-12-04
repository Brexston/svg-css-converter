<template>
    <div class="popup" @click.self="$emit('close')">
        <div class="popup__block">
            <div class="popup__title">
                <TextElement :code="'conversionSettings'" :defaultText="'Настройки конвертации'"/>
            </div>
            <div class="popup__settings">
                <div class="checkbox">
                    <input type="checkbox" id="size" v-model="settings.size">
                    <label for="size">
                        <TextElement :code="'addCss'" :defaultText="'Всегда добавлять размеры в итоговый CSS'"/>
                    </label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="sass" v-model="settings.sass">
                    <label for="sass">
                        <TextElement :code="'removeSemicolon'" :defaultText="'Убирать ; для использования в Sass'"/>
                    </label>
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="short" v-model="settings.short">
                    <label for="short">
                        <TextElement :code="'useShortRecording'" :defaultText="'Использовать короткую запись по умолчанию'"/>
                    </label>
                </div>
            </div>
            <div class="popup__btn btn" @click="saveSettings">
                <TextElement :code="'save'" :defaultText="'Сохранить'"/>
            </div>
        </div>
    </div>
</template>


<script>
import TextElement from "@/components/TextElement"

export default {
    name: 'PopupSettings',
    components: {TextElement},
    data() {
        return {
            settings: {
                size: localStorage.getItem('size') || false,
                sass: localStorage.getItem('sass') || false,
                short: localStorage.getItem('short') || false
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