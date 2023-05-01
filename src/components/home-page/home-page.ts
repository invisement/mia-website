import { LitElement, html, css } from "lit";
import { gotoPage } from "/commons/pubsub/store.ts";


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
                    <a @click=${() => gotoPage("/questionnaires/insurance-questionnaire")} > First questionnaire </a>
                </li>
            </ul>
        </main>
    
    `}
}
customElements.define("home-page", HomePage)
