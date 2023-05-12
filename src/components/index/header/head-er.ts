import { LitElement, html, css } from "lit";
import { User, currentUser } from "/commons/pubsub/store";
import { headerHtmls } from "./header-htmls";
import "/components/elements/menu-item"
import { state } from "lit/decorators.js";

class Header extends LitElement {
    userAuthorization = "guest"
    userEventSubscription = 0

    @state() displayName = ""

    connectedCallback() {
        super.connectedCallback()
        this.userEventSubscription = currentUser.sub(this.userChange)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        currentUser.unsub(this.userEventSubscription)
    }


    static styles = css`
    header {
        padding: .5em;
        display: flex;
        text-align: center;

        position: sticky;
        top: 0;
        z-index: 20;

        height: 3em;

        background-color: var(--accent-background);
        color: var(--accent-color);
        fill: var(--accent-color);
        box-shadow: var(--big-shadow);
        border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
    header > * {
        flex-basis: 0;
        flex-grow: 1;     
    }
    menu-item {
        height: 100%;
    }
    `

    render () {return html`
        <header>
            ${headerHtmls[this.userAuthorization](currentUser.getValue()?.displayName)}
        </header>
    `}

    userChange = (user: User) => {
        this.userAuthorization = user.authorization
        this.requestUpdate()
    }
}
customElements.define('head-er', Header)
