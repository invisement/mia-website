import { css, html, LitElement } from "lit";

export class SliderNumber extends LitElement {
	static properties = {
		value: { type: Number },
		min: { type: Number },
		max: { type: Number },
		step: { type: Number },
	};

	constructor() {
		super();
		this.value = 50;
		this.min = 0;
		this.max = 100;
		this.step = 1;
	}

	static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 1rem;
    }

    input {
      height: 50%;
    }

    .value {
      line-height: 1em;
      text-align: center;
      vertical-align: bottom;
    }
  `;

	_onInput(event) {
		this.value = event.target.valueAsNumber;
	}

	render() {
		return html`
        <input
          type="range"
          min="${this.min}"
          max="${this.max}"
          step = "${this.step}"
          .value="${this.value}"
          @input="${this._onInput}"
        />
        <div class="value">${this.value}</div>
    `;
	}
}

customElements.define("slider-number", SliderNumber);
