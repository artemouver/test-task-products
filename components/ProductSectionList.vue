<template lang="pug">
.product-sections
    .product-sections-column(
        v-for="columnNum in numColumns"
        :key="columnNum"
    )
        ProductSectionItem(
            v-for="productSectionItem in getFilteredProductSectionListByColumnNum(columnNum)"
            :key="productSectionItem.id"
            :section="productSectionItem"
        )
</template>

<script>
import {
    defineComponent,
    ref,
    computed,
} from '@nuxtjs/composition-api'
import Section from '@/models/Section'
import ProductSectionItem from '@/components/ProductSectionItem.vue'

export default defineComponent({
    name: 'ProductSectionList',

    components: {
        ProductSectionItem,
    },

    setup() {
        const numColumns = ref(2)
        const productSectionList = computed(() => Section.query().has('products').get())
        const getFilteredProductSectionListByColumnNum = columnNum => productSectionList.value
            .filter((_, index) => index % numColumns.value === columnNum - 1)

        return {
            numColumns,
            productSectionList,
            getFilteredProductSectionListByColumnNum,
        }
    },
})
</script>

<style lang="stylus" scoped>
.product-sections
    display flex

.product-sections-column
    flex 1

    &:not(:first-child)
        margin-left 10px

    & > *:not(:first-child)
        margin-top 5px
</style>
