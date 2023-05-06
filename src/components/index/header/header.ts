import { css, html, LitElement } from "lit";
import './company-logo'
import '../sign-in/signin-menu-items'
import { settingIcon, chatIcon, dollarIcon } from "@static/svg/icons";
import '/components/elements/menu-item.ts'


class Header extends LitElement {
    static styles = css`
		:host {
			padding: 1em;
			display: flex;
            justify-content: space-between;

			position: sticky;
			top: 0;
            z-index: 20;

			height: 2em;

			background-color: var(--accent-background);
			color: var(--accent-color);
			fill: var(--accent-color);
            box-shadow: var(--big-shadow);
            border-radius: 0 0 var(--border-radius) var(--border-radius);
		}
		
        :host > * {
            flex: 1 1 0;
        }

		top-right {
			height: 100%;
            text-align: right;
		}

		top-left {
			height: 100%;
            text-align: left;
		}
		company-logo {
			font-size: 2em;
			line-height: 1em;
            text-align: center;
		}
    `

    render () {return html`
        <top-left>
            <menu-item title="Support">
                ${chatIcon}
            </menu-item>
            
            <menu-item title="Setting">
                ${settingIcon}
            </menu-item>
            
            <menu-item title="Claim">
                ${dollarIcon}
            </menu-item>
        </top-left>

        <company-logo>
        </company-logo>

        <top-right>
            <signin-menu-items></signin-menu-items>
        </top-right>
    `}
}
customElements.define('head-er', Header)
