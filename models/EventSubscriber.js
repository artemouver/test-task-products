/**
 * Класс подписчика на события, транслируемые BroadcastEmitter, реализующий методы добавления и удаления слушателей
 */
export default class EventSubscriber {
    constructor(addEventListenerFunction, removeEventListenerFunction) {
        this.addEventListener = addEventListenerFunction
        this.removeEventListener = removeEventListenerFunction
    }
}
