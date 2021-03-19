<template lang="pug">
.product-item(
    :class="{ active }"
    @click="toggleCartProduct(product.id)"
    @animationend="clearPriceDirection"
)
    .product-item-info {{ product.name }}({{ product.quantity }})
    .product-item-price(:class="{ [priceDirection]: priceDirection }") {{ product.price[currency] }}
</template>

<script>
import Product from '@/models/orm/Product'
import {
    watch,
    ref,
    computed,
} from '@nuxtjs/composition-api'
import CartProduct from '@/models/orm/CartProduct'
import useCartOperations from '@/hooks/useCartOperations'
import useCurrency from '@/hooks/useCurrency'

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

        const { currency } = useCurrency()
        const { toggleCartProduct } = useCartOperations()

        watch(() => props.product.price[currency.value], (newVal, oldVal) => {
            if (newVal === oldVal) {
                return
            }
            priceDirection.value = newVal > oldVal ? 'up' : 'down'
        })

        const clearPriceDirection = () => {
            priceDirection.value = null
        }

        const active = computed(() => CartProduct.query().where('productId', props.product.id).exists())

        return {
            priceDirection,
            clearPriceDirection,
            toggleCartProduct,
            active,
            currency,
        }
    },
}
</script>

<style lang="stylus" scoped>
.product-item
    display flex
    cursor pointer
    user-select none

    &:hover:not(.active)
        background-color alpha(#e4fff8, .7)

    &.active
        background-color alpha(#ffd373, .4)

    .product-item-info
        flex-grow 1
        padding 5px 12px

    .product-item-price
        width 90px
        display flex
        align-items center
        justify-content center
        background-color alpha(#000, .05)
        flex-shrink 0
        font-weight 700

        &.up
            animation up 3s

        &.down
            animation down 3s

@keyframes up
    from
        color #1caf50

    to
        color #1caf50

@keyframes down
    from
        color #d13e47

    to
        color #d13e47
</style>
