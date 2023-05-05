import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property, state, query } from 'lit/decorators.js'

import { post } from '/commons/firebase/firestore/post-questionnaire-data.ts';

import { currentUser, signInDialog } from '/commons/pubsub/store.ts';
import { gotoPage } from '/commons/pubsub/store.ts';
import {Dialogue} from "/components/elements/dia-logue.ts"

//const api_url = import.meta.env.VITE_API_BASE_URL
//const post_questionaire = "questionnaire/questionnaire-1"

//const url = `${api_url}/${post_questionaire}`

type QuestionAnswers = {
    [key: string]: string[]
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

    render() {return html`
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
            <p>
                You submitted your insurance form successfully!<br>
                Thank you for doing business with us.
            </p>
        </dia-logue>

        <dia-logue id="confirm">
            <p>
                You did not sign in.<br>
                Do you want to try again to sign in?<br>
                If you cancel, you can not submit your form!
            </p>
        </dia-logue>

	`}

    static styles = css`
        form {
            background-color: var(--primary-background);
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
            background-color: var(--accent-background);
            color: var(--accent-color);
            fill: var(--accent-color);
            padding: 1em 0;
			display: flex;
			justify-content: center;
            margin: 0;
        }
        footer > * {
            font-size: larger;
        }

	`
    async submit(e: Event) {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)


        const data: QuestionAnswers = {}
        for (const key of formData.keys()) {
            data[key] = formData.getAll(key)
        }

        // ask user to sign in until she is signed in or choosed to abort
        while (!currentUser.value.isSignedIn) {
            await signInDialog.show()
            if (currentUser.value.isSignedIn) {
                break;
            }
            if ((await this.confirm.show()) == "Cancel") {
                gotoPage("/")
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
