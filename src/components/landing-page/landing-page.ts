import { LitElement, html } from "lit";
import './top-menu/top-menu'

class LandingPage extends LitElement {

    render() {return html`
        <top-menu>
        </top-menu>

        <select-insurance>
        </select-insurance>

        <how-to>
        </how-to>

        <auto-questionnaire>
        </auto-questionnaire>
    `}
}
customElements.define('landing-page', LandingPage)