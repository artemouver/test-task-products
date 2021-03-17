import EventSubscriber from '@/models/EventSubscriber'

export default class BroadcastEmitter {
    constructor() {
        this.listeners = new Map()
    }

    addEventListener(event, cb) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set())
        }
        this.listeners.get(event).add(cb)
        return this
    }

    removeEventListener(event, cb) {
        if (!this.listeners.has(event) || !this.listeners.get(event).has(cb)) {
            return
        }
        this.listeners.get(event).delete(cb)
        if (!this.listeners.get(event).size) {
            this.listeners.delete(event)
        }
        return this
    }

    broadcast(event, value) {
        if (!this.listeners.has(event)) {
            return
        }
        this.listeners.get(event).forEach(cb => cb(value))
        return this
    }

    createSubscriber() {
        return new EventSubscriber(this.addEventListener.bind(this), this.removeEventListener.bind(this))
    }
}
