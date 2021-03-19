import VuexORM from '@vuex-orm/core'
import database from '@/database'
import api from '@/api'
import Section from '@/models/orm/Section'
import Product from '@/models/orm/Product'
import { DEFAULT_CURRENCY } from '@/constants'

export const state = () => ({
    currency: DEFAULT_CURRENCY,
})

export const getters = {
    getProductListBySectionId: () => sectionId => Product.query().where('sectionId', sectionId).get(),
}

export const actions = {
    async init() {
        const [
            sectionList,
            productList,
        ] = await Promise.all([
            api.getSectionList(),
            api.getProductList(),
        ])
        await Promise.all([
            Section.create({ data: sectionList }),
            Product.create({ data: productList }),
        ])
    },

    async clearInitData() {
        await Promise.all([
            Section.deleteAll(),
            Product.deleteAll(),
        ])
    },

    subscribeToUpdates() {
        const eventSubscriber = api.subscribeToUpdates()

        eventSubscriber.addEventListener('productList', (data) => {
            const productIds = data.map(newProduct => newProduct.id)
            Product.delete(product => !productIds.includes(product.id))
            Product.insertOrUpdate({ data })
        })

        return eventSubscriber.unsubscribe
    },
}

export const plugins = [
    VuexORM.install(database),
]
