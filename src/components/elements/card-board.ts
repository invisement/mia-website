import {LitElement, html, css} from 'lit'

class CardBoard extends LitElement {
    render () {return html`
        <div>
            <slot></slot>
        </div>
    `}

    static styles = css`
        div {
            height: inherit;
            overflow: hidden;
            box-shadow: var(--big-shadow);
            border-radius: 2em;
            background-color: var(--primary-background);
            margin: 2em 0;
        }
    `
}
customElements.define("card-board", CardBoard)

