import { Model } from '@vuex-orm/core'
import Product from '@/models/orm/Product'

export default class Section extends Model {
    static entity = 'sections'

    static fields() {
        return {
            id: this.number(null),
            name: this.string(''),
            products: this.hasMany(Product, 'sectionId'),
        }
    }
}
