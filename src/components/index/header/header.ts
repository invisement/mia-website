import { css, html, LitElement } from "lit";
import './company-logo'
import './top-right'


class Header extends LitElement {
    static styles = css`
		:host {
			padding: 1em;
			display: block;
			position: sticky;
			top: 0;

			height: 2em;

			background-color: var(--accent-background);
			color: var(--accent-color);
			fill: var(--accent-color);
            box-shadow: var(--big-shadow);
            border-radius: 0 0 var(--border-radius) var(--border-radius);
		}
		
		top-right {
			height: 100%;
			float: right;
		}

		top-left {
			height: 100%;
			float: left;
		}
		company-logo {
			font-size: 2em;
			line-height: 1em;
		}
    `

    render () {return html`
        <top-left>
        	<company-logo>
        	</company-logo>
        </top-left>


        <top-right>
        </top-right>
    `}
}
customElements.define('head-er', Header)
