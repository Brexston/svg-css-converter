<template>
    <!-- <div class="test" @click="getTranslate()">1111</div> -->
    <span></span>
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
    methods: {
        getTranslate() {
            console.log(this.getTranslation('ru',this.code));
        }
    },

    computed: mapGetters(['getTranslation']),

}

</script>