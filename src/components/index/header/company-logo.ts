import {html, css, LitElement} from 'lit'

export class Logo extends LitElement {

    static styles = css`
        span {
            position: absolute;
            top: .2em;
            padding-left: .9em;
            font-size: .7em;
            color: black;
        }
        b {
            font-size: 2em;
            padding: 0;
            color: blue;
        }
        img {
            color: blue;
            fill: blue;
            height: 100%;
        }
    `

    render() {
        return html`
            <span>MIA</span><b>🛡️</b>
        `
    }
}

customElements.define('company-logo', Logo);

