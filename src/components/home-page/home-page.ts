import { LitElement, html, css } from "lit";
import { gotoPage } from "/commons/pubsub/store.ts";
import "./temp/carousel/carousel.ts"
import "/components/elements/card-board.ts"
import "/components/elements/chip.ts"
import "/components/elements/chips.ts"

import * as icons from "@static/svg/large-icons"

export class HomePage extends LitElement {

    static styles = css`
        :host > * {
            margin: 2em 0;
        }
        button {
            cursor: pointer;
        }
    `

    render() {
        return html`
        <vise-chips>
            <vise-chip @click=${() => gotoPage("/questionnaires/insurance-questionnaire")}>
                ${icons.carIcon}
                Car Insurance
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/p&c-questionnaire")}>
                ${icons.homeIcon}
                Home Owner
                <mark>attention</mark>
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                ${icons.loanIcon}
                Loan
            </vise-chip>
            <vise-chip>
                ${icons.carIcon}
                Car Insurance
            </vise-chip>
            <vise-chip>
                ${icons.loanIcon}
                Car Insurance
                <mark>attention</mark>
            </vise-chip>
        </vise-chips>

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
