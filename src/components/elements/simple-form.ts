import { LitElement, TemplateResult, css, html } from "lit";
import { property, query } from 'lit/decorators.js'

import { Dialogue } from "/components/elements/dia-logue.ts"
import {currentUser, signInDialog, notAuthorizedDialog, gotoPage} from "/commons/pubsub/store"
import {putDoc} from "/commons/firebase/firestore/get-post-data"

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

    render () {return html`
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
        form {
            margin: 1em;
            box-shadow: var(--small-shadow);
            background-color: var(--primary-background);

        }
        main {
            padding: 0 1em;
        }

        ul {
			list-style-type: none;
		}

        textarea {
            width: 100%;
            height: 10em;
        }

        input {
            max-width: 45%;
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
            box-shadow: var(--small-shadow);
        } 
        
        div:focus-within {
            font-weight: bold;
        }

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