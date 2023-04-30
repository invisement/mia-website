import { LitElement, html, css } from "lit";

export class HomePage extends LitElement {
    static styles = css`
        :host>* {
            background-color: var(--primary-background);
        }
    `

    render() {
        return html`
        <main>
            <h1> Placeholder for Home Page </h1>
            <h2> Questionnaires </h2>
            <ul>
                <li>
                    <a href="/questionnaires/insurance-questionnaire"> First questionnaire </a>
                </li>
            </ul>
        </main>
    
    `}
}
customElements.define("home-page", HomePage)
