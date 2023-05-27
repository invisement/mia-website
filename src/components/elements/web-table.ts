import { LitElement, css, html } from "lit";

import "./simple-table"
import { property } from "lit/decorators.js";

type Value = undefined | string | number | boolean
type Row = Value[]

export class WebTable extends LitElement {
    private types: string[] = []

    private filterColumnIndex: number;
    private filterValue = ""

    private sortColumnIndex = 0;
    private descending = false;

    @property() head: string[] = []
    @property() rows: Row[] = []

    _head: string[] = []
    _rows: Row[] = []


    sort() {
        this.rows.sort((a, b) => {
            if (b[this.sortColumnIndex] == undefined) {
                return 1
            }
            if (b[this.sortColumnIndex] == undefined) {
                return -1
            }
            return (a[this.sortColumnIndex] > b[this.sortColumnIndex]) ? 1 : -1
        })

        if (this.descending) {
            this.rows.reverse()
        }

        this.filter()

    }

    filter() {
        // TODO: it only works for string!
        this._rows = this.rows.filter(row => {
            return this.filterValue ?
                row[this.filterColumnIndex]
                &&
                row[this.filterColumnIndex]
                    .toLowerCase()
                    .includes(
                        this.filterValue.toLowerCase()
                    )
                : true
        })

        this.requestUpdate()
    }

    populate(head, rows) {
        this.head = head
        this.rows = rows
        this._head = head
        this._rows = rows
        this.types = rows[0].map(col => typeof col)
        this.filterColumnIndex = this.types.indexOf("string")

        this.requestUpdate()
    }

    render() {
        return html`
        <header>
            <p>
                SORT by 
                <select 
                    @change=${e => {
                this.sortColumnIndex = e.target.value;
                this.sort();
            }}
                >
                    ${this._head.map((col, i) => html`
                        <option value=${i}>${col}</option>
                    `)}
                </select> 
                column in 
                <input type="checkbox"
                    @change=${(e: InputEvent) => {
                this.descending = e.target!.checked;
                this.sort()
            }}
                >
                Descending order 
            </p>

            <p>
                FILTER by 
                <select
                    @change=${e => {
                this.filterColumnIndex = e.target.value;
                this.filter();
            }}                
                >
                    ${this._head.map((col, i) => this.types[i] == 'string' ? html`
                        <option value=${i}>${col}</option>
                    `: null)}
                </select>
                column that contains
                <input type="search" size=10
                    @input=${e => {
                this.filterValue = e.target.value
                this.filter()
            }}
                >
            </p>
        </header>

        <simple-table .head=${this._head} .rows=${this._rows}></simple-table>
    `}

    static styles = css`
        header {
            text-align: center;
        }
        :host{
            display: block;
            line-height: 1.5;
        }
    `

}
customElements.define("web-table", WebTable)
