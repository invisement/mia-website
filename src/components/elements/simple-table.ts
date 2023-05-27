import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

class SimpleTable extends LitElement {
    @property()
    head: string[] = []

    @property()
    rows: string[] = []

    render() {
        return html`
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
            line-height: 1.5;
        }

        table { 
            display: block;
            border-collapse: collapse; 
            overflow: auto;
            height:100%;
        }

        tr { 
            border: .5px solid var(--accent-color); 
        }
        tr:nth-child(odd) {
            background-color: var(--primary-background);
        }
        tr:nth-child(even) {
            background-color: var(--highlight-background);
        }
        th {
            background-color: var(--accent-background);
        }


        th, td {
            padding: .5em 1em;
        }
        td, th {
            max-width: 10em;
            overflow: hidden;
        }

        thead {
            position: sticky;
            top: 0;
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
customElements.define('simple-table', SimpleTable)

