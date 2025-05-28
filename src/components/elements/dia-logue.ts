import { css, html, LitElement } from "lit";

export class Dialogue extends LitElement {
	static properties = {
		buttons: { type: Array },
	};

	// get dialog() {
	// 	return this.renderRoot?.querySelector("dialog") ?? null;
	// }

	override connectedCallback(): void {
		super.connectedCallback();
		this.dialog = this.renderRoot?.querySelector("dialog") ?? null;
	}

	constructor() {
		super();
		this.buttons = ["OK", "Cancel"];
	}

	static styles = css`
		dialog {
            max-width: 30em;
            font-size: larger;
            padding: 0;
            border: none;
			text-align: center;
            background-color: var(--highlight-background);
            box-shadow: var(--small-shadow);
            border-radius: var(--border-radius);
            line-height: 2em;
		}
        dialog::backdrop {
            background: rgba(0, 0, 0, 0.6);
        }

        footer {
            background-color: var(--accent-background);
        }

        main {
            padding: 2em;
        }

		button {
            margin: 1em;
            width: 5em;
            font-size: inherit;
		}
        ::slotted(p), ::slotted(ul), ::slotted(ol) {
            text-align: left;
        }
    `;

	render() {
		return html`
        <dialog>
            <main>
                <slot></slot>
            </main>
            <footer>
                ${
			this.buttons.map((value) =>
				html`<button @click=${() =>
					this.dialog.close(value)}>${value}</button>`
			)
		}
            <footer>
        </dialog>
    `;
	}

	async show() {
		this.dialog.returnValue = "";
		this.dialog.showModal();
		const x = this.dialog;
		await new Promise<void>((resolve) => {
			// add an event listener to the dialog's "close" event
			this.dialog.addEventListener("close", function callback() {
				// remove the dialog element from the DOM
				x.removeEventListener("close", callback);
				// resolve the Promise
				resolve();
			});
		});
		return this.dialog.returnValue;
	}

	close(value = "") {
		this.dialog.close(value);
	}
}
customElements.define("dia-logue", Dialogue);
