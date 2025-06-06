import { css, html, LitElement } from "lit";
import "../elements/rotating-words.ts";

class HeadShot extends LitElement {
	static properties = {
		name: { type: String },
		bio: { type: String },
		photo: { type: String },
		intro: { type: String },
		headline: { type: String },
		license: { type: String },
	};

	constructor() {
		super();
		this.name = "Ali Khosro";
		this.headline = html`
		<div>
		<h4>I help you finance your dream home with a mortgage that:</h4>
		
			<rotating-words>
		  <li> <img class="icon" src="/static/svg-icons/money-bag.svg"> Fits your budget for downpayment</li>
		  <li> <img class="icon" src="/static/svg-icons/dollar.svg"> You can afford its monthly payments</li>
		  <li> <img class="icon" src="/static/svg-icons/money-pig.svg"> Offers low interest rates </li>
		  <li> <img class="icon" src="/static/svg-icons/target.svg"> Meets your financial goals </li>
		</rotating-words>
		</div>
		`;

		this.intro = html`
<h2>Ali Khosro </h2>
<p><strong> <img src="/static/svg-icons/phone-handle.svg" class="icon"> 253-391-9808</strong></p>
<p> <img src="/static/svg-icons/email.svg" class="icon"> heydari@gmail.com</p>
<p> <img src="/static/svg-icons/certificate.svg" class="icon"> Licensed Mortgage Originator</p>
<p> <img src="/static/svg-icons/id-card.svg" class="icon"> NMLS ID #27134</p>



<p>`;

		this.bio = html`

  <p> <img src="/static/svg-icons/house.svg" class="icon"> All consultations are <strong>FREE</strong> – no obligations</p>
  <p> <img src="/static/svg-icons/house.svg" class="icon"> Master's degrees in Economics and Mathematics </p>
  <p> <img src="/static/svg-icons/house.svg" class="icon"> Licensed Mortgage Originator in Utah – NMLS #27134</p>
  <p> <img src="/static/svg-icons/house.svg" class="icon"> Know what you can afford before house hunting</p>
  <p> <img src="/static/svg-icons/house.svg" class="icon"> <strong>Get Pre-Approved Today!</strong></p>

`;
		this.photo = this.photo || "/static/images/people/headshot.jpg";
		this.license = "/static/images/people/ali-khosro-mlo-license-2.png";
	}

	render() {
		return html`
		<details>
		<summary>
		<div>
		<img id="headshot" src=${this.photo} alt=${this.name}>
		<p>${this.intro}</p>
		</div>
		</summary>
		${this.headline}
		<p>${this.bio}</p>
		<img id="license" src=${this.license} alt="${this.name} license">
		</details>
	`;
	}

	static styles = css`
		details {
			width: min(100%, 30em);
			display: flex;
			flex-direction: column;
			gap: 1em;
		}
		#headshot {
			border-radius: 2em;
			float: left;
			height: 12em;
			margin-right: 1em;
		}
		rotating-words {
			color: blue;
			font-size: 1.5em;
			font-family: fantasy;
		}
		#license {
			border: 7px ridge #538DD3;
			width: 100%;
		}
		.icon {
			height: 1.5em;
			vertical-align: bottom;
			margin-right: 1em;
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
		}
	`;
}
customElements.define("head-shot", HeadShot);
