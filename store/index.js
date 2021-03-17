import VuexORM from '@vuex-orm/core'
import database from '@/database'

import api from '@/api'
import Section from '@/models/Section'
import Product from '@/models/Product'

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

    startBroadcast() {
        const eventListener = api.startBroadcast()

        eventListener.addListener('productList', (data) => {
            Product.insertOrUpdate({ data })
        })
    },
}

export const plugins = [
    VuexORM.install(database),
]
