<template lang="pug">
.product-sections
    .sections {{ sectionList }}
</template>

<script>
import {
    defineComponent,
    useContext,
    useAsync,
    computed,
} from '@nuxtjs/composition-api'
import Section from '@/models/Section'
export default defineComponent({
    setup() {
        const { store } = useContext()
        useAsync(() => { store.dispatch('init') })
        const sectionList = computed(() => Section.query().has('products').get())
        return {
            sectionList,
        }
    },
})
</script>
