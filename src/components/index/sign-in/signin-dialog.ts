import { LitElement, html, css } from "lit"
import { query } from "lit/decorators.js";

import { googleIcon, emailIcon, appleIcon, facebookIcon } from "@static/svg/brand-icons"

import { signInPopup } from "/commons/firebase/authentication/signin-providers";
import {Dialogue} from "/components/elements/dia-logue.ts"

export class SignIn extends LitElement {
    @query('dia-logue')
    dialog: Dialogue

    static styles = css`
        a {
            color: unset;
        }
		menu-item {
			margin: .5em auto;
			display: block;
			width: 8em;
			height: 2em;
			box-shadow: var(--small-shadow);
		}
		svg {
			margin: .5em;
		}
    `

    render() {
        return html`
            <dia-logue .buttons=${["OK"]}>
            Select your authentication method:
            <menu-item>
                ${emailIcon}
                Email
            </menu-item>

            <menu-item @click=${() => this.signIn('google')}>
                ${googleIcon}
                Google
            </menu-item>

            <menu-item>
                ${appleIcon}
                Apple
            </menu-item>

            <menu-item>
                ${facebookIcon}
                Facebook
            </menu-item>

            <p>Our <a href="/privacy-policy.html">Privacy Policy</a> and <a href="/tos.html">Terms Of Service</a></p>
            </dia-logue>
    `}
    async show() {
        return await this.dialog.show()
    }

    async signIn(provider: string) {
        await signInPopup(provider)
        this.dialog.close()
    }
}
customElements.define('sign-in', SignIn)
