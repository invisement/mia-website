import {html, css, LitElement} from 'lit'

export class Logo extends LitElement {

    static styles = css`
        i {
            font-family: Var(--title-font);
            font-weight: normal;
            padding: 0;
            margin: 0;
        }
        
        span {
            color: var(--highlight-color);
        }

    `

    render() {
        return html`
            <i>MI<span>A</span><small>.io</small></i>
        `
    }
}

customElements.define('company-logo', Logo);

