<template lang="pug">
details.section-item(open)
    summary {{ label }}
    ProductTable(:sectionId="sectionId")
</template>

<script>
import ProductTable from '@/components/ProductTable.vue'
export default {
    name: 'SectionItem',
    components: {
        ProductTable,
    },
    props: {
        sectionId: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
}
</script>

<style lang="stylus" scoped>
.section-item
    &:not([open]) summary
        border-radius 5px
        border 1px solid #888
    summary
        border-top-left-radius 5px
        border-top-right-radius 5px
        border 1px solid #888
        border-bottom none
        outline none
        background-color #d2dee2
        padding 8px 16px
        font-weight 600
        user-select none
        cursor pointer
</style>
