var main: HTMLElement;

export function firstPageLoad(mainEl: HTMLElement) {
	if (!mainEl) {
		const mainEl = document.createElement("main");
		document.body.appendChild(mainEl);
	}
	main = mainEl;
	const path = globalThis.location.pathname;
	loadComponent(path);
}

function loadComponent(path: string) {
	let componentName = path.replace("/", "") || "home-page";

	if (!customElements.get(componentName)) {
		componentName = "error-page";
	}
	const el = document.createElement(componentName);
	main.replaceChildren(el);
}

function handlePopState() {
	loadComponent(globalThis.location.pathname);
}

export function creatLinkEl(href: string) {
	const a = document.createElement("a");
	a.href = href;
	//a.textContent = event.target.textContent;
	a.addEventListener("click", handleLinkClick);
	return a;
}

export function gotoPage(href: string) {
	history.pushState(null, "", href); // Update the URL without reloading
	loadComponent(href);
}

function handleLinkClick(event) {
	event.preventDefault();
	const href = event.currentTarget.getAttribute("href");
	history.pushState(null, "", href); // Update the URL without reloading
	loadComponent(href);
}

// works when user clicks back and forward navigations
globalThis.addEventListener("popstate", handlePopState);
