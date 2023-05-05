//import { LitElement, css, html } from "lit";
import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property, state, query } from 'lit/decorators.js'

import { post } from '/commons/firebase/firestore/post-questionnaire-data.ts';
import { upload } from '/commons/firebase/storage/post-questionnaire-file.ts';

import { currentUser, signInDialog } from '/commons/pubsub/store.ts';
import { gotoPage } from '/commons/pubsub/store.ts';

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
    async submit(e) {
        console.log

        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data: QuestionAnswers = {}
        for (const key of formData.keys()) {
            data[key] = formData.getAll(key)
        }

/*
        // ask user to sign in until she is signed in or choosed to abort
        while (!currentUser.value.isSignedIn) {
            //dispatchEvent(new Event("signin"))
            await signInDialog.show()
            if (currentUser.value.isSignedIn) {
                break;
            }
            if (!confirm(
                `You did not sign in.\n
                Do you want to try again to sign in?\n
                If you choose cancel, you can not submit you form!`
            )) {
                gotoPage("/")
                return
            }
        }
*/
        const documentPath = `/${currentUser.value.email}/questionnaires/${this.name}`
        post("users", documentPath, data)
        .then(e => {
            alert("You submitted your insurance form successfully! \nThank you for doing business with us.")
            //gotoPage("/")
        })
        .catch(e => console.error("error", e))

    }
}
customElements.define('ques-tionnaire', QuesTionnaire)


