import "../src/components/mortgage-calculator/mortgage-calculator.ts";

function loadComponent(path: string) {
	console.log(path);
	const componentName = path.replace("/components/", "");

	if (!customElements.get(componentName)) {
		document.body.innerHTML =
			"<h1>404 Error! No page for your address was found!</h1>";
		return;
	}
	const el = document.createElement(componentName);
	document.body.replaceChildren(el);
}

function handlePopState() {
	loadComponent(globalThis.location.pathname);
}

function handleLinkClick(event) {
	event.preventDefault();
	const path = event.target.getAttribute("href");
	history.pushState(null, "", path); // Update the URL without reloading
	loadComponent(path);
}

window.addEventListener("popstate", handlePopState);

handlePopState();
