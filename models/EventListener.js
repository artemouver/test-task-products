export default class EventListener {
    constructor(addListenerFunction, removeListenerFunction) {
        this.addListener = addListenerFunction
        this.removeListener = removeListenerFunction
    }
}
