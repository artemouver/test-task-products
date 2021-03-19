<template lang="pug">
tr.cart-product-row
    td.cart-product-name {{ productName }}
    td.cart-product-nums
        input.input-counter(
            v-model="productNum"
            type="number"
            min="1"
            :max="cartProduct.product.quantity"
        )
        span шт.
        .hint-limited(v-if="isLimited") Количество ограничено
    td.cart-product-price
        span {{ formattedPrice }}
        |  / шт.
    td.cart-product-remove
        button.cart-product-remove-button(@click="onClickRemoveButton") Удалить
</template>

<script>
import CartProduct from '@/models/orm/CartProduct'
import useCartOperations from '@/hooks/useCartOperations'
import useCurrency from '@/hooks/useCurrency'
import { computed } from '@nuxtjs/composition-api'

export default {
    name: 'ProductCartRow',

    props: {
        cartProduct: {
            type: CartProduct,
            required: true,
        },
    },

    setup(props) {
        const {
            setCartProductNums,
            deleteCartProduct,
        } = useCartOperations()

        const { formatAmount, currency } = useCurrency()

        const price = computed(() => props.cartProduct.product.price[currency.value])
        const formattedPrice = computed(() => formatAmount(price.value))
        const productName = computed(() => `${props.cartProduct.product.section.name}. ${props.cartProduct.product.name}`)
        const productNum = computed({
            get: () => props.cartProduct.num,
            set: value => setCartProductNums(props.cartProduct, value),
        })
        const isLimited = computed(() => props.cartProduct.product.quantity <= 10)
        const onClickRemoveButton = () => deleteCartProduct(props.cartProduct.productId)

        return {
            formattedPrice,
            productName,
            productNum,
            isLimited,
            onClickRemoveButton,
        }
    },
}
</script>

<style lang="stylus" scoped>
.cart-product-row
    td
        border-top 1px #aaa solid
        padding 10px 3px

.cart-product-nums
    span
        margin-left 3px

    .hint-limited
        border 1px dotted #ff7f53
        color #ff5b3b
        width 110px
        background-color alpha(#ffd86c, .08)
        margin-top 3px

.input-counter
    border 1px solid #888
    padding 5px
    width 50px
    font-size 11px

.cart-product-price
    color #888

    span
        font-size 14px
        font-weight 500
        color #000

.cart-product-remove
    text-align right
</style>
