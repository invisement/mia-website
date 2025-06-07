import { css, html, LitElement } from "lit";
import "./mlo-profile.ts";
import "../mortgage-calculator/mortgage-calculator.ts";

class MortgageHome extends LitElement {
	async connectedCallback() {
		super.connectedCallback();
		await this.updateComplete;

		if (window.screen.width < 750) {
			this.shadowRoot.querySelector("mlo-profile")?.setAttribute(
				"collapse",
				"true",
			);
		}
	}
	render() {
		return html`
		<div id="left">
		<mlo-profile
			profile="ali-khosro"
		></mlo-profile>
		</div>
		<div id="right">
		<mortgage-calculator></mortgage-calculator>
		</div>
		`;
	}

	static styles = css`
		:host {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: .5em;
		}
		#left {
			width: min(100%, 30em);
		}
		#right {
			flex: 1;
			min-width: 50vw;
		} 

	
	`;
}
customElements.define("mortgage-home", MortgageHome);
