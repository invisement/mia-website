import {LitElement, html, css} from 'lit'

class CardBoard extends LitElement {
    render () {return html`
            <slot></slot>
    `}

    static styles = css`
        :host {
            display: block;
            height: inherit;
            overflow: hidden;
            box-shadow: var(--big-shadow);
            border-radius: var(--border-radius);
            background-color: var(--primary-background);
        }

    `
}
customElements.define("card-board", CardBoard)

