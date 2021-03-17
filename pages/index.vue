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
    onServerPrefetch,
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
        const { init, startBroadcast } = useActions(['init', 'startBroadcast'])
        onServerPrefetch(async () => {
            await init()
        })
        startBroadcast()
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
