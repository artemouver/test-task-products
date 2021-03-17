import CartProduct from '@/models/CartProduct'

export const actions = {
    async addCartProduct(store, productId) {
        await CartProduct.insert({ data: { productId, num: 1 } })
    },

    async deleteCartProduct(store, productId) {
        await CartProduct.delete(cartProduct => cartProduct.productId === productId)
    },

    toggleCartProduct({ dispatch }, productId) {
        const isExistCartProduct = CartProduct.query().where('productId', productId).exists()
        dispatch(isExistCartProduct ? 'deleteCartProduct' : 'addCartProduct', productId)
    },

    async setCartProductNums(state, { productId, num }) {
        await CartProduct.update({
            where: cartProduct => cartProduct.productId === productId,
            data: { num: +num || 1 },
        })
    },
}
