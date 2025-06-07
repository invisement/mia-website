// give the profile (that reads from data/people) through attribute or through url:
// <mlo-profile open profile="ali-khosro"></mlo-profile>
// GET /mlo-profile?profile=ali-khosro

import { css, html, LitElement } from "lit";
import "../elements/rotating-words.ts";
import { unsafeHTML } from "lit/directives/unsafe-html.js"; // Import unsafeHTML
import { classMap } from "lit/directives/class-map.js";

import { mortgageChips } from "../../../ui/chips-group.ts";
import "../../../ui/chips-group.ts";

type Profile = {
	name: string;
	bio: string;
	photo: string;
	intro: string;
	headline: string;
	license: string;
};

class MLOProfile extends LitElement {
	static properties = {
		collapse: { type: Boolean },
		profile: { type: String },
	};

	data: Profile = {};

	override async connectedCallback() {
		super.connectedCallback();

		if (!this.profile) {
			const urlParams = new URLSearchParams(globalThis.location.search);

			// Get a specific parameter
			this.profile = urlParams.get("profile") || "";
		}

		this.data = (await import(`/data/people/${this.profile}.js`)).profile;

		this.requestUpdate();
	}

	toggle = () => {
		this.collapse = !this.collapse;
	};

	render() {
		const classes = {
			collapsed: this.collapse, // 'collapsed' class will be applied if this.open is true
		};

		return html`
		<div @click=${this.toggle}>
		<img id="headshot" src=${this.data.photo} alt=${this.data.name}>
		<div>${unsafeHTML(this.data.intro)}</div>
		</div>
		<div id="headline"  class=${classMap(classes)} >${
			unsafeHTML(this.data.headline)
		}</div>
		<div class=${classMap(classes)}>${unsafeHTML(this.data.bio)}</div>
		<img class=${
			classMap(classes)
		} id="license" src=${this.data.license} alt="${this.data.name} license">

		<chips-group .chips=${mortgageChips}></chips-group>
	`;
	}

	static styles = css`
		:host {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			row-gap: 2em;
			column-gap: 1em;
			padding-bottom: 2em;
		}
		:host > * {
			width: min(30em, 100%);
			display: inline-block;
			box-sizing: border-box;
			box-shadow: 7px 5px 4px lightgrey;
		}
		#headline {
			padding: 1em 0 2em 1em;
		}
		#headshot {
			border-radius: 2em;
			float: left;
			height: 15em;
			margin-right: 1em;

		}
		rotating-words {
			font-size: 0.9em;
		}
		#license {
			border: 7px ridge #538DD3;
			box-sizing: border-box;
		}
		.icon {
			height: 1.5em;
			vertical-align: bottom;
			margin-right: 1em;
		}

		.collapsed {
			display: none;
		}

		li {
			list-style: none;
		}
		ul {
			margin: 0;
			line-height: 1.5em;
		}

		strong {
			color: blue;
		}
		summary {
			display: inline;
			margin: 0;
			padding: 0;
		}
	`;
}
customElements.define("mlo-profile", MLOProfile);
