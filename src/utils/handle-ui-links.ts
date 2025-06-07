var main: HTMLElement;

export function firstPageLoad(mainEl: HTMLElement) {
	if (!mainEl) {
		const mainEl = document.createElement("main");
		document.body.appendChild(mainEl);
	}
	main = mainEl;
	loadComponent();
}

function loadComponent() {
	const path = globalThis.location.pathname;
	let componentName = path.replace("/", "") || "home-page";

	if (!customElements.get(componentName)) {
		componentName = "error-page";
	}
	const el = document.createElement(componentName);
	main.replaceChildren(el);
}

export function gotoPage(href: string) {
	if (href.startsWith("http")) {
		globalThis.open(href, "_blank")?.focus();
	} else {
		history.pushState(null, "", href); // Update the URL without reloading
		loadComponent();
	}
}

// works when user clicks back and forward navigations
globalThis.addEventListener("popstate", loadComponent);
