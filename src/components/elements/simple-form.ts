/* How to use
<simple-form 
    src="questionnaires/auto-insurance-questionnaire"
    auth="guest" 
    afterPage="/"
>
</simple-form>

*/

const miaReceiverEmail = "Mia.InfoAndHelp@gmail.com"


import { LitElement, TemplateResult, css, html } from "lit";
import { property, state, query, queryAll } from 'lit/decorators.js'

import { Dialogue } from "/components/elements/dia-logue.ts"
import { currentUser, signInDialog, notAuthorizedDialog, gotoPage } from "/commons/pubsub/store"
import { putDoc } from "/commons/firebase/firestore/get-post-data"

import { addIcon, removeIcon } from "@static/svg/icons";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export class SimpleForm extends LitElement {
    @property()
    src: string

    @property()
    auth: Authorization = "guest"

    @property()
    afterPage = "/"


    @state()
    content: TemplateResult<1>

    private collection: string;
    private name: string;

    @query('form')
    form: HTMLFormElement;

    @query('#thank-you')
    thankYou: Dialogue;

    @query('#server-error')
    serverError: Dialogue;

    @query('#invalid-input-alert')
    invalidInputAlert: Dialogue;

    @queryAll('clone-me')
    cloneMeElements: NodeList

    async connectedCallback() {
        super.connectedCallback()

        // fetch src html and set name and target and content
        this.content = unsafeHTML(await fetch(`${this.src}.html`).then(r => r.text()))
        this.collection = this.src.split("/").at(-1)
        this.name = this.collection.replaceAll("-", " ")

        this.addMore()
    }

    async addMore() {
        const addIcon = (el: Element, originalEl: Element) => {
            const add = document.createElement("span")
            add.innerText = "+"
            add.classList.add("add-icon")
            el.append(add)

            add.addEventListener("click", e => {
                e.preventDefault()
                const cloned = originalEl.cloneNode(true)
                addIcon(cloned, originalEl)
                removeIcon(cloned)
                el.after(cloned)
            })
        }

        const removeIcon = (el: Element) => {
            const remove = document.createElement("span")
            remove.innerText = "×"
            remove.classList.add("remove-icon")
            el.prepend(remove)

            remove.addEventListener("click", e => {
                e.preventDefault()
                el.remove()
            })
        }

        await this.updateComplete
        // add two icons: add and remove

        this.cloneMeElements.forEach(el => {
            const originalEl = el.cloneNode(true)
            addIcon(el, originalEl)
        })
    }

    render() {
        return html`
            <form>
                <header>
                    ${this.name}
            </header>
                <main>
                    ${this.content}
                </main>

                <footer>
                    <button type="submit" @click=${this.submit}>Submit</button>
                    <button type="button"  @click=${() => gotoPage(this.afterPage)}>Cancel</button>
                </footer>
            </form> 
        <dia-logue id="thank-you" .buttons=${["OK"]}>
            <h3>Form Submitted Successfully</h3>
            <p>We appropriate your business!</p>
        </dia-logue>

        <dia-logue id="server-error" .buttons=${["OK"]}>
            <h3>Error 500</h3>
            <p>It's not you it's us! Try later maybe!</p>
        </dia-logue>

        <dia-logue id="invalid-input-alert" .buttons=${["OK"]}>
            <h3>Invalid Input Fields</h3>
            <p>Please review all highlighted input fields and enter valid inputs.</p>
        </dia-logue>

    `}

    static styles = css`
        .row {
            display: flex;
            gap: .25em;
        }
        .row > input:last-of-type {
            flex-grow: 1;
        }
        
        .add-icon, .remove-icon {
            font-size: 2em;
            color: var(--accent-color);
            background-color: var(--accent-background);
            font-weight: bold;
            display: inline-block;
            cursor: pointer;
        }
        .add-icon {
            position: absolute;
            bottom: -.5em;
            left: 1em;
        }
        .remove-icon {
            position: absolute;
            top: 0;
            right: 0;
        }
        clone-me {
            position: relative;
            display: block;
            box-shadow: var(--outset);
            padding: 1em 1em 1em 1em;
        }

        form {
            margin: 1em;
            box-shadow: var(--small-shadow);
            background-color: var(--primary-background);
            line-height: 2em;

        }
        main {
            padding: 0 1em;
        }
        label {
            margin-top: 1em;
        }

        li {
			list-style-type: none;
		}

        textarea {
            width: 100%;
            height: 10em;
        }

        header {
            text-transform: capitalize;
        }

        header, footer {
            background-color: var(--highlight-background);
            color: var(--highlight-color);
            fill: var(--highlight-color);

            padding: 1em 0;
			display: flex;
			justify-content: center;
            margin: 0;
            font-size: larger;
            font-weight: bold;
        }
        footer > button {
            font-size: inherit;
            margin: 0 1em;
        }

        :invalid {
            box-shadow: 0 0 0px 1px var(--warning-color);
        } 

        details:not(:has(:invalid)) > summary:after {
            content: " 🗹";
        }

        label {
            display: block;
        }

        details {
            box-shadow: var(--big-shadow);
            margin: 0em -1em;
            padding: 1em;
        }

        details > summary {
            list-style-type: '📕  ';
            font-size: large;
            cursor: pointer;
        }

        details[open] > summary {
            list-style-type: '📖  ';
        }
        
        input[type="radio"]:not(:checked) ~ * {
            display: none;
        }

        /*TODO: for when we want to add animation or similar to each div of the form (show one by one)
        div:focus-within {
            box-shadow: var(--outset);
        }
        */

    `

    checkValidityForVisibleInputs() {
        const hiddenElements: HTMLElement[] = []

        const invalids =
            Array.from(this.form.querySelectorAll(":invalid"))
                .filter(input => {
                    const isHidden = (input.offsetParent === null)
                    if (isHidden) {
                        hiddenElements.push(input)
                    }

                    return !isHidden
                })
        
        if (invalids.length == 0) {// there is no invalid

            // remove all hidden elements so they do not send data
            hiddenElements.forEach(el => el.disabled = true)
            return true
        }

        return false
    }

    emailMessage = () => `
        <h3>Dear ${currentUser.displayName || "User"}</h3>
        <p>Your ${this.name} was successfully submitted at <a href="https://mia.invisement.com">MIA</a> and we will be in touch with you very soon.
        </p>

        <p>
        If you would like to leave a message or feedback, please visit:<br>
        <a href="https://mia.invisement.com/feedback-form">https://mia.invisement.com/feedback-form</a>
        </p>
        <p>If you would like to contact us:</p>
        <ul>
            <li>📞 Tel: <a href="tel:201-916-5068">201-916-5068</a></li>
            <li>📧 Email: <a href="mailto: Mia.InfoAndHelp@gmail.com">Mia.InfoAndHelp@gmail.com</a></li>
            <li>📝 Message: <a href="/feedback-form">Leave us a message</a> </li>
        </ul>
        We appreciate your business.
    `

    async sendEmail (data = {}) {
        if (this.name=="feedback form") {
            data["email"] = miaReceiverEmail
            data["message"] = JSON.stringify(Object.fromEntries(new FormData(this.form).entries()), null, 4)
        }

        const url = "https://api.mia.invisement.com/send-email"
        //const url = "http://127.0.0.1:8000/send-email"
        const response = await fetch(url, {
            method: "POST", 
            mode: "cors",
            cache: "no-cache", 
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            referrerPolicy: "no-referrer",               
            body: JSON.stringify(data),
        });
    }

    async submit(e: Event) {

        e.preventDefault()

        this.form.querySelectorAll("details").forEach(el => el.open = true)

        // make sure the user has customer authorization (signed in)
        if (this.auth != 'guest' && currentUser.getValue().authorization != this.auth) {
            const authLevel = await signInDialog.show(this.auth)
            if (authLevel != 'customer') {
                await notAuthorizedDialog.show()
                return
            }
        }


        if (!this.checkValidityForVisibleInputs()) {
            this.form.reportValidity()
            this.invalidInputAlert.show()
            return
        }

        const formData = new FormData(this.form)
        const data = Object.fromEntries(formData);

        //const userId = currentUser.getValue().email || "guest" + Math.random().toString(16).slice(2)

        // extra info for each submission
        data["submitted time"] = (new Date()).toISOString()
        data["signedUserEmail"] = currentUser.email || ""
        data["signedUserId"] = currentUser.userId || ""

        //const documentPath = `/${userId}`
        const docRef = await putDoc(this.collection, data)
        if (docRef) {
            await this.thankYou.show()
            gotoPage(this.afterPage)
            
            this.sendEmail({"email": currentUser.email, "message": this.emailMessage()}).catch(console.error)
        } else {
            await this.serverError.show()
        }

    }
}
customElements.define('simple-form', SimpleForm)
