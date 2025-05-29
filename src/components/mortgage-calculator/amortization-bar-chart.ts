import { css, html, LitElement } from "https://esm.sh/lit@latest";
import Chart from "https://esm.sh/chart.js@4.4.1/auto";
Chart.defaults.font.size = 12;

import "./legend-table.ts";

export class AmmortizationBarChart extends LitElement {
	chart: typeof Chart;

	static styles = css`
		:host {
			display: flex;
			justify-content: center;
			height: 30em;
			max-width: 100%;
		}
		canvas {
			background-color: white;
		}
	`;

	render() {
		return html`
				<canvas id="chart"></canvas>
		`;
	}

	draw(
		months: string[],
		totalPrincipalsPaid: number[],
		totalInterestsPaid: number[],
		remainingBalance: number[],
	) {
		const canvas = this.renderRoot.getElementById("chart");

		const data = {
			labels: months,
			datasets: [
				{
					label: "Principal",
					data: totalPrincipalsPaid,
					borderColor: "#000000",
					backgroundColor: "rgba(0, 0, 0, 0.2)",

					stack: "payment",
					pointStyle: false,
					fill: true,
				},
				{
					label: "Interest",
					data: totalInterestsPaid,
					borderColor: "#ff0000",
					backgroundColor: "rgba(255, 0, 0, 0.2)",

					stack: "payment",
					pointStyle: false,
					fill: true,
				},
				{
					label: "Balance",
					data: remainingBalance,
					borderColor: "#0000ff",
					backgroundColor: "rgba(0, 0, 255, 0.2)",

					pointStyle: false,
					stack: "balance",
					fill: true,
				},
			],
		};

		if (this.chart) {
			this.chart.destroy();
		}

		this.chart = new Chart(canvas, {
			type: "line",
			data,
			options: {
				plugins: {
					title: {
						display: true,
						text: "Cumulative Paid and Remaining Balance",
					},
				},
				responsive: true,
				maintainAspectRatio: false,

				interaction: {
					intersect: false,
				},
				scales: {
					x: {
						stacked: true,
					},
					y: {
						stacked: true,
						ticks: {
							// Include a dollar sign in the ticks
							callback: function (value, index, ticks) {
								return "$" + parseInt(value / 1000) + "k";
							},
							font: {
								size: 10,
							},
						},
					},
				},
			},
		});
	}
}

customElements.define("amortization-bar-chart", AmmortizationBarChart);
