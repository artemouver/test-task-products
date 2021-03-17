import { Model } from '@vuex-orm/core'
import Product from '@/models/orm/Product'

export default class CartProduct extends Model {
    static entity = 'cart_products'

    static fields() {
        return {
            id: this.attr(null),
            productId: this.number(null),
            num: this.number(null),
            product: this.belongsTo(Product, 'productId'),
        }
    }
}
