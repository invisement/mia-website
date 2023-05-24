import { LitElement, html, css } from "lit"
import { query } from "lit/decorators.js";

import { googleIcon, emailIcon, appleIcon, facebookIcon } from "@static/svg/brand-icons"

import { signInPopup } from "/commons/firebase/authentication/signin-providers";
import { Dialogue } from "/components/elements/dia-logue.ts"
import { User, currentUser, Authorization } from "/commons/pubsub/store";
import { doesBrokerExist } from "/commons/firebase/firestore/get-post-data"

export class SignIn extends LitElement {
    @query('#signin-dialog')
    dialog: Dialogue

    @query("#try-again-dialog")
    tryAgainDialog: Dialogue

    private requestedAuthLevel: Authorization
    private returnedAuthLevel: Authorization | undefined

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
            padding: .5em;
		}
		svg {
			margin: .5em;
		}
    `

    render() {return html`
        <dia-logue .buttons=${["Cancel"]} id="signin-dialog">
            Select your authentication method:
            <menu-item disabled=true>
                ${emailIcon}
                Email
            </menu-item>

            <menu-item @click=${() => this.signIn('google')}>
                ${googleIcon}
                Google
            </menu-item>

            <menu-item disabled=true>
                ${appleIcon}
                Apple
            </menu-item>

            <menu-item disabled=true>
                ${facebookIcon}
                Facebook
            </menu-item>

            <p>Our <a href="/privacy-policy.html">Privacy Policy</a> and <a href="/tos.html">Terms Of Service</a></p>
        </dia-logue>

        <dia-logue id="try-again-dialog">
            <p>
                You did not sign in.<br>
                Do you want to try again to sign in?<br>
                If you cancel, you can not submit your form!
            </p>
        </dia-logue>

    `}
    async show(requestedAuthLevel: Authorization = "customer") {
        this.returnedAuthLevel = undefined
        this.requestedAuthLevel = requestedAuthLevel
        await this.dialog.show()
        return this.returnedAuthLevel
    }


    private async authorize (newUser: User) {
        const email = newUser.email
        const requestedAuthLevel = this.requestedAuthLevel
        if (requestedAuthLevel == "broker") {
            if (await doesBrokerExist(email)) {
                this.returnedAuthLevel = requestedAuthLevel
                newUser.authorization = this.returnedAuthLevel
                currentUser.pub(newUser)
            }
        } else if (requestedAuthLevel == "customer") {
            this.returnedAuthLevel = requestedAuthLevel
            newUser.authorization = this.returnedAuthLevel
            currentUser.pub(newUser)
        }
    }

    private async signIn(provider: string) {
        const newUser = await signInPopup(provider)
        if (!newUser) {
            const tryAgain = await this.tryAgainDialog.show()
            if (tryAgain == 'Cancel') {
                this.dialog.close()
            }
        } else {
            await this.authorize(newUser)
            this.dialog.close()
        }

    }
}
customElements.define('sign-in', SignIn)



