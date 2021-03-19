/**
 * Класс подписчика на события, транслируемые BroadcastEmitter, реализующий методы добавления и удаления слушателей
 */
export default class EventSubscriber {
    constructor(broadcastEmitter) {
        this.addEventListener = (event, cb) => broadcastEmitter.addEventListener(this, event, cb)
        this.removeEventListener = (event, cb) => broadcastEmitter.removeEventListener(this, event, cb)
        this.unsubscribe = () => broadcastEmitter.removeSubscriber(this)
    }
}
