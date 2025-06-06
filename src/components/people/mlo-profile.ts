import { html, LitElement } from "lit";
import "./head-shot.ts";
import "../mortgage-calculator/mortgage-calculator.ts";

class MLOProfile extends LitElement {
	render() {
		return html`
		<head-shot
			photo="/static/images/people/ali-khosro-lili.jpg"
		></head-shot>
		<mortgage-calculator></mortgage-calculator>
		`;
	}
}
customElements.define("mlo-profile", MLOProfile);
