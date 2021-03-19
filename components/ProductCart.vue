<template lang="pug">
table.cart-table
    colgroup
        col(span="1" style="width: 50%;")
        col(span="1" style="width: 15%;")
        col(span="1" style="width: 25%;")
        col(span="1" style="width: 10%;")
    thead
        tr
            td
                h1.section-title Корзина
    tbody(v-if="hasItems")
        tr.cart-labels
            th Наименование товара и описание
            th Количество
            th Цена
        tr(
            is="ProductCartRow"
            v-for="productCartItem in productCartList"
            :key="productCartItem.id"
            :cartProduct="productCartItem"
        )
    tbody.empty(v-else)
        tr
            td(colspan="4")
                h2 Корзина пуста
    tfoot(v-if="hasItems")
        tr
            td(colspan="4")
                | Общая стоимость:&nbsp
                span {{ formattedTotalAmount }}
</template>

<script>
import {
    defineComponent,
    computed,
} from '@nuxtjs/composition-api'
import CartProduct from '@/models/orm/CartProduct'
import useCurrency from '@/hooks/useCurrency'
import ProductCartRow from '@/components/ProductCartRow.vue'

export default defineComponent({
    name: 'ProductCart',

    components: {
        ProductCartRow,
    },

    setup() {
        const productCartList = computed(() => CartProduct.query().withAllRecursive(2).all())

        const { formatAmount, currency } = useCurrency()
        const totalAmount = computed(() => productCartList.value
            .reduce((acc, cartProduct) => acc + cartProduct.num * cartProduct.product.price[currency.value], 0))
        const formattedTotalAmount = computed(() => formatAmount(totalAmount.value))
        const hasItems = computed(() => productCartList.value.length)

        return {
            productCartList,
            formattedTotalAmount,
            hasItems,
        }
    },
})
</script>

<style lang="stylus" scoped>
.cart-table
    border-spacing 0
    width 100%

.section-title
    padding-bottom 10px

.cart-labels th
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
</style>
