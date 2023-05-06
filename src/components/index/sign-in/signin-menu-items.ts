import { LitElement, css, html } from "lit";
import { state } from "lit/decorators.js";

import { loginIcon2, logoutIcon2} from "@static/svg/icons";
import { currentUser } from "/commons/pubsub/store";

import { signInDialog, signOutDialog } from "/commons/pubsub/store.ts";

const DEFAULT_NAME = 'SignIn'

export class SigninMenuItems extends LitElement {
    @state()
    signedIn = false


    displayName = DEFAULT_NAME

	static styles = css`
		menu-item {
			width: 5em;
		}
	`

    render() {return html`
        <menu-item @click=${this.toggleSignIn} title=${this.signedIn? "Sign Out" : "Sign In"}>
            <span>${this.displayName.split(" ")[0]}</span>
            ${this.signedIn? html`<img src="/illustrations/exit.svg">` : html`<img src="/illustrations/door.svg">`}
        </menu-item>
    `}

    async toggleSignIn() {
        if (this.signedIn) {
            if ((await signOutDialog.show()) == "OK") {
                currentUser.pub({isSignedIn: false})
                this.changeUser()            
            }
        } else {
            console.log(signInDialog)
            await signInDialog.show()
            this.changeUser()
        }
    }

    changeUser = () => {
        this.signedIn = currentUser.value.isSignedIn
        this.displayName = currentUser.value?.displayName || DEFAULT_NAME
    }

}
customElements.define('signin-menu-items', SigninMenuItems)
