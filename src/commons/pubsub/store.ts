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

export function gotoPage(url: string) {
    window.history.pushState(url, "", url)
    dispatchEvent(new PopStateEvent('popstate', { state: url }));
}


export const signInDialog = document.querySelector("#sign-in-dialog")
export const signOutDialog = document.querySelector("#sign-out-dialog")
