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
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/sprinting.gif">
                Fast and Fun
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/p&c-questionnaire")}>
                ${icons.homeIcon}
                Home Owner
                <mark>major saving</mark>
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                ${icons.loanIcon}
                Loan
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/words.png">
                One Stop Shop
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/mindfulness.svg">
                Loan
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/reading-side.svg">
                Relax
                <mark>major saving</mark>
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/my-files.svg">
                Easy Manage
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/traveling.svg">
                Travel
                <mark>major saving</mark>
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/trip.svg">
                Travel
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/beer.svg">
                Celebrate
            </vise-chip>
            <vise-chip @click=${() => gotoPage("/questionnaires/new-home-purchase-questionnaire")}>
                <img src="/illustrations/yacht.svg">
                Boats
            </vise-chip>


        </vise-chips>

        <card-board style="height: 40em;">
        <vise-carousel>
            <img src="/illustrations/fall.svg" caption="Relax, we are your agent" loading="lazy">
            <img src="/illustrations/town.svg" caption="Relax, we are your agent" loading="lazy">
            <img src="/illustrations/city.svg" caption="Relax, we are your agent" loading="lazy">
            <img src="/illustrations/park.svg" caption="Relax, we are your agent" loading="lazy">
        </vise-carousel>
        </card-board>
    
    `}
}
customElements.define("home-page", HomePage)
