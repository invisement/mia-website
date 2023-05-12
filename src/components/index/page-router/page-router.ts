import { LitElement, html } from "lit";
import { state } from "lit/decorators.js"

import { Authorization, currentUser, notAuthorizedDialog, signInDialog } from "/commons/pubsub/store"

import "/components/home-page/home-page.ts"
import "/components/ques-tionnaire/ques-tionnaire.ts"
import "/components/broker/broker-home.ts"

type Params = { [key: string]: string }

export const routes = {
    "/questionnaires/:name": (params: Params) => html`<ques-tionnaire name=${params.name}></ques-tionnaire>`,
    "/": () => html`<home-page></home-page>`,
    "/broker-home": () => html`<broker-home></broker-home>`,
}

const routeAuthorization: { [key: string]: Authorization } = {
    "/broker-home": "broker",
    "/questionnaires/insurance-questionnaire": "customer",
}

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  

class PageRouter extends LitElement {

    @state() pathname: string;

    popstate = async (e: PopStateEvent) => {
        e.preventDefault()
        const isAuthorized = await this.isUserAuthorized(window.location.pathname)
        if (isAuthorized) {
            this.pathname = window.location.pathname
        }
    }

    connectedCallback() {
        super.connectedCallback()
        this.pathname = window.location.pathname
        addEventListener("popstate", this.popstate)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        removeEventListener("popstate", this.popstate)
    }

    matchPathname(pathname: string, routePathname: string) {
        const pathnameParts = pathname.split('/');
        const routePathnameParts = routePathname.split('/');

        if (pathnameParts.length !== routePathnameParts.length) {
            return null;
        }

        const params: Params = {};

        for (let i = 0; i < routePathnameParts.length; i++) {
            const routePathnamePart = routePathnameParts[i];
            const pathnamePart = pathnameParts[i];

            if (routePathnamePart.startsWith(':')) {
                const paramName = routePathnamePart.slice(1);
                const paramValue = pathnamePart;
                params[paramName] = paramValue;
            } else if (routePathnamePart !== pathnamePart) {
                return null;
            }
        }
        return params;
    }

    async isUserAuthorized(path: string) {
        const requestedAuth = routeAuthorization[path]
        if (!requestedAuth) {
            return true
        }
        var userAuth = currentUser.getValue().authorization

        if (requestedAuth != userAuth) {
            await wait(10)
            const x = await signInDialog.updateComplete
            userAuth = await signInDialog.show(requestedAuth)
        }

        if (requestedAuth == userAuth) {
            return true
        }

        return false

    }

    render() {
        for (const route in routes) {
            const params = this.matchPathname(this.pathname, route)
            if (params) {
                scrollTo(0, 0)
                return routes[route](params)
            }
        }
    }
}

customElements.define('page-router', PageRouter)
