import { useActions } from '@/hooks/useVuexHelpers'
import { minmax } from '@/utils'

export default () => {
    const {
        toggleCartProduct,
        setCartProductNums,
        deleteCartProduct,
    } = useActions('cart', [
        'toggleCartProduct',
        'setCartProductNums',
        'deleteCartProduct',
    ])

    const updateCartProductNums = (productCartItem, num) => {
        setCartProductNums({
            productId: productCartItem.productId,
            num: minmax(num, 1, productCartItem.product.quantity),
        })
    }

    return {
        toggleCartProduct,
        setCartProductNums: updateCartProductNums,
        deleteCartProduct,
    }
}
