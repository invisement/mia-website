import { html, LitElement, css } from "lit";
import { property } from "lit/decorators.js";


class MenuItem extends LitElement {
    @property() disabled=false


    static styles = css`
        span {
            display: inline-flex;
            height: 100%;
            align-items: center;
            width: inherit;
			cursor: pointer;
        }
        ::slotted(svg) {
            height: 100%;
        }
        ::slotted(img) {
            height: 100%;
        }

		span:hover {
			color: var(--highlight-color);
			fill: var(--highlight-color);
		}
        span[disabled=true] {
            color: var(--inactive-color);
			fill: var(--inactive-color);
            pointer-events: none;
        }
    `

    render () {return html`
        <span disabled=${this.disabled}>
            <slot>
            </slot>
		</span>
    `}

}
customElements.define('menu-item', MenuItem)