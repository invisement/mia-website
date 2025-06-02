import { LitElement } from "lit";

class HeadShot extends LitElement {
	properties = {
		name: { type: string },
		bio: { type: string },
		photo: { type: string },
	};

	render() {
		return html`
		<img src=${photo} alt=${name}>
		<div>
			<p>${name}</p>
			<p>${bio}</p>
		</div>
	}
	`;
	}

	static styles = css`
		img {
			width: 100px;
			height: 100px;
			border-radius: 50%;
		}
		div {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		p {
			margin: 0;
		}
		
	`;
}
