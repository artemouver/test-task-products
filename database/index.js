import { Database } from '@vuex-orm/core'
import Section from '@/models/Section'
import Product from '@/models/Product'
import CartProduct from '@/models/CartProduct'

const database = new Database()

database.register(Section)
database.register(Product)
database.register(CartProduct)

export default database
