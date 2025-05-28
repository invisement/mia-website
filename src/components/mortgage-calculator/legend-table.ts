import { css, html, LitElement } from "lit";

export class LegendTable extends LitElement {
	legendValues: [string, number | string | Date, string][] = [];

	render() {
		console.log(this.legendValues);
		return this.legendValues.map(([label, value, color]) =>
			html`
			<div style="display: contents">
			<span style="border-bottom: thin solid ${color};">
			 	<span style="
			 		color: ${color}; 
			 	">▉</span>

			 	${label}
			 </span>
			 <span style="text-align: right; padding-left: 2em; border-bottom: thin solid ${color};">
			 	${value.toLocaleString()}
			 </span>
			 </div>	

		`
		);
	}

	static styles = css`
		:host {
			display: grid;
			grid-template-columns: auto auto;
		}
	`;
}
customElements.define("legend-table", LegendTable);
