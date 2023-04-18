import { html, LitElement, css } from "lit";


class MenuItem extends LitElement {
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

		span:hover {
			color: var(--highlight-color);
			fill: var(--highlight-color);
		}
    `

    render () {return html`
        <span>
            <slot>
            </slot>
		</span>
    `}

}
customElements.define('menu-item', MenuItem)