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
		span {
	  		padding-left: 0.5em;
	 		position: absolute;
		}
        .inactive {
      		background-color: #f0f0f0;
    	}
    	input {
  			padding-left: 2em;
		}
    `;

	render() {
		if (this.active == "percent") {
			this.value = this.price * this.percent / 100;
			this.valueClass = "inactive";
			this.percentClass = "";
		} else {
			this.percent = 100 * this.value / this.price;
			this.percentClass = "inactive";
			this.valueClass = "";
		}

		return html`
		<label> 
			<span> % </span>
        	<input class=${this.percentClass} size=6 @change=${this.percentChanged} .value=${this.percent}>
		</label>

		<label> 
			<span> $ </span>
         	<input class=${this.valueClass} size=10 @change=${this.valueChanged} .value=${this.value}> 
		</label>
        `;
	}
}
customElements.define("percent-absolute-input", PercentAbsoluteInput);
