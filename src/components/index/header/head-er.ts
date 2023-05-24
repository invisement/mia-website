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
        img, svg {
            height: 3em;
            vertical-align: middle;
        }


    header {
        display: flex;
        text-align: center;
        padding: .5em;

        position: sticky;
        top: 0;
        z-index: 20;

        height: 3em;
        line-height: 3em;

        background-color: var(--primary-background);
        color: var(--accent-color);
        fill: var(--accent-color);
        border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
    header > ul {
        flex-basis: 0;
        flex-grow: 1; 
    }

    ul {
        margin: 0;
    }

    li, menu-item {
        display: inline-block;
        margin: 0 .5em;
        cursor: pointer;
    }
    button {
        cursor: pointer;
        font-size: inherit;
        font-family: var(--primary-font);
        padding: .5em;
        border-radius: .5em;
        font-weight: normal;
        min-width: 6em;
        background-color: var(--primary-background);
        color: var(--accent-color);
        border: .5px solid;
    }
    .underline {
        border-bottom: thin solid;
    }
    .reverse {
        background-color: var(--accent-color);
        color: var(--primary-background);
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
