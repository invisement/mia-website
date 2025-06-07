import { css, html, LitElement } from "lit";

class RotatingWords extends LitElement {
	static properties = {
		word: { type: String },
		speed: { type: Number },
	};

	async connectedCallback() {
		super.connectedCallback();

		await this.updateComplete;
		this.span = this.shadowRoot.querySelector("span");

		this.changeLetters();
	}
	changeLetters = () => {
		let index = 0;
		let char = "";
		let word = " ";

		// grap words from <li> elements
		const words = [...this.querySelectorAll("li")]
			.map((li) => li.textContent.trim() + "‎".repeat(30) + "\n")
			.join(""); // added no-space char for delay between words

		const speed = this.speed || 100;

		setInterval(() => {
			char = words[index];
			if (!char) {
				index = 0;
				return;
			}
			word = char == "\n" ? " " : word + char;
			this.span.textContent = word;
			index++;
		}, speed);
	};

	render() {
		return html`
			<span></span>_
			`;
	}

	static styles = css`
		span{
			color: blue;
			font-size: 2em;
			font-family: cursive;
			text-shadow: 0px 5px 1px orange;
		}
	
	`;
}
customElements.define("rotating-words", RotatingWords);
