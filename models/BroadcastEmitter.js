import EventListener from '@/models/EventListener'

export default class BroadcastEmitter {
    constructor() {
        this.listeners = new Map()
    }

    addListener(event, cb) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set())
        }
        this.listeners.get(event).add(cb)
    }

    removeListener(event, cb) {
        if (!this.listeners.has(event) || !this.listeners.get(event).has(cb)) {
            return
        }
        this.listeners.get(event).delete(cb)
        if (!this.listeners.get(event).size) {
            this.listeners.delete(event)
        }
    }

    broadcast(event, value) {
        if (!this.listeners.has(event)) {
            return
        }
        this.listeners.get(event).forEach(cb => cb(value))
        return this
    }

    createListener() {
        return new EventListener(this.addListener.bind(this), this.removeListener.bind(this))
    }
}
