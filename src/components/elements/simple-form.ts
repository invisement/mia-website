import { LitElement, TemplateResult, css, html } from "lit";
import { property, query, queryAll } from 'lit/decorators.js'

import { Dialogue } from "/components/elements/dia-logue.ts"
import { currentUser, signInDialog, notAuthorizedDialog, gotoPage } from "/commons/pubsub/store"
import { putDoc } from "/commons/firebase/firestore/get-post-data"

import { addIcon, removeIcon } from "@static/svg/icons";

export class SimpleForm extends LitElement {
    @property()
    name = "Untitled Form"

    @property()
    content: TemplateResult<1>

    @property()
    auth: Authorization = "guest"

    @property()
    page = "/"

    @query('form')
    form: HTMLFormElement;

    @query('#thank-you')
    thankYou: Dialogue;

    @query('#server-error')
    serverError: Dialogue;

    @queryAll('clone-me')
    cloneMeElements: NodeList

    connectedCallback() {
        super.connectedCallback()
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
            <form @submit=${this.submit}>
                <header>
                    ${this.name}
            </header>
                <main>
                    ${this.content}
                </main>

                <footer>
                    <button type="submit">Submit</button>
                    <button type="button"  @click=${() => gotoPage(this.page)}>Cancel</button>
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

        li {
			list-style-type: none;
		}

        textarea {
            width: 100%;
            height: 10em;
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
        input:invalid {
            box-shadow: var(--small-shadow);
        } 

        label {
            display: block;
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
    async submit(e: Event) {

        e.preventDefault()

        const formData = new FormData(this.form)
        const data = Object.fromEntries(formData);

        data["submitted time"] = (new Date()).toISOString()

        // make sure the user has customer authorization (signed in)
        if (this.auth != 'guest' && currentUser.getValue().authorization != this.auth) {
            const authLevel = await signInDialog.show(this.auth)
            if (authLevel != 'customer') {
                await notAuthorizedDialog.show()
                return
            }
        }

        //const userId = currentUser.getValue().email || "guest" + Math.random().toString(16).slice(2)

        //const documentPath = `/${userId}`
        const docRef = await putDoc(`${this.name.toLowerCase().replaceAll(" ", "-")}`, data)
        if (docRef) {
            await this.thankYou.show()
            gotoPage(this.page)
        } else {
            await this.serverError.show()
        }

    }
}
customElements.define('simple-form', SimpleForm)