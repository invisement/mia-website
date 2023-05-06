import { LitElement, css, html } from "lit";


class Chips extends LitElement {
    render() {return html`
        <div>
            <slot>
            </slot>
        </div>
    `}

    static styles = css`
        div {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 1em;
            padding: 1em;
        }
    `
}
customElements.define('vise-chips', Chips)
