<template lang="pug">
.main-container
    section.products
        h1.section-title Продукты
        ProductSectionList
    section.cart
        ProductCart
</template>

<script>
import {
    defineComponent,
    useFetch,
    onBeforeUnmount,
    onMounted,
} from '@nuxtjs/composition-api'

import ProductSectionList from '@/components/ProductSectionList.vue'
import ProductCart from '@/components/ProductCart.vue'
import { useActions } from '@/hooks/useVuexHelpers'

export default defineComponent({
    components: {
        ProductCart,
        ProductSectionList,
    },

    setup() {
        const {
            init,
            clearInitData,
            subscribeToUpdates,
        } = useActions([
            'init',
            'clearInitData',
            'subscribeToUpdates',
        ])

        let unsubscribe

        useFetch(init)
        onMounted(() => {
            unsubscribe = subscribeToUpdates()
        })
        onBeforeUnmount(() => {
            unsubscribe()
            clearInitData()
        })
    },
})
</script>

<style lang="stylus" scoped>
.main-container
    padding 10px

    & > *:not(:first-child)
        margin-top 30px

.section-title
    padding-bottom 10px
</style>
