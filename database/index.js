import { Database } from '@vuex-orm/core'
import Section from '@/models/orm/Section'
import Product from '@/models/orm/Product'
import CartProduct from '@/models/orm/CartProduct'

const database = new Database()

database.register(Section)
database.register(Product)
database.register(CartProduct)

export default database
