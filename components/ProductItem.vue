<template lang="pug">
.product-item
    .product-item-info {{ product.name }}({{ product.quantity }})
    .product-item-price {{ product.price }}
</template>

<script>
import Product from '@/models/Product'

export default {
    name: 'ProductItem',
    props: {
        product: {
            type: Product,
            required: true,
        },
    },
}
</script>

<style lang="stylus" scoped>
.product-item
    display flex
    .product-item-info
        flex-grow 1
        padding 5px 12px
    .product-item-price
        width 90px
        display flex
        align-items center
        justify-content center
        background-color #f3f3f3
        flex-shrink 0
        font-weight 700
</style>
