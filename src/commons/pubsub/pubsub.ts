/* How to use example
// define type and variable in store.ts
import {PubSub} from './pubsub.ts'
export interface User {//whatever}
export var user = new PubSub<User>(initial_value: User)

//in component that updates variable x (publisher):
import {User, user} from '/commons/store.ts'
user.pub(new_user_value)

//in component that consumes variable x
import {User, user} from '/commons/store.ts'
class ConsumerComponent extends LitElement {
    @state() user: User
    sub_id: number

    connectedCallback() {
        super.connectedCallback()
        this.sub_id = user.sub(this.user)
    }
    disconnectedCallback() {
        super.disconnectedCallback()
        this.unsub(this.sub_id)
    }
    // the rest
}
*/


export class PubSub<T> {
	declare readonly FT: (t: T) => void

    private subscribers: Map<number, typeof this.FT> = new Map()
    private counter: number = 0
    private value: T
    private defaultValue: T

    constructor(defaultValue: T) {
        this.defaultValue = defaultValue
        this.value = defaultValue
    }

    pub(val: undefined | T) {
        this.value = val? val : this.defaultValue
        this.subscribers.forEach(s => s(this.value))
    }

    sub(f: typeof this.FT) {
        this.subscribers.set(this.counter, f)
        f(this.value)
        return this.counter++
    }

    getValue() {
        return this.value
    }

    unsub(id: number) {
        this.subscribers.delete(id)
    }
}
