import { html, LitElement, css } from "lit";
import { property } from "lit/decorators.js";


class MenuItem extends LitElement {
    @property() disabled=false


    static styles = css`
        div {
            display: inline-flex;
            height: 100%;
            align-items: center;
            width: inherit;
			cursor: pointer;
            position: relative;
        }
        ::slotted(svg), ::slotted(img) {
            height: 100%;
        }

		div:hover {
			color: var(--highlight-color);
			fill: var(--highlight-color);
		}
        div[disabled=true] {
            color: var(--inactive-color);
			fill: var(--inactive-color);
            pointer-events: none;
        }
        ::slotted(mark) {
            position: absolute;
            bottom: -1em;

            white-space: nowrap;

            font-size: smaller;
            padding: 0;
            color: inherit;

            background: none;
        }
    `

    render () {return html`
        <div disabled=${this.disabled}>
            <slot>
            </slot>
        </div>
    `}

}
customElements.define('menu-item', MenuItem)