import { LitElement, css, html } from "lit";

import { loginIcon2, logoutIcon2} from "@static/svg/icons";
import '../top-menu/menu-item'
import './signin-dialog'
import { state, query } from "lit/decorators.js";
import { User, currentUser } from "/commons/pubsub/store";

const DEFAULT_NAME = 'Guest'

export class SigninMenuItems extends LitElement {
    @state()
    signedIn = false

    @query('sign-in')
    signInDialog: HTMLDialogElement

    subId: number
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

        <sign-in></sign-in>    
    `}

    connectedCallback(): void {
        super.connectedCallback()
        this.subId = currentUser.sub(this.changeUser)
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()
        currentUser.unsub(this.subId)
    }

    toggleSignIn() {
        if (this.signedIn) {
            currentUser.pub({isSignedIn: false})
        } else {
            this.signInDialog.show()
        }
    }

    changeUser = (user: User) => {
        this.signedIn = user.isSignedIn
//		this.photoURL = user.photoURL
        this.displayName = user?.displayName || "Guest"
    }

}
customElements.define('signin-menu-items', SigninMenuItems)
