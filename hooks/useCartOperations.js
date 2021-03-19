import { useActions } from '@/hooks/useVuexHelpers'
import { minmax } from '@/utils'

/**
 * Возвращаются функции для оперирования с корзиной товаров
 * toggleCartProduct - удаляет товар из корзины или добавляет в зависимости того, есть он в корзине или нет
 * deleteCartProduct - удаляет товар из корзины
 * setCartProductNums - меняет количество товара в корзине
 */
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
