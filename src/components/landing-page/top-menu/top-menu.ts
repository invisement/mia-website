import { css, html, LitElement } from "lit";
import './company-logo'
import './top-left'
import './top-right'


class TopMenu extends LitElement {
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
customElements.define('top-menu', TopMenu)
