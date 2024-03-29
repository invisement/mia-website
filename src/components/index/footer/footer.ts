import { LitElement, html, css } from "lit";

import { gotoPage } from "/commons/pubsub/store.ts";

class Footer extends LitElement {
    static styles = css`
        :host {
            background-color: var(--accent-background);
            color: var(--accent-color);
            fill: var(--accent-color);
            box-shadow: var(--big-shadow);
            border-radius: var(--border-radius) var(--border-radius) 0 0 ;

            padding: 1em;
            display: flex;
            flex-direction: column;
        }
        :host>* {
            display: flex;
            justify-content: center;
            gap: 2em;
            padding: .5em;
        }
        a, button, li {
            cursor: pointer;
        }
    `

    render () {return html`
        <div>
            <a >LinkedIn</a>
            <a >WhatsApp</a>
            <a >Instagram</a>
        </div>
        <div>
            <a @click=${() => gotoPage("/about-us")}>
                About US
            </a>
            <a @click=${() => gotoPage("/about-us")}>
                Privacy Policy
            </a>
            <a @click=${() => gotoPage("/about-us")}>
                Something Memeber
            </a>
            <a @click=${() => gotoPage("/about-us")}>
                Terms Of Services
            </a>
            <a @click=${() => gotoPage("/about-us")}>
                Contact US
            </a>
        </div>
        <div>
            <span>
                Copyright Statement 2023 MIA.io
            </span>
        <div>
    
    `}
}
customElements.define("foot-er", Footer)
