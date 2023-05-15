import { LitElement, css, html } from "lit";
import { addIcon, removeIcon } from "@static/svg/icons";
import { query } from "lit/decorators.js";

class AddMore extends LitElement {
    @query('div')
    div: HTMLDivElement

    render () {return html`
        <div>
        <slot></slot>
        <span id="add" @click=${this.addItem}>${addIcon}</span>
        <span id="remove" @click=${this.removeItem}>${removeIcon}</span>
        </div>
    `}

    addItem() {
        const clone = this.renderRoot.cloneNode(true)
        this.div.after(clone)
    }

    static styles = css`
        div {
            box-shadow: var(--outset);
            position: relative;
            margin-bottom: 2em;
        }
        svg {
            height: 2em;
        }
        span {
            height: 1em;
            fill: var(--accent-color);
            color: var(--accent-color);
            background-color: var(--accent-background);
            line-height: 2em;
        }
        #add {
            position: absolute;
            bottom: -1em;
            left: 0;

        }
        #remove {
            position: absolute;
            right: 0;
            top: 0;
        }
    `
}
customElements.define('add-more', AddMore)
