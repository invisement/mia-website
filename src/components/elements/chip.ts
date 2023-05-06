import { LitElement, css, html } from "lit";


export class Chip extends LitElement {
    render() {return html`
        <slot></slot>
    `}

    static styles = css`
        :host {
            width: 8em;
            height: 8em;
            padding: 1.5em;

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            position: relative;

            background-color: white;
            box-shadow: var(--big-shadow);
            border-radius: 2em;
            white-space: nowrap;
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
            width: fit-contain;
        }

        /*
        ::slotted(span) {
            position: absolute;
            bottom: 0;
            left: 2em;
        }
*/    
    `
}
customElements.define("vise-chip", Chip)
