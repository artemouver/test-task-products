<template lang="pug">
.product-table(:class="{ 'two-cols': !(productList.length % 2) }")
    ProductItem(
        v-for="product in productList"
        :key="product.id"
        :product="product"
    )
</template>

<script>
import { defineComponent, computed } from '@nuxtjs/composition-api'
import ProductItem from '@/components/ProductItem.vue'
import { useGetters } from '@/hooks/useVuexHelpers'

export default defineComponent({
    name: 'ProductTable',

    components: {
        ProductItem,
    },

    props: {
        sectionId: {
            type: Number,
            required: true,
        },
    },

    setup(props) {
        const { getProductListBySectionId } = useGetters(['getProductListBySectionId'])
        const productList = computed(() => getProductListBySectionId.value(props.sectionId))
        return { productList }
    },
})
</script>

<style lang="stylus" scoped>
.product-table
    display grid
    grid-template-columns 1fr
    border-top 1px solid #888
    border-left 1px solid #888

    & > *
        border-bottom 1px solid #888
        border-right 1px solid #888

    &.two-cols
        grid-template-columns 1fr 1fr
</style>
