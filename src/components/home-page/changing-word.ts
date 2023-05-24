import { LitElement, css, html } from "lit";
import { property, query } from "lit/decorators.js";

class ChangingWord extends LitElement {
    @query('span')
    word: HTMLSpanElement;

    @property()
    words=["Home", "Auto"]

    @property()
    speed = 500;

    async connectedCallback() {
        super.connectedCallback()
        
        await this.updateComplete
        this.changeLetters()
    }
    changeLetters = () => {
        var spanElement = this.word;
        var words = this.words;
        var currentWordIndex = 0;
        var currentLetterIndex = 0;
        setInterval(changeLetter, this.speed);

        //const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        async function changeLetter() {
            var word = words[currentWordIndex];
            var currentLetter = word[currentLetterIndex];

            if (currentLetterIndex >= word.length) {
                currentLetterIndex = 0;
                currentWordIndex = (currentWordIndex + 1) % words.length;
                spanElement.textContent = "";
            } else {
                spanElement.textContent += currentLetter;
                currentLetterIndex++;
            }
        }

    }

    render() {return html`
        <p>
            <mark>Relax!</mark> We will search 100s of sources to find<br>
            the <u>lowest insurance rate</u> for your <span></span>_
        </p>
        <img src="/illustrations/mindfulness.svg">
    `}

    static styles = css`
        :host {
            display: flex;
            justify-content: space-around;
            height: 10em;
            align-items: center;
        }
        img {
            height: 100%;
        }
        p {
            margin: 1em;
            font-size: larger;
            line-height: 2em;
            font-family: var(--heading-font);
            color: gray;
        }
        span {
            color: var(--highlight-color);
        }
        mark {
            background-color: unset;
            color: green;
            font-size: 150%;
            font-family: var(--title-font);
        }
        u {
            color: var(--highlight-color);
        }

    
    `
}
customElements.define('changing-word', ChangingWord)
