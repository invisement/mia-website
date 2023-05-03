import { LitElement, html } from "lit";
import { state } from "lit/decorators.js"

import "/components/home-page/home-page.ts"
import "/components/ques-tionnaire/ques-tionnaire.ts"

type Params = {[key: string]: string}

export const routes = {
    "/questionnaires/:name": (params: Params) => html`<ques-tionnaire name=${params.name}></ques-tionnaire>`,
    "/": () => html`<home-page></home-page>`,
}


class PageRouter extends LitElement {

    @state() pathname: string;

    popstate = (e: PopStateEvent) => {
        e.preventDefault()
        this.pathname = window.location.pathname
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
