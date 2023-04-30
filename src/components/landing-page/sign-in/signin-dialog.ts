import { LitElement, html, css } from "lit"

import { googleIcon, emailIcon, appleIcon, facebookIcon } from "@static/svg/brand-icons"
import '../top-menu/menu-item'
import { query } from "lit/decorators.js";
import { signInPopup } from "./signin-providers";


class SignIn extends LitElement {
	@query('dialog')
	dialog: HTMLDialogElement

	static styles = css`
		dialog {
			font-size: 1rem;
			text-align: center;
            background-color: var(--accent-background);
            color: var(--accent-color);
		}
        a {
            color: unset;
        }
		menu-item {
			margin: .5em auto;
			display: block;
			width: 8em;
			height: 2em;
			box-shadow: var(--shadow);
		}
		svg {
			margin: .5em;
		}
    `

	render() {
		return html`
        <dialog>
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

			<button autofocus @click=${this.close}>
            	Close
			</button>

        </dialog>
    `}

	async signIn(provider: string) {
		await signInPopup(provider)
		this.close()
	}
	show() {
		this.dialog.showModal()
	}

	close() {
		this.dialog.close()
	}

}
customElements.define('sign-in', SignIn)
