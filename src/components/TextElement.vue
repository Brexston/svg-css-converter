<template>
    <span v-html="this.getTranslation(this.code, this.defaultText)"></span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'TextElement',
    props: {
        code: {
            type: String,
            default: "",
        },
        defaultText: {
            type: String,
            default: "",
        },
    },
    computed: mapGetters(['getTranslation']),
}
</script>