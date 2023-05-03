import { LitElement, html, css } from "lit"
import { query } from "lit/decorators.js";

import { googleIcon, emailIcon, appleIcon, facebookIcon } from "@static/svg/brand-icons"

import '/components/index/header/menu-item'
import { signInPopup } from "/commons/firebase/authentication/signin-providers";


class SignIn extends LitElement {
    @query('dialog')
    dialog: HTMLDialogElement

    static styles = css`
		dialog {
			font-size: 1rem;
			text-align: center;
            background-color: var(--primary-background);
            box-shadow: var(--big-shadow);
            border-radius: 2em;
            border: 0;            
		}
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
    // show the dialog and await until it is closed!
    async show() {
        this.dialog.showModal()
        const x = this.dialog
        await new Promise<void>(resolve => {
            // add an event listener to the dialog's "close" event
            this.dialog.addEventListener('close', function callback() {
                // remove the dialog element from the DOM
                x.removeEventListener('close', callback);
                // resolve the Promise
                resolve();
            });
        })
    }

	close() {
            this.dialog.close()
        }

}
customElements.define('sign-in', SignIn)
