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
    addEventListener(event, cb) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set())
        }
        this.listeners.get(event).add(cb)
    }

    /**
     * Удаление слушателя
     */
    removeEventListener(event, cb) {
        if (!this.listeners.has(event) || !this.listeners.get(event).has(cb)) {
            return
        }
        this.listeners.get(event).delete(cb)
        if (!this.listeners.get(event).size) {
            this.listeners.delete(event)
        }
    }

    /**
     * Транслирование события всем слушателям, прослушивающих это событие (выполнение колбеков)
     * Возвращается this для создания цепочек
     */
    broadcast(event, value) {
        if (!this.listeners.has(event)) {
            return
        }
        this.listeners.get(event).forEach(cb => cb(value))
        return this
    }

    /**
     * Создание подписчика
     *
     * @returns {EventSubscriber}
     */
    createSubscriber() {
        return new EventSubscriber(this.addEventListener.bind(this), this.removeEventListener.bind(this))
    }
}
