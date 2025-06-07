import "../src/components/people/top-bar.ts";

import "./home-page.ts";
import "./error-page.ts";

import "../src/components/mortgage-calculator/mortgage-calculator.ts";
import "../src/components/people/mortgage-home.ts";
import "../src/components/people/mlo-profile.ts";

import { firstPageLoad } from "../src/utils/handle-ui-links.ts";

const topBarEl = document.createElement("top-bar");
topBarEl.left = [{
	path: "/static/svg-icons/house-rent.svg",
	link: "/mortgage-home",
}, {
	path: "/static/svg-icons/budget-cost.svg",
	link: "/mortgage-calculator",
}];

topBarEl.middle = [{
	path: "/static/icons/invisement-logo.png",
	link: "/",
}];

topBarEl.right = [{
	path: "/static/svg-icons/mortgage-application.svg",
	link:
		"https://www.blink.mortgage/app/signup/p/FirstClassHomeMortgage/alikhosroi",
}, {
	path: "/static/svg-icons/phone.svg",
	link: "/mlo-profile?profile=ali-khosro",
}];

document.body.appendChild(topBarEl);

const mainEl = document.createElement("main");
document.body.appendChild(mainEl);

firstPageLoad(mainEl);
