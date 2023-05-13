/* client site routing
Listens to window.popstate and loads the proper component. 

## adding a new page:
add an entry to routes varibale in page-router.ts. 
> Look at the type definition for Routes. It is from a path to a function, which accept parameters and returns html template.

## routing to a page from another page:
import {gotoPage} from store.ts
// the rest
<some-tag @click={() => gotoPage("/path-to/desired-page")}

## restrict a page to specific authorizaion level (have to sig in)
you can enforce visitors to login to an appropriate level (customer, broker, etc) before viewing a page (if they have not loggen in already).
Add an entry to routeAuthorication variable in page-router.ts
> It is from a path to an Authorization like "/path-to/broker-specific-page": "broker"
*/

type Path = string // like /path-to/some-page
type Params = { [key: string]: string }
type HTMLFunc = (params: Params) => TemplateResult<1>
type Routes = {[key:Path]: HTMLFunc}
type RouteAuthorization = { [key: string]: Authorization }

import { LitElement, html } from "lit";
import { state } from "lit/decorators.js"

import { Authorization, currentUser, signInDialog } from "/commons/pubsub/store"

import "/components/home-page/home-page.ts"
import "/components/ques-tionnaire/ques-tionnaire.ts"
import "/components/broker/broker-home.ts"
import "./simple-form.ts"
import {feedbackForm} from "@static/html-content/messages.ts"


export const routes: Routes = {
    "/questionnaires/:name": (params: Params) => html`<ques-tionnaire name=${params.name}></ques-tionnaire>`,
    "/": () => html`<home-page></home-page>`,
    "/broker-home": () => html`<broker-home></broker-home>`,
    "/feedback-form": () => html`<simple-form .content=${feedbackForm} name="MIA Feedback Form"></simple-form>`,
}

const routeAuthorization: RouteAuthorization = {
    "/broker-home": "broker",
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
