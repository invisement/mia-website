import { LitElement, css, html } from "lit";


export class Chip extends LitElement {
    render() {return html`
        <slot></slot>
    `}

    static styles = css`
        :host {
            width: 6em;
            height: 6em;
            padding: 1.5em;
            white-space: nowrap;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            position: relative;

            background-color: white;
            box-shadow: var(--big-shadow);
            border-radius: 2em;
            cursor: pointer;
        }

        ::slotted(mark) {
            position: absolute;
            top: 0;
            left: 0;

            padding: 0 .5em;
            font-size: smaller;

            background-color: var(--highlight-background);
            box-shadow: var(--small-shadow);
            color: var(--warning-color);
        }
        ::slotted(svg) {
            width: 100%;
        }
        ::slotted(img) {
            width: 100%;
        }
    `
}
customElements.define("vise-chip", Chip)
