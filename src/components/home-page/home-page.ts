import { LitElement, html, css } from "lit";
import { gotoPage } from "/commons/pubsub/store.ts";
import "./temp/carousel/carousel.ts"
import "/components/elements/card-board.ts"

export class HomePage extends LitElement {

    static styles = css`
        button {
            cursor: pointer;
        }
    `

    render() {
        return html`
        <card-board style="padding: 1em;">
            <h1> Placeholder for Home Page <h1>
            <h2> Questionnaires </h2>
            <ul>
                <li>
                    <button @click=${() => gotoPage("/questionnaires/insurance-questionnaire")} > First questionnaire </button>
                </li>
                <li>
                    <button @click=${() => gotoPage("/questionnaires/p&c-questionnaire")} > Personal Lines P & C </button>
                </li>
                <li>
                    <button @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")} > New Home Purchase </button>
                </li>
            </ul>
        </card-board>

        <card-board style="height: 30em;">
        <vise-carousel>
            <img src="/images/sample5.jpg" caption="The best homeowner insurance" loading="lazy">
            <img src="/images/sample1.jpg" caption="The lowest car insurance" loading="lazy">
            <!--img src="/images/sample2.jpg" caption="The best inurances" loading="lazy"-->
            <img src="/images/sample3.jpg" caption="The best car rate" loading="lazy">
        </vise-carousel>
        </card-board>
    
    `}
}
customElements.define("home-page", HomePage)
