import { LitElement, css, html } from "lit";


export class Chip extends LitElement {
    render() {return html`
        <div><slot></slot></div>
    `}

    static styles = css`
        div {
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
            animation-duration: 1s;
            transition: 2s;
        }

        div:hover {
            box-shadow: var(--outset);
            background-color: var(--accent-background);

            animation-name: bounce;
            animation-timing-function: linear;
            animation-iteration-count: 2;
        }

        @keyframes bounce {
            0%   { transform: translateY(0); }
            50%  { transform: translateY(-10px); }
            100% { transform: translateY(0); }
        }


        :host([disabled]) {
            pointer-events: none;
            opacity: .2;
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
