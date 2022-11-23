<template>
    {{this.getTranslation('ru',this.code)}}
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