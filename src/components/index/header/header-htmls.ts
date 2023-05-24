import { html, TemplateResult } from "lit";
import { chatIcon, calendarIcon, phoneIcon, brokerIcon, doorIcon, settingIcon, dollarIcon, editIcon } from "@static/svg/icons";
import { currentUser, gotoPage, Authorization, signInDialog, signOutDialog } from "/commons/pubsub/store";

export const headerHtmls: {[key in Authorization]: (name: string | undefined) => TemplateResult<1>} = {
}


headerHtmls["guest"] = name => html`
    <ul>
        <li>
        <img @click=${() => gotoPage("/")} title="Home" src="/images/favicon.ico">
        </li>
        
        <li @click=${() => gotoPage("/feedback-form")} title="Feedback">
                Contact Us
        </li>
    </ul>

    <ul>
        <li>
        <button title="Broker Sign In" @click=${() => {
            //signInDialog.show("broker")
            // no need fo signin dialog because /broker-home is a restricted page
            gotoPage("/broker-home")
        }}>
            Become A Broker
        </button>
        </li>

        <li>
        <button class="reverse" title="User Sign In" @click=${() => signInDialog.show("customer")}>
            Log In
        </button>
        </li>
    </ul>
`


headerHtmls["customer"] = name => html`

    <ul>
    <li>
        <img @click=${() => gotoPage("/")} title="Home" src="/images/favicon.ico">
    </li>
    <li>
            Contact Us
    </li>
    

    </ul>

    <ul>
        <button>Claim</button>
        <button class="reverse">${name}</button>
        <li>
        <img title="Sign out" @click=${signOut} src="/illustrations/exit.svg">
        </li>
    </ul>
`

async function signOut () {
    const dialogButton = await signOutDialog.show()
    if (dialogButton == "OK") {
        currentUser.pub()
        gotoPage("/")
    }
} 

headerHtmls["broker"] = name => html`
    <ul>
    <menu-item @click=${() => gotoPage("/")}>
        <img src="/images/favicon.ico">
    </menu-item>

    <menu-item title="Broker Portal"  @click=${() => gotoPage("/broker-home")}>
        ${brokerIcon}
    </menu-item>
    <menu-item title="Edit">
        ${editIcon}
    </menu-item>


    </ul>
    
    <ul>
    <menu-item title="Celebrate">
        <img src="/illustrations/beer.svg">
    </menu-item>
    <menu-item title="Offer">
        <img src="/illustrations/bank-note.svg">        
    </menu-item>


    <menu-item title="Sign out" @click=${signOut}>
        <img src="/illustrations/exit.svg">
    </menu-item>
</ul>
`

