<template lang="pug">
details.section-item(open)
    summary {{ section.name }}
    ProductTable(:sectionId="section.id")
</template>

<script>
import ProductTable from '@/components/ProductTable.vue'
import Section from '@/models/Section'

export default {
    name: 'ProductSectionItem',

    components: {
        ProductTable,
    },

    props: {
        section: {
            type: Section,
            required: true,
        },
    },
}
</script>

<style lang="stylus" scoped>
.section-item
    &:not([open])
        summary
            border-radius 5px
            border 1px solid #888
            &:before
                transform rotate(180deg)

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
        list-style-type none

        &:before
            position relative
            display inline-block
            content '▲'
            font-family sans-serif
            margin-right 5px
</style>
