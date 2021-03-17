<template lang="pug">
.main-container
    section.products
        h1.section-title Продукты
        ProductSectionList
    section.product-cart
        ProductCart
</template>

<script>
import {
    defineComponent,
    useContext,
    onServerPrefetch,
} from '@nuxtjs/composition-api'
import ProductSectionList from '@/components/ProductSectionList.vue'
import ProductCart from '@/components/ProductCart.vue'

export default defineComponent({
    components: {
        ProductCart,
        ProductSectionList,
    },

    setup() {
        const { store } = useContext()
        onServerPrefetch(async () => {
            await store.dispatch('init')
        })
        store.dispatch('startBroadcast')
    },
})
</script>

<style lang="stylus" scoped>
.products
    padding 10px

.section-title
    padding-bottom 10px
</style>
