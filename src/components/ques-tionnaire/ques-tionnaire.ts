//import { LitElement, css, html } from "lit";
import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property, state, query } from 'lit/decorators.js'

import { post } from '/commons/firebase/firestore/post-questionnaire-data.ts';

const api_url = import.meta.env.VITE_API_BASE_URL
const post_questionaire = "questionnaire/questionnaire-1"

const url = `${api_url}/${post_questionaire}`

type QuestionAnswers = {
    [key: string]: string[]
}

export class QuesTionnaire extends LitElement {
    @property()
    src = "/default"

    @state()
    content = ""

    @query('form')
    form: HTMLFormElement;

    connectedCallback() {
        super.connectedCallback();
        
        ["", "/"].includes(this.src) || fetch(this.src)
            .then(r => r.text())
            .then(doc => this.content = doc)
            .catch(() => {
                console.error("wrong input for questionnaire source");
            })
    }

    render() {
        return html`
		<form @submit=${this.submit}>
			<main>
				${unsafeHTML(this.content)}
			</main>

			<footer>
				<button type="submit">Submit form</button>
			</footer>
		<form>
	`}

    static styles = css`
        form {
            background-color: var(--primary-background);
        }
		h1 {
            margin: 0;
			text-align: center;
            padding: 1em;
		}
		ul {
			list-style-type: none;
		}

		input[type="range"] {
			width: 80%;
			max-width: 300px;
		}

		footer {
			position: sticky;
			bottom: 0;
			padding: .5em;
			display: flex;
			justify-content: center;
			background-color: var(--accent-background);
			color: var(--highlight-color);
		}

		ul {
			break-inside: avoid;
		}
		
		ol>li {
			break-after: avoid;
		}
	`
    async submit(e) {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        const data: QuestionAnswers = {}
        for (const key of formData.keys()) {
            data[key] = formData.getAll(key)
        }

        post("questionnaire-1", "heydari@gmail.com", data)
        .then(console.log)

    }
}
customElements.define('ques-tionnaire', QuesTionnaire)


