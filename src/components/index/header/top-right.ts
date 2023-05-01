import { LitElement, html, css } from "lit";
import { settingIcon, chatIcon, dollarIcon } from "@static/svg/icons";
import './menu-item'
import '../sign-in/signin-menu-items'

class TopRight extends LitElement {

	render() {
		return html`
        <menu-item title="Support">
            ${chatIcon}
        </menu-item>
        
        <menu-item title="Setting">
            ${settingIcon}
        </menu-item>
        
        <menu-item title="Claim">
            ${dollarIcon}
        </menu-item>

        <signin-menu-items>
        </signin-menu-items>

    `}

}
customElements.define('top-right', TopRight)
