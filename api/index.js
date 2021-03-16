/**
 * Прослойка запросов к api, возвращающих данные в нормализованном виде
 */

import { random, roundNumberToNDecimalPlaces } from '@/utils'
import BroadcastEmitter from '@/models/BroadcastEmitter'

const getSectionList = async () => {
    const { default: names } = await import('@/assets/data/names.json')
    return Object.entries(names)
        .map(([sectionId, section]) => ({
            id: sectionId,
            name: section.G,
        }))
}

const getUsdToRubExchangeRate = () => new Promise(resolve => resolve(random(20, 80)))

const getProductList = async () => {
    const [
        { default: data },
        { default: names },
        usdToRubExchangeRate,
    ] = await Promise.all([
        import('@/assets/data/data.json'),
        import('@/assets/data/names.json'),
        getUsdToRubExchangeRate(),
    ])
    return data.Value?.Goods?.map?.(product => ({
        id: product.T,
        sectionId: product.G,
        name: names[product.G].B[product.T].N,
        price: roundNumberToNDecimalPlaces(usdToRubExchangeRate * product.C, 2),
        quantity: product.P,
    }))
}

const startBroadcast = () => {
    const broadcastEmitter = new BroadcastEmitter()
    setInterval(async () => {
        broadcastEmitter.broadcast('productList', await getProductList())
    }, 15000)
    return broadcastEmitter.createListener()
}

export default {
    getSectionList,
    getProductList,
    startBroadcast,
}
