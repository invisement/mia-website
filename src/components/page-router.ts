import { LitElement, html } from "lit";
import { state } from "lit/decorators.js"
import "./home-page/home-page.ts"
import "./landing-page/ques-tionnaire/ques-tionnaire.ts"
import { isWindows } from "https://deno.land/std@0.183.0/_util/os.ts";

type Params = {[key: string]: string}

const routes = {
    "/questionnaires/:name": (params: Params) => html`<ques-tionnaire src="/questionnaires/${params.name}.html"></ques-tionnaire>`,
    "/": () => html`<home-page></home-page>`
}


export class PageRouter extends LitElement {

    @state() pathname: string;

    constructor() {
        super()
        this.pathname = window.location.pathname
    }

    connectedCallback() {
        super.connectedCallback()
        document.addEventListener('popstate', (e) => {
            console.log("in connected", e)
            this.pathname = window.location.pathname
        })
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
                return routes[route](params)
            }
        }
    }
}

customElements.define('page-router', PageRouter)
