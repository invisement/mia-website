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
            <vise-chip @click=${() => gotoPage("/questionnaires/auto-insurance-questionnaire")}>
                ${icons.carIcon}
                Car Insurance
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/home-insurance-questionnaire")}>
                ${icons.homeIcon}
                Home Owner
                <mark>major saving</mark>
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/personal-line-intakes")}>
                <img src="/illustrations/mindfulness.svg">
                Loan
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/traveling.svg">
                Travel
                <mark>Coming Soon</mark>
            </vise-chip>


            <vise-chip disabled @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/yacht.svg">
                Boat
                <mark>Coming Soon</mark>
            </vise-chip>
            <vise-chip disabled @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/insurance-claim.svg">
                Claim
            </vise-chip>

            <vise-chip disabled @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/reading-side.svg">
                Relax
                <mark>New Service</mark>
            </vise-chip>
            <vise-chip disabled @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/my-files.svg">
                Easy Manage
            </vise-chip>
        </vise-chips>

        <img width="100%" src="/images/how-it-works.png" loading="lazy">

        <card-board style="height: 40em;">
        <vise-carousel>
            <img src="/illustrations/fall.svg"  caption="<a href='/feedback-form'>Contact us </a> for more info if you have an inquiry" loading="lazy">
            <img src="/illustrations/city.svg" caption="We represent you, we are your agent, not the insurance companies!" loading="lazy">
            <img src="/illustrations/park.svg"  caption="You relax, we will find the best rates for you, guaranteed!" loading="lazy">
        </vise-carousel>
        </card-board>
    
    `}
}
customElements.define("home-page", HomePage)
