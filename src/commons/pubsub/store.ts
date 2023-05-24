// where global variables are stored

import { PubSub } from "./pubsub"

export type Authorization = "guest" | "broker" | "user"

export interface User {
    authorization: Authorization,
    signInMethod?: string,
    accessToken?: string,
    displayName?: string,
    email?: string,
    uid?: string,
}

export var currentUser = new PubSub<User>({ authorization: 'guest' })

export function gotoPage(url: string) {
    console.log("in goto", url, window.location.pathname)
    window.history.pushState(url, "", url)
    dispatchEvent(new PopStateEvent('popstate', { state: url }));
}


export const signInDialog = document.querySelector("#sign-in-dialog")
export const signOutDialog = document.querySelector("#sign-out-dialog")
export const notSignedInDialog = document.querySelector("#not-signed-in-dialog")
export const notAuthorizedDialog = document.querySelector("#not-authorized-dialog")
export const pageRouter = document.querySelector("page-router")

