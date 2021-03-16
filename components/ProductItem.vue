<template lang="pug">
.product-item
    .product-item-info {{ product.name }}({{ product.quantity }})
    .product-item-price(:class="{ [priceDirection]: priceDirection }") {{ product.price }}
</template>

<script>
import Product from '@/models/Product'
import { watch, ref } from '@nuxtjs/composition-api'

export default {
    name: 'ProductItem',

    props: {
        product: {
            type: Product,
            required: true,
        },
    },

    setup(props) {
        const priceDirection = ref(null)

        watch(() => props.product.price, (newVal, oldVal) => {
            if (newVal === oldVal) {
                return
            }
            priceDirection.value = newVal > oldVal ? 'up' : 'down'
            setTimeout(() => {
                priceDirection.value = null
            }, 3000)
        })

        return {
            priceDirection,
        }
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

        &.up
            color #1caf50

        &.down
            color #d13e47
</style>
