import { css } from "lit";

export const header = css`
    header {
        padding: .5em 1em;
        display: flex;
        justify-content: space-around;

        position: sticky;
        top: 0;
        z-index: 20;

        height: 3em;

        background-color: var(--accent-background);
        color: var(--accent-color);
        fill: var(--accent-color);
        box-shadow: var(--big-shadow);
        border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
    header > * {
        height: 100%;
    }
`

