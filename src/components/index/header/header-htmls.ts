import { html, TemplateResult } from "lit";
import { chatIcon, calendarIcon, phoneIcon, brokerIcon, doorIcon, settingIcon, dollarIcon, editIcon } from "@static/svg/icons";
import { currentUser, gotoPage, Authorization, signInDialog, signOutDialog } from "/commons/pubsub/store";

export const headerHtmls: {[key in Authorization]: (name: string | undefined) => TemplateResult<1>} = {
}


headerHtmls["guest"] = name => html`
    <menu-item @click=${() => gotoPage("/")} title="Home">
        <img src="/images/favicon.ico">
    </menu-item>

    <menu-item @click=${() => gotoPage("/feedback-form")} title="Feedback">
        ${chatIcon}
    </menu-item>

    <menu-item title="Contact Us" @click=${() => gotoPage("/about-us")}>
        ${phoneIcon}
    </menu-item>

    <menu-item title="Schedule">
        ${calendarIcon}
    </menu-item>

    <menu-item title="Broker Sign In" @click=${() => {
        //signInDialog.show("broker")
        // no need fo signin dialog because /broker-home is a restricted page
        gotoPage("/broker-home")
    }}>
        ${brokerIcon}
        <mark>Broker Login</mark>
    </menu-item>

    <menu-item title="User Sign In" @click=${() => signInDialog.show("customer")}>
        ${doorIcon}
        <mark>Customer Login</mark>
    </menu-item>
`


headerHtmls["customer"] = name => html`
    <menu-item @click=${() => gotoPage("/")}>
        <img src="/images/favicon.ico">
    </menu-item>

    <menu-item title="Support" @click=${() => gotoPage("/feedback-form")}>
        ${chatIcon}
    </menu-item>
    
    <menu-item title="Setting">
        ${settingIcon}
    </menu-item>
    
    <menu-item title="Claim">
        ${dollarIcon}
    </menu-item>

    <menu-item title="Edit">
        ${editIcon}
    </menu-item>

    <menu-item title="Sign out" @click=${signOut}>
        <img src="/illustrations/exit.svg">
        <mark>${name}</mark>
    </menu-item>
`

async function signOut () {
    const dialogButton = await signOutDialog.show()
    if (dialogButton == "OK") {
        currentUser.pub()
        gotoPage("/")
    }
} 

headerHtmls["broker"] = name => html`
    <menu-item @click=${() => gotoPage("/")}>
        <img src="/images/favicon.ico">
    </menu-item>

    <menu-item title="Broker Portal"  @click=${() => gotoPage("/broker-home")}>
        ${brokerIcon}
    </menu-item>


    <menu-item title="Celebrate">
        <img src="/illustrations/beer.svg">
    </menu-item>
    
    <menu-item title="profile">
        <img src="/illustrations/profile-female.svg">
    </menu-item>
    
    <menu-item title="Offer">
        <img src="/illustrations/bank-note.svg">        
    </menu-item>

    <menu-item title="Edit">
        ${editIcon}
    </menu-item>

    <menu-item title="Sign out" @click=${signOut}>
        <img src="/illustrations/exit.svg">
        <mark>${name}</mark>
    </menu-item>
`

