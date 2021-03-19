/**
 * Прослойка запросов к api, возвращающих данные в нормализованном виде
 */

import BroadcastEmitter from '@/models/BroadcastEmitter'
import { random, roundNumberToNDecimalPlaces } from '@/utils'
import { BROADCAST_TIMEOUT, RUB, USD } from '@/constants'

/**
 * Запрос списка разделов (групп) товаров
 *
 * @typedef Section
 * @type Object
 * @property {String} id
 * @property {String} name
 *
 * @returns {Promise<Section[]>}
 */
const getSectionList = async () => {
    const { default: names } = await import('@/assets/data/names.json')
    return Object.entries(names)
        .map(([sectionId, section]) => ({
            id: sectionId,
            name: section.G,
        }))
}

/**
 * Запрос курсов валют
 *
 * @typedef ExchangeRateMap
 * @type Object
 * @property {String} RUB
 * @property {String} USD
 *
 * @returns {Promise<ExchangeRateMap>}
 */
const getExchangeRates = () => new Promise(resolve => resolve({
    [RUB]: random(20, 80),
    [USD]: 1,
}))

/**
 * Запрос списка продуктов
 *
 * @typedef PriceMap
 * @type Object
 * @property {String} RUB
 * @property {String} USD
 *
 * @typedef Product
 * @type Object
 * @property {Number} id
 * @property {Number} sectionId
 * @property {String} name
 * @property {PriceMap} price
 * @property {Number} quantity
 *
 * @returns {Promise<Product[]>}
 */
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

const broadcastEmitter = new BroadcastEmitter()
const eventIntervals = []
eventIntervals.push(
    setInterval(async () => {
        broadcastEmitter.broadcast('productList', await getProductList())
    }, BROADCAST_TIMEOUT),
)

/**
 * Подписка на некоторые события, приходящие с сервера.
 * Своеобразная имитация веб-сокетов.
 * Функция возвращает объект класса EventSubscriber,
 * с помощью которого можно подписываться на определенные события
 *
 * @returns {EventSubscriber}
 */
const subscribeToUpdates = () => {
    return broadcastEmitter.createSubscriber()
}

export default {
    getSectionList,
    getProductList,
    subscribeToUpdates,
}
