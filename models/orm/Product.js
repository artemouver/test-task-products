import { Model } from '@vuex-orm/core'
import Section from '@/models/orm/Section'
import CartProduct from '@/models/orm/CartProduct'

export default class Product extends Model {
    static entity = 'products'

    static fields() {
        return {
            id: this.number(null),
            sectionId: this.number(null),
            name: this.string(''),
            price: this.attr(null),
            quantity: this.number(0),
            section: this.belongsTo(Section, 'sectionId'),
        }
    }

    static afterDelete(model) {
        CartProduct.delete(cartProduct => cartProduct.productId === model.id)
    }
}
