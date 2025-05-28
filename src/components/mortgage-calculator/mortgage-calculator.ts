import { css, html, LitElement } from "lit";
import "./mortgage-inputs.ts";
import "./mortgage-pie-chart.ts";
import "./amortization-bar-chart.ts";
import "./amortization-summary.ts";

import {
	calculateMonthlyPayment,
	cumulativeDataSeries,
} from "./calculateMortgage.ts";

class MortgageCalculator extends LitElement {
	static styles = css`
	:host {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2em;
	}
	output, fieldset {
		display: flex; 
		flex-wrap: wrap; 
		gap: 2em; 
		align-items: center; 
		justify-content: center;
	}
	
	footer {
		display: flex;
		justify-content: center;
		gap: 1em;
	}
	button {
		font: inherit;
	}

	.hidden {
		display: none;
	}


	amortization-bar-chart{
		width: 100%;
		max-height: 30em;
	}


	
	`;

	submit() {
		this.shadowRoot?.querySelector("output")?.classList.remove("hidden");

		const values = Object.fromEntries(
			this.shadowRoot?.querySelector("mortgage-inputs")?.values,
		);
		const loanAmount = values["homePrice"] - values["downPayment"][1];
		const termYears = values["termYears"] - values["interestOnlyYears"];
		const interestOnlyYears = values["interestOnlyYears"];

		const interestRate = values["interestRate"] / 100;
		const propertyTax = values["propertyTax"][1] / 12;
		const insurance = values["insurance"][1] / 12;
		const HOA = values["HOA"];
		const PMI = values["PMI"][1] / 12;

		const loanPayment = calculateMonthlyPayment(
			loanAmount,
			interestRate,
			termYears,
		);

		const initialInterest = loanAmount * interestRate / 12;
		const initialPricipal = loanPayment - initialInterest;

		this.shadowRoot?.querySelector("mortgage-pie-chart")?.draw({
			loanPayment,
			insurance,
			propertyTax,
			HOA,
			PMI,
		});

		const {
			months,
			totalPrincipalsPaid,
			totalInterestsPaid,
			remainingBalance,
		} = cumulativeDataSeries(
			loanAmount,
			interestRate,
			termYears,
			interestOnlyYears,
		);

		this.shadowRoot?.querySelector("amortization-summary")?.draw(
			totalPrincipalsPaid,
			totalInterestsPaid,
		);

		this.shadowRoot?.querySelector("amortization-bar-chart")?.draw(
			months,
			totalPrincipalsPaid,
			totalInterestsPaid,
			remainingBalance,
		);
	}

	reset(defaultValues: Record<string, number | [number, number]> = {}) {
		const inputData = {
			homePrice: 700_000,
			downPayment: [10, undefined],
			termYears: 30,
			interestRate: 7.0,
			propertyTax: [0.5, undefined],
			insurance: [0.3, undefined],
			interestOnlyYears: 0,
			PMI: [0.2, undefined],
			HOA: 0,
			...defaultValues,
		};

		const inputs = this.shadowRoot?.querySelector("mortgage-inputs");
		inputs.values = Object.entries(inputData);

		this.shadowRoot?.querySelector("output")?.classList.add("hidden");
	}

	render() {
		return html`
			<fieldset>
				<legend>Mortgage Inputs</legend>
			<mortgage-inputs></mortgage-inputs>

			<footer>
				<button @click=${this.submit}>Calculate</button>
				<button @click=${this.reset}>Reset</button>
			</footer>
			</fieldset>

			<output class="hidden">
				<mortgage-pie-chart></mortgage-pie-chart>
				<amortization-summary></amortization-summary>
				<amortization-bar-chart></amortization-bar-chart>
			</output>

		`;
	}
}
customElements.define("mortgage-calculator", MortgageCalculator);
