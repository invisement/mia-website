// where global variables are stored

import { PubSub } from "./pubsub"

export interface User {
    isSignedIn: boolean,
    signInMethod?: string,
    accessToken?: string,
    displayName?: string,
    email?: string,
    uid?: string,
}

export var currentUser = new PubSub<User>({ isSignedIn: false })

