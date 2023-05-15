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

        @media (min-width: 45em) {
            vise-chips {
                font-size: larger;
            }
        }
    `

    render() {
        return html`
        <vise-chips>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/insurance-claim.svg">
                Claim
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/insurance-questionnaire")}>
                ${icons.carIcon}
                Car Insurance
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/p&c-questionnaire")}>
                ${icons.homeIcon}
                Home Owner
                <mark>major saving</mark>
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/simple-form/personal-loan")}>
                <img src="/illustrations/mindfulness.svg">
                Loan
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/personal_line_intakes")}>
                <img src="/illustrations/money-bag.svg">
                Loan2
            </vise-chip>


            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/reading-side.svg">
                Relax
                <mark>New Service</mark>
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/my-files.svg">
                Easy Manage
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/traveling.svg">
                Travel
                <mark>Limitted Time Offer</mark>
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/yacht.svg">
                Boat
            </vise-chip>
        </vise-chips>

        <card-board style="height: 40em;">
        <vise-carousel>
            <img src="/images/how-it-works.png" loading="lazy" caption="<a href='/feedback-form'>Contact us</a> if you have a question or feedback and we will get back to you ASAP">
            <img src="/illustrations/fall.svg" caption="Relax, we are your agent" loading="lazy">
            <img src="/illustrations/city.svg" caption="Relax, we are your agent" loading="lazy">
            <img src="/illustrations/park.svg" caption="Relax, we are your agent" loading="lazy">
        </vise-carousel>
        </card-board>
    
    `}
}
customElements.define("home-page", HomePage)
