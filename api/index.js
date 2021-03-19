/**
 * Прослойка запросов к api, возвращающих данные в нормализованном виде
 */

import { random, roundNumberToNDecimalPlaces } from '@/utils'
import BroadcastEmitter from '@/models/BroadcastEmitter'
import { BROADCAST_TIMEOUT, RUB, USD } from '@/constants'

const getSectionList = async () => {
    const { default: names } = await import('@/assets/data/names.json')
    return Object.entries(names)
        .map(([sectionId, section]) => ({
            id: sectionId,
            name: section.G,
        }))
}

const getExchangeRates = () => new Promise(resolve => resolve({
    [RUB]: random(20, 80),
    [USD]: 1,
}))

const getProductList = async () => {
    const [
        { default: data },
        { default: names },
        exchangeRates,
    ] = await Promise.all([
        import('@/assets/data/data.json'),
        import('@/assets/data/names.json'),
        getExchangeRates(),
    ])
    return data.Value?.Goods?.map?.(product => ({
        id: product.T,
        sectionId: product.G,
        name: names[product.G].B[product.T].N,
        price: Object.fromEntries(
            Object.entries(exchangeRates)
                .map(([currency, exchangeRate]) => [
                    currency,
                    roundNumberToNDecimalPlaces(product.C * exchangeRate, 2),
                ]),
        ),
        quantity: product.P,
    }))
}

let broadcastEmitter = null
const eventIntervals = []

const subscribeToUpdates = () => {
    broadcastEmitter = new BroadcastEmitter()
    eventIntervals.push(
        setInterval(async () => {
            broadcastEmitter.broadcast('productList', await getProductList())
        }, BROADCAST_TIMEOUT),
    )
    return broadcastEmitter.createSubscriber()
}

const unsubscribeFromUpdates = () => {
    eventIntervals.forEach(clearInterval)
    broadcastEmitter = null
}

export default {
    getSectionList,
    getProductList,
    subscribeToUpdates,
    unsubscribeFromUpdates,
}
