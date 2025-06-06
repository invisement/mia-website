import { html, LitElement } from "lit";

class ErrorPage extends LitElement {
	render() {
		return html`
			<h1>404 Error! No page for your address was found!</h1>
		`;
	}
}

customElements.define("error-page", ErrorPage);
