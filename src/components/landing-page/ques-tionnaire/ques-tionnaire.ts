//import { LitElement, css, html } from "lit";
import {LitElement, html, css} from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {property, state, query} from 'lit/decorators.js'
import { marked } from 'marked';

marked.setOptions({
	breaks: true,
})

export class QuesTionnaire extends LitElement {
	@property()
	src = ""

	@state()
	content = ""

	@query('form')
	form: HTMLFormElement;

	submit() {
		// TODO: later
		console.log("here")
		return false
	}
    

	connectedCallback() {
		super.connectedCallback()
		this.parse()
	}

	async parse() {
		var md = await fetch(this.src).then(r => r.text())

		var doc = marked.parse(md)

		var level = 0
		var question = 0
		var name = "q"
		var answer = 1
		const metaData = {}

		doc = doc.split('\n').map(line => {
			if (line == '<ol>' || line == '<ul>') {
				level++
			} else if (line == '</ol>' || line == '</ul>') {
				level--
			} else if ((level == 1 && line.startsWith('<li>')) || (level == 0 && line.startsWith('<p>'))) {
				question++
				name = 'q' + question
				answer = 0
				metaData[name] = {question: line, answers: []}
			} else if (line.startsWith('<li>')) {
				answer++
				metaData[name]['answers'].push(line)

				if (!line.startsWith('<li><input') && level <= 2) {
					line = line.replace('<li>', '<li><input type="radio">')
				}
				// TODO: add dropbox either by ol or level>2
			}

			line = line
				.replace('<input', `<input name=${name}`)
				.replace('type="checkbox"', `type="checkbox" value=${answer}`)
				.replace('type="radio"', `type="radio" value=${answer}`)
				.replace('disabled=""', '')

			if (level == 2) {
				line = line
					.replace('<li>', '<li><label>')
					.replace('</li>', '</label></li>')
			}
		
			return line

		}).join('\n')

		// TODO: save metadata in backend to analyze data gathering
		console.log(JSON.stringify(metaData))

		this.content = doc

	}

	render() {
		return html`
		<form action="/questionnaire/q1">
			<main>
				${unsafeHTML(this.content)}
			</main>

			<footer>
				<button type="submit">Submit form</button>
			</footer>
		<form>
	`}

	static styles = css`
		h1 {
			text-align: center;
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

}
customElements.define('ques-tionnaire', QuesTionnaire)


