import { LitElement, css, html } from "lit";

import {WebTable} from "/components/elements/web-table.ts"
import "/components/elements/web-table.ts"
import { query } from "lit/decorators.js";

class BrokerHome extends LitElement {
    @query('web-table')
    tbl: WebTable

    static styles = css`
        main {
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: auto;
        }
    `
    
    render() {return html`
        <main>
            <h3>Recent Submitted Quote Requests</h3>
            <web-table id="web-table"></web-table>
        </main>
    `}

    connectedCallback() {
        super.connectedCallback()
        this.fetchSampleData()
        
    }

    fetchSampleData() {
        fetch("https://raw.githubusercontent.com/alan-khosro/web-table/main/examples/cash_flow_components.json")
        .then(r => r.json())
        .then(data => {
            const head = Object.keys(data[0])
            const rows = data.map(Object.values)
            this.tbl.populate(head, rows)
        })
        .catch(console.error)

    }
}
customElements.define("broker-home", BrokerHome)