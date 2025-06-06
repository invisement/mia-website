import { css, html, LitElement } from "lit";
import { creatLinkEl } from "../../utils/handle-ui-links.ts";

type Icon = {
	name?: string;
	path: string;
	link: string;
};

export class TopBar extends LitElement {
	static styles = css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      padding: 0.5em 1em;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    #left-icons,
    #right-icons, #middle-icons {
      display: flex;
      gap: 1em;
      height: 100%;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    img {
      height: 100%; /* Adjust as needed */
    }
  `;

	static properties = {
		left: { type: Array },
		right: { type: Array },
		middleText: { type: Array },
	};

	left: Icon[] = [];
	right: Icon[] = [];
	middle: Icons[] = [];

	render() {
		return html`
      <div id="left-icons">
      </div>
      <div id="middle-icons">
      </div>
      <div id="right-icons">
      </div>
    `;
	}

	override async connectedCallback() {
		super.connectedCallback();
		await this.updateComplete;

		this.placeIcons("#left-icons", this.left);
		this.placeIcons("#middle-icons", this.middle);
		this.placeIcons("#right-icons", this.right);
	}

	placeIcons = (id: string, list: Icon[]) => {
		const div = this.shadowRoot!.querySelector(id)!;
		for (const { path, link } of list) {
			const img = document.createElement("img");
			img.src = path;
			const a = creatLinkEl(link);
			a.appendChild(img);
			div.appendChild(a);
		}
	};
}

customElements.define("top-bar", TopBar);
