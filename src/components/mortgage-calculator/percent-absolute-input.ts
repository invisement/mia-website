import { css, html, LitElement } from "lit";

class PercentAbsoluteInput extends LitElement {
	static properties = {
		price: { type: Number },
		percent: { type: Number },
		value: { type: Number },
	};

	percentClass = "";
	valueClass = "";

	override connectedCallback() {
		super.connectedCallback();
		this.price = this.price || 0;
		this.active = this.percent ? "percent" : "value";
	}

	percentChanged(e: InputEvent) {
		this.percent = Number(e.target.value);
		this.active = "percent";
	}

	valueChanged(e: InputEvent) {
		this.value = Number(e.target.value);
		this.active = "value";
	}

	static styles = css`
		:host {
			display: flex;
			gap: 0;
		}
		span {
	  		padding-left: 0.25em;
	 		position: absolute;
		}
        .active {
			border-style: outset;
    	}
    	input {
  			padding-left: 1.5em;
		}
    `;

	render() {
		if (this.active == "percent") {
			this.value = this.price * this.percent / 100;
			this.valueClass = "";
			this.percentClass = "active";
		} else {
			this.percent = 100 * this.value / this.price;
			this.percentClass = "";
			this.valueClass = "active";
		}

		return html`
		<label> 
			<span> $ </span>
         	<input class=${this.valueClass} size=10 @change=${this.valueChanged} .value=${this.value}> 
		</label>

		<label> 
			<span> % </span>
        	<input class=${this.percentClass} size=6 @change=${this.percentChanged} .value=${this.percent}>
		</label>
        `;
	}
}
customElements.define("percent-absolute-input", PercentAbsoluteInput);
