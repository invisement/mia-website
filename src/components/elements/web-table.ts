import { LitElement, css, html } from "lit";

type Value = undefined | string | number | boolean
type Row = Value[]

export class WebTable extends LitElement {
    private types: string[] = []
    
    private filterColumnIndex = 0;
    private filterValue = ""

    private sortColumnIndex = 0;
    private descending = false;

    private originalHead: string[] = []
    private originalRows: Row[] = []

    head: string[] = []
    rows: Row[] = []


    sort () {
        if (this.types[this.sortColumnIndex] == "number") {
            this.originalRows.sort((a, b) => a[this.sortColumnIndex] - b[this.sortColumnIndex])
        } else {
            this.originalRows.sort()
        }

        if (this.descending) {
            this.originalRows.reverse()
        }

        this.filter()

    }

    filter() {
        this.rows = this.originalRows.filter(row => row[this.filterColumnIndex].toLowerCase().includes(this.filterValue.toLowerCase()))

        this.requestUpdate()
    }

    populate(head, rows) {
        this.originalHead = head
        this.originalRows = rows
        this.head = head
        this.rows = rows
        this.types = rows[0].map(col => typeof col)

        this.requestUpdate()
    }

    render () {return html`
        <header>
            <p>
                SORT by 
                <select 
                    @change=${e => {
                        this.sortColumnIndex = e.target.value; 
                        this.sort();
                    }}
                >
                    ${this.head.map((col, i) => html`
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
                    ${this.head.map((col, i) => this.types[i] == 'string'? html`
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

        <table>
            <thead><tr>
                ${this.renderHead(this.head)}
            </tr></thead>
            
            <tbody>
                ${this.rows.map(this.renderRow)}
            </tbody>
        </table>
    `}

    static styles = css`
        :host{
            display: block;	
            overflow: auto;	
            line-height: 1.5;
            padding: 1em;
            text-align: center;
            width: fit-content;
        }

        table { 
            border-collapse: collapse; 
        }

        tr { 
            border: .5px solid var(--accent-color); 
        }
        
        tr:nth-child(even) {
            background-color: var(--highlight-background);
        }

        th, td {
            padding: .5em 1em;
        }

        thead {
            background-color: var(--accent-background);
            color: var(--accent-color);
            text-transform: uppercase;
        }
    `

    renderRow = row => html`
        <tr>
            ${row.map(cell => html`
                <td>${cell}</td>
            `)}
        </tr>
    `
        
    renderHead = (head: string[]) => head.map(cell => html`<th>${cell}</th>`)

}
customElements.define("web-table", WebTable)
