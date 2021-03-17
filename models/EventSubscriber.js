export default class EventSubscriber {
    constructor(addEventListenerFunction, removeEventListenerFunction) {
        this.addEventListener = addEventListenerFunction
        this.removeEventListener = removeEventListenerFunction
    }
}
