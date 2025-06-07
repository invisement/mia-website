import { css, html, LitElement } from "lit";
import { gotoPage } from "../src/utils/handle-ui-links.ts";
import "../src/components/elements/chips.ts";
import "../src/components/elements/chip.ts";

type Chip = {
	title: string;
	href: string;
	image: string;
	mark?: string;
};

export const mortgageChips: Chip[] = [
	{
		title: "Apply for Mortgage",
		href:
			"https://www.blink.mortgage/app/signup/p/FirstClassHomeMortgage/alikhosroi",
		image: "/static/svg-icons/mortgage-application.svg",
		mark: "Get Pre-Approved",
	},
	{
		title: "Contact Expert",
		href: "/mlo-profile?profile=ali-khosro",
		image: "/static/svg-icons/agent-seller.svg",
		mark: "Free Consultancy",
	},
	{
		title: "Mortgage Calculator",
		href: "/mortgage-calculator",
		image: "/static/svg-icons/budget-cost.svg",
	},
	{
		title: "Mortgage HomePage",
		href: "/mortgage-home",
		image: "/static/svg-icons/house-rent.svg",
	},
];

export const otherChips: Chip[] = [
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

class ChipsGroup extends LitElement {
	static properties = {
		chips: { type: Array },
	};

	render() {
		return html`
		<vise-chips>${
			this.chips.map(
				({ title, href, image, mark }) =>
					html`
			<vise-chip 
				@click=${() => gotoPage(href)}
			>
				<img src=${image}>
				${title}
				${mark ? html`<mark>${mark}</mark>` : ""}
			</vise-chip>`,
			)
		}</vise-chips>
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
customElements.define("chips-group", ChipsGroup);
