<template>
    <div class="tooltip" :class="{visible: showTooltip}" @click="this.showTooltip = false">
        <TextElement :code="'tooltip'" :defaultText="'В твоем буфере обмена есть SVG код, нажми CTRL + V для конвертации'"/>
    </div>
</template>


<script>
import TextElement from "@/components/TextElement"

export default {
    name: "Tooltip",
    components: {TextElement},
    data() {
        return {
            showTooltip: false
        }
    },
    async mounted() {
        try {
            let clipboardText = await navigator?.clipboard?.readText()
            this.checkSvg(clipboardText)
        }  catch (e) {}
    },
    methods: {
        checkSvg(string) {
            string = string.trimStart()

            if(string.startsWith("<svg")) {
                this.showTooltip = true
                setTimeout(() => this.showTooltip = false, 3000);
            }
        }
    }
}

</script>


<style lang="sass">
.tooltip
    position: fixed
    right: 16px
    top: 16px
    max-width: 300px
    background: $yellow
    padding: 16px
    width: 100%
    text-align: center
    transition: 0.6s
    cursor: pointer
    border-radius: 15px
    transform: translateY(calc(-100% - 32px))
    opacity: 0
    &.visible
        transform: none
        opacity: 1

</style>