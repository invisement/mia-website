import { LitElement, html, css } from "lit";
import { gotoPage } from "/commons/pubsub/store.ts";
import "./temp/carousel/carousel.ts"
import "/components/elements/card-board.ts"

export class HomePage extends LitElement {

    render() {
        return html`
        <card-board>
            <h1> Placeholder for Home Page </h1>
            <h2> Questionnaires </h2>
            <ul>
                <li>
                    <a @click=${() => gotoPage("/questionnaires/insurance-questionnaire")} > First questionnaire </a>
                </li>
            </ul>
        </card-board>

        <card-board style="height: 30em;">
        <vise-carousel>
            <img src="/images/sample5.jpg" caption="The best homeowner insurance">
            <img src="/images/sample1.jpg" caption="The lowest car insurance">
            <img src="/images/sample2.jpg" caption="The best inurances">
            <img src="/images/sample3.jpg" caption="The best car rate">
        </vise-carousel>
        </card-board>
    
    `}
}
customElements.define("home-page", HomePage)
