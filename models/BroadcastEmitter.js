import EventSubscriber from '@/models/EventSubscriber'

/**
 * Класс для транслирования событий подписчикам
 */
export default class BroadcastEmitter {
    /**
     * Создается listeners - Map, в котором ключом является название события, а значением - Set слушателей (функций)
     */
    constructor() {
        this.listeners = new Map()
    }

    /**
     * Добавление слушателя
     */
    addEventListener(subscriber, event, cb) {
        if (!this.listeners.has(subscriber)) {
            this.listeners.set(subscriber, new Map())
        }
        const eventMap = this.listeners.get(subscriber)
        if (!eventMap.has(event)) {
            eventMap.set(event, new Set())
        }
        eventMap.get(event).add(cb)
    }

    /**
     * Удаление слушателя
     */
    removeEventListener(subscriber, event, cb) {
        if (!this.listeners.get(subscriber)?.get(event)?.get(cb)) {
            return
        }
        const eventMap = this.listeners.get(subscriber)
        const cbSet = eventMap.get(event)
        cbSet.delete(cb)
        if (!cbSet.size) {
            eventMap.delete(event)
        }
        if (!eventMap.size) {
            this.listeners.delete(subscriber)
        }
    }

    /**
     * Транслирование события всем слушателям, прослушивающих это событие (выполнение колбеков)
     * Возвращается this для создания цепочек
     */
    broadcast(event, value) {
        for (const [, eventMap] of this.listeners) {
            if (!eventMap.has(event)) {
                continue
            }
            eventMap.get(event).forEach(cb => cb(value))
        }
        return this
    }

    /**
     * Создание подписчика
     *
     * @returns {EventSubscriber}
     */
    createSubscriber() {
        return new EventSubscriber(this)
    }

    /**
     * Удаление подписчика
     */
    removeSubscriber(subscriber) {
        this.listeners.delete(subscriber)
    }
}
