import { css, html, LitElement } from "lit";

import { mortgageChips, otherChips } from "./chips-group.ts";
import "./chips-group.ts";

class HomePage extends LitElement {
	render() {
		return html`
		<h1>Mortgage</h1>
		<chips-group .chips=${mortgageChips}></chips-group>
		<h1>Tools</h1>
		<chips-group .chips=${otherChips}></chips-group>
		`;
	}

	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			gap: 2em;
			align-items: center;
		}

	`;
}
customElements.define("home-page", HomePage);
