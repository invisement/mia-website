import { css, html, LitElement } from "lit";

class AmortizationSummary extends LitElement {
	static styles = css`
		#legend {
			width: 20em;
			padding: 1em;
			background-color: white;
		}
	`;

	render() {
		return html`
			<div id="legend"></div>
	`;
	}

	addMonths(months) {
		const newDate = new Date();
		newDate.setMonth(newDate.getMonth() + months);
		return newDate;
	}

	draw(totalPrincipalsPaid, totalInterestsPaid) {
		const legendValues = [
			["Loan Amount", totalPrincipalsPaid.at(-1), "darkgreen"],
			["Total Interest Paid", totalInterestsPaid.at(-1), "red"],
			[
				"Total Cost of Loan",
				totalPrincipalsPaid.at(-1) + totalInterestsPaid.at(-1),
				"orange",
			],
			["Initial Interest Payment", totalInterestsPaid[0], "orange"],
			[
				"Payoff Date",
				this.addMonths(totalPrincipalsPaid.length).toDateString().slice(
					4,
				),
				"blue",
			],
		];

		const legendElement = this.renderRoot.getElementById("legend");
		const legend = document.createElement("legend-table");
		legend.legendValues = legendValues;

		legendElement.replaceChildren(legend);
	}
}
customElements.define("amortization-summary", AmortizationSummary);
