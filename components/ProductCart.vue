<template lang="pug">
table.cart
    colgroup
        col(span="1" style="width: 50%;")
        col(span="1" style="width: 15%;")
        col(span="1" style="width: 25%;")
        col(span="1" style="width: 10%;")
    thead
        tr
            td
                h1.section-title Корзина
    tbody(v-if="productCartList.length")
        tr
            th Наименование товара и описание
            th Количество
            th Цена
        tr.cart-product-row(
            v-for="productCartItem in productCartList"
            :key="productCartItem.id"
        )
            td.cart-product-name {{ productCartItem.product.section.name }}. {{ productCartItem.product.name }}
            td.cart-product-nums
                input.input-counter(
                    :value="productCartItem.num"
                    type="number"
                    min="1"
                    :max="productCartItem.product.quantity"
                    @input="setCartProductNums({ productId: productCartItem.productId, num: $event.target.value })"
                )
                span шт.
                .hint-limited(v-if="productCartItem.product.quantity <= 10") Количество ограничено
            td.cart-product-price
                span {{ formatAmount(productCartItem.product.price[currency]) }}
                |  / шт.
            td.cart-product-remove
                button.cart-product-remove-button(@click="deleteCartProduct(productCartItem.productId)") Удалить
    tbody.empty(v-else)
        tr
            td(colspan="4")
                h2 Корзина пуста
    tfoot(v-if="productCartList.length")
        tr
            td(colspan="4")
                | Общая стоимость:&nbsp
                span {{ formatAmount(totalAmount) }}
</template>

<script>
import {
    defineComponent,
    useContext,
    computed,
} from '@nuxtjs/composition-api'

import CartProduct from '@/models/CartProduct'

export default defineComponent({
    name: 'ProductCart',

    setup() {
        const { store } = useContext()

        const productCartList = computed(() => {
            return CartProduct.query().withAllRecursive(2).all()
        })

        const setCartProductNums = (...args) => {
            store.dispatch('cart/setCartProductNums', ...args)
        }

        const amountFormatter = new Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })

        const formatAmount = value => amountFormatter.format(value)

        const deleteCartProduct = async productId => await store.dispatch('cart/deleteCartProduct', productId)

        const currency = computed(() => store.state.currency)

        const totalAmount = computed(() => productCartList.value
            .reduce((acc, cartProduct) => acc + cartProduct.num * cartProduct.product.price[currency.value], 0))

        return {
            productCartList,
            setCartProductNums,
            formatAmount,
            deleteCartProduct,
            totalAmount,
            currency,
        }
    },
})
</script>

<style lang="stylus" scoped>
.cart
    padding 15px
    border-spacing 0
    width 100%

    .section-title
        padding-bottom 10px

    th
        text-align left
        padding 10px 0

    tbody.empty
        text-align center
        color #888

        td
            border 1px dotted #ff7f53
            padding 5px

    tfoot
        td
            padding-top 5px
            text-align right

            span
                font-size 16px
                font-weight 700
                color #ff7f53

.cart-product-row
    td
        border-top 1px #aaa solid
        padding 10px 3px

.input-counter
    border 1px solid #888
    padding 5px
    width 50px
    font-size 11px

.cart-product-nums
    span
        margin-left 3px

    .hint-limited
        border 1px dotted #ff7f53
        color #ff5b3b
        width 110px
        background-color alpha(#ffd86c, .08)
        margin-top 3px

.cart-product-price
    color #888

    span
        font-size 14px
        font-weight 500
        color #000

.cart-product-remove
    text-align right
</style>
