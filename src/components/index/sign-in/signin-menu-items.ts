import { LitElement, css, html } from "lit";
import { state } from "lit/decorators.js";

import { loginIcon2, logoutIcon2} from "@static/svg/icons";
import { currentUser } from "/commons/pubsub/store";

import { signInDialog, signOutDialog } from "/commons/pubsub/store.ts";

const DEFAULT_NAME = 'Guest'

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
            ${this.signedIn? logoutIcon2 : loginIcon2}
			<span>${this.displayName.split(" ")[0]}</span>
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
        this.displayName = currentUser.value?.displayName || "Guest"
    }

}
customElements.define('signin-menu-items', SigninMenuItems)
