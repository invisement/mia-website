import { css, html, LitElement } from "lit";

class PercentAbsoluteInput extends LitElement {
	static properties = {
		price: { type: Number },
		percent: { type: Number },
		absolute: { type: Number },
	};

	percentClass = "";
	valueClass = "";

	override connectedCallback() {
		super.connectedCallback();
		this.price = this.price || 0;
		this.active = this.percent ? "percent" : "absolute";
	}

	set value(value: [number, number]) {
		if (value[0] === undefined) {
			this.absolute = value[1];
			this.active = "absolute";
		} else {
			this.percent = value[0];
			this.active = "percent";
		}
	}

	get value() {
		return [this.percent, this.absolute];
	}

	absoluteChanged(e: InputEvent) {
		this.absolute = Number(e.target.value);
		this.active = "absolute";
	}

	percentChanged(e: InputEvent) {
		this.percent = Number(e.target.value);
		this.active = "percent";
	}

	static styles = css`
		:host {
			display: flex;
		}
		span {
	  		padding-left: 0.25em;
	 		position: absolute;
		}
    	input {
  			padding-left: 1.5em;
		}
    `;

	render() {
		if (this.active == "percent") {
			this.absolute = this.price * this.percent / 100;
			this.absoluteClass = "";
			this.percentClass = "active";
		} else {
			this.percent = 100 * this.absolute / this.price;
			this.percentClass = "";
			this.absoluteClass = "active";
		}

		return html`
		<label> 
			<span> $ </span>
         	<input name="percent" class=${this.absoluteClass} size=10 @change=${this.absoluteChanged} value=${this.absolute}> 
		</label>

		<label> 
			<span> % </span>
        	<input class=${this.percentClass} size=6 @change=${this.percentChanged} value=${this.percent}>
		</label>
        `;
	}
}
customElements.define("percent-absolute-input", PercentAbsoluteInput);
