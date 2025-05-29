import { css, html, LitElement } from "https://esm.sh/lit@latest";
import Chart from "https://esm.sh/chart.js@4.4.1/auto";
import "./legend-table.ts";

export class ChartElement extends LitElement {
	chart: typeof Chart;

	static styles = css`
		:host {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 22em;
		}
		#legend {
			position: absolute;
			padding: 1em;
			font-size: smaller;
		}
		canvas {
			display: grid;
			grid-template-columns: auto auto;
			height: auto;
		}
	
	`;
	render() {
		return html`
				<canvas id="chart"></canvas>
				<div id="legend"></div>
		`;
	}

	toTitleCase(str) {
		const result = str.replace(/([A-Z])/g, " $1");
		const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
		return finalResult;
	}

	draw(keyValues) {
		const canvas = this.renderRoot.getElementById("chart");
		const legendElement = this.renderRoot.getElementById("legend");

		const colors = [
			"#FF6384",
			"#36A2EB",
			"#FFCE56",
			"#4BC0C0",
			"#9966CC",
			"#FF9F40",
		]; // Example colors, Chart.js provides colors automatically

		const labels = Object.keys(keyValues).map(this.toTitleCase);
		const data = Object.values(keyValues);

		if (this.chart) {
			this.chart.destroy();
		}

		this.chart = new Chart(canvas, {
			type: "doughnut",
			data: {
				labels,
				datasets: [{
					data,
					backgroundColor: colors,
					hoverOffset: 4,
				}],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false, // Hide default legend
					},
				},
				cutout: "80%",
			},
		});

		const legend = document.createElement("legend-table");

		const legendValues = labels.map((
			label,
			index,
		) => [label, parseInt(data[index]), colors[index]]);
		legendValues.push([
			"Total",
			parseInt(data.reduce((a, b) => a + b, 0)),
			"#000000",
		]);

		legend.legendValues = legendValues.filter((value) => value[1] > 0);
		legendElement.replaceChildren(legend);
	}
}

customElements.define("mortgage-pie-chart", ChartElement);
