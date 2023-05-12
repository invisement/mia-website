import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property, state, query } from 'lit/decorators.js'
import { successfulSubmission } from '@static/html-content/messages';

import { post } from '/commons/firebase/firestore/get-post-data.ts';

import { currentUser, gotoPage, notAuthorizedDialog, signInDialog } from '/commons/pubsub/store.ts';
import { Dialogue } from "/components/elements/dia-logue.ts"

//const api_url = import.meta.env.VITE_API_BASE_URL
//const post_questionaire = "questionnaire/questionnaire-1"

//const url = `${api_url}/${post_questionaire}`

type Value = string | Date | number | boolean

type QuestionAnswers = {
    [key: string]: Value[]
}


export class QuesTionnaire extends LitElement {
    @property()
    name = "";

    @state()
    src = () => `/questionnaires/${this.name}.html`

    @state()
    content = ""

    @query('form')
    form: HTMLFormElement;

    @query('#thank-you')
    thankYou: Dialogue;

    @query('#confirm')
    confirm: Dialogue;

    connectedCallback() {
        super.connectedCallback();

        ["", "/"].includes(this.src()) || fetch(this.src())
            .then(r => r.text())
            .then(doc => this.content = doc)
            .catch(() => {
                console.error("wrong input for questionnaire source");
            })
    }

    render() {
        return html`
        <card-board>
            <form @submit=${this.submit}>
                <main>
                    ${unsafeHTML(this.content)}
                </main>

                <footer>
                    <button type="submit">Submit form</button>
                </footer>
            </form>
        </card-board>
        <dia-logue id="thank-you" .buttons=${["OK"]}>
            ${successfulSubmission}
        </dia-logue>

	`}

    static styles = css`
        p:focus-within, li:focus-within {
            background-color: var(--accent-background);
            scroll-snap-align: start;
        }

        p:focus-within+p, li:focus-within+li {
            font-weight: bold;
        }

        /* TODO:for later when questionnaire is ready and firefox support of has is stable 
        li:has(input:valid) {
            //inactiv
        } 
         and use scroll-snap-align (create a scroller)
        
        */

        form {
            background-color: var(--primary-background);
            padding: 1em;
        }
		ul {
			list-style-type: none;
		}

		input[type="range"] {
			width: 80%;
			max-width: 300px;
		}


		ul {
			break-inside: avoid;
		}
		
		ol>li {
			break-after: avoid;
		}
        h1, footer {
            background-color: var(--highlight-background);
            color: var(--highlight-color);
            fill: var(--highlight-color);

            padding: 1em 0;
			display: flex;
			justify-content: center;
            margin: 0;
        }
        footer > * {
            font-size: larger;
        }

        h1 {
            font-size: large;
        }

	`
    async submit(e: Event) {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)


        const data: QuestionAnswers = {}
        for (const key of formData.keys()) {
            data[key] = formData.getAll(key)
        }

        data["submitted time"] = [new Date()]

        // make sure the user has customer authorization (signed in)
        if (currentUser.getValue().authorization != 'customer') {
            const authLevel = await signInDialog.show("customer")
            if (authLevel != 'customer') {
                await notAuthorizedDialog.show()
                return
            }
        }

        const documentPath = `/${currentUser.value.email}/questionnaires/${this.name}`
        post("users", documentPath, data)
            .then(async () => {
                await this.thankYou.show().then(console.log)
                gotoPage("/")
            })
            .catch(e => console.error("error", e))

    }
}
customElements.define('ques-tionnaire', QuesTionnaire)
