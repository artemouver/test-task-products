import { Database } from '@vuex-orm/core'
import Section from '@/models/Section'
import Product from '@/models/Product'

const database = new Database()

database.register(Section)
database.register(Product)

export default database
