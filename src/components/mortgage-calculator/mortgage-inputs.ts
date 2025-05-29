import { css, html, LitElement } from "lit";

import "./percent-absolute-input.ts";
import "./slider-number.ts";

export class MortgageInputs extends LitElement {
	static properties = {
		homePrice: { type: Number },
		downPayment: { type: [Number, Number] },
		interestRate: { type: Number },
		propertyTax: { type: Number },
		insurance: { type: Number },
		loanAmount: { type: Number },
	};

	static styles = css`
	label {
		width: 13em;
	}
	input[type="number"] {
		display: block;
		padding-left: 1.5em;
		width: 6em;
	}
	slider-number {
		width: 10em;
	}
	span {
		padding-left: 0.25em;
		position: absolute;
	}
	:host {
		display: flex;
		flex-wrap: wrap;
		gap: 2em;
	}
  `;

	get values() {
		const data: [string, string | number][] = [];

		this.shadowRoot?.querySelectorAll("[name]").forEach((el) => {
			data.push([el.getAttribute("name") || "", el.value]);
		});
		return data;
	}

	set values(values: [string, string | number][]) {
		const event = new Event("change", { bubbles: true }); // 'bubbles: true' is important for event propagation

		values.forEach(([name, value]) => {
			const el = this.shadowRoot?.querySelector(`[name="${name}"]`);
			if (el) {
				el.value = value;
				el.dispatchEvent(event);
			}
		});
	}

	render() {
		return html`

	  <label>
			Home Price
			<br/>
			<span> $ </span>

			<input
				size="10"
				type="number"
				name="homePrice"
				value=${this.homePrice}
				@change=${(e: InputEvent) =>
			this.homePrice = Number(e.target.value)}
				>
		</label>

		<label>
			Down Payment
			<br/>
			<percent-absolute-input
				name="downPayment"
				percent = "10"
				price=${this.homePrice}


			></percent-absolute-input>
		</label>

		<label>
			Mortgage Years
			<br/>
			<slider-number
				min="5"
				max="30"
				step="5"
				name="termYears"
				value=30
			>
			</slider-number>
		</label>




		<label>
			Interest Rate
			<br/>
			<span> % </span>
			<input
				type="number"
				name="interestRate"
				value=${this.interestRate}
				>
		</label>


	  <label>
			Homeowner Insurance
			<br/>
			<percent-absolute-input
				name="insurance"
				percent = "0.2"
				price=${this.homePrice}
			></percent-absolute-input>
		</label>

		<label>
			Property Tax
			<br/>
			<percent-absolute-input
				name="propertyTax"
				percent = "1"
				price=${this.homePrice}
			></percent-absolute-input>
		</label>

		<label>
			HOA
			<br/>
			<input
				type="number"
				name="HOA"
				value = "0"
			>
		</label>

		<label>
			PMI
			<br/>
			<percent-absolute-input
				name="PMI"
				percent = "0.2"
				price=${this.homePrice}
			></percent-absolute-input>
		</label>

		<label>
			Interest-Only Years
			<br/>
			<slider-number
				min="0"
				max="5"
				name="interestOnlyYears"
				value=0
			>
			</slider-number>
		</label>
    `;
	}
}
customElements.define("mortgage-inputs", MortgageInputs);
