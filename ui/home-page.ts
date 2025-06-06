import { css, html, LitElement } from "lit";
import "../src/components/elements/chips.ts";
import "../src/components/elements/chip.ts";
import { gotoPage } from "../src/utils/handle-ui-links.ts";

type Chip = {
	title: string;
	href: string;
	image: string;
	mark?: string;
};

const mortgageChips: Chip[] = [
	{
		title: "Get Mortgage",
		href: "/head-shot",
		image: "/static/svg-icons/loan.svg",
		mark: "Get Pre-Approved",
	},
	{
		title: "Mortgage Calculator",
		href: "/mortgage-calculator",
		image: "/static/svg-icons/budget-cost.svg",
	},
	{
		title: "Mortgage HomePage",
		href: "/mlo-profile",
		image: "/static/svg-icons/house-rent.svg",
	},
];

const otherChips: Chip[] = [
	{
		title: "Diagraph Diagramin Tool",
		href: "https://diagraph.invisement.com",
		image: "/static/svg-icons/architecture-blueprint.svg",
	},
	{
		title: "MIA Insurance",
		href: "https://mia.invisement.com",
		image: "/static/svg-icons/insurance.svg",
	},
	{
		title: "ASL Detection",
		href: "https://asl.invisement.com",
		image: "/static/svg-icons/asl.svg",
	},
	{
		title: "Dev and Test",
		href: "https://dev.invisement.com",
		image: "/static/svg-icons/testing.svg",
	},
	{
		title: "Back Office",
		href: "https://office.invisement.com",
		image: "/static/svg-icons/store.svg",
	},
	{
		title: "API",
		href: "https://api.mia.invisement.com",
		image: "/static/svg-icons/api-interface.svg",
	},
];

class HomePage extends LitElement {
	componentChips(chips: Chip[]) {
		return html`
			<vise-chips>${
			chips.map(({ title, href, image, mark }) =>
				html`
					<vise-chip 
						@click=${() => gotoPage(href)}
					>
						<img src=${image}>
						${title}
						${mark ? html`<mark>${mark}</mark>` : ""}
					</vise-chip>
				`
			)
		}</vise-chips>		
		`;
	}

	linkChips(chips: Chip[]) {
		return html`
			<vise-chips>${
			chips.map(({ title, href, image, mark }) =>
				html`
					<a href=${href} target="_blank">
					<vise-chip>
						<img src=${image}>
						${title}
						${mark ? html`<mark>${mark}</mark>` : ""}
					</vise-chip>
					</a>
				`
			)
		}</vise-chips>		
		`;
	}

	render() {
		return html`
		${this.componentChips(mortgageChips)}
		${this.linkChips(otherChips)}
		`;
	}

	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			gap: 2em;
			align-items: center;
		}

		vise-chips {
			border: groove;
			border-radius: 2em;
		}

		@media (max-width: 45em) {
    		vise-chips {
        	font-size: smaller;
    	}
}	`;
}
customElements.define("home-page", HomePage);
