import { LitElement, css, html } from "lit";

import { WebTable } from "/components/elements/web-table.ts"
import "/components/elements/web-table.ts"
import { Dialogue } from "/components/elements/dia-logue";
import "/components/elements/dia-logue";

import { state, query } from "lit/decorators.js";
import { getAll } from "/commons/firebase/firestore/get-post-data";

import "/components/elements/simple-table"
import "/components/elements/simple-form"

const metaData = await fetch("/meta-data/broker-filter.json").then(r => r.json())
const insurances = Object.keys(metaData)

type Insurance = string

type Record = { [col: string]: string }
type CustomersData = { [customerId: string]: Record }
type Data = { [insurance: Insurance]: CustomersData }

type TableData = string[][]
type InsuranceTableData = { [insurance: string]: TableData }

class BrokerHome extends LitElement {
    private insurance: Insurance;
    private insuranceTableData: InsuranceTableData = {}
    private data: Data = {} // all columns
    private rows: TableData = [[]]
    private columns: string[] = []
    private viewRecordStyle = "padding: .5em; font-size: bigger; font-weight: bold; color: red; box-shadow: var(--outset); cursor: pointer;"
    @state() record = {}

    @query('web-table')
    tbl: WebTable

    @query('#record-dialog')
    recordDialog: Dialogue

    static styles = css`
        :host {
            display: block;
            padding: 1em;
        }
        :host > * {
            margin: auto;
        }
        header {
            width: fit-content;
        }
        web-table {
            font-size: smaller;
        }
        dialog> simple-table {
            display: block;
            margin: auto;
            width: fit-content;         
        }
        dialog {
            padding: 0;
            position: relative;
        }
        dialog>header {
            width: 100%;
            display: flex;
            justify-content: center;
            position: sticky;
            top: 0;
            background-color: var(--accent-background);
        }
        dialog>header>* {
            margin: 1em;
        }
        dialog>#close {
            background-color: var(--highlight-background);
            color: var(--warning-color);
            font-size: 3em;
            font-weight: bold;
            box-shadow: var(--outset);
            position: absolute;
            top: 0;
            right: 0;
            z-index: 5;
            cursor: pointer;
        }

    `

    render() {
        return html`
        <header>
            <h3>Recent Submitted Quote Requests</h3>
            Select the insurance type:
            <select @change=${e => this.populateTable(e.target.value)}>
                <option value="">Select an insurance type</option>

                ${insurances.map(insurance => html`<option value=${insurance}>${insurance}</option>`)}
            </select>
                        
        </header>
        <web-table id="web-table"></web-table>

        <dialog id="record-dialog">
            <span id="close" @click=${() => this.recordDialog.close()}>X</span>
            <header>
                <simple-form auth="broker" afterPage="/broker-home" src="/html-content/submit-quote">
                </simple-form>
            </header>
            <simple-table .head=${["key", "value"]} .rows=${this.sortedRecord(this.record)}>
            </simple-table>
        </dialog>
    `}

    submitQuote () {

    }

    sortedRecord(record) {
        const out = Object.entries(record)
        out.sort((a,b) => a[0]>b[0]? 1 : -1)
        return out
    }

    viewRecord(id) {
        this.record = this.data[this.insurance][id]
        // this.record = html`<dialog>Hello ${JSON.stringify(this.data[this.insurance][id])}</dialog>`
        this.recordDialog.showModal()
    }

    async fetchData(insurance: Insurance) {
        const { collection, columns } = metaData[insurance]

        // get data from collection and add document id
        if (!this.insuranceTableData[insurance]) {
            const insuranceData = this.data[insurance] = {}

            const tableRows = (await getAll(collection)).docs.map(doc => {
                const record = doc.data()
                record.id = doc.id
                insuranceData[doc.id] = record

                // filter columns for table use
                const row = columns.map(col => record[col])
                row.unshift(
                    html`<span style=${this.viewRecordStyle} @click=${() => this.viewRecord(record.id)}>View</span>`
                )
                return row
            })

            this.insuranceTableData[insurance] = tableRows
        }
        columns.unshift("link")
        this.columns = columns

        this.insurance = insurance
        this.rows = this.insuranceTableData[insurance]
    }

    async populateTable(insurance: Insurance) {
        this.insurance = insurance
        if (!insurance) {
            this.insurance = insurance
            this.columns = []
            this.rows = [[]]
        } else {
            await this.fetchData(insurance)
        }
        this.tbl.populate(this.columns, this.rows)
    }
}
customElements.define("broker-home", BrokerHome)

/*
class ViewRecord extends LitElement{
    render() {return html`
        <span @click=${this.view}>View Record</span>
    `}

    @property()
    id: string;

    view() {

    }


}
*/